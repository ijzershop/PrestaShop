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

/***/ "./js/components/form/product-search-input.ts"
/*!****************************************************!*\
  !*** ./js/components/form/product-search-input.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductSearchInput)
/* harmony export */ });
/* harmony import */ var _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/entity-search-input */ "./js/components/entity-search-input.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


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

/***/ "./js/pages/tag/tag-map.ts"
/*!*********************************!*\
  !*** ./js/pages/tag/tag-map.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  productSearchInput: "#tag_products"
});


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
/*!******************************!*\
  !*** ./js/pages/tag/form.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_tag_tag_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/tag/tag-map */ "./js/pages/tag/tag-map.ts");
/* harmony import */ var _components_form_product_search_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form/product-search-input */ "./js/components/form/product-search-input.ts");



const { $ } = window;
$(() => {
  new _components_form_product_search_input__WEBPACK_IMPORTED_MODULE_1__["default"](_pages_tag_tag_map__WEBPACK_IMPORTED_MODULE_0__["default"].productSearchInput);
});

})();

window.tag_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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Q0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0EsUUFBUSxJQUEwQztBQUNsRCxRQUFRLGlDQUF1QixFQUFFLDJDQUFRLEVBQUUsbUNBQUU7QUFDN0M7QUFDQSxTQUFTO0FBQUEsa0dBQUM7QUFDVixNQUFNLEtBQUs7QUFBQSxFQUlOO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtDQUErQyxFQUFFO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsdUJBQXVCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2w1RUQsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0RtQjtBQUNZO0FBRS9CLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixNQUFJLDZFQUFrQixDQUFDLDBEQUFNLENBQUMsa0JBQWtCO0FBQ2xELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9lbnRpdHktc2VhcmNoLWlucHV0LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9wcm9kdWN0LXNlYXJjaC1pbnB1dC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvdGFnL3RhZy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbC9kaXN0L1Jlc2l6ZU9ic2VydmVyLmVzLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy90eXBlYWhlYWQuanMvZGlzdC90eXBlYWhlYWQuYnVuZGxlLmpzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvdGFnL2Zvcm0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbmltcG9ydCBCbG9vZGhvdW5kIGZyb20gJ3R5cGVhaGVhZC5qcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3ZlcmxheSBvZiB0eXBlYWhlYWQgaXQgYWxsb3dzIHRvIGhhdmUgYSBzaW5nbGUgY29uZmlnIGlucHV0IChzaW5jZVxyXG4gKiB0eXBlYWhlYWQgd2VpcmRseSB1c2VzIHR3byBkaWZmZXJlbnQgY29uZmlncykuIEl0IGFsc28gcHJvdmlkZXMgc29tZSBkZWZhdWx0IHJlbmRlcmluZ1xyXG4gKiBmdW5jdGlvbnMgd2hpY2ggYXJlLCBvZiBjb3Vyc2UsIG92ZXJyaWRhYmxlLlxyXG4gKi9cclxuXHJcbnR5cGUgRGlzcGxheUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRKUXVlcnlEYXRhc2V0IGV4dGVuZHMgVHdpdHRlci5UeXBlYWhlYWQuRGF0YXNldDxhbnk+IHtcclxuICBkaXNwbGF5OiBzdHJpbmcgfCBEaXNwbGF5RnVuY3Rpb247XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBsaW1pdDogbnVtYmVyO1xyXG4gIGRhdGFMaW1pdDogbnVtYmVyO1xyXG4gIHRlbXBsYXRlczogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZEpRdWVyeU9wdGlvbnMgZXh0ZW5kcyBUd2l0dGVyLlR5cGVhaGVhZC5PcHRpb25zIHtcclxuICBtaW5MZW5ndGg6IG51bWJlcixcclxuICBoaWdobGlnaHQ6IGJvb2xlYW4sXHJcbiAgaGludDogYm9vbGVhbixcclxuICBvblNlbGVjdDogKFxyXG4gICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5XHJcbiAgKSA9PiBib29sZWFuO1xyXG4gIG9uQ2xvc2U6IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsIHNlYXJjaElucHV0OiBKUXVlcnkpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZyA9IHtcclxuICBtaW5MZW5ndGg6IG51bWJlcjtcclxuICBoaWdobGlnaHQ6IGJvb2xlYW47XHJcbiAgaGludDogYm9vbGVhbjtcclxuICBzb3VyY2U6IEJsb29kaG91bmQ8UmVjb3JkPHN0cmluZywgYW55Pj4gfCAoXHJcbiAgICAocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM/OiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZFxyXG4gICkgPT4gdm9pZCk7XHJcbiAgb25TZWxlY3Q6IChcclxuICAgIHNlbGVjdGVkSXRlbTogYW55LFxyXG4gICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgc2VhcmNoSW5wdXQ6IEpRdWVyeVxyXG4gICkgPT4gYm9vbGVhbjtcclxuICBvbkNsb3NlOiAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LCBzZWFyY2hJbnB1dDogSlF1ZXJ5KSA9PiB2b2lkO1xyXG4gIHN1Z2dlc3Rpb25MaW1pdDogbnVtYmVyO1xyXG4gIGRhdGFMaW1pdDogbnVtYmVyO1xyXG4gIGRpc3BsYXk6IHN0cmluZyB8IERpc3BsYXlGdW5jdGlvbjtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRlbXBsYXRlczogYW55O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0gUGFydGlhbDxBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+ICYge1xyXG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcclxuICAgIChxdWVyeTogc3RyaW5nLCBzeW5jUmVzdWx0czogKHJlc3VsdDogYW55W10pID0+IHZvaWQsIGFzeW5jUmVzdWx0cz86IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkXHJcbiAgKSA9PiB2b2lkKTsgLy8gc291cmNlIGlzIG1hbmRhdG9yeSBvcHRpb25cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Db21wbGV0ZVNlYXJjaCB7XHJcbiAgcHJpdmF0ZSAkc2VhcmNoSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hJbnB1dElkOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgY29uZmlnOiBBdXRvQ29tcGxldGVTZWFyY2hDb25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRzZWFyY2hJbnB1dDogSlF1ZXJ5LCBpbnB1dENvbmZpZzogUGFydGlhbDxJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4pIHtcclxuICAgIHRoaXMuJHNlYXJjaElucHV0ID0gJHNlYXJjaElucHV0O1xyXG4gICAgdGhpcy5zZWFyY2hJbnB1dElkID0gdGhpcy4kc2VhcmNoSW5wdXQucHJvcCgnaWQnKTtcclxuXHJcbiAgICAvLyBNZXJnaW5nIG9iamVjdCB3b3JrcyBmaW5lIG9uIG9uZSBsZXZlbCwgYnV0IG9uIHR3byBpdCBlcmFzZXMgc3ViIGVsZW1lbnRzIGV2ZW4gaWYgbm90IHByZXNlbnQsIHNvXHJcbiAgICAvLyB3ZSBoYW5kbGUgdGVtcGxhdGVzIHNlcGFyYXRlbHksIHRoZXNlIGFyZSB0aGUgZGVmYXVsdCByZW5kZXJpbmcgZnVuY3Rpb25zIHdoaWNoIGNhbiBiZSBvdmVycmlkZGVuXHJcbiAgICBjb25zdCBkZWZhdWx0VGVtcGxhdGVzID0ge1xyXG4gICAgICAvLyBCZSBjYXJlZnVsIHRoYXQgeW91ciByZW5kZXJpbmcgZnVuY3Rpb24gbXVzdCByZXR1cm4gSFRNTCBub2RlIG5vdCBwdXJlIHRleHQgc28gYWx3YXlzIGluY2x1ZGUgdGhlXHJcbiAgICAgIC8vIGNvbnRlbnQgaW4gYSBkaXYgYXQgbGVhc3RcclxuICAgICAgc3VnZ2VzdGlvbjogKGl0ZW06IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pID0+IHtcclxuICAgICAgICBsZXQgZGlzcGxheVN1Z2dlc3Rpb246IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfCBzdHJpbmcgPSBpdGVtO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGRpc3BsYXlTdWdnZXN0aW9uID0gdGhpcy5jb25maWcuZGlzcGxheShpdGVtKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxyXG4gICAgICAgICAgICBpdGVtLFxyXG4gICAgICAgICAgICA8c3RyaW5nPiB0aGlzLmNvbmZpZy5kaXNwbGF5LFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgZGlzcGxheVN1Z2dlc3Rpb24gPSBpdGVtWzxzdHJpbmc+IHRoaXMuY29uZmlnLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPiR7ZGlzcGxheVN1Z2dlc3Rpb259PC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgcGVuZGluZyhxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInB4LTJcIj5TZWFyY2hpbmcgZm9yIFwiJHtxdWVyeS5xdWVyeX1cIjwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdEZvdW5kKHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPk5vIHJlc3VsdHMgZm91bmQgZm9yIFwiJHtxdWVyeS5xdWVyeX1cIjwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIGlucHV0IGNvbmZpZ1xyXG4gICAgdGhpcy5jb25maWcgPSA8QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPntcclxuICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgIGhpbnQ6IGZhbHNlLFxyXG4gICAgICBvblNlbGVjdDogKFxyXG4gICAgICAgIHNlbGVjdGVkSXRlbTogYW55LFxyXG4gICAgICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgICAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5LFxyXG4gICAgICApOiBib29sZWFuID0+IHtcclxuICAgICAgICBzZWFyY2hJbnB1dC50eXBlYWhlYWQoJ3ZhbCcsIHNlbGVjdGVkSXRlbVt0aGlzLmNvbmZpZy52YWx1ZV0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkNsb3NlKFxyXG4gICAgICAgIGV2ZW50OiBFdmVudCxcclxuICAgICAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5LFxyXG4gICAgICApIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC50eXBlYWhlYWQoJ3ZhbCcsICcnKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgc3VnZ2VzdGlvbkxpbWl0OiAzMCxcclxuICAgICAgZGF0YUxpbWl0OiAwLFxyXG4gICAgICBkaXNwbGF5OiAnbmFtZScsXHJcbiAgICAgIHZhbHVlOiAnaWQnLFxyXG4gICAgICB0ZW1wbGF0ZXM6IGRlZmF1bHRUZW1wbGF0ZXMsXHJcbiAgICAgIC4uLmlucHV0Q29uZmlnLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJZiBpbnB1dCBoYXMgdGVtcGxhdGVzIG92ZXJyaWRlIG1lIG1lcmdlIHRoZW0gd2l0aCBkZWZhdWx0IG9uZXNcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5wdXRDb25maWcsICd0ZW1wbGF0ZXMnKSkge1xyXG4gICAgICB0aGlzLmNvbmZpZy50ZW1wbGF0ZXMgPSB7XHJcbiAgICAgICAgLi4uZGVmYXVsdFRlbXBsYXRlcyxcclxuICAgICAgICAuLi4oPFJlY29yZDxzdHJpbmcsIHVua25vd24+PmlucHV0Q29uZmlnLnRlbXBsYXRlcyksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5idWlsZFR5cGVhaGVhZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIHR5cGVhaGVhZCBjb21wb25lbnQgYmFzZWQgb24gcHJvdmlkZWQgY29uZmlndXJhdGlvbi5cclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkVHlwZWFoZWFkKCk6IHZvaWQge1xyXG4gICAgLy8gQ3JlYXRlIHRoZSB0d28gY29uZmlnIG9iamVjdCBmb3IgdHlwZWFoZWFkIGJhc2VkIG9uIHRoZSBmdWxsIGNvbmZpZ1xyXG4gICAgY29uc3QgdHlwZWFoZWFkT3B0aW9ucyA9IHtcclxuICAgICAgbWluTGVuZ3RoOiB0aGlzLmNvbmZpZy5taW5MZW5ndGgsXHJcbiAgICAgIGhpZ2hsaWdodDogdGhpcy5jb25maWcuaGlnaGxpZ2h0LFxyXG4gICAgICBoaW50OiB0aGlzLmNvbmZpZy5oaW50LFxyXG4gICAgICBvblNlbGVjdDogdGhpcy5jb25maWcub25TZWxlY3QsXHJcbiAgICAgIG9uQ2xvc2U6IHRoaXMuY29uZmlnLm9uQ2xvc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGRhdGFTZXRDb25maWcgPSB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5jb25maWcuc291cmNlLFxyXG4gICAgICBkaXNwbGF5OiB0aGlzLmNvbmZpZy5kaXNwbGF5LFxyXG4gICAgICB2YWx1ZTogdGhpcy5jb25maWcudmFsdWUsXHJcbiAgICAgIGxpbWl0OiB0aGlzLmNvbmZpZy5zdWdnZXN0aW9uTGltaXQsXHJcbiAgICAgIGRhdGFMaW1pdDogdGhpcy5jb25maWcuZGF0YUxpbWl0LFxyXG4gICAgICB0ZW1wbGF0ZXM6IHRoaXMuY29uZmlnLnRlbXBsYXRlcyxcclxuICAgIH07XHJcblxyXG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cclxuICAgIHRoaXMuJHNlYXJjaElucHV0XHJcbiAgICAgIC50eXBlYWhlYWQoPFR5cGVhaGVhZEpRdWVyeU9wdGlvbnM+dHlwZWFoZWFkT3B0aW9ucywgPFR5cGVhaGVhZEpRdWVyeURhdGFzZXQ+ZGF0YVNldENvbmZpZylcclxuICAgICAgLm9uKCd0eXBlYWhlYWQ6c2VsZWN0JywgKGU6IGFueSwgc2VsZWN0ZWRJdGVtOiBhbnkpID0+XHJcbiAgICAgICAgdGhpcy5jb25maWcub25TZWxlY3Qoc2VsZWN0ZWRJdGVtLCBlLCB0aGlzLiRzZWFyY2hJbnB1dClcclxuICAgICAgKVxyXG4gICAgICAub24oJ3R5cGVhaGVhZDpjbG9zZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKGUsIHRoaXMuJHNlYXJjaElucHV0KTtcclxuICAgICAgfSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZEZlZWRiYWNrQ2xhc3M6ICdpbnZhbGlkLWZlZWRiYWNrJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWFpbElucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLmVtYWlsLWlucHV0JyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEF1dG9Db21wbGV0ZVNlYXJjaCwge0lucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnfSBmcm9tICdAY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLXNlYXJjaCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJ0Bjb21wb25lbnRzL2NvbXBvbmVudHMtbWFwJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbi8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbmltcG9ydCBCbG9vZGhvdW5kIGZyb20gJ3R5cGVhaGVhZC5qcyc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5jb25zdCBFbnRpdHlTZWFyY2hJbnB1dE1hcCA9IENvbXBvbmVudHNNYXAuZW50aXR5U2VhcmNoSW5wdXQ7XHJcblxyXG50eXBlIFJlbW92ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4gdm9pZDtcclxudHlwZSBTZWxlY3RGdW5jdGlvbiA9ICgkbm9kZTogSlF1ZXJ5LCBpdGVtOiBhbnkpID0+IHZvaWQ7XHJcbnR5cGUgU3VnZ2VzdGlvbkZ1bmN0aW9uID0gKGVudGl0eTogYW55KSA9PiBzdHJpbmc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U2VhcmNoSW5wdXRPcHRpb25zIGV4dGVuZHMgT3B0aW9uc09iamVjdCB7XHJcbiAgcHJvdG90eXBlVGVtcGxhdGU6IHN0cmluZyxcclxuICBwcm90b3R5cGVJbmRleDogc3RyaW5nLFxyXG4gIHByb3RvdHlwZU1hcHBpbmc6IE9wdGlvbnNPYmplY3QsXHJcbiAgaWRlbnRpZmllckZpZWxkOiBzdHJpbmc7XHJcbiAgYWxsb3dEZWxldGU6IGJvb2xlYW4sXHJcbiAgZGF0YUxpbWl0OiBudW1iZXIsXHJcbiAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgcmVtb3RlVXJsOiBzdHJpbmcsXHJcbiAgZmlsdGVyU2VsZWN0ZWQ6IGJvb2xlYW4sXHJcbiAgZmlsdGVyZWRJZGVudGl0aWVzOiBBcnJheTxzdHJpbmc+LFxyXG4gIHJlbW92ZU1vZGFsOiBNb2RhbE9wdGlvbnMsXHJcbiAgc2VhcmNoSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6IHN0cmluZyxcclxuICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6IHN0cmluZyxcclxuICBlbnRpdHlJdGVtU2VsZWN0b3I6IHN0cmluZyxcclxuICBlbnRpdHlEZWxldGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGVtcHR5U3RhdGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIHF1ZXJ5V2lsZGNhcmQ6IHN0cmluZyxcclxuICBvblJlbW92ZWRDb250ZW50OiBSZW1vdmVGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBvblNlbGVjdGVkQ29udGVudDogU2VsZWN0RnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgc3VnZ2VzdGlvblRlbXBsYXRlOiBTdWdnZXN0aW9uRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgZXh0cmFRdWVyeVBhcmFtcz86ICgpID0+IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zT2JqZWN0IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIGFwcGx5OiBzdHJpbmc7XHJcbiAgY2FuY2VsOiBzdHJpbmc7XHJcbiAgYnV0dG9uQ2xhc3M6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gc2VhcmNoIGFuZCBzZWxlY3Qgb25lIG9yIHNldmVyYWwgZW50aXRpZXMsIGl0IHVzZXMgdGhlIEF1dG9TZWFyY2hDb21wbGV0ZVxyXG4gKiBjb21wb25lbnQgd2hpY2ggZGlzcGxheXMgYSBsaXN0IG9mIHN1Z2dlc3Rpb24gYmFzZWQgb24gYW4gQVBJIHJldHVybmVkIHJlc3BvbnNlLiBUaGVuIHdoZW5cclxuICogYW4gZWxlbWVudCBpcyBzZWxlY3RlZCBpdCBpcyBhZGRlZCB0byB0aGUgc2VsZWN0aW9uIGNvbnRhaW5lciByZWx5aW5nIG9uIHRoZSBwcm90b3R5cGUgdGVtcGxhdGUgcHJvdmlkZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgd2l0aCBFbnRpdHlTZWFyY2hJbnB1dFR5cGUgZm9ybXMsIGFuZCBpcyB0aWdodGx5IGxpbmtlZCB0byB0aGUgY29udGVudCBvZiB0aGlzXHJcbiAqIHR3aWcgZmlsZSBzcmMvUHJlc3RhU2hvcEJ1bmRsZS9SZXNvdXJjZXMvdmlld3MvQWRtaW4vVHdpZ1RlbXBsYXRlRm9ybS9lbnRpdHlfc2VhcmNoX2lucHV0Lmh0bWwudHdpZ1xyXG4gKlxyXG4gKiBUaGUgZGVmYXVsdCBjb250ZW50IG9mIHRoZSBjb2xsZWN0aW9uIGlzIGFuIEVudGl0eUl0ZW1UeXBlIHdpdGggYSBzaW1wbGUgZGVmYXVsdCB0ZW1wbGF0ZSBidXQgeW91IGNhblxyXG4gKiBlaXRoZXIgb3ZlcnJpZGUgaXQgaW4gYSB0aGVtZSBvciBjcmVhdGUgeW91ciBvd24gZW50aXR5IHR5cGUgaWYgeW91IG5lZWQgdG8gY3VzdG9taXplIHRoZSBiZWhhdmlvdXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlTZWFyY2hJbnB1dCB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSAkZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkZW50aXR5U2VhcmNoSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkZW50aXRpZXNDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSAkbGlzdENvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlICRlbXB0eVN0YXRlOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9ucyE6IEVudGl0eVNlYXJjaElucHV0T3B0aW9ucztcclxuXHJcbiAgcHJpdmF0ZSBlbnRpdHlSZW1vdGVTb3VyY2UhOiBCbG9vZGhvdW5kO1xyXG5cclxuICBwcml2YXRlIGF1dG9TZWFyY2ghOiBBdXRvQ29tcGxldGVTZWFyY2g7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcjogSlF1ZXJ5LCBvcHRpb25zOiBPcHRpb25zT2JqZWN0KSB7XHJcbiAgICB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lciA9ICRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcjtcclxuICAgIHRoaXMub3B0aW9ucyA9IDxFbnRpdHlTZWFyY2hJbnB1dE9wdGlvbnM+e307XHJcbiAgICB0aGlzLmJ1aWxkT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dCA9ICQodGhpcy5vcHRpb25zLnNlYXJjaElucHV0U2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMuZW50aXRpZXNDb250YWluZXJTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG4gICAgdGhpcy4kbGlzdENvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLmxpc3RDb250YWluZXJTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG4gICAgdGhpcy4kZW1wdHlTdGF0ZSA9ICQodGhpcy5vcHRpb25zLmVtcHR5U3RhdGVTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG5cclxuICAgIHRoaXMuYnVpbGRSZW1vdGVTb3VyY2UoKTtcclxuICAgIHRoaXMuYnVpbGRBdXRvQ29tcGxldGVTZWFyY2goKTtcclxuICAgIHRoaXMuYnVpbGRBY3Rpb25zKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcmNlIHNlbGVjdGVkIHZhbHVlcywgdGhlIGlucHV0IGlzIGFuIGFycmF5IG9mIG9iamVjdCB0aGF0IG11c3QgbWF0Y2ggdGhlIGZvcm1hdCBmcm9tXHJcbiAgICogdGhlIEFQSSBpZiB5b3Ugd2FudCB0aGUgc2VsZWN0ZWQgZW50aXRpZXMgdG8gYmUgY29ycmVjdGx5IGRpc3BsYXllZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZXMge0FycmF5PGFueT59XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogYW55W10pOiB2b2lkIHtcclxuICAgIHRoaXMuY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XHJcbiAgICBpZiAoIXZhbHVlcyB8fCB2YWx1ZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwZW5kU2VsZWN0ZWRJdGVtKHZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwZW5kIHRoZSBpdGVtIHRvIHRoZSBzZWxlY3Rpb24sIHJlc3BlY3RpbmcgdGhlIGNvbmZpZ3VyZWQgbGltaXQgc28gaWYgbGltaXQgaXMgYWxyZWFkeSByZWFjaGVkIHRoZSBpdGVtIGlzIG5vdFxyXG4gICAqIGFkZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG5ld0l0ZW1cclxuICAgKlxyXG4gICAqIEByZXR1cm4gYm9vbGVhblxyXG4gICAqL1xyXG4gIGFkZEl0ZW0obmV3SXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRTZWxlY3RlZEl0ZW0obmV3SXRlbSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxyXG4gICAqL1xyXG4gIGdldE9wdGlvbihvcHRpb25OYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25OYW1lXHJcbiAgICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxyXG4gICAqL1xyXG4gIHNldE9wdGlvbihvcHRpb25OYW1lOiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKTogdm9pZCB7XHJcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSB2YWx1ZTtcclxuXHJcbiAgICAvLyBBcHBseSBzcGVjaWFsIG9wdGlvbnMgdG8gY29tcG9uZW50cyB3aGVuIG5lZWRlZFxyXG4gICAgaWYgKG9wdGlvbk5hbWUgPT09ICdyZW1vdGVVcmwnICYmIHRoaXMuZW50aXR5UmVtb3RlU291cmNlKSB7XHJcbiAgICAgICg8UmVjb3JkPHN0cmluZywgYW55Pj4gdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UpLnJlbW90ZS51cmwgPSB0aGlzLm9wdGlvbnMucmVtb3RlVXJsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkT3B0aW9ucyhvcHRpb25zOiBPcHRpb25zT2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnNPYmplY3QgPSB7XHJcbiAgICAgIHN1Z2dlc3Rpb25GaWVsZDogJ25hbWUnLFxyXG4gICAgICBwcm90b3R5cGVUZW1wbGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICBwcm90b3R5cGVJbmRleDogJ19faW5kZXhfXycsXHJcbiAgICAgIHByb3RvdHlwZU1hcHBpbmc6IHtcclxuICAgICAgICBpZDogJ19faWRfXycsXHJcbiAgICAgICAgbmFtZTogJ19fbmFtZV9fJyxcclxuICAgICAgICBpbWFnZTogJ19faW1hZ2VfXycsXHJcbiAgICAgIH0sXHJcbiAgICAgIGlkZW50aWZpZXJGaWVsZDogJ2lkJyxcclxuICAgICAgYWxsb3dEZWxldGU6IHRydWUsXHJcbiAgICAgIGRhdGFMaW1pdDogMCxcclxuICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICByZW1vdGVVcmw6IHVuZGVmaW5lZCxcclxuICAgICAgZmlsdGVyU2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgIGZpbHRlcmVkSWRlbnRpdGllczogW10sXHJcblxyXG4gICAgICByZW1vdmVNb2RhbDoge1xyXG4gICAgICAgIGlkOiAnbW9kYWwtY29uZmlybS1yZW1vdmUtZW50aXR5JyxcclxuICAgICAgICB0aXRsZTogJ0RlbGV0ZSBpdGVtJyxcclxuICAgICAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/JyxcclxuICAgICAgICBhcHBseTogJ0RlbGV0ZScsXHJcbiAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcclxuICAgICAgICBidXR0b25DbGFzczogJ2J0bi1kYW5nZXInLFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8gTW9zdCBvZiB0aGUgcHJldmlvdXMgY29uZmlnIGFyZSBjb25maWd1cmFibGUgdmlhIHRoZSBFbnRpdHlTZWFyY2hJbnB1dEZvcm0gb3B0aW9ucywgdGhlIGZvbGxvd2luZyBvbmVzIGFyZSBvbmx5XHJcbiAgICAgIC8vIG92ZXJyaWRhYmxlIHZpYSBqcyBjb25maWcgKGFzIGxvbmcgYXMgeW91IHVzZSB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSlcclxuICAgICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuc2VhcmNoSW5wdXRTZWxlY3RvcixcclxuICAgICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW50aXRpZXNDb250YWluZXJTZWxlY3RvcixcclxuICAgICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5saXN0Q29udGFpbmVyU2VsZWN0b3IsXHJcbiAgICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW50aXR5SXRlbVNlbGVjdG9yLFxyXG4gICAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW50aXR5RGVsZXRlU2VsZWN0b3IsXHJcbiAgICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW1wdHlTdGF0ZVNlbGVjdG9yLFxyXG4gICAgICBxdWVyeVdpbGRjYXJkOiAnX19RVUVSWV9fJyxcclxuXHJcbiAgICAgIC8vIFRoZXNlIGFyZSBjb25maWd1cmFibGUgY2FsbGJhY2tzXHJcbiAgICAgIG9uUmVtb3ZlZENvbnRlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgb25TZWxlY3RlZENvbnRlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgcmVzcG9uc2VUcmFuc2Zvcm1lcjogKHJlc3BvbnNlOiBhbnkpID0+IHJlc3BvbnNlIHx8IFtdLFxyXG5cclxuICAgICAgLy8gVGVtcGxhdGUgZnVuY3Rpb25cclxuICAgICAgc3VnZ2VzdGlvblRlbXBsYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgIGV4dHJhUXVlcnlQYXJhbXM6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGVmYXVsdE9wdGlvbnMpLmZvckVhY2goKG9wdGlvbk5hbWUpID0+IHtcclxuICAgICAgLy8gVGhpcyBnZXRzIHRoZSBwcm9wZXIgdmFsdWUgZm9yIGVhY2ggb3B0aW9uLCByZXNwZWN0aW5nIHRoZSBwcmlvcml0eTogaW5wdXQgPiBkYXRhLWF0dHJpYnV0ZSA+IGRlZmF1bHRcclxuICAgICAgdGhpcy5pbml0T3B0aW9uKG9wdGlvbk5hbWUsIGlucHV0T3B0aW9ucywgZGVmYXVsdE9wdGlvbnNbb3B0aW9uTmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2FzdCBhbGwgSURzIGludG8gc3RyaW5nIHRvIGF2b2lkIG5vdCBtYXRjaGluZyBiZWNhdXNlIG9mIGRpZmZlcmVudCB0eXBlc1xyXG4gICAgdGhpcy5vcHRpb25zLmZpbHRlcmVkSWRlbnRpdGllcyA9IHRoaXMub3B0aW9ucy5maWx0ZXJlZElkZW50aXRpZXMubWFwKFN0cmluZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHRoZSBvcHRpb24gdmFsdWUsIHRoZSBpbnB1dCBjb25maWcgaGFzIHRoZSBtb3JlIHByaW9yaXR5LiBJdCBvdmVycmlkZXMgdGhlIGRhdGEgYXR0cmlidXRlIG9wdGlvblxyXG4gICAqIChpZiBwcmVzZW50KSwgZmluYWxseSBhIGRlZmF1bHQgdmFsdWUgaXMgdXNlZCAoaWYgZGVmaW5lZCkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uTmFtZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9wdGlvbnNcclxuICAgKiBAcGFyYW0geyp8dW5kZWZpbmVkfSBkZWZhdWx0T3B0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0T3B0aW9uKG9wdGlvbk5hbWU6IHN0cmluZywgaW5wdXRPcHRpb25zOiBPcHRpb25zT2JqZWN0LCBkZWZhdWx0T3B0aW9uOiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5wdXRPcHRpb25zLCBvcHRpb25OYW1lKSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSBpbnB1dE9wdGlvbnNbb3B0aW9uTmFtZV07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lci5kYXRhKG9wdGlvbk5hbWUpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lci5kYXRhKG9wdGlvbk5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gZGVmYXVsdE9wdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgLy8gQWx3YXlzIGNoZWNrIGZvciBjbGljayBldmVuIGlmIGl0IGlzIHVzZWxlc3Mgd2hlbiBhbGxvd0RlbGV0ZSBvcHRpb25zIGlzIGZhbHNlLCBpdCBjYW4gYmUgY2hhbmdlZCBkeW5hbWljYWxseVxyXG4gICAgJCh0aGlzLiRlbnRpdGllc0NvbnRhaW5lcikub24oJ2NsaWNrJywgdGhpcy5vcHRpb25zLmVudGl0eURlbGV0ZVNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYWxsb3dEZWxldGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0ICRlbnRpdHkgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGFsID0gbmV3IChDb25maXJtTW9kYWwgYXMgYW55KShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmlkLFxyXG4gICAgICAgICAgY29uZmlybVRpdGxlOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwudGl0bGUsXHJcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLm1lc3NhZ2UsXHJcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuY2FuY2VsLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuYXBwbHksXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5idXR0b25DbGFzcyxcclxuICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgJGVudGl0eS5yZW1vdmUoKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRW1wdHlTdGF0ZSgpO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25SZW1vdmVkQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uUmVtb3ZlZENvbnRlbnQoJGVudGl0eSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuICAgICAgbW9kYWwuc2hvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRm9yIG5vdyBhZGFwdCB0aGUgZGlzcGxheSBiYXNlZCBvbiB0aGUgYWxsb3dEZWxldGUgb3B0aW9uXHJcbiAgICBjb25zdCAkZW50aXR5RGVsZXRlID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5RGVsZXRlU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIC8vJyEhJyBjb252ZXJ0cyBvcHRpb24gdG8gYm9vbCAoYmVjYXVzZSBpZiBpdHMgMSBvciAwLCBqcXVlcnkgdG9nZ2xlIHdvcmtzIGRpZmZlcmVudGx5IHRoYW4gd2l0aCB0cnVlL2ZhbHNlKVxyXG4gICAgJGVudGl0eURlbGV0ZS50b2dnbGUoISF0aGlzLm9wdGlvbnMuYWxsb3dEZWxldGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIEF1dG9Db21wbGV0ZVNlYXJjaCBjb21wb25lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkQXV0b0NvbXBsZXRlU2VhcmNoKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYXV0b1NlYXJjaENvbmZpZzogSW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UsXHJcbiAgICAgIGRhdGFMaW1pdDogdGhpcy5vcHRpb25zLmRhdGFMaW1pdCxcclxuICAgICAgdmFsdWU6IHRoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGQsXHJcbiAgICAgIG1pbkxlbmd0aDogdGhpcy5vcHRpb25zLm1pbkxlbmd0aCxcclxuICAgICAgdGVtcGxhdGVzOiB7XHJcbiAgICAgICAgc3VnZ2VzdGlvbjogKGVudGl0eTogYW55KSA9PiB0aGlzLnNob3dTdWdnZXN0aW9uKGVudGl0eSksXHJcbiAgICAgIH0sXHJcbiAgICAgIG9uU2VsZWN0OiAoc2VsZWN0ZWRJdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyBXaGVuIGxpbWl0IGlzIG9uZSB3ZSBjYW5ub3Qgc2VsZWN0IGFkZGl0aW9uYWwgZWxlbWVudHMgc28gd2UgcmVwbGFjZSB0aGVtIGluc3RlYWRcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRhdGFMaW1pdCA9PT0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZVNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmRTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gVGhlIHNlYXJjaCBmZWF0dXJlIG1heSBiZSBkaXNhYmxlZCBzbyB0aGUgc2VhcmNoIGlucHV0IHdvbid0IGJlIHByZXNlbnRcclxuICAgIGlmICh0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hdXRvU2VhcmNoID0gbmV3IEF1dG9Db21wbGV0ZVNlYXJjaChcclxuICAgICAgICB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dCxcclxuICAgICAgICBhdXRvU2VhcmNoQ29uZmlnLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93U3VnZ2VzdGlvbihlbnRpdHk6IGFueSk6IHN0cmluZyB7XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5zdWdnZXN0aW9uVGVtcGxhdGUpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3VnZ2VzdGlvblRlbXBsYXRlKGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGVudGl0eUltYWdlID0gJyc7XHJcblxyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlbnRpdHksICdpbWFnZScpKSB7XHJcbiAgICAgIGVudGl0eUltYWdlID0gYDxpbWcgc3JjPVwiJHtlbnRpdHkuaW1hZ2V9XCIgLz4gYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJzZWFyY2gtc3VnZ2VzdGlvblwiPiR7ZW50aXR5SW1hZ2V9JHtlbnRpdHlbdGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25GaWVsZF19PC9kaXY+YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSBCbG9vZGhvdW5kIHJlbW90ZSBzb3VyY2Ugd2hpY2ggd2lsbCBjYWxsIHRoZSBBUEkuIFRoZSBwbGFjZWhvbGRlciB0b1xyXG4gICAqIGluamVjdCB0aGUgcXVlcnkgc2VhcmNoIHBhcmFtZXRlciBpcyBfX1FVRVJZX19cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtCbG9vZGhvdW5kfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRSZW1vdGVTb3VyY2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVudGl0eVJlbW90ZVNvdXJjZSA9IG5ldyBCbG9vZGhvdW5kKHtcclxuICAgICAgZGF0dW1Ub2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxyXG4gICAgICBxdWVyeVRva2VuaXplcjogQmxvb2Rob3VuZC50b2tlbml6ZXJzLndoaXRlc3BhY2UsXHJcbiAgICAgIGlkZW50aWZ5KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialt0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkXTtcclxuICAgICAgfSxcclxuICAgICAgcmVtb3RlOiB7XHJcbiAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMucmVtb3RlVXJsLFxyXG4gICAgICAgIHJlcGxhY2U6IChxdWVyeTogc3RyaW5nLCBzZWFyY2hQaHJhc2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgLy8gbmVlZCB0byByZXBsYWNlIHdpbGRjYXJkIG1hbnVhbGx5LCBiZWNhdXNlIGhlcmUgd2UgYXJlIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgcmVwbGFjZSBmdW5jdGlvblxyXG4gICAgICAgICAgY29uc3QgdXJsID0gcXVlcnkucmVwbGFjZSh0aGlzLm9wdGlvbnMucXVlcnlXaWxkY2FyZCwgc2VhcmNoUGhyYXNlKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5UGFyYW1zKSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGFsbG93cyBhcHBlbmRpbmcgZXh0cmEgcGFyYW1ldGVycyB0byB0aGUgcXVlcnksIHN1Y2ggYXMgc2hvcElkXHJcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhUGFyYW1zID0gdGhpcy5vcHRpb25zLmV4dHJhUXVlcnlQYXJhbXMoKTtcclxuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEV4dHJhUGFyYW1zID0gT2JqZWN0XHJcbiAgICAgICAgICAgICAgLmtleXMoZXh0cmFQYXJhbXMpXHJcbiAgICAgICAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQoZXh0cmFQYXJhbXNba2V5XSl9YClcclxuICAgICAgICAgICAgICAuam9pbignJicpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke3VybH0mJHtlbmNvZGVkRXh0cmFQYXJhbXN9YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIHRyYW5zZm9ybTogKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRSZXNwb25zZSA9IHRoaXMub3B0aW9ucy5yZXNwb25zZVRyYW5zZm9ybWVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSWRzOiBzdHJpbmdbXSA9IHRoaXMuZ2V0U2VsZWN0ZWRJZHMoKTtcclxuICAgICAgICAgIGNvbnN0IHN1Z2dlc3RlZEl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZS5mb3JFYWNoKChyZXNwb25zZUl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBGb3JjZSBjYXN0aW5nIHRvIHN0cmluZyB0byBhdm9pZCBpbmVxdWFsaXR5IHdpdGggbnVtYmVyIElEcyBiZWNhdXNlIG9mIHR5cGVcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VJZGVudGlmaWVyOiBzdHJpbmcgPSBTdHJpbmcocmVzcG9uc2VJdGVtW3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGRdKTtcclxuICAgICAgICAgICAgY29uc3QgaXNJZENvbnRhaW5lZCA9IHRoaXMub3B0aW9ucy5maWx0ZXJTZWxlY3RlZCAmJiBzZWxlY3RlZElkcy5pbmNsdWRlcyhyZXNwb25zZUlkZW50aWZpZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBpc0ZpbHRlcmVkID0gdGhpcy5vcHRpb25zLmZpbHRlcmVkSWRlbnRpdGllcy5pbmNsdWRlcyhyZXNwb25zZUlkZW50aWZpZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0lkQ29udGFpbmVkICYmICFpc0ZpbHRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgc3VnZ2VzdGVkSXRlbXMucHVzaChyZXNwb25zZUl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gc3VnZ2VzdGVkSXRlbXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBzZWxlY3RlZCBpdGVtcy5cclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyU2VsZWN0ZWRJdGVtcygpOiB2b2lkIHtcclxuICAgIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNvbXBvbmVudCBpcyBjb25maWd1cmVkIHRvIGhhdmUgb25seSBvbmUgc2VsZWN0ZWQgZWxlbWVudCBvbiBlYWNoIHNlbGVjdGlvblxyXG4gICAqIHRoZSBwcmV2aW91cyBzZWxlY3Rpb24gaXMgcmVtb3ZlZCBhbmQgdGhlbiByZXBsYWNlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWxlY3RlZEl0ZW0ge09iamVjdH1cclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIHJlcGxhY2VTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHRoaXMuY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XHJcbiAgICB0aGlzLmFkZFNlbGVjdGVkQ29udGVudFRvQ29udGFpbmVyKHNlbGVjdGVkSXRlbSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBjb21wb25lbnQgaXMgY29uZmlndXJlZCB0byBoYXZlIG1vcmUgdGhhbiBvbmUgc2VsZWN0ZWQgaXRlbSBvbiBlYWNoIHNlbGVjdGlvblxyXG4gICAqIHRoZSBpdGVtIGlzIGFkZGVkIHRvIHRoZSBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkSXRlbSB7T2JqZWN0fVxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXBwZW5kU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAvLyBJZiBjb2xsZWN0aW9uIGxlbmd0aCBpcyB1cCB0byBsaW1pdCwgcmV0dXJuXHJcbiAgICBjb25zdCAkZW50aXR5SXRlbXMgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRhdGFMaW1pdCAhPT0gMCAmJiAkZW50aXR5SXRlbXMubGVuZ3RoID49IHRoaXMub3B0aW9ucy5kYXRhTGltaXQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkU2VsZWN0ZWRDb250ZW50VG9Db250YWluZXIoc2VsZWN0ZWRJdGVtKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRW1wdHlTdGF0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRlbnRpdHlJdGVtcyA9ICQodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG4gICAgdGhpcy4kZW1wdHlTdGF0ZS50b2dnbGUoJGVudGl0eUl0ZW1zLmxlbmd0aCA9PT0gMCk7XHJcbiAgICB0aGlzLiRsaXN0Q29udGFpbmVyLnRvZ2dsZSgkZW50aXR5SXRlbXMubGVuZ3RoICE9PSAwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgc2VsZWN0ZWQgY29udGVudCB0byB0aGUgc2VsZWN0aW9uIGNvbnRhaW5lciwgdGhlIEhUTUwgaXMgZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSByZW5kZXIgdGhhdCByZWxpZXMgb24gdGhlXHJcbiAgICogcHJvdG90eXBlIHRlbXBsYXRlIGFuZCBtYXBwaW5nLCBhbmQgZmluYWxseSB0aGUgcmVuZGVyZWQgc2VsZWN0aW9uIGlzIGFkZGVkIHRvIHRoZSBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGVkSXRlbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkU2VsZWN0ZWRDb250ZW50VG9Db250YWluZXIoc2VsZWN0ZWRJdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRlbnRpdHlJdGVtcyA9ICQodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG4gICAgY29uc3QgbmV3SW5kZXggPSAkZW50aXR5SXRlbXMubGVuZ3RoID8gdGhpcy5nZXRJbmRleEZyb21JdGVtKCRlbnRpdHlJdGVtcy5sYXN0KCkpICsgMSA6IDA7XHJcbiAgICBjb25zdCBzZWxlY3RlZEh0bWwgPSB0aGlzLnJlbmRlclNlbGVjdGVkKHNlbGVjdGVkSXRlbSwgbmV3SW5kZXgpO1xyXG5cclxuICAgIGNvbnN0ICRzZWxlY3RlZE5vZGUgPSAkKHNlbGVjdGVkSHRtbCk7XHJcbiAgICBjb25zdCAkZW50aXR5RGVsZXRlID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5RGVsZXRlU2VsZWN0b3IsICRzZWxlY3RlZE5vZGUpO1xyXG4gICAgJGVudGl0eURlbGV0ZS50b2dnbGUoISF0aGlzLm9wdGlvbnMuYWxsb3dEZWxldGUpO1xyXG5cclxuICAgIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyLmFwcGVuZCgkc2VsZWN0ZWROb2RlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vblNlbGVjdGVkQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLm9uU2VsZWN0ZWRDb250ZW50KCRzZWxlY3RlZE5vZGUsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyeSBhbmQgZmluZCB0aGUgaW5kZXggb2YgYW4gZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvbiBieSBwYXJzaW5nIGl0cyBpbnB1dHMgbmFtZXMgd2hpY2ggc2hvdWxkIGxvb2sgbGlrZTpcclxuICAgKlxyXG4gICAqIGZvcm1bY29sbGVjdGlvbl1bMF1bbmFtZV0sIGZvcm1bY29sbGVjdGlvbl1bMV1baWRdID0+IHdlIGFpbSB0byBleHRyYWN0IHRoZSAxXHJcbiAgICpcclxuICAgKiBXZSBzZWFyY2ggZm9yIHRoZSBuYW1lIG1hdGNoaW5nIHRoZSBjb25maWd1cmVkIGlkZW50aWZpZXIsIGFuZCBleHRyYWN0IGl0cyBpbmRleC4gVGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZVxyXG4gICAqIHdoZW4geW91IGVkaXQgYSBjb2xsZWN0aW9uLCB5b3UgY2FuIGFkZCB0aGVuIHJlbW92ZSB0aGVuIGFkZCBhbiBlbGVtZW50IGFnYWluLCB0aGUgaW5kZXhlcyBhcmUgbm90IGdvbm5hIGZvbGxvd1xyXG4gICAqIHNvIHlvdSBjYW5ub3QgcmVseSBvbiBqdXN0IHRoZSBpbmRleCBmcm9tIGVsZW1lbnQgb3JkZXIuIFdoaWNoIGlzIHdoeSBpdCBpcyBtb3JlIGFjY3VyYXRlIHRvIHBhcnNlIHRoZSBpbmRleCB0aGF0XHJcbiAgICogd2FzIHVzZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgYmVlbiByZW5kZXJlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICpcclxuICAgKiBJZiB3ZSBjYW4ndCBmaW5kIGFueXRoaW5nIHdlIHVzZSB0aGUgb3JkZXIgaW5kZXggYXMgZmFsbGJhY2sgdGhvdWdoLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtKUXVlcnl9ICRpdGVtXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIG51bWJlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0SW5kZXhGcm9tSXRlbSgkaXRlbTogSlF1ZXJ5KTogbnVtYmVyIHtcclxuICAgIC8vIEJ5IGRlZmF1bHQgdXNlIHRoZSBwb3NpdGlvbiBpbmRleFxyXG4gICAgbGV0IGluZGV4ID0gJGl0ZW0uaW5kZXgoKTtcclxuXHJcbiAgICAvLyBUcnkgdG8gZmluZCBhbiBpbnB1dCB3aGljaCBuYW1lcyBjb250YWlucyBbMV1baWRdICh3aGVyZSAxIGlzIHRoZSBpbmRleCwgYW5kIGlkIHRoZSBpZGVudGlmaWVyKVxyXG4gICAgY29uc3QgaWRlbnRpZmllck5hbWVSZWdleHA6IHN0cmluZyA9IGBcXFxcWyhcXFxcZCspXFxcXF1cXFxcWyR7dGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZH1cXFxcXWA7XHJcbiAgICBjb25zdCBpbnB1dHMgPSAkaXRlbS5maW5kKCdpbnB1dCcpO1xyXG4gICAgaW5wdXRzLmVhY2goKGlucHV0SW5kZXg6IG51bWJlciwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm5hbWUubWF0Y2goaWRlbnRpZmllck5hbWVSZWdleHApO1xyXG5cclxuICAgICAgLy8gRXh0cmFjdCB0aGUgaW5kZXggZnJvbSB0aGUgaW5wdXQgbmFtZSwgaWYgaXQgaXMgZm91bmQgYW5kIGlzIGEgbnVtYmVyIHVzZSBpdCBhcyB0aGUgaW5kZXhcclxuICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwKTtcclxuXHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4oZm91bmRJbmRleCkpIHtcclxuICAgICAgICAgIGluZGV4ID0gZm91bmRJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlciB0aGUgc2VsZWN0ZWQgZWxlbWVudCwgdGhpcyB3aWxsIGJlIGFwcGVuZGVkIGluIHRoZSBzZWxlY3Rpb24gbGlzdCAodWwpLCBwcm90b3R5cGVUZW1wbGF0ZSBpcyB1c2VkIGFzIHRoZVxyXG4gICAqIGJhc2UgdGhlIHdlIHJlbHkgb24gcHJvdG90eXBlTWFwcGluZyB0byByZXBsYWNlIGV2ZXJ5IHBsYWNlaG9sZGVycyBpbiB0aGUgdGVtcGxhdGUgYnkgdGhlaXIgbWFwcGluZyB2YWx1ZSBpbiB0aGVcclxuICAgKiBwcm92aWRlZCBlbnRpdHkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50aXR5XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVuZGVyU2VsZWN0ZWQoZW50aXR5OiBhbnksIGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnByb3RvdHlwZVRlbXBsYXRlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMucHJvdG90eXBlSW5kZXgsICdnJyksIFN0cmluZyhpbmRleCkpO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5wcm90b3R5cGVNYXBwaW5nKS5mb3JFYWNoKChmaWVsZE5hbWUpID0+IHtcclxuICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IGVudGl0eVtmaWVsZE5hbWVdIHx8ICcnO1xyXG4gICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMucHJvdG90eXBlTWFwcGluZ1tmaWVsZE5hbWVdLCAnZycpLCBmaWVsZFZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnNlcyB0aGUgc2VsZWN0aW9uIGNvbnRhaW5lciBhbmQgZXh0cmFjdCB0aGUgSURzIHRoaXMgYWxsb3dzIHRvIGZpbHRlciB0aGUgYWxyZWFkeSBzZWxlY3RlZCBpdGVtcy5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRTZWxlY3RlZElkcygpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZElkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkQ2hpbGRyZW4gPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIHNlbGVjdGVkQ2hpbGRyZW4uZWFjaCgoaW5kZXg6IG51bWJlciwgc2VsZWN0ZWRDaGlsZDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgaWRlbnRpZmllck5hbWVSZWdleHA6IHN0cmluZyA9IGBcXFxcWyR7dGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZH1cXFxcXWA7XHJcbiAgICAgIGNvbnN0IGlucHV0cyA9ICQoc2VsZWN0ZWRDaGlsZCkuZmluZCgnaW5wdXQnKTtcclxuICAgICAgaW5wdXRzLmVhY2goKGlucHV0SW5kZXg6IG51bWJlciwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoaW5wdXQubmFtZS5tYXRjaChpZGVudGlmaWVyTmFtZVJlZ2V4cCkpIHtcclxuICAgICAgICAgIHNlbGVjdGVkSWRzLnB1c2goaW5wdXQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0ZWRJZHM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBFbnRpdHlTZWFyY2hJbnB1dCwge0VudGl0eVNlYXJjaElucHV0T3B0aW9uc30gZnJvbSAnQGNvbXBvbmVudHMvZW50aXR5LXNlYXJjaC1pbnB1dCc7XHJcblxyXG50eXBlIFByb2R1Y3QgPSB7XHJcbiAgbmFtZTogc3RyaW5nLFxyXG4gIHJlZmVyZW5jZTogc3RyaW5nLFxyXG4gIGltYWdlOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RTZWFyY2hJbnB1dCBleHRlbmRzIEVudGl0eVNlYXJjaElucHV0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHNlYXJjaElucHV0Q29udGFpbmVyOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBPcHRpb25zT2JqZWN0ID0gPEVudGl0eVNlYXJjaElucHV0T3B0aW9ucz4ge30sXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dENvbnRhaW5lckVsID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIGNvbnN0IHJlZmVyZW5jZUxhYmVsID0gc2VhcmNoSW5wdXRDb250YWluZXJFbC5kYXRhc2V0LnJlZmVyZW5jZUxhYmVsID8/ICcoUmVmOiAlcyknO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgb3B0aW9ucy5zdWdnZXN0aW9uVGVtcGxhdGUgPSAocHJvZHVjdDogUHJvZHVjdCkgPT4ge1xyXG4gICAgICBsZXQgcmVmZXJlbmNlID0gJyc7XHJcblxyXG4gICAgICBpZiAocHJvZHVjdC5yZWZlcmVuY2UpIHtcclxuICAgICAgICByZWZlcmVuY2UgPSBgPHNwYW4gY2xhc3M9XCJwcm9kdWN0LXJlZmVyZW5jZVwiPigke3Byb2R1Y3QucmVmZXJlbmNlfSk8L3NwYW4+YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwic2VhcmNoLXN1Z2dlc3Rpb25cIj48aW1nIHNyYz1cIiR7cHJvZHVjdC5pbWFnZX1cIiAvPiAke3Byb2R1Y3QubmFtZX0ke3JlZmVyZW5jZX08L2Rpdj5gO1xyXG4gICAgfTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgb3B0aW9ucy5yZXNwb25zZVRyYW5zZm9ybWVyID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMocmVzcG9uc2UpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzcG9uc2UsIGtleSkpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbWJpbmF0aW9uID0gcmVzcG9uc2Vba2V5XTtcclxuXHJcbiAgICAgICAgICBpZiAoY29tYmluYXRpb24ucmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgICAgICByZXNwb25zZVtrZXldLnJlZmVyZW5jZSA9IHJlZmVyZW5jZUxhYmVsLnJlcGxhY2UoJyVzJywgY29tYmluYXRpb24ucmVmZXJlbmNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcigkKHNlYXJjaElucHV0Q29udGFpbmVyKSwgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsIGAke3BhcmFtcy5pZH0taWZyYW1lYCk7XHJcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xyXG4gICAgICB0aGlzLmlmcmFtZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZS1sb2FkZXInKTtcclxuXHJcbiAgICB0aGlzLnNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmVyJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQodGhpcy5sb2FkZXIsIHRoaXMuaWZyYW1lKTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkgfHwgIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVyVGV4dCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcclxuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcclxuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcclxuICogLSBvblVubG9hZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBpcyBhYm91dCB0byByZWZyZXNoIChzbyBpdCBpcyB1bmxvYWRlZClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplQ29udGFpbmVyITogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2lmcmFtZS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1NpemU6IHRydWUsXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlLFxyXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBJZnJhbWVNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XHJcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChsb2FkZWRFdmVudDogRXZlbnQpID0+IHtcclxuICAgICAgLy8gU2Nyb2xsIHRoZSBib2R5IGNvbnRhaW5lciBiYWNrIHRvIHRoZSB0b3AgYWZ0ZXIgaWZyYW1lIGxvYWRlZFxyXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xyXG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIGlmIChwYXJhbXMub25Mb2FkZWQpIHtcclxuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICh1bmxvYWRFdmVudDogQmVmb3JlVW5sb2FkRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCwgKChldmVudDogSWZyYW1lRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XHJcbiAgICAgICAgcGFyYW1zLm9uSWZyYW1lRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RhbC5jb25maXJtQnV0dG9uICYmIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgICAgIHBhcmFtcy5jb25maXJtQ2FsbGJhY2sodGhpcy5tb2RhbC5pZnJhbWUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZTogYm9vbGVhbiA9IHRydWUsIHVzZUlubmVyVGV4dDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XHJcbiAgICBpZiAodXNlSW5uZXJUZXh0KSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB0aGlzIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3RTZWFyY2hJbnB1dDogJyN0YWdfcHJvZHVjdHMnLFxyXG59O1xyXG4iLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoaW1zIHRoYXQgcHJvdmlkZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIEVTNiBjb2xsZWN0aW9ucy5cclxuICpcclxuICogVGhlc2UgaW1wbGVtZW50YXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgdXNlZCBvdXRzaWRlIG9mIHRoZSBSZXNpemVPYnNlcnZlclxyXG4gKiBtb2R1bGVzIGFzIHRoZXkgY292ZXIgb25seSBhIGxpbWl0ZWQgcmFuZ2Ugb2YgdXNlIGNhc2VzLlxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1qc2RvYywgdmFsaWQtanNkb2MgKi9cclxudmFyIE1hcFNoaW0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbmRleCBpbiBwcm92aWRlZCBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheT59IGFyclxyXG4gICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KGFyciwga2V5KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGFyci5zb21lKGZ1bmN0aW9uIChlbnRyeSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5WzBdID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW50cmllc19fLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX19lbnRyaWVzX19baW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fW2luZGV4XVsxXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuX19lbnRyaWVzX187XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KGVudHJpZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5nZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18uc3BsaWNlKDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAgICAgKiBAcGFyYW0geyp9IFtjdHg9bnVsbF1cclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcclxuICAgICAgICAgICAgaWYgKGN0eCA9PT0gdm9pZCAwKSB7IGN0eCA9IG51bGw7IH1cclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX19lbnRyaWVzX187IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZW50cnlbMV0sIGVudHJ5WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzXzE7XHJcbiAgICB9KCkpO1xyXG59KSgpO1xuXG4vKipcclxuICogRGV0ZWN0cyB3aGV0aGVyIHdpbmRvdyBhbmQgZG9jdW1lbnQgb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGluIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbiAqL1xyXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgPT09IGRvY3VtZW50O1xuXG4vLyBSZXR1cm5zIGdsb2JhbCBvYmplY3Qgb2YgYSBjdXJyZW50IGVudmlyb25tZW50LlxyXG52YXIgZ2xvYmFsJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93O1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXHJcbiAgICByZXR1cm4gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIEEgc2hpbSBmb3IgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGljaCBmYWxscyBiYWNrIHRvIHRoZSBzZXRUaW1lb3V0IGlmXHJcbiAqIGZpcnN0IG9uZSBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXF1ZXN0cycgaWRlbnRpZmllci5cclxuICovXHJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEl0J3MgcmVxdWlyZWQgdG8gdXNlIGEgYm91bmRlZCBmdW5jdGlvbiBiZWNhdXNlIElFIHNvbWV0aW1lcyB0aHJvd3NcclxuICAgICAgICAvLyBhbiBcIkludmFsaWQgY2FsbGluZyBvYmplY3RcIiBlcnJvciBpZiByQUYgaXMgaW52b2tlZCB3aXRob3V0IHRoZSBnbG9iYWxcclxuICAgICAgICAvLyBvYmplY3Qgb24gdGhlIGxlZnQgaGFuZCBzaWRlLlxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwkMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbGxiYWNrKERhdGUubm93KCkpOyB9LCAxMDAwIC8gNjApOyB9O1xyXG59KSgpO1xuXG4vLyBEZWZpbmVzIG1pbmltdW0gdGltZW91dCBiZWZvcmUgYWRkaW5nIGEgdHJhaWxpbmcgY2FsbC5cclxudmFyIHRyYWlsaW5nVGltZW91dCA9IDI7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBlbnN1cmVzIHRoYXQgcHJvdmlkZWQgY2FsbGJhY2sgd2lsbCBiZVxyXG4gKiBpbnZva2VkIG9ubHkgb25jZSBkdXJpbmcgdGhlIHNwZWNpZmllZCBkZWxheSBwZXJpb2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgZGVsYXkgcGVyaW9kLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSBEZWxheSBhZnRlciB3aGljaCB0byBpbnZva2UgY2FsbGJhY2suXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgIHZhciBsZWFkaW5nQ2FsbCA9IGZhbHNlLCB0cmFpbGluZ0NhbGwgPSBmYWxzZSwgbGFzdENhbGxUaW1lID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgb3JpZ2luYWwgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIHNjaGVkdWxlcyBuZXcgaW52b2NhdGlvbiBpZlxyXG4gICAgICogdGhlIFwicHJveHlcIiB3YXMgY2FsbGVkIGR1cmluZyBjdXJyZW50IHJlcXVlc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlc29sdmVQZW5kaW5nKCkge1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhaWxpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIHByb3h5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkuIEl0IHdpbGwgZnVydGhlciBwb3N0cG9uZVxyXG4gICAgICogaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gZGVsZWdhdGluZyBpdCB0byB0aGVcclxuICAgICAqIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxKHJlc29sdmVQZW5kaW5nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGVzIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICB2YXIgdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgLy8gUmVqZWN0IGltbWVkaWF0ZWx5IGZvbGxvd2luZyBjYWxscy5cclxuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCAtIGxhc3RDYWxsVGltZSA8IHRyYWlsaW5nVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNjaGVkdWxlIG5ldyBjYWxsIHRvIGJlIGluIGludm9rZWQgd2hlbiB0aGUgcGVuZGluZyBvbmUgaXMgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IGZvciBcInRyYW5zaXRpb25zXCIgd2hpY2ggbmV2ZXIgYWN0dWFsbHkgc3RhcnRcclxuICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgc28gdGhlcmUgaXMgYSBjaGFuY2UgdGhhdCB3ZSBtaWdodCBtaXNzIG9uZSBpZiBjaGFuZ2VcclxuICAgICAgICAgICAgLy8gaGFwcGVucyBhbWlkcyB0aGUgcGVuZGluZyBpbnZvY2F0aW9uLlxyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aW1lb3V0Q2FsbGJhY2ssIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdENhbGxUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59XG5cbi8vIE1pbmltdW0gZGVsYXkgYmVmb3JlIGludm9raW5nIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLlxyXG52YXIgUkVGUkVTSF9ERUxBWSA9IDIwO1xyXG4vLyBBIGxpc3Qgb2Ygc3Vic3RyaW5ncyBvZiBDU1MgcHJvcGVydGllcyB1c2VkIHRvIGZpbmQgdHJhbnNpdGlvbiBldmVudHMgdGhhdFxyXG4vLyBtaWdodCBhZmZlY3QgZGltZW5zaW9ucyBvZiBvYnNlcnZlZCBlbGVtZW50cy5cclxudmFyIHRyYW5zaXRpb25LZXlzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3NpemUnLCAnd2VpZ2h0J107XHJcbi8vIENoZWNrIGlmIE11dGF0aW9uT2JzZXJ2ZXIgaXMgYXZhaWxhYmxlLlxyXG52YXIgbXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCA9IHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcclxuLyoqXHJcbiAqIFNpbmdsZXRvbiBjb250cm9sbGVyIGNsYXNzIHdoaWNoIGhhbmRsZXMgdXBkYXRlcyBvZiBSZXNpemVPYnNlcnZlciBpbnN0YW5jZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgRE9NIGxpc3RlbmVycyBoYXZlIGJlZW4gYWRkZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZWxscyB0aGF0IGNvbnRyb2xsZXIgaGFzIHN1YnNjcmliZWQgZm9yIE11dGF0aW9uIEV2ZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZWVwcyByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIE11dGF0aW9uT2JzZXJ2ZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TXV0YXRpb25PYnNlcnZlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBsaXN0IG9mIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2ZXJTUEk+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzXyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kXyA9IHRoaXMub25UcmFuc2l0aW9uRW5kXy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCA9IHRocm90dGxlKHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpLCBSRUZSRVNIX0RFTEFZKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvYnNlcnZlciB0byBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICBpZiAoIX50aGlzLm9ic2VydmVyc18uaW5kZXhPZihvYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNfLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIGlmIHRoZXkgaGF2ZW4ndCBiZWVuIGFkZGVkIHlldC5cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXztcclxuICAgICAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgLy8gUmVtb3ZlIG9ic2VydmVyIGlmIGl0J3MgcHJlc2VudCBpbiByZWdpc3RyeS5cclxuICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGlmIGNvbnRyb2xsZXIgaGFzIG5vIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMubGVuZ3RoICYmIHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy4gSXQgd2lsbCBjb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaW5zb2ZhclxyXG4gICAgICogaXQgZGV0ZWN0cyBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZXNEZXRlY3RlZCA9IHRoaXMudXBkYXRlT2JzZXJ2ZXJzXygpO1xyXG4gICAgICAgIC8vIENvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpZiBjaGFuZ2VzIGhhdmUgYmVlbiBkZXRlY3RlZCBhcyB0aGVyZSBtaWdodFxyXG4gICAgICAgIC8vIGJlIGZ1dHVyZSBvbmVzIGNhdXNlZCBieSBDU1MgdHJhbnNpdGlvbnMuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGV2ZXJ5IG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QgYW5kIG5vdGlmaWVzIHRoZW0gb2YgcXVldWVkXHJcbiAgICAgKiBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBcInRydWVcIiBpZiBhbnkgb2JzZXJ2ZXIgaGFzIGRldGVjdGVkIGNoYW5nZXMgaW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiBpdCdzIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZU9ic2VydmVyc18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBvYnNlcnZlcnMgdGhhdCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdmFyIGFjdGl2ZU9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXy5maWx0ZXIoZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5nYXRoZXJBY3RpdmUoKSwgb2JzZXJ2ZXIuaGFzQWN0aXZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRGVsaXZlciBub3RpZmljYXRpb25zIGluIGEgc2VwYXJhdGUgY3ljbGUgaW4gb3JkZXIgdG8gYXZvaWQgYW55XHJcbiAgICAgICAgLy8gY29sbGlzaW9ucyBiZXR3ZWVuIG9ic2VydmVycywgZS5nLiB3aGVuIG11bHRpcGxlIGluc3RhbmNlcyBvZlxyXG4gICAgICAgIC8vIFJlc2l6ZU9ic2VydmVyIGFyZSB0cmFja2luZyB0aGUgc2FtZSBlbGVtZW50IGFuZCB0aGUgY2FsbGJhY2sgb2Ygb25lXHJcbiAgICAgICAgLy8gb2YgdGhlbSBjaGFuZ2VzIGNvbnRlbnQgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgdGFyZ2V0LiBTb21ldGltZXNcclxuICAgICAgICAvLyB0aGlzIG1heSByZXN1bHQgaW4gbm90aWZpY2F0aW9ucyBiZWluZyBibG9ja2VkIGZvciB0aGUgcmVzdCBvZiBvYnNlcnZlcnMuXHJcbiAgICAgICAgYWN0aXZlT2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7IHJldHVybiBvYnNlcnZlci5icm9hZGNhc3RBY3RpdmUoKTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZU9ic2VydmVycy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgYWRkZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBpcyB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3JcclxuICAgICAgICAvLyBkZWxheWVkIHRyYW5zaXRpb25zLiBUaGlzIHdheSBpdCdzIHBvc3NpYmxlIHRvIGNhcHR1cmUgYXQgbGVhc3QgdGhlXHJcbiAgICAgICAgLy8gZmluYWwgc3RhdGUgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAobXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5kaXNjb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSByZW1vdmVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8ICF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFuc2l0aW9uRXZlbnR9IGV2ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5vblRyYW5zaXRpb25FbmRfID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIF9iID0gX2EucHJvcGVydHlOYW1lLCBwcm9wZXJ0eU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYjtcclxuICAgICAgICAvLyBEZXRlY3Qgd2hldGhlciB0cmFuc2l0aW9uIG1heSBhZmZlY3QgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIHZhciBpc1JlZmxvd1Byb3BlcnR5ID0gdHJhbnNpdGlvbktleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5wcm9wZXJ0eU5hbWUuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlZmxvd1Byb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlXykge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlXyA9IG5ldyBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VfO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyJ3MgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmluc3RhbmNlXyA9IG51bGw7XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyO1xyXG59KCkpO1xuXG4vKipcclxuICogRGVmaW5lcyBub24td3JpdGFibGUvZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwcm92aWRlZCB0YXJnZXQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gT2JqZWN0IGZvciB3aGljaCB0byBkZWZpbmUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gUHJvcGVydGllcyB0byBiZSBkZWZpbmVkLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0LlxyXG4gKi9cclxudmFyIGRlZmluZUNvbmZpZ3VyYWJsZSA9IChmdW5jdGlvbiAodGFyZ2V0LCBwcm9wcykge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHByb3BzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gX2FbX2ldO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHNba2V5XSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59KTtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdsb2JhbCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBnZXRXaW5kb3dPZiA9IChmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAvLyBBc3N1bWUgdGhhdCB0aGUgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiBOb2RlLCB3aGljaCBtZWFucyB0aGF0IGl0XHJcbiAgICAvLyBoYXMgdGhlIFwib3duZXJEb2N1bWVudFwiIHByb3BlcnR5IGZyb20gd2hpY2ggd2UgY2FuIHJldHJpZXZlIGFcclxuICAgIC8vIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9iamVjdC5cclxuICAgIHZhciBvd25lckdsb2JhbCA9IHRhcmdldCAmJiB0YXJnZXQub3duZXJEb2N1bWVudCAmJiB0YXJnZXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcclxuICAgIC8vIFJldHVybiB0aGUgbG9jYWwgZ2xvYmFsIG9iamVjdCBpZiBpdCdzIG5vdCBwb3NzaWJsZSBleHRyYWN0IG9uZSBmcm9tXHJcbiAgICAvLyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgcmV0dXJuIG93bmVyR2xvYmFsIHx8IGdsb2JhbCQxO1xyXG59KTtcblxuLy8gUGxhY2Vob2xkZXIgb2YgYW4gZW1wdHkgY29udGVudCByZWN0YW5nbGUuXHJcbnZhciBlbXB0eVJlY3QgPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHByb3ZpZGVkIHN0cmluZyB0byBhIG51bWJlci5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGJvcmRlcnMgc2l6ZSBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHBhcmFtIHsuLi5zdHJpbmd9IHBvc2l0aW9ucyAtIEJvcmRlcnMgcG9zaXRpb25zICh0b3AsIHJpZ2h0LCAuLi4pXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHNpemUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydib3JkZXItJyArIHBvc2l0aW9uICsgJy13aWR0aCddO1xyXG4gICAgICAgIHJldHVybiBzaXplICsgdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9LCAwKTtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgcGFkZGluZ3Mgc2l6ZXMgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFBhZGRpbmdzIGJveC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZGRpbmdzKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J107XHJcbiAgICB2YXIgcGFkZGluZ3MgPSB7fTtcclxuICAgIGZvciAodmFyIF9pID0gMCwgcG9zaXRpb25zXzEgPSBwb3NpdGlvbnM7IF9pIDwgcG9zaXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb25zXzFbX2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1sncGFkZGluZy0nICsgcG9zaXRpb25dO1xyXG4gICAgICAgIHBhZGRpbmdzW3Bvc2l0aW9uXSA9IHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZGRpbmdzO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIFNWRyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkc1xyXG4gKiAgICAgIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgdmFyIGJib3ggPSB0YXJnZXQuZ2V0QkJveCgpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KDAsIDAsIGJib3gud2lkdGgsIGJib3guaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBIVE1MRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBjb250ZW50IHJlY3RhbmdsZS5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIC8vIENsaWVudCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGNhbid0IGJlXHJcbiAgICAvLyB1c2VkIGV4Y2x1c2l2ZWx5IGFzIHRoZXkgcHJvdmlkZSByb3VuZGVkIHZhbHVlcy5cclxuICAgIHZhciBjbGllbnRXaWR0aCA9IHRhcmdldC5jbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0ID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIC8vIEJ5IHRoaXMgY29uZGl0aW9uIHdlIGNhbiBjYXRjaCBhbGwgbm9uLXJlcGxhY2VkIGlubGluZSwgaGlkZGVuIGFuZFxyXG4gICAgLy8gZGV0YWNoZWQgZWxlbWVudHMuIFRob3VnaCBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgbGVzc1xyXG4gICAgLy8gdGhhbiAwLjUgd2lsbCBiZSBkaXNjYXJkZWQgYXMgd2VsbC5cclxuICAgIC8vXHJcbiAgICAvLyBXaXRob3V0IGl0IHdlIHdvdWxkIG5lZWQgdG8gaW1wbGVtZW50IHNlcGFyYXRlIG1ldGhvZHMgZm9yIGVhY2ggb2ZcclxuICAgIC8vIHRob3NlIGNhc2VzIGFuZCBpdCdzIG5vdCBwb3NzaWJsZSB0byBwZXJmb3JtIGEgcHJlY2lzZSBhbmQgcGVyZm9ybWFuY2VcclxuICAgIC8vIGVmZmVjdGl2ZSB0ZXN0IGZvciBoaWRkZW4gZWxlbWVudHMuIEUuZy4gZXZlbiBqUXVlcnkncyAnOnZpc2libGUnIGZpbHRlclxyXG4gICAgLy8gZ2l2ZXMgd3JvbmcgcmVzdWx0cyBmb3IgZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBsZXNzIHRoYW4gMC41LlxyXG4gICAgaWYgKCFjbGllbnRXaWR0aCAmJiAhY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIHZhciBzdHlsZXMgPSBnZXRXaW5kb3dPZih0YXJnZXQpLmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcclxuICAgIHZhciBwYWRkaW5ncyA9IGdldFBhZGRpbmdzKHN0eWxlcyk7XHJcbiAgICB2YXIgaG9yaXpQYWQgPSBwYWRkaW5ncy5sZWZ0ICsgcGFkZGluZ3MucmlnaHQ7XHJcbiAgICB2YXIgdmVydFBhZCA9IHBhZGRpbmdzLnRvcCArIHBhZGRpbmdzLmJvdHRvbTtcclxuICAgIC8vIENvbXB1dGVkIHN0eWxlcyBvZiB3aWR0aCAmIGhlaWdodCBhcmUgYmVpbmcgdXNlZCBiZWNhdXNlIHRoZXkgYXJlIHRoZVxyXG4gICAgLy8gb25seSBkaW1lbnNpb25zIGF2YWlsYWJsZSB0byBKUyB0aGF0IGNvbnRhaW4gbm9uLXJvdW5kZWQgdmFsdWVzLiBJdCBjb3VsZFxyXG4gICAgLy8gYmUgcG9zc2libGUgdG8gdXRpbGl6ZSB0aGUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlmIG9ubHkgaXQncyBkYXRhIHdhc24ndFxyXG4gICAgLy8gYWZmZWN0ZWQgYnkgQ1NTIHRyYW5zZm9ybWF0aW9ucyBsZXQgYWxvbmUgcGFkZGluZ3MsIGJvcmRlcnMgYW5kIHNjcm9sbCBiYXJzLlxyXG4gICAgdmFyIHdpZHRoID0gdG9GbG9hdChzdHlsZXMud2lkdGgpLCBoZWlnaHQgPSB0b0Zsb2F0KHN0eWxlcy5oZWlnaHQpO1xyXG4gICAgLy8gV2lkdGggJiBoZWlnaHQgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB3aGVuIHRoZSAnYm9yZGVyLWJveCcgYm94XHJcbiAgICAvLyBtb2RlbCBpcyBhcHBsaWVkIChleGNlcHQgZm9yIElFKS5cclxuICAgIGlmIChzdHlsZXMuYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcpIHtcclxuICAgICAgICAvLyBGb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgcmVxdWlyZWQgdG8gaGFuZGxlIEludGVybmV0IEV4cGxvcmVyIHdoaWNoXHJcbiAgICAgICAgLy8gZG9lc24ndCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHRvIGNvbXB1dGVkIENTUyBkaW1lbnNpb25zLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gV2UgY2FuIHNheSB0aGF0IGlmIENTUyBkaW1lbnNpb25zICsgcGFkZGluZ3MgYXJlIGVxdWFsIHRvIHRoZSBcImNsaWVudFwiXHJcbiAgICAgICAgLy8gcHJvcGVydGllcyB0aGVuIGl0J3MgZWl0aGVyIElFLCBhbmQgdGh1cyB3ZSBkb24ndCBuZWVkIHRvIHN1YnRyYWN0XHJcbiAgICAgICAgLy8gYW55dGhpbmcsIG9yIGFuIGVsZW1lbnQgbWVyZWx5IGRvZXNuJ3QgaGF2ZSBwYWRkaW5ncy9ib3JkZXJzIHN0eWxlcy5cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAhPT0gY2xpZW50V2lkdGgpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAnbGVmdCcsICdyaWdodCcpICsgaG9yaXpQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpICE9PSBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3RvcCcsICdib3R0b20nKSArIHZlcnRQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRm9sbG93aW5nIHN0ZXBzIGNhbid0IGJlIGFwcGxpZWQgdG8gdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50IGFzIGl0c1xyXG4gICAgLy8gY2xpZW50W1dpZHRoL0hlaWdodF0gcHJvcGVydGllcyByZXByZXNlbnQgdmlld3BvcnQgYXJlYSBvZiB0aGUgd2luZG93LlxyXG4gICAgLy8gQmVzaWRlcywgaXQncyBhcyB3ZWxsIG5vdCBuZWNlc3NhcnkgYXMgdGhlIDxodG1sPiBpdHNlbGYgbmVpdGhlciBoYXNcclxuICAgIC8vIHJlbmRlcmVkIHNjcm9sbCBiYXJzIG5vciBpdCBjYW4gYmUgY2xpcHBlZC5cclxuICAgIGlmICghaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIC8vIEluIHNvbWUgYnJvd3NlcnMgKG9ubHkgaW4gRmlyZWZveCwgYWN0dWFsbHkpIENTUyB3aWR0aCAmIGhlaWdodFxyXG4gICAgICAgIC8vIGluY2x1ZGUgc2Nyb2xsIGJhcnMgc2l6ZSB3aGljaCBjYW4gYmUgcmVtb3ZlZCBhdCB0aGlzIHN0ZXAgYXMgc2Nyb2xsXHJcbiAgICAgICAgLy8gYmFycyBhcmUgdGhlIG9ubHkgZGlmZmVyZW5jZSBiZXR3ZWVuIHJvdW5kZWQgZGltZW5zaW9ucyArIHBhZGRpbmdzXHJcbiAgICAgICAgLy8gYW5kIFwiY2xpZW50XCIgcHJvcGVydGllcywgdGhvdWdoIHRoYXQgaXMgbm90IGFsd2F5cyB0cnVlIGluIENocm9tZS5cclxuICAgICAgICB2YXIgdmVydFNjcm9sbGJhciA9IE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgLSBjbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgaG9yaXpTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpIC0gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIC8vIENocm9tZSBoYXMgYSByYXRoZXIgd2VpcmQgcm91bmRpbmcgb2YgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLlxyXG4gICAgICAgIC8vIEUuZy4gZm9yIGFuIGVsZW1lbnQgd2l0aCBjb250ZW50IHdpZHRoIG9mIDMxNC4ycHggaXQgc29tZXRpbWVzIGdpdmVzXHJcbiAgICAgICAgLy8gdGhlIGNsaWVudCB3aWR0aCBvZiAzMTVweCBhbmQgZm9yIHRoZSB3aWR0aCBvZiAzMTQuN3B4IGl0IG1heSBnaXZlXHJcbiAgICAgICAgLy8gMzE0cHguIEFuZCBpdCBkb2Vzbid0IGhhcHBlbiBhbGwgdGhlIHRpbWUuIFNvIGp1c3QgaWdub3JlIHRoaXMgZGVsdGFcclxuICAgICAgICAvLyBhcyBhIG5vbi1yZWxldmFudC5cclxuICAgICAgICBpZiAoTWF0aC5hYnModmVydFNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gdmVydFNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGhvcml6U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gaG9yaXpTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KHBhZGRpbmdzLmxlZnQsIHBhZGRpbmdzLnRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFNWR0dyYXBoaWNzRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIGlzU1ZHR3JhcGhpY3NFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFNvbWUgYnJvd3NlcnMsIG5hbWVseSBJRSBhbmQgRWRnZSwgZG9uJ3QgaGF2ZSB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgICAvLyBpbnRlcmZhY2UuXHJcbiAgICBpZiAodHlwZW9mIFNWR0dyYXBoaWNzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdHcmFwaGljc0VsZW1lbnQ7IH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiBpdCdzIHNvLCB0aGVuIGNoZWNrIHRoYXQgZWxlbWVudCBpcyBhdCBsZWFzdCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgIC8vIFNWR0VsZW1lbnQgYW5kIHRoYXQgaXQgaGFzIHRoZSBcImdldEJCb3hcIiBtZXRob2QuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHRWxlbWVudCAmJlxyXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuZ2V0QkJveCA9PT0gJ2Z1bmN0aW9uJyk7IH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGEgZG9jdW1lbnQgZWxlbWVudCAoPGh0bWw+KS5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ID09PSBnZXRXaW5kb3dPZih0YXJnZXQpLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBhbiBhcHByb3ByaWF0ZSBjb250ZW50IHJlY3RhbmdsZSBmb3IgcHJvdmlkZWQgaHRtbCBvciBzdmcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgaWYgKCFpc0Jyb3dzZXIpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU1ZHR3JhcGhpY3NFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCk7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgcmVjdGFuZ2xlIHdpdGggYW4gaW50ZXJmYWNlIG9mIHRoZSBET01SZWN0UmVhZE9ubHkuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkb21yZWN0cmVhZG9ubHlcclxuICpcclxuICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBPYmplY3Qgd2l0aCByZWN0YW5nbGUncyB4L3kgY29vcmRpbmF0ZXMgYW5kIGRpbWVuc2lvbnMuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0UmVhZE9ubHl9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWFkT25seVJlY3QoX2EpIHtcclxuICAgIHZhciB4ID0gX2EueCwgeSA9IF9hLnksIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgIC8vIElmIERPTVJlY3RSZWFkT25seSBpcyBhdmFpbGFibGUgdXNlIGl0IGFzIGEgcHJvdG90eXBlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgdmFyIENvbnN0ciA9IHR5cGVvZiBET01SZWN0UmVhZE9ubHkgIT09ICd1bmRlZmluZWQnID8gRE9NUmVjdFJlYWRPbmx5IDogT2JqZWN0O1xyXG4gICAgdmFyIHJlY3QgPSBPYmplY3QuY3JlYXRlKENvbnN0ci5wcm90b3R5cGUpO1xyXG4gICAgLy8gUmVjdGFuZ2xlJ3MgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlIGFuZCBub24tZW51bWVyYWJsZS5cclxuICAgIGRlZmluZUNvbmZpZ3VyYWJsZShyZWN0LCB7XHJcbiAgICAgICAgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgcmlnaHQ6IHggKyB3aWR0aCxcclxuICAgICAgICBib3R0b206IGhlaWdodCArIHksXHJcbiAgICAgICAgbGVmdDogeFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVjdDtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyBET01SZWN0SW5pdCBvYmplY3QgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRpbWVuc2lvbnMgYW5kIHRoZSB4L3kgY29vcmRpbmF0ZXMuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkaWN0ZGVmLWRvbXJlY3Rpbml0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gUmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBSZWN0YW5nbGUncyBoZWlnaHQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlY3RJbml0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiB7IHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcclxufVxuXG4vKipcclxuICogQ2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgY29tcHV0YXRpb25zIG9mIHRoZSBjb250ZW50IHJlY3RhbmdsZSBvZlxyXG4gKiBwcm92aWRlZCBET00gZWxlbWVudCBhbmQgZm9yIGtlZXBpbmcgdHJhY2sgb2YgaXQncyBjaGFuZ2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgd2lkdGggb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIGhlaWdodCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZmVyZW5jZSB0byB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtET01SZWN0SW5pdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIGFuZCB0ZWxscyB3aGV0aGVyIGl0J3Mgd2lkdGggb3IgaGVpZ2h0IHByb3BlcnRpZXNcclxuICAgICAqIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBicm9hZGNhc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGdldENvbnRlbnRSZWN0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IHJlY3Q7XHJcbiAgICAgICAgcmV0dXJuIChyZWN0LndpZHRoICE9PSB0aGlzLmJyb2FkY2FzdFdpZHRoIHx8XHJcbiAgICAgICAgICAgIHJlY3QuaGVpZ2h0ICE9PSB0aGlzLmJyb2FkY2FzdEhlaWdodCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzICdicm9hZGNhc3RXaWR0aCcgYW5kICdicm9hZGNhc3RIZWlnaHQnIHByb3BlcnRpZXMgd2l0aCBhIGRhdGFcclxuICAgICAqIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBvZiB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9IExhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5icm9hZGNhc3RSZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jb250ZW50UmVjdF87XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gcmVjdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2YXRpb247XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlckVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyRW50cnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRoYXQgaXMgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIERhdGEgb2YgdGhlIGVsZW1lbnQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJFbnRyeSh0YXJnZXQsIHJlY3RJbml0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnRSZWN0ID0gY3JlYXRlUmVhZE9ubHlSZWN0KHJlY3RJbml0KTtcclxuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljYXRpb24gZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZVxyXG4gICAgICAgIC8vIGFuZCBhcmUgYWxzbyBub3QgZW51bWVyYWJsZSBpbiB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUHJvcGVydHkgYWNjZXNzb3JzIGFyZSBub3QgYmVpbmcgdXNlZCBhcyB0aGV5J2QgcmVxdWlyZSB0byBkZWZpbmUgYVxyXG4gICAgICAgIC8vIHByaXZhdGUgV2Vha01hcCBzdG9yYWdlIHdoaWNoIG1heSBjYXVzZSBtZW1vcnkgbGVha3MgaW4gYnJvd3NlcnMgdGhhdFxyXG4gICAgICAgIC8vIGRvbid0IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGNvbGxlY3Rpb25zLlxyXG4gICAgICAgIGRlZmluZUNvbmZpZ3VyYWJsZSh0aGlzLCB7IHRhcmdldDogdGFyZ2V0LCBjb250ZW50UmVjdDogY29udGVudFJlY3QgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJFbnRyeTtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyU1BJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWRcclxuICAgICAqICAgICAgd2hlbiBvbmUgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZXMgaXQncyBjb250ZW50IGRpbWVuc2lvbnMuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn0gY29udHJvbGxlciAtIENvbnRyb2xsZXIgaW5zdGFuY2Ugd2hpY2hcclxuICAgICAqICAgICAgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB1cGRhdGVzIG9mIG9ic2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlcn0gY2FsbGJhY2tDdHggLSBSZWZlcmVuY2UgdG8gdGhlIHB1YmxpY1xyXG4gICAgICogICAgICBSZXNpemVPYnNlcnZlciBpbnN0YW5jZSB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIGNhbGxiYWNrQ3R4KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29sbGVjdGlvbiBvZiByZXNpemUgb2JzZXJ2YXRpb25zIHRoYXQgaGF2ZSBkZXRlY3RlZCBjaGFuZ2VzIGluIGRpbWVuc2lvbnNcclxuICAgICAgICAgKiBvZiBlbGVtZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfID0gW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnkgb2YgdGhlIFJlc2l6ZU9ic2VydmF0aW9uIGluc3RhbmNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNYXA8RWxlbWVudCwgUmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXyA9IG5ldyBNYXBTaGltKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FsbGJhY2sgcHJvdmlkZWQgYXMgcGFyYW1ldGVyIDEgaXMgbm90IGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXyA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0N0eF8gPSBjYWxsYmFja0N0eDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmIChvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuc2V0KHRhcmdldCwgbmV3IFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8uYWRkT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIHVwZGF0ZSBvZiBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZWZyZXNoKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gc3RvcCBvYnNlcnZpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLnVub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBub3QgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBhbGwgZWxlbWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgb2JzZXJ2YXRpb24gaW5zdGFuY2VzIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgb2Ygd2hpY2ggaGFzIGNoYW5nZWRcclxuICAgICAqIGl0J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5nYXRoZXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhdGlvbi5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnB1c2gob2JzZXJ2YXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIGluaXRpYWwgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeVxyXG4gICAgICogaW5zdGFuY2VzIGNvbGxlY3RlZCBmcm9tIGFjdGl2ZSByZXNpemUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuYnJvYWRjYXN0QWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgb2JzZXJ2ZXIgZG9lc24ndCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuY2FsbGJhY2tDdHhfO1xyXG4gICAgICAgIC8vIENyZWF0ZSBSZXNpemVPYnNlcnZlckVudHJ5IGluc3RhbmNlIGZvciBldmVyeSBhY3RpdmUgb2JzZXJ2YXRpb24uXHJcbiAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubWFwKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc2l6ZU9ic2VydmVyRW50cnkob2JzZXJ2YXRpb24udGFyZ2V0LCBvYnNlcnZhdGlvbi5icm9hZGNhc3RSZWN0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwoY3R4LCBlbnRyaWVzLCBjdHgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgY29sbGVjdGlvbiBvZiBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuY2xlYXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnNwbGljZSgwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRlbGxzIHdoZXRoZXIgb2JzZXJ2ZXIgaGFzIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5oYXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlclNQSTtcclxufSgpKTtcblxuLy8gUmVnaXN0cnkgb2YgaW50ZXJuYWwgb2JzZXJ2ZXJzLiBJZiBXZWFrTWFwIGlzIG5vdCBhdmFpbGFibGUgdXNlIGN1cnJlbnQgc2hpbVxyXG4vLyBmb3IgdGhlIE1hcCBjb2xsZWN0aW9uIGFzIGl0IGhhcyBhbGwgcmVxdWlyZWQgbWV0aG9kcyBhbmQgYmVjYXVzZSBXZWFrTWFwXHJcbi8vIGNhbid0IGJlIGZ1bGx5IHBvbHlmaWxsZWQgYW55d2F5LlxyXG52YXIgb2JzZXJ2ZXJzID0gdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnID8gbmV3IFdlYWtNYXAoKSA6IG5ldyBNYXBTaGltKCk7XHJcbi8qKlxyXG4gKiBSZXNpemVPYnNlcnZlciBBUEkuIEVuY2Fwc3VsYXRlcyB0aGUgUmVzaXplT2JzZXJ2ZXIgU1BJIGltcGxlbWVudGF0aW9uXHJcbiAqIGV4cG9zaW5nIG9ubHkgdGhvc2UgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IGFyZSBkZWZpbmVkIGluIHRoZSBzcGVjLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc2l6ZU9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCB0aGlzKTtcclxuICAgICAgICBvYnNlcnZlcnMuc2V0KHRoaXMsIG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSgpKTtcclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG5bXHJcbiAgICAnb2JzZXJ2ZScsXHJcbiAgICAndW5vYnNlcnZlJyxcclxuICAgICdkaXNjb25uZWN0J1xyXG5dLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gICAgUmVzaXplT2JzZXJ2ZXIucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBvYnNlcnZlcnMuZ2V0KHRoaXMpKVttZXRob2RdLmFwcGx5KF9hLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufSk7XG5cbnZhciBpbmRleCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBFeHBvcnQgZXhpc3RpbmcgaW1wbGVtZW50YXRpb24gaWYgYXZhaWxhYmxlLlxyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwiLyohXG4gKiB0eXBlYWhlYWQuanMgMC4xMS4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdpdHRlci90eXBlYWhlYWQuanNcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUgVHdpdHRlciwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzOyBMaWNlbnNlZCBNSVRcbiAqL1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJibG9vZGhvdW5kXCIsIFsgXCJqcXVlcnlcIiBdLCBmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvb3RbXCJCbG9vZGhvdW5kXCJdID0gZmFjdG9yeShhMCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RbXCJCbG9vZGhvdW5kXCJdID0gZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCQpIHtcbiAgICB2YXIgXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTXNpZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8obXNpZSB8cnY6KShcXGQrKC5cXGQrKT8pL2kpWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNCbGFua1N0cmluZzogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdHIgfHwgL15cXHMqJC8udGVzdChzdHIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBcnJheTogJC5pc0FycmF5LFxuICAgICAgICAgICAgaXNGdW5jdGlvbjogJC5pc0Z1bmN0aW9uLFxuICAgICAgICAgICAgaXNPYmplY3Q6ICQuaXNQbGFpbk9iamVjdCxcbiAgICAgICAgICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VsZW1lbnQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0pRdWVyeTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mICQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHI6IGZ1bmN0aW9uIHRvU3RyKHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChzKSB8fCBzID09PSBudWxsID8gXCJcIiA6IHMgKyBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6ICQucHJveHksXG4gICAgICAgICAgICBlYWNoOiBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuICAgICAgICAgICAgICAgICQuZWFjaChjb2xsZWN0aW9uLCByZXZlcnNlQXJncyk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZUFyZ3MoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih2YWx1ZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXA6ICQubWFwLFxuICAgICAgICAgICAgZmlsdGVyOiAkLmdyZXAsXG4gICAgICAgICAgICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvbWU6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWl4aW46ICQuZXh0ZW5kLFxuICAgICAgICAgICAgaWRlbnRpdHk6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElkR2VuZXJhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291bnRlcisrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKG9iaikgPyBvYmogOiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZlcjogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cywgbGF0ZXIsIGNhbGxOb3c7XG4gICAgICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCB0aW1lb3V0LCByZXN1bHQsIHByZXZpb3VzLCBsYXRlcjtcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IDA7XG4gICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNTdHJpbmcodmFsKSA/IHZhbCA6IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9vcDogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuICAgIH0oKTtcbiAgICB2YXIgVkVSU0lPTiA9IFwiMC4xMS4xXCI7XG4gICAgdmFyIHRva2VuaXplcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub253b3JkOiBub253b3JkLFxuICAgICAgICAgICAgd2hpdGVzcGFjZTogd2hpdGVzcGFjZSxcbiAgICAgICAgICAgIG9iajoge1xuICAgICAgICAgICAgICAgIG5vbndvcmQ6IGdldE9ialRva2VuaXplcihub253b3JkKSxcbiAgICAgICAgICAgICAgICB3aGl0ZXNwYWNlOiBnZXRPYmpUb2tlbml6ZXIod2hpdGVzcGFjZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gd2hpdGVzcGFjZShzdHIpIHtcbiAgICAgICAgICAgIHN0ciA9IF8udG9TdHIoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoL1xccysvKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5vbndvcmQoc3RyKSB7XG4gICAgICAgICAgICBzdHIgPSBfLnRvU3RyKHN0cik7XG4gICAgICAgICAgICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KC9cXFcrLykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRPYmpUb2tlbml6ZXIodG9rZW5pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0S2V5KGtleXMpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdG9rZW5pemUobykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChrZXlzLCBmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KHRva2VuaXplcihfLnRvU3RyKG9ba10pKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBMcnVDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gTHJ1Q2FjaGUobWF4U2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5tYXhTaXplID0gXy5pc051bWJlcihtYXhTaXplKSA/IG1heFNpemUgOiAxMDA7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhTaXplIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCA9IHRoaXMuZ2V0ID0gJC5ub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTHJ1Q2FjaGUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWlsSXRlbSA9IHRoaXMubGlzdC50YWlsLCBub2RlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmUodGFpbEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYXNoW3RhaWxJdGVtLmtleV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSA9IHRoaXMuaGFzaFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmFsID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubW92ZVRvRnJvbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LmFkZChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNoW2tleV0gPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmhhc2hba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubW92ZVRvRnJvbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNoID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIExpc3QoKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTGlzdC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkLnByZXYgPSBub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbCB8fCBub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnByZXYgPyBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dCA6IHRoaXMuaGVhZCA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICBub2RlLm5leHQgPyBub2RlLm5leHQucHJldiA9IG5vZGUucHJldiA6IHRoaXMudGFpbCA9IG5vZGUucHJldjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlVG9Gcm9udDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gTm9kZShrZXksIHZhbCkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMubmV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExydUNhY2hlO1xuICAgIH0oKTtcbiAgICB2YXIgUGVyc2lzdGVudFN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBMT0NBTF9TVE9SQUdFO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFLnNldEl0ZW0oXCJ+fn5cIiwgXCIhXCIpO1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRS5yZW1vdmVJdGVtKFwifn5+XCIpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIFBlcnNpc3RlbnRTdG9yYWdlKG5hbWVzcGFjZSwgb3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4ID0gWyBcIl9fXCIsIG5hbWVzcGFjZSwgXCJfX1wiIF0uam9pbihcIlwiKTtcbiAgICAgICAgICAgIHRoaXMudHRsS2V5ID0gXCJfX3R0bF9fXCI7XG4gICAgICAgICAgICB0aGlzLmtleU1hdGNoZXIgPSBuZXcgUmVnRXhwKFwiXlwiICsgXy5lc2NhcGVSZWdFeENoYXJzKHRoaXMucHJlZml4KSk7XG4gICAgICAgICAgICB0aGlzLmxzID0gb3ZlcnJpZGUgfHwgTE9DQUxfU1RPUkFHRTtcbiAgICAgICAgICAgICF0aGlzLmxzICYmIHRoaXMuX25vb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFBlcnNpc3RlbnRTdG9yYWdlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3ByZWZpeDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsga2V5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF90dGxLZXk6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmVmaXgoa2V5KSArIHRoaXMudHRsS2V5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9ub29wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldCA9IHRoaXMuc2V0ID0gdGhpcy5yZW1vdmUgPSB0aGlzLmNsZWFyID0gdGhpcy5pc0V4cGlyZWQgPSBfLm5vb3A7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3NhZmVTZXQ6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5scy5zZXRJdGVtKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub29wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V4cGlyZWQoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlKHRoaXMubHMuZ2V0SXRlbSh0aGlzLl9wcmVmaXgoa2V5KSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwsIHR0bCkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKHR0bCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2FmZVNldCh0aGlzLl90dGxLZXkoa2V5KSwgZW5jb2RlKG5vdygpICsgdHRsKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3R0bEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NhZmVTZXQodGhpcy5fcHJlZml4KGtleSksIGVuY29kZSh2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl90dGxLZXkoa2V5KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3ByZWZpeChrZXkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGtleXMgPSBnYXRoZXJNYXRjaGluZ0tleXModGhpcy5rZXlNYXRjaGVyKTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBrZXlzLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRXhwaXJlZDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHR0bCA9IGRlY29kZSh0aGlzLmxzLmdldEl0ZW0odGhpcy5fdHRsS2V5KGtleSkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc051bWJlcih0dGwpICYmIG5vdygpID4gdHRsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFBlcnNpc3RlbnRTdG9yYWdlO1xuICAgICAgICBmdW5jdGlvbiBub3coKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KF8uaXNVbmRlZmluZWQodmFsKSA/IG51bGwgOiB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRlY29kZSh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkLnBhcnNlSlNPTih2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdhdGhlck1hdGNoaW5nS2V5cyhrZXlNYXRjaGVyKSB7XG4gICAgICAgICAgICB2YXIgaSwga2V5LCBrZXlzID0gW10sIGxlbiA9IExPQ0FMX1NUT1JBR0UubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChrZXkgPSBMT0NBTF9TVE9SQUdFLmtleShpKSkubWF0Y2goa2V5TWF0Y2hlcikpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleS5yZXBsYWNlKGtleU1hdGNoZXIsIFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgVHJhbnNwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgcGVuZGluZ1JlcXVlc3RzQ291bnQgPSAwLCBwZW5kaW5nUmVxdWVzdHMgPSB7fSwgbWF4UGVuZGluZ1JlcXVlc3RzID0gNiwgc2hhcmVkQ2FjaGUgPSBuZXcgTHJ1Q2FjaGUoMTApO1xuICAgICAgICBmdW5jdGlvbiBUcmFuc3BvcnQobykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYXN0UmVxID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NlbmQgPSBvLnRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMuX2dldCA9IG8ubGltaXRlciA/IG8ubGltaXRlcih0aGlzLl9nZXQpIDogdGhpcy5fZ2V0O1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBvLmNhY2hlID09PSBmYWxzZSA/IG5ldyBMcnVDYWNoZSgwKSA6IHNoYXJlZENhY2hlO1xuICAgICAgICB9XG4gICAgICAgIFRyYW5zcG9ydC5zZXRNYXhQZW5kaW5nUmVxdWVzdHMgPSBmdW5jdGlvbiBzZXRNYXhQZW5kaW5nUmVxdWVzdHMobnVtKSB7XG4gICAgICAgICAgICBtYXhQZW5kaW5nUmVxdWVzdHMgPSBudW07XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zcG9ydC5yZXNldENhY2hlID0gZnVuY3Rpb24gcmVzZXRDYWNoZSgpIHtcbiAgICAgICAgICAgIHNoYXJlZENhY2hlLnJlc2V0KCk7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oVHJhbnNwb3J0LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX2ZpbmdlcnByaW50OiBmdW5jdGlvbiBmaW5nZXJwcmludChvKSB7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8udXJsICsgby50eXBlICsgJC5wYXJhbShvLmRhdGEgfHwge30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXQ6IGZ1bmN0aW9uKG8sIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBmaW5nZXJwcmludCwganFYaHI7XG4gICAgICAgICAgICAgICAgZmluZ2VycHJpbnQgPSB0aGlzLl9maW5nZXJwcmludChvKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5jZWxsZWQgfHwgZmluZ2VycHJpbnQgIT09IHRoaXMubGFzdFJlcSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChqcVhociA9IHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF0pIHtcbiAgICAgICAgICAgICAgICAgICAganFYaHIuZG9uZShkb25lKS5mYWlsKGZhaWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGVuZGluZ1JlcXVlc3RzQ291bnQgPCBtYXhQZW5kaW5nUmVxdWVzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XSA9IHRoaXMuX3NlbmQobykuZG9uZShkb25lKS5mYWlsKGZhaWwpLmFsd2F5cyhhbHdheXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EZWNrUmVxdWVzdEFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCByZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fY2FjaGUuc2V0KGZpbmdlcnByaW50LCByZXNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmFpbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFsd2F5cygpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm9uRGVja1JlcXVlc3RBcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9nZXQuYXBwbHkodGhhdCwgdGhhdC5vbkRlY2tSZXF1ZXN0QXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uRGVja1JlcXVlc3RBcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKG8sIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3AsIGZpbmdlcnByaW50O1xuICAgICAgICAgICAgICAgIGNiID0gY2IgfHwgJC5ub29wO1xuICAgICAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgICAgICB9IDogbyB8fCB7fTtcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludCA9IHRoaXMuX2ZpbmdlcnByaW50KG8pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UmVxID0gZmluZ2VycHJpbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgPSB0aGlzLl9jYWNoZS5nZXQoZmluZ2VycHJpbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldChvLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFRyYW5zcG9ydDtcbiAgICB9KCk7XG4gICAgdmFyIFNlYXJjaEluZGV4ID0gd2luZG93LlNlYXJjaEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgQ0hJTERSRU4gPSBcImNcIiwgSURTID0gXCJpXCI7XG4gICAgICAgIGZ1bmN0aW9uIFNlYXJjaEluZGV4KG8pIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmRhdHVtVG9rZW5pemVyIHx8ICFvLnF1ZXJ5VG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImRhdHVtVG9rZW5pemVyIGFuZCBxdWVyeVRva2VuaXplciBhcmUgYm90aCByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWRlbnRpZnkgPSBvLmlkZW50aWZ5IHx8IF8uc3RyaW5naWZ5O1xuICAgICAgICAgICAgdGhpcy5kYXR1bVRva2VuaXplciA9IG8uZGF0dW1Ub2tlbml6ZXI7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5VG9rZW5pemVyID0gby5xdWVyeVRva2VuaXplcjtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFNlYXJjaEluZGV4LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgYm9vdHN0cmFwOiBmdW5jdGlvbiBib290c3RyYXAobykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0dW1zID0gby5kYXR1bXM7XG4gICAgICAgICAgICAgICAgdGhpcy50cmllID0gby50cmllO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBkYXRhID0gXy5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFsgZGF0YSBdO1xuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLCBmdW5jdGlvbihkYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQsIHRva2VucztcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXR1bXNbaWQgPSB0aGF0LmlkZW50aWZ5KGRhdHVtKV0gPSBkYXR1bTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gbm9ybWFsaXplVG9rZW5zKHRoYXQuZGF0dW1Ub2tlbml6ZXIoZGF0dW0pKTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlLCBjaGFycywgY2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhhdC50cmllO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnMgPSB0b2tlbi5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCA9IGNoYXJzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVtDSElMRFJFTl1bY2hdIHx8IChub2RlW0NISUxEUkVOXVtjaF0gPSBuZXdOb2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbSURTXS5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLm1hcChpZHMsIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRhdHVtc1tpZF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2gocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHRva2VucywgbWF0Y2hlcztcbiAgICAgICAgICAgICAgICB0b2tlbnMgPSBub3JtYWxpemVUb2tlbnModGhpcy5xdWVyeVRva2VuaXplcihxdWVyeSkpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlLCBjaGFycywgY2gsIGlkcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhhdC50cmllO1xuICAgICAgICAgICAgICAgICAgICBjaGFycyA9IHRva2VuLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAmJiAoY2ggPSBjaGFycy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVbQ0hJTERSRU5dW2NoXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSAmJiBjaGFycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkcyA9IG5vZGVbSURTXS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBtYXRjaGVzID8gZ2V0SW50ZXJzZWN0aW9uKG1hdGNoZXMsIGlkcykgOiBpZHM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcyA/IF8ubWFwKHVuaXF1ZShtYXRjaGVzKSwgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0dW1zW2lkXTtcbiAgICAgICAgICAgICAgICB9KSA6IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gYWxsKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5kYXR1bXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy5kYXR1bXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0dW1zID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy50cmllID0gbmV3Tm9kZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdHVtczogdGhpcy5kYXR1bXMsXG4gICAgICAgICAgICAgICAgICAgIHRyaWU6IHRoaXMudHJpZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gU2VhcmNoSW5kZXg7XG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVRva2Vucyh0b2tlbnMpIHtcbiAgICAgICAgICAgIHRva2VucyA9IF8uZmlsdGVyKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0b2tlbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9rZW5zID0gXy5tYXAodG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5ld05vZGUoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHt9O1xuICAgICAgICAgICAgbm9kZVtJRFNdID0gW107XG4gICAgICAgICAgICBub2RlW0NISUxEUkVOXSA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgc2VlbiA9IHt9LCB1bmlxdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlZW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZW5bYXJyYXlbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlcy5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRJbnRlcnNlY3Rpb24oYXJyYXlBLCBhcnJheUIpIHtcbiAgICAgICAgICAgIHZhciBhaSA9IDAsIGJpID0gMCwgaW50ZXJzZWN0aW9uID0gW107XG4gICAgICAgICAgICBhcnJheUEgPSBhcnJheUEuc29ydCgpO1xuICAgICAgICAgICAgYXJyYXlCID0gYXJyYXlCLnNvcnQoKTtcbiAgICAgICAgICAgIHZhciBsZW5BcnJheUEgPSBhcnJheUEubGVuZ3RoLCBsZW5BcnJheUIgPSBhcnJheUIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGFpIDwgbGVuQXJyYXlBICYmIGJpIDwgbGVuQXJyYXlCKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5QVthaV0gPCBhcnJheUJbYmldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhcnJheUFbYWldID4gYXJyYXlCW2JpXSkge1xuICAgICAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGFycmF5QVthaV0pO1xuICAgICAgICAgICAgICAgICAgICBhaSsrO1xuICAgICAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb247XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIFByZWZldGNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIGRhdGE6IFwiZGF0YVwiLFxuICAgICAgICAgICAgcHJvdG9jb2w6IFwicHJvdG9jb2xcIixcbiAgICAgICAgICAgIHRodW1icHJpbnQ6IFwidGh1bWJwcmludFwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIFByZWZldGNoKG8pIHtcbiAgICAgICAgICAgIHRoaXMudXJsID0gby51cmw7XG4gICAgICAgICAgICB0aGlzLnR0bCA9IG8udHRsO1xuICAgICAgICAgICAgdGhpcy5jYWNoZSA9IG8uY2FjaGU7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMudGh1bWJwcmludCA9IG8udGh1bWJwcmludDtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBQZXJzaXN0ZW50U3RvcmFnZShvLmNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFByZWZldGNoLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3NldHRpbmdzOiBmdW5jdGlvbiBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3JlOiBmdW5jdGlvbiBzdG9yZShkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLmRhdGEsIGRhdGEsIHRoaXMudHRsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMucHJvdG9jb2wsIGxvY2F0aW9uLnByb3RvY29sLCB0aGlzLnR0bCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLnRodW1icHJpbnQsIHRoaXMudGh1bWJwcmludCwgdGhpcy50dGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21DYWNoZTogZnVuY3Rpb24gZnJvbUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdG9yZWQgPSB7fSwgaXNFeHBpcmVkO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RvcmVkLmRhdGEgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc3RvcmVkLnByb3RvY29sID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLnByb3RvY29sKTtcbiAgICAgICAgICAgICAgICBzdG9yZWQudGh1bWJwcmludCA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy50aHVtYnByaW50KTtcbiAgICAgICAgICAgICAgICBpc0V4cGlyZWQgPSBzdG9yZWQudGh1bWJwcmludCAhPT0gdGhpcy50aHVtYnByaW50IHx8IHN0b3JlZC5wcm90b2NvbCAhPT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlZC5kYXRhICYmICFpc0V4cGlyZWQgPyBzdG9yZWQuZGF0YSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbU5ldHdvcms6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBzZXR0aW5ncztcbiAgICAgICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLnByZXBhcmUodGhpcy5fc2V0dGluZ3MoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQoc2V0dGluZ3MpLmZhaWwob25FcnJvcikuZG9uZShvblJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNwb25zZShyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHRoYXQudHJhbnNmb3JtKHJlc3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByZWZldGNoO1xuICAgIH0oKTtcbiAgICB2YXIgUmVtb3RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBSZW1vdGUobykge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBvLnVybDtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gby50cmFuc2Zvcm07XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG5ldyBUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIGNhY2hlOiBvLmNhY2hlLFxuICAgICAgICAgICAgICAgIGxpbWl0ZXI6IG8ubGltaXRlcixcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG8udHJhbnNwb3J0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFJlbW90ZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9zZXR0aW5nczogZnVuY3Rpb24gc2V0dGluZ3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChxdWVyeSwgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHNldHRpbmdzO1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5IHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLnByZXBhcmUocXVlcnksIHRoaXMuX3NldHRpbmdzKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5nZXQoc2V0dGluZ3MsIG9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVzcG9uc2UoZXJyLCByZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVyciA/IGNiKFtdKSA6IGNiKHRoYXQudHJhbnNmb3JtKHJlc3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsTGFzdFJlcXVlc3Q6IGZ1bmN0aW9uIGNhbmNlbExhc3RSZXF1ZXN0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFJlbW90ZTtcbiAgICB9KCk7XG4gICAgdmFyIG9QYXJzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBwYXJzZShvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMsIHNvcnRlcjtcbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemU6IHRydWUsXG4gICAgICAgICAgICAgICAgaWRlbnRpZnk6IF8uc3RyaW5naWZ5LFxuICAgICAgICAgICAgICAgIGRhdHVtVG9rZW5pemVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VG9rZW5pemVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHN1ZmZpY2llbnQ6IDUsXG4gICAgICAgICAgICAgICAgc29ydGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGxvY2FsOiBbXSxcbiAgICAgICAgICAgICAgICBwcmVmZXRjaDogbnVsbCxcbiAgICAgICAgICAgICAgICByZW1vdGU6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyB8fCB7fSk7XG4gICAgICAgICAgICAhby5kYXR1bVRva2VuaXplciAmJiAkLmVycm9yKFwiZGF0dW1Ub2tlbml6ZXIgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICAhby5xdWVyeVRva2VuaXplciAmJiAkLmVycm9yKFwicXVlcnlUb2tlbml6ZXIgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICBzb3J0ZXIgPSBvLnNvcnRlcjtcbiAgICAgICAgICAgIG8uc29ydGVyID0gc29ydGVyID8gZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4LnNvcnQoc29ydGVyKTtcbiAgICAgICAgICAgIH0gOiBfLmlkZW50aXR5O1xuICAgICAgICAgICAgby5sb2NhbCA9IF8uaXNGdW5jdGlvbihvLmxvY2FsKSA/IG8ubG9jYWwoKSA6IG8ubG9jYWw7XG4gICAgICAgICAgICBvLnByZWZldGNoID0gcGFyc2VQcmVmZXRjaChvLnByZWZldGNoKTtcbiAgICAgICAgICAgIG8ucmVtb3RlID0gcGFyc2VSZW1vdGUoby5yZW1vdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUHJlZmV0Y2gobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzO1xuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgdHRsOiAyNCAqIDYwICogNjAgKiAxZTMsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FjaGVLZXk6IG51bGwsXG4gICAgICAgICAgICAgICAgdGh1bWJwcmludDogXCJcIixcbiAgICAgICAgICAgICAgICBwcmVwYXJlOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgIH0gOiBvO1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgIW8udXJsICYmICQuZXJyb3IoXCJwcmVmZXRjaCByZXF1aXJlcyB1cmwgdG8gYmUgc2V0XCIpO1xuICAgICAgICAgICAgby50cmFuc2Zvcm0gPSBvLmZpbHRlciB8fCBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG8uY2FjaGVLZXkgPSBvLmNhY2hlS2V5IHx8IG8udXJsO1xuICAgICAgICAgICAgby50aHVtYnByaW50ID0gVkVSU0lPTiArIG8udGh1bWJwcmludDtcbiAgICAgICAgICAgIG8udHJhbnNwb3J0ID0gby50cmFuc3BvcnQgPyBjYWxsYmFja1RvRGVmZXJyZWQoby50cmFuc3BvcnQpIDogJC5hamF4O1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VSZW1vdGUobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzO1xuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXBhcmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVwbGFjZTogbnVsbCxcbiAgICAgICAgICAgICAgICB3aWxkY2FyZDogbnVsbCxcbiAgICAgICAgICAgICAgICBsaW1pdGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHJhdGVMaW1pdEJ5OiBcImRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgcmF0ZUxpbWl0V2FpdDogMzAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgIH0gOiBvO1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgIW8udXJsICYmICQuZXJyb3IoXCJyZW1vdGUgcmVxdWlyZXMgdXJsIHRvIGJlIHNldFwiKTtcbiAgICAgICAgICAgIG8udHJhbnNmb3JtID0gby5maWx0ZXIgfHwgby50cmFuc2Zvcm07XG4gICAgICAgICAgICBvLnByZXBhcmUgPSB0b1JlbW90ZVByZXBhcmUobyk7XG4gICAgICAgICAgICBvLmxpbWl0ZXIgPSB0b0xpbWl0ZXIobyk7XG4gICAgICAgICAgICBvLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0ID8gY2FsbGJhY2tUb0RlZmVycmVkKG8udHJhbnNwb3J0KSA6ICQuYWpheDtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJlcGxhY2U7XG4gICAgICAgICAgICBkZWxldGUgby53aWxkY2FyZDtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJhdGVMaW1pdEJ5O1xuICAgICAgICAgICAgZGVsZXRlIG8ucmF0ZUxpbWl0V2FpdDtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvUmVtb3RlUHJlcGFyZShvKSB7XG4gICAgICAgICAgICB2YXIgcHJlcGFyZSwgcmVwbGFjZSwgd2lsZGNhcmQ7XG4gICAgICAgICAgICBwcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgcmVwbGFjZSA9IG8ucmVwbGFjZTtcbiAgICAgICAgICAgIHdpbGRjYXJkID0gby53aWxkY2FyZDtcbiAgICAgICAgICAgIGlmIChwcmVwYXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXBhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBwcmVwYXJlQnlSZXBsYWNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvLndpbGRjYXJkKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IHByZXBhcmVCeVdpbGRjYXJkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gaWRlbml0eVByZXBhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlcGFyZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXBhcmVCeVJlcGxhY2UocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudXJsID0gcmVwbGFjZShzZXR0aW5ncy51cmwsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnlXaWxkY2FyZChxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSBzZXR0aW5ncy51cmwucmVwbGFjZSh3aWxkY2FyZCwgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaWRlbml0eVByZXBhcmUocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvTGltaXRlcihvKSB7XG4gICAgICAgICAgICB2YXIgbGltaXRlciwgbWV0aG9kLCB3YWl0O1xuICAgICAgICAgICAgbGltaXRlciA9IG8ubGltaXRlcjtcbiAgICAgICAgICAgIG1ldGhvZCA9IG8ucmF0ZUxpbWl0Qnk7XG4gICAgICAgICAgICB3YWl0ID0gby5yYXRlTGltaXRXYWl0O1xuICAgICAgICAgICAgaWYgKCFsaW1pdGVyKSB7XG4gICAgICAgICAgICAgICAgbGltaXRlciA9IC9edGhyb3R0bGUkL2kudGVzdChtZXRob2QpID8gdGhyb3R0bGUod2FpdCkgOiBkZWJvdW5jZSh3YWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW1pdGVyO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGVib3VuY2Uod2FpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5kZWJvdW5jZShmbiwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRocm90dGxlKHdhaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGUoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8udGhyb3R0bGUoZm4sIHdhaXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FsbGJhY2tUb0RlZmVycmVkKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlcihvKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGZuKG8sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBCbG9vZGhvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgb2xkO1xuICAgICAgICBvbGQgPSB3aW5kb3cgJiYgd2luZG93LkJsb29kaG91bmQ7XG4gICAgICAgIGZ1bmN0aW9uIEJsb29kaG91bmQobykge1xuICAgICAgICAgICAgbyA9IG9QYXJzZXIobyk7XG4gICAgICAgICAgICB0aGlzLnNvcnRlciA9IG8uc29ydGVyO1xuICAgICAgICAgICAgdGhpcy5pZGVudGlmeSA9IG8uaWRlbnRpZnk7XG4gICAgICAgICAgICB0aGlzLnN1ZmZpY2llbnQgPSBvLnN1ZmZpY2llbnQ7XG4gICAgICAgICAgICB0aGlzLmxvY2FsID0gby5sb2NhbDtcbiAgICAgICAgICAgIHRoaXMucmVtb3RlID0gby5yZW1vdGUgPyBuZXcgUmVtb3RlKG8ucmVtb3RlKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLnByZWZldGNoID0gby5wcmVmZXRjaCA/IG5ldyBQcmVmZXRjaChvLnByZWZldGNoKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gbmV3IFNlYXJjaEluZGV4KHtcbiAgICAgICAgICAgICAgICBpZGVudGlmeTogdGhpcy5pZGVudGlmeSxcbiAgICAgICAgICAgICAgICBkYXR1bVRva2VuaXplcjogby5kYXR1bVRva2VuaXplcixcbiAgICAgICAgICAgICAgICBxdWVyeVRva2VuaXplcjogby5xdWVyeVRva2VuaXplclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvLmluaXRpYWxpemUgIT09IGZhbHNlICYmIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIEJsb29kaG91bmQubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgICAgICB3aW5kb3cgJiYgKHdpbmRvdy5CbG9vZGhvdW5kID0gb2xkKTtcbiAgICAgICAgICAgIHJldHVybiBCbG9vZGhvdW5kO1xuICAgICAgICB9O1xuICAgICAgICBCbG9vZGhvdW5kLnRva2VuaXplcnMgPSB0b2tlbml6ZXJzO1xuICAgICAgICBfLm1peGluKEJsb29kaG91bmQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfX3R0QWRhcHRlcjogZnVuY3Rpb24gdHRBZGFwdGVyKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGUgPyB3aXRoQXN5bmMgOiB3aXRob3V0QXN5bmM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd2l0aEFzeW5jKHF1ZXJ5LCBzeW5jLCBhc3luYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zZWFyY2gocXVlcnksIHN5bmMsIGFzeW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd2l0aG91dEFzeW5jKHF1ZXJ5LCBzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNlYXJjaChxdWVyeSwgc3luYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9sb2FkUHJlZmV0Y2g6IGZ1bmN0aW9uIGxvYWRQcmVmZXRjaCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGRlZmVycmVkLCBzZXJpYWxpemVkO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmVmZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpYWxpemVkID0gdGhpcy5wcmVmZXRjaC5mcm9tQ2FjaGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4LmJvb3RzdHJhcChzZXJpYWxpemVkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZmV0Y2guZnJvbU5ldHdvcmsoZG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnByZWZldGNoLnN0b3JlKHRoYXQuaW5kZXguc2VyaWFsaXplKCkpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICh0aGlzLmluaXRQcm9taXNlID0gdGhpcy5fbG9hZFByZWZldGNoKCkpLmRvbmUoYWRkTG9jYWxUb0luZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRMb2NhbFRvSW5kZXgoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKHRoYXQubG9jYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmluaXRQcm9taXNlIHx8IGZvcmNlID8gdGhpcy5faW5pdGlhbGl6ZSgpIDogdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5hZGQoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWRzKSB7XG4gICAgICAgICAgICAgICAgaWRzID0gXy5pc0FycmF5KGlkcykgPyBpZHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXguZ2V0KGlkcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2gocXVlcnksIHN5bmMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBsb2NhbDtcbiAgICAgICAgICAgICAgICBsb2NhbCA9IHRoaXMuc29ydGVyKHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgc3luYyh0aGlzLnJlbW90ZSA/IGxvY2FsLnNsaWNlKCkgOiBsb2NhbCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlICYmIGxvY2FsLmxlbmd0aCA8IHRoaXMuc3VmZmljaWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5nZXQocXVlcnksIHByb2Nlc3NSZW1vdGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGUuY2FuY2VsTGFzdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc1JlbW90ZShyZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vbkR1cGxpY2F0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHJlbW90ZSwgZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgICAgICAgIV8uc29tZShsb2NhbCwgZnVuY3Rpb24obCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlkZW50aWZ5KHIpID09PSB0aGF0LmlkZW50aWZ5KGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkgJiYgbm9uRHVwbGljYXRlcy5wdXNoKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgJiYgYXN5bmMobm9uRHVwbGljYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gYWxsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4LmFsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJQcmVmZXRjaENhY2hlOiBmdW5jdGlvbiBjbGVhclByZWZldGNoQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaCAmJiB0aGlzLnByZWZldGNoLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJSZW1vdGVDYWNoZTogZnVuY3Rpb24gY2xlYXJSZW1vdGVDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICBUcmFuc3BvcnQucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR0QWRhcHRlcjogZnVuY3Rpb24gdHRBZGFwdGVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdHRBZGFwdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQmxvb2Rob3VuZDtcbiAgICB9KCk7XG4gICAgcmV0dXJuIEJsb29kaG91bmQ7XG59KTtcblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFwidHlwZWFoZWFkLmpzXCIsIFsgXCJqcXVlcnlcIiBdLCBmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkoYTApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oJCkge1xuICAgIHZhciBfID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNc2llOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSlbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0JsYW5rU3RyaW5nOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FycmF5OiAkLmlzQXJyYXksXG4gICAgICAgICAgICBpc0Z1bmN0aW9uOiAkLmlzRnVuY3Rpb24sXG4gICAgICAgICAgICBpc09iamVjdDogJC5pc1BsYWluT2JqZWN0LFxuICAgICAgICAgICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSlF1ZXJ5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgJDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHMpIHx8IHMgPT09IG51bGwgPyBcIlwiIDogcyArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogJC5wcm94eSxcbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogJC5tYXAsXG4gICAgICAgICAgICBmaWx0ZXI6ICQuZ3JlcCxcbiAgICAgICAgICAgIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29tZTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbjogJC5leHRlbmQsXG4gICAgICAgICAgICBpZGVudGl0eTogZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SWRHZW5lcmF0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob2JqKSA/IG9iaiA6IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzLCBsYXRlciwgY2FsbE5vdztcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRocm90dGxlOiBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQsIHJlc3VsdCwgcHJldmlvdXMsIGxhdGVyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKSwgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1N0cmluZyh2YWwpID8gdmFsIDogSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSgpO1xuICAgIHZhciBXV1cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBkZWZhdWx0Q2xhc3NOYW1lcyA9IHtcbiAgICAgICAgICAgIHdyYXBwZXI6IFwidHdpdHRlci10eXBlYWhlYWRcIixcbiAgICAgICAgICAgIGlucHV0OiBcInR0LWlucHV0XCIsXG4gICAgICAgICAgICBoaW50OiBcInR0LWhpbnRcIixcbiAgICAgICAgICAgIG1lbnU6IFwidHQtbWVudVwiLFxuICAgICAgICAgICAgZGF0YXNldDogXCJ0dC1kYXRhc2V0XCIsXG4gICAgICAgICAgICBzdWdnZXN0aW9uOiBcInR0LXN1Z2dlc3Rpb25cIixcbiAgICAgICAgICAgIHNlbGVjdGFibGU6IFwidHQtc2VsZWN0YWJsZVwiLFxuICAgICAgICAgICAgZW1wdHk6IFwidHQtZW1wdHlcIixcbiAgICAgICAgICAgIG9wZW46IFwidHQtb3BlblwiLFxuICAgICAgICAgICAgY3Vyc29yOiBcInR0LWN1cnNvclwiLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBcInR0LWhpZ2hsaWdodFwiXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWlsZDtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGQobykge1xuICAgICAgICAgICAgdmFyIHd3dywgY2xhc3NlcztcbiAgICAgICAgICAgIGNsYXNzZXMgPSBfLm1peGluKHt9LCBkZWZhdWx0Q2xhc3NOYW1lcywgbyk7XG4gICAgICAgICAgICB3d3cgPSB7XG4gICAgICAgICAgICAgICAgY3NzOiBidWlsZENzcygpLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgaHRtbDogYnVpbGRIdG1sKGNsYXNzZXMpLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yczogYnVpbGRTZWxlY3RvcnMoY2xhc3NlcylcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNzczogd3d3LmNzcyxcbiAgICAgICAgICAgICAgICBodG1sOiB3d3cuaHRtbCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB3d3cuY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnM6IHd3dy5zZWxlY3RvcnMsXG4gICAgICAgICAgICAgICAgbWl4aW46IGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgXy5taXhpbihvLCB3d3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRIdG1sKGMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlcjogJzxzcGFuIGNsYXNzPVwiJyArIGMud3JhcHBlciArICdcIj48L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBtZW51OiAnPGRpdiBjbGFzcz1cIicgKyBjLm1lbnUgKyAnXCI+PC9kaXY+J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZFNlbGVjdG9ycyhjbGFzc2VzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JzID0ge307XG4gICAgICAgICAgICBfLmVhY2goY2xhc3NlcywgZnVuY3Rpb24odiwgaykge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yc1trXSA9IFwiLlwiICsgdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9ycztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZENzcygpIHtcbiAgICAgICAgICAgIHZhciBjc3MgPSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlcjoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBcIjFcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0V2l0aE5vSGludDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcInRvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZW51OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsdHI6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBcImF1dG9cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcnRsOiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogXCIgMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChfLmlzTXNpZSgpKSB7XG4gICAgICAgICAgICAgICAgXy5taXhpbihjc3MuaW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcInVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcpXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjc3M7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIEV2ZW50QnVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgbmFtZXNwYWNlLCBkZXByZWNhdGlvbk1hcDtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJ0eXBlYWhlYWQ6XCI7XG4gICAgICAgIGRlcHJlY2F0aW9uTWFwID0ge1xuICAgICAgICAgICAgcmVuZGVyOiBcInJlbmRlcmVkXCIsXG4gICAgICAgICAgICBjdXJzb3JjaGFuZ2U6IFwiY3Vyc29yY2hhbmdlZFwiLFxuICAgICAgICAgICAgc2VsZWN0OiBcInNlbGVjdGVkXCIsXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IFwiYXV0b2NvbXBsZXRlZFwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50QnVzKG8pIHtcbiAgICAgICAgICAgIGlmICghbyB8fCAhby5lbCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJFdmVudEJ1cyBpbml0aWFsaXplZCB3aXRob3V0IGVsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKG8uZWwpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oRXZlbnRCdXMucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfdHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgYXJncykge1xuICAgICAgICAgICAgICAgIHZhciAkZTtcbiAgICAgICAgICAgICAgICAkZSA9ICQuRXZlbnQobmFtZXNwYWNlICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgKGFyZ3MgPSBhcmdzIHx8IFtdKS51bnNoaWZ0KCRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VyLmFwcGx5KHRoaXMuJGVsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVmb3JlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MsICRlO1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgJGUgPSB0aGlzLl90cmlnZ2VyKFwiYmVmb3JlXCIgKyB0eXBlLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGUuaXNEZWZhdWx0UHJldmVudGVkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXByZWNhdGVkVHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKHR5cGUsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHJlY2F0ZWRUeXBlID0gZGVwcmVjYXRpb25NYXBbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcihkZXByZWNhdGVkVHlwZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnRCdXM7XG4gICAgfSgpO1xuICAgIHZhciBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzcGxpdHRlciA9IC9cXHMrLywgbmV4dFRpY2sgPSBnZXROZXh0VGljaygpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TeW5jOiBvblN5bmMsXG4gICAgICAgICAgICBvbkFzeW5jOiBvbkFzeW5jLFxuICAgICAgICAgICAgb2ZmOiBvZmYsXG4gICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uKG1ldGhvZCwgdHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgY2IgPSBjb250ZXh0ID8gYmluZENvbnRleHQoY2IsIGNvbnRleHQpIDogY2I7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV0gPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0gfHwge1xuICAgICAgICAgICAgICAgICAgICBzeW5jOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV1bbWV0aG9kXS5wdXNoKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uQXN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gb24uY2FsbCh0aGlzLCBcImFzeW5jXCIsIHR5cGVzLCBjYiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25TeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uLmNhbGwodGhpcywgXCJzeW5jXCIsIHR5cGVzLCBjYiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb2ZmKHR5cGVzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbdHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0cmlnZ2VyKHR5cGVzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSwgY2FsbGJhY2tzLCBhcmdzLCBzeW5jRmx1c2gsIGFzeW5jRmx1c2g7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgd2hpbGUgKCh0eXBlID0gdHlwZXMuc2hpZnQoKSkgJiYgKGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICBzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3Muc3luYywgdGhpcywgWyB0eXBlIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBhc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLmFzeW5jLCB0aGlzLCBbIHR5cGUgXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIHN5bmNGbHVzaCgpICYmIG5leHRUaWNrKGFzeW5jRmx1c2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0Rmx1c2goY2FsbGJhY2tzLCBjb250ZXh0LCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmx1c2g7XG4gICAgICAgICAgICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FuY2VsbGVkO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyAhY2FuY2VsbGVkICYmIGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQgPSBjYWxsYmFja3NbaV0uYXBwbHkoY29udGV4dCwgYXJncykgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWNhbmNlbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXROZXh0VGljaygpIHtcbiAgICAgICAgICAgIHZhciBuZXh0VGlja0ZuO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBuZXh0VGlja0ZuID0gZnVuY3Rpb24gbmV4dFRpY2tTZXRJbW1lZGlhdGUoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpY2tGbiA9IGZ1bmN0aW9uIG5leHRUaWNrU2V0VGltZW91dChmbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0VGlja0ZuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJpbmRDb250ZXh0KGZuLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYmluZCA/IGZuLmJpbmQoY29udGV4dCkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShjb250ZXh0LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgaGlnaGxpZ2h0ID0gZnVuY3Rpb24oZG9jKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBub2RlOiBudWxsLFxuICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgIHRhZ05hbWU6IFwic3Ryb25nXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICB3b3Jkc09ubHk6IGZhbHNlLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGhpZ2h0bGlnaHQobykge1xuICAgICAgICAgICAgdmFyIHJlZ2V4O1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oe30sIGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgIGlmICghby5ub2RlIHx8ICFvLnBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnBhdHRlcm4gPSBfLmlzQXJyYXkoby5wYXR0ZXJuKSA/IG8ucGF0dGVybiA6IFsgby5wYXR0ZXJuIF07XG4gICAgICAgICAgICByZWdleCA9IGdldFJlZ2V4KG8ucGF0dGVybiwgby5jYXNlU2Vuc2l0aXZlLCBvLndvcmRzT25seSk7XG4gICAgICAgICAgICB0cmF2ZXJzZShvLm5vZGUsIGhpZ2h0bGlnaHRUZXh0Tm9kZSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBoaWdodGxpZ2h0VGV4dE5vZGUodGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2gsIHBhdHRlcm5Ob2RlLCB3cmFwcGVyTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSByZWdleC5leGVjKHRleHROb2RlLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50YWdOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgby5jbGFzc05hbWUgJiYgKHdyYXBwZXJOb2RlLmNsYXNzTmFtZSA9IG8uY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybk5vZGUgPSB0ZXh0Tm9kZS5zcGxpdFRleHQobWF0Y2guaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuTm9kZS5zcGxpdFRleHQobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlck5vZGUuYXBwZW5kQ2hpbGQocGF0dGVybk5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlck5vZGUsIHBhdHRlcm5Ob2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhbWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0cmF2ZXJzZShlbCwgaGlnaHRsaWdodFRleHROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSwgVEVYVF9OT0RFX1RZUEUgPSAzO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGUgPSBlbC5jaGlsZE5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2RlLm5vZGVUeXBlID09PSBURVhUX05PREVfVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSBoaWdodGxpZ2h0VGV4dE5vZGUoY2hpbGROb2RlKSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhdmVyc2UoY2hpbGROb2RlLCBoaWdodGxpZ2h0VGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRSZWdleChwYXR0ZXJucywgY2FzZVNlbnNpdGl2ZSwgd29yZHNPbmx5KSB7XG4gICAgICAgICAgICB2YXIgZXNjYXBlZFBhdHRlcm5zID0gW10sIHJlZ2V4U3RyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdHRlcm5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXNjYXBlZFBhdHRlcm5zLnB1c2goXy5lc2NhcGVSZWdFeENoYXJzKHBhdHRlcm5zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdleFN0ciA9IHdvcmRzT25seSA/IFwiXFxcXGIoXCIgKyBlc2NhcGVkUGF0dGVybnMuam9pbihcInxcIikgKyBcIilcXFxcYlwiIDogXCIoXCIgKyBlc2NhcGVkUGF0dGVybnMuam9pbihcInxcIikgKyBcIilcIjtcbiAgICAgICAgICAgIHJldHVybiBjYXNlU2Vuc2l0aXZlID8gbmV3IFJlZ0V4cChyZWdleFN0cikgOiBuZXcgUmVnRXhwKHJlZ2V4U3RyLCBcImlcIik7XG4gICAgICAgIH1cbiAgICB9KHdpbmRvdy5kb2N1bWVudCk7XG4gICAgdmFyIElucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3BlY2lhbEtleUNvZGVNYXA7XG4gICAgICAgIHNwZWNpYWxLZXlDb2RlTWFwID0ge1xuICAgICAgICAgICAgOTogXCJ0YWJcIixcbiAgICAgICAgICAgIDI3OiBcImVzY1wiLFxuICAgICAgICAgICAgMzc6IFwibGVmdFwiLFxuICAgICAgICAgICAgMzk6IFwicmlnaHRcIixcbiAgICAgICAgICAgIDEzOiBcImVudGVyXCIsXG4gICAgICAgICAgICAzODogXCJ1cFwiLFxuICAgICAgICAgICAgNDA6IFwiZG93blwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIElucHV0KG8sIHd3dykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiaW5wdXQgaXMgbWlzc2luZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJGhpbnQgPSAkKG8uaGludCk7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dCA9ICQoby5pbnB1dCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQgPSB0aGlzLmhhc0ZvY3VzKCkgPyB0aGlzLnF1ZXJ5IDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyID0gYnVpbGRPdmVyZmxvd0hlbHBlcih0aGlzLiRpbnB1dCk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAodGhpcy4kaGludC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpbnQgPSB0aGlzLmdldEhpbnQgPSB0aGlzLmNsZWFySGludCA9IHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkID0gXy5ub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIElucHV0Lm5vcm1hbGl6ZVF1ZXJ5ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gXy50b1N0cihzdHIpLnJlcGxhY2UoL15cXHMqL2csIFwiXCIpLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKElucHV0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb25CbHVyOiBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJibHVycmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkZvY3VzOiBmdW5jdGlvbiBvbkZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlXaGVuRm9jdXNlZCA9IHRoaXMucXVlcnk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25LZXlkb3duOiBmdW5jdGlvbiBvbktleWRvd24oJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5TmFtZSA9IHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5TmFtZSAmJiB0aGlzLl9zaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoa2V5TmFtZSArIFwiS2V5ZWRcIiwgJGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25JbnB1dDogZnVuY3Rpb24gb25JbnB1dCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRRdWVyeSh0aGlzLmdldElucHV0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckhpbnRJZkludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX21hbmFnZVByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiBtYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Nob3VsZFRyaWdnZXI6IGZ1bmN0aW9uIHNob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlcjtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0YWJcIjpcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jaGVja0xhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBjaGVja0xhbmd1YWdlRGlyZWN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAodGhpcy4kaW5wdXQuY3NzKFwiZGlyZWN0aW9uXCIpIHx8IFwibHRyXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQuYXR0cihcImRpclwiLCBkaXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJsYW5nRGlyQ2hhbmdlZFwiLCBkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHZhbCwgc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZUVxdWl2YWxlbnQsIGhhc0RpZmZlcmVudFdoaXRlc3BhY2U7XG4gICAgICAgICAgICAgICAgYXJlRXF1aXZhbGVudCA9IGFyZVF1ZXJpZXNFcXVpdmFsZW50KHZhbCwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSA9IGFyZUVxdWl2YWxlbnQgPyB0aGlzLnF1ZXJ5Lmxlbmd0aCAhPT0gdmFsLmxlbmd0aCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKCFzaWxlbnQgJiYgIWFyZUVxdWl2YWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicXVlcnlDaGFuZ2VkXCIsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNpbGVudCAmJiBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcIndoaXRlc3BhY2VDaGFuZ2VkXCIsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIG9uQmx1ciwgb25Gb2N1cywgb25LZXlkb3duLCBvbklucHV0O1xuICAgICAgICAgICAgICAgIG9uQmx1ciA9IF8uYmluZCh0aGlzLl9vbkJsdXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uRm9jdXMgPSBfLmJpbmQodGhpcy5fb25Gb2N1cywgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25LZXlkb3duID0gXy5iaW5kKHRoaXMuX29uS2V5ZG93biwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25JbnB1dCA9IF8uYmluZCh0aGlzLl9vbklucHV0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImJsdXIudHRcIiwgb25CbHVyKS5vbihcImZvY3VzLnR0XCIsIG9uRm9jdXMpLm9uKFwia2V5ZG93bi50dFwiLCBvbktleWRvd24pO1xuICAgICAgICAgICAgICAgIGlmICghXy5pc01zaWUoKSB8fCBfLmlzTXNpZSgpID4gOSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImlucHV0LnR0XCIsIG9uSW5wdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwia2V5ZG93bi50dCBrZXlwcmVzcy50dCBjdXQudHQgcGFzdGUudHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoXy5iaW5kKHRoYXQuX29uSW5wdXQsIHRoYXQsICRlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LmJsdXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYW5nRGlyOiBmdW5jdGlvbiBnZXRMYW5nRGlyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRRdWVyeTogZnVuY3Rpb24gZ2V0UXVlcnkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkgfHwgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkodmFsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRRdWVyeSh2YWwsIHNpbGVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXM6IGZ1bmN0aW9uIGhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5ICE9PSB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckhpbnRJZkludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiByZXNldElucHV0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEhpbnQ6IGZ1bmN0aW9uIGdldEhpbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhpbnQudmFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGludDogZnVuY3Rpb24gc2V0SGludCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQudmFsKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhpbnQ6IGZ1bmN0aW9uIGNsZWFySGludCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpbnQoXCJcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIaW50SWZJbnZhbGlkOiBmdW5jdGlvbiBjbGVhckhpbnRJZkludmFsaWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCwgaGludCwgdmFsSXNQcmVmaXhPZkhpbnQsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaGludCA9IHRoaXMuZ2V0SGludCgpO1xuICAgICAgICAgICAgICAgIHZhbElzUHJlZml4T2ZIaW50ID0gdmFsICE9PSBoaW50ICYmIGhpbnQuaW5kZXhPZih2YWwpID09PSAwO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB2YWwgIT09IFwiXCIgJiYgdmFsSXNQcmVmaXhPZkhpbnQgJiYgIXRoaXMuaGFzT3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICAhaXNWYWxpZCAmJiB0aGlzLmNsZWFySGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0ZvY3VzOiBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5wdXQuaXMoXCI6Zm9jdXNcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzT3ZlcmZsb3c6IGZ1bmN0aW9uIGhhc092ZXJmbG93KCkge1xuICAgICAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gdGhpcy4kaW5wdXQud2lkdGgoKSAtIDI7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIudGV4dCh0aGlzLmdldElucHV0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG92ZXJmbG93SGVscGVyLndpZHRoKCkgPj0gY29uc3RyYWludDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0N1cnNvckF0RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVMZW5ndGgsIHNlbGVjdGlvblN0YXJ0LCByYW5nZTtcbiAgICAgICAgICAgICAgICB2YWx1ZUxlbmd0aCA9IHRoaXMuJGlucHV0LnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHRoaXMuJGlucHV0WzBdLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKHNlbGVjdGlvblN0YXJ0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uU3RhcnQgPT09IHZhbHVlTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCAtdmFsdWVMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVMZW5ndGggPT09IHJhbmdlLnRleHQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50ID0gdGhpcy4kaW5wdXQgPSB0aGlzLiRvdmVyZmxvd0hlbHBlciA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBJbnB1dDtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRPdmVyZmxvd0hlbHBlcigkaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiAkKCc8cHJlIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvcHJlPicpLmNzcyh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6IFwicHJlXCIsXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogJGlucHV0LmNzcyhcImZvbnQtZmFtaWx5XCIpLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAkaW5wdXQuY3NzKFwiZm9udC1zaXplXCIpLFxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJGlucHV0LmNzcyhcImZvbnQtc3R5bGVcIiksXG4gICAgICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICRpbnB1dC5jc3MoXCJmb250LXZhcmlhbnRcIiksXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJGlucHV0LmNzcyhcImZvbnQtd2VpZ2h0XCIpLFxuICAgICAgICAgICAgICAgIHdvcmRTcGFjaW5nOiAkaW5wdXQuY3NzKFwid29yZC1zcGFjaW5nXCIpLFxuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICRpbnB1dC5jc3MoXCJsZXR0ZXItc3BhY2luZ1wiKSxcbiAgICAgICAgICAgICAgICB0ZXh0SW5kZW50OiAkaW5wdXQuY3NzKFwidGV4dC1pbmRlbnRcIiksXG4gICAgICAgICAgICAgICAgdGV4dFJlbmRlcmluZzogJGlucHV0LmNzcyhcInRleHQtcmVuZGVyaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICRpbnB1dC5jc3MoXCJ0ZXh0LXRyYW5zZm9ybVwiKVxuICAgICAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcmVRdWVyaWVzRXF1aXZhbGVudChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXQubm9ybWFsaXplUXVlcnkoYSkgPT09IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdpdGhNb2RpZmllcigkZSkge1xuICAgICAgICAgICAgcmV0dXJuICRlLmFsdEtleSB8fCAkZS5jdHJsS2V5IHx8ICRlLm1ldGFLZXkgfHwgJGUuc2hpZnRLZXk7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIERhdGFzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBrZXlzLCBuYW1lR2VuZXJhdG9yO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgdmFsOiBcInR0LXNlbGVjdGFibGUtZGlzcGxheVwiLFxuICAgICAgICAgICAgb2JqOiBcInR0LXNlbGVjdGFibGUtb2JqZWN0XCJcbiAgICAgICAgfTtcbiAgICAgICAgbmFtZUdlbmVyYXRvciA9IF8uZ2V0SWRHZW5lcmF0b3IoKTtcbiAgICAgICAgZnVuY3Rpb24gRGF0YXNldChvLCB3d3cpIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgby50ZW1wbGF0ZXMgPSBvLnRlbXBsYXRlcyB8fCB7fTtcbiAgICAgICAgICAgIG8udGVtcGxhdGVzLm5vdEZvdW5kID0gby50ZW1wbGF0ZXMubm90Rm91bmQgfHwgby50ZW1wbGF0ZXMuZW1wdHk7XG4gICAgICAgICAgICBpZiAoIW8uc291cmNlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3Npbmcgc291cmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8ubmFtZSAmJiAhaXNWYWxpZE5hbWUoby5uYW1lKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJpbnZhbGlkIGRhdGFzZXQgbmFtZTogXCIgKyBvLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgPSAhIW8uaGlnaGxpZ2h0O1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gby5uYW1lIHx8IG5hbWVHZW5lcmF0b3IoKTtcbiAgICAgICAgICAgIHRoaXMubGltaXQgPSBvLmxpbWl0IHx8IDU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlGbiA9IGdldERpc3BsYXlGbihvLmRpc3BsYXkgfHwgby5kaXNwbGF5S2V5KTtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVzID0gZ2V0VGVtcGxhdGVzKG8udGVtcGxhdGVzLCB0aGlzLmRpc3BsYXlGbik7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IG8uc291cmNlLl9fdHRBZGFwdGVyID8gby5zb3VyY2UuX190dEFkYXB0ZXIoKSA6IG8uc291cmNlO1xuICAgICAgICAgICAgdGhpcy5hc3luYyA9IF8uaXNVbmRlZmluZWQoby5hc3luYykgPyB0aGlzLnNvdXJjZS5sZW5ndGggPiAyIDogISFvLmFzeW5jO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKG8ubm9kZSkuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmRhdGFzZXQpLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5kYXRhc2V0ICsgXCItXCIgKyB0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIERhdGFzZXQuZXh0cmFjdERhdGEgPSBmdW5jdGlvbiBleHRyYWN0RGF0YShlbCkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgaWYgKCRlbC5kYXRhKGtleXMub2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbDogJGVsLmRhdGEoa2V5cy52YWwpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iajogJGVsLmRhdGEoa2V5cy5vYmopIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oRGF0YXNldC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX292ZXJ3cml0ZTogZnVuY3Rpb24gb3ZlcndyaXRlKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hc3luYyAmJiB0aGlzLnRlbXBsYXRlcy5wZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclBlbmRpbmcocXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuYXN5bmMgJiYgdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQocXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VtcHR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInJlbmRlcmVkXCIsIHRoaXMubmFtZSwgc3VnZ2VzdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuJGxhc3RTdWdnZXN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmRTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy4kbGFzdFN1Z2dlc3Rpb24ubGVuZ3RoICYmIHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicmVuZGVyZWRcIiwgdGhpcy5uYW1lLCBzdWdnZXN0aW9ucywgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiByZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGZyYWdtZW50O1xuICAgICAgICAgICAgICAgICRmcmFnbWVudCA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICRmcmFnbWVudC5jaGlsZHJlbigpLmxhc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5odG1sKCRmcmFnbWVudCkucHJlcGVuZCh0aGlzLl9nZXRIZWFkZXIocXVlcnksIHN1Z2dlc3Rpb25zKSkuYXBwZW5kKHRoaXMuX2dldEZvb3RlcihxdWVyeSwgc3VnZ2VzdGlvbnMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYXBwZW5kU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIGFwcGVuZFN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkZnJhZ21lbnQsICRsYXN0U3VnZ2VzdGlvbjtcbiAgICAgICAgICAgICAgICAkZnJhZ21lbnQgPSB0aGlzLl9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgJGxhc3RTdWdnZXN0aW9uID0gJGZyYWdtZW50LmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uLmFmdGVyKCRmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkbGFzdFN1Z2dlc3Rpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlclBlbmRpbmc6IGZ1bmN0aW9uIHJlbmRlclBlbmRpbmcocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcy5wZW5kaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSAmJiB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlck5vdEZvdW5kOiBmdW5jdGlvbiByZW5kZXJOb3RGb3VuZChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSAmJiB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2VtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudDogZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGZyYWdtZW50O1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgICAgIF8uZWFjaChzdWdnZXN0aW9ucywgZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbk5vZGUoc3VnZ2VzdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsLCBjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhhdC5faW5qZWN0UXVlcnkocXVlcnksIHN1Z2dlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAkZWwgPSAkKHRoYXQudGVtcGxhdGVzLnN1Z2dlc3Rpb24oY29udGV4dCkpLmRhdGEoa2V5cy5vYmosIHN1Z2dlc3Rpb24pLmRhdGEoa2V5cy52YWwsIHRoYXQuZGlzcGxheUZuKHN1Z2dlc3Rpb24pKS5hZGRDbGFzcyh0aGF0LmNsYXNzZXMuc3VnZ2VzdGlvbiArIFwiIFwiICsgdGhhdC5jbGFzc2VzLnNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCgkZWxbMF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ICYmIGhpZ2hsaWdodCh7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5jbGFzc2VzLmhpZ2hsaWdodCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoZnJhZ21lbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRGb290ZXI6IGZ1bmN0aW9uIGdldEZvb3RlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMuZm9vdGVyID8gdGhpcy50ZW1wbGF0ZXMuZm9vdGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0SGVhZGVyOiBmdW5jdGlvbiBnZXRIZWFkZXIocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzLmhlYWRlciA/IHRoaXMudGVtcGxhdGVzLmhlYWRlcih7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHN1Z2dlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Jlc2V0TGFzdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIHJlc2V0TGFzdFN1Z2dlc3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2luamVjdFF1ZXJ5OiBmdW5jdGlvbiBpbmplY3RRdWVyeShxdWVyeSwgb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3Qob2JqKSA/IF8ubWl4aW4oe1xuICAgICAgICAgICAgICAgICAgICBfcXVlcnk6IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSwgb2JqKSA6IG9iajtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgY2FuY2VsZWQgPSBmYWxzZSwgc3luY0NhbGxlZCA9IGZhbHNlLCByZW5kZXJlZCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCA9ICQubm9vcDtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hc3luYyAmJiB0aGF0LnRyaWdnZXIoXCJhc3luY0NhbmNlbGVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlKHF1ZXJ5LCBzeW5jLCBhc3luYyk7XG4gICAgICAgICAgICAgICAgIXN5bmNDYWxsZWQgJiYgc3luYyhbXSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3luYyhzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3luY0NhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN5bmNDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IChzdWdnZXN0aW9ucyB8fCBbXSkuc2xpY2UoMCwgdGhhdC5saW1pdCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkID0gc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vdmVyd3JpdGUocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkIDwgdGhhdC5saW1pdCAmJiB0aGF0LmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJhc3luY1JlcXVlc3RlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYXN5bmMoc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZCAmJiByZW5kZXJlZCA8IHRoYXQubGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsID0gJC5ub29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWQgKz0gc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fYXBwZW5kKHF1ZXJ5LCBzdWdnZXN0aW9ucy5zbGljZSgwLCB0aGF0LmxpbWl0IC0gcmVuZGVyZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYXN5bmMgJiYgdGhhdC50cmlnZ2VyKFwiYXN5bmNSZWNlaXZlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsOiAkLm5vb3AsXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImNsZWFyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZWwuaXMoXCI6ZW1wdHlcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBEYXRhc2V0O1xuICAgICAgICBmdW5jdGlvbiBnZXREaXNwbGF5Rm4oZGlzcGxheSkge1xuICAgICAgICAgICAgZGlzcGxheSA9IGRpc3BsYXkgfHwgXy5zdHJpbmdpZnk7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGRpc3BsYXkpID8gZGlzcGxheSA6IGRpc3BsYXlGbjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRpc3BsYXlGbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2Rpc3BsYXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlcyh0ZW1wbGF0ZXMsIGRpc3BsYXlGbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBub3RGb3VuZDogdGVtcGxhdGVzLm5vdEZvdW5kICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMubm90Rm91bmQpLFxuICAgICAgICAgICAgICAgIHBlbmRpbmc6IHRlbXBsYXRlcy5wZW5kaW5nICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMucGVuZGluZyksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB0ZW1wbGF0ZXMuaGVhZGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuaGVhZGVyKSxcbiAgICAgICAgICAgICAgICBmb290ZXI6IHRlbXBsYXRlcy5mb290ZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5mb290ZXIpLFxuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb246IHRlbXBsYXRlcy5zdWdnZXN0aW9uIHx8IHN1Z2dlc3Rpb25UZW1wbGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Z2dlc3Rpb25UZW1wbGF0ZShjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8ZGl2PlwiKS50ZXh0KGRpc3BsYXlGbihjb250ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZE5hbWUoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gL15bX2EtekEtWjAtOS1dKyQvLnRlc3Qoc3RyKTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gTWVudShvLCB3d3cpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibm9kZSBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJG5vZGUgPSAkKG8ubm9kZSk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldHMgPSBfLm1hcChvLmRhdGFzZXRzLCBpbml0aWFsaXplRGF0YXNldCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplRGF0YXNldChvRGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhhdC4kbm9kZS5maW5kKG9EYXRhc2V0Lm5vZGUpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgb0RhdGFzZXQubm9kZSA9IG5vZGUubGVuZ3RoID8gbm9kZSA6ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LiRub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGFzZXQob0RhdGFzZXQsIHd3dyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihNZW51LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb25TZWxlY3RhYmxlQ2xpY2s6IGZ1bmN0aW9uIG9uU2VsZWN0YWJsZUNsaWNrKCRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwic2VsZWN0YWJsZUNsaWNrZWRcIiwgJCgkZS5jdXJyZW50VGFyZ2V0KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQodHlwZSwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHksIHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZGF0YXNldFJlbmRlcmVkXCIsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQ2xlYXJlZDogZnVuY3Rpb24gb25DbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5LCB0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImRhdGFzZXRDbGVhcmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9wcm9wYWdhdGU6IGZ1bmN0aW9uIHByb3BhZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYWxsRGF0YXNldHNFbXB0eTogZnVuY3Rpb24gYWxsRGF0YXNldHNFbXB0eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5ldmVyeSh0aGlzLmRhdGFzZXRzLCBpc0RhdGFzZXRFbXB0eSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNEYXRhc2V0RW1wdHkoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YXNldC5pc0VtcHR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRTZWxlY3RhYmxlczogZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG5vZGUuZmluZCh0aGlzLnNlbGVjdG9ycy5zZWxlY3RhYmxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBfcmVtb3ZlQ3Vyc29yKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlICYmICRzZWxlY3RhYmxlLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3Nlcy5jdXJzb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lbnN1cmVWaXNpYmxlOiBmdW5jdGlvbiBlbnN1cmVWaXNpYmxlKCRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBlbFRvcCwgZWxCb3R0b20sIG5vZGVTY3JvbGxUb3AsIG5vZGVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZWxUb3AgPSAkZWwucG9zaXRpb24oKS50b3A7XG4gICAgICAgICAgICAgICAgZWxCb3R0b20gPSBlbFRvcCArICRlbC5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgICAgICBub2RlU2Nyb2xsVG9wID0gdGhpcy4kbm9kZS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICBub2RlSGVpZ2h0ID0gdGhpcy4kbm9kZS5oZWlnaHQoKSArIHBhcnNlSW50KHRoaXMuJG5vZGUuY3NzKFwicGFkZGluZ1RvcFwiKSwgMTApICsgcGFyc2VJbnQodGhpcy4kbm9kZS5jc3MoXCJwYWRkaW5nQm90dG9tXCIpLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsVG9wIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnNjcm9sbFRvcChub2RlU2Nyb2xsVG9wICsgZWxUb3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZUhlaWdodCA8IGVsQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuc2Nyb2xsVG9wKG5vZGVTY3JvbGxUb3AgKyAoZWxCb3R0b20gLSBub2RlSGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgb25TZWxlY3RhYmxlQ2xpY2s7XG4gICAgICAgICAgICAgICAgb25TZWxlY3RhYmxlQ2xpY2sgPSBfLmJpbmQodGhpcy5fb25TZWxlY3RhYmxlQ2xpY2ssIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUub24oXCJjbGljay50dFwiLCB0aGlzLnNlbGVjdG9ycy5zZWxlY3RhYmxlLCBvblNlbGVjdGFibGVDbGljayk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5vblN5bmMoXCJhc3luY1JlcXVlc3RlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcImFzeW5jQ2FuY2VsZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJhc3luY1JlY2VpdmVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwicmVuZGVyZWRcIiwgdGhhdC5fb25SZW5kZXJlZCwgdGhhdCkub25TeW5jKFwiY2xlYXJlZFwiLCB0aGF0Ll9vbkNsZWFyZWQsIHRoYXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRub2RlLmhhc0NsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hdHRyKFwiZGlyXCIsIGRpcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3I6IGZ1bmN0aW9uIHNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlcywgJG9sZEN1cnNvciwgb2xkSW5kZXgsIG5ld0luZGV4O1xuICAgICAgICAgICAgICAgICRvbGRDdXJzb3IgPSB0aGlzLmdldEFjdGl2ZVNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZXMgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpO1xuICAgICAgICAgICAgICAgIG9sZEluZGV4ID0gJG9sZEN1cnNvciA/ICRzZWxlY3RhYmxlcy5pbmRleCgkb2xkQ3Vyc29yKSA6IC0xO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gb2xkSW5kZXggKyBkZWx0YTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IChuZXdJbmRleCArIDEpICUgKCRzZWxlY3RhYmxlcy5sZW5ndGggKyAxKSAtIDE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCA8IC0xID8gJHNlbGVjdGFibGVzLmxlbmd0aCAtIDEgOiBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5kZXggPT09IC0xID8gbnVsbCA6ICRzZWxlY3RhYmxlcy5lcShuZXdJbmRleCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q3Vyc29yOiBmdW5jdGlvbiBzZXRDdXJzb3IoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSAkc2VsZWN0YWJsZSAmJiAkc2VsZWN0YWJsZS5maXJzdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5jdXJzb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVWaXNpYmxlKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0YWJsZURhdGE6IGZ1bmN0aW9uIGdldFNlbGVjdGFibGVEYXRhKCRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWwgJiYgJGVsLmxlbmd0aCA/IERhdGFzZXQuZXh0cmFjdERhdGEoJGVsKSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QWN0aXZlU2VsZWN0YWJsZTogZnVuY3Rpb24gZ2V0QWN0aXZlU2VsZWN0YWJsZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpLmZpbHRlcih0aGlzLnNlbGVjdG9ycy5jdXJzb3IpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzZWxlY3RhYmxlLmxlbmd0aCA/ICRzZWxlY3RhYmxlIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUb3BTZWxlY3RhYmxlOiBmdW5jdGlvbiBnZXRUb3BTZWxlY3RhYmxlKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCkuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNlbGVjdGFibGUubGVuZ3RoID8gJHNlbGVjdGFibGUgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWRVcGRhdGUgPSBxdWVyeSAhPT0gdGhpcy5xdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCB1cGRhdGVEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRVcGRhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQudXBkYXRlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBjbGVhckRhdGFzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckRhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZSA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZGVzdHJveURhdGFzZXQpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3lEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIE1lbnU7XG4gICAgfSgpO1xuICAgIHZhciBEZWZhdWx0TWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHMgPSBNZW51LnByb3RvdHlwZTtcbiAgICAgICAgZnVuY3Rpb24gRGVmYXVsdE1lbnUoKSB7XG4gICAgICAgICAgICBNZW51LmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihEZWZhdWx0TWVudS5wcm90b3R5cGUsIE1lbnUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgICF0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLm9wZW4uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLmNsb3NlLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4oKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzLl9vblJlbmRlcmVkLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQ2xlYXJlZDogZnVuY3Rpb24gb25DbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcy5fb25DbGVhcmVkLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKGRpcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuY3NzKGRpciA9PT0gXCJsdHJcIiA/IHRoaXMuY3NzLmx0ciA6IHRoaXMuY3NzLnJ0bCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2V0TGFuZ3VhZ2VEaXJlY3Rpb24uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaGlkZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmhpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBEZWZhdWx0TWVudTtcbiAgICB9KCk7XG4gICAgdmFyIFR5cGVhaGVhZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gVHlwZWFoZWFkKG8sIHd3dykge1xuICAgICAgICAgICAgdmFyIG9uRm9jdXNlZCwgb25CbHVycmVkLCBvbkVudGVyS2V5ZWQsIG9uVGFiS2V5ZWQsIG9uRXNjS2V5ZWQsIG9uVXBLZXllZCwgb25Eb3duS2V5ZWQsIG9uTGVmdEtleWVkLCBvblJpZ2h0S2V5ZWQsIG9uUXVlcnlDaGFuZ2VkLCBvbldoaXRlc3BhY2VDaGFuZ2VkO1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBpbnB1dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5tZW51KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgbWVudVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5ldmVudEJ1cykge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIGV2ZW50IGJ1c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMgPSBvLmV2ZW50QnVzO1xuICAgICAgICAgICAgdGhpcy5taW5MZW5ndGggPSBfLmlzTnVtYmVyKG8ubWluTGVuZ3RoKSA/IG8ubWluTGVuZ3RoIDogMTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBvLmlucHV0O1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gby5tZW51O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lmhhc0ZvY3VzKCkgJiYgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kaXIgPSB0aGlzLmlucHV0LmdldExhbmdEaXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2hhY2tzKCk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuYmluZCgpLm9uU3luYyhcInNlbGVjdGFibGVDbGlja2VkXCIsIHRoaXMuX29uU2VsZWN0YWJsZUNsaWNrZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jUmVxdWVzdGVkXCIsIHRoaXMuX29uQXN5bmNSZXF1ZXN0ZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jQ2FuY2VsZWRcIiwgdGhpcy5fb25Bc3luY0NhbmNlbGVkLCB0aGlzKS5vblN5bmMoXCJhc3luY1JlY2VpdmVkXCIsIHRoaXMuX29uQXN5bmNSZWNlaXZlZCwgdGhpcykub25TeW5jKFwiZGF0YXNldFJlbmRlcmVkXCIsIHRoaXMuX29uRGF0YXNldFJlbmRlcmVkLCB0aGlzKS5vblN5bmMoXCJkYXRhc2V0Q2xlYXJlZFwiLCB0aGlzLl9vbkRhdGFzZXRDbGVhcmVkLCB0aGlzKTtcbiAgICAgICAgICAgIG9uRm9jdXNlZCA9IGModGhpcywgXCJhY3RpdmF0ZVwiLCBcIm9wZW5cIiwgXCJfb25Gb2N1c2VkXCIpO1xuICAgICAgICAgICAgb25CbHVycmVkID0gYyh0aGlzLCBcImRlYWN0aXZhdGVcIiwgXCJfb25CbHVycmVkXCIpO1xuICAgICAgICAgICAgb25FbnRlcktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uRW50ZXJLZXllZFwiKTtcbiAgICAgICAgICAgIG9uVGFiS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25UYWJLZXllZFwiKTtcbiAgICAgICAgICAgIG9uRXNjS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJfb25Fc2NLZXllZFwiKTtcbiAgICAgICAgICAgIG9uVXBLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIm9wZW5cIiwgXCJfb25VcEtleWVkXCIpO1xuICAgICAgICAgICAgb25Eb3duS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJvcGVuXCIsIFwiX29uRG93bktleWVkXCIpO1xuICAgICAgICAgICAgb25MZWZ0S2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25MZWZ0S2V5ZWRcIik7XG4gICAgICAgICAgICBvblJpZ2h0S2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25SaWdodEtleWVkXCIpO1xuICAgICAgICAgICAgb25RdWVyeUNoYW5nZWQgPSBjKHRoaXMsIFwiX29wZW5JZkFjdGl2ZVwiLCBcIl9vblF1ZXJ5Q2hhbmdlZFwiKTtcbiAgICAgICAgICAgIG9uV2hpdGVzcGFjZUNoYW5nZWQgPSBjKHRoaXMsIFwiX29wZW5JZkFjdGl2ZVwiLCBcIl9vbldoaXRlc3BhY2VDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5iaW5kKCkub25TeW5jKFwiZm9jdXNlZFwiLCBvbkZvY3VzZWQsIHRoaXMpLm9uU3luYyhcImJsdXJyZWRcIiwgb25CbHVycmVkLCB0aGlzKS5vblN5bmMoXCJlbnRlcktleWVkXCIsIG9uRW50ZXJLZXllZCwgdGhpcykub25TeW5jKFwidGFiS2V5ZWRcIiwgb25UYWJLZXllZCwgdGhpcykub25TeW5jKFwiZXNjS2V5ZWRcIiwgb25Fc2NLZXllZCwgdGhpcykub25TeW5jKFwidXBLZXllZFwiLCBvblVwS2V5ZWQsIHRoaXMpLm9uU3luYyhcImRvd25LZXllZFwiLCBvbkRvd25LZXllZCwgdGhpcykub25TeW5jKFwibGVmdEtleWVkXCIsIG9uTGVmdEtleWVkLCB0aGlzKS5vblN5bmMoXCJyaWdodEtleWVkXCIsIG9uUmlnaHRLZXllZCwgdGhpcykub25TeW5jKFwicXVlcnlDaGFuZ2VkXCIsIG9uUXVlcnlDaGFuZ2VkLCB0aGlzKS5vblN5bmMoXCJ3aGl0ZXNwYWNlQ2hhbmdlZFwiLCBvbldoaXRlc3BhY2VDaGFuZ2VkLCB0aGlzKS5vblN5bmMoXCJsYW5nRGlyQ2hhbmdlZFwiLCB0aGlzLl9vbkxhbmdEaXJDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFR5cGVhaGVhZC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9oYWNrczogZnVuY3Rpb24gaGFja3MoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbnB1dCwgJG1lbnU7XG4gICAgICAgICAgICAgICAgJGlucHV0ID0gdGhpcy5pbnB1dC4kaW5wdXQgfHwgJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgICRtZW51ID0gdGhpcy5tZW51LiRub2RlIHx8ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICAkaW5wdXQub24oXCJibHVyLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUsIGlzQWN0aXZlLCBoYXNBY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gJG1lbnUuaXMoYWN0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzQWN0aXZlID0gJG1lbnUuaGFzKGFjdGl2ZSkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNNc2llKCkgJiYgKGlzQWN0aXZlIHx8IGhhc0FjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRtZW51Lm9uKFwibW91c2Vkb3duLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uU2VsZWN0YWJsZUNsaWNrZWQ6IGZ1bmN0aW9uIG9uU2VsZWN0YWJsZUNsaWNrZWQodHlwZSwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJGVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25EYXRhc2V0Q2xlYXJlZDogZnVuY3Rpb24gb25EYXRhc2V0Q2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRGF0YXNldFJlbmRlcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRSZW5kZXJlZCh0eXBlLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwicmVuZGVyXCIsIHN1Z2dlc3Rpb25zLCBhc3luYywgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNSZXF1ZXN0ZWQ6IGZ1bmN0aW9uIG9uQXN5bmNSZXF1ZXN0ZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY3JlcXVlc3RcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jQ2FuY2VsZWQ6IGZ1bmN0aW9uIG9uQXN5bmNDYW5jZWxlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jY2FuY2VsXCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY1JlY2VpdmVkOiBmdW5jdGlvbiBvbkFzeW5jUmVjZWl2ZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY3JlY2VpdmVcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkZvY3VzZWQ6IGZ1bmN0aW9uIG9uRm9jdXNlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5MZW5ndGhNZXQoKSAmJiB0aGlzLm1lbnUudXBkYXRlKHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQmx1cnJlZDogZnVuY3Rpb24gb25CbHVycmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Lmhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY2hhbmdlXCIsIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkVudGVyS2V5ZWQ6IGZ1bmN0aW9uIG9uRW50ZXJLZXllZCh0eXBlLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25UYWJLZXllZDogZnVuY3Rpb24gb25UYWJLZXllZCh0eXBlLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Fc2NLZXllZDogZnVuY3Rpb24gb25Fc2NLZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uVXBLZXllZDogZnVuY3Rpb24gb25VcEtleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcigtMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRG93bktleWVkOiBmdW5jdGlvbiBvbkRvd25LZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoKzEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkxlZnRLZXllZDogZnVuY3Rpb24gb25MZWZ0S2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSBcInJ0bFwiICYmIHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SaWdodEtleWVkOiBmdW5jdGlvbiBvblJpZ2h0S2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSBcImx0clwiICYmIHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25RdWVyeUNoYW5nZWQ6IGZ1bmN0aW9uIG9uUXVlcnlDaGFuZ2VkKGUsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluTGVuZ3RoTWV0KHF1ZXJ5KSA/IHRoaXMubWVudS51cGRhdGUocXVlcnkpIDogdGhpcy5tZW51LmVtcHR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uV2hpdGVzcGFjZUNoYW5nZWQ6IGZ1bmN0aW9uIG9uV2hpdGVzcGFjZUNoYW5nZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkxhbmdEaXJDaGFuZ2VkOiBmdW5jdGlvbiBvbkxhbmdEaXJDaGFuZ2VkKGUsIGRpcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29wZW5JZkFjdGl2ZTogZnVuY3Rpb24gb3BlbklmQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUoKSAmJiB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbWluTGVuZ3RoTWV0OiBmdW5jdGlvbiBtaW5MZW5ndGhNZXQocXVlcnkpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IF8uaXNTdHJpbmcocXVlcnkpID8gcXVlcnkgOiB0aGlzLmlucHV0LmdldFF1ZXJ5KCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF91cGRhdGVIaW50OiBmdW5jdGlvbiB1cGRhdGVIaW50KCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSwgZGF0YSwgdmFsLCBxdWVyeSwgZXNjYXBlZFF1ZXJ5LCBmcm9udE1hdGNoUmVnRXgsIG1hdGNoO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmlucHV0LmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhXy5pc0JsYW5rU3RyaW5nKHZhbCkgJiYgIXRoaXMuaW5wdXQuaGFzT3ZlcmZsb3coKSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWRRdWVyeSA9IF8uZXNjYXBlUmVnRXhDaGFycyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIGZyb250TWF0Y2hSZWdFeCA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBlc2NhcGVkUXVlcnkgKyBcIikoLiskKVwiLCBcImlcIik7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZnJvbnRNYXRjaFJlZ0V4LmV4ZWMoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCAmJiB0aGlzLmlucHV0LnNldEhpbnQodmFsICsgbWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VuYWJsZWQoKSB8fCB0aGlzLmV2ZW50QnVzLmJlZm9yZShcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJpZGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImlkbGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51LmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbigpICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcIm9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJvcGVuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImNsb3NlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsOiBmdW5jdGlvbiBzZXRWYWwodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShfLnRvU3RyKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFZhbDogZnVuY3Rpb24gZ2V0VmFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwic2VsZWN0XCIsIGRhdGEub2JqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KGRhdGEudmFsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwic2VsZWN0XCIsIGRhdGEub2JqKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5LCBkYXRhLCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBkYXRhICYmIHF1ZXJ5ICE9PSBkYXRhLnZhbDtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJhdXRvY29tcGxldGVcIiwgZGF0YS5vYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhdXRvY29tcGxldGVcIiwgZGF0YS5vYmopO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb3IoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnksICRjYW5kaWRhdGUsIGRhdGEsIHBheWxvYWQsIGNhbmNlbE1vdmU7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgJGNhbmRpZGF0ZSA9IHRoaXMubWVudS5zZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcihkZWx0YSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICBwYXlsb2FkID0gZGF0YSA/IGRhdGEub2JqIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjYW5jZWxNb3ZlID0gdGhpcy5fbWluTGVuZ3RoTWV0KCkgJiYgdGhpcy5tZW51LnVwZGF0ZShxdWVyeSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxNb3ZlICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImN1cnNvcmNoYW5nZVwiLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuc2V0Q3Vyc29yKCRjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY3Vyc29yY2hhbmdlXCIsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBUeXBlYWhlYWQ7XG4gICAgICAgIGZ1bmN0aW9uIGMoY3R4KSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBfLmVhY2gobWV0aG9kcywgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHhbbWV0aG9kXS5hcHBseShjdHgsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgb2xkLCBrZXlzLCBtZXRob2RzO1xuICAgICAgICBvbGQgPSAkLmZuLnR5cGVhaGVhZDtcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIHd3dzogXCJ0dC13d3dcIixcbiAgICAgICAgICAgIGF0dHJzOiBcInR0LWF0dHJzXCIsXG4gICAgICAgICAgICB0eXBlYWhlYWQ6IFwidHQtdHlwZWFoZWFkXCJcbiAgICAgICAgfTtcbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUobywgZGF0YXNldHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3d3O1xuICAgICAgICAgICAgICAgIGRhdGFzZXRzID0gXy5pc0FycmF5KGRhdGFzZXRzKSA/IGRhdGFzZXRzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIHd3dyA9IFdXVyhvLmNsYXNzTmFtZXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goYXR0YWNoKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQsICR3cmFwcGVyLCAkaGludCwgJG1lbnUsIGRlZmF1bHRIaW50LCBkZWZhdWx0TWVudSwgZXZlbnRCdXMsIGlucHV0LCBtZW51LCB0eXBlYWhlYWQsIE1lbnVDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGFzZXRzLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlciA9ICQod3d3Lmh0bWwud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICRoaW50ID0gJGVsT3JOdWxsKG8uaGludCk7XG4gICAgICAgICAgICAgICAgICAgICRtZW51ID0gJGVsT3JOdWxsKG8ubWVudSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRIaW50ID0gby5oaW50ICE9PSBmYWxzZSAmJiAhJGhpbnQ7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRNZW51ID0gby5tZW51ICE9PSBmYWxzZSAmJiAhJG1lbnU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRIaW50ICYmICgkaGludCA9IGJ1aWxkSGludEZyb21JbnB1dCgkaW5wdXQsIHd3dykpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TWVudSAmJiAoJG1lbnUgPSAkKHd3dy5odG1sLm1lbnUpLmNzcyh3d3cuY3NzLm1lbnUpKTtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQgJiYgJGhpbnQudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSBwcmVwSW5wdXQoJGlucHV0LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdEhpbnQgfHwgZGVmYXVsdE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmNzcyh3d3cuY3NzLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNzcyhkZWZhdWx0SGludCA/IHd3dy5jc3MuaW5wdXQgOiB3d3cuY3NzLmlucHV0V2l0aE5vSGludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQud3JhcCgkd3JhcHBlcikucGFyZW50KCkucHJlcGVuZChkZWZhdWx0SGludCA/ICRoaW50IDogbnVsbCkuYXBwZW5kKGRlZmF1bHRNZW51ID8gJG1lbnUgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBNZW51Q29uc3RydWN0b3IgPSBkZWZhdWx0TWVudSA/IERlZmF1bHRNZW51IDogTWVudTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICRpbnB1dFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBuZXcgSW5wdXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludDogJGhpbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogJGlucHV0XG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUgPSBuZXcgTWVudUNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6ICRtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IGRhdGFzZXRzXG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZCA9IG5ldyBUeXBlYWhlYWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudTogbWVudSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkxlbmd0aDogby5taW5MZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy53d3csIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMudHlwZWFoZWFkLCB0eXBlYWhlYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5hYmxlZDtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgPSB0LmlzRW5hYmxlZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHQuaXNBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3BlbjtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW4gPSB0LmlzT3BlbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcGVuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdChlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2UsICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQuc2VsZWN0KCRlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUoZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlLCAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0LmF1dG9jb21wbGV0ZSgkZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb2UoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQubW92ZUN1cnNvcihkZWx0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsOiBmdW5jdGlvbiB2YWwobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHQuZ2V0VmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuc2V0VmFsKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odHlwZWFoZWFkLCAkaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0KCRpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4udHlwZWFoZWFkID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4udHlwZWFoZWFkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICAgICAgJC5mbi50eXBlYWhlYWQgPSBvbGQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gdHRFYWNoKCRlbHMsIGZuKSB7XG4gICAgICAgICAgICAkZWxzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIHR5cGVhaGVhZDtcbiAgICAgICAgICAgICAgICAodHlwZWFoZWFkID0gJGlucHV0LmRhdGEoa2V5cy50eXBlYWhlYWQpKSAmJiBmbih0eXBlYWhlYWQsICRpbnB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZEhpbnRGcm9tSW5wdXQoJGlucHV0LCB3d3cpIHtcbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQuY2xvbmUoKS5hZGRDbGFzcyh3d3cuY2xhc3Nlcy5oaW50KS5yZW1vdmVEYXRhKCkuY3NzKHd3dy5jc3MuaGludCkuY3NzKGdldEJhY2tncm91bmRTdHlsZXMoJGlucHV0KSkucHJvcChcInJlYWRvbmx5XCIsIHRydWUpLnJlbW92ZUF0dHIoXCJpZCBuYW1lIHBsYWNlaG9sZGVyIHJlcXVpcmVkXCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJvZmZcIixcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmVwSW5wdXQoJGlucHV0LCB3d3cpIHtcbiAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMuYXR0cnMsIHtcbiAgICAgICAgICAgICAgICBkaXI6ICRpbnB1dC5hdHRyKFwiZGlyXCIpLFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogJGlucHV0LmF0dHIoXCJhdXRvY29tcGxldGVcIiksXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogJGlucHV0LmF0dHIoXCJzcGVsbGNoZWNrXCIpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAkaW5wdXQuYXR0cihcInN0eWxlXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5hZGRDbGFzcyh3d3cuY2xhc3Nlcy5pbnB1dCkuYXR0cih7XG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgISRpbnB1dC5hdHRyKFwiZGlyXCIpICYmICRpbnB1dC5hdHRyKFwiZGlyXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gJGlucHV0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEJhY2tncm91bmRTdHlsZXMoJGVsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdHRhY2htZW50OiAkZWwuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDbGlwOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1jbGlwXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJGVsLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kT3JpZ2luOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1vcmlnaW5cIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1wb3NpdGlvblwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiAkZWwuY3NzKFwiYmFja2dyb3VuZC1yZXBlYXRcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXNpemVcIilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJ0KCRpbnB1dCkge1xuICAgICAgICAgICAgdmFyIHd3dywgJHdyYXBwZXI7XG4gICAgICAgICAgICB3d3cgPSAkaW5wdXQuZGF0YShrZXlzLnd3dyk7XG4gICAgICAgICAgICAkd3JhcHBlciA9ICRpbnB1dC5wYXJlbnQoKS5maWx0ZXIod3d3LnNlbGVjdG9ycy53cmFwcGVyKTtcbiAgICAgICAgICAgIF8uZWFjaCgkaW5wdXQuZGF0YShrZXlzLmF0dHJzKSwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBfLmlzVW5kZWZpbmVkKHZhbCkgPyAkaW5wdXQucmVtb3ZlQXR0cihrZXkpIDogJGlucHV0LmF0dHIoa2V5LCB2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaW5wdXQucmVtb3ZlRGF0YShrZXlzLnR5cGVhaGVhZCkucmVtb3ZlRGF0YShrZXlzLnd3dykucmVtb3ZlRGF0YShrZXlzLmF0dHIpLnJlbW92ZUNsYXNzKHd3dy5jbGFzc2VzLmlucHV0KTtcbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkaW5wdXQuZGV0YWNoKCkuaW5zZXJ0QWZ0ZXIoJHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uICRlbE9yTnVsbChvYmopIHtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkLCAkZWw7XG4gICAgICAgICAgICBpc1ZhbGlkID0gXy5pc0pRdWVyeShvYmopIHx8IF8uaXNFbGVtZW50KG9iaik7XG4gICAgICAgICAgICAkZWwgPSBpc1ZhbGlkID8gJChvYmopLmZpcnN0KCkgOiBbXTtcbiAgICAgICAgICAgIHJldHVybiAkZWwubGVuZ3RoID8gJGVsIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH0pKCk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgVGFnTWFwIGZyb20gJ0BwYWdlcy90YWcvdGFnLW1hcCc7XHJcbmltcG9ydCBQcm9kdWN0U2VhcmNoSW5wdXQgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9wcm9kdWN0LXNlYXJjaC1pbnB1dCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgUHJvZHVjdFNlYXJjaElucHV0KFRhZ01hcC5wcm9kdWN0U2VhcmNoSW5wdXQpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9