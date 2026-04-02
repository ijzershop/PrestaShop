/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/auto-complete-search.ts"
/*!***********************************************!*\
  !*** ./js/components/auto-complete-search.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/components/components-map.ts"
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./js/components/entity-search-input.ts"
/*!**********************************************!*\
  !*** ./js/components/entity-search-input.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
    values.forEach((value) => {
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


/***/ },

/***/ "./js/components/form/currency-symbol-updater.ts"
/*!*******************************************************!*\
  !*** ./js/components/form/currency-symbol-updater.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurrencySymbolUpdater)
/* harmony export */ });

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


/***/ },

/***/ "./js/components/form/customer-search-input.ts"
/*!*****************************************************!*\
  !*** ./js/components/form/customer-search-input.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerSearchInput)
/* harmony export */ });
/* harmony import */ var _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/entity-search-input */ "./js/components/entity-search-input.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


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


/***/ },

/***/ "./js/components/form/price-reduction-manager.ts"
/*!*******************************************************!*\
  !*** ./js/components/form/price-reduction-manager.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriceReductionManager)
/* harmony export */ });
/* harmony import */ var _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/currency-symbol-updater */ "./js/components/form/currency-symbol-updater.ts");


const { $ } = window;
class PriceReductionManager {
  constructor(reductionTypeSelector, taxInclusionInputs, currencySelect, reductionValueSymbolSelector, toggleCurrencySelector = null) {
    this.reductionTypeSelector = reductionTypeSelector;
    this.$reductionTypeSelect = $(reductionTypeSelector);
    this.$taxInclusionInputs = $(taxInclusionInputs);
    this.currencySelect = currencySelect;
    this.reductionValueSymbolSelector = reductionValueSymbolSelector;
    this.toggleCurrencySelector = toggleCurrencySelector;
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
      if (this.toggleCurrencySelector) {
        $(this.toggleCurrencySelector).fadeOut();
      }
    } else {
      this.$taxInclusionInputs.fadeIn();
      if (this.toggleCurrencySelector) {
        $(this.toggleCurrencySelector).fadeIn();
      }
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


/***/ },

/***/ "./js/components/modal.ts"
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal);


/***/ },

/***/ "./js/components/modal/confirm-modal.ts"
/*!**********************************************!*\
  !*** ./js/components/modal/confirm-modal.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./js/components/modal/form-iframe-modal.ts"
/*!**************************************************!*\
  !*** ./js/components/modal/form-iframe-modal.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/components/modal/iframe-event.ts"
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-event.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IframeEvent)
/* harmony export */ });

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



/***/ },

/***/ "./js/components/modal/iframe-modal.ts"
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-modal.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
        this.closeButton.innerText = params.closeButtonLabel;
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


/***/ },

/***/ "./js/components/modal/modal.ts"
/*!**************************************!*\
  !*** ./js/components/modal/modal.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./js/components/router.ts"
/*!*********************************!*\
  !*** ./js/components/router.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fos-routing */ "./node_modules/fos-routing/dist/routing.js");
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fos_routing__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/fos_js_routes.json */ "./js/fos_js_routes.json");



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


/***/ },

/***/ "./js/components/typeguard.ts"
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./js/pages/product/specific-price/form/combination-selector.ts"
/*!**********************************************************************!*\
  !*** ./js/pages/product/specific-price/form/combination-selector.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/pages/product/specific-price/form/customer-selector.ts"
/*!*******************************************************************!*\
  !*** ./js/pages/product/specific-price/form/customer-selector.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/specific-price/specific-price-map */ "./js/pages/product/specific-price/specific-price-map.ts");
/* harmony import */ var _pages_product_specific_price_specific_price_event_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/specific-price/specific-price-event-map */ "./js/pages/product/specific-price/specific-price-event-map.ts");
/* harmony import */ var _components_form_customer_search_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/form/customer-search-input */ "./js/components/form/customer-search-input.ts");




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


/***/ },

/***/ "./js/pages/product/specific-price/specific-price-event-map.ts"
/*!*********************************************************************!*\
  !*** ./js/pages/product/specific-price/specific-price-event-map.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  switchCustomer: "switchSpecificPriceCustomer"
});


/***/ },

/***/ "./js/pages/product/specific-price/specific-price-map.ts"
/*!***************************************************************!*\
  !*** ./js/pages/product/specific-price/specific-price-map.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/***/ },

/***/ "./node_modules/fos-routing/dist/routing.js"
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
(module) {

"use strict";
var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

/***/ },

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js"
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./node_modules/typeahead.js/dist/typeahead.bundle.js"
/*!************************************************************!*\
  !*** ./node_modules/typeahead.js/dist/typeahead.bundle.js ***!
  \************************************************************/
(module, exports, __webpack_require__) {

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
    } else // removed by dead control flow
{}
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
    } else // removed by dead control flow
{}
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

/***/ },

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

"use strict";
module.exports = window["jQuery"];

/***/ },

/***/ "./js/fos_js_routes.json"
/*!*******************************!*\
  !*** ./js/fos_js_routes.json ***!
  \*******************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/delete"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/attribute-groups"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId",true],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/images-for-shop"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId",true],["variable","/","\\\\d+","shopId",true],["text","/search-product-combinations"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId",true],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","featureId",true],["text","/sell/catalog/features/values"]],"defaults":[],"requirements":{"featureId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_feature_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/features/all-feature-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId",true],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","orderId",true],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","cartId",true],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId",true],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId",true],["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_shipment_get_split_form":{"tokens":[["text","/shipment/split-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_shipment_get_merge_form":{"tokens":[["text","/shipment/merge-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_shipment_get_edit_form":{"tokens":[["text","/shipment/edit-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId",true],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase",true],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm",true],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_employees_get_password_generated":{"tokens":[["text","/configure/advanced/employees/password_generated"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmaWNfcHJpY2VfZm9ybS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEZSxNQUFNLG1CQUFtQjtBQUFBLEVBT3RDLFlBQVksY0FBc0IsYUFBcUQ7QUFDckYsU0FBSyxlQUFlO0FBQ3BCLFNBQUssZ0JBQWdCLEtBQUssYUFBYSxLQUFLLElBQUk7QUFJaEQsVUFBTSxtQkFBbUI7QUFBQTtBQUFBO0FBQUEsTUFHdkIsWUFBWSxDQUFDLFNBQWlDO0FBQzVDLFlBQUksb0JBQXFEO0FBRXpELFlBQUksT0FBTyxLQUFLLE9BQU8sWUFBWSxZQUFZO0FBQzdDLDhCQUFvQixLQUFLLE9BQU8sUUFBUSxJQUFJO0FBQUEsUUFDOUMsV0FDRSxPQUFPLFVBQVUsZUFBZTtBQUFBLFVBQzlCO0FBQUEsVUFDUyxLQUFLLE9BQU87QUFBQSxRQUN2QixHQUNBO0FBQ0EsOEJBQW9CLEtBQWMsS0FBSyxPQUFPLE9BQU87QUFBQSxRQUN2RDtBQUVBLGVBQU8scUJBQXFCO0FBQUEsTUFDOUI7QUFBQSxNQUNBLFFBQVEsT0FBK0I7QUFDckMsZUFBTyxvQ0FBb0MsTUFBTTtBQUFBLE1BQ25EO0FBQUEsTUFDQSxTQUFTLE9BQStCO0FBQ3RDLGVBQU8sMkNBQTJDLE1BQU07QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFHQSxTQUFLLFNBQW1DO0FBQUEsTUFDdEMsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUNSLGNBQ0EsT0FDQSxnQkFDWTtBQUNaLG9CQUFZLFVBQVUsT0FBTyxhQUFhLEtBQUssT0FBTyxLQUFLLENBQUM7QUFDNUQsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQ0UsT0FDQSxhQUNBO0FBQ0Esb0JBQVksVUFBVSxPQUFPLEVBQUU7QUFDL0IsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxPQUNSO0FBSUwsUUFBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLGFBQWEsV0FBVyxHQUFHO0FBQ2xFLFdBQUssT0FBTyxZQUFZLGtDQUNuQixtQkFDMEIsWUFBWTtBQUFBLElBRTdDO0FBRUEsU0FBSyxlQUFlO0FBQUEsRUFDdEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLGlCQUF1QjtBQUU3QixVQUFNLG1CQUFtQjtBQUFBLE1BQ3ZCLFdBQVcsS0FBSyxPQUFPO0FBQUEsTUFDdkIsV0FBVyxLQUFLLE9BQU87QUFBQSxNQUN2QixNQUFNLEtBQUssT0FBTztBQUFBLE1BQ2xCLFVBQVUsS0FBSyxPQUFPO0FBQUEsTUFDdEIsU0FBUyxLQUFLLE9BQU87QUFBQSxJQUN2QjtBQUVBLFVBQU0sZ0JBQWdCO0FBQUEsTUFDcEIsUUFBUSxLQUFLLE9BQU87QUFBQSxNQUNwQixTQUFTLEtBQUssT0FBTztBQUFBLE1BQ3JCLE9BQU8sS0FBSyxPQUFPO0FBQUEsTUFDbkIsT0FBTyxLQUFLLE9BQU87QUFBQSxNQUNuQixXQUFXLEtBQUssT0FBTztBQUFBLE1BQ3ZCLFdBQVcsS0FBSyxPQUFPO0FBQUEsSUFDekI7QUFHQSxTQUFLLGFBQ0YsVUFBa0Msa0JBQTBDLGFBQWEsRUFDekY7QUFBQSxNQUFHO0FBQUEsTUFBb0IsQ0FBQyxHQUFRLGlCQUMvQixLQUFLLE9BQU8sU0FBUyxjQUFjLEdBQUcsS0FBSyxZQUFZO0FBQUEsSUFDekQsRUFDQyxHQUFHLG1CQUFtQixDQUFDLE1BQVc7QUFDakMsV0FBSyxPQUFPLFFBQVEsR0FBRyxLQUFLLFlBQVk7QUFBQSxJQUMxQyxDQUFDO0FBQUEsRUFFTDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hLQSxpRUFBZTtBQUFBLEVBQ2Isb0JBQW9CO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLElBQ2hCLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWUsQ0FDYixVQUNBLFdBQ0EsV0FDVyxHQUFHLDJCQUEyQixhQUFhO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2Qsc0JBQXNCLENBQUMsY0FBOEIseUJBQXlCO0FBQUEsRUFDaEY7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCLFlBQVk7QUFBQSxJQUNWLGdCQUFnQixDQUFDLGFBQTZCLHdDQUF3QztBQUFBLElBQ3RGLFlBQVksQ0FBQyxhQUE2QixnQ0FBZ0M7QUFBQSxFQUM1RTtBQUFBLEVBQ0EsY0FBYyxDQUFDLFlBQTRCLElBQUk7QUFBQSxFQUMvQyxtQkFBbUI7QUFBQSxJQUNqQixXQUFXO0FBQUEsSUFDWCxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixnQkFBZ0IsQ0FBQyxtQkFBbUMsNEJBQTRCO0FBQUEsRUFDbEY7QUFBQSxFQUNBLG1CQUFtQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDJCQUEyQjtBQUFBLElBQzNCLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixjQUFjLENBQUMsYUFBNkIsNkNBQTZDO0FBQUEsSUFDekYsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4Qix1QkFBdUI7QUFBQSxJQUN2QixxQkFBcUI7QUFBQSxJQUNyQixnQ0FBZ0M7QUFBQSxFQUNsQztBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Ysd0JBQXdCO0FBQUEsRUFDeEIsb0JBQW9CO0FBQUEsRUFDcEIsV0FBVztBQUFBLEVBQ1gseUJBQXlCO0FBQUEsRUFDekIsaUNBQWlDO0FBQUEsRUFDakMsa0JBQWtCO0FBQUEsRUFDbEIsZ0JBQWdCO0FBQUEsRUFDaEIsa0JBQWtCO0FBQUEsRUFDbEIsZUFBZTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSx3QkFBd0I7QUFBQSxJQUN0QixPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsV0FBVztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNiLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLHdCQUF3QjtBQUFBLE1BQ3hCLHdCQUF3QjtBQUFBLE1BQ3hCLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLE1BQ3BCLG9CQUFvQixDQUFDLFdBQTJCLFlBQVk7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNWLGVBQWU7QUFBQSxFQUNqQjtBQUNGLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0g4RDtBQUN0QztBQUNEO0FBRUY7QUFDRztBQUUxQixNQUFNLHVCQUF1QixrRUFBYSxDQUFDO0FBaUQ1QixNQUFNLGtCQUFrQjtBQUFBLEVBaUJyQyxZQUFZLDZCQUFxQyxTQUF3QjtBQUN2RSxTQUFLLDhCQUE4QjtBQUNuQyxTQUFLLFVBQW9DLENBQUM7QUFDMUMsU0FBSyxhQUFhLE9BQU87QUFFekIsU0FBSyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssUUFBUSxxQkFBcUIsS0FBSywyQkFBMkI7QUFDOUYsU0FBSyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssUUFBUSwyQkFBMkIsS0FBSywyQkFBMkI7QUFDcEcsU0FBSyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssUUFBUSx1QkFBdUIsS0FBSywyQkFBMkI7QUFDNUYsU0FBSyxjQUFjLENBQUMsQ0FBQyxLQUFLLFFBQVEsb0JBQW9CLEtBQUssMkJBQTJCO0FBRXRGLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssd0JBQXdCO0FBQzdCLFNBQUssYUFBYTtBQUNsQixTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFRQSxVQUFVLFFBQXFCO0FBQzdCLFNBQUssbUJBQW1CO0FBQ3hCLFFBQUksQ0FBQyxVQUFVLE9BQU8sVUFBVSxHQUFHO0FBQ2pDO0FBQUEsSUFDRjtBQUVBLFdBQU8sUUFBUSxDQUFDLFVBQWU7QUFDN0IsV0FBSyxtQkFBbUIsS0FBSztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVUEsUUFBUSxTQUF1QjtBQUM3QixXQUFPLEtBQUssbUJBQW1CLE9BQU87QUFBQSxFQUN4QztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0EsVUFBVSxZQUF5QjtBQUNqQyxXQUFPLEtBQUssUUFBUSxVQUFVO0FBQUEsRUFDaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsVUFBVSxZQUFvQixPQUFzQjtBQUNsRCxTQUFLLFFBQVEsVUFBVSxJQUFJO0FBRzNCLFFBQUksZUFBZSxlQUFlLEtBQUssb0JBQW9CO0FBQ3pELE1BQXVCLEtBQUssbUJBQW9CLE9BQU8sTUFBTSxLQUFLLFFBQVE7QUFBQSxJQUM1RTtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLGFBQWEsU0FBOEI7QUFDakQsVUFBTSxlQUFlLFdBQVcsQ0FBQztBQUNqQyxVQUFNLGlCQUFnQztBQUFBLE1BQ3BDLGlCQUFpQjtBQUFBLE1BQ2pCLG1CQUFtQjtBQUFBLE1BQ25CLGdCQUFnQjtBQUFBLE1BQ2hCLGtCQUFrQjtBQUFBLFFBQ2hCLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0IsQ0FBQztBQUFBLE1BRXJCLGFBQWE7QUFBQSxRQUNYLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGFBQWE7QUFBQSxNQUNmO0FBQUE7QUFBQTtBQUFBLE1BSUEscUJBQXFCLHFCQUFxQjtBQUFBLE1BQzFDLDJCQUEyQixxQkFBcUI7QUFBQSxNQUNoRCx1QkFBdUIscUJBQXFCO0FBQUEsTUFDNUMsb0JBQW9CLHFCQUFxQjtBQUFBLE1BQ3pDLHNCQUFzQixxQkFBcUI7QUFBQSxNQUMzQyxvQkFBb0IscUJBQXFCO0FBQUEsTUFDekMsZUFBZTtBQUFBO0FBQUEsTUFHZixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUIsQ0FBQyxhQUFrQixZQUFZLENBQUM7QUFBQTtBQUFBLE1BR3JELG9CQUFvQjtBQUFBLE1BQ3BCLGtCQUFrQjtBQUFBLElBQ3BCO0FBRUEsV0FBTyxLQUFLLGNBQWMsRUFBRSxRQUFRLENBQUMsZUFBZTtBQUVsRCxXQUFLLFdBQVcsWUFBWSxjQUFjLGVBQWUsVUFBVSxDQUFDO0FBQUEsSUFDdEUsQ0FBQztBQUdELFNBQUssUUFBUSxxQkFBcUIsS0FBSyxRQUFRLG1CQUFtQixJQUFJLE1BQU07QUFBQSxFQUM5RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVRLFdBQVcsWUFBb0IsY0FBNkIsZ0JBQXFCLFFBQWlCO0FBQ3hHLFFBQUksT0FBTyxVQUFVLGVBQWUsS0FBSyxjQUFjLFVBQVUsR0FBRztBQUNsRSxXQUFLLFFBQVEsVUFBVSxJQUFJLGFBQWEsVUFBVTtBQUFBLElBQ3BELFdBQVcsT0FBTyxLQUFLLDRCQUE0QixLQUFLLFVBQVUsTUFBTSxhQUFhO0FBQ25GLFdBQUssUUFBUSxVQUFVLElBQUksS0FBSyw0QkFBNEIsS0FBSyxVQUFVO0FBQUEsSUFDN0UsT0FBTztBQUNMLFdBQUssUUFBUSxVQUFVLElBQUk7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGVBQXFCO0FBRTNCLEtBQUMsQ0FBQyxLQUFLLGtCQUFrQixFQUFFLEdBQUcsU0FBUyxLQUFLLFFBQVEsc0JBQXNCLENBQUMsVUFBVTtBQUNuRixVQUFJLENBQUMsS0FBSyxRQUFRLGFBQWE7QUFDN0I7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLENBQUMsQ0FBQyxNQUFNLE1BQU0sRUFBRSxRQUFRLEtBQUssUUFBUSxrQkFBa0I7QUFFdkUsWUFBTSxRQUFRLElBQUsseURBQVk7QUFBWixRQUNqQjtBQUFBLFVBQ0UsSUFBSSxLQUFLLFFBQVEsWUFBWTtBQUFBLFVBQzdCLGNBQWMsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUN2QyxnQkFBZ0IsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUN6QyxrQkFBa0IsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUMzQyxvQkFBb0IsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUM3QyxvQkFBb0IsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUM3QyxVQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0EsTUFBTTtBQUNKLGtCQUFRLE9BQU87QUFDZixlQUFLLGlCQUFpQjtBQUN0QixjQUFJLE9BQU8sS0FBSyxRQUFRLHFCQUFxQixhQUFhO0FBQ3hELGlCQUFLLFFBQVEsaUJBQWlCLE9BQU87QUFBQSxVQUN2QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsWUFBTSxLQUFLO0FBQUEsSUFDYixDQUFDO0FBR0QsVUFBTSxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssUUFBUSxzQkFBc0IsS0FBSyxrQkFBa0I7QUFFbEYsa0JBQWMsT0FBTyxDQUFDLENBQUMsS0FBSyxRQUFRLFdBQVc7QUFBQSxFQUNqRDtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS1EsMEJBQWdDO0FBQ3RDLFVBQU0sbUJBQWtEO0FBQUEsTUFDdEQsUUFBUSxLQUFLO0FBQUEsTUFDYixXQUFXLEtBQUssUUFBUTtBQUFBLE1BQ3hCLE9BQU8sS0FBSyxRQUFRO0FBQUEsTUFDcEIsV0FBVyxLQUFLLFFBQVE7QUFBQSxNQUN4QixXQUFXO0FBQUEsUUFDVCxZQUFZLENBQUMsV0FBZ0IsS0FBSyxlQUFlLE1BQU07QUFBQSxNQUN6RDtBQUFBLE1BQ0EsVUFBVSxDQUFDLGlCQUFzQjtBQUUvQixZQUFJLEtBQUssUUFBUSxjQUFjLEdBQUc7QUFDaEMsaUJBQU8sS0FBSyxvQkFBb0IsWUFBWTtBQUFBLFFBQzlDO0FBQ0EsZUFBTyxLQUFLLG1CQUFtQixZQUFZO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBR0EsUUFBSSxLQUFLLG1CQUFtQixRQUFRO0FBQ2xDLFdBQUssYUFBYSxJQUFJLHdFQUFrQjtBQUFsQixRQUNwQixLQUFLO0FBQUEsUUFDTDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRVEsZUFBZSxRQUFxQjtBQUMxQyxRQUFJLENBQUMsa0VBQVcsQ0FBQyxLQUFLLFFBQVEsa0JBQWtCLEdBQUc7QUFDakQsYUFBTyxLQUFLLFFBQVEsbUJBQW1CLE1BQU07QUFBQSxJQUMvQztBQUVBLFFBQUksY0FBYztBQUVsQixRQUFJLE9BQU8sVUFBVSxlQUFlLEtBQUssUUFBUSxPQUFPLEdBQUc7QUFDekQsb0JBQWMsYUFBYSxPQUFPO0FBQUEsSUFDcEM7QUFFQSxXQUFPLGtDQUFrQyxjQUFjLE9BQU8sS0FBSyxRQUFRLGVBQWU7QUFBQSxFQUM1RjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUVEsb0JBQTBCO0FBQ2hDLFNBQUsscUJBQXFCLElBQUkscURBQVUsQ0FBQztBQUFBLE1BQ3ZDLGdCQUFnQixnRUFBcUIsQ0FBQztBQUFBLE1BQ3RDLGdCQUFnQixnRUFBcUIsQ0FBQztBQUFBLE1BQ3RDLFNBQVMsS0FBVTtBQUNqQixlQUFPLElBQUksS0FBSyxRQUFRLGVBQWU7QUFBQSxNQUN6QztBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sS0FBSyxLQUFLLFFBQVE7QUFBQSxRQUNsQixTQUFTLENBQUMsT0FBZSxpQkFBeUI7QUFFaEQsZ0JBQU0sTUFBTSxNQUFNLFFBQVEsS0FBSyxRQUFRLGVBQWUsWUFBWTtBQUVsRSxjQUFJLENBQUMsa0VBQVcsQ0FBQyxLQUFLLFFBQVEsZ0JBQWdCLEdBQUc7QUFFL0Msa0JBQU0sY0FBYyxLQUFLLFFBQVEsaUJBQWlCO0FBQ2xELGtCQUFNLHFCQUFxQixPQUN4QixLQUFLLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFFBQWdCLEdBQUcsT0FBTyxtQkFBbUIsWUFBWSxHQUFHLENBQUMsR0FBRyxFQUNyRSxLQUFLLEdBQUc7QUFFWCxtQkFBTyxHQUFHLE9BQU87QUFBQSxVQUNuQjtBQUVBLGlCQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsV0FBVyxDQUFDLGFBQWtCO0FBQzVCLGNBQUksQ0FBQyxVQUFVO0FBQ2IsbUJBQU8sQ0FBQztBQUFBLFVBQ1Y7QUFDQSxnQkFBTSxzQkFBc0IsS0FBSyxRQUFRLG9CQUFvQixRQUFRO0FBQ3JFLGdCQUFNLGNBQXdCLEtBQUssZUFBZTtBQUNsRCxnQkFBTSxpQkFBd0IsQ0FBQztBQUMvQiw4QkFBb0IsUUFBUSxDQUFDLGlCQUFzQjtBQUVqRCxrQkFBTSxxQkFBNkIsT0FBTyxhQUFhLEtBQUssUUFBUSxlQUFlLENBQUM7QUFDcEYsa0JBQU0sZ0JBQWdCLEtBQUssUUFBUSxrQkFBa0IsWUFBWSxTQUFTLGtCQUFrQjtBQUM1RixrQkFBTSxhQUFhLEtBQUssUUFBUSxtQkFBbUIsU0FBUyxrQkFBa0I7QUFFOUUsZ0JBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO0FBQ2pDLDZCQUFlLEtBQUssWUFBWTtBQUFBLFlBQ2xDO0FBQUEsVUFDRixDQUFDO0FBRUQsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLHFCQUEyQjtBQUNqQyxTQUFLLG1CQUFtQixNQUFNO0FBQzlCLFNBQUssaUJBQWlCO0FBQUEsRUFDeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU1Esb0JBQW9CLGNBQTRCO0FBQ3RELFNBQUssbUJBQW1CO0FBQ3hCLFNBQUssOEJBQThCLFlBQVk7QUFFL0MsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU1EsbUJBQW1CLGNBQTRCO0FBRXJELFVBQU0sZUFBZSxDQUFDLENBQUMsS0FBSyxRQUFRLG9CQUFvQixLQUFLLGtCQUFrQjtBQUUvRSxRQUFJLEtBQUssUUFBUSxjQUFjLEtBQUssYUFBYSxVQUFVLEtBQUssUUFBUSxXQUFXO0FBQ2pGLGFBQU87QUFBQSxJQUNUO0FBRUEsU0FBSyw4QkFBOEIsWUFBWTtBQUUvQyxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVEsbUJBQXlCO0FBQy9CLFVBQU0sZUFBZSxDQUFDLENBQUMsS0FBSyxRQUFRLG9CQUFvQixLQUFLLGtCQUFrQjtBQUMvRSxTQUFLLFlBQVksT0FBTyxhQUFhLFdBQVcsQ0FBQztBQUNqRCxTQUFLLGVBQWUsT0FBTyxhQUFhLFdBQVcsQ0FBQztBQUFBLEVBQ3REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFRUSw4QkFBOEIsY0FBeUI7QUFDN0QsVUFBTSxlQUFlLENBQUMsQ0FBQyxLQUFLLFFBQVEsb0JBQW9CLEtBQUssa0JBQWtCO0FBQy9FLFVBQU0sV0FBVyxhQUFhLFNBQVMsS0FBSyxpQkFBaUIsYUFBYSxLQUFLLENBQUMsSUFBSSxJQUFJO0FBQ3hGLFVBQU0sZUFBZSxLQUFLLGVBQWUsY0FBYyxRQUFRO0FBRS9ELFVBQU0sZ0JBQWdCLENBQUMsQ0FBQyxZQUFZO0FBQ3BDLFVBQU0sZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLFFBQVEsc0JBQXNCLGFBQWE7QUFDeEUsa0JBQWMsT0FBTyxDQUFDLENBQUMsS0FBSyxRQUFRLFdBQVc7QUFFL0MsU0FBSyxtQkFBbUIsT0FBTyxhQUFhO0FBRTVDLFFBQUksT0FBTyxLQUFLLFFBQVEsc0JBQXNCLGFBQWE7QUFDekQsV0FBSyxRQUFRLGtCQUFrQixlQUFlLFlBQVk7QUFBQSxJQUM1RDtBQUNBLFNBQUssaUJBQWlCO0FBQUEsRUFDeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBa0JRLGlCQUFpQixPQUF1QjtBQUU5QyxRQUFJLFFBQVEsTUFBTSxNQUFNO0FBR3hCLFVBQU0sdUJBQStCLGtCQUFrQixLQUFLLFFBQVE7QUFDcEUsVUFBTSxTQUFTLE1BQU0sS0FBSyxPQUFPO0FBQ2pDLFdBQU8sS0FBSyxDQUFDLFlBQW9CLFVBQWtDO0FBQ2pFLFlBQU0sVUFBVSxNQUFNLEtBQUssTUFBTSxvQkFBb0I7QUFHckQsVUFBSSxXQUFXLFFBQVEsU0FBUyxHQUFHO0FBQ2pDLGNBQU0sYUFBYSxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7QUFFMUMsWUFBSSxDQUFDLE9BQU8sTUFBTSxVQUFVLEdBQUc7QUFDN0Isa0JBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVlRLGVBQWUsUUFBYSxPQUF1QjtBQUN6RCxRQUFJLFdBQVcsS0FBSyxRQUFRLGtCQUFrQixRQUFRLElBQUksT0FBTyxLQUFLLFFBQVEsZ0JBQWdCLEdBQUcsR0FBRyxPQUFPLEtBQUssQ0FBQztBQUVqSCxXQUFPLEtBQUssS0FBSyxRQUFRLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxjQUFjO0FBQ2hFLFlBQU0sYUFBYSxPQUFPLFNBQVMsS0FBSztBQUN4QyxpQkFBVyxTQUFTLFFBQVEsSUFBSSxPQUFPLEtBQUssUUFBUSxpQkFBaUIsU0FBUyxHQUFHLEdBQUcsR0FBRyxVQUFVO0FBQUEsSUFDbkcsQ0FBQztBQUVELFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT1EsaUJBQTJCO0FBQ2pDLFVBQU0sY0FBd0IsQ0FBQztBQUMvQixVQUFNLG1CQUFtQixDQUFDLENBQUMsS0FBSyxRQUFRLG9CQUFvQixLQUFLLGtCQUFrQjtBQUNuRixxQkFBaUIsS0FBSyxDQUFDLE9BQWUsa0JBQStCO0FBQ25FLFlBQU0sdUJBQStCLE1BQU0sS0FBSyxRQUFRO0FBQ3hELFlBQU0sU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEtBQUssT0FBTztBQUM1QyxhQUFPLEtBQUssQ0FBQyxZQUFvQixVQUFrQztBQUNqRSxZQUFJLE1BQU0sS0FBSyxNQUFNLG9CQUFvQixHQUFHO0FBQzFDLHNCQUFZLEtBQUssTUFBTSxLQUFLO0FBQUEsUUFDOUI7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JmZSxNQUFNLHNCQUFzQjtBQUFBLEVBT3pDLFlBQ0Usc0JBQ0EsZ0JBQ0E7QUFDQSxTQUFLLHVCQUF1QjtBQUM1QixTQUFLLGlCQUFpQixTQUFTLGNBQWlDLEtBQUssb0JBQW9CO0FBQ3pGLFNBQUssaUJBQWlCO0FBRXRCLFFBQUksQ0FBQyxLQUFLLGdCQUFnQjtBQUN4QixjQUFRLE1BQU0sa0JBQWtCLEtBQUssc0JBQXNCO0FBQUEsSUFDN0QsT0FBTztBQUNMLFdBQUssS0FBSztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFFUSxPQUFhO0FBQ25CLFVBQU0saUJBQWlCLFNBQVMsY0FBaUMsS0FBSyxvQkFBb0I7QUFFMUYsUUFBSSxnQkFBZ0I7QUFDbEIsV0FBSyxlQUFlLEtBQUssVUFBVSxDQUFDO0FBRXBDLHFCQUFlLGlCQUFpQixVQUFVLE1BQU0sS0FBSyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUM7QUFBQSxJQUN2RjtBQUFBLEVBQ0Y7QUFBQSxFQUVPLFlBQW9CO0FBeEM3QjtBQXlDSSxRQUFJLENBQUMsS0FBSyxnQkFBZ0I7QUFDeEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLHlCQUF1QyxVQUFLLGVBQWUsUUFBUSwwQkFBNUIsWUFBcUQ7QUFDbEcsVUFBTSxhQUFhLEtBQUssZUFBZSxLQUFLLEtBQUssZUFBZSxhQUFhO0FBRTdFLFFBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZO0FBQ3pDLGNBQVEsTUFBTSw0Q0FBNEM7QUFBQSxJQUM1RDtBQUVBLFFBQUksQ0FBQyxZQUFZO0FBQ2YsYUFBTztBQUFBLElBQ1Q7QUFFQSxZQUFPLGdCQUFXLGFBQWEsUUFBUSxNQUFoQyxZQUFxQztBQUFBLEVBQzlDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RDhCO0FBR2YsTUFBTSw0QkFBNEIsdUVBQWlCLENBQUM7QUFBQSxFQUtqRSxZQUNFLHlCQUNBLHNCQUNBLGdCQUNBLHNCQUNBO0FBQ0EsVUFBTSxDQUFDLENBQUMsdUJBQXVCLEdBQUc7QUFBQSxNQUNoQyxrQkFBa0IsT0FBTztBQUFBLFFBQ3ZCLFFBQVEsZUFBZTtBQUFBLE1BQ3pCO0FBQUEsTUFDQSxxQkFBcUIsQ0FBQyxhQUFrQjtBQUN0QyxZQUFJLENBQUMsWUFBWSxTQUFTLFVBQVUsV0FBVyxHQUFHO0FBQ2hELGlCQUFPLENBQUM7QUFBQSxRQUNWO0FBRUEsZUFBTyxPQUFPLE9BQU8sU0FBUyxTQUFTO0FBQUEsTUFDekM7QUFBQSxJQUVGLENBQUM7QUFDRCxTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHNCQUFzQjtBQUFBLEVBQzdCO0FBQUEsRUFFUSx3QkFBOEI7QUFDcEMsUUFBSSxLQUFLLHlCQUF5QixRQUFXO0FBQzNDO0FBQUEsSUFDRjtBQUVBLFVBQU0sZUFBcUMsT0FBTyxXQUFXLFNBQVM7QUFHdEUsaUJBQWEsR0FBRyxLQUFLLHNCQUFzQixDQUFDLFVBQWU7QUFDekQsT0FBQyxDQUFDLEtBQUssb0JBQW9CLEVBQUUsWUFBWSxZQUFZLE1BQU0sT0FBTztBQUFBLElBQ3BFLENBQUM7QUFBQSxFQUNIO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDa0M7QUFFbEMsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUtHLE1BQU0sc0JBQXNCO0FBQUEsRUFlekMsWUFDRSx1QkFDQSxvQkFDQSxnQkFDQSw4QkFDQSx5QkFBd0MsTUFDeEM7QUFDQSxTQUFLLHdCQUF3QjtBQUM3QixTQUFLLHVCQUF1QixFQUFFLHFCQUFxQjtBQUNuRCxTQUFLLHNCQUFzQixFQUFFLGtCQUFrQjtBQUMvQyxTQUFLLGlCQUFpQjtBQUN0QixTQUFLLCtCQUErQjtBQUNwQyxTQUFLLHlCQUF5QjtBQUM5QixTQUFLLHdCQUF3QixJQUFJLGdGQUFxQjtBQUFyQixNQUMvQixLQUFLO0FBQUEsTUFDSixDQUFDLFdBQXlCO0FBQ3pCLFlBQUksV0FBVyxJQUFJO0FBQ2pCO0FBQUEsUUFDRjtBQUVBLGFBQUssYUFBYSxNQUFNO0FBQUEsTUFDMUI7QUFBQSxJQUNGO0FBRUEsU0FBSyxPQUFPO0FBQ1osU0FBSyxxQkFBcUIsR0FBRyxVQUFVLE1BQU0sS0FBSyxPQUFPLENBQUM7QUFBQSxFQUM1RDtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS1EsU0FBZTtBQUNyQixRQUFJLEtBQUsscUJBQXFCLElBQUksTUFBTSxjQUFjO0FBQ3BELFdBQUssb0JBQW9CLFFBQVE7QUFDakMsVUFBSSxLQUFLLHdCQUF3QjtBQUMvQixVQUFFLEtBQUssc0JBQXNCLEVBQUUsUUFBUTtBQUFBLE1BQ3pDO0FBQUEsSUFDRixPQUFPO0FBQ0wsV0FBSyxvQkFBb0IsT0FBTztBQUNoQyxVQUFJLEtBQUssd0JBQXdCO0FBQy9CLFVBQUUsS0FBSyxzQkFBc0IsRUFBRSxPQUFPO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBRUEsU0FBSyxhQUFhLEtBQUssc0JBQXNCLFVBQVUsQ0FBQztBQUFBLEVBQzFEO0FBQUEsRUFFUSxhQUFhLFFBQXNCO0FBQ3pDLFVBQU0sc0JBQTBDLFNBQVMsY0FBYyxLQUFLLHFCQUFxQjtBQUVqRyxRQUFJLHFCQUFxQjtBQUN2QixlQUFTLElBQUksR0FBRyxJQUFJLG9CQUFvQixRQUFRLFFBQVEsS0FBSyxHQUFHO0FBQzlELGNBQU0sa0JBQWtCLG9CQUFvQixRQUFRLENBQUM7QUFFckQsWUFBSSxnQkFBZ0IsVUFBVSxVQUFVO0FBRXRDLDBCQUFnQixZQUFZO0FBQUEsUUFDOUI7QUFBQSxNQUNGO0FBRUEsWUFBTSxvQkFBNkIsb0JBQW9CLFFBQVEsb0JBQW9CLGFBQWEsRUFBRTtBQUNsRyxZQUFNLHdCQUF3RCxTQUFTO0FBQUEsUUFDckUsS0FBSztBQUFBLE1BQ1A7QUFFQSxVQUFJLHNCQUFzQixXQUFXLEdBQUc7QUFDdEM7QUFBQSxNQUNGO0FBR0EsNEJBQXNCLFFBQVEsQ0FBQyxVQUFtQjtBQUVoRCxjQUFNLFlBQVksc0JBQXNCLFdBQVcsU0FBUztBQUFBLE1BQzlELENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakdvQjtBQUNPO0FBQ0Q7QUFDSTtBQU01QjtBQUVGLGlFQUFlLHlFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQckI7QUFDbUI7QUE4Qm5CLE1BQU0sOEJBQThCLG1FQUFjLENBQXNDO0FBQUE7QUFBQTtBQUFBLEVBUzdGLFlBQVksUUFBNEI7QUFDdEMsVUFBTSxNQUFNO0FBQUEsRUFDZDtBQUFBLEVBRVUsb0JBQW9CLFFBQWtDO0FBQzlELFVBQU0sb0JBQW9CLE1BQU07QUFHaEMsU0FBSyxRQUFRLFVBQVUsSUFBSSxpQkFBaUI7QUFDNUMsU0FBSyxRQUFRLFlBQVksT0FBTztBQUdoQyxTQUFLLFNBQVMsU0FBUyxjQUFjLEtBQUs7QUFDMUMsU0FBSyxPQUFPLFVBQVUsSUFBSSxjQUFjO0FBR3hDLFNBQUssY0FBYyxTQUFTLGNBQWMsUUFBUTtBQUNsRCxTQUFLLFlBQVksYUFBYSxRQUFRLFFBQVE7QUFDOUMsU0FBSyxZQUFZLFVBQVUsSUFBSSxPQUFPLHlCQUF5QixRQUFRO0FBQ3ZFLFNBQUssWUFBWSxRQUFRLFVBQVU7QUFDbkMsU0FBSyxZQUFZLFlBQVksT0FBTztBQUdwQyxTQUFLLGdCQUFnQixTQUFTLGNBQWMsUUFBUTtBQUNwRCxTQUFLLGNBQWMsYUFBYSxRQUFRLFFBQVE7QUFDaEQsU0FBSyxjQUFjLFVBQVU7QUFBQSxNQUMzQjtBQUFBLE1BQ0EsT0FBTztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUNBLFNBQUssY0FBYyxRQUFRLFVBQVU7QUFDckMsU0FBSyxjQUFjLFlBQVksT0FBTztBQUd0QyxTQUFLLE9BQU8sT0FBTyxLQUFLLGFBQWEsR0FBRyxPQUFPLGVBQWUsS0FBSyxhQUFhO0FBQ2hGLFNBQUssUUFBUSxPQUFPLEtBQUssTUFBTTtBQUFBLEVBQ2pDO0FBQ0Y7QUFTTyxNQUFNLHFCQUFxQiwwREFBSyxDQUE2QjtBQUFBLEVBR2xFLFlBQ0UsYUFDQSxpQkFDQSxnQkFDQTtBQXZHSjtBQXdHSSxRQUFJO0FBRUosUUFBSSxDQUFDLGtFQUFXLENBQUMsWUFBWSxlQUFlLEdBQUc7QUFDN0MsNkJBQXVCLFlBQVk7QUFBQSxJQUNyQyxXQUFXLENBQUMsa0VBQVcsQ0FBQyxlQUFlLEdBQUc7QUFDeEMsNkJBQXVCO0FBQUEsSUFDekIsT0FBTztBQUdMLDZCQUF1QixNQUFZO0FBQ2pDLGdCQUFRLE1BQU0sMERBQTBEO0FBQUEsTUFDMUU7QUFBQSxJQUNGO0FBRUEsVUFBTSxTQUE2QjtBQUFBLE1BQ2pDLElBQUk7QUFBQSxNQUNKLGdCQUFnQjtBQUFBLE1BQ2hCLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLE1BQ3BCLG9CQUFvQjtBQUFBLE1BQ3BCLGVBQWUsQ0FBQztBQUFBLE1BQ2hCLFVBQVU7QUFBQSxNQUNWLFlBQVksWUFBWTtBQUFBLE1BQ3hCLGFBQWEsQ0FBQztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWUsaUJBQVksa0JBQVosWUFBNkI7QUFBQSxPQUN6QztBQUdMLFVBQU0sTUFBTTtBQUFBLEVBQ2Q7QUFBQSxFQUVVLGNBQWMsUUFBa0M7QUFDeEQsU0FBSyxRQUFRLElBQUksc0JBQXNCLE1BQU07QUFDN0MsU0FBSyxNQUFNLGNBQWMsaUJBQWlCLFNBQVMsT0FBTyxlQUFlO0FBQ3pFLFVBQU0sY0FBYyxNQUFNO0FBQUEsRUFDNUI7QUFDRjtBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZJckI7QUFnQ0EsTUFBTSx3QkFBd0Isc0VBQVcsQ0FBZ0M7QUFBQSxFQUM5RSxZQUNFLFFBQ0E7QUFDQSxVQUFNLGVBQXVDO0FBQUEsTUFDM0MsV0FBVyxPQUFPO0FBQUEsTUFDbEIsVUFBVSxDQUFDLFFBQTJCLFVBQWlCO0FBOUM3RDtBQStDUSxhQUFLO0FBQUEsVUFDSDtBQUFBLFVBQ0E7QUFBQSxVQUNBLE9BQU87QUFBQSxXQUNQLFlBQU8seUJBQVAsWUFBK0I7QUFBQSxXQUMvQixZQUFPLGlCQUFQLFlBQXVCO0FBQUEsUUFDekI7QUFBQSxNQUNGO0FBQUEsTUFDQSxpQkFBaUIsQ0FBQyxRQUEyQixVQUFpQjtBQXZEcEU7QUF3RFEsYUFBSyxrQkFBa0IsUUFBUSxPQUFPLE9BQU8sc0JBQXFCLFlBQU8saUJBQVAsWUFBdUIsTUFBTTtBQUFBLE1BQ2pHO0FBQUEsT0FDRztBQUdMLFVBQU0sWUFBWTtBQUFBLEVBQ3BCO0FBQUEsRUFFUSxlQUNOLFFBQ0EsT0FDQSxjQUNBLHNCQUNBLGNBQ007QUF0RVY7QUF1RUksUUFBSSxDQUFDLGNBQWM7QUFDakI7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFxQyxLQUFLLFFBQVEsUUFBUSxZQUFZO0FBRTVFLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBR0EsVUFBTSxnQkFBZ0IsV0FBVyxpQkFBaUIsb0JBQW9CO0FBQ3RFLGtCQUFjLFFBQVEsQ0FBQyxpQkFBaUI7QUFDdEMsbUJBQWEsaUJBQWlCLFNBQVMsTUFBTTtBQUMzQyxhQUFLLEtBQUs7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxpQkFBYSxZQUFZLElBQUksU0FBUyxVQUFVLElBQUcsZ0JBQVcsWUFBWCxZQUFzQixNQUFNLEtBQUs7QUFBQSxFQUN0RjtBQUFBLEVBRVEsa0JBQ04sUUFDQSxPQUNBLHFCQUNBLGNBQ007QUFDTixRQUFJLENBQUMscUJBQXFCO0FBQ3hCO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBcUMsS0FBSyxRQUFRLFFBQVEsWUFBWTtBQUU1RSxRQUFJLENBQUMsWUFBWTtBQUNmO0FBQUEsSUFDRjtBQUVBLHdCQUFvQixZQUFZLFFBQVEsS0FBSztBQUFBLEVBQy9DO0FBQUEsRUFFUSxRQUFRLFFBQTJCLGNBQThDO0FBQ3ZGLFFBQUksQ0FBQyxPQUFPLGVBQWU7QUFDekIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLE9BQU8sY0FBYyxTQUFTLGNBQStCLFlBQVk7QUFBQSxFQUNsRjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pIQSxNQUFxQixlQUFyQixjQUF5QyxNQUFNO0FBQUEsRUFPN0MsWUFBWSxXQUFtQixhQUFrQixDQUFDLEdBQUc7QUFDbkQsVUFBTSxhQUFZLGlCQUFpQjtBQUNuQyxTQUFLLFlBQVk7QUFDakIsU0FBSyxrQkFBa0I7QUFBQSxFQUN6QjtBQUFBLEVBRUEsSUFBSSxPQUFlO0FBQ2pCLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLElBQUksYUFBa0I7QUFDcEIsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUNGO0FBcEJBLElBQXFCLGNBQXJCO0FBQXFCLFlBQ0gsb0JBQTRCO0FBTjlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNPMkI7QUFHcEI7QUFDaUI7QUFDRTtBQXFEbkIsTUFBTSw2QkFBNkIsbUVBQWMsQ0FBcUM7QUFBQTtBQUFBO0FBQUEsRUFlM0YsWUFBWSxRQUEyQjtBQUNyQyxVQUFNLE1BQU07QUFBQSxFQUNkO0FBQUEsRUFFVSxvQkFBb0IsUUFBaUM7QUFDN0QsVUFBTSxvQkFBb0IsTUFBTTtBQUNoQyxTQUFLLFVBQVUsVUFBVSxJQUFJLGNBQWM7QUFHM0MsU0FBSyxRQUFRLFVBQVUsSUFBSSxRQUFRO0FBRW5DLFNBQUssU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM3QyxTQUFLLE9BQU8sY0FBYztBQUMxQixTQUFLLE9BQU8sWUFBWTtBQUN4QixTQUFLLE9BQU8sUUFBUTtBQUNwQixTQUFLLE9BQU8sYUFBYSxRQUFRLEdBQUcsT0FBTyxXQUFXO0FBQ3RELFFBQUksQ0FBQyxPQUFPLFVBQVU7QUFDcEIsV0FBSyxPQUFPLFNBQVM7QUFBQSxJQUN2QjtBQUVBLFNBQUssU0FBUyxTQUFTLGNBQWMsS0FBSztBQUMxQyxTQUFLLE9BQU8sVUFBVSxJQUFJLHFCQUFxQjtBQUUvQyxTQUFLLFVBQVUsU0FBUyxjQUFjLEtBQUs7QUFDM0MsU0FBSyxRQUFRLFVBQVUsSUFBSSxTQUFTO0FBRXBDLFNBQUssT0FBTyxZQUFZLEtBQUssT0FBTztBQUNwQyxTQUFLLEtBQUssT0FBTyxLQUFLLFFBQVEsS0FBSyxNQUFNO0FBR3pDLFFBQUksQ0FBQyxrRUFBVyxDQUFDLE9BQU8sZ0JBQWdCLEtBQUssQ0FBQyxrRUFBVyxDQUFDLE9BQU8sa0JBQWtCLEdBQUc7QUFDcEYsV0FBSyxTQUFTLFNBQVMsY0FBYyxLQUFLO0FBQzFDLFdBQUssT0FBTyxVQUFVLElBQUksY0FBYztBQUd4QyxVQUFJLENBQUMsa0VBQVcsQ0FBQyxPQUFPLGdCQUFnQixHQUFHO0FBQ3pDLGFBQUssY0FBYyxTQUFTLGNBQWMsUUFBUTtBQUNsRCxhQUFLLFlBQVksYUFBYSxRQUFRLFFBQVE7QUFDOUMsYUFBSyxZQUFZLFVBQVUsSUFBSSxPQUFPLHlCQUF5QixRQUFRO0FBQ3ZFLGFBQUssWUFBWSxRQUFRLFVBQVU7QUFDbkMsYUFBSyxZQUFZLFlBQVksT0FBTztBQUNwQyxhQUFLLE9BQU8sT0FBTyxLQUFLLFdBQVc7QUFBQSxNQUNyQztBQUdBLFVBQUksQ0FBQyxrRUFBVyxDQUFDLE9BQU8sa0JBQWtCLEdBQUc7QUFDM0MsYUFBSyxnQkFBZ0IsU0FBUyxjQUFjLFFBQVE7QUFDcEQsYUFBSyxjQUFjLGFBQWEsUUFBUSxRQUFRO0FBQ2hELGFBQUssY0FBYyxVQUFVLElBQUksT0FBTyxlQUFlLFVBQVUsb0JBQW9CO0FBQ3JGLFlBQUksT0FBTyxnQkFBZ0I7QUFDekIsZUFBSyxjQUFjLFFBQVEsVUFBVTtBQUFBLFFBQ3ZDO0FBQ0EsYUFBSyxjQUFjLFlBQVksT0FBTztBQUN0QyxhQUFLLE9BQU8sT0FBTyxLQUFLLGFBQWE7QUFBQSxNQUN2QztBQUdBLFdBQUssUUFBUSxPQUFPLEtBQUssTUFBTTtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGO0FBT08sTUFBTSxvQkFBb0IsMERBQUssQ0FBNEI7QUFBQSxFQVNoRSxZQUNFLGFBQ0E7QUFDQSxVQUFNLFNBQTRCO0FBQUEsTUFDaEMsSUFBSTtBQUFBLE1BQ0osVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsbUJBQW1CO0FBQUEsTUFDbkIsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE9BQ1g7QUFFTCxVQUFNLE1BQU07QUFBQSxFQUNkO0FBQUEsRUFFVSxjQUFjLFFBQWlDO0FBRXZELFNBQUssUUFBUSxJQUFJLHFCQUFxQixNQUFNO0FBQzVDLFVBQU0sY0FBYyxNQUFNO0FBRTFCLFNBQUssV0FBVyxPQUFPO0FBQ3ZCLFNBQUssb0JBQW9CLE9BQU87QUFDaEMsU0FBSyxNQUFNLE9BQU8saUJBQWlCLFFBQVEsQ0FBQyxnQkFBdUI7QUFFakUsV0FBSyxNQUFNLEtBQUssT0FBTyxHQUFHLENBQUM7QUFDM0IsV0FBSyxZQUFZO0FBQ2pCLFVBQUksT0FBTyxVQUFVO0FBQ25CLGVBQU8sU0FBUyxLQUFLLE1BQU0sUUFBUSxXQUFXO0FBQUEsTUFDaEQ7QUFFQSxVQUFJLEtBQUssTUFBTSxPQUFPLGVBQWU7QUFDbkMsYUFBSyxNQUFNLE9BQU8sY0FBYyxpQkFBaUIsZ0JBQWdCLENBQUMsZ0JBQW1DO0FBQ25HLGNBQUksT0FBTyxVQUFVO0FBQ25CLG1CQUFPLFNBQVMsS0FBSyxNQUFNLFFBQVEsV0FBVztBQUFBLFVBQ2hEO0FBQ0EsZUFBSyxZQUFZO0FBQUEsUUFDbkIsQ0FBQztBQUdELGFBQUssZUFBZTtBQUFBLE1BQ3RCO0FBQUEsSUFDRixDQUFDO0FBRUQsU0FBSyxPQUFPLEdBQUcsa0JBQWtCLE1BQU07QUFDckMsV0FBSyxNQUFNLE9BQU8sTUFBTSxPQUFPO0FBQUEsSUFDakMsQ0FBQztBQUVELFdBQU8saUJBQWlCLHNFQUFXLENBQUMsbUJBQW9CLENBQUMsVUFBdUI7QUFDOUUsVUFBSSxPQUFPLGVBQWU7QUFDeEIsZUFBTyxjQUFjLEtBQUs7QUFBQSxNQUM1QjtBQUFBLElBQ0YsQ0FBbUI7QUFFbkIsUUFBSSxLQUFLLE1BQU0saUJBQWlCLE9BQU8saUJBQWlCO0FBQ3RELFdBQUssTUFBTSxjQUFjLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUM1RCxZQUFJLE9BQU8saUJBQWlCO0FBQzFCLGlCQUFPLGdCQUFnQixLQUFLLE1BQU0sUUFBUSxLQUFLO0FBQUEsUUFDakQ7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBTyxTQUFpQixhQUFzQixNQUFNLGVBQXdCLE9BQWE7QUFDdkYsUUFBSSxjQUFjO0FBQ2hCLFdBQUssTUFBTSxRQUFRLFlBQVk7QUFBQSxJQUNqQyxPQUFPO0FBQ0wsV0FBSyxNQUFNLFFBQVEsWUFBWTtBQUFBLElBQ2pDO0FBQ0EsU0FBSyxNQUFNLFFBQVEsVUFBVSxPQUFPLFFBQVE7QUFFNUMsUUFBSSxZQUFZO0FBQ2QsV0FBSyxXQUFXO0FBQUEsSUFDbEI7QUFFQSxTQUFLLFdBQVc7QUFDaEIsU0FBSyxZQUFZO0FBRWpCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxjQUFvQjtBQUNsQixVQUFNLGFBQWEsS0FBSyxlQUFlLEtBQUssTUFBTSxJQUFJO0FBQ3RELFVBQU0sWUFBWSxLQUFLLGNBQWMsS0FBSyxNQUFNLElBQUk7QUFDcEQsU0FBSyxNQUFNLE9BQU8sTUFBTSxTQUFTLEdBQUc7QUFDcEMsU0FBSyxNQUFNLE9BQU8sTUFBTSxRQUFRLEdBQUc7QUFDbkMsU0FBSyxNQUFNLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDM0MsU0FBSyxNQUFNLE9BQU8sVUFBVSxPQUFPLFdBQVc7QUFDOUMsU0FBSyxNQUFNLE9BQU8sVUFBVSxJQUFJLFdBQVc7QUFFM0MsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLGNBQW9CO0FBQ2xCLFNBQUssTUFBTSxPQUFPLFVBQVUsT0FBTyxXQUFXO0FBQzlDLFNBQUssTUFBTSxPQUFPLFVBQVUsSUFBSSxTQUFTO0FBQ3pDLFNBQUssTUFBTSxPQUFPLFVBQVUsSUFBSSxRQUFRO0FBRXhDLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxPQUFhO0FBQ1gsVUFBTSxLQUFLO0FBQ1gsU0FBSyxvQkFBb0I7QUFFekIsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLGFBQW1CO0FBQ2pCLFNBQUssTUFBTSxPQUFPLFVBQVUsSUFBSSxRQUFRO0FBQUEsRUFDMUM7QUFBQSxFQUVRLHdCQUE0QztBQUNsRCxRQUFJLEtBQUssWUFBWSxLQUFLLE1BQU0sT0FBTyxlQUFlO0FBQ3BELGFBQU8sS0FBSyxNQUFNLE9BQU8sY0FBYyxTQUFTLGNBQWMsS0FBSyxpQkFBaUI7QUFBQSxJQUN0RjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSxpQkFBdUI7QUFDN0IsVUFBTSxrQkFBc0MsS0FBSyxzQkFBc0I7QUFFdkUsUUFBSSxpQkFBaUI7QUFDbkIsV0FBSyxvQkFBb0I7QUFDekIsV0FBSyxpQkFBaUIsSUFBSSxnRUFBYyxDQUFDLE1BQU07QUFDN0MsYUFBSyxXQUFXO0FBQUEsTUFDbEIsQ0FBQztBQUVELFdBQUssZUFBZSxRQUFRLGVBQWU7QUFBQSxJQUM3QztBQUNBLFNBQUssV0FBVztBQUFBLEVBQ2xCO0FBQUEsRUFFUSxzQkFBNEI7QUFDbEMsUUFBSSxLQUFLLGdCQUFnQjtBQUN2QixXQUFLLGVBQWUsV0FBVztBQUMvQixXQUFLLGlCQUFpQjtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUFBLEVBRVEsYUFBbUI7QUFDekIsVUFBTSxrQkFBc0MsS0FBSyxzQkFBc0I7QUFFdkUsUUFBSSxpQkFBaUI7QUFDbkIsWUFBTSxxQkFBcUIsZ0JBQWdCO0FBQzNDLFlBQU0sZ0JBQWdCLEtBQUssZUFBZSxLQUFLLE1BQU0sT0FBTyxJQUN4RDtBQUdKLFVBQUksZUFBZTtBQUVqQixhQUFLLE1BQU0sT0FBTyxNQUFNLFNBQVMsR0FBRztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGVBQWUsU0FBOEI7QUFFbkQsUUFBSSxDQUFDLFFBQVEsY0FBYztBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksU0FBUyxRQUFRO0FBQ3JCLFVBQU0sUUFBNkIsaUJBQWlCLE9BQU87QUFFM0QsY0FBVSxTQUFTLE1BQU0sV0FBVyxFQUFFLElBQUksU0FBUyxNQUFNLGNBQWMsRUFBRTtBQUV6RSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVEsY0FBYyxTQUE4QjtBQUVsRCxRQUFJLENBQUMsUUFBUSxhQUFhO0FBQ3hCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxRQUFRLFFBQVE7QUFDcEIsVUFBTSxRQUE2QixpQkFBaUIsT0FBTztBQUUzRCxhQUFTLFNBQVMsTUFBTSxZQUFZLEVBQUUsSUFBSSxTQUFTLE1BQU0sYUFBYSxFQUFFO0FBRXhFLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hTcEIsTUFBTSxlQUE2QztBQUFBLEVBaUJ4RCxZQUFZLGFBQStCO0FBQ3pDLFVBQU0sU0FBc0I7QUFBQSxNQUMxQixJQUFJO0FBQUEsTUFDSixVQUFVO0FBQUEsT0FDUDtBQUdMLFNBQUssb0JBQW9CLE1BQU07QUFBQSxFQUNqQztBQUFBLEVBRVUsb0JBQW9CLFFBQTJCO0FBRXZELFNBQUssWUFBWSxTQUFTLGNBQWMsS0FBSztBQUM3QyxTQUFLLFVBQVUsVUFBVSxJQUFJLFNBQVMsTUFBTTtBQUM1QyxTQUFLLFVBQVUsS0FBSyxPQUFPO0FBRzNCLFNBQUssU0FBUyxTQUFTLGNBQWMsS0FBSztBQUMxQyxTQUFLLE9BQU8sVUFBVSxJQUFJLGNBQWM7QUFDeEMsUUFBSSxPQUFPLGFBQWE7QUFDdEIsYUFBTyxLQUFLLE9BQU8sV0FBVyxFQUFFLFFBQVEsQ0FBQyxRQUFnQjtBQUV2RCxhQUFLLE9BQU8sTUFBTSxHQUFHLElBQUksT0FBTyxZQUFZLEdBQUc7QUFBQSxNQUNqRCxDQUFDO0FBQUEsSUFDSDtBQUdBLFNBQUssVUFBVSxTQUFTLGNBQWMsS0FBSztBQUMzQyxTQUFLLFFBQVEsVUFBVSxJQUFJLGVBQWU7QUFHMUMsU0FBSyxVQUFVLFNBQVMsY0FBYyxHQUFHO0FBQ3pDLFNBQUssUUFBUSxVQUFVLElBQUksZUFBZTtBQUcxQyxTQUFLLFNBQVMsU0FBUyxjQUFjLEtBQUs7QUFDMUMsU0FBSyxPQUFPLFVBQVUsSUFBSSxjQUFjO0FBR3hDLFFBQUksT0FBTyxZQUFZO0FBQ3JCLFdBQUssUUFBUSxTQUFTLGNBQWMsSUFBSTtBQUN4QyxXQUFLLE1BQU0sVUFBVSxJQUFJLGFBQWE7QUFDdEMsV0FBSyxNQUFNLFlBQVksT0FBTztBQUFBLElBQ2hDO0FBR0EsU0FBSyxZQUFZLFNBQVMsY0FBYyxRQUFRO0FBQ2hELFNBQUssVUFBVSxVQUFVLElBQUksT0FBTztBQUNwQyxTQUFLLFVBQVUsYUFBYSxRQUFRLFFBQVE7QUFDNUMsU0FBSyxVQUFVLFFBQVEsVUFBVTtBQUNqQyxTQUFLLFVBQVUsWUFBWTtBQUczQixTQUFLLE9BQU8sU0FBUyxjQUFjLEtBQUs7QUFDeEMsU0FBSyxLQUFLLFVBQVUsSUFBSSxjQUFjLGFBQWEsb0JBQW9CO0FBR3ZFLFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSyxPQUFPLFlBQVksS0FBSyxLQUFLO0FBQUEsSUFDcEM7QUFDQSxTQUFLLE9BQU8sWUFBWSxLQUFLLFNBQVM7QUFDdEMsU0FBSyxRQUFRLE9BQU8sS0FBSyxRQUFRLEtBQUssSUFBSTtBQUMxQyxTQUFLLEtBQUssWUFBWSxLQUFLLE9BQU87QUFDbEMsU0FBSyxPQUFPLFlBQVksS0FBSyxPQUFPO0FBQ3BDLFNBQUssVUFBVSxZQUFZLEtBQUssTUFBTTtBQUFBLEVBQ3hDO0FBQ0Y7QUFRTyxNQUFNLE1BQTJCO0FBQUEsRUFLdEMsWUFDRSxhQUNBO0FBQ0EsVUFBTSxTQUFzQjtBQUFBLE1BQzFCLElBQUk7QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLGFBQWEsQ0FBQztBQUFBLE9BQ1g7QUFHTCxTQUFLLGNBQWMsTUFBTTtBQUFBLEVBQzNCO0FBQUEsRUFFVSxjQUFjLFFBQTJCO0FBRWpELFFBQUksQ0FBQyxLQUFLLE9BQU87QUFDZixXQUFLLFFBQVEsSUFBSSxlQUFlLE1BQU07QUFBQSxJQUN4QztBQUdBLFNBQUssU0FBUyxDQUFDLENBQUMsS0FBSyxNQUFNLFNBQVM7QUFFcEMsVUFBTSxFQUFDLElBQUksU0FBUSxJQUFJO0FBQ3ZCLFNBQUssT0FBTyxNQUFNO0FBQUEsTUFDaEIsVUFBVSxXQUFXLE9BQU87QUFBQSxNQUM1QixVQUFVLGFBQWEsU0FBWSxXQUFXO0FBQUEsSUFDaEQsQ0FBQztBQUVELFNBQUssT0FBTyxNQUFNLE1BQU07QUFFeEIsU0FBSyxPQUFPLEdBQUcsbUJBQW1CLE1BQU07QUFDdEMsWUFBTSxRQUFRLFNBQVMsY0FBYyxJQUFJLElBQUk7QUFFN0MsVUFBSSxPQUFPO0FBQ1QsY0FBTSxPQUFPO0FBQUEsTUFDZjtBQUVBLFVBQUksT0FBTyxlQUFlO0FBQ3hCLGVBQU8sY0FBYztBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBRUQsYUFBUyxLQUFLLFlBQVksS0FBSyxNQUFNLFNBQVM7QUFBQSxFQUNoRDtBQUFBLEVBRUEsU0FBUyxZQUEwQjtBQUNqQyxRQUFJLENBQUMsS0FBSyxNQUFNLE9BQU87QUFDckIsV0FBSyxNQUFNLFFBQVEsU0FBUyxjQUFjLElBQUk7QUFDOUMsV0FBSyxNQUFNLE1BQU0sVUFBVSxJQUFJLGFBQWE7QUFDNUMsVUFBSSxLQUFLLE1BQU0sV0FBVztBQUN4QixhQUFLLE1BQU0sT0FBTyxhQUFhLEtBQUssTUFBTSxPQUFPLEtBQUssTUFBTSxTQUFTO0FBQUEsTUFDdkUsT0FBTztBQUNMLGFBQUssTUFBTSxPQUFPLFlBQVksS0FBSyxNQUFNLEtBQUs7QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFFQSxTQUFLLE1BQU0sTUFBTSxZQUFZO0FBRTdCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxPQUFPLFNBQXVCO0FBQzVCLFNBQUssTUFBTSxRQUFRLFlBQVk7QUFFL0IsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLE9BQWE7QUFDWCxTQUFLLE9BQU8sTUFBTSxNQUFNO0FBRXhCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxPQUFhO0FBQ1gsU0FBSyxPQUFPLE1BQU0sTUFBTTtBQUV4QixTQUFLLE9BQU8sR0FBRyxrQkFBa0IsTUFBTTtBQUNyQyxXQUFLLE9BQU8sTUFBTSxNQUFNO0FBQ3hCLFdBQUssT0FBTyxJQUFJLGdCQUFnQjtBQUFBLElBQ2xDLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdORDtBQUNEO0FBRW5CLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFnQkcsTUFBTSxPQUFPO0FBQUEsRUFDMUIsY0FBYztBQUNaLFFBQUksT0FBTyxjQUFjLE9BQU8sV0FBVyxjQUFjO0FBQ3ZELGFBQU8sT0FBTywwREFBYSxFQUFFLE9BQU8sV0FBVyxZQUFZO0FBQUEsSUFDN0Q7QUFFQSw4REFBZSxDQUFDLG1EQUFNO0FBQ3RCLGlFQUFrQjtBQUFWLE1BQ04sRUFBRSxRQUFRLEVBQ1AsS0FBSyxNQUFNLEVBQ1gsS0FBSyxVQUFVO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVUEsU0FBUyxPQUFlLFNBQWtDLENBQUMsR0FBVztBQUNwRSxVQUFNLGtCQUFrQixPQUFPLE9BQU8sUUFBUTtBQUFBLE1BQzVDLFFBQVEsRUFBRSxRQUFRLEVBQ2YsS0FBSyxNQUFNLEVBQ1gsS0FBSyxPQUFPO0FBQUEsSUFDakIsQ0FBQztBQUVELFdBQU8sMkRBQWdCLENBQUMsT0FBTyxlQUFlO0FBQUEsRUFDaEQ7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NPLFNBQVMsWUFBWSxPQUFnQztBQUMxRCxTQUFPLE9BQU8sVUFBVTtBQUMxQjtBQU9PLFNBQVMsVUFBVSxPQUFxQjtBQUM3QyxTQUFPLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQjZCO0FBRTdCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFtQkcsTUFBTSxvQkFBb0I7QUFBQSxFQVN2QyxZQUNFLFFBQ0EsV0FDQTtBQUNBLFNBQUssU0FBUztBQUNkLFNBQUssWUFBWTtBQUNqQixTQUFLLFlBQXlCLFNBQVMsY0FBYyx3RkFBZ0IsQ0FBQyxhQUFhO0FBQ25GLFNBQUssU0FBUztBQUNkLFNBQUssY0FBYztBQUFBLEVBQ3JCO0FBQUEsRUFFTSxnQkFBK0I7QUFBQTtBQUNuQyxZQUFNLHVCQUF1QixFQUFFLHdGQUFnQixDQUFDLG1CQUFtQjtBQUluRSxZQUFNLE9BQU87QUFDYixZQUFNLFFBQVEscUJBQXFCLEtBQUssNEJBQTRCO0FBRXBFLDJCQUFxQixRQUFRO0FBQUEsUUFDM0IseUJBQXlCO0FBQUEsUUFDekIsTUFBTTtBQUFBLFVBQ0osS0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLO0FBQUEsVUFDNUIsVUFBVTtBQUFBLFVBQ1YsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFVBQ1AsS0FBSyxRQUF3RDtBQUMzRCxtQkFBTztBQUFBLGNBQ0wsR0FBRyxPQUFPO0FBQUEsWUFDWjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLGVBQWUsTUFBdUQ7QUFFcEUsa0JBQU0sd0JBQTRDLEtBQUssNEJBQTRCO0FBQ25GLGtCQUFNLFVBQWtDLENBQUM7QUFBQSxjQUN2QyxJQUFJLHNCQUFzQjtBQUFBLGNBQzFCLE1BQU0sc0JBQXNCO0FBQUEsWUFDOUIsQ0FBQztBQUVELG9CQUFRLEtBQUssR0FBRyxLQUFLLGFBQWEsSUFBSSxDQUFDLGlCQUFvQztBQUFBLGNBQ3pFLElBQUksWUFBWTtBQUFBLGNBQ2hCLE1BQU0sWUFBWTtBQUFBLFlBQ3BCLEVBQUUsQ0FBQztBQUVILG1CQUFPLEVBQUMsUUFBTztBQUFBLFVBQ2pCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLEVBRUEsT0FBTyxPQUF1QjtBQUM1QixVQUFNLGNBQXVDO0FBQUEsTUFDM0MsV0FBVyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxlQUFtQyxLQUFLLFVBQVUsY0FBYyx3RkFBZ0IsQ0FBQyxZQUFZO0FBQ25HLFFBQUksU0FBd0I7QUFJNUIsUUFBSSxpQkFBaUIsTUFBTTtBQUN6QixlQUFTLE9BQU8sYUFBYSxLQUFLO0FBQUEsSUFDcEM7QUFFQSxRQUFJLFFBQVE7QUFDVixrQkFBWSxTQUFTO0FBQUEsSUFDdkI7QUFFQSxXQUFPLEtBQUssT0FBTyxTQUFTLDhDQUE4QyxXQUFXO0FBQUEsRUFDdkY7QUFBQSxFQUVBLDhCQUFpRDtBQUMvQyxVQUFNLHNCQUEwQyxLQUFLLFVBQVUsY0FBYyx3RkFBZ0IsQ0FBQyxtQkFBbUI7QUFFakgsV0FBTztBQUFBLE1BQ0wsZUFBZSxPQUFPLG9CQUFvQixRQUFRLG9CQUFvQjtBQUFBLE1BQ3RFLGlCQUFpQixPQUFPLG9CQUFvQixRQUFRLG9CQUFvQjtBQUFBLElBQzFFO0FBQUEsRUFDRjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9HNkI7QUFDSztBQUNGO0FBRWpCLE1BQU0saUJBQWlCO0FBQUEsRUFDcEMsY0FBYztBQUNaLFNBQUssS0FBSztBQUFBLEVBQ1o7QUFBQSxFQUVRLE9BQWE7QUFHbkIsVUFBTSxlQUFlLEtBQUssZ0JBQWdCO0FBQzFDLFVBQU0sc0JBQXNCLEtBQUssd0JBQXdCO0FBRXpELFFBQUksaUJBQWlCLE1BQU07QUFFekIsbUJBQWEsaUJBQWlCLFVBQVUsTUFBTSxvQkFBb0IsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUFBLElBQ2pGO0FBQUEsRUFDRjtBQUFBLEVBRVEsMEJBQStDO0FBQ3JELFdBQU8sSUFBSSw4RUFBbUI7QUFBbkIsTUFDVCx3RkFBZ0IsQ0FBQztBQUFBLE1BQ2pCLHdGQUFnQixDQUFDO0FBQUEsTUFDakIsTUFBRztBQTdCVDtBQTZCWSw2QkFBTyxVQUFLLGdCQUFnQixNQUFyQixtQkFBd0IsS0FBSyxNQUFwQyxZQUF5QztBQUFBO0FBQUEsTUFDL0MsOEZBQXFCLENBQUM7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPUSxrQkFBMEM7QUFDaEQsV0FBMkIsU0FBUztBQUFBLE1BQ2xDLEdBQUcsd0ZBQWdCLENBQUMsaUJBQWlCLHdGQUFnQixDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNBLGlFQUFlO0FBQUEsRUFDYixnQkFBZ0I7QUFDbEIsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZGLGlFQUFlO0FBQUEsRUFDYixnQkFBZ0I7QUFBQSxFQUNoQixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWix5QkFBeUI7QUFBQSxFQUN6QixZQUFZO0FBQUEsRUFDWixrQkFBa0I7QUFBQSxFQUVsQiwyQkFBMkI7QUFBQSxFQUMzQixxQkFBcUI7QUFBQSxFQUNyQiwyQkFBMkI7QUFBQSxFQUUzQiwwQkFBMEI7QUFBQSxFQUMxQixjQUFjO0FBQUEsRUFDZCxxQkFBcUI7QUFBQSxFQUNyQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCxxQkFBcUI7QUFDdkIsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7QUN2Qlcsd0NBQXdDLGNBQWMsbUJBQW1CLHlGQUF5RixTQUFTLGlGQUFpRixnQkFBZ0IsYUFBYSxxR0FBcUcsOEJBQThCLDhFQUE4RSx5QkFBeUIsV0FBVyxtREFBbUQsc0JBQXNCLDJCQUEyQix1QkFBdUIsNkJBQTZCLDRCQUE0Qiw0QkFBNEIsaUNBQWlDLDRCQUE0QiwwQkFBMEIsNEJBQTRCLDBCQUEwQiwyQkFBMkIsK0JBQStCLDBCQUEwQix3QkFBd0IseUJBQXlCLDZCQUE2Qix1Q0FBdUMseUJBQXlCLDJDQUEyQyxvSEFBb0gsK0ZBQStGLDhDQUE4QyxTQUFTLDJCQUEyQixnQ0FBZ0Msa0RBQWtELGlGQUFpRiwwQkFBMEIsK0JBQStCLDJCQUEyQixjQUFjLCtCQUErQixzQ0FBc0MsNENBQTRDLHNCQUFzQixxQkFBcUIsUUFBUSxvQkFBb0IscUNBQXFDLE1BQU0sU0FBUyxpQ0FBaUMsNkJBQTZCLEtBQUssWUFBWSx3RUFBd0UsNkJBQTZCLFdBQVcsZ0RBQWdELHdDQUF3QyxLQUFLLHVCQUF1QixPQUFPLCtEQUErRCx3REFBd0QsTUFBTSxrRUFBa0UsdUZBQXVGLHNQQUFzUCx5QkFBeUIsUUFBUSxzR0FBc0csbUNBQW1DLG9DQUFvQywwQ0FBMEMsU0FBUywwQkFBMEIsMkhBQTJILHNCQUFzQiwwQ0FBMEMsMkI7Ozs7Ozs7Ozs7Ozs7OztBQ0F2ckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QixlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsR0FBRztBQUN0QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCLG1CQUFtQixHQUFHO0FBQ3RCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLG9EQUFvRCxnQkFBZ0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLHFCQUFNLG9CQUFvQixxQkFBTTtBQUMvQyxlQUFlLHFCQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQ0FBZ0MsOEJBQThCO0FBQy9GLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNB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QWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHNDQUFzQyxLQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLGdEQUFnRCxTQUFTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHVCQUF1QjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsRTs7Ozs7Ozs7Ozs7QUNsNUVELGtDOzs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGa0M7QUFDTDtBQUNLO0FBQ0Y7QUFDYjtBQUNVO0FBRTdCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixTQUFPLFdBQVcsVUFBVSxlQUFlO0FBQUEsSUFDekM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUdELE1BQUksZ0ZBQXFCO0FBQXJCLElBQ0Ysd0ZBQWdCLENBQUM7QUFBQSxJQUNoQixDQUFDLFdBQXlCO0FBQ3pCLFVBQUksV0FBVyxJQUFJO0FBQ2pCO0FBQUEsTUFDRjtBQUdBLFlBQU0sZUFBZSxTQUFTLGlCQUFpQix3RkFBZ0IsQ0FBQyxnQkFBZ0I7QUFFaEYsVUFBSSxhQUFhLFFBQVE7QUFDdkIscUJBQWEsUUFBUSxDQUFDLFVBQW1CO0FBQ3ZDLGdCQUFNLE1BQU07QUFDWixjQUFJLFlBQVk7QUFBQSxRQUNsQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxnRkFBcUI7QUFBckIsSUFDRix3RkFBZ0IsQ0FBQztBQUFBLElBQ2pCLHdGQUFnQixDQUFDO0FBQUEsSUFDakIsd0ZBQWdCLENBQUM7QUFBQSxJQUNqQix3RkFBZ0IsQ0FBQztBQUFBLEVBQ25CO0FBRUEsTUFBSSw0RkFBZ0IsQ0FBQztBQUNyQixNQUFJLCtGQUFtQixDQUFDLElBQUksMERBQU0sQ0FBQyxHQUFHLE9BQU8sRUFBRSx3RkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEYsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2VudGl0eS1zZWFyY2gtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL2N1cnJlbmN5LXN5bWJvbC11cGRhdGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9jdXN0b21lci1zZWFyY2gtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL3ByaWNlLXJlZHVjdGlvbi1tYW5hZ2VyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3JvdXRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3R5cGVndWFyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL2Zvcm0vY29tYmluYXRpb24tc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS9mb3JtL2N1c3RvbWVyLXNlbGVjdG9yLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2Uvc3BlY2lmaWMtcHJpY2UtZXZlbnQtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2Uvc3BlY2lmaWMtcHJpY2UtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9mb3Mtcm91dGluZy9kaXN0L3JvdXRpbmcuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbC9kaXN0L1Jlc2l6ZU9ic2VydmVyLmVzLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy90eXBlYWhlYWQuanMvZGlzdC90eXBlYWhlYWQuYnVuZGxlLmpzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS9mb3JtL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICd0eXBlYWhlYWQuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIGFuIG92ZXJsYXkgb2YgdHlwZWFoZWFkIGl0IGFsbG93cyB0byBoYXZlIGEgc2luZ2xlIGNvbmZpZyBpbnB1dCAoc2luY2VcclxuICogdHlwZWFoZWFkIHdlaXJkbHkgdXNlcyB0d28gZGlmZmVyZW50IGNvbmZpZ3MpLiBJdCBhbHNvIHByb3ZpZGVzIHNvbWUgZGVmYXVsdCByZW5kZXJpbmdcclxuICogZnVuY3Rpb25zIHdoaWNoIGFyZSwgb2YgY291cnNlLCBvdmVycmlkYWJsZS5cclxuICovXHJcblxyXG50eXBlIERpc3BsYXlGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkSlF1ZXJ5RGF0YXNldCBleHRlbmRzIFR3aXR0ZXIuVHlwZWFoZWFkLkRhdGFzZXQ8YW55PiB7XHJcbiAgZGlzcGxheTogc3RyaW5nIHwgRGlzcGxheUZ1bmN0aW9uO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgbGltaXQ6IG51bWJlcjtcclxuICBkYXRhTGltaXQ6IG51bWJlcjtcclxuICB0ZW1wbGF0ZXM6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRKUXVlcnlPcHRpb25zIGV4dGVuZHMgVHdpdHRlci5UeXBlYWhlYWQuT3B0aW9ucyB7XHJcbiAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgaGlnaGxpZ2h0OiBib29sZWFuLFxyXG4gIGhpbnQ6IGJvb2xlYW4sXHJcbiAgb25TZWxlY3Q6IChcclxuICAgIHNlbGVjdGVkSXRlbTogYW55LFxyXG4gICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgc2VhcmNoSW5wdXQ6IEpRdWVyeVxyXG4gICkgPT4gYm9vbGVhbjtcclxuICBvbkNsb3NlOiAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LCBzZWFyY2hJbnB1dDogSlF1ZXJ5KSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSB7XHJcbiAgbWluTGVuZ3RoOiBudW1iZXI7XHJcbiAgaGlnaGxpZ2h0OiBib29sZWFuO1xyXG4gIGhpbnQ6IGJvb2xlYW47XHJcbiAgc291cmNlOiBCbG9vZGhvdW5kPFJlY29yZDxzdHJpbmcsIGFueT4+IHwgKFxyXG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHN5bmNSZXN1bHRzOiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZCwgYXN5bmNSZXN1bHRzPzogKHJlc3VsdDogYW55W10pID0+IHZvaWRcclxuICApID0+IHZvaWQpO1xyXG4gIG9uU2VsZWN0OiAoXHJcbiAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgIHNlYXJjaElucHV0OiBKUXVlcnlcclxuICApID0+IGJvb2xlYW47XHJcbiAgb25DbG9zZTogKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCwgc2VhcmNoSW5wdXQ6IEpRdWVyeSkgPT4gdm9pZDtcclxuICBzdWdnZXN0aW9uTGltaXQ6IG51bWJlcjtcclxuICBkYXRhTGltaXQ6IG51bWJlcjtcclxuICBkaXNwbGF5OiBzdHJpbmcgfCBEaXNwbGF5RnVuY3Rpb247XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZW1wbGF0ZXM6IGFueTtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZyA9IFBhcnRpYWw8QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPiAmIHtcclxuICBzb3VyY2U6IEJsb29kaG91bmQ8UmVjb3JkPHN0cmluZywgYW55Pj4gfCAoXHJcbiAgICAocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM/OiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZFxyXG4gICkgPT4gdm9pZCk7IC8vIHNvdXJjZSBpcyBtYW5kYXRvcnkgb3B0aW9uXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvQ29tcGxldGVTZWFyY2gge1xyXG4gIHByaXZhdGUgJHNlYXJjaElucHV0OiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgc2VhcmNoSW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGNvbmZpZzogQXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcigkc2VhcmNoSW5wdXQ6IEpRdWVyeSwgaW5wdXRDb25maWc6IFBhcnRpYWw8SW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+KSB7XHJcbiAgICB0aGlzLiRzZWFyY2hJbnB1dCA9ICRzZWFyY2hJbnB1dDtcclxuICAgIHRoaXMuc2VhcmNoSW5wdXRJZCA9IHRoaXMuJHNlYXJjaElucHV0LnByb3AoJ2lkJyk7XHJcblxyXG4gICAgLy8gTWVyZ2luZyBvYmplY3Qgd29ya3MgZmluZSBvbiBvbmUgbGV2ZWwsIGJ1dCBvbiB0d28gaXQgZXJhc2VzIHN1YiBlbGVtZW50cyBldmVuIGlmIG5vdCBwcmVzZW50LCBzb1xyXG4gICAgLy8gd2UgaGFuZGxlIHRlbXBsYXRlcyBzZXBhcmF0ZWx5LCB0aGVzZSBhcmUgdGhlIGRlZmF1bHQgcmVuZGVyaW5nIGZ1bmN0aW9ucyB3aGljaCBjYW4gYmUgb3ZlcnJpZGRlblxyXG4gICAgY29uc3QgZGVmYXVsdFRlbXBsYXRlcyA9IHtcclxuICAgICAgLy8gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgcmVuZGVyaW5nIGZ1bmN0aW9uIG11c3QgcmV0dXJuIEhUTUwgbm9kZSBub3QgcHVyZSB0ZXh0IHNvIGFsd2F5cyBpbmNsdWRlIHRoZVxyXG4gICAgICAvLyBjb250ZW50IGluIGEgZGl2IGF0IGxlYXN0XHJcbiAgICAgIHN1Z2dlc3Rpb246IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlTdWdnZXN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgc3RyaW5nID0gaXRlbTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IHRoaXMuY29uZmlnLmRpc3BsYXkoaXRlbSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcclxuICAgICAgICAgICAgaXRlbSxcclxuICAgICAgICAgICAgPHN0cmluZz4gdGhpcy5jb25maWcuZGlzcGxheSxcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGRpc3BsYXlTdWdnZXN0aW9uID0gaXRlbVs8c3RyaW5nPiB0aGlzLmNvbmZpZy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInB4LTJcIj4ke2Rpc3BsYXlTdWdnZXN0aW9ufTwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBlbmRpbmcocXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+U2VhcmNoaW5nIGZvciBcIiR7cXVlcnkucXVlcnl9XCI8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBub3RGb3VuZChxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInB4LTJcIj5ObyByZXN1bHRzIGZvdW5kIGZvciBcIiR7cXVlcnkucXVlcnl9XCI8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNZXJnZSBkZWZhdWx0IGFuZCBpbnB1dCBjb25maWdcclxuICAgIHRoaXMuY29uZmlnID0gPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz57XHJcbiAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgaGlnaGxpZ2h0OiB0cnVlLFxyXG4gICAgICBoaW50OiBmYWxzZSxcclxuICAgICAgb25TZWxlY3Q6IChcclxuICAgICAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgICAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICAgICAgc2VhcmNoSW5wdXQ6IEpRdWVyeSxcclxuICAgICAgKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZWFoZWFkKCd2YWwnLCBzZWxlY3RlZEl0ZW1bdGhpcy5jb25maWcudmFsdWVdKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgb25DbG9zZShcclxuICAgICAgICBldmVudDogRXZlbnQsXHJcbiAgICAgICAgc2VhcmNoSW5wdXQ6IEpRdWVyeSxcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZWFoZWFkKCd2YWwnLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Z2dlc3Rpb25MaW1pdDogMzAsXHJcbiAgICAgIGRhdGFMaW1pdDogMCxcclxuICAgICAgZGlzcGxheTogJ25hbWUnLFxyXG4gICAgICB2YWx1ZTogJ2lkJyxcclxuICAgICAgdGVtcGxhdGVzOiBkZWZhdWx0VGVtcGxhdGVzLFxyXG4gICAgICAuLi5pbnB1dENvbmZpZyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gSWYgaW5wdXQgaGFzIHRlbXBsYXRlcyBvdmVycmlkZSBtZSBtZXJnZSB0aGVtIHdpdGggZGVmYXVsdCBvbmVzXHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0Q29uZmlnLCAndGVtcGxhdGVzJykpIHtcclxuICAgICAgdGhpcy5jb25maWcudGVtcGxhdGVzID0ge1xyXG4gICAgICAgIC4uLmRlZmF1bHRUZW1wbGF0ZXMsXHJcbiAgICAgICAgLi4uKDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj5pbnB1dENvbmZpZy50ZW1wbGF0ZXMpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYnVpbGRUeXBlYWhlYWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSB0eXBlYWhlYWQgY29tcG9uZW50IGJhc2VkIG9uIHByb3ZpZGVkIGNvbmZpZ3VyYXRpb24uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFR5cGVhaGVhZCgpOiB2b2lkIHtcclxuICAgIC8vIENyZWF0ZSB0aGUgdHdvIGNvbmZpZyBvYmplY3QgZm9yIHR5cGVhaGVhZCBiYXNlZCBvbiB0aGUgZnVsbCBjb25maWdcclxuICAgIGNvbnN0IHR5cGVhaGVhZE9wdGlvbnMgPSB7XHJcbiAgICAgIG1pbkxlbmd0aDogdGhpcy5jb25maWcubWluTGVuZ3RoLFxyXG4gICAgICBoaWdobGlnaHQ6IHRoaXMuY29uZmlnLmhpZ2hsaWdodCxcclxuICAgICAgaGludDogdGhpcy5jb25maWcuaGludCxcclxuICAgICAgb25TZWxlY3Q6IHRoaXMuY29uZmlnLm9uU2VsZWN0LFxyXG4gICAgICBvbkNsb3NlOiB0aGlzLmNvbmZpZy5vbkNsb3NlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBkYXRhU2V0Q29uZmlnID0ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMuY29uZmlnLnNvdXJjZSxcclxuICAgICAgZGlzcGxheTogdGhpcy5jb25maWcuZGlzcGxheSxcclxuICAgICAgdmFsdWU6IHRoaXMuY29uZmlnLnZhbHVlLFxyXG4gICAgICBsaW1pdDogdGhpcy5jb25maWcuc3VnZ2VzdGlvbkxpbWl0LFxyXG4gICAgICBkYXRhTGltaXQ6IHRoaXMuY29uZmlnLmRhdGFMaW1pdCxcclxuICAgICAgdGVtcGxhdGVzOiB0aGlzLmNvbmZpZy50ZW1wbGF0ZXMsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlICovXHJcbiAgICB0aGlzLiRzZWFyY2hJbnB1dFxyXG4gICAgICAudHlwZWFoZWFkKDxUeXBlYWhlYWRKUXVlcnlPcHRpb25zPnR5cGVhaGVhZE9wdGlvbnMsIDxUeXBlYWhlYWRKUXVlcnlEYXRhc2V0PmRhdGFTZXRDb25maWcpXHJcbiAgICAgIC5vbigndHlwZWFoZWFkOnNlbGVjdCcsIChlOiBhbnksIHNlbGVjdGVkSXRlbTogYW55KSA9PlxyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0KHNlbGVjdGVkSXRlbSwgZSwgdGhpcy4kc2VhcmNoSW5wdXQpXHJcbiAgICAgIClcclxuICAgICAgLm9uKCd0eXBlYWhlYWQ6Y2xvc2UnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb25maWcub25DbG9zZShlLCB0aGlzLiRzZWFyY2hJbnB1dCk7XHJcbiAgICAgIH0pO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBBdXRvQ29tcGxldGVTZWFyY2gsIHtJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZ30gZnJvbSAnQGNvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1zZWFyY2gnO1xyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICdAY29tcG9uZW50cy9jb21wb25lbnRzLW1hcCc7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG4vLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICd0eXBlYWhlYWQuanMnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuY29uc3QgRW50aXR5U2VhcmNoSW5wdXRNYXAgPSBDb21wb25lbnRzTWFwLmVudGl0eVNlYXJjaElucHV0O1xyXG5cclxudHlwZSBSZW1vdmVGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHZvaWQ7XHJcbnR5cGUgU2VsZWN0RnVuY3Rpb24gPSAoJG5vZGU6IEpRdWVyeSwgaXRlbTogYW55KSA9PiB2b2lkO1xyXG50eXBlIFN1Z2dlc3Rpb25GdW5jdGlvbiA9IChlbnRpdHk6IGFueSkgPT4gc3RyaW5nO1xyXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVNlYXJjaElucHV0T3B0aW9ucyBleHRlbmRzIE9wdGlvbnNPYmplY3Qge1xyXG4gIHByb3RvdHlwZVRlbXBsYXRlOiBzdHJpbmcsXHJcbiAgcHJvdG90eXBlSW5kZXg6IHN0cmluZyxcclxuICBwcm90b3R5cGVNYXBwaW5nOiBPcHRpb25zT2JqZWN0LFxyXG4gIGlkZW50aWZpZXJGaWVsZDogc3RyaW5nO1xyXG4gIGFsbG93RGVsZXRlOiBib29sZWFuLFxyXG4gIGRhdGFMaW1pdDogbnVtYmVyLFxyXG4gIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gIHJlbW90ZVVybDogc3RyaW5nLFxyXG4gIGZpbHRlclNlbGVjdGVkOiBib29sZWFuLFxyXG4gIGZpbHRlcmVkSWRlbnRpdGllczogQXJyYXk8c3RyaW5nPixcclxuICByZW1vdmVNb2RhbDogTW9kYWxPcHRpb25zLFxyXG4gIHNlYXJjaElucHV0U2VsZWN0b3I6IHN0cmluZyxcclxuICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZW50aXR5SXRlbVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZW50aXR5RGVsZXRlU2VsZWN0b3I6IHN0cmluZyxcclxuICBlbXB0eVN0YXRlU2VsZWN0b3I6IHN0cmluZyxcclxuICBxdWVyeVdpbGRjYXJkOiBzdHJpbmcsXHJcbiAgb25SZW1vdmVkQ29udGVudDogUmVtb3ZlRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgb25TZWxlY3RlZENvbnRlbnQ6IFNlbGVjdEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHN1Z2dlc3Rpb25UZW1wbGF0ZTogU3VnZ2VzdGlvbkZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIGV4dHJhUXVlcnlQYXJhbXM/OiAoKSA9PiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc09iamVjdCB7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBhcHBseTogc3RyaW5nO1xyXG4gIGNhbmNlbDogc3RyaW5nO1xyXG4gIGJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHNlYXJjaCBhbmQgc2VsZWN0IG9uZSBvciBzZXZlcmFsIGVudGl0aWVzLCBpdCB1c2VzIHRoZSBBdXRvU2VhcmNoQ29tcGxldGVcclxuICogY29tcG9uZW50IHdoaWNoIGRpc3BsYXlzIGEgbGlzdCBvZiBzdWdnZXN0aW9uIGJhc2VkIG9uIGFuIEFQSSByZXR1cm5lZCByZXNwb25zZS4gVGhlbiB3aGVuXHJcbiAqIGFuIGVsZW1lbnQgaXMgc2VsZWN0ZWQgaXQgaXMgYWRkZWQgdG8gdGhlIHNlbGVjdGlvbiBjb250YWluZXIgcmVseWluZyBvbiB0aGUgcHJvdG90eXBlIHRlbXBsYXRlIHByb3ZpZGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHdpdGggRW50aXR5U2VhcmNoSW5wdXRUeXBlIGZvcm1zLCBhbmQgaXMgdGlnaHRseSBsaW5rZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhpc1xyXG4gKiB0d2lnIGZpbGUgc3JjL1ByZXN0YVNob3BCdW5kbGUvUmVzb3VyY2VzL3ZpZXdzL0FkbWluL1R3aWdUZW1wbGF0ZUZvcm0vZW50aXR5X3NlYXJjaF9pbnB1dC5odG1sLnR3aWdcclxuICpcclxuICogVGhlIGRlZmF1bHQgY29udGVudCBvZiB0aGUgY29sbGVjdGlvbiBpcyBhbiBFbnRpdHlJdGVtVHlwZSB3aXRoIGEgc2ltcGxlIGRlZmF1bHQgdGVtcGxhdGUgYnV0IHlvdSBjYW5cclxuICogZWl0aGVyIG92ZXJyaWRlIGl0IGluIGEgdGhlbWUgb3IgY3JlYXRlIHlvdXIgb3duIGVudGl0eSB0eXBlIGlmIHlvdSBuZWVkIHRvIGN1c3RvbWl6ZSB0aGUgYmVoYXZpb3VyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5U2VhcmNoSW5wdXQge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgJGVudGl0eVNlYXJjaElucHV0OiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgJGVudGl0aWVzQ29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgJGxpc3RDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSAkZW1wdHlTdGF0ZTogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnMhOiBFbnRpdHlTZWFyY2hJbnB1dE9wdGlvbnM7XHJcblxyXG4gIHByaXZhdGUgZW50aXR5UmVtb3RlU291cmNlITogQmxvb2Rob3VuZDtcclxuXHJcbiAgcHJpdmF0ZSBhdXRvU2VhcmNoITogQXV0b0NvbXBsZXRlU2VhcmNoO1xyXG5cclxuICBjb25zdHJ1Y3RvcigkZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXI6IEpRdWVyeSwgb3B0aW9uczogT3B0aW9uc09iamVjdCkge1xyXG4gICAgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIgPSAkZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXI7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSA8RW50aXR5U2VhcmNoSW5wdXRPcHRpb25zPnt9O1xyXG4gICAgdGhpcy5idWlsZE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXQgPSAkKHRoaXMub3B0aW9ucy5zZWFyY2hJbnB1dFNlbGVjdG9yLCB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcik7XHJcbiAgICB0aGlzLiRlbnRpdGllc0NvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLmVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIHRoaXMuJGxpc3RDb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5saXN0Q29udGFpbmVyU2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIHRoaXMuJGVtcHR5U3RhdGUgPSAkKHRoaXMub3B0aW9ucy5lbXB0eVN0YXRlU2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkUmVtb3RlU291cmNlKCk7XHJcbiAgICB0aGlzLmJ1aWxkQXV0b0NvbXBsZXRlU2VhcmNoKCk7XHJcbiAgICB0aGlzLmJ1aWxkQWN0aW9ucygpO1xyXG4gICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3JjZSBzZWxlY3RlZCB2YWx1ZXMsIHRoZSBpbnB1dCBpcyBhbiBhcnJheSBvZiBvYmplY3QgdGhhdCBtdXN0IG1hdGNoIHRoZSBmb3JtYXQgZnJvbVxyXG4gICAqIHRoZSBBUEkgaWYgeW91IHdhbnQgdGhlIHNlbGVjdGVkIGVudGl0aWVzIHRvIGJlIGNvcnJlY3RseSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmFsdWVzIHtBcnJheTxhbnk+fVxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0ZWRJdGVtcygpO1xyXG4gICAgaWYgKCF2YWx1ZXMgfHwgdmFsdWVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmFwcGVuZFNlbGVjdGVkSXRlbSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZCB0aGUgaXRlbSB0byB0aGUgc2VsZWN0aW9uLCByZXNwZWN0aW5nIHRoZSBjb25maWd1cmVkIGxpbWl0IHNvIGlmIGxpbWl0IGlzIGFscmVhZHkgcmVhY2hlZCB0aGUgaXRlbSBpcyBub3RcclxuICAgKiBhZGRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBuZXdJdGVtXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGJvb2xlYW5cclxuICAgKi9cclxuICBhZGRJdGVtKG5ld0l0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kU2VsZWN0ZWRJdGVtKG5ld0l0ZW0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG9wdGlvbk5hbWVcclxuICAgKi9cclxuICBnZXRPcHRpb24ob3B0aW9uTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uTmFtZVxyXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcclxuICAgKi9cclxuICBzZXRPcHRpb24ob3B0aW9uTmFtZTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bik6IHZvaWQge1xyXG4gICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gdmFsdWU7XHJcblxyXG4gICAgLy8gQXBwbHkgc3BlY2lhbCBvcHRpb25zIHRvIGNvbXBvbmVudHMgd2hlbiBuZWVkZWRcclxuICAgIGlmIChvcHRpb25OYW1lID09PSAncmVtb3RlVXJsJyAmJiB0aGlzLmVudGl0eVJlbW90ZVNvdXJjZSkge1xyXG4gICAgICAoPFJlY29yZDxzdHJpbmcsIGFueT4+IHRoaXMuZW50aXR5UmVtb3RlU291cmNlKS5yZW1vdGUudXJsID0gdGhpcy5vcHRpb25zLnJlbW90ZVVybDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZE9wdGlvbnMob3B0aW9uczogT3B0aW9uc09iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBPcHRpb25zT2JqZWN0ID0ge1xyXG4gICAgICBzdWdnZXN0aW9uRmllbGQ6ICduYW1lJyxcclxuICAgICAgcHJvdG90eXBlVGVtcGxhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgcHJvdG90eXBlSW5kZXg6ICdfX2luZGV4X18nLFxyXG4gICAgICBwcm90b3R5cGVNYXBwaW5nOiB7XHJcbiAgICAgICAgaWQ6ICdfX2lkX18nLFxyXG4gICAgICAgIG5hbWU6ICdfX25hbWVfXycsXHJcbiAgICAgICAgaW1hZ2U6ICdfX2ltYWdlX18nLFxyXG4gICAgICB9LFxyXG4gICAgICBpZGVudGlmaWVyRmllbGQ6ICdpZCcsXHJcbiAgICAgIGFsbG93RGVsZXRlOiB0cnVlLFxyXG4gICAgICBkYXRhTGltaXQ6IDAsXHJcbiAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgcmVtb3RlVXJsOiB1bmRlZmluZWQsXHJcbiAgICAgIGZpbHRlclNlbGVjdGVkOiB0cnVlLFxyXG4gICAgICBmaWx0ZXJlZElkZW50aXRpZXM6IFtdLFxyXG5cclxuICAgICAgcmVtb3ZlTW9kYWw6IHtcclxuICAgICAgICBpZDogJ21vZGFsLWNvbmZpcm0tcmVtb3ZlLWVudGl0eScsXHJcbiAgICAgICAgdGl0bGU6ICdEZWxldGUgaXRlbScsXHJcbiAgICAgICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPycsXHJcbiAgICAgICAgYXBwbHk6ICdEZWxldGUnLFxyXG4gICAgICAgIGNhbmNlbDogJ0NhbmNlbCcsXHJcbiAgICAgICAgYnV0dG9uQ2xhc3M6ICdidG4tZGFuZ2VyJyxcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIE1vc3Qgb2YgdGhlIHByZXZpb3VzIGNvbmZpZyBhcmUgY29uZmlndXJhYmxlIHZpYSB0aGUgRW50aXR5U2VhcmNoSW5wdXRGb3JtIG9wdGlvbnMsIHRoZSBmb2xsb3dpbmcgb25lcyBhcmUgb25seVxyXG4gICAgICAvLyBvdmVycmlkYWJsZSB2aWEganMgY29uZmlnIChhcyBsb25nIGFzIHlvdSB1c2UgdGhlIGRlZmF1bHQgdGVtcGxhdGUpXHJcbiAgICAgIHNlYXJjaElucHV0U2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLnNlYXJjaElucHV0U2VsZWN0b3IsXHJcbiAgICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3IsXHJcbiAgICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAubGlzdENvbnRhaW5lclNlbGVjdG9yLFxyXG4gICAgICBlbnRpdHlJdGVtU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVudGl0eUl0ZW1TZWxlY3RvcixcclxuICAgICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVudGl0eURlbGV0ZVNlbGVjdG9yLFxyXG4gICAgICBlbXB0eVN0YXRlU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVtcHR5U3RhdGVTZWxlY3RvcixcclxuICAgICAgcXVlcnlXaWxkY2FyZDogJ19fUVVFUllfXycsXHJcblxyXG4gICAgICAvLyBUaGVzZSBhcmUgY29uZmlndXJhYmxlIGNhbGxiYWNrc1xyXG4gICAgICBvblJlbW92ZWRDb250ZW50OiB1bmRlZmluZWQsXHJcbiAgICAgIG9uU2VsZWN0ZWRDb250ZW50OiB1bmRlZmluZWQsXHJcbiAgICAgIHJlc3BvbnNlVHJhbnNmb3JtZXI6IChyZXNwb25zZTogYW55KSA9PiByZXNwb25zZSB8fCBbXSxcclxuXHJcbiAgICAgIC8vIFRlbXBsYXRlIGZ1bmN0aW9uXHJcbiAgICAgIHN1Z2dlc3Rpb25UZW1wbGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICBleHRyYVF1ZXJ5UGFyYW1zOiB1bmRlZmluZWQsXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRlZmF1bHRPcHRpb25zKS5mb3JFYWNoKChvcHRpb25OYW1lKSA9PiB7XHJcbiAgICAgIC8vIFRoaXMgZ2V0cyB0aGUgcHJvcGVyIHZhbHVlIGZvciBlYWNoIG9wdGlvbiwgcmVzcGVjdGluZyB0aGUgcHJpb3JpdHk6IGlucHV0ID4gZGF0YS1hdHRyaWJ1dGUgPiBkZWZhdWx0XHJcbiAgICAgIHRoaXMuaW5pdE9wdGlvbihvcHRpb25OYW1lLCBpbnB1dE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zW29wdGlvbk5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENhc3QgYWxsIElEcyBpbnRvIHN0cmluZyB0byBhdm9pZCBub3QgbWF0Y2hpbmcgYmVjYXVzZSBvZiBkaWZmZXJlbnQgdHlwZXNcclxuICAgIHRoaXMub3B0aW9ucy5maWx0ZXJlZElkZW50aXRpZXMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyZWRJZGVudGl0aWVzLm1hcChTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCB0aGUgb3B0aW9uIHZhbHVlLCB0aGUgaW5wdXQgY29uZmlnIGhhcyB0aGUgbW9yZSBwcmlvcml0eS4gSXQgb3ZlcnJpZGVzIHRoZSBkYXRhIGF0dHJpYnV0ZSBvcHRpb25cclxuICAgKiAoaWYgcHJlc2VudCksIGZpbmFsbHkgYSBkZWZhdWx0IHZhbHVlIGlzIHVzZWQgKGlmIGRlZmluZWQpLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbk5hbWVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRPcHRpb25zXHJcbiAgICogQHBhcmFtIHsqfHVuZGVmaW5lZH0gZGVmYXVsdE9wdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdE9wdGlvbihvcHRpb25OYW1lOiBzdHJpbmcsIGlucHV0T3B0aW9uczogT3B0aW9uc09iamVjdCwgZGVmYXVsdE9wdGlvbjogYW55ID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0T3B0aW9ucywgb3B0aW9uTmFtZSkpIHtcclxuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gaW5wdXRPcHRpb25zW29wdGlvbk5hbWVdO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIuZGF0YShvcHRpb25OYW1lKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIuZGF0YShvcHRpb25OYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IGRlZmF1bHRPcHRpb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkQWN0aW9ucygpOiB2b2lkIHtcclxuICAgIC8vIEFsd2F5cyBjaGVjayBmb3IgY2xpY2sgZXZlbiBpZiBpdCBpcyB1c2VsZXNzIHdoZW4gYWxsb3dEZWxldGUgb3B0aW9ucyBpcyBmYWxzZSwgaXQgY2FuIGJlIGNoYW5nZWQgZHluYW1pY2FsbHlcclxuICAgICQodGhpcy4kZW50aXRpZXNDb250YWluZXIpLm9uKCdjbGljaycsIHRoaXMub3B0aW9ucy5lbnRpdHlEZWxldGVTZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmFsbG93RGVsZXRlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCAkZW50aXR5ID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3Rvcik7XHJcblxyXG4gICAgICBjb25zdCBtb2RhbCA9IG5ldyAoQ29uZmlybU1vZGFsIGFzIGFueSkoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5pZCxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLnRpdGxlLFxyXG4gICAgICAgICAgY29uZmlybU1lc3NhZ2U6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5tZXNzYWdlLFxyXG4gICAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmNhbmNlbCxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmFwcGx5LFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuYnV0dG9uQ2xhc3MsXHJcbiAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICRlbnRpdHkucmVtb3ZlKCk7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uUmVtb3ZlZENvbnRlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vblJlbW92ZWRDb250ZW50KCRlbnRpdHkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgICAgIG1vZGFsLnNob3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZvciBub3cgYWRhcHQgdGhlIGRpc3BsYXkgYmFzZWQgb24gdGhlIGFsbG93RGVsZXRlIG9wdGlvblxyXG4gICAgY29uc3QgJGVudGl0eURlbGV0ZSA9ICQodGhpcy5vcHRpb25zLmVudGl0eURlbGV0ZVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcbiAgICAvLychIScgY29udmVydHMgb3B0aW9uIHRvIGJvb2wgKGJlY2F1c2UgaWYgaXRzIDEgb3IgMCwganF1ZXJ5IHRvZ2dsZSB3b3JrcyBkaWZmZXJlbnRseSB0aGFuIHdpdGggdHJ1ZS9mYWxzZSlcclxuICAgICRlbnRpdHlEZWxldGUudG9nZ2xlKCEhdGhpcy5vcHRpb25zLmFsbG93RGVsZXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSBBdXRvQ29tcGxldGVTZWFyY2ggY29tcG9uZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZEF1dG9Db21wbGV0ZVNlYXJjaCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGF1dG9TZWFyY2hDb25maWc6IElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMuZW50aXR5UmVtb3RlU291cmNlLFxyXG4gICAgICBkYXRhTGltaXQ6IHRoaXMub3B0aW9ucy5kYXRhTGltaXQsXHJcbiAgICAgIHZhbHVlOiB0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkLFxyXG4gICAgICBtaW5MZW5ndGg6IHRoaXMub3B0aW9ucy5taW5MZW5ndGgsXHJcbiAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgIHN1Z2dlc3Rpb246IChlbnRpdHk6IGFueSkgPT4gdGhpcy5zaG93U3VnZ2VzdGlvbihlbnRpdHkpLFxyXG4gICAgICB9LFxyXG4gICAgICBvblNlbGVjdDogKHNlbGVjdGVkSXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gV2hlbiBsaW1pdCBpcyBvbmUgd2UgY2Fubm90IHNlbGVjdCBhZGRpdGlvbmFsIGVsZW1lbnRzIHNvIHdlIHJlcGxhY2UgdGhlbSBpbnN0ZWFkXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kYXRhTGltaXQgPT09IDEpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRoZSBzZWFyY2ggZmVhdHVyZSBtYXkgYmUgZGlzYWJsZWQgc28gdGhlIHNlYXJjaCBpbnB1dCB3b24ndCBiZSBwcmVzZW50XHJcbiAgICBpZiAodGhpcy4kZW50aXR5U2VhcmNoSW5wdXQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuYXV0b1NlYXJjaCA9IG5ldyBBdXRvQ29tcGxldGVTZWFyY2goXHJcbiAgICAgICAgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXQsXHJcbiAgICAgICAgYXV0b1NlYXJjaENvbmZpZyxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd1N1Z2dlc3Rpb24oZW50aXR5OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLm9wdGlvbnMuc3VnZ2VzdGlvblRlbXBsYXRlKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25UZW1wbGF0ZShlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbnRpdHlJbWFnZSA9ICcnO1xyXG5cclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZW50aXR5LCAnaW1hZ2UnKSkge1xyXG4gICAgICBlbnRpdHlJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZW50aXR5LmltYWdlfVwiIC8+IGA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwic2VhcmNoLXN1Z2dlc3Rpb25cIj4ke2VudGl0eUltYWdlfSR7ZW50aXR5W3RoaXMub3B0aW9ucy5zdWdnZXN0aW9uRmllbGRdfTwvZGl2PmA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgQmxvb2Rob3VuZCByZW1vdGUgc291cmNlIHdoaWNoIHdpbGwgY2FsbCB0aGUgQVBJLiBUaGUgcGxhY2Vob2xkZXIgdG9cclxuICAgKiBpbmplY3QgdGhlIHF1ZXJ5IHNlYXJjaCBwYXJhbWV0ZXIgaXMgX19RVUVSWV9fXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Qmxvb2Rob3VuZH1cclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkUmVtb3RlU291cmNlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UgPSBuZXcgQmxvb2Rob3VuZCh7XHJcbiAgICAgIGRhdHVtVG9rZW5pemVyOiBCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZSxcclxuICAgICAgcXVlcnlUb2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxyXG4gICAgICBpZGVudGlmeShvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmpbdGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZF07XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW90ZToge1xyXG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnJlbW90ZVVybCxcclxuICAgICAgICByZXBsYWNlOiAocXVlcnk6IHN0cmluZywgc2VhcmNoUGhyYXNlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIC8vIG5lZWQgdG8gcmVwbGFjZSB3aWxkY2FyZCBtYW51YWxseSwgYmVjYXVzZSBoZXJlIHdlIGFyZSBvdmVycmlkaW5nIHRoZSBkZWZhdWx0IHJlcGxhY2UgZnVuY3Rpb25cclxuICAgICAgICAgIGNvbnN0IHVybCA9IHF1ZXJ5LnJlcGxhY2UodGhpcy5vcHRpb25zLnF1ZXJ5V2lsZGNhcmQsIHNlYXJjaFBocmFzZSk7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeVBhcmFtcykpIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBhbGxvd3MgYXBwZW5kaW5nIGV4dHJhIHBhcmFtZXRlcnMgdG8gdGhlIHF1ZXJ5LCBzdWNoIGFzIHNob3BJZFxyXG4gICAgICAgICAgICBjb25zdCBleHRyYVBhcmFtcyA9IHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRFeHRyYVBhcmFtcyA9IE9iamVjdFxyXG4gICAgICAgICAgICAgIC5rZXlzKGV4dHJhUGFyYW1zKVxyXG4gICAgICAgICAgICAgIC5tYXAoKGtleTogc3RyaW5nKSA9PiBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGV4dHJhUGFyYW1zW2tleV0pfWApXHJcbiAgICAgICAgICAgICAgLmpvaW4oJyYnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHt1cmx9JiR7ZW5jb2RlZEV4dHJhUGFyYW1zfWA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICB0cmFuc2Zvcm06IChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkUmVzcG9uc2UgPSB0aGlzLm9wdGlvbnMucmVzcG9uc2VUcmFuc2Zvcm1lcihyZXNwb25zZSk7XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZElkczogc3RyaW5nW10gPSB0aGlzLmdldFNlbGVjdGVkSWRzKCk7XHJcbiAgICAgICAgICBjb25zdCBzdWdnZXN0ZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2UuZm9yRWFjaCgocmVzcG9uc2VJdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8gRm9yY2UgY2FzdGluZyB0byBzdHJpbmcgdG8gYXZvaWQgaW5lcXVhbGl0eSB3aXRoIG51bWJlciBJRHMgYmVjYXVzZSBvZiB0eXBlXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlSWRlbnRpZmllcjogc3RyaW5nID0gU3RyaW5nKHJlc3BvbnNlSXRlbVt0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzSWRDb250YWluZWQgPSB0aGlzLm9wdGlvbnMuZmlsdGVyU2VsZWN0ZWQgJiYgc2VsZWN0ZWRJZHMuaW5jbHVkZXMocmVzcG9uc2VJZGVudGlmaWVyKTtcclxuICAgICAgICAgICAgY29uc3QgaXNGaWx0ZXJlZCA9IHRoaXMub3B0aW9ucy5maWx0ZXJlZElkZW50aXRpZXMuaW5jbHVkZXMocmVzcG9uc2VJZGVudGlmaWVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNJZENvbnRhaW5lZCAmJiAhaXNGaWx0ZXJlZCkge1xyXG4gICAgICAgICAgICAgIHN1Z2dlc3RlZEl0ZW1zLnB1c2gocmVzcG9uc2VJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHN1Z2dlc3RlZEl0ZW1zO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgc2VsZWN0ZWQgaXRlbXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhclNlbGVjdGVkSXRlbXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRlbnRpdGllc0NvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBjb21wb25lbnQgaXMgY29uZmlndXJlZCB0byBoYXZlIG9ubHkgb25lIHNlbGVjdGVkIGVsZW1lbnQgb24gZWFjaCBzZWxlY3Rpb25cclxuICAgKiB0aGUgcHJldmlvdXMgc2VsZWN0aW9uIGlzIHJlbW92ZWQgYW5kIHRoZW4gcmVwbGFjZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc2VsZWN0ZWRJdGVtIHtPYmplY3R9XHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXBsYWNlU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0ZWRJdGVtcygpO1xyXG4gICAgdGhpcy5hZGRTZWxlY3RlZENvbnRlbnRUb0NvbnRhaW5lcihzZWxlY3RlZEl0ZW0pO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY29tcG9uZW50IGlzIGNvbmZpZ3VyZWQgdG8gaGF2ZSBtb3JlIHRoYW4gb25lIHNlbGVjdGVkIGl0ZW0gb24gZWFjaCBzZWxlY3Rpb25cclxuICAgKiB0aGUgaXRlbSBpcyBhZGRlZCB0byB0aGUgbGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWxlY3RlZEl0ZW0ge09iamVjdH1cclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIGFwcGVuZFNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gSWYgY29sbGVjdGlvbiBsZW5ndGggaXMgdXAgdG8gbGltaXQsIHJldHVyblxyXG4gICAgY29uc3QgJGVudGl0eUl0ZW1zID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kYXRhTGltaXQgIT09IDAgJiYgJGVudGl0eUl0ZW1zLmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMuZGF0YUxpbWl0KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZFNlbGVjdGVkQ29udGVudFRvQ29udGFpbmVyKHNlbGVjdGVkSXRlbSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUVtcHR5U3RhdGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCAkZW50aXR5SXRlbXMgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIHRoaXMuJGVtcHR5U3RhdGUudG9nZ2xlKCRlbnRpdHlJdGVtcy5sZW5ndGggPT09IDApO1xyXG4gICAgdGhpcy4kbGlzdENvbnRhaW5lci50b2dnbGUoJGVudGl0eUl0ZW1zLmxlbmd0aCAhPT0gMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIHNlbGVjdGVkIGNvbnRlbnQgdG8gdGhlIHNlbGVjdGlvbiBjb250YWluZXIsIHRoZSBIVE1MIGlzIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgcmVuZGVyIHRoYXQgcmVsaWVzIG9uIHRoZVxyXG4gICAqIHByb3RvdHlwZSB0ZW1wbGF0ZSBhbmQgbWFwcGluZywgYW5kIGZpbmFsbHkgdGhlIHJlbmRlcmVkIHNlbGVjdGlvbiBpcyBhZGRlZCB0byB0aGUgbGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RlZEl0ZW1cclxuICAgKi9cclxuICBwcml2YXRlIGFkZFNlbGVjdGVkQ29udGVudFRvQ29udGFpbmVyKHNlbGVjdGVkSXRlbTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCAkZW50aXR5SXRlbXMgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIGNvbnN0IG5ld0luZGV4ID0gJGVudGl0eUl0ZW1zLmxlbmd0aCA/IHRoaXMuZ2V0SW5kZXhGcm9tSXRlbSgkZW50aXR5SXRlbXMubGFzdCgpKSArIDEgOiAwO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIdG1sID0gdGhpcy5yZW5kZXJTZWxlY3RlZChzZWxlY3RlZEl0ZW0sIG5ld0luZGV4KTtcclxuXHJcbiAgICBjb25zdCAkc2VsZWN0ZWROb2RlID0gJChzZWxlY3RlZEh0bWwpO1xyXG4gICAgY29uc3QgJGVudGl0eURlbGV0ZSA9ICQodGhpcy5vcHRpb25zLmVudGl0eURlbGV0ZVNlbGVjdG9yLCAkc2VsZWN0ZWROb2RlKTtcclxuICAgICRlbnRpdHlEZWxldGUudG9nZ2xlKCEhdGhpcy5vcHRpb25zLmFsbG93RGVsZXRlKTtcclxuXHJcbiAgICB0aGlzLiRlbnRpdGllc0NvbnRhaW5lci5hcHBlbmQoJHNlbGVjdGVkTm9kZSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25TZWxlY3RlZENvbnRlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5vblNlbGVjdGVkQ29udGVudCgkc2VsZWN0ZWROb2RlLCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcnkgYW5kIGZpbmQgdGhlIGluZGV4IG9mIGFuIGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24gYnkgcGFyc2luZyBpdHMgaW5wdXRzIG5hbWVzIHdoaWNoIHNob3VsZCBsb29rIGxpa2U6XHJcbiAgICpcclxuICAgKiBmb3JtW2NvbGxlY3Rpb25dWzBdW25hbWVdLCBmb3JtW2NvbGxlY3Rpb25dWzFdW2lkXSA9PiB3ZSBhaW0gdG8gZXh0cmFjdCB0aGUgMVxyXG4gICAqXHJcbiAgICogV2Ugc2VhcmNoIGZvciB0aGUgbmFtZSBtYXRjaGluZyB0aGUgY29uZmlndXJlZCBpZGVudGlmaWVyLCBhbmQgZXh0cmFjdCBpdHMgaW5kZXguIFRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2VcclxuICAgKiB3aGVuIHlvdSBlZGl0IGEgY29sbGVjdGlvbiwgeW91IGNhbiBhZGQgdGhlbiByZW1vdmUgdGhlbiBhZGQgYW4gZWxlbWVudCBhZ2FpbiwgdGhlIGluZGV4ZXMgYXJlIG5vdCBnb25uYSBmb2xsb3dcclxuICAgKiBzbyB5b3UgY2Fubm90IHJlbHkgb24ganVzdCB0aGUgaW5kZXggZnJvbSBlbGVtZW50IG9yZGVyLiBXaGljaCBpcyB3aHkgaXQgaXMgbW9yZSBhY2N1cmF0ZSB0byBwYXJzZSB0aGUgaW5kZXggdGhhdFxyXG4gICAqIHdhcyB1c2VkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIGJlZW4gcmVuZGVyZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG4gICAqXHJcbiAgICogSWYgd2UgY2FuJ3QgZmluZCBhbnl0aGluZyB3ZSB1c2UgdGhlIG9yZGVyIGluZGV4IGFzIGZhbGxiYWNrIHRob3VnaC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSAkaXRlbVxyXG4gICAqXHJcbiAgICogQHJldHVybiBudW1iZXJcclxuICAgKi9cclxuICBwcml2YXRlIGdldEluZGV4RnJvbUl0ZW0oJGl0ZW06IEpRdWVyeSk6IG51bWJlciB7XHJcbiAgICAvLyBCeSBkZWZhdWx0IHVzZSB0aGUgcG9zaXRpb24gaW5kZXhcclxuICAgIGxldCBpbmRleCA9ICRpdGVtLmluZGV4KCk7XHJcblxyXG4gICAgLy8gVHJ5IHRvIGZpbmQgYW4gaW5wdXQgd2hpY2ggbmFtZXMgY29udGFpbnMgWzFdW2lkXSAod2hlcmUgMSBpcyB0aGUgaW5kZXgsIGFuZCBpZCB0aGUgaWRlbnRpZmllcilcclxuICAgIGNvbnN0IGlkZW50aWZpZXJOYW1lUmVnZXhwOiBzdHJpbmcgPSBgXFxcXFsoXFxcXGQrKVxcXFxdXFxcXFske3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGR9XFxcXF1gO1xyXG4gICAgY29uc3QgaW5wdXRzID0gJGl0ZW0uZmluZCgnaW5wdXQnKTtcclxuICAgIGlucHV0cy5lYWNoKChpbnB1dEluZGV4OiBudW1iZXIsIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5uYW1lLm1hdGNoKGlkZW50aWZpZXJOYW1lUmVnZXhwKTtcclxuXHJcbiAgICAgIC8vIEV4dHJhY3QgdGhlIGluZGV4IGZyb20gdGhlIGlucHV0IG5hbWUsIGlmIGl0IGlzIGZvdW5kIGFuZCBpcyBhIG51bWJlciB1c2UgaXQgYXMgdGhlIGluZGV4XHJcbiAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBwYXJzZUludChtYXRjaGVzWzFdLCAxMCk7XHJcblxyXG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKGZvdW5kSW5kZXgpKSB7XHJcbiAgICAgICAgICBpbmRleCA9IGZvdW5kSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXIgdGhlIHNlbGVjdGVkIGVsZW1lbnQsIHRoaXMgd2lsbCBiZSBhcHBlbmRlZCBpbiB0aGUgc2VsZWN0aW9uIGxpc3QgKHVsKSwgcHJvdG90eXBlVGVtcGxhdGUgaXMgdXNlZCBhcyB0aGVcclxuICAgKiBiYXNlIHRoZSB3ZSByZWx5IG9uIHByb3RvdHlwZU1hcHBpbmcgdG8gcmVwbGFjZSBldmVyeSBwbGFjZWhvbGRlcnMgaW4gdGhlIHRlbXBsYXRlIGJ5IHRoZWlyIG1hcHBpbmcgdmFsdWUgaW4gdGhlXHJcbiAgICogcHJvdmlkZWQgZW50aXR5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGVudGl0eVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBwcml2YXRlIHJlbmRlclNlbGVjdGVkKGVudGl0eTogYW55LCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wcm90b3R5cGVUZW1wbGF0ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnByb3RvdHlwZUluZGV4LCAnZycpLCBTdHJpbmcoaW5kZXgpKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucHJvdG90eXBlTWFwcGluZykuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBlbnRpdHlbZmllbGROYW1lXSB8fCAnJztcclxuICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnByb3RvdHlwZU1hcHBpbmdbZmllbGROYW1lXSwgJ2cnKSwgZmllbGRWYWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJzZXMgdGhlIHNlbGVjdGlvbiBjb250YWluZXIgYW5kIGV4dHJhY3QgdGhlIElEcyB0aGlzIGFsbG93cyB0byBmaWx0ZXIgdGhlIGFscmVhZHkgc2VsZWN0ZWQgaXRlbXMuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0U2VsZWN0ZWRJZHMoKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBjb25zdCBzZWxlY3RlZENoaWxkcmVuID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcbiAgICBzZWxlY3RlZENoaWxkcmVuLmVhY2goKGluZGV4OiBudW1iZXIsIHNlbGVjdGVkQ2hpbGQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGlkZW50aWZpZXJOYW1lUmVnZXhwOiBzdHJpbmcgPSBgXFxcXFske3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGR9XFxcXF1gO1xyXG4gICAgICBjb25zdCBpbnB1dHMgPSAkKHNlbGVjdGVkQ2hpbGQpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgIGlucHV0cy5lYWNoKChpbnB1dEluZGV4OiBudW1iZXIsIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKGlucHV0Lm5hbWUubWF0Y2goaWRlbnRpZmllck5hbWVSZWdleHApKSB7XHJcbiAgICAgICAgICBzZWxlY3RlZElkcy5wdXNoKGlucHV0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkSWRzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSBzeW1ib2wgd2hlbiB0aGUgY3VycmVuY3kgc2VsZWN0IGlzIGNoYW5nZWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnJlbmN5U3ltYm9sVXBkYXRlciB7XHJcbiAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZztcclxuXHJcbiAgc2VsZWN0Q3VycmVuY3k6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcclxuXHJcbiAgY2FsbGJhY2tDaGFuZ2U6IChzeW1ib2w6IHN0cmluZykgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nLFxyXG4gICAgY2FsbGJhY2tDaGFuZ2U6IChzeW1ib2w6IHN0cmluZykgPT4gdm9pZCxcclxuICApIHtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QgPSBjdXJyZW5jeVN5bWJvbFNlbGVjdDtcclxuICAgIHRoaXMuc2VsZWN0Q3VycmVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50Pih0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0KTtcclxuICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UgPSBjYWxsYmFja0NoYW5nZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0Q3VycmVuY3kpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IGZpbmQgJHt0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0fWApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RDdXJyZW5jeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QpO1xyXG5cclxuICAgIGlmIChzZWxlY3RDdXJyZW5jeSkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrQ2hhbmdlKHRoaXMuZ2V0U3ltYm9sKCkpO1xyXG5cclxuICAgICAgc2VsZWN0Q3VycmVuY3kuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5jYWxsYmFja0NoYW5nZSh0aGlzLmdldFN5bWJvbCgpKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3ltYm9sKCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0Q3VycmVuY3kpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDogc3RyaW5nIHwgbnVsbCA9IHRoaXMuc2VsZWN0Q3VycmVuY3kuZGF0YXNldC5kZWZhdWx0Q3VycmVuY3lTeW1ib2wgPz8gJyc7XHJcbiAgICBjb25zdCBzZWxlY3RJdGVtID0gdGhpcy5zZWxlY3RDdXJyZW5jeS5pdGVtKHRoaXMuc2VsZWN0Q3VycmVuY3kuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgaWYgKCFkZWZhdWx0Q3VycmVuY3lTeW1ib2wgJiYgIXNlbGVjdEl0ZW0pIHtcclxuICAgICAgY29uc29sZS5lcnJvcignQ291bGQgbm90IGZpbmQgYXBwcm9wcmlhdGUgZGF0YSBhdHRyaWJ1dGVzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxlY3RJdGVtKSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uZ2V0QXR0cmlidXRlKCdzeW1ib2wnKSA/PyBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBFbnRpdHlTZWFyY2hJbnB1dCBmcm9tICdAY29tcG9uZW50cy9lbnRpdHktc2VhcmNoLWlucHV0JztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdAY29tcG9uZW50cy9ldmVudC1lbWl0dGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVyU2VhcmNoSW5wdXQgZXh0ZW5kcyBFbnRpdHlTZWFyY2hJbnB1dCB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkaXNhYmxpbmdTd2l0Y2hFdmVudDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGN1c3RvbWVySXRlbVNlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY3VzdG9tZXJTZWFyY2hDb250YWluZXI6IHN0cmluZyxcclxuICAgIGN1c3RvbWVySXRlbVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBzaG9wSWRDYWxsYmFjazogKCkgPT4gbnVtYmVyfG51bGwsXHJcbiAgICBkaXNhYmxpbmdTd2l0Y2hFdmVudD86IHN0cmluZ3x1bmRlZmluZWQsXHJcbiAgKSB7XHJcbiAgICBzdXBlcigkKGN1c3RvbWVyU2VhcmNoQ29udGFpbmVyKSwge1xyXG4gICAgICBleHRyYVF1ZXJ5UGFyYW1zOiAoKSA9PiAoe1xyXG4gICAgICAgIHNob3BJZDogc2hvcElkQ2FsbGJhY2soKSxcclxuICAgICAgfSksXHJcbiAgICAgIHJlc3BvbnNlVHJhbnNmb3JtZXI6IChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5jdXN0b21lcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhyZXNwb25zZS5jdXN0b21lcnMpO1xyXG4gICAgICB9LFxyXG5cclxuICAgIH0pO1xyXG4gICAgdGhpcy5kaXNhYmxpbmdTd2l0Y2hFdmVudCA9IGRpc2FibGluZ1N3aXRjaEV2ZW50O1xyXG4gICAgdGhpcy5jdXN0b21lckl0ZW1TZWxlY3RvciA9IGN1c3RvbWVySXRlbVNlbGVjdG9yO1xyXG4gICAgdGhpcy5saXN0ZW5EaXNhYmxpbmdTd2l0Y2goKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbGlzdGVuRGlzYWJsaW5nU3dpdGNoKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsaW5nU3dpdGNoRXZlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXZlbnRFbWl0dGVyID0gPHR5cGVvZiBFdmVudEVtaXR0ZXI+IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlLmV2ZW50RW1pdHRlcjtcclxuXHJcbiAgICAvLyBXaGVuIGN1c3RvbWVyIHNlYXJjaCBpcyBkaXNhYmxlZCB3ZSBhbHNvIGRpc2FibGUgdGhlIHNlbGVjdGVkIGl0ZW0gKGlmIHByZXNlbnQpXHJcbiAgICBldmVudEVtaXR0ZXIub24odGhpcy5kaXNhYmxpbmdTd2l0Y2hFdmVudCwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgJCh0aGlzLmN1c3RvbWVySXRlbVNlbGVjdG9yKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBldmVudC5kaXNhYmxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgZHluYW1pY3MgKHNob3dzL2hpZGVzIGZpZWxkcywgY2hhbmdlcyBjdXJyZW5jeSBzeW1ib2xzKSBvZiBwcmljZSByZWR1Y3Rpb24gZm9ybSBmaWVsZHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaWNlUmVkdWN0aW9uTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkcmVkdWN0aW9uVHlwZVNlbGVjdDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5ICR0YXhJbmNsdXNpb25JbnB1dHM6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeVNlbGVjdDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeVN5bWJvbFVwZGF0ZXI6IEN1cnJlbmN5U3ltYm9sVXBkYXRlcjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSB0b2dnbGVDdXJyZW5jeVNlbGVjdG9yOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJlZHVjdGlvblR5cGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgdGF4SW5jbHVzaW9uSW5wdXRzOiBzdHJpbmcsXHJcbiAgICBjdXJyZW5jeVNlbGVjdDogc3RyaW5nLFxyXG4gICAgcmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgdG9nZ2xlQ3VycmVuY3lTZWxlY3Rvcjogc3RyaW5nIHwgbnVsbCA9IG51bGwsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnJlZHVjdGlvblR5cGVTZWxlY3RvciA9IHJlZHVjdGlvblR5cGVTZWxlY3RvcjtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3QgPSAkKHJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XHJcbiAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMgPSAkKHRheEluY2x1c2lvbklucHV0cyk7XHJcbiAgICB0aGlzLmN1cnJlbmN5U2VsZWN0ID0gY3VycmVuY3lTZWxlY3Q7XHJcbiAgICB0aGlzLnJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3IgPSByZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yO1xyXG4gICAgdGhpcy50b2dnbGVDdXJyZW5jeVNlbGVjdG9yID0gdG9nZ2xlQ3VycmVuY3lTZWxlY3RvcjtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xVcGRhdGVyID0gbmV3IEN1cnJlbmN5U3ltYm9sVXBkYXRlcihcclxuICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdCxcclxuICAgICAgKChzeW1ib2w6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChzeW1ib2wgPT09ICcnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbChzeW1ib2wpO1xyXG4gICAgICB9KSxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUoKTtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3Qub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBzb3VyY2UgdmFsdWUgaXMgJ3BlcmNlbnRhZ2UnLCB0YXJnZXQgZmllbGQgaXMgc2hvd24sIGVsc2UgaGlkZGVuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdC52YWwoKSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XHJcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlT3V0KCk7XHJcbiAgICAgIGlmICh0aGlzLnRvZ2dsZUN1cnJlbmN5U2VsZWN0b3IpIHtcclxuICAgICAgICAkKHRoaXMudG9nZ2xlQ3VycmVuY3lTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZUluKCk7XHJcbiAgICAgIGlmICh0aGlzLnRvZ2dsZUN1cnJlbmN5U2VsZWN0b3IpIHtcclxuICAgICAgICAkKHRoaXMudG9nZ2xlQ3VycmVuY3lTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN5bWJvbCh0aGlzLmN1cnJlbmN5U3ltYm9sVXBkYXRlci5nZXRTeW1ib2woKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVN5bWJvbChzeW1ib2w6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVkdWN0aW9uVHlwZVNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKHJlZHVjdGlvblR5cGVTZWxlY3QpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCByZWR1Y3Rpb25PcHRpb24gPSByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbaV07XHJcblxyXG4gICAgICAgIGlmIChyZWR1Y3Rpb25PcHRpb24udmFsdWUgPT09ICdhbW91bnQnKSB7XHJcbiAgICAgICAgICAvLyBVcGRhdGUgcmVkdWN0aW9uIHR5cGUgY2hvaWNlIFwiYW1vdW50XCIgc3ltYm9sXHJcbiAgICAgICAgICByZWR1Y3Rpb25PcHRpb24uaW5uZXJIVE1MID0gc3ltYm9sO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2VsZWN0ZWRSZWR1Y3Rpb24gPSA8c3RyaW5nPiByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbcmVkdWN0aW9uVHlwZVNlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgICAgY29uc3QgcmVkdWN0aW9uVmFsdWVTeW1ib2xzID0gPE5vZGVMaXN0T2Y8SFRNTFNlbGVjdEVsZW1lbnQ+PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgIHRoaXMucmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3RvcixcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChyZWR1Y3Rpb25WYWx1ZVN5bWJvbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgcmVkdWN0aW9uIHZhbHVlIGZpZWxkIHN5bWJvbCB3aGVuIFwiYW1vdW50XCIgdHlwZSBpcyBzZWxlY3RlZFxyXG4gICAgICByZWR1Y3Rpb25WYWx1ZVN5bWJvbHMuZm9yRWFjaCgodmFsdWU6IEVsZW1lbnQpID0+IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICB2YWx1ZS5pbm5lckhUTUwgPSBzZWxlY3RlZFJlZHVjdGlvbiA9PT0gJ2Ftb3VudCcgPyBzeW1ib2wgOiAnJSc7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge0NvbmZpcm1Nb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbCc7XHJcbmltcG9ydCB7SWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcbmltcG9ydCB7Rm9ybUlmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQge1xyXG4gIE1vZGFsLFxyXG4gIENvbmZpcm1Nb2RhbCxcclxuICBJZnJhbWVNb2RhbCxcclxuICBGb3JtSWZyYW1lTW9kYWwsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBmb290ZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpcm1Nb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIGNvbmZpcm1UaXRsZT86IHN0cmluZztcclxuICBjb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGNsb3NlQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uQ2xhc3M6IHN0cmluZztcclxuICBjb25maXJtQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgY3VzdG9tQnV0dG9uczogQXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudD47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRDb25maXJtTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPENvbmZpcm1Nb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBzb21lIGNvbmZpcm0vY2FuY2VsIGJ1dHRvbnMgYWxvbmcgd2l0aCBhIG1lc3NhZ2VcclxuICogaW4gdGhlIGJvZHksIGl0IGlzIG1vc3RseSB1c2VkIGFzIGEgUmljaCBjb25maXJtIGRpYWxvZyBib3guXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBmb290ZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24hOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbiE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1lc3NhZ2UnKTtcclxuICAgIHRoaXMubWVzc2FnZS5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybU1lc3NhZ2U7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnYnRuJyxcclxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25DbGFzcyxcclxuICAgICAgJ2J0bi1sZycsXHJcbiAgICAgICdidG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbiwgLi4ucGFyYW1zLmN1c3RvbUJ1dHRvbnMsIHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maXJtTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRDb25maXJtTW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maXJtQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjb25maXJtQ2FsbGJhY2sgcGFyYW1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FuY2VsQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjbG9zZUNhbGxiYWNrIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBDb25maXJtTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0Q29uZmlybU1vZGFsUGFyYW1zLFxyXG4gICAgY29uZmlybUNhbGxiYWNrPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICAgIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCxcclxuICApIHtcclxuICAgIGxldCBjb25maXJtTW9kYWxDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2UgaWYgKCFpc1VuZGVmaW5lZChjb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gV2Uga2VwdCB0aGUgcGFyYW1ldGVycyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhpcyBmb3JjZXMgdXMgdG8ga2VlcCB0aGUgcGFyYW0gY29uZmlybUNhbGxiYWNrIGFzIG9wdGlvbmFsXHJcbiAgICAgIC8vIGJ1dCB3aGVuIHdlIHJlbW92ZSBkZXByZWNhdGlvbiBpdCB3aWxsIGJlY29tZSBtYW5kYXRvcnksIGEgY29uZmlybSBjYWxsYmFjayBzaG91bGQgYWx3YXlzIGJlIHNwZWNpZmllZFxyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBjb25maXJtIGNhbGxiYWNrIHByb3ZpZGVkIGZvciBDb25maXJtTW9kYWwgY29tcG9uZW50LicpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjb25maXJtTWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICBjbG9zZUJ1dHRvbkxhYmVsOiAnQ2xvc2UnLFxyXG4gICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIGN1c3RvbUJ1dHRvbnM6IFtdLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIG1vZGFsVGl0bGU6IGlucHV0UGFyYW1zLmNvbmZpcm1UaXRsZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1Nb2RhbENhbGxiYWNrLFxyXG4gICAgICBjbG9zZUNhbGxiYWNrOiBpbnB1dFBhcmFtcy5jbG9zZUNhbGxiYWNrID8/IGNhbmNlbENhbGxiYWNrLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgSWZyYW1lTW9kYWwsIHtcclxuICBJZnJhbWVNb2RhbFBhcmFtcyxcclxuICBJZnJhbWVNb2RhbFR5cGUsIElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFR5cGUgPSBJZnJhbWVNb2RhbFR5cGVcclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGZvcm1EYXRhOiBGb3JtRGF0YSxcclxuICBkYXRhQXR0cmlidXRlczogRE9NU3RyaW5nTWFwIHwgbnVsbCxcclxuICBldmVudDogRXZlbnQsXHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgZXZlbnQ6IEV2ZW50XHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IE9taXQ8SWZyYW1lTW9kYWxQYXJhbXMsICdpZnJhbWVVcmwnIHwgJ29uTG9hZGVkJyB8ICdjb25maXJtQ2FsbGJhY2snPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7XHJcbiAgZm9ybVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZztcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nO1xyXG4gIG9uRm9ybUxvYWRlZD86IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIGZvcm1Db25maXJtQ2FsbGJhY2s/OiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrLFxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxGb3JtSWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZzsgLy8gZm9ybVVybCBpcyBtYW5kYXRvcnkgaW4gcGFyYW1zXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgY29udGFpbmluZyBhIGZvcm0gaW5zaWRlIGEgbW9kYWwgYW5kIHdhdGNoZXMgZm9yIHRoZSBzdWJtaXQgKHZpYSBpZnJhbWUgbG9hZGluZylcclxuICogT24gZWFjaCBsb2FkIGl0IGlzIGFibGUgdG8gcmV0dXJuIGRhdGEgZnJvbSB0aGUgZm9ybSB2aWEgdGhlIG9uRm9ybUxvYWRlZCBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1JZnJhbWVNb2RhbCBleHRlbmRzIElmcmFtZU1vZGFsIGltcGxlbWVudHMgRm9ybUlmcmFtZU1vZGFsVHlwZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwYXJhbXM6IElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgaWZyYW1lUGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZnJhbWVVcmw6IHBhcmFtcy5mb3JtVXJsLFxyXG4gICAgICBvbkxvYWRlZDogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25JZnJhbWVMb2FkZWQoXHJcbiAgICAgICAgICBpZnJhbWUsXHJcbiAgICAgICAgICBldmVudCxcclxuICAgICAgICAgIHBhcmFtcy5vbkZvcm1Mb2FkZWQsXHJcbiAgICAgICAgICBwYXJhbXMuY2FuY2VsQnV0dG9uU2VsZWN0b3IgPz8gJy5jYW5jZWwtYnRuJyxcclxuICAgICAgICAgIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25Db25maXJtQ2FsbGJhY2soaWZyYW1lLCBldmVudCwgcGFyYW1zLmZvcm1Db25maXJtQ2FsbGJhY2ssIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nKTtcclxuICAgICAgfSxcclxuICAgICAgLi4ucGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihpZnJhbWVQYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbklmcmFtZUxvYWRlZChcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBvbkZvcm1Mb2FkZWQ6IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gICAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFvbkZvcm1Mb2FkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbnMgPSBpZnJhbWVGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoY2FuY2VsQnV0dG9uU2VsZWN0b3IpO1xyXG4gICAgY2FuY2VsQnV0dG9ucy5mb3JFYWNoKChjYW5jZWxCdXR0b24pID0+IHtcclxuICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9uRm9ybUxvYWRlZChpZnJhbWVGb3JtLCBuZXcgRm9ybURhdGEoaWZyYW1lRm9ybSksIGlmcmFtZUZvcm0uZGF0YXNldCA/PyBudWxsLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ29uZmlybUNhbGxiYWNrKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2s6IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgfCB1bmRlZmluZWQsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghZm9ybUNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrKGlmcmFtZUZvcm0sIGlmcmFtZSwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb3JtKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGZvcm1TZWxlY3Rvcjogc3RyaW5nKTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAoIWlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxGb3JtRWxlbWVudD4oZm9ybVNlbGVjdG9yKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmcmFtZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXJlbnRXaW5kb3dFdmVudDogc3RyaW5nID0gJ0lmcmFtZUNsaWVudEV2ZW50JztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE5hbWU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudFBhcmFtZXRlcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIHBhcmFtZXRlcnM6IGFueSA9IHt9KSB7XHJcbiAgICBzdXBlcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCk7XHJcbiAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcclxuICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICB9XHJcblxyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudE5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyYW1ldGVycygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRQYXJhbWV0ZXJzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQgSWZyYW1lRXZlbnQgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50JztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG4gIGxvYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgc3Bpbm5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lPzogYm9vbGVhbikgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKGlmcmFtZTpIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24gPSAoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVNb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBsb2FkcyBhbiB1cmxcclxuICBvbkxvYWRlZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHVubG9hZCBpdHMgY29udGVudFxyXG4gIG9uVW5sb2FkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBUaGUgaWZyYW1lIGNhbiBsYXVuY2ggSWZyYW1lRXZlbnQgdG8gY29tbXVuaWNhdGUgd2l0aCBpdHMgcGFyZW50IHZpYSB0aGlzIGNhbGxiYWNrXHJcbiAgb25JZnJhbWVFdmVudD86IElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBJbml0aWFsIHVybCBvZiB0aGUgaWZyYW1lXHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7XHJcbiAgLy8gV2hlbiB0cnVlIHRoZSBpZnJhbWUgaGVpZ2h0IGlzIGNvbXB1dGVkIGJhc2VkIG9uIGl0cyBjb250ZW50XHJcbiAgYXV0b1NpemU6IGJvb2xlYW47XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgYm9keSBvZiB0aGUgaWZyYW1lIGlzIHVzZWQgYXMgYSByZWZlcmVuY2Ugb2YgaXRzIGNvbnRlbnQncyBzaXplIGJ1dCB0aGlzIG9wdGlvbiBjYW4gY3VzdG9taXplIGl0XHJcbiAgYXV0b1NpemVDb250YWluZXI6IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjbG9zZSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY2xvc2VCdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjb25maXJtIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjb25maXJtQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gQ2FsbGJhY2sgd2hlbiB0aGUgY29uZmlybSBidXR0b24gaXMgY2xpY2tlZFxyXG4gIGNvbmZpcm1DYWxsYmFjaz86IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgaWZyYW1lIGNsb3NlcyB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWQsIHRoaXMgb3B0aW9ucyBvdmVycmlkZXMgdGhpcyBiZWhhdmlvdXJcclxuICBjbG9zZU9uQ29uZmlybTogYm9vbGVhbjtcclxuICAvLyBXaGVuIHRoZSBpZnJhbWUgaXMgcmVmcmVzaGVkIGF1dG8gc2Nyb2xsIHVwIHRoZSBib2R5IGNvbnRhaW5lciAodHJ1ZSBieSBkZWZhdWx0KVxyXG4gIGF1dG9TY3JvbGxVcDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxJZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7IC8vIGlmcmFtZVVybCBpcyBtYW5kYXRvcnkgaW4gaW5wdXRcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIGFuIGlmcmFtZSB0byBsb2FkIGV4dGVybmFsIGNvbnRlbnQgYWxvbmcgd2l0aCBhXHJcbiAqIGxvYWRlciBkaXYgb24gdG9wIG9mIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0SWZyYW1lTW9kYWxQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lITogSFRNTElGcmFtZUVsZW1lbnQ7XHJcblxyXG4gIGxvYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBzcGlubmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGZvb3Rlcj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZScpO1xyXG5cclxuICAgIC8vIE1lc3NhZ2UgaXMgaGlkZGVuIGJ5IGRlZmF1bHRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG4gICAgdGhpcy5pZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XHJcbiAgICB0aGlzLmlmcmFtZS5zY3JvbGxpbmcgPSAnbm8nO1xyXG4gICAgdGhpcy5pZnJhbWUud2lkdGggPSAnMTAwJSc7XHJcbiAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBgJHtwYXJhbXMuaWR9LWlmcmFtZWApO1xyXG4gICAgaWYgKCFwYXJhbXMuYXV0b1NpemUpIHtcclxuICAgICAgdGhpcy5pZnJhbWUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUtbG9hZGVyJyk7XHJcblxyXG4gICAgdGhpcy5zcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnc3Bpbm5lcicpO1xyXG5cclxuICAgIHRoaXMubG9hZGVyLmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKHRoaXMubG9hZGVyLCB0aGlzLmlmcmFtZSk7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpIHx8ICFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnLCAnYnRuLWNvbmZpcm0tc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jbG9zZU9uQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgaW5zaWRlIGEgbW9kYWwsIGl0IHRoZW4gY2FuIGhhbmRsZSB0d28gc3BlY2lmaWMgY2FsbGJhY2tzXHJcbiAqIC0gb25Mb2FkZWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaGFzIGp1c3RlIGJlZW4gcmVmcmVzaGVkXHJcbiAqIC0gb25VbmxvYWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gcmVmcmVzaCAoc28gaXQgaXMgdW5sb2FkZWQpXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIElmcmFtZU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZSE6IGJvb2xlYW47XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZUNvbnRhaW5lciE6IHN0cmluZztcclxuXHJcbiAgcHJvdGVjdGVkIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdpZnJhbWUtbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGF1dG9TaXplOiB0cnVlLFxyXG4gICAgICBhdXRvU2l6ZUNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZSxcclxuICAgICAgYXV0b1Njcm9sbFVwOiB0cnVlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBjb250YWluZXJcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgSWZyYW1lTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICB0aGlzLmF1dG9TaXplID0gcGFyYW1zLmF1dG9TaXplO1xyXG4gICAgdGhpcy5hdXRvU2l6ZUNvbnRhaW5lciA9IHBhcmFtcy5hdXRvU2l6ZUNvbnRhaW5lcjtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAobG9hZGVkRXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIFNjcm9sbCB0aGUgYm9keSBjb250YWluZXIgYmFjayB0byB0aGUgdG9wIGFmdGVyIGlmcmFtZSBsb2FkZWRcclxuICAgICAgdGhpcy5tb2RhbC5ib2R5LnNjcm9sbCgwLCAwKTtcclxuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG4gICAgICBpZiAocGFyYW1zLm9uTG9hZGVkKSB7XHJcbiAgICAgICAgcGFyYW1zLm9uTG9hZGVkKHRoaXMubW9kYWwuaWZyYW1lLCBsb2FkZWRFdmVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAodW5sb2FkRXZlbnQ6IEJlZm9yZVVubG9hZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAocGFyYW1zLm9uVW5sb2FkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5vblVubG9hZCh0aGlzLm1vZGFsLmlmcmFtZSwgdW5sb2FkRXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBdXRvIHJlc2l6ZSB0aGUgaWZyYW1lIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuaW5pdEF1dG9SZXNpemUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zcmMgPSBwYXJhbXMuaWZyYW1lVXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQsICgoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChwYXJhbXMub25JZnJhbWVFdmVudCkge1xyXG4gICAgICAgIHBhcmFtcy5vbklmcmFtZUV2ZW50KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkgYXMgRXZlbnRMaXN0ZW5lcik7XHJcblxyXG4gICAgaWYgKHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbiAmJiBwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBwYXJhbXMuY29uZmlybUNhbGxiYWNrKHRoaXMubW9kYWwuaWZyYW1lLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU6IGJvb2xlYW4gPSB0cnVlLCB1c2VJbm5lclRleHQ6IGJvb2xlYW4gPSBmYWxzZSk6IHRoaXMge1xyXG4gICAgaWYgKHVzZUlubmVyVGV4dCkge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJUZXh0ID0gY29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG5cclxuICAgIGlmIChoaWRlSWZyYW1lKSB7XHJcbiAgICAgIHRoaXMuaGlkZUlmcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvd0xvYWRpbmcoKTogdGhpcyB7XHJcbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgY29uc3QgYm9keVdpZHRoID0gdGhpcy5nZXRPdXRlcldpZHRoKHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS5oZWlnaHQgPSBgJHtib2R5SGVpZ2h0fXB4YDtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLndpZHRoID0gYCR7Ym9keVdpZHRofXB4YDtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICBzdXBlci5oaWRlKCk7XHJcbiAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVJZnJhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5hdXRvU2l6ZSAmJiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5hdXRvU2l6ZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRBdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShpZnJhbWVDb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFuUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZXNpemVPYnNlcnZlcikge1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICBjb25zdCBpZnJhbWVTY3JvbGxIZWlnaHQgPSBpZnJhbWVDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICBjb25zdCBjb250ZW50SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLm1lc3NhZ2UpXHJcbiAgICAgICAgKyBpZnJhbWVTY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAvLyBBdm9pZCBhcHBseWluZyBoZWlnaHQgb2YgMCAob24gZmlyc3QgbG9hZCBmb3IgZXhhbXBsZSlcclxuICAgICAgaWYgKGNvbnRlbnRIZWlnaHQpIHtcclxuICAgICAgICAvLyBXZSBmb3JjZSB0aGUgaWZyYW1lIHRvIGl0cyByZWFsIGhlaWdodCBhbmQgaXQncyB0aGUgY29udGFpbmVyIHRoYXQgaGFuZGxlcyB0aGUgb3ZlcmZsb3cgd2l0aCBzY3JvbGxiYXJzXHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7Y29udGVudEhlaWdodH1weGA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldEhlaWdodCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgaGVpZ2h0ICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpblRvcCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luQm90dG9tLCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3V0ZXJXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0V2lkdGgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICB3aWR0aCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5MZWZ0LCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5SaWdodCwgMTApO1xyXG5cclxuICAgIHJldHVybiB3aWR0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElmcmFtZU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgZGlhbG9nOiBIVE1MRWxlbWVudDtcclxuICBjb250ZW50OiBIVE1MRWxlbWVudDtcclxuICBib2R5OiBIVE1MRWxlbWVudDtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBoZWFkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvcmVUeXBlIHtcclxuICBzaG93OiAoKSA9PiB2b2lkO1xyXG4gIGhpZGU6ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbENvcmVUeXBlIHtcclxuICBtb2RhbDogTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBDc3NQcm9wcyA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbmV4cG9ydCB0eXBlIE1vZGFsUGFyYW1zID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2xvc2FibGU/OiBib29sZWFuO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmdcclxuICBkaWFsb2dTdHlsZT86IENzc1Byb3BzO1xyXG4gIGNsb3NlQ2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0TW9kYWxQYXJhbXMgPSBQYXJ0aWFsPE1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBtb2RhbCBjb250YWluZXIgKG9ubHkgdGhlIG1vZGFsIGFuZCBkaWFsb2cgYm94LCB3aXRoIGEgY2xvc2UgaWNvblxyXG4gKiBhbmQgYW4gb3B0aW9uYWwgdGl0bGUpLiBObyBmb290ZXIgYW5kIG5vIGNvbnRlbnQgaXMgaGFuZGxlZC5cclxuICpcclxuICogQHBhcmFtIHtNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBkaWFsb2chOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29udGVudCE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBtZXNzYWdlITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGhlYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgYm9keSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcykge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBNYWluIG1vZGFsIGVsZW1lbnRcclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbCcsICdmYWRlJyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9IHBhcmFtcy5pZDtcclxuXHJcbiAgICAvLyBNb2RhbCBkaWFsb2cgZWxlbWVudFxyXG4gICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRpYWxvZycpO1xyXG4gICAgaWYgKHBhcmFtcy5kaWFsb2dTdHlsZSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMuZGlhbG9nU3R5bGUpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlW2tleV0gPSBwYXJhbXMuZGlhbG9nU3R5bGVba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY29udGVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbW9kYWwtbWVzc2FnZScpO1xyXG5cclxuICAgIC8vIE1vZGFsIGhlYWRlciBlbGVtZW50XHJcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaGVhZGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgdGl0bGUgZWxlbWVudFxyXG4gICAgaWYgKHBhcmFtcy5tb2RhbFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLm1vZGFsVGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGljb25cclxuICAgIHRoaXMuY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VJY29uLmlubmVySFRNTCA9ICfDlyc7XHJcblxyXG4gICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1ib2R5JywgJ3RleHQtbGVmdCcsICdmb250LXdlaWdodC1ub3JtYWwnKTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3RpbmcgdGhlIG1vZGFsXHJcbiAgICBpZiAodGhpcy50aXRsZSkge1xyXG4gICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VJY29uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5oZWFkZXIsIHRoaXMuYm9keSk7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb3NlQ2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbCBpbXBsZW1lbnRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCAkbW9kYWwhOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBtb2RhbCwgY2hlY2sgaWYgaXQgYWxyZWFkeSBleGlzdHMgVGhpcyBhbGxvd3MgY2hpbGQgY2xhc3NlcyB0byB1c2UgdGhlaXIgY3VzdG9tIGNvbnRhaW5lclxyXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqUXVlcnkgbW9kYWwgb2JqZWN0XHJcbiAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHtpZCwgY2xvc2FibGV9ID0gcGFyYW1zO1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoe1xyXG4gICAgICBiYWNrZHJvcDogY2xvc2FibGUgPyB0cnVlIDogJ3N0YXRpYycsXHJcbiAgICAgIGtleWJvYXJkOiBjbG9zYWJsZSAhPT0gdW5kZWZpbmVkID8gY2xvc2FibGUgOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG5cclxuICAgICAgaWYgKG1vZGFsKSB7XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbXMuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgIHBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGl0bGUobW9kYWxUaXRsZTogc3RyaW5nKTogdGhpcyB7XHJcbiAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgaWYgKHRoaXMubW9kYWwuY2xvc2VJY29uKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuaW5zZXJ0QmVmb3JlKHRoaXMubW9kYWwudGl0bGUsIHRoaXMubW9kYWwuY2xvc2VJY29uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLnRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kYWwudGl0bGUuaW5uZXJIVE1MID0gbW9kYWxUaXRsZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIC8vIFNvbWV0aW1lcyBtb2RhbCBhbmltYXRpb24gaXMgc3RpbGwgaW4gcHJvZ3Jlc3MgYW5kIGhpZGluZyBmYWlscywgc28gd2UgYXR0YWNoIGV2ZW50IGxpc3RlbmVyIGZvciB0aGF0IGNhc2UuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm9mZignc2hvd24uYnMubW9kYWwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgUm91dGluZyBmcm9tICdmb3Mtcm91dGluZyc7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnQGpzL2Zvc19qc19yb3V0ZXMuanNvbic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4vKipcclxuICogV3JhcHMgRk9TSnNSb3V0aW5nYnVuZGxlIHdpdGggZXhwb3NlZCByb3V0ZXMuXHJcbiAqIFRvIGV4cG9zZSByb3V0ZSBhZGQgb3B0aW9uIGBleHBvc2U6IHRydWVgIGluIC55bWwgcm91dGluZyBjb25maWdcclxuICpcclxuICogZS5nLlxyXG4gKlxyXG4gKiBgbXlfcm91dGVcclxuICogICAgcGF0aDogL215LXBhdGhcclxuICogICAgb3B0aW9uczpcclxuICogICAgICBleHBvc2U6IHRydWVcclxuICogQW5kIHJ1biBgYmluL2NvbnNvbGUgZm9zOmpzLXJvdXRpbmc6ZHVtcCAtLWZvcm1hdD1qc29uIC0tdGFyZ2V0PWFkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2Zvc19qc19yb3V0ZXMuanNvbmBcclxuICovXHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGlmICh3aW5kb3cucHJlc3Rhc2hvcCAmJiB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihyb3V0ZXMucm91dGVzLCB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIFJvdXRpbmcuc2V0RGF0YShyb3V0ZXMpO1xyXG4gICAgUm91dGluZy5zZXRCYXNlVXJsKFxyXG4gICAgICAkKGRvY3VtZW50KVxyXG4gICAgICAgIC5maW5kKCdib2R5JylcclxuICAgICAgICAuZGF0YSgnYmFzZS11cmwnKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWNvcmF0ZWQgXCJnZW5lcmF0ZVwiIG1ldGhvZCwgd2l0aCBwcmVkZWZpbmVkIHNlY3VyaXR5IHRva2VuIGluIHBhcmFtc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvdXRlXHJcbiAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAqXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKi9cclxuICBnZW5lcmF0ZShyb3V0ZTogc3RyaW5nLCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge30pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgdG9rZW5pemVkUGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcclxuICAgICAgX3Rva2VuOiAkKGRvY3VtZW50KVxyXG4gICAgICAgIC5maW5kKCdib2R5JylcclxuICAgICAgICAuZGF0YSgndG9rZW4nKSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBSb3V0aW5nLmdlbmVyYXRlKHJvdXRlLCB0b2tlbml6ZWRQYXJhbXMpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IFNwZWNpZmljUHJpY2VNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2Uvc3BlY2lmaWMtcHJpY2UtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmludGVyZmFjZSBDb21iaW5hdGlvbkNob2ljZSB7XHJcbiAgY29tYmluYXRpb25JZDogbnVtYmVyLFxyXG4gIGNvbWJpbmF0aW9uTmFtZTogc3RyaW5nLFxyXG59XHJcblxyXG5pbnRlcmZhY2UgUHJvZHVjdENvbWJpbmF0aW9uc1Jlc3VsdCB7XHJcbiAgY29tYmluYXRpb25zOiBDb21iaW5hdGlvbkNob2ljZVtdXHJcbn1cclxuXHJcbmludGVyZmFjZSBqUXVlcnlTZWxlY3QyQ2hvaWNlIHtcclxuICBpZDogbnVtYmVyLFxyXG4gIHRleHQ6IHN0cmluZyxcclxufVxyXG5pbnRlcmZhY2UgalF1ZXJ5U2VsZWN0MlJlc3VsdHMge1xyXG4gIHJlc3VsdHM6IGpRdWVyeVNlbGVjdDJDaG9pY2VbXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21iaW5hdGlvblNlbGVjdG9yIHtcclxuICByZWFkb25seSBwcm9kdWN0SWQ6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuICBwcml2YXRlIHNob3BJZDogbnVtYmVyfG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcm9kdWN0SWQ6IG51bWJlcixcclxuICApIHtcclxuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG4gICAgdGhpcy5wcm9kdWN0SWQgPSBwcm9kdWN0SWQ7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNwZWNpZmljUHJpY2VNYXAuZm9ybUNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnNob3BJZCA9IG51bGw7XHJcbiAgICB0aGlzLmluaXRDb21wb25lbnQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGluaXRDb21wb25lbnQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCAkY29tYmluYXRpb25JZFNlbGVjdCA9ICQoU3BlY2lmaWNQcmljZU1hcC5jb21iaW5hdGlvbklkU2VsZWN0KTtcclxuXHJcbiAgICAvLyBpbnNpZGUgc2VsZWN0MiBjYWxsYmFjayBcInRoaXNcIiBpcyB0aGUganF1ZXJ5IGNvbXBvbmVudCxcclxuICAgIC8vIHNvIHdlIG5lZWQgdG8gYXNzaWduIGEgdmFyIHRvIHJlYWNoIGFjdHVhbCBcInRoaXNcIiAodGhlIGNvbWJpbmF0aW9uU2VsZWN0b3IpIGluc2lkZSB0aGUgY2FsbGJhY2tcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgbGltaXQgPSAkY29tYmluYXRpb25JZFNlbGVjdC5kYXRhKCdtaW5pbXVtLXJlc3VsdHMtZm9yLXNlYXJjaCcpO1xyXG5cclxuICAgICRjb21iaW5hdGlvbklkU2VsZWN0LnNlbGVjdDIoe1xyXG4gICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogbGltaXQsXHJcbiAgICAgIGFqYXg6IHtcclxuICAgICAgICB1cmw6ICgpID0+IHRoaXMuZ2V0VXJsKGxpbWl0KSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGRlbGF5OiAyNTAsXHJcbiAgICAgICAgZGF0YShwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHE6IHBhcmFtcy50ZXJtLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2Nlc3NSZXN1bHRzKGRhdGE6IFByb2R1Y3RDb21iaW5hdGlvbnNSZXN1bHQpOiBqUXVlcnlTZWxlY3QyUmVzdWx0cyB7XHJcbiAgICAgICAgICAvLyBwcmVwZW5kIHRoZSBcImFsbCBjb21iaW5hdGlvbnNcIiBjaG9pY2UgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxyXG4gICAgICAgICAgY29uc3QgYWxsQ29tYmluYXRpb25zQ2hvaWNlID0gPENvbWJpbmF0aW9uQ2hvaWNlPiBzZWxmLmdldENob2ljZUZvckFsbENvbWJpbmF0aW9ucygpO1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0cyA9IDxqUXVlcnlTZWxlY3QyQ2hvaWNlW10+IFt7XHJcbiAgICAgICAgICAgIGlkOiBhbGxDb21iaW5hdGlvbnNDaG9pY2UuY29tYmluYXRpb25JZCxcclxuICAgICAgICAgICAgdGV4dDogYWxsQ29tYmluYXRpb25zQ2hvaWNlLmNvbWJpbmF0aW9uTmFtZSxcclxuICAgICAgICAgIH1dO1xyXG5cclxuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5kYXRhLmNvbWJpbmF0aW9ucy5tYXAoKGNvbWJpbmF0aW9uOiBDb21iaW5hdGlvbkNob2ljZSkgPT4gKHtcclxuICAgICAgICAgICAgaWQ6IGNvbWJpbmF0aW9uLmNvbWJpbmF0aW9uSWQsXHJcbiAgICAgICAgICAgIHRleHQ6IGNvbWJpbmF0aW9uLmNvbWJpbmF0aW9uTmFtZSxcclxuICAgICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHtyZXN1bHRzfTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRVcmwobGltaXQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCByb3V0ZVBhcmFtcyA9IDxSZWNvcmQ8c3RyaW5nLCBudW1iZXI+PiB7XHJcbiAgICAgIHByb2R1Y3RJZDogdGhpcy5wcm9kdWN0SWQsXHJcbiAgICAgIGxpbWl0LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaG9wSWRTZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoU3BlY2lmaWNQcmljZU1hcC5zaG9wSWRTZWxlY3QpO1xyXG4gICAgbGV0IHNob3BJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgLy8gVGhpcyBjaGVjayBpcyBoZXJlIGZvciB3aGVuIHRoZSBtdWx0aXNob3AgaXMgbm90IGVuYWJsZWQuXHJcbiAgICAvLyBUaGUgc2VsZWN0b3Igc2hvcElkU2VsZWN0IGRvZXMgbm90IGV4aXN0IHdoZW4gbXVsdGlzaG9wIGlzIG5vdCBlbmFibGVkLlxyXG4gICAgaWYgKHNob3BJZFNlbGVjdCAhPT0gbnVsbCkge1xyXG4gICAgICBzaG9wSWQgPSBOdW1iZXIoc2hvcElkU2VsZWN0LnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2hvcElkKSB7XHJcbiAgICAgIHJvdXRlUGFyYW1zLnNob3BJZCA9IHNob3BJZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX3Byb2R1Y3RzX3NlYXJjaF9wcm9kdWN0X2NvbWJpbmF0aW9ucycsIHJvdXRlUGFyYW1zKTtcclxuICB9XHJcblxyXG4gIGdldENob2ljZUZvckFsbENvbWJpbmF0aW9ucygpOiBDb21iaW5hdGlvbkNob2ljZSB7XHJcbiAgICBjb25zdCBjb21iaW5hdGlvbklkU2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFNwZWNpZmljUHJpY2VNYXAuY29tYmluYXRpb25JZFNlbGVjdCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29tYmluYXRpb25JZDogTnVtYmVyKGNvbWJpbmF0aW9uSWRTZWxlY3QuZGF0YXNldC5hbGxDb21iaW5hdGlvbnNWYWx1ZSksXHJcbiAgICAgIGNvbWJpbmF0aW9uTmFtZTogU3RyaW5nKGNvbWJpbmF0aW9uSWRTZWxlY3QuZGF0YXNldC5hbGxDb21iaW5hdGlvbnNMYWJlbCksXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgU3BlY2lmaWNQcmljZU1hcCBmcm9tICdAcGFnZXMvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS9zcGVjaWZpYy1wcmljZS1tYXAnO1xyXG5pbXBvcnQgU3BlY2lmaWNQcmljZUV2ZW50TWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL3NwZWNpZmljLXByaWNlLWV2ZW50LW1hcCc7XHJcbmltcG9ydCBDdXN0b21lclNlYXJjaElucHV0IGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vY3VzdG9tZXItc2VhcmNoLWlucHV0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVyU2VsZWN0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBUaGlzIGNoZWNrIGlzIGhlcmUgZm9yIHdoZW4gdGhlIG11bHRpc2hvcCBpcyBub3QgZW5hYmxlZC5cclxuICAgIC8vIFRoZSBzZWxlY3RvciByZXR1cm5lZCBieSB0aGUgdGhpcy5nZXRTaG9wSWRTZWxlY3QgZG9lcyBub3QgZXhpc3Qgd2hlbiBtdWx0aXNob3AgaXMgbm90IGVuYWJsZWQuXHJcbiAgICBjb25zdCBzaG9wSWRTZWxlY3QgPSB0aGlzLmdldFNob3BJZFNlbGVjdCgpO1xyXG4gICAgY29uc3QgY3VzdG9tZXJTZWFyY2hJbnB1dCA9IHRoaXMuaW5pdEN1c3RvbWVyU2VhcmNoSW5wdXQoKTtcclxuXHJcbiAgICBpZiAoc2hvcElkU2VsZWN0ICE9PSBudWxsKSB7XHJcbiAgICAgIC8vIGNsZWFyIHNlbGVjdGVkIGN1c3RvbWVycyB3aGVuZXZlciBzaG9wIGlzIGNoYW5nZWQsIGJlY2F1c2UgY3VzdG9tZXJzIG1heSBkaWZmZXIgYmV0d2VlbiBzaG9wc1xyXG4gICAgICBzaG9wSWRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gY3VzdG9tZXJTZWFyY2hJbnB1dC5zZXRWYWx1ZXMoW10pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEN1c3RvbWVyU2VhcmNoSW5wdXQoKTogQ3VzdG9tZXJTZWFyY2hJbnB1dCB7XHJcbiAgICByZXR1cm4gbmV3IEN1c3RvbWVyU2VhcmNoSW5wdXQoXHJcbiAgICAgIFNwZWNpZmljUHJpY2VNYXAuY3VzdG9tZXJTZWFyY2hDb250YWluZXIsXHJcbiAgICAgIFNwZWNpZmljUHJpY2VNYXAuY3VzdG9tZXJJdGVtLFxyXG4gICAgICAoKSA9PiBOdW1iZXIodGhpcy5nZXRTaG9wSWRTZWxlY3QoKT8udmFsdWUpID8/IG51bGwsXHJcbiAgICAgIFNwZWNpZmljUHJpY2VFdmVudE1hcC5zd2l0Y2hDdXN0b21lcixcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG9wSWRTZWxlY3RvciBtaWdodCBub3QgZXhpc3QgaW4gc29tZSBmb3JtcywgYW5kIGl0IGlzIGxlZ2l0LiBJbiB0aGF0IGNhc2UgaXQgcmV0dXJucyBudWxsLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFNob3BJZFNlbGVjdCgpOiBIVE1MU2VsZWN0RWxlbWVudHxudWxsIHtcclxuICAgIHJldHVybiA8SFRNTFNlbGVjdEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAke1NwZWNpZmljUHJpY2VNYXAuZm9ybUNvbnRhaW5lcn0gJHtTcGVjaWZpY1ByaWNlTWFwLnNob3BJZFNlbGVjdH1gLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzd2l0Y2hDdXN0b21lcjogJ3N3aXRjaFNwZWNpZmljUHJpY2VDdXN0b21lcicsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvZHVjdElkSW5wdXQ6ICcjc3BlY2lmaWNfcHJpY2VfcHJvZHVjdF9pZCcsXHJcbiAgZm9ybUNvbnRhaW5lcjogJ2Zvcm1bbmFtZT1cInNwZWNpZmljX3ByaWNlXCJdJyxcclxuICBjdXJyZW5jeUlkOiAnI3NwZWNpZmljX3ByaWNlX2dyb3Vwc19jdXJyZW5jeV9pZCcsXHJcbiAgY3VzdG9tZXJTZWFyY2hDb250YWluZXI6ICcjc3BlY2lmaWNfcHJpY2VfY3VzdG9tZXInLFxyXG4gIHByaWNlSW5wdXQ6ICcjc3BlY2lmaWNfcHJpY2VfZml4ZWRfcHJpY2UnLFxyXG4gIGZpeGVkUHJpY2VTeW1ib2w6ICcuanMtZml4ZWQtcHJpY2Utcm93IC5pbnB1dC1ncm91cC5tb25leS10eXBlIC5pbnB1dC1ncm91cC1hcHBlbmQgLmlucHV0LWdyb3VwLXRleHQsICdcclxuICAgICsgJy5qcy1maXhlZC1wcmljZS1yb3cgLmlucHV0LWdyb3VwLm1vbmV5LXR5cGUgLmlucHV0LWdyb3VwLXByZXBlbmQgLmlucHV0LWdyb3VwLXRleHQnLFxyXG4gIGxlYXZlSW5pdGlhbFByaWNlQ2hlY2tib3g6ICcjc3BlY2lmaWNfcHJpY2VfbGVhdmVfaW5pdGlhbF9wcmljZScsXHJcbiAgcmVkdWN0aW9uVHlwZVNlbGVjdDogJyNzcGVjaWZpY19wcmljZV9pbXBhY3RfcmVkdWN0aW9uX3R5cGUnLFxyXG4gIHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2w6ICcucHJpY2UtcmVkdWN0aW9uLXZhbHVlIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYXBwZW5kIC5pbnB1dC1ncm91cC10ZXh0LCAnXHJcbiAgICArICcucHJpY2UtcmVkdWN0aW9uLXZhbHVlIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtcHJlcGVuZCAuaW5wdXQtZ3JvdXAtdGV4dCcsXHJcbiAgaW5jbHVkZVRheElucHV0Q29udGFpbmVyOiAnLmpzLWluY2x1ZGUtdGF4LXJvdycsXHJcbiAgY3VzdG9tZXJJdGVtOiAnI3NwZWNpZmljX3ByaWNlX2N1c3RvbWVyX2xpc3QgLmVudGl0eS1pdGVtJyxcclxuICBzd2l0Y2hSZWR1Y3Rpb25OYW1lOiAnc3BlY2lmaWNfcHJpY2VbaW1wYWN0XVtkaXNhYmxpbmdfc3dpdGNoX3JlZHVjdGlvbl0nLFxyXG4gIHN3aXRjaEZpeGVkTmFtZTogJ3NwZWNpZmljX3ByaWNlW2ltcGFjdF1bZGlzYWJsaW5nX3N3aXRjaF9maXhlZF9wcmljZV90YXhfZXhjbHVkZWRdJyxcclxuICBzaG9wSWRTZWxlY3Q6ICcjc3BlY2lmaWNfcHJpY2VfZ3JvdXBzX3Nob3BfaWQnLFxyXG4gIGNvbWJpbmF0aW9uSWRTZWxlY3Q6ICcjc3BlY2lmaWNfcHJpY2VfY29tYmluYXRpb25faWQnLFxyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7dmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylmb3IodmFyIGQgaW4gYj1hcmd1bWVudHNbY10sYilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYixkKSYmKGFbZF09YltkXSk7cmV0dXJuIGF9LF90eXBlb2Y9J2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmJ3N5bWJvbCc9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oYSl7cmV0dXJuIHR5cGVvZiBhfTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmJ2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmYS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmYSE9PVN5bWJvbC5wcm90b3R5cGU/J3N5bWJvbCc6dHlwZW9mIGF9O2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfXZhciBSb3V0aW5nPWZ1bmN0aW9uIGEoKXt2YXIgYj10aGlzO19jbGFzc0NhbGxDaGVjayh0aGlzLGEpLHRoaXMuc2V0Um91dGVzPWZ1bmN0aW9uKGEpe2Iucm91dGVzUm91dGluZz1hfHxbXX0sdGhpcy5nZXRSb3V0ZXM9ZnVuY3Rpb24oKXtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nfSx0aGlzLnNldEJhc2VVcmw9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5iYXNlX3VybD1hfSx0aGlzLmdldEJhc2VVcmw9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5iYXNlX3VybH0sdGhpcy5zZXRQcmVmaXg9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5wcmVmaXg9YX0sdGhpcy5zZXRTY2hlbWU9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5zY2hlbWU9YX0sdGhpcy5nZXRTY2hlbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5zY2hlbWV9LHRoaXMuc2V0SG9zdD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLmhvc3Q9YX0sdGhpcy5nZXRIb3N0PWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuaG9zdH0sdGhpcy5idWlsZFF1ZXJ5UGFyYW1zPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1uZXcgUmVnRXhwKC9cXFtdJC8pO2MgaW5zdGFuY2VvZiBBcnJheT9jLmZvckVhY2goZnVuY3Rpb24oYyxmKXtlLnRlc3QoYSk/ZChhLGMpOmIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJysoJ29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP2Y6JycpKyddJyxjLGQpfSk6J29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP09iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJytlKyddJyxjW2VdLGQpfSk6ZChhLGMpfSx0aGlzLmdldFJvdXRlPWZ1bmN0aW9uKGEpe3ZhciBjPWIuY29udGV4dFJvdXRpbmcucHJlZml4K2E7aWYoISFiLnJvdXRlc1JvdXRpbmdbY10pcmV0dXJuIGIucm91dGVzUm91dGluZ1tjXTtlbHNlIGlmKCFiLnJvdXRlc1JvdXRpbmdbYV0pdGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIGRvZXMgbm90IGV4aXN0LicpO3JldHVybiBiLnJvdXRlc1JvdXRpbmdbYV19LHRoaXMuZ2VuZXJhdGU9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuZ2V0Um91dGUoYSksZj1jfHx7fSxnPV9leHRlbmRzKHt9LGYpLGg9J19zY2hlbWUnLGk9Jycsaj0hMCxrPScnO2lmKChlLnRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYil7aWYoJ3RleHQnPT09YlswXSlyZXR1cm4gaT1iWzFdK2ksdm9pZChqPSExKTtpZigndmFyaWFibGUnPT09YlswXSl7dmFyIGM9KGUuZGVmYXVsdHN8fHt9KVtiWzNdXTtpZighMT09anx8IWN8fChmfHx7fSlbYlszXV0mJmZbYlszXV0hPT1lLmRlZmF1bHRzW2JbM11dKXt2YXIgZDtpZigoZnx8e30pW2JbM11dKWQ9ZltiWzNdXSxkZWxldGUgZ1tiWzNdXTtlbHNlIGlmKGMpZD1lLmRlZmF1bHRzW2JbM11dO2Vsc2V7aWYoailyZXR1cm47dGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIHJlcXVpcmVzIHRoZSBwYXJhbWV0ZXIgXCInK2JbM10rJ1wiLicpfXZhciBoPSEwPT09ZHx8ITE9PT1kfHwnJz09PWQ7aWYoIWh8fCFqKXt2YXIgaz1lbmNvZGVVUklDb21wb25lbnQoZCkucmVwbGFjZSgvJTJGL2csJy8nKTsnbnVsbCc9PT1rJiZudWxsPT09ZCYmKGs9JycpLGk9YlsxXStrK2l9aj0hMX1lbHNlIGMmJmRlbGV0ZSBnW2JbM11dO3JldHVybn10aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJytiWzBdKydcIiBpcyBub3Qgc3VwcG9ydGVkLicpfSksJyc9PWkmJihpPScvJyksKGUuaG9zdHRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYSl7dmFyIGI7cmV0dXJuJ3RleHQnPT09YVswXT92b2lkKGs9YVsxXStrKTp2b2lkKCd2YXJpYWJsZSc9PT1hWzBdJiYoKGZ8fHt9KVthWzNdXT8oYj1mW2FbM11dLGRlbGV0ZSBnW2FbM11dKTplLmRlZmF1bHRzW2FbM11dJiYoYj1lLmRlZmF1bHRzW2FbM11dKSxrPWFbMV0rYitrKSl9KSxpPWIuY29udGV4dFJvdXRpbmcuYmFzZV91cmwraSxlLnJlcXVpcmVtZW50c1toXSYmYi5nZXRTY2hlbWUoKSE9PWUucmVxdWlyZW1lbnRzW2hdP2k9ZS5yZXF1aXJlbWVudHNbaF0rJzovLycrKGt8fGIuZ2V0SG9zdCgpKStpOmsmJmIuZ2V0SG9zdCgpIT09az9pPWIuZ2V0U2NoZW1lKCkrJzovLycraytpOiEwPT09ZCYmKGk9Yi5nZXRTY2hlbWUoKSsnOi8vJytiLmdldEhvc3QoKStpKSwwPE9iamVjdC5rZXlzKGcpLmxlbmd0aCl7dmFyIGw9W10sbT1mdW5jdGlvbihhLGIpe3ZhciBjPWI7Yz0nZnVuY3Rpb24nPT10eXBlb2YgYz9jKCk6YyxjPW51bGw9PT1jPycnOmMsbC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChhKSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGMpKX07T2JqZWN0LmtleXMoZykuZm9yRWFjaChmdW5jdGlvbihhKXtyZXR1cm4gYi5idWlsZFF1ZXJ5UGFyYW1zKGEsZ1thXSxtKX0pLGk9aSsnPycrbC5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csJysnKX1yZXR1cm4gaX0sdGhpcy5zZXREYXRhPWZ1bmN0aW9uKGEpe2Iuc2V0QmFzZVVybChhLmJhc2VfdXJsKSxiLnNldFJvdXRlcyhhLnJvdXRlcyksJ3ByZWZpeCdpbiBhJiZiLnNldFByZWZpeChhLnByZWZpeCksYi5zZXRIb3N0KGEuaG9zdCksYi5zZXRTY2hlbWUoYS5zY2hlbWUpfSx0aGlzLmNvbnRleHRSb3V0aW5nPXtiYXNlX3VybDonJyxwcmVmaXg6JycsaG9zdDonJyxzY2hlbWU6Jyd9fTttb2R1bGUuZXhwb3J0cz1uZXcgUm91dGluZzsiLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoaW1zIHRoYXQgcHJvdmlkZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIEVTNiBjb2xsZWN0aW9ucy5cclxuICpcclxuICogVGhlc2UgaW1wbGVtZW50YXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgdXNlZCBvdXRzaWRlIG9mIHRoZSBSZXNpemVPYnNlcnZlclxyXG4gKiBtb2R1bGVzIGFzIHRoZXkgY292ZXIgb25seSBhIGxpbWl0ZWQgcmFuZ2Ugb2YgdXNlIGNhc2VzLlxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1qc2RvYywgdmFsaWQtanNkb2MgKi9cclxudmFyIE1hcFNoaW0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbmRleCBpbiBwcm92aWRlZCBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheT59IGFyclxyXG4gICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KGFyciwga2V5KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGFyci5zb21lKGZ1bmN0aW9uIChlbnRyeSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5WzBdID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW50cmllc19fLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX19lbnRyaWVzX19baW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fW2luZGV4XVsxXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuX19lbnRyaWVzX187XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KGVudHJpZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5nZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18uc3BsaWNlKDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAgICAgKiBAcGFyYW0geyp9IFtjdHg9bnVsbF1cclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcclxuICAgICAgICAgICAgaWYgKGN0eCA9PT0gdm9pZCAwKSB7IGN0eCA9IG51bGw7IH1cclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX19lbnRyaWVzX187IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZW50cnlbMV0sIGVudHJ5WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzXzE7XHJcbiAgICB9KCkpO1xyXG59KSgpO1xuXG4vKipcclxuICogRGV0ZWN0cyB3aGV0aGVyIHdpbmRvdyBhbmQgZG9jdW1lbnQgb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGluIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbiAqL1xyXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgPT09IGRvY3VtZW50O1xuXG4vLyBSZXR1cm5zIGdsb2JhbCBvYmplY3Qgb2YgYSBjdXJyZW50IGVudmlyb25tZW50LlxyXG52YXIgZ2xvYmFsJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93O1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXHJcbiAgICByZXR1cm4gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIEEgc2hpbSBmb3IgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGljaCBmYWxscyBiYWNrIHRvIHRoZSBzZXRUaW1lb3V0IGlmXHJcbiAqIGZpcnN0IG9uZSBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXF1ZXN0cycgaWRlbnRpZmllci5cclxuICovXHJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEl0J3MgcmVxdWlyZWQgdG8gdXNlIGEgYm91bmRlZCBmdW5jdGlvbiBiZWNhdXNlIElFIHNvbWV0aW1lcyB0aHJvd3NcclxuICAgICAgICAvLyBhbiBcIkludmFsaWQgY2FsbGluZyBvYmplY3RcIiBlcnJvciBpZiByQUYgaXMgaW52b2tlZCB3aXRob3V0IHRoZSBnbG9iYWxcclxuICAgICAgICAvLyBvYmplY3Qgb24gdGhlIGxlZnQgaGFuZCBzaWRlLlxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwkMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbGxiYWNrKERhdGUubm93KCkpOyB9LCAxMDAwIC8gNjApOyB9O1xyXG59KSgpO1xuXG4vLyBEZWZpbmVzIG1pbmltdW0gdGltZW91dCBiZWZvcmUgYWRkaW5nIGEgdHJhaWxpbmcgY2FsbC5cclxudmFyIHRyYWlsaW5nVGltZW91dCA9IDI7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBlbnN1cmVzIHRoYXQgcHJvdmlkZWQgY2FsbGJhY2sgd2lsbCBiZVxyXG4gKiBpbnZva2VkIG9ubHkgb25jZSBkdXJpbmcgdGhlIHNwZWNpZmllZCBkZWxheSBwZXJpb2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgZGVsYXkgcGVyaW9kLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSBEZWxheSBhZnRlciB3aGljaCB0byBpbnZva2UgY2FsbGJhY2suXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgIHZhciBsZWFkaW5nQ2FsbCA9IGZhbHNlLCB0cmFpbGluZ0NhbGwgPSBmYWxzZSwgbGFzdENhbGxUaW1lID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgb3JpZ2luYWwgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIHNjaGVkdWxlcyBuZXcgaW52b2NhdGlvbiBpZlxyXG4gICAgICogdGhlIFwicHJveHlcIiB3YXMgY2FsbGVkIGR1cmluZyBjdXJyZW50IHJlcXVlc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlc29sdmVQZW5kaW5nKCkge1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhaWxpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIHByb3h5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkuIEl0IHdpbGwgZnVydGhlciBwb3N0cG9uZVxyXG4gICAgICogaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gZGVsZWdhdGluZyBpdCB0byB0aGVcclxuICAgICAqIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxKHJlc29sdmVQZW5kaW5nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGVzIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICB2YXIgdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgLy8gUmVqZWN0IGltbWVkaWF0ZWx5IGZvbGxvd2luZyBjYWxscy5cclxuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCAtIGxhc3RDYWxsVGltZSA8IHRyYWlsaW5nVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNjaGVkdWxlIG5ldyBjYWxsIHRvIGJlIGluIGludm9rZWQgd2hlbiB0aGUgcGVuZGluZyBvbmUgaXMgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IGZvciBcInRyYW5zaXRpb25zXCIgd2hpY2ggbmV2ZXIgYWN0dWFsbHkgc3RhcnRcclxuICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgc28gdGhlcmUgaXMgYSBjaGFuY2UgdGhhdCB3ZSBtaWdodCBtaXNzIG9uZSBpZiBjaGFuZ2VcclxuICAgICAgICAgICAgLy8gaGFwcGVucyBhbWlkcyB0aGUgcGVuZGluZyBpbnZvY2F0aW9uLlxyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aW1lb3V0Q2FsbGJhY2ssIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdENhbGxUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59XG5cbi8vIE1pbmltdW0gZGVsYXkgYmVmb3JlIGludm9raW5nIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLlxyXG52YXIgUkVGUkVTSF9ERUxBWSA9IDIwO1xyXG4vLyBBIGxpc3Qgb2Ygc3Vic3RyaW5ncyBvZiBDU1MgcHJvcGVydGllcyB1c2VkIHRvIGZpbmQgdHJhbnNpdGlvbiBldmVudHMgdGhhdFxyXG4vLyBtaWdodCBhZmZlY3QgZGltZW5zaW9ucyBvZiBvYnNlcnZlZCBlbGVtZW50cy5cclxudmFyIHRyYW5zaXRpb25LZXlzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3NpemUnLCAnd2VpZ2h0J107XHJcbi8vIENoZWNrIGlmIE11dGF0aW9uT2JzZXJ2ZXIgaXMgYXZhaWxhYmxlLlxyXG52YXIgbXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCA9IHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcclxuLyoqXHJcbiAqIFNpbmdsZXRvbiBjb250cm9sbGVyIGNsYXNzIHdoaWNoIGhhbmRsZXMgdXBkYXRlcyBvZiBSZXNpemVPYnNlcnZlciBpbnN0YW5jZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgRE9NIGxpc3RlbmVycyBoYXZlIGJlZW4gYWRkZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZWxscyB0aGF0IGNvbnRyb2xsZXIgaGFzIHN1YnNjcmliZWQgZm9yIE11dGF0aW9uIEV2ZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZWVwcyByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIE11dGF0aW9uT2JzZXJ2ZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TXV0YXRpb25PYnNlcnZlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBsaXN0IG9mIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2ZXJTUEk+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzXyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kXyA9IHRoaXMub25UcmFuc2l0aW9uRW5kXy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCA9IHRocm90dGxlKHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpLCBSRUZSRVNIX0RFTEFZKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvYnNlcnZlciB0byBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICBpZiAoIX50aGlzLm9ic2VydmVyc18uaW5kZXhPZihvYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNfLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIGlmIHRoZXkgaGF2ZW4ndCBiZWVuIGFkZGVkIHlldC5cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXztcclxuICAgICAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgLy8gUmVtb3ZlIG9ic2VydmVyIGlmIGl0J3MgcHJlc2VudCBpbiByZWdpc3RyeS5cclxuICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGlmIGNvbnRyb2xsZXIgaGFzIG5vIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMubGVuZ3RoICYmIHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy4gSXQgd2lsbCBjb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaW5zb2ZhclxyXG4gICAgICogaXQgZGV0ZWN0cyBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZXNEZXRlY3RlZCA9IHRoaXMudXBkYXRlT2JzZXJ2ZXJzXygpO1xyXG4gICAgICAgIC8vIENvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpZiBjaGFuZ2VzIGhhdmUgYmVlbiBkZXRlY3RlZCBhcyB0aGVyZSBtaWdodFxyXG4gICAgICAgIC8vIGJlIGZ1dHVyZSBvbmVzIGNhdXNlZCBieSBDU1MgdHJhbnNpdGlvbnMuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGV2ZXJ5IG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QgYW5kIG5vdGlmaWVzIHRoZW0gb2YgcXVldWVkXHJcbiAgICAgKiBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBcInRydWVcIiBpZiBhbnkgb2JzZXJ2ZXIgaGFzIGRldGVjdGVkIGNoYW5nZXMgaW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiBpdCdzIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZU9ic2VydmVyc18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBvYnNlcnZlcnMgdGhhdCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdmFyIGFjdGl2ZU9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXy5maWx0ZXIoZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5nYXRoZXJBY3RpdmUoKSwgb2JzZXJ2ZXIuaGFzQWN0aXZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRGVsaXZlciBub3RpZmljYXRpb25zIGluIGEgc2VwYXJhdGUgY3ljbGUgaW4gb3JkZXIgdG8gYXZvaWQgYW55XHJcbiAgICAgICAgLy8gY29sbGlzaW9ucyBiZXR3ZWVuIG9ic2VydmVycywgZS5nLiB3aGVuIG11bHRpcGxlIGluc3RhbmNlcyBvZlxyXG4gICAgICAgIC8vIFJlc2l6ZU9ic2VydmVyIGFyZSB0cmFja2luZyB0aGUgc2FtZSBlbGVtZW50IGFuZCB0aGUgY2FsbGJhY2sgb2Ygb25lXHJcbiAgICAgICAgLy8gb2YgdGhlbSBjaGFuZ2VzIGNvbnRlbnQgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgdGFyZ2V0LiBTb21ldGltZXNcclxuICAgICAgICAvLyB0aGlzIG1heSByZXN1bHQgaW4gbm90aWZpY2F0aW9ucyBiZWluZyBibG9ja2VkIGZvciB0aGUgcmVzdCBvZiBvYnNlcnZlcnMuXHJcbiAgICAgICAgYWN0aXZlT2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7IHJldHVybiBvYnNlcnZlci5icm9hZGNhc3RBY3RpdmUoKTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZU9ic2VydmVycy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgYWRkZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBpcyB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3JcclxuICAgICAgICAvLyBkZWxheWVkIHRyYW5zaXRpb25zLiBUaGlzIHdheSBpdCdzIHBvc3NpYmxlIHRvIGNhcHR1cmUgYXQgbGVhc3QgdGhlXHJcbiAgICAgICAgLy8gZmluYWwgc3RhdGUgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAobXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5kaXNjb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSByZW1vdmVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8ICF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFuc2l0aW9uRXZlbnR9IGV2ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5vblRyYW5zaXRpb25FbmRfID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIF9iID0gX2EucHJvcGVydHlOYW1lLCBwcm9wZXJ0eU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYjtcclxuICAgICAgICAvLyBEZXRlY3Qgd2hldGhlciB0cmFuc2l0aW9uIG1heSBhZmZlY3QgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIHZhciBpc1JlZmxvd1Byb3BlcnR5ID0gdHJhbnNpdGlvbktleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5wcm9wZXJ0eU5hbWUuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlZmxvd1Byb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlXykge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlXyA9IG5ldyBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VfO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyJ3MgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmluc3RhbmNlXyA9IG51bGw7XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyO1xyXG59KCkpO1xuXG4vKipcclxuICogRGVmaW5lcyBub24td3JpdGFibGUvZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwcm92aWRlZCB0YXJnZXQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gT2JqZWN0IGZvciB3aGljaCB0byBkZWZpbmUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gUHJvcGVydGllcyB0byBiZSBkZWZpbmVkLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0LlxyXG4gKi9cclxudmFyIGRlZmluZUNvbmZpZ3VyYWJsZSA9IChmdW5jdGlvbiAodGFyZ2V0LCBwcm9wcykge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHByb3BzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gX2FbX2ldO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHNba2V5XSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59KTtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdsb2JhbCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBnZXRXaW5kb3dPZiA9IChmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAvLyBBc3N1bWUgdGhhdCB0aGUgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiBOb2RlLCB3aGljaCBtZWFucyB0aGF0IGl0XHJcbiAgICAvLyBoYXMgdGhlIFwib3duZXJEb2N1bWVudFwiIHByb3BlcnR5IGZyb20gd2hpY2ggd2UgY2FuIHJldHJpZXZlIGFcclxuICAgIC8vIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9iamVjdC5cclxuICAgIHZhciBvd25lckdsb2JhbCA9IHRhcmdldCAmJiB0YXJnZXQub3duZXJEb2N1bWVudCAmJiB0YXJnZXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcclxuICAgIC8vIFJldHVybiB0aGUgbG9jYWwgZ2xvYmFsIG9iamVjdCBpZiBpdCdzIG5vdCBwb3NzaWJsZSBleHRyYWN0IG9uZSBmcm9tXHJcbiAgICAvLyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgcmV0dXJuIG93bmVyR2xvYmFsIHx8IGdsb2JhbCQxO1xyXG59KTtcblxuLy8gUGxhY2Vob2xkZXIgb2YgYW4gZW1wdHkgY29udGVudCByZWN0YW5nbGUuXHJcbnZhciBlbXB0eVJlY3QgPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHByb3ZpZGVkIHN0cmluZyB0byBhIG51bWJlci5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGJvcmRlcnMgc2l6ZSBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHBhcmFtIHsuLi5zdHJpbmd9IHBvc2l0aW9ucyAtIEJvcmRlcnMgcG9zaXRpb25zICh0b3AsIHJpZ2h0LCAuLi4pXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHNpemUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydib3JkZXItJyArIHBvc2l0aW9uICsgJy13aWR0aCddO1xyXG4gICAgICAgIHJldHVybiBzaXplICsgdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9LCAwKTtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgcGFkZGluZ3Mgc2l6ZXMgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFBhZGRpbmdzIGJveC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZGRpbmdzKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J107XHJcbiAgICB2YXIgcGFkZGluZ3MgPSB7fTtcclxuICAgIGZvciAodmFyIF9pID0gMCwgcG9zaXRpb25zXzEgPSBwb3NpdGlvbnM7IF9pIDwgcG9zaXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb25zXzFbX2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1sncGFkZGluZy0nICsgcG9zaXRpb25dO1xyXG4gICAgICAgIHBhZGRpbmdzW3Bvc2l0aW9uXSA9IHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZGRpbmdzO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIFNWRyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkc1xyXG4gKiAgICAgIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgdmFyIGJib3ggPSB0YXJnZXQuZ2V0QkJveCgpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KDAsIDAsIGJib3gud2lkdGgsIGJib3guaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBIVE1MRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBjb250ZW50IHJlY3RhbmdsZS5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIC8vIENsaWVudCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGNhbid0IGJlXHJcbiAgICAvLyB1c2VkIGV4Y2x1c2l2ZWx5IGFzIHRoZXkgcHJvdmlkZSByb3VuZGVkIHZhbHVlcy5cclxuICAgIHZhciBjbGllbnRXaWR0aCA9IHRhcmdldC5jbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0ID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIC8vIEJ5IHRoaXMgY29uZGl0aW9uIHdlIGNhbiBjYXRjaCBhbGwgbm9uLXJlcGxhY2VkIGlubGluZSwgaGlkZGVuIGFuZFxyXG4gICAgLy8gZGV0YWNoZWQgZWxlbWVudHMuIFRob3VnaCBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgbGVzc1xyXG4gICAgLy8gdGhhbiAwLjUgd2lsbCBiZSBkaXNjYXJkZWQgYXMgd2VsbC5cclxuICAgIC8vXHJcbiAgICAvLyBXaXRob3V0IGl0IHdlIHdvdWxkIG5lZWQgdG8gaW1wbGVtZW50IHNlcGFyYXRlIG1ldGhvZHMgZm9yIGVhY2ggb2ZcclxuICAgIC8vIHRob3NlIGNhc2VzIGFuZCBpdCdzIG5vdCBwb3NzaWJsZSB0byBwZXJmb3JtIGEgcHJlY2lzZSBhbmQgcGVyZm9ybWFuY2VcclxuICAgIC8vIGVmZmVjdGl2ZSB0ZXN0IGZvciBoaWRkZW4gZWxlbWVudHMuIEUuZy4gZXZlbiBqUXVlcnkncyAnOnZpc2libGUnIGZpbHRlclxyXG4gICAgLy8gZ2l2ZXMgd3JvbmcgcmVzdWx0cyBmb3IgZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBsZXNzIHRoYW4gMC41LlxyXG4gICAgaWYgKCFjbGllbnRXaWR0aCAmJiAhY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIHZhciBzdHlsZXMgPSBnZXRXaW5kb3dPZih0YXJnZXQpLmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcclxuICAgIHZhciBwYWRkaW5ncyA9IGdldFBhZGRpbmdzKHN0eWxlcyk7XHJcbiAgICB2YXIgaG9yaXpQYWQgPSBwYWRkaW5ncy5sZWZ0ICsgcGFkZGluZ3MucmlnaHQ7XHJcbiAgICB2YXIgdmVydFBhZCA9IHBhZGRpbmdzLnRvcCArIHBhZGRpbmdzLmJvdHRvbTtcclxuICAgIC8vIENvbXB1dGVkIHN0eWxlcyBvZiB3aWR0aCAmIGhlaWdodCBhcmUgYmVpbmcgdXNlZCBiZWNhdXNlIHRoZXkgYXJlIHRoZVxyXG4gICAgLy8gb25seSBkaW1lbnNpb25zIGF2YWlsYWJsZSB0byBKUyB0aGF0IGNvbnRhaW4gbm9uLXJvdW5kZWQgdmFsdWVzLiBJdCBjb3VsZFxyXG4gICAgLy8gYmUgcG9zc2libGUgdG8gdXRpbGl6ZSB0aGUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlmIG9ubHkgaXQncyBkYXRhIHdhc24ndFxyXG4gICAgLy8gYWZmZWN0ZWQgYnkgQ1NTIHRyYW5zZm9ybWF0aW9ucyBsZXQgYWxvbmUgcGFkZGluZ3MsIGJvcmRlcnMgYW5kIHNjcm9sbCBiYXJzLlxyXG4gICAgdmFyIHdpZHRoID0gdG9GbG9hdChzdHlsZXMud2lkdGgpLCBoZWlnaHQgPSB0b0Zsb2F0KHN0eWxlcy5oZWlnaHQpO1xyXG4gICAgLy8gV2lkdGggJiBoZWlnaHQgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB3aGVuIHRoZSAnYm9yZGVyLWJveCcgYm94XHJcbiAgICAvLyBtb2RlbCBpcyBhcHBsaWVkIChleGNlcHQgZm9yIElFKS5cclxuICAgIGlmIChzdHlsZXMuYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcpIHtcclxuICAgICAgICAvLyBGb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgcmVxdWlyZWQgdG8gaGFuZGxlIEludGVybmV0IEV4cGxvcmVyIHdoaWNoXHJcbiAgICAgICAgLy8gZG9lc24ndCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHRvIGNvbXB1dGVkIENTUyBkaW1lbnNpb25zLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gV2UgY2FuIHNheSB0aGF0IGlmIENTUyBkaW1lbnNpb25zICsgcGFkZGluZ3MgYXJlIGVxdWFsIHRvIHRoZSBcImNsaWVudFwiXHJcbiAgICAgICAgLy8gcHJvcGVydGllcyB0aGVuIGl0J3MgZWl0aGVyIElFLCBhbmQgdGh1cyB3ZSBkb24ndCBuZWVkIHRvIHN1YnRyYWN0XHJcbiAgICAgICAgLy8gYW55dGhpbmcsIG9yIGFuIGVsZW1lbnQgbWVyZWx5IGRvZXNuJ3QgaGF2ZSBwYWRkaW5ncy9ib3JkZXJzIHN0eWxlcy5cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAhPT0gY2xpZW50V2lkdGgpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAnbGVmdCcsICdyaWdodCcpICsgaG9yaXpQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpICE9PSBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3RvcCcsICdib3R0b20nKSArIHZlcnRQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRm9sbG93aW5nIHN0ZXBzIGNhbid0IGJlIGFwcGxpZWQgdG8gdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50IGFzIGl0c1xyXG4gICAgLy8gY2xpZW50W1dpZHRoL0hlaWdodF0gcHJvcGVydGllcyByZXByZXNlbnQgdmlld3BvcnQgYXJlYSBvZiB0aGUgd2luZG93LlxyXG4gICAgLy8gQmVzaWRlcywgaXQncyBhcyB3ZWxsIG5vdCBuZWNlc3NhcnkgYXMgdGhlIDxodG1sPiBpdHNlbGYgbmVpdGhlciBoYXNcclxuICAgIC8vIHJlbmRlcmVkIHNjcm9sbCBiYXJzIG5vciBpdCBjYW4gYmUgY2xpcHBlZC5cclxuICAgIGlmICghaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIC8vIEluIHNvbWUgYnJvd3NlcnMgKG9ubHkgaW4gRmlyZWZveCwgYWN0dWFsbHkpIENTUyB3aWR0aCAmIGhlaWdodFxyXG4gICAgICAgIC8vIGluY2x1ZGUgc2Nyb2xsIGJhcnMgc2l6ZSB3aGljaCBjYW4gYmUgcmVtb3ZlZCBhdCB0aGlzIHN0ZXAgYXMgc2Nyb2xsXHJcbiAgICAgICAgLy8gYmFycyBhcmUgdGhlIG9ubHkgZGlmZmVyZW5jZSBiZXR3ZWVuIHJvdW5kZWQgZGltZW5zaW9ucyArIHBhZGRpbmdzXHJcbiAgICAgICAgLy8gYW5kIFwiY2xpZW50XCIgcHJvcGVydGllcywgdGhvdWdoIHRoYXQgaXMgbm90IGFsd2F5cyB0cnVlIGluIENocm9tZS5cclxuICAgICAgICB2YXIgdmVydFNjcm9sbGJhciA9IE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgLSBjbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgaG9yaXpTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpIC0gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIC8vIENocm9tZSBoYXMgYSByYXRoZXIgd2VpcmQgcm91bmRpbmcgb2YgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLlxyXG4gICAgICAgIC8vIEUuZy4gZm9yIGFuIGVsZW1lbnQgd2l0aCBjb250ZW50IHdpZHRoIG9mIDMxNC4ycHggaXQgc29tZXRpbWVzIGdpdmVzXHJcbiAgICAgICAgLy8gdGhlIGNsaWVudCB3aWR0aCBvZiAzMTVweCBhbmQgZm9yIHRoZSB3aWR0aCBvZiAzMTQuN3B4IGl0IG1heSBnaXZlXHJcbiAgICAgICAgLy8gMzE0cHguIEFuZCBpdCBkb2Vzbid0IGhhcHBlbiBhbGwgdGhlIHRpbWUuIFNvIGp1c3QgaWdub3JlIHRoaXMgZGVsdGFcclxuICAgICAgICAvLyBhcyBhIG5vbi1yZWxldmFudC5cclxuICAgICAgICBpZiAoTWF0aC5hYnModmVydFNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gdmVydFNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGhvcml6U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gaG9yaXpTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KHBhZGRpbmdzLmxlZnQsIHBhZGRpbmdzLnRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFNWR0dyYXBoaWNzRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIGlzU1ZHR3JhcGhpY3NFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFNvbWUgYnJvd3NlcnMsIG5hbWVseSBJRSBhbmQgRWRnZSwgZG9uJ3QgaGF2ZSB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgICAvLyBpbnRlcmZhY2UuXHJcbiAgICBpZiAodHlwZW9mIFNWR0dyYXBoaWNzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdHcmFwaGljc0VsZW1lbnQ7IH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiBpdCdzIHNvLCB0aGVuIGNoZWNrIHRoYXQgZWxlbWVudCBpcyBhdCBsZWFzdCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgIC8vIFNWR0VsZW1lbnQgYW5kIHRoYXQgaXQgaGFzIHRoZSBcImdldEJCb3hcIiBtZXRob2QuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHRWxlbWVudCAmJlxyXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuZ2V0QkJveCA9PT0gJ2Z1bmN0aW9uJyk7IH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGEgZG9jdW1lbnQgZWxlbWVudCAoPGh0bWw+KS5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ID09PSBnZXRXaW5kb3dPZih0YXJnZXQpLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBhbiBhcHByb3ByaWF0ZSBjb250ZW50IHJlY3RhbmdsZSBmb3IgcHJvdmlkZWQgaHRtbCBvciBzdmcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgaWYgKCFpc0Jyb3dzZXIpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU1ZHR3JhcGhpY3NFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCk7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgcmVjdGFuZ2xlIHdpdGggYW4gaW50ZXJmYWNlIG9mIHRoZSBET01SZWN0UmVhZE9ubHkuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkb21yZWN0cmVhZG9ubHlcclxuICpcclxuICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBPYmplY3Qgd2l0aCByZWN0YW5nbGUncyB4L3kgY29vcmRpbmF0ZXMgYW5kIGRpbWVuc2lvbnMuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0UmVhZE9ubHl9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWFkT25seVJlY3QoX2EpIHtcclxuICAgIHZhciB4ID0gX2EueCwgeSA9IF9hLnksIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgIC8vIElmIERPTVJlY3RSZWFkT25seSBpcyBhdmFpbGFibGUgdXNlIGl0IGFzIGEgcHJvdG90eXBlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgdmFyIENvbnN0ciA9IHR5cGVvZiBET01SZWN0UmVhZE9ubHkgIT09ICd1bmRlZmluZWQnID8gRE9NUmVjdFJlYWRPbmx5IDogT2JqZWN0O1xyXG4gICAgdmFyIHJlY3QgPSBPYmplY3QuY3JlYXRlKENvbnN0ci5wcm90b3R5cGUpO1xyXG4gICAgLy8gUmVjdGFuZ2xlJ3MgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlIGFuZCBub24tZW51bWVyYWJsZS5cclxuICAgIGRlZmluZUNvbmZpZ3VyYWJsZShyZWN0LCB7XHJcbiAgICAgICAgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgcmlnaHQ6IHggKyB3aWR0aCxcclxuICAgICAgICBib3R0b206IGhlaWdodCArIHksXHJcbiAgICAgICAgbGVmdDogeFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVjdDtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyBET01SZWN0SW5pdCBvYmplY3QgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRpbWVuc2lvbnMgYW5kIHRoZSB4L3kgY29vcmRpbmF0ZXMuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkaWN0ZGVmLWRvbXJlY3Rpbml0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gUmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBSZWN0YW5nbGUncyBoZWlnaHQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlY3RJbml0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiB7IHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcclxufVxuXG4vKipcclxuICogQ2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgY29tcHV0YXRpb25zIG9mIHRoZSBjb250ZW50IHJlY3RhbmdsZSBvZlxyXG4gKiBwcm92aWRlZCBET00gZWxlbWVudCBhbmQgZm9yIGtlZXBpbmcgdHJhY2sgb2YgaXQncyBjaGFuZ2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgd2lkdGggb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIGhlaWdodCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZmVyZW5jZSB0byB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtET01SZWN0SW5pdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIGFuZCB0ZWxscyB3aGV0aGVyIGl0J3Mgd2lkdGggb3IgaGVpZ2h0IHByb3BlcnRpZXNcclxuICAgICAqIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBicm9hZGNhc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGdldENvbnRlbnRSZWN0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IHJlY3Q7XHJcbiAgICAgICAgcmV0dXJuIChyZWN0LndpZHRoICE9PSB0aGlzLmJyb2FkY2FzdFdpZHRoIHx8XHJcbiAgICAgICAgICAgIHJlY3QuaGVpZ2h0ICE9PSB0aGlzLmJyb2FkY2FzdEhlaWdodCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzICdicm9hZGNhc3RXaWR0aCcgYW5kICdicm9hZGNhc3RIZWlnaHQnIHByb3BlcnRpZXMgd2l0aCBhIGRhdGFcclxuICAgICAqIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBvZiB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9IExhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5icm9hZGNhc3RSZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jb250ZW50UmVjdF87XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gcmVjdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2YXRpb247XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlckVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyRW50cnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRoYXQgaXMgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIERhdGEgb2YgdGhlIGVsZW1lbnQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJFbnRyeSh0YXJnZXQsIHJlY3RJbml0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnRSZWN0ID0gY3JlYXRlUmVhZE9ubHlSZWN0KHJlY3RJbml0KTtcclxuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljYXRpb24gZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZVxyXG4gICAgICAgIC8vIGFuZCBhcmUgYWxzbyBub3QgZW51bWVyYWJsZSBpbiB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUHJvcGVydHkgYWNjZXNzb3JzIGFyZSBub3QgYmVpbmcgdXNlZCBhcyB0aGV5J2QgcmVxdWlyZSB0byBkZWZpbmUgYVxyXG4gICAgICAgIC8vIHByaXZhdGUgV2Vha01hcCBzdG9yYWdlIHdoaWNoIG1heSBjYXVzZSBtZW1vcnkgbGVha3MgaW4gYnJvd3NlcnMgdGhhdFxyXG4gICAgICAgIC8vIGRvbid0IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGNvbGxlY3Rpb25zLlxyXG4gICAgICAgIGRlZmluZUNvbmZpZ3VyYWJsZSh0aGlzLCB7IHRhcmdldDogdGFyZ2V0LCBjb250ZW50UmVjdDogY29udGVudFJlY3QgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJFbnRyeTtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyU1BJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWRcclxuICAgICAqICAgICAgd2hlbiBvbmUgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZXMgaXQncyBjb250ZW50IGRpbWVuc2lvbnMuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn0gY29udHJvbGxlciAtIENvbnRyb2xsZXIgaW5zdGFuY2Ugd2hpY2hcclxuICAgICAqICAgICAgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB1cGRhdGVzIG9mIG9ic2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlcn0gY2FsbGJhY2tDdHggLSBSZWZlcmVuY2UgdG8gdGhlIHB1YmxpY1xyXG4gICAgICogICAgICBSZXNpemVPYnNlcnZlciBpbnN0YW5jZSB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIGNhbGxiYWNrQ3R4KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29sbGVjdGlvbiBvZiByZXNpemUgb2JzZXJ2YXRpb25zIHRoYXQgaGF2ZSBkZXRlY3RlZCBjaGFuZ2VzIGluIGRpbWVuc2lvbnNcclxuICAgICAgICAgKiBvZiBlbGVtZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfID0gW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnkgb2YgdGhlIFJlc2l6ZU9ic2VydmF0aW9uIGluc3RhbmNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNYXA8RWxlbWVudCwgUmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXyA9IG5ldyBNYXBTaGltKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FsbGJhY2sgcHJvdmlkZWQgYXMgcGFyYW1ldGVyIDEgaXMgbm90IGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXyA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0N0eF8gPSBjYWxsYmFja0N0eDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmIChvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuc2V0KHRhcmdldCwgbmV3IFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8uYWRkT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIHVwZGF0ZSBvZiBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZWZyZXNoKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gc3RvcCBvYnNlcnZpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLnVub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBub3QgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBhbGwgZWxlbWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgb2JzZXJ2YXRpb24gaW5zdGFuY2VzIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgb2Ygd2hpY2ggaGFzIGNoYW5nZWRcclxuICAgICAqIGl0J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5nYXRoZXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhdGlvbi5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnB1c2gob2JzZXJ2YXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIGluaXRpYWwgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeVxyXG4gICAgICogaW5zdGFuY2VzIGNvbGxlY3RlZCBmcm9tIGFjdGl2ZSByZXNpemUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuYnJvYWRjYXN0QWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgb2JzZXJ2ZXIgZG9lc24ndCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuY2FsbGJhY2tDdHhfO1xyXG4gICAgICAgIC8vIENyZWF0ZSBSZXNpemVPYnNlcnZlckVudHJ5IGluc3RhbmNlIGZvciBldmVyeSBhY3RpdmUgb2JzZXJ2YXRpb24uXHJcbiAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubWFwKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc2l6ZU9ic2VydmVyRW50cnkob2JzZXJ2YXRpb24udGFyZ2V0LCBvYnNlcnZhdGlvbi5icm9hZGNhc3RSZWN0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwoY3R4LCBlbnRyaWVzLCBjdHgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgY29sbGVjdGlvbiBvZiBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuY2xlYXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnNwbGljZSgwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRlbGxzIHdoZXRoZXIgb2JzZXJ2ZXIgaGFzIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5oYXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlclNQSTtcclxufSgpKTtcblxuLy8gUmVnaXN0cnkgb2YgaW50ZXJuYWwgb2JzZXJ2ZXJzLiBJZiBXZWFrTWFwIGlzIG5vdCBhdmFpbGFibGUgdXNlIGN1cnJlbnQgc2hpbVxyXG4vLyBmb3IgdGhlIE1hcCBjb2xsZWN0aW9uIGFzIGl0IGhhcyBhbGwgcmVxdWlyZWQgbWV0aG9kcyBhbmQgYmVjYXVzZSBXZWFrTWFwXHJcbi8vIGNhbid0IGJlIGZ1bGx5IHBvbHlmaWxsZWQgYW55d2F5LlxyXG52YXIgb2JzZXJ2ZXJzID0gdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnID8gbmV3IFdlYWtNYXAoKSA6IG5ldyBNYXBTaGltKCk7XHJcbi8qKlxyXG4gKiBSZXNpemVPYnNlcnZlciBBUEkuIEVuY2Fwc3VsYXRlcyB0aGUgUmVzaXplT2JzZXJ2ZXIgU1BJIGltcGxlbWVudGF0aW9uXHJcbiAqIGV4cG9zaW5nIG9ubHkgdGhvc2UgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IGFyZSBkZWZpbmVkIGluIHRoZSBzcGVjLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc2l6ZU9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCB0aGlzKTtcclxuICAgICAgICBvYnNlcnZlcnMuc2V0KHRoaXMsIG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSgpKTtcclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG5bXHJcbiAgICAnb2JzZXJ2ZScsXHJcbiAgICAndW5vYnNlcnZlJyxcclxuICAgICdkaXNjb25uZWN0J1xyXG5dLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gICAgUmVzaXplT2JzZXJ2ZXIucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBvYnNlcnZlcnMuZ2V0KHRoaXMpKVttZXRob2RdLmFwcGx5KF9hLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufSk7XG5cbnZhciBpbmRleCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBFeHBvcnQgZXhpc3RpbmcgaW1wbGVtZW50YXRpb24gaWYgYXZhaWxhYmxlLlxyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwiLyohXG4gKiB0eXBlYWhlYWQuanMgMC4xMS4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdpdHRlci90eXBlYWhlYWQuanNcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUgVHdpdHRlciwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzOyBMaWNlbnNlZCBNSVRcbiAqL1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJibG9vZGhvdW5kXCIsIFsgXCJqcXVlcnlcIiBdLCBmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvb3RbXCJCbG9vZGhvdW5kXCJdID0gZmFjdG9yeShhMCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RbXCJCbG9vZGhvdW5kXCJdID0gZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCQpIHtcbiAgICB2YXIgXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTXNpZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8obXNpZSB8cnY6KShcXGQrKC5cXGQrKT8pL2kpWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNCbGFua1N0cmluZzogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdHIgfHwgL15cXHMqJC8udGVzdChzdHIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBcnJheTogJC5pc0FycmF5LFxuICAgICAgICAgICAgaXNGdW5jdGlvbjogJC5pc0Z1bmN0aW9uLFxuICAgICAgICAgICAgaXNPYmplY3Q6ICQuaXNQbGFpbk9iamVjdCxcbiAgICAgICAgICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VsZW1lbnQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0pRdWVyeTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mICQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHI6IGZ1bmN0aW9uIHRvU3RyKHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChzKSB8fCBzID09PSBudWxsID8gXCJcIiA6IHMgKyBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6ICQucHJveHksXG4gICAgICAgICAgICBlYWNoOiBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuICAgICAgICAgICAgICAgICQuZWFjaChjb2xsZWN0aW9uLCByZXZlcnNlQXJncyk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZUFyZ3MoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih2YWx1ZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXA6ICQubWFwLFxuICAgICAgICAgICAgZmlsdGVyOiAkLmdyZXAsXG4gICAgICAgICAgICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvbWU6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWl4aW46ICQuZXh0ZW5kLFxuICAgICAgICAgICAgaWRlbnRpdHk6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElkR2VuZXJhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291bnRlcisrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKG9iaikgPyBvYmogOiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZlcjogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cywgbGF0ZXIsIGNhbGxOb3c7XG4gICAgICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCB0aW1lb3V0LCByZXN1bHQsIHByZXZpb3VzLCBsYXRlcjtcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IDA7XG4gICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNTdHJpbmcodmFsKSA/IHZhbCA6IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9vcDogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuICAgIH0oKTtcbiAgICB2YXIgVkVSU0lPTiA9IFwiMC4xMS4xXCI7XG4gICAgdmFyIHRva2VuaXplcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub253b3JkOiBub253b3JkLFxuICAgICAgICAgICAgd2hpdGVzcGFjZTogd2hpdGVzcGFjZSxcbiAgICAgICAgICAgIG9iajoge1xuICAgICAgICAgICAgICAgIG5vbndvcmQ6IGdldE9ialRva2VuaXplcihub253b3JkKSxcbiAgICAgICAgICAgICAgICB3aGl0ZXNwYWNlOiBnZXRPYmpUb2tlbml6ZXIod2hpdGVzcGFjZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gd2hpdGVzcGFjZShzdHIpIHtcbiAgICAgICAgICAgIHN0ciA9IF8udG9TdHIoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoL1xccysvKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5vbndvcmQoc3RyKSB7XG4gICAgICAgICAgICBzdHIgPSBfLnRvU3RyKHN0cik7XG4gICAgICAgICAgICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KC9cXFcrLykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRPYmpUb2tlbml6ZXIodG9rZW5pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0S2V5KGtleXMpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdG9rZW5pemUobykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChrZXlzLCBmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KHRva2VuaXplcihfLnRvU3RyKG9ba10pKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBMcnVDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gTHJ1Q2FjaGUobWF4U2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5tYXhTaXplID0gXy5pc051bWJlcihtYXhTaXplKSA/IG1heFNpemUgOiAxMDA7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhTaXplIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCA9IHRoaXMuZ2V0ID0gJC5ub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTHJ1Q2FjaGUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWlsSXRlbSA9IHRoaXMubGlzdC50YWlsLCBub2RlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmUodGFpbEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYXNoW3RhaWxJdGVtLmtleV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSA9IHRoaXMuaGFzaFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmFsID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubW92ZVRvRnJvbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LmFkZChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNoW2tleV0gPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmhhc2hba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubW92ZVRvRnJvbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNoID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIExpc3QoKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTGlzdC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkLnByZXYgPSBub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbCB8fCBub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnByZXYgPyBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dCA6IHRoaXMuaGVhZCA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICBub2RlLm5leHQgPyBub2RlLm5leHQucHJldiA9IG5vZGUucHJldiA6IHRoaXMudGFpbCA9IG5vZGUucHJldjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlVG9Gcm9udDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gTm9kZShrZXksIHZhbCkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMubmV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExydUNhY2hlO1xuICAgIH0oKTtcbiAgICB2YXIgUGVyc2lzdGVudFN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBMT0NBTF9TVE9SQUdFO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFLnNldEl0ZW0oXCJ+fn5cIiwgXCIhXCIpO1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRS5yZW1vdmVJdGVtKFwifn5+XCIpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIFBlcnNpc3RlbnRTdG9yYWdlKG5hbWVzcGFjZSwgb3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4ID0gWyBcIl9fXCIsIG5hbWVzcGFjZSwgXCJfX1wiIF0uam9pbihcIlwiKTtcbiAgICAgICAgICAgIHRoaXMudHRsS2V5ID0gXCJfX3R0bF9fXCI7XG4gICAgICAgICAgICB0aGlzLmtleU1hdGNoZXIgPSBuZXcgUmVnRXhwKFwiXlwiICsgXy5lc2NhcGVSZWdFeENoYXJzKHRoaXMucHJlZml4KSk7XG4gICAgICAgICAgICB0aGlzLmxzID0gb3ZlcnJpZGUgfHwgTE9DQUxfU1RPUkFHRTtcbiAgICAgICAgICAgICF0aGlzLmxzICYmIHRoaXMuX25vb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFBlcnNpc3RlbnRTdG9yYWdlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3ByZWZpeDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsga2V5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF90dGxLZXk6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmVmaXgoa2V5KSArIHRoaXMudHRsS2V5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9ub29wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldCA9IHRoaXMuc2V0ID0gdGhpcy5yZW1vdmUgPSB0aGlzLmNsZWFyID0gdGhpcy5pc0V4cGlyZWQgPSBfLm5vb3A7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3NhZmVTZXQ6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5scy5zZXRJdGVtKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub29wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V4cGlyZWQoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlKHRoaXMubHMuZ2V0SXRlbSh0aGlzLl9wcmVmaXgoa2V5KSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwsIHR0bCkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKHR0bCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2FmZVNldCh0aGlzLl90dGxLZXkoa2V5KSwgZW5jb2RlKG5vdygpICsgdHRsKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3R0bEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NhZmVTZXQodGhpcy5fcHJlZml4KGtleSksIGVuY29kZSh2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl90dGxLZXkoa2V5KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3ByZWZpeChrZXkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGtleXMgPSBnYXRoZXJNYXRjaGluZ0tleXModGhpcy5rZXlNYXRjaGVyKTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBrZXlzLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRXhwaXJlZDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHR0bCA9IGRlY29kZSh0aGlzLmxzLmdldEl0ZW0odGhpcy5fdHRsS2V5KGtleSkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc051bWJlcih0dGwpICYmIG5vdygpID4gdHRsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFBlcnNpc3RlbnRTdG9yYWdlO1xuICAgICAgICBmdW5jdGlvbiBub3coKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KF8uaXNVbmRlZmluZWQodmFsKSA/IG51bGwgOiB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRlY29kZSh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkLnBhcnNlSlNPTih2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdhdGhlck1hdGNoaW5nS2V5cyhrZXlNYXRjaGVyKSB7XG4gICAgICAgICAgICB2YXIgaSwga2V5LCBrZXlzID0gW10sIGxlbiA9IExPQ0FMX1NUT1JBR0UubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChrZXkgPSBMT0NBTF9TVE9SQUdFLmtleShpKSkubWF0Y2goa2V5TWF0Y2hlcikpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleS5yZXBsYWNlKGtleU1hdGNoZXIsIFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgVHJhbnNwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgcGVuZGluZ1JlcXVlc3RzQ291bnQgPSAwLCBwZW5kaW5nUmVxdWVzdHMgPSB7fSwgbWF4UGVuZGluZ1JlcXVlc3RzID0gNiwgc2hhcmVkQ2FjaGUgPSBuZXcgTHJ1Q2FjaGUoMTApO1xuICAgICAgICBmdW5jdGlvbiBUcmFuc3BvcnQobykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYXN0UmVxID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NlbmQgPSBvLnRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMuX2dldCA9IG8ubGltaXRlciA/IG8ubGltaXRlcih0aGlzLl9nZXQpIDogdGhpcy5fZ2V0O1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBvLmNhY2hlID09PSBmYWxzZSA/IG5ldyBMcnVDYWNoZSgwKSA6IHNoYXJlZENhY2hlO1xuICAgICAgICB9XG4gICAgICAgIFRyYW5zcG9ydC5zZXRNYXhQZW5kaW5nUmVxdWVzdHMgPSBmdW5jdGlvbiBzZXRNYXhQZW5kaW5nUmVxdWVzdHMobnVtKSB7XG4gICAgICAgICAgICBtYXhQZW5kaW5nUmVxdWVzdHMgPSBudW07XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zcG9ydC5yZXNldENhY2hlID0gZnVuY3Rpb24gcmVzZXRDYWNoZSgpIHtcbiAgICAgICAgICAgIHNoYXJlZENhY2hlLnJlc2V0KCk7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oVHJhbnNwb3J0LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX2ZpbmdlcnByaW50OiBmdW5jdGlvbiBmaW5nZXJwcmludChvKSB7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8udXJsICsgby50eXBlICsgJC5wYXJhbShvLmRhdGEgfHwge30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXQ6IGZ1bmN0aW9uKG8sIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBmaW5nZXJwcmludCwganFYaHI7XG4gICAgICAgICAgICAgICAgZmluZ2VycHJpbnQgPSB0aGlzLl9maW5nZXJwcmludChvKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5jZWxsZWQgfHwgZmluZ2VycHJpbnQgIT09IHRoaXMubGFzdFJlcSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChqcVhociA9IHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF0pIHtcbiAgICAgICAgICAgICAgICAgICAganFYaHIuZG9uZShkb25lKS5mYWlsKGZhaWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGVuZGluZ1JlcXVlc3RzQ291bnQgPCBtYXhQZW5kaW5nUmVxdWVzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XSA9IHRoaXMuX3NlbmQobykuZG9uZShkb25lKS5mYWlsKGZhaWwpLmFsd2F5cyhhbHdheXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EZWNrUmVxdWVzdEFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCByZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fY2FjaGUuc2V0KGZpbmdlcnByaW50LCByZXNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmFpbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFsd2F5cygpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm9uRGVja1JlcXVlc3RBcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9nZXQuYXBwbHkodGhhdCwgdGhhdC5vbkRlY2tSZXF1ZXN0QXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uRGVja1JlcXVlc3RBcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKG8sIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3AsIGZpbmdlcnByaW50O1xuICAgICAgICAgICAgICAgIGNiID0gY2IgfHwgJC5ub29wO1xuICAgICAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgICAgICB9IDogbyB8fCB7fTtcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludCA9IHRoaXMuX2ZpbmdlcnByaW50KG8pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UmVxID0gZmluZ2VycHJpbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgPSB0aGlzLl9jYWNoZS5nZXQoZmluZ2VycHJpbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldChvLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFRyYW5zcG9ydDtcbiAgICB9KCk7XG4gICAgdmFyIFNlYXJjaEluZGV4ID0gd2luZG93LlNlYXJjaEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgQ0hJTERSRU4gPSBcImNcIiwgSURTID0gXCJpXCI7XG4gICAgICAgIGZ1bmN0aW9uIFNlYXJjaEluZGV4KG8pIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmRhdHVtVG9rZW5pemVyIHx8ICFvLnF1ZXJ5VG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImRhdHVtVG9rZW5pemVyIGFuZCBxdWVyeVRva2VuaXplciBhcmUgYm90aCByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWRlbnRpZnkgPSBvLmlkZW50aWZ5IHx8IF8uc3RyaW5naWZ5O1xuICAgICAgICAgICAgdGhpcy5kYXR1bVRva2VuaXplciA9IG8uZGF0dW1Ub2tlbml6ZXI7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5VG9rZW5pemVyID0gby5xdWVyeVRva2VuaXplcjtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFNlYXJjaEluZGV4LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgYm9vdHN0cmFwOiBmdW5jdGlvbiBib290c3RyYXAobykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0dW1zID0gby5kYXR1bXM7XG4gICAgICAgICAgICAgICAgdGhpcy50cmllID0gby50cmllO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBkYXRhID0gXy5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFsgZGF0YSBdO1xuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLCBmdW5jdGlvbihkYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQsIHRva2VucztcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXR1bXNbaWQgPSB0aGF0LmlkZW50aWZ5KGRhdHVtKV0gPSBkYXR1bTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gbm9ybWFsaXplVG9rZW5zKHRoYXQuZGF0dW1Ub2tlbml6ZXIoZGF0dW0pKTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlLCBjaGFycywgY2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhhdC50cmllO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnMgPSB0b2tlbi5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCA9IGNoYXJzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVtDSElMRFJFTl1bY2hdIHx8IChub2RlW0NISUxEUkVOXVtjaF0gPSBuZXdOb2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbSURTXS5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLm1hcChpZHMsIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRhdHVtc1tpZF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2gocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHRva2VucywgbWF0Y2hlcztcbiAgICAgICAgICAgICAgICB0b2tlbnMgPSBub3JtYWxpemVUb2tlbnModGhpcy5xdWVyeVRva2VuaXplcihxdWVyeSkpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlLCBjaGFycywgY2gsIGlkcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhhdC50cmllO1xuICAgICAgICAgICAgICAgICAgICBjaGFycyA9IHRva2VuLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAmJiAoY2ggPSBjaGFycy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVbQ0hJTERSRU5dW2NoXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSAmJiBjaGFycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkcyA9IG5vZGVbSURTXS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBtYXRjaGVzID8gZ2V0SW50ZXJzZWN0aW9uKG1hdGNoZXMsIGlkcykgOiBpZHM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcyA/IF8ubWFwKHVuaXF1ZShtYXRjaGVzKSwgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0dW1zW2lkXTtcbiAgICAgICAgICAgICAgICB9KSA6IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gYWxsKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5kYXR1bXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy5kYXR1bXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0dW1zID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy50cmllID0gbmV3Tm9kZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdHVtczogdGhpcy5kYXR1bXMsXG4gICAgICAgICAgICAgICAgICAgIHRyaWU6IHRoaXMudHJpZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gU2VhcmNoSW5kZXg7XG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVRva2Vucyh0b2tlbnMpIHtcbiAgICAgICAgICAgIHRva2VucyA9IF8uZmlsdGVyKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0b2tlbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9rZW5zID0gXy5tYXAodG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5ld05vZGUoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHt9O1xuICAgICAgICAgICAgbm9kZVtJRFNdID0gW107XG4gICAgICAgICAgICBub2RlW0NISUxEUkVOXSA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgc2VlbiA9IHt9LCB1bmlxdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlZW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZW5bYXJyYXlbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlcy5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRJbnRlcnNlY3Rpb24oYXJyYXlBLCBhcnJheUIpIHtcbiAgICAgICAgICAgIHZhciBhaSA9IDAsIGJpID0gMCwgaW50ZXJzZWN0aW9uID0gW107XG4gICAgICAgICAgICBhcnJheUEgPSBhcnJheUEuc29ydCgpO1xuICAgICAgICAgICAgYXJyYXlCID0gYXJyYXlCLnNvcnQoKTtcbiAgICAgICAgICAgIHZhciBsZW5BcnJheUEgPSBhcnJheUEubGVuZ3RoLCBsZW5BcnJheUIgPSBhcnJheUIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGFpIDwgbGVuQXJyYXlBICYmIGJpIDwgbGVuQXJyYXlCKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5QVthaV0gPCBhcnJheUJbYmldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhcnJheUFbYWldID4gYXJyYXlCW2JpXSkge1xuICAgICAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGFycmF5QVthaV0pO1xuICAgICAgICAgICAgICAgICAgICBhaSsrO1xuICAgICAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb247XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIFByZWZldGNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIGRhdGE6IFwiZGF0YVwiLFxuICAgICAgICAgICAgcHJvdG9jb2w6IFwicHJvdG9jb2xcIixcbiAgICAgICAgICAgIHRodW1icHJpbnQ6IFwidGh1bWJwcmludFwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIFByZWZldGNoKG8pIHtcbiAgICAgICAgICAgIHRoaXMudXJsID0gby51cmw7XG4gICAgICAgICAgICB0aGlzLnR0bCA9IG8udHRsO1xuICAgICAgICAgICAgdGhpcy5jYWNoZSA9IG8uY2FjaGU7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMudGh1bWJwcmludCA9IG8udGh1bWJwcmludDtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBQZXJzaXN0ZW50U3RvcmFnZShvLmNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFByZWZldGNoLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3NldHRpbmdzOiBmdW5jdGlvbiBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3JlOiBmdW5jdGlvbiBzdG9yZShkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLmRhdGEsIGRhdGEsIHRoaXMudHRsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMucHJvdG9jb2wsIGxvY2F0aW9uLnByb3RvY29sLCB0aGlzLnR0bCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLnRodW1icHJpbnQsIHRoaXMudGh1bWJwcmludCwgdGhpcy50dGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21DYWNoZTogZnVuY3Rpb24gZnJvbUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdG9yZWQgPSB7fSwgaXNFeHBpcmVkO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RvcmVkLmRhdGEgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc3RvcmVkLnByb3RvY29sID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLnByb3RvY29sKTtcbiAgICAgICAgICAgICAgICBzdG9yZWQudGh1bWJwcmludCA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy50aHVtYnByaW50KTtcbiAgICAgICAgICAgICAgICBpc0V4cGlyZWQgPSBzdG9yZWQudGh1bWJwcmludCAhPT0gdGhpcy50aHVtYnByaW50IHx8IHN0b3JlZC5wcm90b2NvbCAhPT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlZC5kYXRhICYmICFpc0V4cGlyZWQgPyBzdG9yZWQuZGF0YSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbU5ldHdvcms6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBzZXR0aW5ncztcbiAgICAgICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLnByZXBhcmUodGhpcy5fc2V0dGluZ3MoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQoc2V0dGluZ3MpLmZhaWwob25FcnJvcikuZG9uZShvblJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNwb25zZShyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHRoYXQudHJhbnNmb3JtKHJlc3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByZWZldGNoO1xuICAgIH0oKTtcbiAgICB2YXIgUmVtb3RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBSZW1vdGUobykge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBvLnVybDtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gby50cmFuc2Zvcm07XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG5ldyBUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIGNhY2hlOiBvLmNhY2hlLFxuICAgICAgICAgICAgICAgIGxpbWl0ZXI6IG8ubGltaXRlcixcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG8udHJhbnNwb3J0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFJlbW90ZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9zZXR0aW5nczogZnVuY3Rpb24gc2V0dGluZ3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChxdWVyeSwgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHNldHRpbmdzO1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5IHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLnByZXBhcmUocXVlcnksIHRoaXMuX3NldHRpbmdzKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5nZXQoc2V0dGluZ3MsIG9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVzcG9uc2UoZXJyLCByZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVyciA/IGNiKFtdKSA6IGNiKHRoYXQudHJhbnNmb3JtKHJlc3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsTGFzdFJlcXVlc3Q6IGZ1bmN0aW9uIGNhbmNlbExhc3RSZXF1ZXN0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFJlbW90ZTtcbiAgICB9KCk7XG4gICAgdmFyIG9QYXJzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBwYXJzZShvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMsIHNvcnRlcjtcbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemU6IHRydWUsXG4gICAgICAgICAgICAgICAgaWRlbnRpZnk6IF8uc3RyaW5naWZ5LFxuICAgICAgICAgICAgICAgIGRhdHVtVG9rZW5pemVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VG9rZW5pemVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHN1ZmZpY2llbnQ6IDUsXG4gICAgICAgICAgICAgICAgc29ydGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGxvY2FsOiBbXSxcbiAgICAgICAgICAgICAgICBwcmVmZXRjaDogbnVsbCxcbiAgICAgICAgICAgICAgICByZW1vdGU6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyB8fCB7fSk7XG4gICAgICAgICAgICAhby5kYXR1bVRva2VuaXplciAmJiAkLmVycm9yKFwiZGF0dW1Ub2tlbml6ZXIgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICAhby5xdWVyeVRva2VuaXplciAmJiAkLmVycm9yKFwicXVlcnlUb2tlbml6ZXIgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICBzb3J0ZXIgPSBvLnNvcnRlcjtcbiAgICAgICAgICAgIG8uc29ydGVyID0gc29ydGVyID8gZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4LnNvcnQoc29ydGVyKTtcbiAgICAgICAgICAgIH0gOiBfLmlkZW50aXR5O1xuICAgICAgICAgICAgby5sb2NhbCA9IF8uaXNGdW5jdGlvbihvLmxvY2FsKSA/IG8ubG9jYWwoKSA6IG8ubG9jYWw7XG4gICAgICAgICAgICBvLnByZWZldGNoID0gcGFyc2VQcmVmZXRjaChvLnByZWZldGNoKTtcbiAgICAgICAgICAgIG8ucmVtb3RlID0gcGFyc2VSZW1vdGUoby5yZW1vdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUHJlZmV0Y2gobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzO1xuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgdHRsOiAyNCAqIDYwICogNjAgKiAxZTMsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FjaGVLZXk6IG51bGwsXG4gICAgICAgICAgICAgICAgdGh1bWJwcmludDogXCJcIixcbiAgICAgICAgICAgICAgICBwcmVwYXJlOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgIH0gOiBvO1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgIW8udXJsICYmICQuZXJyb3IoXCJwcmVmZXRjaCByZXF1aXJlcyB1cmwgdG8gYmUgc2V0XCIpO1xuICAgICAgICAgICAgby50cmFuc2Zvcm0gPSBvLmZpbHRlciB8fCBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG8uY2FjaGVLZXkgPSBvLmNhY2hlS2V5IHx8IG8udXJsO1xuICAgICAgICAgICAgby50aHVtYnByaW50ID0gVkVSU0lPTiArIG8udGh1bWJwcmludDtcbiAgICAgICAgICAgIG8udHJhbnNwb3J0ID0gby50cmFuc3BvcnQgPyBjYWxsYmFja1RvRGVmZXJyZWQoby50cmFuc3BvcnQpIDogJC5hamF4O1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VSZW1vdGUobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzO1xuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXBhcmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVwbGFjZTogbnVsbCxcbiAgICAgICAgICAgICAgICB3aWxkY2FyZDogbnVsbCxcbiAgICAgICAgICAgICAgICBsaW1pdGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHJhdGVMaW1pdEJ5OiBcImRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgcmF0ZUxpbWl0V2FpdDogMzAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgIH0gOiBvO1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgIW8udXJsICYmICQuZXJyb3IoXCJyZW1vdGUgcmVxdWlyZXMgdXJsIHRvIGJlIHNldFwiKTtcbiAgICAgICAgICAgIG8udHJhbnNmb3JtID0gby5maWx0ZXIgfHwgby50cmFuc2Zvcm07XG4gICAgICAgICAgICBvLnByZXBhcmUgPSB0b1JlbW90ZVByZXBhcmUobyk7XG4gICAgICAgICAgICBvLmxpbWl0ZXIgPSB0b0xpbWl0ZXIobyk7XG4gICAgICAgICAgICBvLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0ID8gY2FsbGJhY2tUb0RlZmVycmVkKG8udHJhbnNwb3J0KSA6ICQuYWpheDtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJlcGxhY2U7XG4gICAgICAgICAgICBkZWxldGUgby53aWxkY2FyZDtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJhdGVMaW1pdEJ5O1xuICAgICAgICAgICAgZGVsZXRlIG8ucmF0ZUxpbWl0V2FpdDtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvUmVtb3RlUHJlcGFyZShvKSB7XG4gICAgICAgICAgICB2YXIgcHJlcGFyZSwgcmVwbGFjZSwgd2lsZGNhcmQ7XG4gICAgICAgICAgICBwcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgcmVwbGFjZSA9IG8ucmVwbGFjZTtcbiAgICAgICAgICAgIHdpbGRjYXJkID0gby53aWxkY2FyZDtcbiAgICAgICAgICAgIGlmIChwcmVwYXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXBhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBwcmVwYXJlQnlSZXBsYWNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvLndpbGRjYXJkKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IHByZXBhcmVCeVdpbGRjYXJkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gaWRlbml0eVByZXBhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlcGFyZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXBhcmVCeVJlcGxhY2UocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudXJsID0gcmVwbGFjZShzZXR0aW5ncy51cmwsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnlXaWxkY2FyZChxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSBzZXR0aW5ncy51cmwucmVwbGFjZSh3aWxkY2FyZCwgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaWRlbml0eVByZXBhcmUocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvTGltaXRlcihvKSB7XG4gICAgICAgICAgICB2YXIgbGltaXRlciwgbWV0aG9kLCB3YWl0O1xuICAgICAgICAgICAgbGltaXRlciA9IG8ubGltaXRlcjtcbiAgICAgICAgICAgIG1ldGhvZCA9IG8ucmF0ZUxpbWl0Qnk7XG4gICAgICAgICAgICB3YWl0ID0gby5yYXRlTGltaXRXYWl0O1xuICAgICAgICAgICAgaWYgKCFsaW1pdGVyKSB7XG4gICAgICAgICAgICAgICAgbGltaXRlciA9IC9edGhyb3R0bGUkL2kudGVzdChtZXRob2QpID8gdGhyb3R0bGUod2FpdCkgOiBkZWJvdW5jZSh3YWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW1pdGVyO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGVib3VuY2Uod2FpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5kZWJvdW5jZShmbiwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRocm90dGxlKHdhaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGUoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8udGhyb3R0bGUoZm4sIHdhaXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FsbGJhY2tUb0RlZmVycmVkKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlcihvKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGZuKG8sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBCbG9vZGhvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgb2xkO1xuICAgICAgICBvbGQgPSB3aW5kb3cgJiYgd2luZG93LkJsb29kaG91bmQ7XG4gICAgICAgIGZ1bmN0aW9uIEJsb29kaG91bmQobykge1xuICAgICAgICAgICAgbyA9IG9QYXJzZXIobyk7XG4gICAgICAgICAgICB0aGlzLnNvcnRlciA9IG8uc29ydGVyO1xuICAgICAgICAgICAgdGhpcy5pZGVudGlmeSA9IG8uaWRlbnRpZnk7XG4gICAgICAgICAgICB0aGlzLnN1ZmZpY2llbnQgPSBvLnN1ZmZpY2llbnQ7XG4gICAgICAgICAgICB0aGlzLmxvY2FsID0gby5sb2NhbDtcbiAgICAgICAgICAgIHRoaXMucmVtb3RlID0gby5yZW1vdGUgPyBuZXcgUmVtb3RlKG8ucmVtb3RlKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLnByZWZldGNoID0gby5wcmVmZXRjaCA/IG5ldyBQcmVmZXRjaChvLnByZWZldGNoKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gbmV3IFNlYXJjaEluZGV4KHtcbiAgICAgICAgICAgICAgICBpZGVudGlmeTogdGhpcy5pZGVudGlmeSxcbiAgICAgICAgICAgICAgICBkYXR1bVRva2VuaXplcjogby5kYXR1bVRva2VuaXplcixcbiAgICAgICAgICAgICAgICBxdWVyeVRva2VuaXplcjogby5xdWVyeVRva2VuaXplclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvLmluaXRpYWxpemUgIT09IGZhbHNlICYmIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIEJsb29kaG91bmQubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgICAgICB3aW5kb3cgJiYgKHdpbmRvdy5CbG9vZGhvdW5kID0gb2xkKTtcbiAgICAgICAgICAgIHJldHVybiBCbG9vZGhvdW5kO1xuICAgICAgICB9O1xuICAgICAgICBCbG9vZGhvdW5kLnRva2VuaXplcnMgPSB0b2tlbml6ZXJzO1xuICAgICAgICBfLm1peGluKEJsb29kaG91bmQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfX3R0QWRhcHRlcjogZnVuY3Rpb24gdHRBZGFwdGVyKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGUgPyB3aXRoQXN5bmMgOiB3aXRob3V0QXN5bmM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd2l0aEFzeW5jKHF1ZXJ5LCBzeW5jLCBhc3luYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zZWFyY2gocXVlcnksIHN5bmMsIGFzeW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd2l0aG91dEFzeW5jKHF1ZXJ5LCBzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNlYXJjaChxdWVyeSwgc3luYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9sb2FkUHJlZmV0Y2g6IGZ1bmN0aW9uIGxvYWRQcmVmZXRjaCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGRlZmVycmVkLCBzZXJpYWxpemVkO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmVmZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpYWxpemVkID0gdGhpcy5wcmVmZXRjaC5mcm9tQ2FjaGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4LmJvb3RzdHJhcChzZXJpYWxpemVkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZmV0Y2guZnJvbU5ldHdvcmsoZG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnByZWZldGNoLnN0b3JlKHRoYXQuaW5kZXguc2VyaWFsaXplKCkpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICh0aGlzLmluaXRQcm9taXNlID0gdGhpcy5fbG9hZFByZWZldGNoKCkpLmRvbmUoYWRkTG9jYWxUb0luZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRMb2NhbFRvSW5kZXgoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKHRoYXQubG9jYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmluaXRQcm9taXNlIHx8IGZvcmNlID8gdGhpcy5faW5pdGlhbGl6ZSgpIDogdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5hZGQoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWRzKSB7XG4gICAgICAgICAgICAgICAgaWRzID0gXy5pc0FycmF5KGlkcykgPyBpZHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXguZ2V0KGlkcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2gocXVlcnksIHN5bmMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBsb2NhbDtcbiAgICAgICAgICAgICAgICBsb2NhbCA9IHRoaXMuc29ydGVyKHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgc3luYyh0aGlzLnJlbW90ZSA/IGxvY2FsLnNsaWNlKCkgOiBsb2NhbCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlICYmIGxvY2FsLmxlbmd0aCA8IHRoaXMuc3VmZmljaWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5nZXQocXVlcnksIHByb2Nlc3NSZW1vdGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGUuY2FuY2VsTGFzdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc1JlbW90ZShyZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vbkR1cGxpY2F0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHJlbW90ZSwgZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgICAgICAgIV8uc29tZShsb2NhbCwgZnVuY3Rpb24obCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlkZW50aWZ5KHIpID09PSB0aGF0LmlkZW50aWZ5KGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkgJiYgbm9uRHVwbGljYXRlcy5wdXNoKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgJiYgYXN5bmMobm9uRHVwbGljYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gYWxsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4LmFsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJQcmVmZXRjaENhY2hlOiBmdW5jdGlvbiBjbGVhclByZWZldGNoQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaCAmJiB0aGlzLnByZWZldGNoLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJSZW1vdGVDYWNoZTogZnVuY3Rpb24gY2xlYXJSZW1vdGVDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICBUcmFuc3BvcnQucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR0QWRhcHRlcjogZnVuY3Rpb24gdHRBZGFwdGVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdHRBZGFwdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQmxvb2Rob3VuZDtcbiAgICB9KCk7XG4gICAgcmV0dXJuIEJsb29kaG91bmQ7XG59KTtcblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFwidHlwZWFoZWFkLmpzXCIsIFsgXCJqcXVlcnlcIiBdLCBmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkoYTApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oJCkge1xuICAgIHZhciBfID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNc2llOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSlbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0JsYW5rU3RyaW5nOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FycmF5OiAkLmlzQXJyYXksXG4gICAgICAgICAgICBpc0Z1bmN0aW9uOiAkLmlzRnVuY3Rpb24sXG4gICAgICAgICAgICBpc09iamVjdDogJC5pc1BsYWluT2JqZWN0LFxuICAgICAgICAgICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSlF1ZXJ5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgJDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHMpIHx8IHMgPT09IG51bGwgPyBcIlwiIDogcyArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogJC5wcm94eSxcbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogJC5tYXAsXG4gICAgICAgICAgICBmaWx0ZXI6ICQuZ3JlcCxcbiAgICAgICAgICAgIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29tZTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbjogJC5leHRlbmQsXG4gICAgICAgICAgICBpZGVudGl0eTogZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SWRHZW5lcmF0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob2JqKSA/IG9iaiA6IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzLCBsYXRlciwgY2FsbE5vdztcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRocm90dGxlOiBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQsIHJlc3VsdCwgcHJldmlvdXMsIGxhdGVyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKSwgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1N0cmluZyh2YWwpID8gdmFsIDogSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSgpO1xuICAgIHZhciBXV1cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBkZWZhdWx0Q2xhc3NOYW1lcyA9IHtcbiAgICAgICAgICAgIHdyYXBwZXI6IFwidHdpdHRlci10eXBlYWhlYWRcIixcbiAgICAgICAgICAgIGlucHV0OiBcInR0LWlucHV0XCIsXG4gICAgICAgICAgICBoaW50OiBcInR0LWhpbnRcIixcbiAgICAgICAgICAgIG1lbnU6IFwidHQtbWVudVwiLFxuICAgICAgICAgICAgZGF0YXNldDogXCJ0dC1kYXRhc2V0XCIsXG4gICAgICAgICAgICBzdWdnZXN0aW9uOiBcInR0LXN1Z2dlc3Rpb25cIixcbiAgICAgICAgICAgIHNlbGVjdGFibGU6IFwidHQtc2VsZWN0YWJsZVwiLFxuICAgICAgICAgICAgZW1wdHk6IFwidHQtZW1wdHlcIixcbiAgICAgICAgICAgIG9wZW46IFwidHQtb3BlblwiLFxuICAgICAgICAgICAgY3Vyc29yOiBcInR0LWN1cnNvclwiLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBcInR0LWhpZ2hsaWdodFwiXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWlsZDtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGQobykge1xuICAgICAgICAgICAgdmFyIHd3dywgY2xhc3NlcztcbiAgICAgICAgICAgIGNsYXNzZXMgPSBfLm1peGluKHt9LCBkZWZhdWx0Q2xhc3NOYW1lcywgbyk7XG4gICAgICAgICAgICB3d3cgPSB7XG4gICAgICAgICAgICAgICAgY3NzOiBidWlsZENzcygpLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgaHRtbDogYnVpbGRIdG1sKGNsYXNzZXMpLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yczogYnVpbGRTZWxlY3RvcnMoY2xhc3NlcylcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNzczogd3d3LmNzcyxcbiAgICAgICAgICAgICAgICBodG1sOiB3d3cuaHRtbCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB3d3cuY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnM6IHd3dy5zZWxlY3RvcnMsXG4gICAgICAgICAgICAgICAgbWl4aW46IGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgXy5taXhpbihvLCB3d3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRIdG1sKGMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlcjogJzxzcGFuIGNsYXNzPVwiJyArIGMud3JhcHBlciArICdcIj48L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBtZW51OiAnPGRpdiBjbGFzcz1cIicgKyBjLm1lbnUgKyAnXCI+PC9kaXY+J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZFNlbGVjdG9ycyhjbGFzc2VzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JzID0ge307XG4gICAgICAgICAgICBfLmVhY2goY2xhc3NlcywgZnVuY3Rpb24odiwgaykge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yc1trXSA9IFwiLlwiICsgdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9ycztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZENzcygpIHtcbiAgICAgICAgICAgIHZhciBjc3MgPSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlcjoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBcIjFcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0V2l0aE5vSGludDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcInRvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZW51OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsdHI6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBcImF1dG9cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcnRsOiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogXCIgMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChfLmlzTXNpZSgpKSB7XG4gICAgICAgICAgICAgICAgXy5taXhpbihjc3MuaW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcInVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcpXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjc3M7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIEV2ZW50QnVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgbmFtZXNwYWNlLCBkZXByZWNhdGlvbk1hcDtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJ0eXBlYWhlYWQ6XCI7XG4gICAgICAgIGRlcHJlY2F0aW9uTWFwID0ge1xuICAgICAgICAgICAgcmVuZGVyOiBcInJlbmRlcmVkXCIsXG4gICAgICAgICAgICBjdXJzb3JjaGFuZ2U6IFwiY3Vyc29yY2hhbmdlZFwiLFxuICAgICAgICAgICAgc2VsZWN0OiBcInNlbGVjdGVkXCIsXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IFwiYXV0b2NvbXBsZXRlZFwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50QnVzKG8pIHtcbiAgICAgICAgICAgIGlmICghbyB8fCAhby5lbCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJFdmVudEJ1cyBpbml0aWFsaXplZCB3aXRob3V0IGVsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKG8uZWwpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oRXZlbnRCdXMucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfdHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgYXJncykge1xuICAgICAgICAgICAgICAgIHZhciAkZTtcbiAgICAgICAgICAgICAgICAkZSA9ICQuRXZlbnQobmFtZXNwYWNlICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgKGFyZ3MgPSBhcmdzIHx8IFtdKS51bnNoaWZ0KCRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VyLmFwcGx5KHRoaXMuJGVsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVmb3JlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MsICRlO1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgJGUgPSB0aGlzLl90cmlnZ2VyKFwiYmVmb3JlXCIgKyB0eXBlLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGUuaXNEZWZhdWx0UHJldmVudGVkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXByZWNhdGVkVHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKHR5cGUsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHJlY2F0ZWRUeXBlID0gZGVwcmVjYXRpb25NYXBbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcihkZXByZWNhdGVkVHlwZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnRCdXM7XG4gICAgfSgpO1xuICAgIHZhciBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzcGxpdHRlciA9IC9cXHMrLywgbmV4dFRpY2sgPSBnZXROZXh0VGljaygpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TeW5jOiBvblN5bmMsXG4gICAgICAgICAgICBvbkFzeW5jOiBvbkFzeW5jLFxuICAgICAgICAgICAgb2ZmOiBvZmYsXG4gICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uKG1ldGhvZCwgdHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgY2IgPSBjb250ZXh0ID8gYmluZENvbnRleHQoY2IsIGNvbnRleHQpIDogY2I7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV0gPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0gfHwge1xuICAgICAgICAgICAgICAgICAgICBzeW5jOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV1bbWV0aG9kXS5wdXNoKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uQXN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gb24uY2FsbCh0aGlzLCBcImFzeW5jXCIsIHR5cGVzLCBjYiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25TeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uLmNhbGwodGhpcywgXCJzeW5jXCIsIHR5cGVzLCBjYiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb2ZmKHR5cGVzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbdHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0cmlnZ2VyKHR5cGVzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSwgY2FsbGJhY2tzLCBhcmdzLCBzeW5jRmx1c2gsIGFzeW5jRmx1c2g7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgd2hpbGUgKCh0eXBlID0gdHlwZXMuc2hpZnQoKSkgJiYgKGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICBzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3Muc3luYywgdGhpcywgWyB0eXBlIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBhc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLmFzeW5jLCB0aGlzLCBbIHR5cGUgXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIHN5bmNGbHVzaCgpICYmIG5leHRUaWNrKGFzeW5jRmx1c2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0Rmx1c2goY2FsbGJhY2tzLCBjb250ZXh0LCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmx1c2g7XG4gICAgICAgICAgICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FuY2VsbGVkO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyAhY2FuY2VsbGVkICYmIGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQgPSBjYWxsYmFja3NbaV0uYXBwbHkoY29udGV4dCwgYXJncykgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWNhbmNlbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXROZXh0VGljaygpIHtcbiAgICAgICAgICAgIHZhciBuZXh0VGlja0ZuO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBuZXh0VGlja0ZuID0gZnVuY3Rpb24gbmV4dFRpY2tTZXRJbW1lZGlhdGUoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpY2tGbiA9IGZ1bmN0aW9uIG5leHRUaWNrU2V0VGltZW91dChmbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0VGlja0ZuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJpbmRDb250ZXh0KGZuLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYmluZCA/IGZuLmJpbmQoY29udGV4dCkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShjb250ZXh0LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgaGlnaGxpZ2h0ID0gZnVuY3Rpb24oZG9jKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBub2RlOiBudWxsLFxuICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgIHRhZ05hbWU6IFwic3Ryb25nXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICB3b3Jkc09ubHk6IGZhbHNlLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGhpZ2h0bGlnaHQobykge1xuICAgICAgICAgICAgdmFyIHJlZ2V4O1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oe30sIGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgIGlmICghby5ub2RlIHx8ICFvLnBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnBhdHRlcm4gPSBfLmlzQXJyYXkoby5wYXR0ZXJuKSA/IG8ucGF0dGVybiA6IFsgby5wYXR0ZXJuIF07XG4gICAgICAgICAgICByZWdleCA9IGdldFJlZ2V4KG8ucGF0dGVybiwgby5jYXNlU2Vuc2l0aXZlLCBvLndvcmRzT25seSk7XG4gICAgICAgICAgICB0cmF2ZXJzZShvLm5vZGUsIGhpZ2h0bGlnaHRUZXh0Tm9kZSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBoaWdodGxpZ2h0VGV4dE5vZGUodGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2gsIHBhdHRlcm5Ob2RlLCB3cmFwcGVyTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSByZWdleC5leGVjKHRleHROb2RlLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50YWdOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgby5jbGFzc05hbWUgJiYgKHdyYXBwZXJOb2RlLmNsYXNzTmFtZSA9IG8uY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybk5vZGUgPSB0ZXh0Tm9kZS5zcGxpdFRleHQobWF0Y2guaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuTm9kZS5zcGxpdFRleHQobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlck5vZGUuYXBwZW5kQ2hpbGQocGF0dGVybk5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlck5vZGUsIHBhdHRlcm5Ob2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhbWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0cmF2ZXJzZShlbCwgaGlnaHRsaWdodFRleHROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSwgVEVYVF9OT0RFX1RZUEUgPSAzO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGUgPSBlbC5jaGlsZE5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2RlLm5vZGVUeXBlID09PSBURVhUX05PREVfVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSBoaWdodGxpZ2h0VGV4dE5vZGUoY2hpbGROb2RlKSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhdmVyc2UoY2hpbGROb2RlLCBoaWdodGxpZ2h0VGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRSZWdleChwYXR0ZXJucywgY2FzZVNlbnNpdGl2ZSwgd29yZHNPbmx5KSB7XG4gICAgICAgICAgICB2YXIgZXNjYXBlZFBhdHRlcm5zID0gW10sIHJlZ2V4U3RyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdHRlcm5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXNjYXBlZFBhdHRlcm5zLnB1c2goXy5lc2NhcGVSZWdFeENoYXJzKHBhdHRlcm5zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdleFN0ciA9IHdvcmRzT25seSA/IFwiXFxcXGIoXCIgKyBlc2NhcGVkUGF0dGVybnMuam9pbihcInxcIikgKyBcIilcXFxcYlwiIDogXCIoXCIgKyBlc2NhcGVkUGF0dGVybnMuam9pbihcInxcIikgKyBcIilcIjtcbiAgICAgICAgICAgIHJldHVybiBjYXNlU2Vuc2l0aXZlID8gbmV3IFJlZ0V4cChyZWdleFN0cikgOiBuZXcgUmVnRXhwKHJlZ2V4U3RyLCBcImlcIik7XG4gICAgICAgIH1cbiAgICB9KHdpbmRvdy5kb2N1bWVudCk7XG4gICAgdmFyIElucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3BlY2lhbEtleUNvZGVNYXA7XG4gICAgICAgIHNwZWNpYWxLZXlDb2RlTWFwID0ge1xuICAgICAgICAgICAgOTogXCJ0YWJcIixcbiAgICAgICAgICAgIDI3OiBcImVzY1wiLFxuICAgICAgICAgICAgMzc6IFwibGVmdFwiLFxuICAgICAgICAgICAgMzk6IFwicmlnaHRcIixcbiAgICAgICAgICAgIDEzOiBcImVudGVyXCIsXG4gICAgICAgICAgICAzODogXCJ1cFwiLFxuICAgICAgICAgICAgNDA6IFwiZG93blwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIElucHV0KG8sIHd3dykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiaW5wdXQgaXMgbWlzc2luZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJGhpbnQgPSAkKG8uaGludCk7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dCA9ICQoby5pbnB1dCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQgPSB0aGlzLmhhc0ZvY3VzKCkgPyB0aGlzLnF1ZXJ5IDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyID0gYnVpbGRPdmVyZmxvd0hlbHBlcih0aGlzLiRpbnB1dCk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAodGhpcy4kaGludC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpbnQgPSB0aGlzLmdldEhpbnQgPSB0aGlzLmNsZWFySGludCA9IHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkID0gXy5ub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIElucHV0Lm5vcm1hbGl6ZVF1ZXJ5ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gXy50b1N0cihzdHIpLnJlcGxhY2UoL15cXHMqL2csIFwiXCIpLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKElucHV0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb25CbHVyOiBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJibHVycmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkZvY3VzOiBmdW5jdGlvbiBvbkZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlXaGVuRm9jdXNlZCA9IHRoaXMucXVlcnk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25LZXlkb3duOiBmdW5jdGlvbiBvbktleWRvd24oJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5TmFtZSA9IHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5TmFtZSAmJiB0aGlzLl9zaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoa2V5TmFtZSArIFwiS2V5ZWRcIiwgJGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25JbnB1dDogZnVuY3Rpb24gb25JbnB1dCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRRdWVyeSh0aGlzLmdldElucHV0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckhpbnRJZkludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX21hbmFnZVByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiBtYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Nob3VsZFRyaWdnZXI6IGZ1bmN0aW9uIHNob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlcjtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0YWJcIjpcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jaGVja0xhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBjaGVja0xhbmd1YWdlRGlyZWN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAodGhpcy4kaW5wdXQuY3NzKFwiZGlyZWN0aW9uXCIpIHx8IFwibHRyXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQuYXR0cihcImRpclwiLCBkaXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJsYW5nRGlyQ2hhbmdlZFwiLCBkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHZhbCwgc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZUVxdWl2YWxlbnQsIGhhc0RpZmZlcmVudFdoaXRlc3BhY2U7XG4gICAgICAgICAgICAgICAgYXJlRXF1aXZhbGVudCA9IGFyZVF1ZXJpZXNFcXVpdmFsZW50KHZhbCwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSA9IGFyZUVxdWl2YWxlbnQgPyB0aGlzLnF1ZXJ5Lmxlbmd0aCAhPT0gdmFsLmxlbmd0aCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKCFzaWxlbnQgJiYgIWFyZUVxdWl2YWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicXVlcnlDaGFuZ2VkXCIsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNpbGVudCAmJiBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcIndoaXRlc3BhY2VDaGFuZ2VkXCIsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIG9uQmx1ciwgb25Gb2N1cywgb25LZXlkb3duLCBvbklucHV0O1xuICAgICAgICAgICAgICAgIG9uQmx1ciA9IF8uYmluZCh0aGlzLl9vbkJsdXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uRm9jdXMgPSBfLmJpbmQodGhpcy5fb25Gb2N1cywgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25LZXlkb3duID0gXy5iaW5kKHRoaXMuX29uS2V5ZG93biwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25JbnB1dCA9IF8uYmluZCh0aGlzLl9vbklucHV0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImJsdXIudHRcIiwgb25CbHVyKS5vbihcImZvY3VzLnR0XCIsIG9uRm9jdXMpLm9uKFwia2V5ZG93bi50dFwiLCBvbktleWRvd24pO1xuICAgICAgICAgICAgICAgIGlmICghXy5pc01zaWUoKSB8fCBfLmlzTXNpZSgpID4gOSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImlucHV0LnR0XCIsIG9uSW5wdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwia2V5ZG93bi50dCBrZXlwcmVzcy50dCBjdXQudHQgcGFzdGUudHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoXy5iaW5kKHRoYXQuX29uSW5wdXQsIHRoYXQsICRlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LmJsdXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYW5nRGlyOiBmdW5jdGlvbiBnZXRMYW5nRGlyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRRdWVyeTogZnVuY3Rpb24gZ2V0UXVlcnkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkgfHwgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkodmFsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRRdWVyeSh2YWwsIHNpbGVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXM6IGZ1bmN0aW9uIGhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5ICE9PSB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckhpbnRJZkludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiByZXNldElucHV0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEhpbnQ6IGZ1bmN0aW9uIGdldEhpbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhpbnQudmFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGludDogZnVuY3Rpb24gc2V0SGludCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQudmFsKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhpbnQ6IGZ1bmN0aW9uIGNsZWFySGludCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpbnQoXCJcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIaW50SWZJbnZhbGlkOiBmdW5jdGlvbiBjbGVhckhpbnRJZkludmFsaWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCwgaGludCwgdmFsSXNQcmVmaXhPZkhpbnQsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaGludCA9IHRoaXMuZ2V0SGludCgpO1xuICAgICAgICAgICAgICAgIHZhbElzUHJlZml4T2ZIaW50ID0gdmFsICE9PSBoaW50ICYmIGhpbnQuaW5kZXhPZih2YWwpID09PSAwO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB2YWwgIT09IFwiXCIgJiYgdmFsSXNQcmVmaXhPZkhpbnQgJiYgIXRoaXMuaGFzT3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICAhaXNWYWxpZCAmJiB0aGlzLmNsZWFySGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0ZvY3VzOiBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5wdXQuaXMoXCI6Zm9jdXNcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzT3ZlcmZsb3c6IGZ1bmN0aW9uIGhhc092ZXJmbG93KCkge1xuICAgICAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gdGhpcy4kaW5wdXQud2lkdGgoKSAtIDI7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIudGV4dCh0aGlzLmdldElucHV0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG92ZXJmbG93SGVscGVyLndpZHRoKCkgPj0gY29uc3RyYWludDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0N1cnNvckF0RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVMZW5ndGgsIHNlbGVjdGlvblN0YXJ0LCByYW5nZTtcbiAgICAgICAgICAgICAgICB2YWx1ZUxlbmd0aCA9IHRoaXMuJGlucHV0LnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHRoaXMuJGlucHV0WzBdLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKHNlbGVjdGlvblN0YXJ0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uU3RhcnQgPT09IHZhbHVlTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCAtdmFsdWVMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVMZW5ndGggPT09IHJhbmdlLnRleHQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50ID0gdGhpcy4kaW5wdXQgPSB0aGlzLiRvdmVyZmxvd0hlbHBlciA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBJbnB1dDtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRPdmVyZmxvd0hlbHBlcigkaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiAkKCc8cHJlIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvcHJlPicpLmNzcyh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6IFwicHJlXCIsXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogJGlucHV0LmNzcyhcImZvbnQtZmFtaWx5XCIpLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAkaW5wdXQuY3NzKFwiZm9udC1zaXplXCIpLFxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJGlucHV0LmNzcyhcImZvbnQtc3R5bGVcIiksXG4gICAgICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICRpbnB1dC5jc3MoXCJmb250LXZhcmlhbnRcIiksXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJGlucHV0LmNzcyhcImZvbnQtd2VpZ2h0XCIpLFxuICAgICAgICAgICAgICAgIHdvcmRTcGFjaW5nOiAkaW5wdXQuY3NzKFwid29yZC1zcGFjaW5nXCIpLFxuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICRpbnB1dC5jc3MoXCJsZXR0ZXItc3BhY2luZ1wiKSxcbiAgICAgICAgICAgICAgICB0ZXh0SW5kZW50OiAkaW5wdXQuY3NzKFwidGV4dC1pbmRlbnRcIiksXG4gICAgICAgICAgICAgICAgdGV4dFJlbmRlcmluZzogJGlucHV0LmNzcyhcInRleHQtcmVuZGVyaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICRpbnB1dC5jc3MoXCJ0ZXh0LXRyYW5zZm9ybVwiKVxuICAgICAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcmVRdWVyaWVzRXF1aXZhbGVudChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXQubm9ybWFsaXplUXVlcnkoYSkgPT09IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdpdGhNb2RpZmllcigkZSkge1xuICAgICAgICAgICAgcmV0dXJuICRlLmFsdEtleSB8fCAkZS5jdHJsS2V5IHx8ICRlLm1ldGFLZXkgfHwgJGUuc2hpZnRLZXk7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIERhdGFzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBrZXlzLCBuYW1lR2VuZXJhdG9yO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgdmFsOiBcInR0LXNlbGVjdGFibGUtZGlzcGxheVwiLFxuICAgICAgICAgICAgb2JqOiBcInR0LXNlbGVjdGFibGUtb2JqZWN0XCJcbiAgICAgICAgfTtcbiAgICAgICAgbmFtZUdlbmVyYXRvciA9IF8uZ2V0SWRHZW5lcmF0b3IoKTtcbiAgICAgICAgZnVuY3Rpb24gRGF0YXNldChvLCB3d3cpIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgby50ZW1wbGF0ZXMgPSBvLnRlbXBsYXRlcyB8fCB7fTtcbiAgICAgICAgICAgIG8udGVtcGxhdGVzLm5vdEZvdW5kID0gby50ZW1wbGF0ZXMubm90Rm91bmQgfHwgby50ZW1wbGF0ZXMuZW1wdHk7XG4gICAgICAgICAgICBpZiAoIW8uc291cmNlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3Npbmcgc291cmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8ubmFtZSAmJiAhaXNWYWxpZE5hbWUoby5uYW1lKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJpbnZhbGlkIGRhdGFzZXQgbmFtZTogXCIgKyBvLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgPSAhIW8uaGlnaGxpZ2h0O1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gby5uYW1lIHx8IG5hbWVHZW5lcmF0b3IoKTtcbiAgICAgICAgICAgIHRoaXMubGltaXQgPSBvLmxpbWl0IHx8IDU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlGbiA9IGdldERpc3BsYXlGbihvLmRpc3BsYXkgfHwgby5kaXNwbGF5S2V5KTtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVzID0gZ2V0VGVtcGxhdGVzKG8udGVtcGxhdGVzLCB0aGlzLmRpc3BsYXlGbik7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IG8uc291cmNlLl9fdHRBZGFwdGVyID8gby5zb3VyY2UuX190dEFkYXB0ZXIoKSA6IG8uc291cmNlO1xuICAgICAgICAgICAgdGhpcy5hc3luYyA9IF8uaXNVbmRlZmluZWQoby5hc3luYykgPyB0aGlzLnNvdXJjZS5sZW5ndGggPiAyIDogISFvLmFzeW5jO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKG8ubm9kZSkuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmRhdGFzZXQpLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5kYXRhc2V0ICsgXCItXCIgKyB0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIERhdGFzZXQuZXh0cmFjdERhdGEgPSBmdW5jdGlvbiBleHRyYWN0RGF0YShlbCkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgaWYgKCRlbC5kYXRhKGtleXMub2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbDogJGVsLmRhdGEoa2V5cy52YWwpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iajogJGVsLmRhdGEoa2V5cy5vYmopIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oRGF0YXNldC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX292ZXJ3cml0ZTogZnVuY3Rpb24gb3ZlcndyaXRlKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hc3luYyAmJiB0aGlzLnRlbXBsYXRlcy5wZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclBlbmRpbmcocXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuYXN5bmMgJiYgdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQocXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VtcHR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInJlbmRlcmVkXCIsIHRoaXMubmFtZSwgc3VnZ2VzdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuJGxhc3RTdWdnZXN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmRTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy4kbGFzdFN1Z2dlc3Rpb24ubGVuZ3RoICYmIHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicmVuZGVyZWRcIiwgdGhpcy5uYW1lLCBzdWdnZXN0aW9ucywgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiByZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGZyYWdtZW50O1xuICAgICAgICAgICAgICAgICRmcmFnbWVudCA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICRmcmFnbWVudC5jaGlsZHJlbigpLmxhc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5odG1sKCRmcmFnbWVudCkucHJlcGVuZCh0aGlzLl9nZXRIZWFkZXIocXVlcnksIHN1Z2dlc3Rpb25zKSkuYXBwZW5kKHRoaXMuX2dldEZvb3RlcihxdWVyeSwgc3VnZ2VzdGlvbnMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYXBwZW5kU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIGFwcGVuZFN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkZnJhZ21lbnQsICRsYXN0U3VnZ2VzdGlvbjtcbiAgICAgICAgICAgICAgICAkZnJhZ21lbnQgPSB0aGlzLl9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgJGxhc3RTdWdnZXN0aW9uID0gJGZyYWdtZW50LmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uLmFmdGVyKCRmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkbGFzdFN1Z2dlc3Rpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlclBlbmRpbmc6IGZ1bmN0aW9uIHJlbmRlclBlbmRpbmcocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcy5wZW5kaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSAmJiB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlck5vdEZvdW5kOiBmdW5jdGlvbiByZW5kZXJOb3RGb3VuZChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSAmJiB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2VtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudDogZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGZyYWdtZW50O1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgICAgIF8uZWFjaChzdWdnZXN0aW9ucywgZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbk5vZGUoc3VnZ2VzdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsLCBjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhhdC5faW5qZWN0UXVlcnkocXVlcnksIHN1Z2dlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAkZWwgPSAkKHRoYXQudGVtcGxhdGVzLnN1Z2dlc3Rpb24oY29udGV4dCkpLmRhdGEoa2V5cy5vYmosIHN1Z2dlc3Rpb24pLmRhdGEoa2V5cy52YWwsIHRoYXQuZGlzcGxheUZuKHN1Z2dlc3Rpb24pKS5hZGRDbGFzcyh0aGF0LmNsYXNzZXMuc3VnZ2VzdGlvbiArIFwiIFwiICsgdGhhdC5jbGFzc2VzLnNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCgkZWxbMF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ICYmIGhpZ2hsaWdodCh7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5jbGFzc2VzLmhpZ2hsaWdodCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoZnJhZ21lbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRGb290ZXI6IGZ1bmN0aW9uIGdldEZvb3RlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMuZm9vdGVyID8gdGhpcy50ZW1wbGF0ZXMuZm9vdGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0SGVhZGVyOiBmdW5jdGlvbiBnZXRIZWFkZXIocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzLmhlYWRlciA/IHRoaXMudGVtcGxhdGVzLmhlYWRlcih7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHN1Z2dlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Jlc2V0TGFzdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIHJlc2V0TGFzdFN1Z2dlc3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2luamVjdFF1ZXJ5OiBmdW5jdGlvbiBpbmplY3RRdWVyeShxdWVyeSwgb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3Qob2JqKSA/IF8ubWl4aW4oe1xuICAgICAgICAgICAgICAgICAgICBfcXVlcnk6IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSwgb2JqKSA6IG9iajtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgY2FuY2VsZWQgPSBmYWxzZSwgc3luY0NhbGxlZCA9IGZhbHNlLCByZW5kZXJlZCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCA9ICQubm9vcDtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hc3luYyAmJiB0aGF0LnRyaWdnZXIoXCJhc3luY0NhbmNlbGVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlKHF1ZXJ5LCBzeW5jLCBhc3luYyk7XG4gICAgICAgICAgICAgICAgIXN5bmNDYWxsZWQgJiYgc3luYyhbXSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3luYyhzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3luY0NhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN5bmNDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IChzdWdnZXN0aW9ucyB8fCBbXSkuc2xpY2UoMCwgdGhhdC5saW1pdCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkID0gc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vdmVyd3JpdGUocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkIDwgdGhhdC5saW1pdCAmJiB0aGF0LmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJhc3luY1JlcXVlc3RlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYXN5bmMoc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZCAmJiByZW5kZXJlZCA8IHRoYXQubGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsID0gJC5ub29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWQgKz0gc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fYXBwZW5kKHF1ZXJ5LCBzdWdnZXN0aW9ucy5zbGljZSgwLCB0aGF0LmxpbWl0IC0gcmVuZGVyZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYXN5bmMgJiYgdGhhdC50cmlnZ2VyKFwiYXN5bmNSZWNlaXZlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsOiAkLm5vb3AsXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImNsZWFyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZWwuaXMoXCI6ZW1wdHlcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBEYXRhc2V0O1xuICAgICAgICBmdW5jdGlvbiBnZXREaXNwbGF5Rm4oZGlzcGxheSkge1xuICAgICAgICAgICAgZGlzcGxheSA9IGRpc3BsYXkgfHwgXy5zdHJpbmdpZnk7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGRpc3BsYXkpID8gZGlzcGxheSA6IGRpc3BsYXlGbjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRpc3BsYXlGbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2Rpc3BsYXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlcyh0ZW1wbGF0ZXMsIGRpc3BsYXlGbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBub3RGb3VuZDogdGVtcGxhdGVzLm5vdEZvdW5kICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMubm90Rm91bmQpLFxuICAgICAgICAgICAgICAgIHBlbmRpbmc6IHRlbXBsYXRlcy5wZW5kaW5nICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMucGVuZGluZyksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB0ZW1wbGF0ZXMuaGVhZGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuaGVhZGVyKSxcbiAgICAgICAgICAgICAgICBmb290ZXI6IHRlbXBsYXRlcy5mb290ZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5mb290ZXIpLFxuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb246IHRlbXBsYXRlcy5zdWdnZXN0aW9uIHx8IHN1Z2dlc3Rpb25UZW1wbGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Z2dlc3Rpb25UZW1wbGF0ZShjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8ZGl2PlwiKS50ZXh0KGRpc3BsYXlGbihjb250ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZE5hbWUoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gL15bX2EtekEtWjAtOS1dKyQvLnRlc3Qoc3RyKTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gTWVudShvLCB3d3cpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibm9kZSBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJG5vZGUgPSAkKG8ubm9kZSk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldHMgPSBfLm1hcChvLmRhdGFzZXRzLCBpbml0aWFsaXplRGF0YXNldCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplRGF0YXNldChvRGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhhdC4kbm9kZS5maW5kKG9EYXRhc2V0Lm5vZGUpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgb0RhdGFzZXQubm9kZSA9IG5vZGUubGVuZ3RoID8gbm9kZSA6ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LiRub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGFzZXQob0RhdGFzZXQsIHd3dyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihNZW51LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb25TZWxlY3RhYmxlQ2xpY2s6IGZ1bmN0aW9uIG9uU2VsZWN0YWJsZUNsaWNrKCRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwic2VsZWN0YWJsZUNsaWNrZWRcIiwgJCgkZS5jdXJyZW50VGFyZ2V0KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQodHlwZSwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHksIHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZGF0YXNldFJlbmRlcmVkXCIsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQ2xlYXJlZDogZnVuY3Rpb24gb25DbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5LCB0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImRhdGFzZXRDbGVhcmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9wcm9wYWdhdGU6IGZ1bmN0aW9uIHByb3BhZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYWxsRGF0YXNldHNFbXB0eTogZnVuY3Rpb24gYWxsRGF0YXNldHNFbXB0eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5ldmVyeSh0aGlzLmRhdGFzZXRzLCBpc0RhdGFzZXRFbXB0eSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNEYXRhc2V0RW1wdHkoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YXNldC5pc0VtcHR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRTZWxlY3RhYmxlczogZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG5vZGUuZmluZCh0aGlzLnNlbGVjdG9ycy5zZWxlY3RhYmxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBfcmVtb3ZlQ3Vyc29yKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlICYmICRzZWxlY3RhYmxlLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3Nlcy5jdXJzb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lbnN1cmVWaXNpYmxlOiBmdW5jdGlvbiBlbnN1cmVWaXNpYmxlKCRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBlbFRvcCwgZWxCb3R0b20sIG5vZGVTY3JvbGxUb3AsIG5vZGVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZWxUb3AgPSAkZWwucG9zaXRpb24oKS50b3A7XG4gICAgICAgICAgICAgICAgZWxCb3R0b20gPSBlbFRvcCArICRlbC5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgICAgICBub2RlU2Nyb2xsVG9wID0gdGhpcy4kbm9kZS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICBub2RlSGVpZ2h0ID0gdGhpcy4kbm9kZS5oZWlnaHQoKSArIHBhcnNlSW50KHRoaXMuJG5vZGUuY3NzKFwicGFkZGluZ1RvcFwiKSwgMTApICsgcGFyc2VJbnQodGhpcy4kbm9kZS5jc3MoXCJwYWRkaW5nQm90dG9tXCIpLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsVG9wIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnNjcm9sbFRvcChub2RlU2Nyb2xsVG9wICsgZWxUb3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZUhlaWdodCA8IGVsQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuc2Nyb2xsVG9wKG5vZGVTY3JvbGxUb3AgKyAoZWxCb3R0b20gLSBub2RlSGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgb25TZWxlY3RhYmxlQ2xpY2s7XG4gICAgICAgICAgICAgICAgb25TZWxlY3RhYmxlQ2xpY2sgPSBfLmJpbmQodGhpcy5fb25TZWxlY3RhYmxlQ2xpY2ssIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUub24oXCJjbGljay50dFwiLCB0aGlzLnNlbGVjdG9ycy5zZWxlY3RhYmxlLCBvblNlbGVjdGFibGVDbGljayk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5vblN5bmMoXCJhc3luY1JlcXVlc3RlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcImFzeW5jQ2FuY2VsZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJhc3luY1JlY2VpdmVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwicmVuZGVyZWRcIiwgdGhhdC5fb25SZW5kZXJlZCwgdGhhdCkub25TeW5jKFwiY2xlYXJlZFwiLCB0aGF0Ll9vbkNsZWFyZWQsIHRoYXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRub2RlLmhhc0NsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hdHRyKFwiZGlyXCIsIGRpcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3I6IGZ1bmN0aW9uIHNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlcywgJG9sZEN1cnNvciwgb2xkSW5kZXgsIG5ld0luZGV4O1xuICAgICAgICAgICAgICAgICRvbGRDdXJzb3IgPSB0aGlzLmdldEFjdGl2ZVNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZXMgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpO1xuICAgICAgICAgICAgICAgIG9sZEluZGV4ID0gJG9sZEN1cnNvciA/ICRzZWxlY3RhYmxlcy5pbmRleCgkb2xkQ3Vyc29yKSA6IC0xO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gb2xkSW5kZXggKyBkZWx0YTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IChuZXdJbmRleCArIDEpICUgKCRzZWxlY3RhYmxlcy5sZW5ndGggKyAxKSAtIDE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCA8IC0xID8gJHNlbGVjdGFibGVzLmxlbmd0aCAtIDEgOiBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5kZXggPT09IC0xID8gbnVsbCA6ICRzZWxlY3RhYmxlcy5lcShuZXdJbmRleCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q3Vyc29yOiBmdW5jdGlvbiBzZXRDdXJzb3IoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSAkc2VsZWN0YWJsZSAmJiAkc2VsZWN0YWJsZS5maXJzdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5jdXJzb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVWaXNpYmxlKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0YWJsZURhdGE6IGZ1bmN0aW9uIGdldFNlbGVjdGFibGVEYXRhKCRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWwgJiYgJGVsLmxlbmd0aCA/IERhdGFzZXQuZXh0cmFjdERhdGEoJGVsKSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QWN0aXZlU2VsZWN0YWJsZTogZnVuY3Rpb24gZ2V0QWN0aXZlU2VsZWN0YWJsZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpLmZpbHRlcih0aGlzLnNlbGVjdG9ycy5jdXJzb3IpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzZWxlY3RhYmxlLmxlbmd0aCA/ICRzZWxlY3RhYmxlIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUb3BTZWxlY3RhYmxlOiBmdW5jdGlvbiBnZXRUb3BTZWxlY3RhYmxlKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCkuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNlbGVjdGFibGUubGVuZ3RoID8gJHNlbGVjdGFibGUgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWRVcGRhdGUgPSBxdWVyeSAhPT0gdGhpcy5xdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCB1cGRhdGVEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRVcGRhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQudXBkYXRlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBjbGVhckRhdGFzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckRhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZSA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZGVzdHJveURhdGFzZXQpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3lEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIE1lbnU7XG4gICAgfSgpO1xuICAgIHZhciBEZWZhdWx0TWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHMgPSBNZW51LnByb3RvdHlwZTtcbiAgICAgICAgZnVuY3Rpb24gRGVmYXVsdE1lbnUoKSB7XG4gICAgICAgICAgICBNZW51LmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihEZWZhdWx0TWVudS5wcm90b3R5cGUsIE1lbnUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgICF0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLm9wZW4uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLmNsb3NlLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4oKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzLl9vblJlbmRlcmVkLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQ2xlYXJlZDogZnVuY3Rpb24gb25DbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcy5fb25DbGVhcmVkLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKGRpcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuY3NzKGRpciA9PT0gXCJsdHJcIiA/IHRoaXMuY3NzLmx0ciA6IHRoaXMuY3NzLnJ0bCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2V0TGFuZ3VhZ2VEaXJlY3Rpb24uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaGlkZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmhpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBEZWZhdWx0TWVudTtcbiAgICB9KCk7XG4gICAgdmFyIFR5cGVhaGVhZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gVHlwZWFoZWFkKG8sIHd3dykge1xuICAgICAgICAgICAgdmFyIG9uRm9jdXNlZCwgb25CbHVycmVkLCBvbkVudGVyS2V5ZWQsIG9uVGFiS2V5ZWQsIG9uRXNjS2V5ZWQsIG9uVXBLZXllZCwgb25Eb3duS2V5ZWQsIG9uTGVmdEtleWVkLCBvblJpZ2h0S2V5ZWQsIG9uUXVlcnlDaGFuZ2VkLCBvbldoaXRlc3BhY2VDaGFuZ2VkO1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBpbnB1dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5tZW51KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgbWVudVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5ldmVudEJ1cykge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIGV2ZW50IGJ1c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMgPSBvLmV2ZW50QnVzO1xuICAgICAgICAgICAgdGhpcy5taW5MZW5ndGggPSBfLmlzTnVtYmVyKG8ubWluTGVuZ3RoKSA/IG8ubWluTGVuZ3RoIDogMTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBvLmlucHV0O1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gby5tZW51O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lmhhc0ZvY3VzKCkgJiYgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kaXIgPSB0aGlzLmlucHV0LmdldExhbmdEaXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2hhY2tzKCk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuYmluZCgpLm9uU3luYyhcInNlbGVjdGFibGVDbGlja2VkXCIsIHRoaXMuX29uU2VsZWN0YWJsZUNsaWNrZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jUmVxdWVzdGVkXCIsIHRoaXMuX29uQXN5bmNSZXF1ZXN0ZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jQ2FuY2VsZWRcIiwgdGhpcy5fb25Bc3luY0NhbmNlbGVkLCB0aGlzKS5vblN5bmMoXCJhc3luY1JlY2VpdmVkXCIsIHRoaXMuX29uQXN5bmNSZWNlaXZlZCwgdGhpcykub25TeW5jKFwiZGF0YXNldFJlbmRlcmVkXCIsIHRoaXMuX29uRGF0YXNldFJlbmRlcmVkLCB0aGlzKS5vblN5bmMoXCJkYXRhc2V0Q2xlYXJlZFwiLCB0aGlzLl9vbkRhdGFzZXRDbGVhcmVkLCB0aGlzKTtcbiAgICAgICAgICAgIG9uRm9jdXNlZCA9IGModGhpcywgXCJhY3RpdmF0ZVwiLCBcIm9wZW5cIiwgXCJfb25Gb2N1c2VkXCIpO1xuICAgICAgICAgICAgb25CbHVycmVkID0gYyh0aGlzLCBcImRlYWN0aXZhdGVcIiwgXCJfb25CbHVycmVkXCIpO1xuICAgICAgICAgICAgb25FbnRlcktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uRW50ZXJLZXllZFwiKTtcbiAgICAgICAgICAgIG9uVGFiS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25UYWJLZXllZFwiKTtcbiAgICAgICAgICAgIG9uRXNjS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJfb25Fc2NLZXllZFwiKTtcbiAgICAgICAgICAgIG9uVXBLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIm9wZW5cIiwgXCJfb25VcEtleWVkXCIpO1xuICAgICAgICAgICAgb25Eb3duS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJvcGVuXCIsIFwiX29uRG93bktleWVkXCIpO1xuICAgICAgICAgICAgb25MZWZ0S2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25MZWZ0S2V5ZWRcIik7XG4gICAgICAgICAgICBvblJpZ2h0S2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25SaWdodEtleWVkXCIpO1xuICAgICAgICAgICAgb25RdWVyeUNoYW5nZWQgPSBjKHRoaXMsIFwiX29wZW5JZkFjdGl2ZVwiLCBcIl9vblF1ZXJ5Q2hhbmdlZFwiKTtcbiAgICAgICAgICAgIG9uV2hpdGVzcGFjZUNoYW5nZWQgPSBjKHRoaXMsIFwiX29wZW5JZkFjdGl2ZVwiLCBcIl9vbldoaXRlc3BhY2VDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5iaW5kKCkub25TeW5jKFwiZm9jdXNlZFwiLCBvbkZvY3VzZWQsIHRoaXMpLm9uU3luYyhcImJsdXJyZWRcIiwgb25CbHVycmVkLCB0aGlzKS5vblN5bmMoXCJlbnRlcktleWVkXCIsIG9uRW50ZXJLZXllZCwgdGhpcykub25TeW5jKFwidGFiS2V5ZWRcIiwgb25UYWJLZXllZCwgdGhpcykub25TeW5jKFwiZXNjS2V5ZWRcIiwgb25Fc2NLZXllZCwgdGhpcykub25TeW5jKFwidXBLZXllZFwiLCBvblVwS2V5ZWQsIHRoaXMpLm9uU3luYyhcImRvd25LZXllZFwiLCBvbkRvd25LZXllZCwgdGhpcykub25TeW5jKFwibGVmdEtleWVkXCIsIG9uTGVmdEtleWVkLCB0aGlzKS5vblN5bmMoXCJyaWdodEtleWVkXCIsIG9uUmlnaHRLZXllZCwgdGhpcykub25TeW5jKFwicXVlcnlDaGFuZ2VkXCIsIG9uUXVlcnlDaGFuZ2VkLCB0aGlzKS5vblN5bmMoXCJ3aGl0ZXNwYWNlQ2hhbmdlZFwiLCBvbldoaXRlc3BhY2VDaGFuZ2VkLCB0aGlzKS5vblN5bmMoXCJsYW5nRGlyQ2hhbmdlZFwiLCB0aGlzLl9vbkxhbmdEaXJDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFR5cGVhaGVhZC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9oYWNrczogZnVuY3Rpb24gaGFja3MoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbnB1dCwgJG1lbnU7XG4gICAgICAgICAgICAgICAgJGlucHV0ID0gdGhpcy5pbnB1dC4kaW5wdXQgfHwgJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgICRtZW51ID0gdGhpcy5tZW51LiRub2RlIHx8ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICAkaW5wdXQub24oXCJibHVyLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUsIGlzQWN0aXZlLCBoYXNBY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gJG1lbnUuaXMoYWN0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzQWN0aXZlID0gJG1lbnUuaGFzKGFjdGl2ZSkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNNc2llKCkgJiYgKGlzQWN0aXZlIHx8IGhhc0FjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRtZW51Lm9uKFwibW91c2Vkb3duLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uU2VsZWN0YWJsZUNsaWNrZWQ6IGZ1bmN0aW9uIG9uU2VsZWN0YWJsZUNsaWNrZWQodHlwZSwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJGVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25EYXRhc2V0Q2xlYXJlZDogZnVuY3Rpb24gb25EYXRhc2V0Q2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRGF0YXNldFJlbmRlcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRSZW5kZXJlZCh0eXBlLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwicmVuZGVyXCIsIHN1Z2dlc3Rpb25zLCBhc3luYywgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNSZXF1ZXN0ZWQ6IGZ1bmN0aW9uIG9uQXN5bmNSZXF1ZXN0ZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY3JlcXVlc3RcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jQ2FuY2VsZWQ6IGZ1bmN0aW9uIG9uQXN5bmNDYW5jZWxlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jY2FuY2VsXCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY1JlY2VpdmVkOiBmdW5jdGlvbiBvbkFzeW5jUmVjZWl2ZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY3JlY2VpdmVcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkZvY3VzZWQ6IGZ1bmN0aW9uIG9uRm9jdXNlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5MZW5ndGhNZXQoKSAmJiB0aGlzLm1lbnUudXBkYXRlKHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQmx1cnJlZDogZnVuY3Rpb24gb25CbHVycmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Lmhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY2hhbmdlXCIsIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkVudGVyS2V5ZWQ6IGZ1bmN0aW9uIG9uRW50ZXJLZXllZCh0eXBlLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25UYWJLZXllZDogZnVuY3Rpb24gb25UYWJLZXllZCh0eXBlLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Fc2NLZXllZDogZnVuY3Rpb24gb25Fc2NLZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uVXBLZXllZDogZnVuY3Rpb24gb25VcEtleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcigtMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRG93bktleWVkOiBmdW5jdGlvbiBvbkRvd25LZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoKzEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkxlZnRLZXllZDogZnVuY3Rpb24gb25MZWZ0S2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSBcInJ0bFwiICYmIHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SaWdodEtleWVkOiBmdW5jdGlvbiBvblJpZ2h0S2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSBcImx0clwiICYmIHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25RdWVyeUNoYW5nZWQ6IGZ1bmN0aW9uIG9uUXVlcnlDaGFuZ2VkKGUsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluTGVuZ3RoTWV0KHF1ZXJ5KSA/IHRoaXMubWVudS51cGRhdGUocXVlcnkpIDogdGhpcy5tZW51LmVtcHR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uV2hpdGVzcGFjZUNoYW5nZWQ6IGZ1bmN0aW9uIG9uV2hpdGVzcGFjZUNoYW5nZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkxhbmdEaXJDaGFuZ2VkOiBmdW5jdGlvbiBvbkxhbmdEaXJDaGFuZ2VkKGUsIGRpcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29wZW5JZkFjdGl2ZTogZnVuY3Rpb24gb3BlbklmQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUoKSAmJiB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbWluTGVuZ3RoTWV0OiBmdW5jdGlvbiBtaW5MZW5ndGhNZXQocXVlcnkpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IF8uaXNTdHJpbmcocXVlcnkpID8gcXVlcnkgOiB0aGlzLmlucHV0LmdldFF1ZXJ5KCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF91cGRhdGVIaW50OiBmdW5jdGlvbiB1cGRhdGVIaW50KCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSwgZGF0YSwgdmFsLCBxdWVyeSwgZXNjYXBlZFF1ZXJ5LCBmcm9udE1hdGNoUmVnRXgsIG1hdGNoO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmlucHV0LmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhXy5pc0JsYW5rU3RyaW5nKHZhbCkgJiYgIXRoaXMuaW5wdXQuaGFzT3ZlcmZsb3coKSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWRRdWVyeSA9IF8uZXNjYXBlUmVnRXhDaGFycyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIGZyb250TWF0Y2hSZWdFeCA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBlc2NhcGVkUXVlcnkgKyBcIikoLiskKVwiLCBcImlcIik7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZnJvbnRNYXRjaFJlZ0V4LmV4ZWMoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCAmJiB0aGlzLmlucHV0LnNldEhpbnQodmFsICsgbWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VuYWJsZWQoKSB8fCB0aGlzLmV2ZW50QnVzLmJlZm9yZShcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJpZGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImlkbGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51LmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbigpICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcIm9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJvcGVuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImNsb3NlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsOiBmdW5jdGlvbiBzZXRWYWwodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShfLnRvU3RyKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFZhbDogZnVuY3Rpb24gZ2V0VmFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwic2VsZWN0XCIsIGRhdGEub2JqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KGRhdGEudmFsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwic2VsZWN0XCIsIGRhdGEub2JqKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5LCBkYXRhLCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBkYXRhICYmIHF1ZXJ5ICE9PSBkYXRhLnZhbDtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJhdXRvY29tcGxldGVcIiwgZGF0YS5vYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhdXRvY29tcGxldGVcIiwgZGF0YS5vYmopO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb3IoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnksICRjYW5kaWRhdGUsIGRhdGEsIHBheWxvYWQsIGNhbmNlbE1vdmU7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgJGNhbmRpZGF0ZSA9IHRoaXMubWVudS5zZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcihkZWx0YSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICBwYXlsb2FkID0gZGF0YSA/IGRhdGEub2JqIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjYW5jZWxNb3ZlID0gdGhpcy5fbWluTGVuZ3RoTWV0KCkgJiYgdGhpcy5tZW51LnVwZGF0ZShxdWVyeSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxNb3ZlICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImN1cnNvcmNoYW5nZVwiLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuc2V0Q3Vyc29yKCRjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY3Vyc29yY2hhbmdlXCIsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBUeXBlYWhlYWQ7XG4gICAgICAgIGZ1bmN0aW9uIGMoY3R4KSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBfLmVhY2gobWV0aG9kcywgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHhbbWV0aG9kXS5hcHBseShjdHgsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgb2xkLCBrZXlzLCBtZXRob2RzO1xuICAgICAgICBvbGQgPSAkLmZuLnR5cGVhaGVhZDtcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIHd3dzogXCJ0dC13d3dcIixcbiAgICAgICAgICAgIGF0dHJzOiBcInR0LWF0dHJzXCIsXG4gICAgICAgICAgICB0eXBlYWhlYWQ6IFwidHQtdHlwZWFoZWFkXCJcbiAgICAgICAgfTtcbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUobywgZGF0YXNldHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3d3O1xuICAgICAgICAgICAgICAgIGRhdGFzZXRzID0gXy5pc0FycmF5KGRhdGFzZXRzKSA/IGRhdGFzZXRzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIHd3dyA9IFdXVyhvLmNsYXNzTmFtZXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goYXR0YWNoKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQsICR3cmFwcGVyLCAkaGludCwgJG1lbnUsIGRlZmF1bHRIaW50LCBkZWZhdWx0TWVudSwgZXZlbnRCdXMsIGlucHV0LCBtZW51LCB0eXBlYWhlYWQsIE1lbnVDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGFzZXRzLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlciA9ICQod3d3Lmh0bWwud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICRoaW50ID0gJGVsT3JOdWxsKG8uaGludCk7XG4gICAgICAgICAgICAgICAgICAgICRtZW51ID0gJGVsT3JOdWxsKG8ubWVudSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRIaW50ID0gby5oaW50ICE9PSBmYWxzZSAmJiAhJGhpbnQ7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRNZW51ID0gby5tZW51ICE9PSBmYWxzZSAmJiAhJG1lbnU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRIaW50ICYmICgkaGludCA9IGJ1aWxkSGludEZyb21JbnB1dCgkaW5wdXQsIHd3dykpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TWVudSAmJiAoJG1lbnUgPSAkKHd3dy5odG1sLm1lbnUpLmNzcyh3d3cuY3NzLm1lbnUpKTtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQgJiYgJGhpbnQudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSBwcmVwSW5wdXQoJGlucHV0LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdEhpbnQgfHwgZGVmYXVsdE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmNzcyh3d3cuY3NzLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNzcyhkZWZhdWx0SGludCA/IHd3dy5jc3MuaW5wdXQgOiB3d3cuY3NzLmlucHV0V2l0aE5vSGludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQud3JhcCgkd3JhcHBlcikucGFyZW50KCkucHJlcGVuZChkZWZhdWx0SGludCA/ICRoaW50IDogbnVsbCkuYXBwZW5kKGRlZmF1bHRNZW51ID8gJG1lbnUgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBNZW51Q29uc3RydWN0b3IgPSBkZWZhdWx0TWVudSA/IERlZmF1bHRNZW51IDogTWVudTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICRpbnB1dFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBuZXcgSW5wdXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludDogJGhpbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogJGlucHV0XG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUgPSBuZXcgTWVudUNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6ICRtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IGRhdGFzZXRzXG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZCA9IG5ldyBUeXBlYWhlYWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudTogbWVudSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkxlbmd0aDogby5taW5MZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy53d3csIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMudHlwZWFoZWFkLCB0eXBlYWhlYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5hYmxlZDtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgPSB0LmlzRW5hYmxlZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHQuaXNBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3BlbjtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW4gPSB0LmlzT3BlbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcGVuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdChlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2UsICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQuc2VsZWN0KCRlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUoZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlLCAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0LmF1dG9jb21wbGV0ZSgkZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb2UoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQubW92ZUN1cnNvcihkZWx0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsOiBmdW5jdGlvbiB2YWwobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHQuZ2V0VmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuc2V0VmFsKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odHlwZWFoZWFkLCAkaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0KCRpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4udHlwZWFoZWFkID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4udHlwZWFoZWFkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICAgICAgJC5mbi50eXBlYWhlYWQgPSBvbGQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gdHRFYWNoKCRlbHMsIGZuKSB7XG4gICAgICAgICAgICAkZWxzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIHR5cGVhaGVhZDtcbiAgICAgICAgICAgICAgICAodHlwZWFoZWFkID0gJGlucHV0LmRhdGEoa2V5cy50eXBlYWhlYWQpKSAmJiBmbih0eXBlYWhlYWQsICRpbnB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZEhpbnRGcm9tSW5wdXQoJGlucHV0LCB3d3cpIHtcbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQuY2xvbmUoKS5hZGRDbGFzcyh3d3cuY2xhc3Nlcy5oaW50KS5yZW1vdmVEYXRhKCkuY3NzKHd3dy5jc3MuaGludCkuY3NzKGdldEJhY2tncm91bmRTdHlsZXMoJGlucHV0KSkucHJvcChcInJlYWRvbmx5XCIsIHRydWUpLnJlbW92ZUF0dHIoXCJpZCBuYW1lIHBsYWNlaG9sZGVyIHJlcXVpcmVkXCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJvZmZcIixcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmVwSW5wdXQoJGlucHV0LCB3d3cpIHtcbiAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMuYXR0cnMsIHtcbiAgICAgICAgICAgICAgICBkaXI6ICRpbnB1dC5hdHRyKFwiZGlyXCIpLFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogJGlucHV0LmF0dHIoXCJhdXRvY29tcGxldGVcIiksXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogJGlucHV0LmF0dHIoXCJzcGVsbGNoZWNrXCIpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAkaW5wdXQuYXR0cihcInN0eWxlXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5hZGRDbGFzcyh3d3cuY2xhc3Nlcy5pbnB1dCkuYXR0cih7XG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgISRpbnB1dC5hdHRyKFwiZGlyXCIpICYmICRpbnB1dC5hdHRyKFwiZGlyXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gJGlucHV0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEJhY2tncm91bmRTdHlsZXMoJGVsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdHRhY2htZW50OiAkZWwuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDbGlwOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1jbGlwXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJGVsLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kT3JpZ2luOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1vcmlnaW5cIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1wb3NpdGlvblwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiAkZWwuY3NzKFwiYmFja2dyb3VuZC1yZXBlYXRcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXNpemVcIilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJ0KCRpbnB1dCkge1xuICAgICAgICAgICAgdmFyIHd3dywgJHdyYXBwZXI7XG4gICAgICAgICAgICB3d3cgPSAkaW5wdXQuZGF0YShrZXlzLnd3dyk7XG4gICAgICAgICAgICAkd3JhcHBlciA9ICRpbnB1dC5wYXJlbnQoKS5maWx0ZXIod3d3LnNlbGVjdG9ycy53cmFwcGVyKTtcbiAgICAgICAgICAgIF8uZWFjaCgkaW5wdXQuZGF0YShrZXlzLmF0dHJzKSwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBfLmlzVW5kZWZpbmVkKHZhbCkgPyAkaW5wdXQucmVtb3ZlQXR0cihrZXkpIDogJGlucHV0LmF0dHIoa2V5LCB2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaW5wdXQucmVtb3ZlRGF0YShrZXlzLnR5cGVhaGVhZCkucmVtb3ZlRGF0YShrZXlzLnd3dykucmVtb3ZlRGF0YShrZXlzLmF0dHIpLnJlbW92ZUNsYXNzKHd3dy5jbGFzc2VzLmlucHV0KTtcbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkaW5wdXQuZGV0YWNoKCkuaW5zZXJ0QWZ0ZXIoJHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uICRlbE9yTnVsbChvYmopIHtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkLCAkZWw7XG4gICAgICAgICAgICBpc1ZhbGlkID0gXy5pc0pRdWVyeShvYmopIHx8IF8uaXNFbGVtZW50KG9iaik7XG4gICAgICAgICAgICAkZWwgPSBpc1ZhbGlkID8gJChvYmopLmZpcnN0KCkgOiBbXTtcbiAgICAgICAgICAgIHJldHVybiAkZWwubGVuZ3RoID8gJGVsIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH0pKCk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9jdXJyZW5jeS1zeW1ib2wtdXBkYXRlcic7XHJcbmltcG9ydCBTcGVjaWZpY1ByaWNlTWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL3NwZWNpZmljLXByaWNlLW1hcCc7XHJcbmltcG9ydCBQcmljZVJlZHVjdGlvbk1hbmFnZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9wcmljZS1yZWR1Y3Rpb24tbWFuYWdlcic7XHJcbmltcG9ydCBDb21iaW5hdGlvblNlbGVjdG9yIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL2Zvcm0vY29tYmluYXRpb24tc2VsZWN0b3InO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBDdXN0b21lclNlbGVjdG9yIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL2Zvcm0vY3VzdG9tZXItc2VsZWN0b3InO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFtcclxuICAgICdFdmVudEVtaXR0ZXInLFxyXG4gICAgJ0Rpc2FibGluZ1N3aXRjaCcsXHJcbiAgICAnRGF0ZVJhbmdlJyxcclxuICBdKTtcclxuXHJcbiAgLy8gdGhpcyBoYW5kbGVzIHJldGFpbCBwcmljZSBzeW1ib2xzLCBvdGhlciBwcmljZSBpbnB1dHMgYXJlIGhhbmRsZWQgYnkgUHJpY2VSZWR1Y3Rpb25NYW5hZ2VyXHJcbiAgbmV3IEN1cnJlbmN5U3ltYm9sVXBkYXRlcihcclxuICAgIFNwZWNpZmljUHJpY2VNYXAuY3VycmVuY3lJZCxcclxuICAgICgoc3ltYm9sOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgaWYgKHN5bWJvbCA9PT0gJycpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNwZWNpZmljIFByaWNlXHJcbiAgICAgIGNvbnN0IHByaWNlU3ltYm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU3BlY2lmaWNQcmljZU1hcC5maXhlZFByaWNlU3ltYm9sKTtcclxuXHJcbiAgICAgIGlmIChwcmljZVN5bWJvbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgcHJpY2VTeW1ib2xzLmZvckVhY2goKHZhbHVlOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBlbHQgPSB2YWx1ZTtcclxuICAgICAgICAgIGVsdC5pbm5lckhUTUwgPSBzeW1ib2w7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICk7XHJcbiAgbmV3IFByaWNlUmVkdWN0aW9uTWFuYWdlcihcclxuICAgIFNwZWNpZmljUHJpY2VNYXAucmVkdWN0aW9uVHlwZVNlbGVjdCxcclxuICAgIFNwZWNpZmljUHJpY2VNYXAuaW5jbHVkZVRheElucHV0Q29udGFpbmVyLFxyXG4gICAgU3BlY2lmaWNQcmljZU1hcC5jdXJyZW5jeUlkLFxyXG4gICAgU3BlY2lmaWNQcmljZU1hcC5yZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sLFxyXG4gICk7XHJcblxyXG4gIG5ldyBDdXN0b21lclNlbGVjdG9yKCk7XHJcbiAgbmV3IENvbWJpbmF0aW9uU2VsZWN0b3IobmV3IFJvdXRlcigpLCBOdW1iZXIoJChTcGVjaWZpY1ByaWNlTWFwLnByb2R1Y3RJZElucHV0KS52YWwoKSkpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9