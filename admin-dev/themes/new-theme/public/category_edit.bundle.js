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

/***/ "./js/components/event-emitter.ts"
/*!****************************************!*\
  !*** ./js/components/event-emitter.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);


const EventEmitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);


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

/***/ "./js/pages/category/category-map.ts"
/*!*******************************************!*\
  !*** ./js/pages/category/category-map.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  redirectOption: {
    typeInput: "#category_redirect_option_type",
    targetInput: "#category_redirect_option_target",
    groupSelector: ".form-group"
  }
});


/***/ },

/***/ "./js/pages/category/edit/manager/redirect-option-manager.ts"
/*!*******************************************************************!*\
  !*** ./js/pages/category/edit/manager/redirect-option-manager.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RedirectOptionManager)
/* harmony export */ });
/* harmony import */ var _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/entity-search-input */ "./js/components/entity-search-input.ts");
/* harmony import */ var _pages_category_category_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/category/category-map */ "./js/pages/category/category-map.ts");



const { $ } = window;
class RedirectOptionManager {
  /**
   * @param {EventEmitter} eventEmitter
   */
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$redirectTypeInput = $(_pages_category_category_map__WEBPACK_IMPORTED_MODULE_1__["default"].redirectOption.typeInput);
    this.$redirectTargetInput = $(_pages_category_category_map__WEBPACK_IMPORTED_MODULE_1__["default"].redirectOption.targetInput);
    this.$redirectTargetRow = this.$redirectTargetInput.closest(_pages_category_category_map__WEBPACK_IMPORTED_MODULE_1__["default"].redirectOption.groupSelector);
    if (this.$redirectTargetInput.length) {
      this.entitySearchInput = new _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__["default"](this.$redirectTargetInput, {});
      this.watchRedirectType();
    }
  }
  /**
   * Watch the selected redirection type and adapt the inputs accordingly.
   *
   * @private
   */
  watchRedirectType() {
    this.$redirectTypeInput.on("change", () => {
      const redirectType = this.$redirectTypeInput.val();
      switch (redirectType) {
        case "301":
        case "302":
          this.entitySearchInput.setValues([]);
          this.showTarget();
          break;
        case "404":
        case "410":
        default:
          this.entitySearchInput.setValues([]);
          this.hideTarget();
          break;
      }
    });
  }
  showTarget() {
    this.$redirectTargetRow.removeClass("d-none");
  }
  hideTarget() {
    this.$redirectTargetRow.addClass("d-none");
  }
}


/***/ },

/***/ "./node_modules/events/events.js"
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


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
/*!*****************************************!*\
  !*** ./js/pages/category/edit/index.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/event-emitter */ "./js/components/event-emitter.ts");
/* harmony import */ var _pages_category_edit_manager_redirect_option_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/category/edit/manager/redirect-option-manager */ "./js/pages/category/edit/manager/redirect-option-manager.ts");



const { $ } = window;
$(() => {
  new _pages_category_edit_manager_redirect_option_manager__WEBPACK_IMPORTED_MODULE_1__["default"](_components_event_emitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);
});

})();

window.category_edit = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0EsUUFBUSxJQUEwQztBQUNsRCxRQUFRLGlDQUF1QixFQUFFLDJDQUFRLEVBQUUsbUNBQUU7QUFDN0M7QUFDQSxTQUFTO0FBQUEsa0dBQUM7QUFDVixNQUFNLEtBQUs7QUFBQSxFQUlOO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtDQUErQyxFQUFFO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2w1RUQsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0QyQjtBQUNPO0FBRWxDLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixNQUFJLDRGQUFxQixDQUFDLG1FQUFZO0FBQ3hDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9lbnRpdHktc2VhcmNoLWlucHV0LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZXZlbnQtZW1pdHRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0ZWdvcnkvY2F0ZWdvcnktbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGVnb3J5L2VkaXQvbWFuYWdlci9yZWRpcmVjdC1vcHRpb24tbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3R5cGVhaGVhZC5qcy9kaXN0L3R5cGVhaGVhZC5idW5kbGUuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRlZ29yeS9lZGl0L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICd0eXBlYWhlYWQuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIGFuIG92ZXJsYXkgb2YgdHlwZWFoZWFkIGl0IGFsbG93cyB0byBoYXZlIGEgc2luZ2xlIGNvbmZpZyBpbnB1dCAoc2luY2VcclxuICogdHlwZWFoZWFkIHdlaXJkbHkgdXNlcyB0d28gZGlmZmVyZW50IGNvbmZpZ3MpLiBJdCBhbHNvIHByb3ZpZGVzIHNvbWUgZGVmYXVsdCByZW5kZXJpbmdcclxuICogZnVuY3Rpb25zIHdoaWNoIGFyZSwgb2YgY291cnNlLCBvdmVycmlkYWJsZS5cclxuICovXHJcblxyXG50eXBlIERpc3BsYXlGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkSlF1ZXJ5RGF0YXNldCBleHRlbmRzIFR3aXR0ZXIuVHlwZWFoZWFkLkRhdGFzZXQ8YW55PiB7XHJcbiAgZGlzcGxheTogc3RyaW5nIHwgRGlzcGxheUZ1bmN0aW9uO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgbGltaXQ6IG51bWJlcjtcclxuICBkYXRhTGltaXQ6IG51bWJlcjtcclxuICB0ZW1wbGF0ZXM6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRKUXVlcnlPcHRpb25zIGV4dGVuZHMgVHdpdHRlci5UeXBlYWhlYWQuT3B0aW9ucyB7XHJcbiAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgaGlnaGxpZ2h0OiBib29sZWFuLFxyXG4gIGhpbnQ6IGJvb2xlYW4sXHJcbiAgb25TZWxlY3Q6IChcclxuICAgIHNlbGVjdGVkSXRlbTogYW55LFxyXG4gICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgc2VhcmNoSW5wdXQ6IEpRdWVyeVxyXG4gICkgPT4gYm9vbGVhbjtcclxuICBvbkNsb3NlOiAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LCBzZWFyY2hJbnB1dDogSlF1ZXJ5KSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSB7XHJcbiAgbWluTGVuZ3RoOiBudW1iZXI7XHJcbiAgaGlnaGxpZ2h0OiBib29sZWFuO1xyXG4gIGhpbnQ6IGJvb2xlYW47XHJcbiAgc291cmNlOiBCbG9vZGhvdW5kPFJlY29yZDxzdHJpbmcsIGFueT4+IHwgKFxyXG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHN5bmNSZXN1bHRzOiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZCwgYXN5bmNSZXN1bHRzPzogKHJlc3VsdDogYW55W10pID0+IHZvaWRcclxuICApID0+IHZvaWQpO1xyXG4gIG9uU2VsZWN0OiAoXHJcbiAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgIHNlYXJjaElucHV0OiBKUXVlcnlcclxuICApID0+IGJvb2xlYW47XHJcbiAgb25DbG9zZTogKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCwgc2VhcmNoSW5wdXQ6IEpRdWVyeSkgPT4gdm9pZDtcclxuICBzdWdnZXN0aW9uTGltaXQ6IG51bWJlcjtcclxuICBkYXRhTGltaXQ6IG51bWJlcjtcclxuICBkaXNwbGF5OiBzdHJpbmcgfCBEaXNwbGF5RnVuY3Rpb247XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZW1wbGF0ZXM6IGFueTtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZyA9IFBhcnRpYWw8QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPiAmIHtcclxuICBzb3VyY2U6IEJsb29kaG91bmQ8UmVjb3JkPHN0cmluZywgYW55Pj4gfCAoXHJcbiAgICAocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM/OiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZFxyXG4gICkgPT4gdm9pZCk7IC8vIHNvdXJjZSBpcyBtYW5kYXRvcnkgb3B0aW9uXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvQ29tcGxldGVTZWFyY2gge1xyXG4gIHByaXZhdGUgJHNlYXJjaElucHV0OiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgc2VhcmNoSW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGNvbmZpZzogQXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcigkc2VhcmNoSW5wdXQ6IEpRdWVyeSwgaW5wdXRDb25maWc6IFBhcnRpYWw8SW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+KSB7XHJcbiAgICB0aGlzLiRzZWFyY2hJbnB1dCA9ICRzZWFyY2hJbnB1dDtcclxuICAgIHRoaXMuc2VhcmNoSW5wdXRJZCA9IHRoaXMuJHNlYXJjaElucHV0LnByb3AoJ2lkJyk7XHJcblxyXG4gICAgLy8gTWVyZ2luZyBvYmplY3Qgd29ya3MgZmluZSBvbiBvbmUgbGV2ZWwsIGJ1dCBvbiB0d28gaXQgZXJhc2VzIHN1YiBlbGVtZW50cyBldmVuIGlmIG5vdCBwcmVzZW50LCBzb1xyXG4gICAgLy8gd2UgaGFuZGxlIHRlbXBsYXRlcyBzZXBhcmF0ZWx5LCB0aGVzZSBhcmUgdGhlIGRlZmF1bHQgcmVuZGVyaW5nIGZ1bmN0aW9ucyB3aGljaCBjYW4gYmUgb3ZlcnJpZGRlblxyXG4gICAgY29uc3QgZGVmYXVsdFRlbXBsYXRlcyA9IHtcclxuICAgICAgLy8gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgcmVuZGVyaW5nIGZ1bmN0aW9uIG11c3QgcmV0dXJuIEhUTUwgbm9kZSBub3QgcHVyZSB0ZXh0IHNvIGFsd2F5cyBpbmNsdWRlIHRoZVxyXG4gICAgICAvLyBjb250ZW50IGluIGEgZGl2IGF0IGxlYXN0XHJcbiAgICAgIHN1Z2dlc3Rpb246IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlTdWdnZXN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgc3RyaW5nID0gaXRlbTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IHRoaXMuY29uZmlnLmRpc3BsYXkoaXRlbSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcclxuICAgICAgICAgICAgaXRlbSxcclxuICAgICAgICAgICAgPHN0cmluZz4gdGhpcy5jb25maWcuZGlzcGxheSxcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGRpc3BsYXlTdWdnZXN0aW9uID0gaXRlbVs8c3RyaW5nPiB0aGlzLmNvbmZpZy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInB4LTJcIj4ke2Rpc3BsYXlTdWdnZXN0aW9ufTwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBlbmRpbmcocXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+U2VhcmNoaW5nIGZvciBcIiR7cXVlcnkucXVlcnl9XCI8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBub3RGb3VuZChxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInB4LTJcIj5ObyByZXN1bHRzIGZvdW5kIGZvciBcIiR7cXVlcnkucXVlcnl9XCI8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNZXJnZSBkZWZhdWx0IGFuZCBpbnB1dCBjb25maWdcclxuICAgIHRoaXMuY29uZmlnID0gPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz57XHJcbiAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgaGlnaGxpZ2h0OiB0cnVlLFxyXG4gICAgICBoaW50OiBmYWxzZSxcclxuICAgICAgb25TZWxlY3Q6IChcclxuICAgICAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgICAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICAgICAgc2VhcmNoSW5wdXQ6IEpRdWVyeSxcclxuICAgICAgKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZWFoZWFkKCd2YWwnLCBzZWxlY3RlZEl0ZW1bdGhpcy5jb25maWcudmFsdWVdKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgb25DbG9zZShcclxuICAgICAgICBldmVudDogRXZlbnQsXHJcbiAgICAgICAgc2VhcmNoSW5wdXQ6IEpRdWVyeSxcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZWFoZWFkKCd2YWwnLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Z2dlc3Rpb25MaW1pdDogMzAsXHJcbiAgICAgIGRhdGFMaW1pdDogMCxcclxuICAgICAgZGlzcGxheTogJ25hbWUnLFxyXG4gICAgICB2YWx1ZTogJ2lkJyxcclxuICAgICAgdGVtcGxhdGVzOiBkZWZhdWx0VGVtcGxhdGVzLFxyXG4gICAgICAuLi5pbnB1dENvbmZpZyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gSWYgaW5wdXQgaGFzIHRlbXBsYXRlcyBvdmVycmlkZSBtZSBtZXJnZSB0aGVtIHdpdGggZGVmYXVsdCBvbmVzXHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0Q29uZmlnLCAndGVtcGxhdGVzJykpIHtcclxuICAgICAgdGhpcy5jb25maWcudGVtcGxhdGVzID0ge1xyXG4gICAgICAgIC4uLmRlZmF1bHRUZW1wbGF0ZXMsXHJcbiAgICAgICAgLi4uKDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj5pbnB1dENvbmZpZy50ZW1wbGF0ZXMpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYnVpbGRUeXBlYWhlYWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSB0eXBlYWhlYWQgY29tcG9uZW50IGJhc2VkIG9uIHByb3ZpZGVkIGNvbmZpZ3VyYXRpb24uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFR5cGVhaGVhZCgpOiB2b2lkIHtcclxuICAgIC8vIENyZWF0ZSB0aGUgdHdvIGNvbmZpZyBvYmplY3QgZm9yIHR5cGVhaGVhZCBiYXNlZCBvbiB0aGUgZnVsbCBjb25maWdcclxuICAgIGNvbnN0IHR5cGVhaGVhZE9wdGlvbnMgPSB7XHJcbiAgICAgIG1pbkxlbmd0aDogdGhpcy5jb25maWcubWluTGVuZ3RoLFxyXG4gICAgICBoaWdobGlnaHQ6IHRoaXMuY29uZmlnLmhpZ2hsaWdodCxcclxuICAgICAgaGludDogdGhpcy5jb25maWcuaGludCxcclxuICAgICAgb25TZWxlY3Q6IHRoaXMuY29uZmlnLm9uU2VsZWN0LFxyXG4gICAgICBvbkNsb3NlOiB0aGlzLmNvbmZpZy5vbkNsb3NlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBkYXRhU2V0Q29uZmlnID0ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMuY29uZmlnLnNvdXJjZSxcclxuICAgICAgZGlzcGxheTogdGhpcy5jb25maWcuZGlzcGxheSxcclxuICAgICAgdmFsdWU6IHRoaXMuY29uZmlnLnZhbHVlLFxyXG4gICAgICBsaW1pdDogdGhpcy5jb25maWcuc3VnZ2VzdGlvbkxpbWl0LFxyXG4gICAgICBkYXRhTGltaXQ6IHRoaXMuY29uZmlnLmRhdGFMaW1pdCxcclxuICAgICAgdGVtcGxhdGVzOiB0aGlzLmNvbmZpZy50ZW1wbGF0ZXMsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlICovXHJcbiAgICB0aGlzLiRzZWFyY2hJbnB1dFxyXG4gICAgICAudHlwZWFoZWFkKDxUeXBlYWhlYWRKUXVlcnlPcHRpb25zPnR5cGVhaGVhZE9wdGlvbnMsIDxUeXBlYWhlYWRKUXVlcnlEYXRhc2V0PmRhdGFTZXRDb25maWcpXHJcbiAgICAgIC5vbigndHlwZWFoZWFkOnNlbGVjdCcsIChlOiBhbnksIHNlbGVjdGVkSXRlbTogYW55KSA9PlxyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0KHNlbGVjdGVkSXRlbSwgZSwgdGhpcy4kc2VhcmNoSW5wdXQpXHJcbiAgICAgIClcclxuICAgICAgLm9uKCd0eXBlYWhlYWQ6Y2xvc2UnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb25maWcub25DbG9zZShlLCB0aGlzLiRzZWFyY2hJbnB1dCk7XHJcbiAgICAgIH0pO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBBdXRvQ29tcGxldGVTZWFyY2gsIHtJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZ30gZnJvbSAnQGNvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1zZWFyY2gnO1xyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICdAY29tcG9uZW50cy9jb21wb25lbnRzLW1hcCc7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG4vLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICd0eXBlYWhlYWQuanMnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuY29uc3QgRW50aXR5U2VhcmNoSW5wdXRNYXAgPSBDb21wb25lbnRzTWFwLmVudGl0eVNlYXJjaElucHV0O1xyXG5cclxudHlwZSBSZW1vdmVGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHZvaWQ7XHJcbnR5cGUgU2VsZWN0RnVuY3Rpb24gPSAoJG5vZGU6IEpRdWVyeSwgaXRlbTogYW55KSA9PiB2b2lkO1xyXG50eXBlIFN1Z2dlc3Rpb25GdW5jdGlvbiA9IChlbnRpdHk6IGFueSkgPT4gc3RyaW5nO1xyXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVNlYXJjaElucHV0T3B0aW9ucyBleHRlbmRzIE9wdGlvbnNPYmplY3Qge1xyXG4gIHByb3RvdHlwZVRlbXBsYXRlOiBzdHJpbmcsXHJcbiAgcHJvdG90eXBlSW5kZXg6IHN0cmluZyxcclxuICBwcm90b3R5cGVNYXBwaW5nOiBPcHRpb25zT2JqZWN0LFxyXG4gIGlkZW50aWZpZXJGaWVsZDogc3RyaW5nO1xyXG4gIGFsbG93RGVsZXRlOiBib29sZWFuLFxyXG4gIGRhdGFMaW1pdDogbnVtYmVyLFxyXG4gIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gIHJlbW90ZVVybDogc3RyaW5nLFxyXG4gIGZpbHRlclNlbGVjdGVkOiBib29sZWFuLFxyXG4gIGZpbHRlcmVkSWRlbnRpdGllczogQXJyYXk8c3RyaW5nPixcclxuICByZW1vdmVNb2RhbDogTW9kYWxPcHRpb25zLFxyXG4gIHNlYXJjaElucHV0U2VsZWN0b3I6IHN0cmluZyxcclxuICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZW50aXR5SXRlbVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZW50aXR5RGVsZXRlU2VsZWN0b3I6IHN0cmluZyxcclxuICBlbXB0eVN0YXRlU2VsZWN0b3I6IHN0cmluZyxcclxuICBxdWVyeVdpbGRjYXJkOiBzdHJpbmcsXHJcbiAgb25SZW1vdmVkQ29udGVudDogUmVtb3ZlRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgb25TZWxlY3RlZENvbnRlbnQ6IFNlbGVjdEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHN1Z2dlc3Rpb25UZW1wbGF0ZTogU3VnZ2VzdGlvbkZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIGV4dHJhUXVlcnlQYXJhbXM/OiAoKSA9PiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc09iamVjdCB7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBhcHBseTogc3RyaW5nO1xyXG4gIGNhbmNlbDogc3RyaW5nO1xyXG4gIGJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHNlYXJjaCBhbmQgc2VsZWN0IG9uZSBvciBzZXZlcmFsIGVudGl0aWVzLCBpdCB1c2VzIHRoZSBBdXRvU2VhcmNoQ29tcGxldGVcclxuICogY29tcG9uZW50IHdoaWNoIGRpc3BsYXlzIGEgbGlzdCBvZiBzdWdnZXN0aW9uIGJhc2VkIG9uIGFuIEFQSSByZXR1cm5lZCByZXNwb25zZS4gVGhlbiB3aGVuXHJcbiAqIGFuIGVsZW1lbnQgaXMgc2VsZWN0ZWQgaXQgaXMgYWRkZWQgdG8gdGhlIHNlbGVjdGlvbiBjb250YWluZXIgcmVseWluZyBvbiB0aGUgcHJvdG90eXBlIHRlbXBsYXRlIHByb3ZpZGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHdpdGggRW50aXR5U2VhcmNoSW5wdXRUeXBlIGZvcm1zLCBhbmQgaXMgdGlnaHRseSBsaW5rZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhpc1xyXG4gKiB0d2lnIGZpbGUgc3JjL1ByZXN0YVNob3BCdW5kbGUvUmVzb3VyY2VzL3ZpZXdzL0FkbWluL1R3aWdUZW1wbGF0ZUZvcm0vZW50aXR5X3NlYXJjaF9pbnB1dC5odG1sLnR3aWdcclxuICpcclxuICogVGhlIGRlZmF1bHQgY29udGVudCBvZiB0aGUgY29sbGVjdGlvbiBpcyBhbiBFbnRpdHlJdGVtVHlwZSB3aXRoIGEgc2ltcGxlIGRlZmF1bHQgdGVtcGxhdGUgYnV0IHlvdSBjYW5cclxuICogZWl0aGVyIG92ZXJyaWRlIGl0IGluIGEgdGhlbWUgb3IgY3JlYXRlIHlvdXIgb3duIGVudGl0eSB0eXBlIGlmIHlvdSBuZWVkIHRvIGN1c3RvbWl6ZSB0aGUgYmVoYXZpb3VyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5U2VhcmNoSW5wdXQge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgJGVudGl0eVNlYXJjaElucHV0OiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgJGVudGl0aWVzQ29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgJGxpc3RDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSAkZW1wdHlTdGF0ZTogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnMhOiBFbnRpdHlTZWFyY2hJbnB1dE9wdGlvbnM7XHJcblxyXG4gIHByaXZhdGUgZW50aXR5UmVtb3RlU291cmNlITogQmxvb2Rob3VuZDtcclxuXHJcbiAgcHJpdmF0ZSBhdXRvU2VhcmNoITogQXV0b0NvbXBsZXRlU2VhcmNoO1xyXG5cclxuICBjb25zdHJ1Y3RvcigkZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXI6IEpRdWVyeSwgb3B0aW9uczogT3B0aW9uc09iamVjdCkge1xyXG4gICAgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIgPSAkZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXI7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSA8RW50aXR5U2VhcmNoSW5wdXRPcHRpb25zPnt9O1xyXG4gICAgdGhpcy5idWlsZE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXQgPSAkKHRoaXMub3B0aW9ucy5zZWFyY2hJbnB1dFNlbGVjdG9yLCB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcik7XHJcbiAgICB0aGlzLiRlbnRpdGllc0NvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLmVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIHRoaXMuJGxpc3RDb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5saXN0Q29udGFpbmVyU2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIHRoaXMuJGVtcHR5U3RhdGUgPSAkKHRoaXMub3B0aW9ucy5lbXB0eVN0YXRlU2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkUmVtb3RlU291cmNlKCk7XHJcbiAgICB0aGlzLmJ1aWxkQXV0b0NvbXBsZXRlU2VhcmNoKCk7XHJcbiAgICB0aGlzLmJ1aWxkQWN0aW9ucygpO1xyXG4gICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3JjZSBzZWxlY3RlZCB2YWx1ZXMsIHRoZSBpbnB1dCBpcyBhbiBhcnJheSBvZiBvYmplY3QgdGhhdCBtdXN0IG1hdGNoIHRoZSBmb3JtYXQgZnJvbVxyXG4gICAqIHRoZSBBUEkgaWYgeW91IHdhbnQgdGhlIHNlbGVjdGVkIGVudGl0aWVzIHRvIGJlIGNvcnJlY3RseSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmFsdWVzIHtBcnJheTxhbnk+fVxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0ZWRJdGVtcygpO1xyXG4gICAgaWYgKCF2YWx1ZXMgfHwgdmFsdWVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmFwcGVuZFNlbGVjdGVkSXRlbSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZCB0aGUgaXRlbSB0byB0aGUgc2VsZWN0aW9uLCByZXNwZWN0aW5nIHRoZSBjb25maWd1cmVkIGxpbWl0IHNvIGlmIGxpbWl0IGlzIGFscmVhZHkgcmVhY2hlZCB0aGUgaXRlbSBpcyBub3RcclxuICAgKiBhZGRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBuZXdJdGVtXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGJvb2xlYW5cclxuICAgKi9cclxuICBhZGRJdGVtKG5ld0l0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kU2VsZWN0ZWRJdGVtKG5ld0l0ZW0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG9wdGlvbk5hbWVcclxuICAgKi9cclxuICBnZXRPcHRpb24ob3B0aW9uTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uTmFtZVxyXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcclxuICAgKi9cclxuICBzZXRPcHRpb24ob3B0aW9uTmFtZTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bik6IHZvaWQge1xyXG4gICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gdmFsdWU7XHJcblxyXG4gICAgLy8gQXBwbHkgc3BlY2lhbCBvcHRpb25zIHRvIGNvbXBvbmVudHMgd2hlbiBuZWVkZWRcclxuICAgIGlmIChvcHRpb25OYW1lID09PSAncmVtb3RlVXJsJyAmJiB0aGlzLmVudGl0eVJlbW90ZVNvdXJjZSkge1xyXG4gICAgICAoPFJlY29yZDxzdHJpbmcsIGFueT4+IHRoaXMuZW50aXR5UmVtb3RlU291cmNlKS5yZW1vdGUudXJsID0gdGhpcy5vcHRpb25zLnJlbW90ZVVybDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZE9wdGlvbnMob3B0aW9uczogT3B0aW9uc09iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBPcHRpb25zT2JqZWN0ID0ge1xyXG4gICAgICBzdWdnZXN0aW9uRmllbGQ6ICduYW1lJyxcclxuICAgICAgcHJvdG90eXBlVGVtcGxhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgcHJvdG90eXBlSW5kZXg6ICdfX2luZGV4X18nLFxyXG4gICAgICBwcm90b3R5cGVNYXBwaW5nOiB7XHJcbiAgICAgICAgaWQ6ICdfX2lkX18nLFxyXG4gICAgICAgIG5hbWU6ICdfX25hbWVfXycsXHJcbiAgICAgICAgaW1hZ2U6ICdfX2ltYWdlX18nLFxyXG4gICAgICB9LFxyXG4gICAgICBpZGVudGlmaWVyRmllbGQ6ICdpZCcsXHJcbiAgICAgIGFsbG93RGVsZXRlOiB0cnVlLFxyXG4gICAgICBkYXRhTGltaXQ6IDAsXHJcbiAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgcmVtb3RlVXJsOiB1bmRlZmluZWQsXHJcbiAgICAgIGZpbHRlclNlbGVjdGVkOiB0cnVlLFxyXG4gICAgICBmaWx0ZXJlZElkZW50aXRpZXM6IFtdLFxyXG5cclxuICAgICAgcmVtb3ZlTW9kYWw6IHtcclxuICAgICAgICBpZDogJ21vZGFsLWNvbmZpcm0tcmVtb3ZlLWVudGl0eScsXHJcbiAgICAgICAgdGl0bGU6ICdEZWxldGUgaXRlbScsXHJcbiAgICAgICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPycsXHJcbiAgICAgICAgYXBwbHk6ICdEZWxldGUnLFxyXG4gICAgICAgIGNhbmNlbDogJ0NhbmNlbCcsXHJcbiAgICAgICAgYnV0dG9uQ2xhc3M6ICdidG4tZGFuZ2VyJyxcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIE1vc3Qgb2YgdGhlIHByZXZpb3VzIGNvbmZpZyBhcmUgY29uZmlndXJhYmxlIHZpYSB0aGUgRW50aXR5U2VhcmNoSW5wdXRGb3JtIG9wdGlvbnMsIHRoZSBmb2xsb3dpbmcgb25lcyBhcmUgb25seVxyXG4gICAgICAvLyBvdmVycmlkYWJsZSB2aWEganMgY29uZmlnIChhcyBsb25nIGFzIHlvdSB1c2UgdGhlIGRlZmF1bHQgdGVtcGxhdGUpXHJcbiAgICAgIHNlYXJjaElucHV0U2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLnNlYXJjaElucHV0U2VsZWN0b3IsXHJcbiAgICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3IsXHJcbiAgICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAubGlzdENvbnRhaW5lclNlbGVjdG9yLFxyXG4gICAgICBlbnRpdHlJdGVtU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVudGl0eUl0ZW1TZWxlY3RvcixcclxuICAgICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVudGl0eURlbGV0ZVNlbGVjdG9yLFxyXG4gICAgICBlbXB0eVN0YXRlU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmVtcHR5U3RhdGVTZWxlY3RvcixcclxuICAgICAgcXVlcnlXaWxkY2FyZDogJ19fUVVFUllfXycsXHJcblxyXG4gICAgICAvLyBUaGVzZSBhcmUgY29uZmlndXJhYmxlIGNhbGxiYWNrc1xyXG4gICAgICBvblJlbW92ZWRDb250ZW50OiB1bmRlZmluZWQsXHJcbiAgICAgIG9uU2VsZWN0ZWRDb250ZW50OiB1bmRlZmluZWQsXHJcbiAgICAgIHJlc3BvbnNlVHJhbnNmb3JtZXI6IChyZXNwb25zZTogYW55KSA9PiByZXNwb25zZSB8fCBbXSxcclxuXHJcbiAgICAgIC8vIFRlbXBsYXRlIGZ1bmN0aW9uXHJcbiAgICAgIHN1Z2dlc3Rpb25UZW1wbGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICBleHRyYVF1ZXJ5UGFyYW1zOiB1bmRlZmluZWQsXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRlZmF1bHRPcHRpb25zKS5mb3JFYWNoKChvcHRpb25OYW1lKSA9PiB7XHJcbiAgICAgIC8vIFRoaXMgZ2V0cyB0aGUgcHJvcGVyIHZhbHVlIGZvciBlYWNoIG9wdGlvbiwgcmVzcGVjdGluZyB0aGUgcHJpb3JpdHk6IGlucHV0ID4gZGF0YS1hdHRyaWJ1dGUgPiBkZWZhdWx0XHJcbiAgICAgIHRoaXMuaW5pdE9wdGlvbihvcHRpb25OYW1lLCBpbnB1dE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zW29wdGlvbk5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENhc3QgYWxsIElEcyBpbnRvIHN0cmluZyB0byBhdm9pZCBub3QgbWF0Y2hpbmcgYmVjYXVzZSBvZiBkaWZmZXJlbnQgdHlwZXNcclxuICAgIHRoaXMub3B0aW9ucy5maWx0ZXJlZElkZW50aXRpZXMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyZWRJZGVudGl0aWVzLm1hcChTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCB0aGUgb3B0aW9uIHZhbHVlLCB0aGUgaW5wdXQgY29uZmlnIGhhcyB0aGUgbW9yZSBwcmlvcml0eS4gSXQgb3ZlcnJpZGVzIHRoZSBkYXRhIGF0dHJpYnV0ZSBvcHRpb25cclxuICAgKiAoaWYgcHJlc2VudCksIGZpbmFsbHkgYSBkZWZhdWx0IHZhbHVlIGlzIHVzZWQgKGlmIGRlZmluZWQpLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbk5hbWVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRPcHRpb25zXHJcbiAgICogQHBhcmFtIHsqfHVuZGVmaW5lZH0gZGVmYXVsdE9wdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdE9wdGlvbihvcHRpb25OYW1lOiBzdHJpbmcsIGlucHV0T3B0aW9uczogT3B0aW9uc09iamVjdCwgZGVmYXVsdE9wdGlvbjogYW55ID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0T3B0aW9ucywgb3B0aW9uTmFtZSkpIHtcclxuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gaW5wdXRPcHRpb25zW29wdGlvbk5hbWVdO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIuZGF0YShvcHRpb25OYW1lKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIuZGF0YShvcHRpb25OYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IGRlZmF1bHRPcHRpb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkQWN0aW9ucygpOiB2b2lkIHtcclxuICAgIC8vIEFsd2F5cyBjaGVjayBmb3IgY2xpY2sgZXZlbiBpZiBpdCBpcyB1c2VsZXNzIHdoZW4gYWxsb3dEZWxldGUgb3B0aW9ucyBpcyBmYWxzZSwgaXQgY2FuIGJlIGNoYW5nZWQgZHluYW1pY2FsbHlcclxuICAgICQodGhpcy4kZW50aXRpZXNDb250YWluZXIpLm9uKCdjbGljaycsIHRoaXMub3B0aW9ucy5lbnRpdHlEZWxldGVTZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmFsbG93RGVsZXRlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCAkZW50aXR5ID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3Rvcik7XHJcblxyXG4gICAgICBjb25zdCBtb2RhbCA9IG5ldyAoQ29uZmlybU1vZGFsIGFzIGFueSkoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5pZCxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLnRpdGxlLFxyXG4gICAgICAgICAgY29uZmlybU1lc3NhZ2U6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5tZXNzYWdlLFxyXG4gICAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmNhbmNlbCxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmFwcGx5LFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuYnV0dG9uQ2xhc3MsXHJcbiAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICRlbnRpdHkucmVtb3ZlKCk7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uUmVtb3ZlZENvbnRlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vblJlbW92ZWRDb250ZW50KCRlbnRpdHkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgICAgIG1vZGFsLnNob3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZvciBub3cgYWRhcHQgdGhlIGRpc3BsYXkgYmFzZWQgb24gdGhlIGFsbG93RGVsZXRlIG9wdGlvblxyXG4gICAgY29uc3QgJGVudGl0eURlbGV0ZSA9ICQodGhpcy5vcHRpb25zLmVudGl0eURlbGV0ZVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcbiAgICAvLychIScgY29udmVydHMgb3B0aW9uIHRvIGJvb2wgKGJlY2F1c2UgaWYgaXRzIDEgb3IgMCwganF1ZXJ5IHRvZ2dsZSB3b3JrcyBkaWZmZXJlbnRseSB0aGFuIHdpdGggdHJ1ZS9mYWxzZSlcclxuICAgICRlbnRpdHlEZWxldGUudG9nZ2xlKCEhdGhpcy5vcHRpb25zLmFsbG93RGVsZXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSBBdXRvQ29tcGxldGVTZWFyY2ggY29tcG9uZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZEF1dG9Db21wbGV0ZVNlYXJjaCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGF1dG9TZWFyY2hDb25maWc6IElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMuZW50aXR5UmVtb3RlU291cmNlLFxyXG4gICAgICBkYXRhTGltaXQ6IHRoaXMub3B0aW9ucy5kYXRhTGltaXQsXHJcbiAgICAgIHZhbHVlOiB0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkLFxyXG4gICAgICBtaW5MZW5ndGg6IHRoaXMub3B0aW9ucy5taW5MZW5ndGgsXHJcbiAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgIHN1Z2dlc3Rpb246IChlbnRpdHk6IGFueSkgPT4gdGhpcy5zaG93U3VnZ2VzdGlvbihlbnRpdHkpLFxyXG4gICAgICB9LFxyXG4gICAgICBvblNlbGVjdDogKHNlbGVjdGVkSXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gV2hlbiBsaW1pdCBpcyBvbmUgd2UgY2Fubm90IHNlbGVjdCBhZGRpdGlvbmFsIGVsZW1lbnRzIHNvIHdlIHJlcGxhY2UgdGhlbSBpbnN0ZWFkXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kYXRhTGltaXQgPT09IDEpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRoZSBzZWFyY2ggZmVhdHVyZSBtYXkgYmUgZGlzYWJsZWQgc28gdGhlIHNlYXJjaCBpbnB1dCB3b24ndCBiZSBwcmVzZW50XHJcbiAgICBpZiAodGhpcy4kZW50aXR5U2VhcmNoSW5wdXQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuYXV0b1NlYXJjaCA9IG5ldyBBdXRvQ29tcGxldGVTZWFyY2goXHJcbiAgICAgICAgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXQsXHJcbiAgICAgICAgYXV0b1NlYXJjaENvbmZpZyxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd1N1Z2dlc3Rpb24oZW50aXR5OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLm9wdGlvbnMuc3VnZ2VzdGlvblRlbXBsYXRlKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25UZW1wbGF0ZShlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbnRpdHlJbWFnZSA9ICcnO1xyXG5cclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZW50aXR5LCAnaW1hZ2UnKSkge1xyXG4gICAgICBlbnRpdHlJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZW50aXR5LmltYWdlfVwiIC8+IGA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwic2VhcmNoLXN1Z2dlc3Rpb25cIj4ke2VudGl0eUltYWdlfSR7ZW50aXR5W3RoaXMub3B0aW9ucy5zdWdnZXN0aW9uRmllbGRdfTwvZGl2PmA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgQmxvb2Rob3VuZCByZW1vdGUgc291cmNlIHdoaWNoIHdpbGwgY2FsbCB0aGUgQVBJLiBUaGUgcGxhY2Vob2xkZXIgdG9cclxuICAgKiBpbmplY3QgdGhlIHF1ZXJ5IHNlYXJjaCBwYXJhbWV0ZXIgaXMgX19RVUVSWV9fXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Qmxvb2Rob3VuZH1cclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkUmVtb3RlU291cmNlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UgPSBuZXcgQmxvb2Rob3VuZCh7XHJcbiAgICAgIGRhdHVtVG9rZW5pemVyOiBCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZSxcclxuICAgICAgcXVlcnlUb2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxyXG4gICAgICBpZGVudGlmeShvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmpbdGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZF07XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW90ZToge1xyXG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnJlbW90ZVVybCxcclxuICAgICAgICByZXBsYWNlOiAocXVlcnk6IHN0cmluZywgc2VhcmNoUGhyYXNlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIC8vIG5lZWQgdG8gcmVwbGFjZSB3aWxkY2FyZCBtYW51YWxseSwgYmVjYXVzZSBoZXJlIHdlIGFyZSBvdmVycmlkaW5nIHRoZSBkZWZhdWx0IHJlcGxhY2UgZnVuY3Rpb25cclxuICAgICAgICAgIGNvbnN0IHVybCA9IHF1ZXJ5LnJlcGxhY2UodGhpcy5vcHRpb25zLnF1ZXJ5V2lsZGNhcmQsIHNlYXJjaFBocmFzZSk7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeVBhcmFtcykpIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBhbGxvd3MgYXBwZW5kaW5nIGV4dHJhIHBhcmFtZXRlcnMgdG8gdGhlIHF1ZXJ5LCBzdWNoIGFzIHNob3BJZFxyXG4gICAgICAgICAgICBjb25zdCBleHRyYVBhcmFtcyA9IHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRFeHRyYVBhcmFtcyA9IE9iamVjdFxyXG4gICAgICAgICAgICAgIC5rZXlzKGV4dHJhUGFyYW1zKVxyXG4gICAgICAgICAgICAgIC5tYXAoKGtleTogc3RyaW5nKSA9PiBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGV4dHJhUGFyYW1zW2tleV0pfWApXHJcbiAgICAgICAgICAgICAgLmpvaW4oJyYnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHt1cmx9JiR7ZW5jb2RlZEV4dHJhUGFyYW1zfWA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICB0cmFuc2Zvcm06IChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkUmVzcG9uc2UgPSB0aGlzLm9wdGlvbnMucmVzcG9uc2VUcmFuc2Zvcm1lcihyZXNwb25zZSk7XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZElkczogc3RyaW5nW10gPSB0aGlzLmdldFNlbGVjdGVkSWRzKCk7XHJcbiAgICAgICAgICBjb25zdCBzdWdnZXN0ZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2UuZm9yRWFjaCgocmVzcG9uc2VJdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8gRm9yY2UgY2FzdGluZyB0byBzdHJpbmcgdG8gYXZvaWQgaW5lcXVhbGl0eSB3aXRoIG51bWJlciBJRHMgYmVjYXVzZSBvZiB0eXBlXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlSWRlbnRpZmllcjogc3RyaW5nID0gU3RyaW5nKHJlc3BvbnNlSXRlbVt0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzSWRDb250YWluZWQgPSB0aGlzLm9wdGlvbnMuZmlsdGVyU2VsZWN0ZWQgJiYgc2VsZWN0ZWRJZHMuaW5jbHVkZXMocmVzcG9uc2VJZGVudGlmaWVyKTtcclxuICAgICAgICAgICAgY29uc3QgaXNGaWx0ZXJlZCA9IHRoaXMub3B0aW9ucy5maWx0ZXJlZElkZW50aXRpZXMuaW5jbHVkZXMocmVzcG9uc2VJZGVudGlmaWVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNJZENvbnRhaW5lZCAmJiAhaXNGaWx0ZXJlZCkge1xyXG4gICAgICAgICAgICAgIHN1Z2dlc3RlZEl0ZW1zLnB1c2gocmVzcG9uc2VJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHN1Z2dlc3RlZEl0ZW1zO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgc2VsZWN0ZWQgaXRlbXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhclNlbGVjdGVkSXRlbXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRlbnRpdGllc0NvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBjb21wb25lbnQgaXMgY29uZmlndXJlZCB0byBoYXZlIG9ubHkgb25lIHNlbGVjdGVkIGVsZW1lbnQgb24gZWFjaCBzZWxlY3Rpb25cclxuICAgKiB0aGUgcHJldmlvdXMgc2VsZWN0aW9uIGlzIHJlbW92ZWQgYW5kIHRoZW4gcmVwbGFjZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc2VsZWN0ZWRJdGVtIHtPYmplY3R9XHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXBsYWNlU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0ZWRJdGVtcygpO1xyXG4gICAgdGhpcy5hZGRTZWxlY3RlZENvbnRlbnRUb0NvbnRhaW5lcihzZWxlY3RlZEl0ZW0pO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY29tcG9uZW50IGlzIGNvbmZpZ3VyZWQgdG8gaGF2ZSBtb3JlIHRoYW4gb25lIHNlbGVjdGVkIGl0ZW0gb24gZWFjaCBzZWxlY3Rpb25cclxuICAgKiB0aGUgaXRlbSBpcyBhZGRlZCB0byB0aGUgbGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWxlY3RlZEl0ZW0ge09iamVjdH1cclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIGFwcGVuZFNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gSWYgY29sbGVjdGlvbiBsZW5ndGggaXMgdXAgdG8gbGltaXQsIHJldHVyblxyXG4gICAgY29uc3QgJGVudGl0eUl0ZW1zID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kYXRhTGltaXQgIT09IDAgJiYgJGVudGl0eUl0ZW1zLmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMuZGF0YUxpbWl0KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZFNlbGVjdGVkQ29udGVudFRvQ29udGFpbmVyKHNlbGVjdGVkSXRlbSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUVtcHR5U3RhdGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCAkZW50aXR5SXRlbXMgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIHRoaXMuJGVtcHR5U3RhdGUudG9nZ2xlKCRlbnRpdHlJdGVtcy5sZW5ndGggPT09IDApO1xyXG4gICAgdGhpcy4kbGlzdENvbnRhaW5lci50b2dnbGUoJGVudGl0eUl0ZW1zLmxlbmd0aCAhPT0gMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIHNlbGVjdGVkIGNvbnRlbnQgdG8gdGhlIHNlbGVjdGlvbiBjb250YWluZXIsIHRoZSBIVE1MIGlzIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgcmVuZGVyIHRoYXQgcmVsaWVzIG9uIHRoZVxyXG4gICAqIHByb3RvdHlwZSB0ZW1wbGF0ZSBhbmQgbWFwcGluZywgYW5kIGZpbmFsbHkgdGhlIHJlbmRlcmVkIHNlbGVjdGlvbiBpcyBhZGRlZCB0byB0aGUgbGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RlZEl0ZW1cclxuICAgKi9cclxuICBwcml2YXRlIGFkZFNlbGVjdGVkQ29udGVudFRvQ29udGFpbmVyKHNlbGVjdGVkSXRlbTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCAkZW50aXR5SXRlbXMgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIGNvbnN0IG5ld0luZGV4ID0gJGVudGl0eUl0ZW1zLmxlbmd0aCA/IHRoaXMuZ2V0SW5kZXhGcm9tSXRlbSgkZW50aXR5SXRlbXMubGFzdCgpKSArIDEgOiAwO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIdG1sID0gdGhpcy5yZW5kZXJTZWxlY3RlZChzZWxlY3RlZEl0ZW0sIG5ld0luZGV4KTtcclxuXHJcbiAgICBjb25zdCAkc2VsZWN0ZWROb2RlID0gJChzZWxlY3RlZEh0bWwpO1xyXG4gICAgY29uc3QgJGVudGl0eURlbGV0ZSA9ICQodGhpcy5vcHRpb25zLmVudGl0eURlbGV0ZVNlbGVjdG9yLCAkc2VsZWN0ZWROb2RlKTtcclxuICAgICRlbnRpdHlEZWxldGUudG9nZ2xlKCEhdGhpcy5vcHRpb25zLmFsbG93RGVsZXRlKTtcclxuXHJcbiAgICB0aGlzLiRlbnRpdGllc0NvbnRhaW5lci5hcHBlbmQoJHNlbGVjdGVkTm9kZSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25TZWxlY3RlZENvbnRlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5vblNlbGVjdGVkQ29udGVudCgkc2VsZWN0ZWROb2RlLCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcnkgYW5kIGZpbmQgdGhlIGluZGV4IG9mIGFuIGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24gYnkgcGFyc2luZyBpdHMgaW5wdXRzIG5hbWVzIHdoaWNoIHNob3VsZCBsb29rIGxpa2U6XHJcbiAgICpcclxuICAgKiBmb3JtW2NvbGxlY3Rpb25dWzBdW25hbWVdLCBmb3JtW2NvbGxlY3Rpb25dWzFdW2lkXSA9PiB3ZSBhaW0gdG8gZXh0cmFjdCB0aGUgMVxyXG4gICAqXHJcbiAgICogV2Ugc2VhcmNoIGZvciB0aGUgbmFtZSBtYXRjaGluZyB0aGUgY29uZmlndXJlZCBpZGVudGlmaWVyLCBhbmQgZXh0cmFjdCBpdHMgaW5kZXguIFRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2VcclxuICAgKiB3aGVuIHlvdSBlZGl0IGEgY29sbGVjdGlvbiwgeW91IGNhbiBhZGQgdGhlbiByZW1vdmUgdGhlbiBhZGQgYW4gZWxlbWVudCBhZ2FpbiwgdGhlIGluZGV4ZXMgYXJlIG5vdCBnb25uYSBmb2xsb3dcclxuICAgKiBzbyB5b3UgY2Fubm90IHJlbHkgb24ganVzdCB0aGUgaW5kZXggZnJvbSBlbGVtZW50IG9yZGVyLiBXaGljaCBpcyB3aHkgaXQgaXMgbW9yZSBhY2N1cmF0ZSB0byBwYXJzZSB0aGUgaW5kZXggdGhhdFxyXG4gICAqIHdhcyB1c2VkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIGJlZW4gcmVuZGVyZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG4gICAqXHJcbiAgICogSWYgd2UgY2FuJ3QgZmluZCBhbnl0aGluZyB3ZSB1c2UgdGhlIG9yZGVyIGluZGV4IGFzIGZhbGxiYWNrIHRob3VnaC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSAkaXRlbVxyXG4gICAqXHJcbiAgICogQHJldHVybiBudW1iZXJcclxuICAgKi9cclxuICBwcml2YXRlIGdldEluZGV4RnJvbUl0ZW0oJGl0ZW06IEpRdWVyeSk6IG51bWJlciB7XHJcbiAgICAvLyBCeSBkZWZhdWx0IHVzZSB0aGUgcG9zaXRpb24gaW5kZXhcclxuICAgIGxldCBpbmRleCA9ICRpdGVtLmluZGV4KCk7XHJcblxyXG4gICAgLy8gVHJ5IHRvIGZpbmQgYW4gaW5wdXQgd2hpY2ggbmFtZXMgY29udGFpbnMgWzFdW2lkXSAod2hlcmUgMSBpcyB0aGUgaW5kZXgsIGFuZCBpZCB0aGUgaWRlbnRpZmllcilcclxuICAgIGNvbnN0IGlkZW50aWZpZXJOYW1lUmVnZXhwOiBzdHJpbmcgPSBgXFxcXFsoXFxcXGQrKVxcXFxdXFxcXFske3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGR9XFxcXF1gO1xyXG4gICAgY29uc3QgaW5wdXRzID0gJGl0ZW0uZmluZCgnaW5wdXQnKTtcclxuICAgIGlucHV0cy5lYWNoKChpbnB1dEluZGV4OiBudW1iZXIsIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5uYW1lLm1hdGNoKGlkZW50aWZpZXJOYW1lUmVnZXhwKTtcclxuXHJcbiAgICAgIC8vIEV4dHJhY3QgdGhlIGluZGV4IGZyb20gdGhlIGlucHV0IG5hbWUsIGlmIGl0IGlzIGZvdW5kIGFuZCBpcyBhIG51bWJlciB1c2UgaXQgYXMgdGhlIGluZGV4XHJcbiAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBwYXJzZUludChtYXRjaGVzWzFdLCAxMCk7XHJcblxyXG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKGZvdW5kSW5kZXgpKSB7XHJcbiAgICAgICAgICBpbmRleCA9IGZvdW5kSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXIgdGhlIHNlbGVjdGVkIGVsZW1lbnQsIHRoaXMgd2lsbCBiZSBhcHBlbmRlZCBpbiB0aGUgc2VsZWN0aW9uIGxpc3QgKHVsKSwgcHJvdG90eXBlVGVtcGxhdGUgaXMgdXNlZCBhcyB0aGVcclxuICAgKiBiYXNlIHRoZSB3ZSByZWx5IG9uIHByb3RvdHlwZU1hcHBpbmcgdG8gcmVwbGFjZSBldmVyeSBwbGFjZWhvbGRlcnMgaW4gdGhlIHRlbXBsYXRlIGJ5IHRoZWlyIG1hcHBpbmcgdmFsdWUgaW4gdGhlXHJcbiAgICogcHJvdmlkZWQgZW50aXR5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGVudGl0eVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBwcml2YXRlIHJlbmRlclNlbGVjdGVkKGVudGl0eTogYW55LCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wcm90b3R5cGVUZW1wbGF0ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnByb3RvdHlwZUluZGV4LCAnZycpLCBTdHJpbmcoaW5kZXgpKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucHJvdG90eXBlTWFwcGluZykuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBlbnRpdHlbZmllbGROYW1lXSB8fCAnJztcclxuICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnByb3RvdHlwZU1hcHBpbmdbZmllbGROYW1lXSwgJ2cnKSwgZmllbGRWYWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJzZXMgdGhlIHNlbGVjdGlvbiBjb250YWluZXIgYW5kIGV4dHJhY3QgdGhlIElEcyB0aGlzIGFsbG93cyB0byBmaWx0ZXIgdGhlIGFscmVhZHkgc2VsZWN0ZWQgaXRlbXMuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0U2VsZWN0ZWRJZHMoKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBjb25zdCBzZWxlY3RlZENoaWxkcmVuID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcbiAgICBzZWxlY3RlZENoaWxkcmVuLmVhY2goKGluZGV4OiBudW1iZXIsIHNlbGVjdGVkQ2hpbGQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGlkZW50aWZpZXJOYW1lUmVnZXhwOiBzdHJpbmcgPSBgXFxcXFske3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGR9XFxcXF1gO1xyXG4gICAgICBjb25zdCBpbnB1dHMgPSAkKHNlbGVjdGVkQ2hpbGQpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgIGlucHV0cy5lYWNoKChpbnB1dEluZGV4OiBudW1iZXIsIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKGlucHV0Lm5hbWUubWF0Y2goaWRlbnRpZmllck5hbWVSZWdleHApKSB7XHJcbiAgICAgICAgICBzZWxlY3RlZElkcy5wdXNoKGlucHV0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkSWRzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtFdmVudEVtaXR0ZXIgYXMgRXZlbnRFbWl0dGVyQ2xhc3N9IGZyb20gJ2V2ZW50cyc7XHJcblxyXG4vKipcclxuICogV2UgaW5zdGFuY2lhdGUgb25lIEV2ZW50RW1pdHRlciAocmVzdHJpY3RlZCB2aWEgYSBjb25zdCkgc28gdGhhdCBldmVyeSBjb21wb25lbnRzXHJcbiAqIHJlZ2lzdGVyL2Rpc3BhdGNoIG9uIHRoZSBzYW1lIG9uZSBhbmQgY2FuIGNvbW11bmljYXRlIHdpdGggZWFjaCBvdGhlci5cclxuICovXHJcbmV4cG9ydCBjb25zdCBFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyQ2xhc3MoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtDb25maXJtTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5pbXBvcnQge0lmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5pbXBvcnQge0Zvcm1JZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHtcclxuICBNb2RhbCxcclxuICBDb25maXJtTW9kYWwsXHJcbiAgSWZyYW1lTW9kYWwsXHJcbiAgRm9ybUlmcmFtZU1vZGFsLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgZm9vdGVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxufVxyXG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICBjb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gIGN1c3RvbUJ1dHRvbnM6IEFycmF5PEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTEFuY2hvckVsZW1lbnQ+O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXHJcbiAqIGluIHRoZSBib2R5LCBpdCBpcyBtb3N0bHkgdXNlZCBhcyBhIFJpY2ggY29uZmlybSBkaWFsb2cgYm94LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgZm9vdGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1NZXNzYWdlO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2J0bicsXHJcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MsXHJcbiAgICAgICdidG4tbGcnLFxyXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0Q29uZmlybU1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyxcclxuICAgIGNvbmZpcm1DYWxsYmFjaz86IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICBsZXQgY29uZmlybU1vZGFsQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxyXG4gICAgICAvLyBidXQgd2hlbiB3ZSByZW1vdmUgZGVwcmVjYXRpb24gaXQgd2lsbCBiZWNvbWUgbWFuZGF0b3J5LCBhIGNvbmZpcm0gY2FsbGJhY2sgc2hvdWxkIGFsd2F5cyBiZSBzcGVjaWZpZWRcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgY2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcclxuICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAnQWNjZXB0JyxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICBjdXN0b21CdXR0b25zOiBbXSxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiBjb25maXJtTW9kYWxDYWxsYmFjayxcclxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBDb25maXJtTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IElmcmFtZU1vZGFsLCB7XHJcbiAgSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgSWZyYW1lTW9kYWxUeXBlLCBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxUeXBlID0gSWZyYW1lTW9kYWxUeXBlXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBmb3JtRGF0YTogRm9ybURhdGEsXHJcbiAgZGF0YUF0dHJpYnV0ZXM6IERPTVN0cmluZ01hcCB8IG51bGwsXHJcbiAgZXZlbnQ6IEV2ZW50LFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gIGV2ZW50OiBFdmVudFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBPbWl0PElmcmFtZU1vZGFsUGFyYW1zLCAnaWZyYW1lVXJsJyB8ICdvbkxvYWRlZCcgfCAnY29uZmlybUNhbGxiYWNrJz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nO1xyXG4gIGZvcm1TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZztcclxuICBvbkZvcm1Mb2FkZWQ/OiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICBmb3JtQ29uZmlybUNhbGxiYWNrPzogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayxcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8Rm9ybUlmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7IC8vIGZvcm1VcmwgaXMgbWFuZGF0b3J5IGluIHBhcmFtc1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXHJcbiAqIE9uIGVhY2ggbG9hZCBpdCBpcyBhYmxlIHRvIHJldHVybiBkYXRhIGZyb20gdGhlIGZvcm0gdmlhIHRoZSBvbkZvcm1Mb2FkZWQgY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtSWZyYW1lTW9kYWwgZXh0ZW5kcyBJZnJhbWVNb2RhbCBpbXBsZW1lbnRzIEZvcm1JZnJhbWVNb2RhbFR5cGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGFyYW1zOiBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IGlmcmFtZVBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWZyYW1lVXJsOiBwYXJhbXMuZm9ybVVybCxcclxuICAgICAgb25Mb2FkZWQ6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uSWZyYW1lTG9hZGVkKFxyXG4gICAgICAgICAgaWZyYW1lLFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBwYXJhbXMub25Gb3JtTG9hZGVkLFxyXG4gICAgICAgICAgcGFyYW1zLmNhbmNlbEJ1dHRvblNlbGVjdG9yID8/ICcuY2FuY2VsLWJ0bicsXHJcbiAgICAgICAgICBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uQ29uZmlybUNhbGxiYWNrKGlmcmFtZSwgZXZlbnQsIHBhcmFtcy5mb3JtQ29uZmlybUNhbGxiYWNrLCBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoaWZyYW1lUGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25JZnJhbWVMb2FkZWQoXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgb25Gb3JtTG9hZGVkOiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICAgIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghb25Gb3JtTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsb3NlIG1vZGFsIHdoZW4gY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICBjb25zdCBjYW5jZWxCdXR0b25zID0gaWZyYW1lRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNhbmNlbEJ1dHRvblNlbGVjdG9yKTtcclxuICAgIGNhbmNlbEJ1dHRvbnMuZm9yRWFjaCgoY2FuY2VsQnV0dG9uKSA9PiB7XHJcbiAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvbkZvcm1Mb2FkZWQoaWZyYW1lRm9ybSwgbmV3IEZvcm1EYXRhKGlmcmFtZUZvcm0pLCBpZnJhbWVGb3JtLmRhdGFzZXQgPz8gbnVsbCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNvbmZpcm1DYWxsYmFjayhcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrOiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrIHwgdW5kZWZpbmVkLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIWZvcm1Db25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjayhpZnJhbWVGb3JtLCBpZnJhbWUsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBmb3JtU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRm9ybUVsZW1lbnQ+KGZvcm1TZWxlY3Rvcik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZnJhbWVFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGFyZW50V2luZG93RXZlbnQ6IHN0cmluZyA9ICdJZnJhbWVDbGllbnRFdmVudCc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnROYW1lOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRQYXJhbWV0ZXJzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBhbnkgPSB7fSkge1xyXG4gICAgc3VwZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICB0aGlzLmV2ZW50UGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnROYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmFtZXRlcnMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50UGFyYW1ldGVycztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IElmcmFtZUV2ZW50IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICBsb2FkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHNwaW5uZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChpZnJhbWU6SFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uID0gKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgbG9hZHMgYW4gdXJsXHJcbiAgb25Mb2FkZWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBpcyBhYm91dCB0byB1bmxvYWQgaXRzIGNvbnRlbnRcclxuICBvblVubG9hZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gVGhlIGlmcmFtZSBjYW4gbGF1bmNoIElmcmFtZUV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCB2aWEgdGhpcyBjYWxsYmFja1xyXG4gIG9uSWZyYW1lRXZlbnQ/OiBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gSW5pdGlhbCB1cmwgb2YgdGhlIGlmcmFtZVxyXG4gIGlmcmFtZVVybDogc3RyaW5nO1xyXG4gIC8vIFdoZW4gdHJ1ZSB0aGUgaWZyYW1lIGhlaWdodCBpcyBjb21wdXRlZCBiYXNlZCBvbiBpdHMgY29udGVudFxyXG4gIGF1dG9TaXplOiBib29sZWFuO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgdGhlIGlmcmFtZSBpcyB1c2VkIGFzIGEgcmVmZXJlbmNlIG9mIGl0cyBjb250ZW50J3Mgc2l6ZSBidXQgdGhpcyBvcHRpb24gY2FuIGN1c3RvbWl6ZSBpdFxyXG4gIGF1dG9TaXplQ29udGFpbmVyOiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY2xvc2UgYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNsb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY29uZmlybSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIENhbGxiYWNrIHdoZW4gdGhlIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWRcclxuICBjb25maXJtQ2FsbGJhY2s/OiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGlmcmFtZSBjbG9zZXMgd2hlbiBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGlzIG9wdGlvbnMgb3ZlcnJpZGVzIHRoaXMgYmVoYXZpb3VyXHJcbiAgY2xvc2VPbkNvbmZpcm06IGJvb2xlYW47XHJcbiAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIHJlZnJlc2hlZCBhdXRvIHNjcm9sbCB1cCB0aGUgYm9keSBjb250YWluZXIgKHRydWUgYnkgZGVmYXVsdClcclxuICBhdXRvU2Nyb2xsVXA6IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8SWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGlmcmFtZVVybDogc3RyaW5nOyAvLyBpZnJhbWVVcmwgaXMgbWFuZGF0b3J5IGluIGlucHV0XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBhbiBpZnJhbWUgdG8gbG9hZCBleHRlcm5hbCBjb250ZW50IGFsb25nIHdpdGggYVxyXG4gKiBsb2FkZXIgZGl2IG9uIHRvcCBvZiBpdC5cclxuICpcclxuICogQHBhcmFtIHtJbnB1dElmcmFtZU1vZGFsUGFyYW1zfSBpbnB1dFBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZSE6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuICBsb2FkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgc3Bpbm5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBmb290ZXI/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUnKTtcclxuXHJcbiAgICAvLyBNZXNzYWdlIGlzIGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgIHRoaXMuaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcclxuICAgIHRoaXMuaWZyYW1lLndpZHRoID0gJzEwMCUnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCduYW1lJywgYCR7cGFyYW1zLmlkfS1pZnJhbWVgKTtcclxuICAgIGlmICghcGFyYW1zLmF1dG9TaXplKSB7XHJcbiAgICAgIHRoaXMuaWZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xyXG5cclxuICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xyXG4gKiAtIG9uTG9hZGVkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGhhcyBqdXN0ZSBiZWVuIHJlZnJlc2hlZFxyXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBJZnJhbWVNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemUhOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnaWZyYW1lLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBhdXRvU2l6ZTogdHJ1ZSxcclxuICAgICAgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyxcclxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgIGF1dG9TY3JvbGxVcDogdHJ1ZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgY29udGFpbmVyXHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcclxuICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGxvYWRlZEV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXHJcbiAgICAgIHRoaXMubW9kYWwuYm9keS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xyXG4gICAgICAgIHBhcmFtcy5vbkxvYWRlZCh0aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKHVubG9hZEV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMub25VbmxvYWQodGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluaXRBdXRvUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zLm9uSWZyYW1lRXZlbnQpIHtcclxuICAgICAgICBwYXJhbXMub25JZnJhbWVFdmVudChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAocGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSwgdXNlSW5uZXJUZXh0OiBib29sZWFuID0gZmFsc2UpOiB0aGlzIHtcclxuICAgIGlmICh1c2VJbm5lclRleHQpIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoaGlkZUlmcmFtZSkge1xyXG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIGNvbnN0IGJvZHlXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJXaWR0aCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS53aWR0aCA9IGAke2JvZHlXaWR0aH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlc2l6YWJsZUNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuYXV0b1NpemUgJiYgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhblJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgY29uc3QgaWZyYW1lU2Nyb2xsSGVpZ2h0ID0gaWZyYW1lQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5tZXNzYWdlKVxyXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXHJcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gV2UgZm9yY2UgdGhlIGlmcmFtZSB0byBpdHMgcmVhbCBoZWlnaHQgYW5kIGl0J3MgdGhlIGNvbnRhaW5lciB0aGF0IGhhbmRsZXMgdGhlIG92ZXJmbG93IHdpdGggc2Nyb2xsYmFyc1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2NvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVySGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIGhlaWdodCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSwgMTApO1xyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldFdpZHRoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcclxuXHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XHJcbiAgY29udGVudDogSFRNTEVsZW1lbnQ7XHJcbiAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb3JlVHlwZSB7XHJcbiAgc2hvdzogKCkgPT4gdm9pZDtcclxuICBoaWRlOiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XHJcbiAgbW9kYWw6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ3NzUHJvcHMgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5leHBvcnQgdHlwZSBNb2RhbFBhcmFtcyA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNsb3NhYmxlPzogYm9vbGVhbjtcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nXHJcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcclxuICBjbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgbW9kYWwgY29udGFpbmVyIChvbmx5IHRoZSBtb2RhbCBhbmQgZGlhbG9nIGJveCwgd2l0aCBhIGNsb3NlIGljb25cclxuICogYW5kIGFuIG9wdGlvbmFsIHRpdGxlKS4gTm8gZm9vdGVyIGFuZCBubyBjb250ZW50IGlzIGhhbmRsZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnRlbnQhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbWVzc2FnZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcclxuICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1kaWFsb2cnKTtcclxuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmtleXMocGFyYW1zLmRpYWxvZ1N0eWxlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNvbnRlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxyXG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhlYWRlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIHRpdGxlIGVsZW1lbnRcclxuICAgIGlmIChwYXJhbXMubW9kYWxUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5tb2RhbFRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBpY29uXHJcbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5pbm5lckhUTUwgPSAnw5cnO1xyXG5cclxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtYm9keScsICd0ZXh0LWxlZnQnLCAnZm9udC13ZWlnaHQtbm9ybWFsJyk7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSBtb2RhbFxyXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZSk7XHJcbiAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZUNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWwgaW1wbGVtZW50cyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgJG1vZGFsITogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbW9kYWwsIGNoZWNrIGlmIGl0IGFscmVhZHkgZXhpc3RzIFRoaXMgYWxsb3dzIGNoaWxkIGNsYXNzZXMgdG8gdXNlIHRoZWlyIGN1c3RvbSBjb250YWluZXJcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8galF1ZXJ5IG1vZGFsIG9iamVjdFxyXG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB7aWQsIGNsb3NhYmxlfSA9IHBhcmFtcztcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKHtcclxuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxyXG4gICAgICBrZXlib2FyZDogY2xvc2FibGUgIT09IHVuZGVmaW5lZCA/IGNsb3NhYmxlIDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuXHJcbiAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKG1vZGFsVGl0bGU6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgaWYgKCF0aGlzLm1vZGFsLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmNsb3NlSWNvbikge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC50aXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAvLyBTb21ldGltZXMgbW9kYWwgYW5pbWF0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCBoaWRpbmcgZmFpbHMsIHNvIHdlIGF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgdGhhdCBjYXNlLlxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB0aGlzLiRtb2RhbC5vZmYoJ3Nob3duLmJzLm1vZGFsJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcmVkaXJlY3RPcHRpb246IHtcclxuICAgIHR5cGVJbnB1dDogJyNjYXRlZ29yeV9yZWRpcmVjdF9vcHRpb25fdHlwZScsXHJcbiAgICB0YXJnZXRJbnB1dDogJyNjYXRlZ29yeV9yZWRpcmVjdF9vcHRpb25fdGFyZ2V0JyxcclxuICAgIGdyb3VwU2VsZWN0b3I6ICcuZm9ybS1ncm91cCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBFbnRpdHlTZWFyY2hJbnB1dCBmcm9tICdAY29tcG9uZW50cy9lbnRpdHktc2VhcmNoLWlucHV0JztcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XHJcbmltcG9ydCBDYXRlZ29yeU1hcCBmcm9tICdAcGFnZXMvY2F0ZWdvcnkvY2F0ZWdvcnktbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIGluIGNhdGVnb3J5IHBhZ2UgdG8gc2VsZWN0ZWQgd2hlcmUgdGhlIHJlZGlyZWN0aW9uIHBvaW50cyB0byB3aGVuIHRoZVxyXG4gKiBjYXRlZ29yeSBpcyBkaXNhYmxlZC4gSXQgaXMgY29tcG9zZWQgb24gdHdvIGlucHV0czpcclxuICogLSBhIHNlbGVjdGlvbiBvZiB0aGUgcmVkaXJlY3Rpb24gdHlwZVxyXG4gKiAtIGEgcmljaCBjb21wb25lbnQgdG8gc2VsZWN0IGEgY2F0ZWdvcnlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZGlyZWN0T3B0aW9uTWFuYWdlciB7XHJcbiAgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI7XHJcblxyXG4gICRyZWRpcmVjdFR5cGVJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICAkcmVkaXJlY3RUYXJnZXRJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICAkcmVkaXJlY3RUYXJnZXRSb3c6IEpRdWVyeTtcclxuXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQhOiBFbnRpdHlTZWFyY2hJbnB1dDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGV2ZW50RW1pdHRlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlciA9IGV2ZW50RW1pdHRlcjtcclxuICAgIHRoaXMuJHJlZGlyZWN0VHlwZUlucHV0ID0gJChDYXRlZ29yeU1hcC5yZWRpcmVjdE9wdGlvbi50eXBlSW5wdXQpO1xyXG4gICAgdGhpcy4kcmVkaXJlY3RUYXJnZXRJbnB1dCA9ICQoQ2F0ZWdvcnlNYXAucmVkaXJlY3RPcHRpb24udGFyZ2V0SW5wdXQpO1xyXG5cclxuICAgIC8vIFRhcmdldCBvbmx5IGlucHV0cyBwcmVzZW50IGluIHRoZSByZWRpcmVjdCB0YXJnZXQgcm93XHJcbiAgICB0aGlzLiRyZWRpcmVjdFRhcmdldFJvdyA9IHRoaXMuJHJlZGlyZWN0VGFyZ2V0SW5wdXQuY2xvc2VzdChDYXRlZ29yeU1hcC5yZWRpcmVjdE9wdGlvbi5ncm91cFNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAodGhpcy4kcmVkaXJlY3RUYXJnZXRJbnB1dC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5lbnRpdHlTZWFyY2hJbnB1dCA9IG5ldyBFbnRpdHlTZWFyY2hJbnB1dCh0aGlzLiRyZWRpcmVjdFRhcmdldElucHV0LCB7fSk7XHJcbiAgICAgIHRoaXMud2F0Y2hSZWRpcmVjdFR5cGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdhdGNoIHRoZSBzZWxlY3RlZCByZWRpcmVjdGlvbiB0eXBlIGFuZCBhZGFwdCB0aGUgaW5wdXRzIGFjY29yZGluZ2x5LlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoUmVkaXJlY3RUeXBlKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kcmVkaXJlY3RUeXBlSW5wdXQub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgY29uc3QgcmVkaXJlY3RUeXBlID0gdGhpcy4kcmVkaXJlY3RUeXBlSW5wdXQudmFsKCk7XHJcblxyXG4gICAgICBzd2l0Y2ggKHJlZGlyZWN0VHlwZSkge1xyXG4gICAgICAgIGNhc2UgJzMwMSc6XHJcbiAgICAgICAgY2FzZSAnMzAyJzpcclxuICAgICAgICAgIHRoaXMuZW50aXR5U2VhcmNoSW5wdXQuc2V0VmFsdWVzKFtdKTtcclxuICAgICAgICAgIHRoaXMuc2hvd1RhcmdldCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnNDA0JzpcclxuICAgICAgICBjYXNlICc0MTAnOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB0aGlzLmVudGl0eVNlYXJjaElucHV0LnNldFZhbHVlcyhbXSk7XHJcbiAgICAgICAgICB0aGlzLmhpZGVUYXJnZXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd1RhcmdldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuJHJlZGlyZWN0VGFyZ2V0Um93LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlkZVRhcmdldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuJHJlZGlyZWN0VGFyZ2V0Um93LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hpbXMgdGhhdCBwcm92aWRlIG1pbmltYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgRVM2IGNvbGxlY3Rpb25zLlxyXG4gKlxyXG4gKiBUaGVzZSBpbXBsZW1lbnRhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIFJlc2l6ZU9ic2VydmVyXHJcbiAqIG1vZHVsZXMgYXMgdGhleSBjb3ZlciBvbmx5IGEgbGltaXRlZCByYW5nZSBvZiB1c2UgY2FzZXMuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jLCB2YWxpZC1qc2RvYyAqL1xyXG52YXIgTWFwU2hpbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluZGV4IGluIHByb3ZpZGVkIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYXJyXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoYXJyLCBrZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgYXJyLnNvbWUoZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbMF0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbnRyaWVzX18ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fX2VudHJpZXNfX1tpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVsxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX19baW5kZXhdWzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnB1c2goW2tleSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5fX2VudHJpZXNfXztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoZW50cmllcywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfmdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gW2N0eD1udWxsXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ID09PSB2b2lkIDApIHsgY3R4ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fX2VudHJpZXNfXzsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlbnRyeVsxXSwgZW50cnlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oKSk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBEZXRlY3RzIHdoZXRoZXIgd2luZG93IGFuZCBkb2N1bWVudCBvYmplY3RzIGFyZSBhdmFpbGFibGUgaW4gY3VycmVudCBlbnZpcm9ubWVudC5cclxuICovXHJcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCA9PT0gZG9jdW1lbnQ7XG5cbi8vIFJldHVybnMgZ2xvYmFsIG9iamVjdCBvZiBhIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbnZhciBnbG9iYWwkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgIHJldHVybiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG59KSgpO1xuXG4vKipcclxuICogQSBzaGltIGZvciB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoaWNoIGZhbGxzIGJhY2sgdG8gdGhlIHNldFRpbWVvdXQgaWZcclxuICogZmlyc3Qgb25lIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJlcXVlc3RzJyBpZGVudGlmaWVyLlxyXG4gKi9cclxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gSXQncyByZXF1aXJlZCB0byB1c2UgYSBib3VuZGVkIGZ1bmN0aW9uIGJlY2F1c2UgSUUgc29tZXRpbWVzIHRocm93c1xyXG4gICAgICAgIC8vIGFuIFwiSW52YWxpZCBjYWxsaW5nIG9iamVjdFwiIGVycm9yIGlmIHJBRiBpcyBpbnZva2VkIHdpdGhvdXQgdGhlIGdsb2JhbFxyXG4gICAgICAgIC8vIG9iamVjdCBvbiB0aGUgbGVmdCBoYW5kIHNpZGUuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCQxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2soRGF0ZS5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XHJcbn0pKCk7XG5cbi8vIERlZmluZXMgbWluaW11bSB0aW1lb3V0IGJlZm9yZSBhZGRpbmcgYSB0cmFpbGluZyBjYWxsLlxyXG52YXIgdHJhaWxpbmdUaW1lb3V0ID0gMjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGVuc3VyZXMgdGhhdCBwcm92aWRlZCBjYWxsYmFjayB3aWxsIGJlXHJcbiAqIGludm9rZWQgb25seSBvbmNlIGR1cmluZyB0aGUgc3BlY2lmaWVkIGRlbGF5IHBlcmlvZC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBkZWxheSBwZXJpb2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGFmdGVyIHdoaWNoIHRvIGludm9rZSBjYWxsYmFjay5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGNhbGxiYWNrLCBkZWxheSkge1xyXG4gICAgdmFyIGxlYWRpbmdDYWxsID0gZmFsc2UsIHRyYWlsaW5nQ2FsbCA9IGZhbHNlLCBsYXN0Q2FsbFRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBvcmlnaW5hbCBjYWxsYmFjayBmdW5jdGlvbiBhbmQgc2NoZWR1bGVzIG5ldyBpbnZvY2F0aW9uIGlmXHJcbiAgICAgKiB0aGUgXCJwcm94eVwiIHdhcyBjYWxsZWQgZHVyaW5nIGN1cnJlbnQgcmVxdWVzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVBlbmRpbmcoKSB7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFpbGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgcHJveHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSXQgd2lsbCBmdXJ0aGVyIHBvc3Rwb25lXHJcbiAgICAgKiBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkZWxlZ2F0aW5nIGl0IHRvIHRoZVxyXG4gICAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEocmVzb2x2ZVBlbmRpbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICAvLyBSZWplY3QgaW1tZWRpYXRlbHkgZm9sbG93aW5nIGNhbGxzLlxyXG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIC0gbGFzdENhbGxUaW1lIDwgdHJhaWxpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV3IGNhbGwgdG8gYmUgaW4gaW52b2tlZCB3aGVuIHRoZSBwZW5kaW5nIG9uZSBpcyByZXNvbHZlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFwidHJhbnNpdGlvbnNcIiB3aGljaCBuZXZlciBhY3R1YWxseSBzdGFydFxyXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBzbyB0aGVyZSBpcyBhIGNoYW5jZSB0aGF0IHdlIG1pZ2h0IG1pc3Mgb25lIGlmIGNoYW5nZVxyXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGFtaWRzIHRoZSBwZW5kaW5nIGludm9jYXRpb24uXHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn1cblxuLy8gTWluaW11bSBkZWxheSBiZWZvcmUgaW52b2tpbmcgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuXHJcbnZhciBSRUZSRVNIX0RFTEFZID0gMjA7XHJcbi8vIEEgbGlzdCBvZiBzdWJzdHJpbmdzIG9mIENTUyBwcm9wZXJ0aWVzIHVzZWQgdG8gZmluZCB0cmFuc2l0aW9uIGV2ZW50cyB0aGF0XHJcbi8vIG1pZ2h0IGFmZmVjdCBkaW1lbnNpb25zIG9mIG9ic2VydmVkIGVsZW1lbnRzLlxyXG52YXIgdHJhbnNpdGlvbktleXMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuLy8gQ2hlY2sgaWYgTXV0YXRpb25PYnNlcnZlciBpcyBhdmFpbGFibGUuXHJcbnZhciBtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkID0gdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xyXG4vKipcclxuICogU2luZ2xldG9uIGNvbnRyb2xsZXIgY2xhc3Mgd2hpY2ggaGFuZGxlcyB1cGRhdGVzIG9mIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBET00gbGlzdGVuZXJzIGhhdmUgYmVlbiBhZGRlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlbGxzIHRoYXQgY29udHJvbGxlciBoYXMgc3Vic2NyaWJlZCBmb3IgTXV0YXRpb24gRXZlbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgTXV0YXRpb25PYnNlcnZlci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNdXRhdGlvbk9ic2VydmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGxpc3Qgb2YgY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZlclNQST59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0gW107XHJcbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmRfID0gdGhpcy5vblRyYW5zaXRpb25FbmRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhyb3R0bGUodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIFJFRlJFU0hfREVMQVkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9ic2VydmVyIHRvIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5hZGRPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIGlmICghfnRoaXMub2JzZXJ2ZXJzXy5pbmRleE9mKG9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgaWYgdGhleSBoYXZlbid0IGJlZW4gYWRkZWQgeWV0LlxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfO1xyXG4gICAgICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICAvLyBSZW1vdmUgb2JzZXJ2ZXIgaWYgaXQncyBwcmVzZW50IGluIHJlZ2lzdHJ5LlxyXG4gICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgaWYgY29udHJvbGxlciBoYXMgbm8gY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICBpZiAoIW9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLiBJdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpbnNvZmFyXHJcbiAgICAgKiBpdCBkZXRlY3RzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hhbmdlc0RldGVjdGVkID0gdGhpcy51cGRhdGVPYnNlcnZlcnNfKCk7XHJcbiAgICAgICAgLy8gQ29udGludWUgcnVubmluZyB1cGRhdGVzIGlmIGNoYW5nZXMgaGF2ZSBiZWVuIGRldGVjdGVkIGFzIHRoZXJlIG1pZ2h0XHJcbiAgICAgICAgLy8gYmUgZnV0dXJlIG9uZXMgY2F1c2VkIGJ5IENTUyB0cmFuc2l0aW9ucy5cclxuICAgICAgICBpZiAoY2hhbmdlc0RldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZXZlcnkgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdCBhbmQgbm90aWZpZXMgdGhlbSBvZiBxdWV1ZWRcclxuICAgICAqIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIFwidHJ1ZVwiIGlmIGFueSBvYnNlcnZlciBoYXMgZGV0ZWN0ZWQgY2hhbmdlcyBpblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIGl0J3MgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlT2JzZXJ2ZXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBDb2xsZWN0IG9ic2VydmVycyB0aGF0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB2YXIgYWN0aXZlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfLmZpbHRlcihmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmdhdGhlckFjdGl2ZSgpLCBvYnNlcnZlci5oYXNBY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEZWxpdmVyIG5vdGlmaWNhdGlvbnMgaW4gYSBzZXBhcmF0ZSBjeWNsZSBpbiBvcmRlciB0byBhdm9pZCBhbnlcclxuICAgICAgICAvLyBjb2xsaXNpb25zIGJldHdlZW4gb2JzZXJ2ZXJzLCBlLmcuIHdoZW4gbXVsdGlwbGUgaW5zdGFuY2VzIG9mXHJcbiAgICAgICAgLy8gUmVzaXplT2JzZXJ2ZXIgYXJlIHRyYWNraW5nIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHRoZSBjYWxsYmFjayBvZiBvbmVcclxuICAgICAgICAvLyBvZiB0aGVtIGNoYW5nZXMgY29udGVudCBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCB0YXJnZXQuIFNvbWV0aW1lc1xyXG4gICAgICAgIC8vIHRoaXMgbWF5IHJlc3VsdCBpbiBub3RpZmljYXRpb25zIGJlaW5nIGJsb2NrZWQgZm9yIHRoZSByZXN0IG9mIG9ic2VydmVycy5cclxuICAgICAgICBhY3RpdmVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyLmJyb2FkY2FzdEFjdGl2ZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlT2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSBhZGRlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGlzIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvclxyXG4gICAgICAgIC8vIGRlbGF5ZWQgdHJhbnNpdGlvbnMuIFRoaXMgd2F5IGl0J3MgcG9zc2libGUgdG8gY2FwdHVyZSBhdCBsZWFzdCB0aGVcclxuICAgICAgICAvLyBmaW5hbCBzdGF0ZSBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8ub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2Nvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uc09ic2VydmVyXykge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRpb25FdmVudH0gZXZlbnRcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVHJhbnNpdGlvbkVuZF8gPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iO1xyXG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIHRyYW5zaXRpb24gbWF5IGFmZmVjdCBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlzUmVmbG93UHJvcGVydHkgPSB0cmFuc2l0aW9uS2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfnByb3BlcnR5TmFtZS5pbmRleE9mKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVmbG93UHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbnN0YW5jZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VfID0gbmV3IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZV87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIncyBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuaW5zdGFuY2VfID0gbnVsbDtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXI7XHJcbn0oKSk7XG5cbi8qKlxyXG4gKiBEZWZpbmVzIG5vbi13cml0YWJsZS9lbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHByb3ZpZGVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBPYmplY3QgZm9yIHdoaWNoIHRvIGRlZmluZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRvIGJlIGRlZmluZWQuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG52YXIgZGVmaW5lQ29uZmlndXJhYmxlID0gKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMocHJvcHMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYVtfaV07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wc1trZXldLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0pO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2xvYmFsIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGdldFdpbmRvd09mID0gKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIE5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgaXRcclxuICAgIC8vIGhhcyB0aGUgXCJvd25lckRvY3VtZW50XCIgcHJvcGVydHkgZnJvbSB3aGljaCB3ZSBjYW4gcmV0cmlldmUgYVxyXG4gICAgLy8gY29ycmVzcG9uZGluZyBnbG9iYWwgb2JqZWN0LlxyXG4gICAgdmFyIG93bmVyR2xvYmFsID0gdGFyZ2V0ICYmIHRhcmdldC5vd25lckRvY3VtZW50ICYmIHRhcmdldC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgLy8gUmV0dXJuIHRoZSBsb2NhbCBnbG9iYWwgb2JqZWN0IGlmIGl0J3Mgbm90IHBvc3NpYmxlIGV4dHJhY3Qgb25lIGZyb21cclxuICAgIC8vIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICByZXR1cm4gb3duZXJHbG9iYWwgfHwgZ2xvYmFsJDE7XHJcbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBvZiBhbiBlbXB0eSBjb250ZW50IHJlY3RhbmdsZS5cclxudmFyIGVtcHR5UmVjdCA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4vKipcclxuICogQ29udmVydHMgcHJvdmlkZWQgc3RyaW5nIHRvIGEgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgYm9yZGVycyBzaXplIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcG9zaXRpb25zIC0gQm9yZGVycyBwb3NpdGlvbnMgKHRvcCwgcmlnaHQsIC4uLilcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBwb3NpdGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb25zLnJlZHVjZShmdW5jdGlvbiAoc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ2JvcmRlci0nICsgcG9zaXRpb24gKyAnLXdpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIHNpemUgKyB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH0sIDApO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBwYWRkaW5ncyBzaXplcyBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHJldHVybnMge09iamVjdH0gUGFkZGluZ3MgYm94LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFkZGluZ3Moc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgIHZhciBwYWRkaW5ncyA9IHt9O1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBwb3NpdGlvbnNfMSA9IHBvc2l0aW9uczsgX2kgPCBwb3NpdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBwb3NpdGlvbnNfMVtfaV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydwYWRkaW5nLScgKyBwb3NpdGlvbl07XHJcbiAgICAgICAgcGFkZGluZ3NbcG9zaXRpb25dID0gdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFkZGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgU1ZHIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzXHJcbiAqICAgICAgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICB2YXIgYmJveCA9IHRhcmdldC5nZXRCQm94KCk7XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQoMCwgMCwgYmJveC53aWR0aCwgYmJveC5oZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgLy8gQ2xpZW50IHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgY2FuJ3QgYmVcclxuICAgIC8vIHVzZWQgZXhjbHVzaXZlbHkgYXMgdGhleSBwcm92aWRlIHJvdW5kZWQgdmFsdWVzLlxyXG4gICAgdmFyIGNsaWVudFdpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy8gQnkgdGhpcyBjb25kaXRpb24gd2UgY2FuIGNhdGNoIGFsbCBub24tcmVwbGFjZWQgaW5saW5lLCBoaWRkZW4gYW5kXHJcbiAgICAvLyBkZXRhY2hlZCBlbGVtZW50cy4gVGhvdWdoIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBsZXNzXHJcbiAgICAvLyB0aGFuIDAuNSB3aWxsIGJlIGRpc2NhcmRlZCBhcyB3ZWxsLlxyXG4gICAgLy9cclxuICAgIC8vIFdpdGhvdXQgaXQgd2Ugd291bGQgbmVlZCB0byBpbXBsZW1lbnQgc2VwYXJhdGUgbWV0aG9kcyBmb3IgZWFjaCBvZlxyXG4gICAgLy8gdGhvc2UgY2FzZXMgYW5kIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHBlcmZvcm0gYSBwcmVjaXNlIGFuZCBwZXJmb3JtYW5jZVxyXG4gICAgLy8gZWZmZWN0aXZlIHRlc3QgZm9yIGhpZGRlbiBlbGVtZW50cy4gRS5nLiBldmVuIGpRdWVyeSdzICc6dmlzaWJsZScgZmlsdGVyXHJcbiAgICAvLyBnaXZlcyB3cm9uZyByZXN1bHRzIGZvciBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IGxlc3MgdGhhbiAwLjUuXHJcbiAgICBpZiAoIWNsaWVudFdpZHRoICYmICFjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgdmFyIHN0eWxlcyA9IGdldFdpbmRvd09mKHRhcmdldCkuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xyXG4gICAgdmFyIHBhZGRpbmdzID0gZ2V0UGFkZGluZ3Moc3R5bGVzKTtcclxuICAgIHZhciBob3JpelBhZCA9IHBhZGRpbmdzLmxlZnQgKyBwYWRkaW5ncy5yaWdodDtcclxuICAgIHZhciB2ZXJ0UGFkID0gcGFkZGluZ3MudG9wICsgcGFkZGluZ3MuYm90dG9tO1xyXG4gICAgLy8gQ29tcHV0ZWQgc3R5bGVzIG9mIHdpZHRoICYgaGVpZ2h0IGFyZSBiZWluZyB1c2VkIGJlY2F1c2UgdGhleSBhcmUgdGhlXHJcbiAgICAvLyBvbmx5IGRpbWVuc2lvbnMgYXZhaWxhYmxlIHRvIEpTIHRoYXQgY29udGFpbiBub24tcm91bmRlZCB2YWx1ZXMuIEl0IGNvdWxkXHJcbiAgICAvLyBiZSBwb3NzaWJsZSB0byB1dGlsaXplIHRoZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaWYgb25seSBpdCdzIGRhdGEgd2Fzbid0XHJcbiAgICAvLyBhZmZlY3RlZCBieSBDU1MgdHJhbnNmb3JtYXRpb25zIGxldCBhbG9uZSBwYWRkaW5ncywgYm9yZGVycyBhbmQgc2Nyb2xsIGJhcnMuXHJcbiAgICB2YXIgd2lkdGggPSB0b0Zsb2F0KHN0eWxlcy53aWR0aCksIGhlaWdodCA9IHRvRmxvYXQoc3R5bGVzLmhlaWdodCk7XHJcbiAgICAvLyBXaWR0aCAmIGhlaWdodCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHdoZW4gdGhlICdib3JkZXItYm94JyBib3hcclxuICAgIC8vIG1vZGVsIGlzIGFwcGxpZWQgKGV4Y2VwdCBmb3IgSUUpLlxyXG4gICAgaWYgKHN0eWxlcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb25zIGFyZSByZXF1aXJlZCB0byBoYW5kbGUgSW50ZXJuZXQgRXhwbG9yZXIgd2hpY2hcclxuICAgICAgICAvLyBkb2Vzbid0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgdG8gY29tcHV0ZWQgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXZSBjYW4gc2F5IHRoYXQgaWYgQ1NTIGRpbWVuc2lvbnMgKyBwYWRkaW5ncyBhcmUgZXF1YWwgdG8gdGhlIFwiY2xpZW50XCJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRoZW4gaXQncyBlaXRoZXIgSUUsIGFuZCB0aHVzIHdlIGRvbid0IG5lZWQgdG8gc3VidHJhY3RcclxuICAgICAgICAvLyBhbnl0aGluZywgb3IgYW4gZWxlbWVudCBtZXJlbHkgZG9lc24ndCBoYXZlIHBhZGRpbmdzL2JvcmRlcnMgc3R5bGVzLlxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpICE9PSBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICdsZWZ0JywgJ3JpZ2h0JykgKyBob3JpelBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgIT09IGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAndG9wJywgJ2JvdHRvbScpICsgdmVydFBhZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb2xsb3dpbmcgc3RlcHMgY2FuJ3QgYmUgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQncyByb290IGVsZW1lbnQgYXMgaXRzXHJcbiAgICAvLyBjbGllbnRbV2lkdGgvSGVpZ2h0XSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB2aWV3cG9ydCBhcmVhIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAvLyBCZXNpZGVzLCBpdCdzIGFzIHdlbGwgbm90IG5lY2Vzc2FyeSBhcyB0aGUgPGh0bWw+IGl0c2VsZiBuZWl0aGVyIGhhc1xyXG4gICAgLy8gcmVuZGVyZWQgc2Nyb2xsIGJhcnMgbm9yIGl0IGNhbiBiZSBjbGlwcGVkLlxyXG4gICAgaWYgKCFpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAob25seSBpbiBGaXJlZm94LCBhY3R1YWxseSkgQ1NTIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgICAgLy8gaW5jbHVkZSBzY3JvbGwgYmFycyBzaXplIHdoaWNoIGNhbiBiZSByZW1vdmVkIGF0IHRoaXMgc3RlcCBhcyBzY3JvbGxcclxuICAgICAgICAvLyBiYXJzIGFyZSB0aGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gcm91bmRlZCBkaW1lbnNpb25zICsgcGFkZGluZ3NcclxuICAgICAgICAvLyBhbmQgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLCB0aG91Z2ggdGhhdCBpcyBub3QgYWx3YXlzIHRydWUgaW4gQ2hyb21lLlxyXG4gICAgICAgIHZhciB2ZXJ0U2Nyb2xsYmFyID0gTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAtIGNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBob3JpelNjcm9sbGJhciA9IE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgLSBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hyb21lIGhhcyBhIHJhdGhlciB3ZWlyZCByb3VuZGluZyBvZiBcImNsaWVudFwiIHByb3BlcnRpZXMuXHJcbiAgICAgICAgLy8gRS5nLiBmb3IgYW4gZWxlbWVudCB3aXRoIGNvbnRlbnQgd2lkdGggb2YgMzE0LjJweCBpdCBzb21ldGltZXMgZ2l2ZXNcclxuICAgICAgICAvLyB0aGUgY2xpZW50IHdpZHRoIG9mIDMxNXB4IGFuZCBmb3IgdGhlIHdpZHRoIG9mIDMxNC43cHggaXQgbWF5IGdpdmVcclxuICAgICAgICAvLyAzMTRweC4gQW5kIGl0IGRvZXNuJ3QgaGFwcGVuIGFsbCB0aGUgdGltZS4gU28ganVzdCBpZ25vcmUgdGhpcyBkZWx0YVxyXG4gICAgICAgIC8vIGFzIGEgbm9uLXJlbGV2YW50LlxyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZXJ0U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSB2ZXJ0U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoaG9yaXpTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQocGFkZGluZ3MubGVmdCwgcGFkZGluZ3MudG9wLCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgaXNTVkdHcmFwaGljc0VsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gU29tZSBicm93c2VycywgbmFtZWx5IElFIGFuZCBFZGdlLCBkb24ndCBoYXZlIHRoZSBTVkdHcmFwaGljc0VsZW1lbnRcclxuICAgIC8vIGludGVyZmFjZS5cclxuICAgIGlmICh0eXBlb2YgU1ZHR3JhcGhpY3NFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0dyYXBoaWNzRWxlbWVudDsgfTtcclxuICAgIH1cclxuICAgIC8vIElmIGl0J3Mgc28sIHRoZW4gY2hlY2sgdGhhdCBlbGVtZW50IGlzIGF0IGxlYXN0IGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgLy8gU1ZHRWxlbWVudCBhbmQgdGhhdCBpdCBoYXMgdGhlIFwiZ2V0QkJveFwiIG1ldGhvZC5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiAodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdFbGVtZW50ICYmXHJcbiAgICAgICAgdHlwZW9mIHRhcmdldC5nZXRCQm94ID09PSAnZnVuY3Rpb24nKTsgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYSBkb2N1bWVudCBlbGVtZW50ICg8aHRtbD4pLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpIHtcclxuICAgIHJldHVybiB0YXJnZXQgPT09IGdldFdpbmRvd09mKHRhcmdldCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGFuIGFwcHJvcHJpYXRlIGNvbnRlbnQgcmVjdGFuZ2xlIGZvciBwcm92aWRlZCBodG1sIG9yIHN2ZyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICBpZiAoIWlzQnJvd3Nlcikge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTVkdHcmFwaGljc0VsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyByZWN0YW5nbGUgd2l0aCBhbiBpbnRlcmZhY2Ugb2YgdGhlIERPTVJlY3RSZWFkT25seS5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RvbXJlY3RyZWFkb25seVxyXG4gKlxyXG4gKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIE9iamVjdCB3aXRoIHJlY3RhbmdsZSdzIHgveSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucy5cclxuICogQHJldHVybnMge0RPTVJlY3RSZWFkT25seX1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlYWRPbmx5UmVjdChfYSkge1xyXG4gICAgdmFyIHggPSBfYS54LCB5ID0gX2EueSwgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgLy8gSWYgRE9NUmVjdFJlYWRPbmx5IGlzIGF2YWlsYWJsZSB1c2UgaXQgYXMgYSBwcm90b3R5cGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICB2YXIgQ29uc3RyID0gdHlwZW9mIERPTVJlY3RSZWFkT25seSAhPT0gJ3VuZGVmaW5lZCcgPyBET01SZWN0UmVhZE9ubHkgOiBPYmplY3Q7XHJcbiAgICB2YXIgcmVjdCA9IE9iamVjdC5jcmVhdGUoQ29uc3RyLnByb3RvdHlwZSk7XHJcbiAgICAvLyBSZWN0YW5nbGUncyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGUgYW5kIG5vbi1lbnVtZXJhYmxlLlxyXG4gICAgZGVmaW5lQ29uZmlndXJhYmxlKHJlY3QsIHtcclxuICAgICAgICB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICByaWdodDogeCArIHdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogaGVpZ2h0ICsgeSxcclxuICAgICAgICBsZWZ0OiB4XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIERPTVJlY3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyBhbmQgdGhlIHgveSBjb29yZGluYXRlcy5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RpY3RkZWYtZG9tcmVjdGluaXRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBSZWN0YW5nbGUncyB3aWR0aC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFJlY3RhbmdsZSdzIGhlaWdodC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVjdEluaXQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG59XG5cbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBjb21wdXRhdGlvbnMgb2YgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlIG9mXHJcbiAqIHByb3ZpZGVkIERPTSBlbGVtZW50IGFuZCBmb3Iga2VlcGluZyB0cmFjayBvZiBpdCdzIGNoYW5nZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCB3aWR0aCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgaGVpZ2h0IG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0RPTVJlY3RJbml0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgY29udGVudCByZWN0YW5nbGUgYW5kIHRlbGxzIHdoZXRoZXIgaXQncyB3aWR0aCBvciBoZWlnaHQgcHJvcGVydGllc1xyXG4gICAgICogaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGJyb2FkY2FzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZ2V0Q29udGVudFJlY3QodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gcmVjdDtcclxuICAgICAgICByZXR1cm4gKHJlY3Qud2lkdGggIT09IHRoaXMuYnJvYWRjYXN0V2lkdGggfHxcclxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgIT09IHRoaXMuYnJvYWRjYXN0SGVpZ2h0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgJ2Jyb2FkY2FzdFdpZHRoJyBhbmQgJ2Jyb2FkY2FzdEhlaWdodCcgcHJvcGVydGllcyB3aXRoIGEgZGF0YVxyXG4gICAgICogZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET01SZWN0SW5pdH0gTGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmJyb2FkY2FzdFJlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnRSZWN0XztcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdGhhdCBpcyBiZWluZyBvYnNlcnZlZC5cclxuICAgICAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gRGF0YSBvZiB0aGUgZWxlbWVudCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCwgcmVjdEluaXQpIHtcclxuICAgICAgICB2YXIgY29udGVudFJlY3QgPSBjcmVhdGVSZWFkT25seVJlY3QocmVjdEluaXQpO1xyXG4gICAgICAgIC8vIEFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlXHJcbiAgICAgICAgLy8gYW5kIGFyZSBhbHNvIG5vdCBlbnVtZXJhYmxlIGluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIG5vdCBiZWluZyB1c2VkIGFzIHRoZXknZCByZXF1aXJlIHRvIGRlZmluZSBhXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBXZWFrTWFwIHN0b3JhZ2Ugd2hpY2ggbWF5IGNhdXNlIG1lbW9yeSBsZWFrcyBpbiBicm93c2VycyB0aGF0XHJcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgY29sbGVjdGlvbnMuXHJcbiAgICAgICAgZGVmaW5lQ29uZmlndXJhYmxlKHRoaXMsIHsgdGFyZ2V0OiB0YXJnZXQsIGNvbnRlbnRSZWN0OiBjb250ZW50UmVjdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZFxyXG4gICAgICogICAgICB3aGVuIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlcyBpdCdzIGNvbnRlbnQgZGltZW5zaW9ucy5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfSBjb250cm9sbGVyIC0gQ29udHJvbGxlciBpbnN0YW5jZSB3aGljaFxyXG4gICAgICogICAgICBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHVwZGF0ZXMgb2Ygb2JzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyfSBjYWxsYmFja0N0eCAtIFJlZmVyZW5jZSB0byB0aGUgcHVibGljXHJcbiAgICAgKiAgICAgIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgY2FsbGJhY2tDdHgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xsZWN0aW9uIG9mIHJlc2l6ZSBvYnNlcnZhdGlvbnMgdGhhdCBoYXZlIGRldGVjdGVkIGNoYW5nZXMgaW4gZGltZW5zaW9uc1xyXG4gICAgICAgICAqIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18gPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RyeSBvZiB0aGUgUmVzaXplT2JzZXJ2YXRpb24gaW5zdGFuY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge01hcDxFbGVtZW50LCBSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfID0gbmV3IE1hcFNoaW0oKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrQ3R4XyA9IGNhbGxiYWNrQ3R4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKG9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5zZXQodGFyZ2V0LCBuZXcgUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5hZGRPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgdXBkYXRlIG9mIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBzdG9wIG9ic2VydmluZy5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIG5vdCBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIGFsbCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBvYnNlcnZhdGlvbiBpbnN0YW5jZXMgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBvZiB3aGljaCBoYXMgY2hhbmdlZFxyXG4gICAgICogaXQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmdhdGhlckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmF0aW9uLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ucHVzaChvYnNlcnZhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgaW5pdGlhbCBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiBSZXNpemVPYnNlcnZlckVudHJ5XHJcbiAgICAgKiBpbnN0YW5jZXMgY29sbGVjdGVkIGZyb20gYWN0aXZlIHJlc2l6ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5icm9hZGNhc3RBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBvYnNlcnZlciBkb2Vzbid0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYWxsYmFja0N0eF87XHJcbiAgICAgICAgLy8gQ3JlYXRlIFJlc2l6ZU9ic2VydmVyRW50cnkgaW5zdGFuY2UgZm9yIGV2ZXJ5IGFjdGl2ZSBvYnNlcnZhdGlvbi5cclxuICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5tYXAoZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXJFbnRyeShvYnNlcnZhdGlvbi50YXJnZXQsIG9ic2VydmF0aW9uLmJyb2FkY2FzdFJlY3QoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18uY2FsbChjdHgsIGVudHJpZXMsIGN0eCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBjb2xsZWN0aW9uIG9mIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5jbGVhckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18uc3BsaWNlKDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgd2hldGhlciBvYnNlcnZlciBoYXMgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmhhc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyU1BJO1xyXG59KCkpO1xuXG4vLyBSZWdpc3RyeSBvZiBpbnRlcm5hbCBvYnNlcnZlcnMuIElmIFdlYWtNYXAgaXMgbm90IGF2YWlsYWJsZSB1c2UgY3VycmVudCBzaGltXHJcbi8vIGZvciB0aGUgTWFwIGNvbGxlY3Rpb24gYXMgaXQgaGFzIGFsbCByZXF1aXJlZCBtZXRob2RzIGFuZCBiZWNhdXNlIFdlYWtNYXBcclxuLy8gY2FuJ3QgYmUgZnVsbHkgcG9seWZpbGxlZCBhbnl3YXkuXHJcbnZhciBvYnNlcnZlcnMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgV2Vha01hcCgpIDogbmV3IE1hcFNoaW0oKTtcclxuLyoqXHJcbiAqIFJlc2l6ZU9ic2VydmVyIEFQSS4gRW5jYXBzdWxhdGVzIHRoZSBSZXNpemVPYnNlcnZlciBTUEkgaW1wbGVtZW50YXRpb25cclxuICogZXhwb3Npbmcgb25seSB0aG9zZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGRlZmluZWQgaW4gdGhlIHNwZWMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzaXplT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIHRoaXMpO1xyXG4gICAgICAgIG9ic2VydmVycy5zZXQodGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KCkpO1xyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMgb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbltcclxuICAgICdvYnNlcnZlJyxcclxuICAgICd1bm9ic2VydmUnLFxyXG4gICAgJ2Rpc2Nvbm5lY3QnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IG9ic2VydmVycy5nZXQodGhpcykpW21ldGhvZF0uYXBwbHkoX2EsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59KTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIEV4cG9ydCBleGlzdGluZyBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGUuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCIvKiFcbiAqIHR5cGVhaGVhZC5qcyAwLjExLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2l0dGVyL3R5cGVhaGVhZC5qc1xuICogQ29weXJpZ2h0IDIwMTMtMjAxNSBUd2l0dGVyLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnM7IExpY2Vuc2VkIE1JVFxuICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcImJsb29kaG91bmRcIiwgWyBcImpxdWVyeVwiIF0sIGZ1bmN0aW9uKGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gcm9vdFtcIkJsb29kaG91bmRcIl0gPSBmYWN0b3J5KGEwKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFtcIkJsb29kaG91bmRcIl0gPSBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oJCkge1xuICAgIHZhciBfID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNc2llOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSlbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0JsYW5rU3RyaW5nOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FycmF5OiAkLmlzQXJyYXksXG4gICAgICAgICAgICBpc0Z1bmN0aW9uOiAkLmlzRnVuY3Rpb24sXG4gICAgICAgICAgICBpc09iamVjdDogJC5pc1BsYWluT2JqZWN0LFxuICAgICAgICAgICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSlF1ZXJ5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgJDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHMpIHx8IHMgPT09IG51bGwgPyBcIlwiIDogcyArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogJC5wcm94eSxcbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogJC5tYXAsXG4gICAgICAgICAgICBmaWx0ZXI6ICQuZ3JlcCxcbiAgICAgICAgICAgIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29tZTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbjogJC5leHRlbmQsXG4gICAgICAgICAgICBpZGVudGl0eTogZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SWRHZW5lcmF0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob2JqKSA/IG9iaiA6IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzLCBsYXRlciwgY2FsbE5vdztcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRocm90dGxlOiBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQsIHJlc3VsdCwgcHJldmlvdXMsIGxhdGVyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKSwgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1N0cmluZyh2YWwpID8gdmFsIDogSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSgpO1xuICAgIHZhciBWRVJTSU9OID0gXCIwLjExLjFcIjtcbiAgICB2YXIgdG9rZW5pemVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vbndvcmQ6IG5vbndvcmQsXG4gICAgICAgICAgICB3aGl0ZXNwYWNlOiB3aGl0ZXNwYWNlLFxuICAgICAgICAgICAgb2JqOiB7XG4gICAgICAgICAgICAgICAgbm9ud29yZDogZ2V0T2JqVG9rZW5pemVyKG5vbndvcmQpLFxuICAgICAgICAgICAgICAgIHdoaXRlc3BhY2U6IGdldE9ialRva2VuaXplcih3aGl0ZXNwYWNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB3aGl0ZXNwYWNlKHN0cikge1xuICAgICAgICAgICAgc3RyID0gXy50b1N0cihzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zcGxpdCgvXFxzKy8pIDogW107XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbm9ud29yZChzdHIpIHtcbiAgICAgICAgICAgIHN0ciA9IF8udG9TdHIoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoL1xcVysvKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE9ialRva2VuaXplcih0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRLZXkoa2V5cykge1xuICAgICAgICAgICAgICAgIGtleXMgPSBfLmlzQXJyYXkoa2V5cykgPyBrZXlzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0b2tlbml6ZShvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGtleXMsIGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5jb25jYXQodG9rZW5pemVyKF8udG9TdHIob1trXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIExydUNhY2hlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBMcnVDYWNoZShtYXhTaXplKSB7XG4gICAgICAgICAgICB0aGlzLm1heFNpemUgPSBfLmlzTnVtYmVyKG1heFNpemUpID8gbWF4U2l6ZSA6IDEwMDtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1heFNpemUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0ID0gdGhpcy5nZXQgPSAkLm5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihMcnVDYWNoZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhaWxJdGVtID0gdGhpcy5saXN0LnRhaWwsIG5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZSh0YWlsSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhhc2hbdGFpbEl0ZW0ua2V5XTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlID0gdGhpcy5oYXNoW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52YWwgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5tb3ZlVG9Gcm9udChub2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGUoa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QuYWRkKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc2hba2V5XSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuaGFzaFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5tb3ZlVG9Gcm9udChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUudmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc2ggPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gTGlzdCgpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihMaXN0LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiBhZGQobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gdGhpcy5oZWFkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWQucHJldiA9IG5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsIHx8IG5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucHJldiA/IG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0IDogdGhpcy5oZWFkID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIG5vZGUubmV4dCA/IG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2IDogdGhpcy50YWlsID0gbm9kZS5wcmV2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVUb0Zyb250OiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUobm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBOb2RlKGtleSwgdmFsKSB7XG4gICAgICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMudmFsID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTHJ1Q2FjaGU7XG4gICAgfSgpO1xuICAgIHZhciBQZXJzaXN0ZW50U3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIExPQ0FMX1NUT1JBR0U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0Uuc2V0SXRlbShcIn5+flwiLCBcIiFcIik7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFLnJlbW92ZUl0ZW0oXCJ+fn5cIik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gUGVyc2lzdGVudFN0b3JhZ2UobmFtZXNwYWNlLCBvdmVycmlkZSkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBbIFwiX19cIiwgbmFtZXNwYWNlLCBcIl9fXCIgXS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgdGhpcy50dGxLZXkgPSBcIl9fdHRsX19cIjtcbiAgICAgICAgICAgIHRoaXMua2V5TWF0Y2hlciA9IG5ldyBSZWdFeHAoXCJeXCIgKyBfLmVzY2FwZVJlZ0V4Q2hhcnModGhpcy5wcmVmaXgpKTtcbiAgICAgICAgICAgIHRoaXMubHMgPSBvdmVycmlkZSB8fCBMT0NBTF9TVE9SQUdFO1xuICAgICAgICAgICAgIXRoaXMubHMgJiYgdGhpcy5fbm9vcCgpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUGVyc2lzdGVudFN0b3JhZ2UucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfcHJlZml4OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyBrZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3R0bEtleTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWZpeChrZXkpICsgdGhpcy50dGxLZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX25vb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0ID0gdGhpcy5zZXQgPSB0aGlzLnJlbW92ZSA9IHRoaXMuY2xlYXIgPSB0aGlzLmlzRXhwaXJlZCA9IF8ubm9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2FmZVNldDogZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxzLnNldEl0ZW0oa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25vb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwaXJlZChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGUodGhpcy5scy5nZXRJdGVtKHRoaXMuX3ByZWZpeChrZXkpKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgdHRsKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIodHRsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWZlU2V0KHRoaXMuX3R0bEtleShrZXkpLCBlbmNvZGUobm93KCkgKyB0dGwpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fdHRsS2V5KGtleSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2FmZVNldCh0aGlzLl9wcmVmaXgoa2V5KSwgZW5jb2RlKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3R0bEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fcHJlZml4KGtleSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwga2V5cyA9IGdhdGhlck1hdGNoaW5nS2V5cyh0aGlzLmtleU1hdGNoZXIpO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IGtleXMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShrZXlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFeHBpcmVkOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHRsID0gZGVjb2RlKHRoaXMubHMuZ2V0SXRlbSh0aGlzLl90dGxLZXkoa2V5KSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzTnVtYmVyKHR0bCkgJiYgbm93KCkgPiB0dGwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUGVyc2lzdGVudFN0b3JhZ2U7XG4gICAgICAgIGZ1bmN0aW9uIG5vdygpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5pc1VuZGVmaW5lZCh2YWwpID8gbnVsbCA6IHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuICQucGFyc2VKU09OKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2F0aGVyTWF0Y2hpbmdLZXlzKGtleU1hdGNoZXIpIHtcbiAgICAgICAgICAgIHZhciBpLCBrZXksIGtleXMgPSBbXSwgbGVuID0gTE9DQUxfU1RPUkFHRS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGtleSA9IExPQ0FMX1NUT1JBR0Uua2V5KGkpKS5tYXRjaChrZXlNYXRjaGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5LnJlcGxhY2Uoa2V5TWF0Y2hlciwgXCJcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBUcmFuc3BvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBwZW5kaW5nUmVxdWVzdHNDb3VudCA9IDAsIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LCBtYXhQZW5kaW5nUmVxdWVzdHMgPSA2LCBzaGFyZWRDYWNoZSA9IG5ldyBMcnVDYWNoZSgxMCk7XG4gICAgICAgIGZ1bmN0aW9uIFRyYW5zcG9ydChvKSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmxhc3RSZXEgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2VuZCA9IG8udHJhbnNwb3J0O1xuICAgICAgICAgICAgdGhpcy5fZ2V0ID0gby5saW1pdGVyID8gby5saW1pdGVyKHRoaXMuX2dldCkgOiB0aGlzLl9nZXQ7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IG8uY2FjaGUgPT09IGZhbHNlID8gbmV3IExydUNhY2hlKDApIDogc2hhcmVkQ2FjaGU7XG4gICAgICAgIH1cbiAgICAgICAgVHJhbnNwb3J0LnNldE1heFBlbmRpbmdSZXF1ZXN0cyA9IGZ1bmN0aW9uIHNldE1heFBlbmRpbmdSZXF1ZXN0cyhudW0pIHtcbiAgICAgICAgICAgIG1heFBlbmRpbmdSZXF1ZXN0cyA9IG51bTtcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNwb3J0LnJlc2V0Q2FjaGUgPSBmdW5jdGlvbiByZXNldENhY2hlKCkge1xuICAgICAgICAgICAgc2hhcmVkQ2FjaGUucmVzZXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihUcmFuc3BvcnQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfZmluZ2VycHJpbnQ6IGZ1bmN0aW9uIGZpbmdlcnByaW50KG8pIHtcbiAgICAgICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgICAgICByZXR1cm4gby51cmwgKyBvLnR5cGUgKyAkLnBhcmFtKG8uZGF0YSB8fCB7fSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldDogZnVuY3Rpb24obywgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGZpbmdlcnByaW50LCBqcVhocjtcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludCA9IHRoaXMuX2ZpbmdlcnByaW50KG8pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbmNlbGxlZCB8fCBmaW5nZXJwcmludCAhPT0gdGhpcy5sYXN0UmVxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGpxWGhyID0gcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XSkge1xuICAgICAgICAgICAgICAgICAgICBqcVhoci5kb25lKGRvbmUpLmZhaWwoZmFpbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwZW5kaW5nUmVxdWVzdHNDb3VudCA8IG1heFBlbmRpbmdSZXF1ZXN0cykge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdID0gdGhpcy5fc2VuZChvKS5kb25lKGRvbmUpLmZhaWwoZmFpbCkuYWx3YXlzKGFsd2F5cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRlY2tSZXF1ZXN0QXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9jYWNoZS5zZXQoZmluZ2VycHJpbnQsIHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmYWlsKCkge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWx3YXlzKCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQub25EZWNrUmVxdWVzdEFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2dldC5hcHBseSh0aGF0LCB0aGF0Lm9uRGVja1JlcXVlc3RBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub25EZWNrUmVxdWVzdEFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24obywgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcCwgZmluZ2VycHJpbnQ7XG4gICAgICAgICAgICAgICAgY2IgPSBjYiB8fCAkLm5vb3A7XG4gICAgICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgICAgIH0gOiBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIGZpbmdlcnByaW50ID0gdGhpcy5fZmluZ2VycHJpbnQobyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RSZXEgPSBmaW5nZXJwcmludDtcbiAgICAgICAgICAgICAgICBpZiAocmVzcCA9IHRoaXMuX2NhY2hlLmdldChmaW5nZXJwcmludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0KG8sIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVHJhbnNwb3J0O1xuICAgIH0oKTtcbiAgICB2YXIgU2VhcmNoSW5kZXggPSB3aW5kb3cuU2VhcmNoSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBDSElMRFJFTiA9IFwiY1wiLCBJRFMgPSBcImlcIjtcbiAgICAgICAgZnVuY3Rpb24gU2VhcmNoSW5kZXgobykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uZGF0dW1Ub2tlbml6ZXIgfHwgIW8ucXVlcnlUb2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiZGF0dW1Ub2tlbml6ZXIgYW5kIHF1ZXJ5VG9rZW5pemVyIGFyZSBib3RoIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZGVudGlmeSA9IG8uaWRlbnRpZnkgfHwgXy5zdHJpbmdpZnk7XG4gICAgICAgICAgICB0aGlzLmRhdHVtVG9rZW5pemVyID0gby5kYXR1bVRva2VuaXplcjtcbiAgICAgICAgICAgIHRoaXMucXVlcnlUb2tlbml6ZXIgPSBvLnF1ZXJ5VG9rZW5pemVyO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oU2VhcmNoSW5kZXgucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBib290c3RyYXA6IGZ1bmN0aW9uIGJvb3RzdHJhcChvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXR1bXMgPSBvLmRhdHVtcztcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWUgPSBvLnRyaWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBfLmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogWyBkYXRhIF07XG4gICAgICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGZ1bmN0aW9uKGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCwgdG9rZW5zO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdHVtc1tpZCA9IHRoYXQuaWRlbnRpZnkoZGF0dW0pXSA9IGRhdHVtO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBub3JtYWxpemVUb2tlbnModGhhdC5kYXR1bVRva2VuaXplcihkYXR1bSkpO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2godG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGNoYXJzLCBjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGF0LnRyaWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFycyA9IHRva2VuLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoID0gY2hhcnMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlW0NISUxEUkVOXVtjaF0gfHwgKG5vZGVbQ0hJTERSRU5dW2NoXSA9IG5ld05vZGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVtJRFNdLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGlkcywgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0dW1zW2lkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgdG9rZW5zLCBtYXRjaGVzO1xuICAgICAgICAgICAgICAgIHRva2VucyA9IG5vcm1hbGl6ZVRva2Vucyh0aGlzLnF1ZXJ5VG9rZW5pemVyKHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGNoYXJzLCBjaCwgaWRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGF0LnRyaWU7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzID0gdG9rZW4uc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICYmIChjaCA9IGNoYXJzLnNoaWZ0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVtDSElMRFJFTl1bY2hdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlICYmIGNoYXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzID0gbm9kZVtJRFNdLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMgPyBnZXRJbnRlcnNlY3Rpb24obWF0Y2hlcywgaWRzKSA6IGlkcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzID8gXy5tYXAodW5pcXVlKG1hdGNoZXMpLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kYXR1bXNbaWRdO1xuICAgICAgICAgICAgICAgIH0pIDogW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiBhbGwoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmRhdHVtcykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLmRhdHVtc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXR1bXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWUgPSBuZXdOb2RlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0dW1zOiB0aGlzLmRhdHVtcyxcbiAgICAgICAgICAgICAgICAgICAgdHJpZTogdGhpcy50cmllXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTZWFyY2hJbmRleDtcbiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplVG9rZW5zKHRva2Vucykge1xuICAgICAgICAgICAgdG9rZW5zID0gXy5maWx0ZXIodG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXRva2VuO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b2tlbnMgPSBfLm1hcCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV3Tm9kZSgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0ge307XG4gICAgICAgICAgICBub2RlW0lEU10gPSBbXTtcbiAgICAgICAgICAgIG5vZGVbQ0hJTERSRU5dID0ge307XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBzZWVuID0ge30sIHVuaXF1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghc2VlblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VlblthcnJheVtpXV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVzLnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEludGVyc2VjdGlvbihhcnJheUEsIGFycmF5Qikge1xuICAgICAgICAgICAgdmFyIGFpID0gMCwgYmkgPSAwLCBpbnRlcnNlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIGFycmF5QSA9IGFycmF5QS5zb3J0KCk7XG4gICAgICAgICAgICBhcnJheUIgPSBhcnJheUIuc29ydCgpO1xuICAgICAgICAgICAgdmFyIGxlbkFycmF5QSA9IGFycmF5QS5sZW5ndGgsIGxlbkFycmF5QiA9IGFycmF5Qi5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoYWkgPCBsZW5BcnJheUEgJiYgYmkgPCBsZW5BcnJheUIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlBW2FpXSA8IGFycmF5QltiaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFycmF5QVthaV0gPiBhcnJheUJbYmldKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2goYXJyYXlBW2FpXSk7XG4gICAgICAgICAgICAgICAgICAgIGFpKys7XG4gICAgICAgICAgICAgICAgICAgIGJpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbjtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgUHJlZmV0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgZGF0YTogXCJkYXRhXCIsXG4gICAgICAgICAgICBwcm90b2NvbDogXCJwcm90b2NvbFwiLFxuICAgICAgICAgICAgdGh1bWJwcmludDogXCJ0aHVtYnByaW50XCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gUHJlZmV0Y2gobykge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBvLnVybDtcbiAgICAgICAgICAgIHRoaXMudHRsID0gby50dGw7XG4gICAgICAgICAgICB0aGlzLmNhY2hlID0gby5jYWNoZTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gby50cmFuc2Zvcm07XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0O1xuICAgICAgICAgICAgdGhpcy50aHVtYnByaW50ID0gby50aHVtYnByaW50O1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFBlcnNpc3RlbnRTdG9yYWdlKG8uY2FjaGVLZXkpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUHJlZmV0Y2gucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfc2V0dGluZ3M6IGZ1bmN0aW9uIHNldHRpbmdzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcmU6IGZ1bmN0aW9uIHN0b3JlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMuZGF0YSwgZGF0YSwgdGhpcy50dGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy5wcm90b2NvbCwgbG9jYXRpb24ucHJvdG9jb2wsIHRoaXMudHRsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMudGh1bWJwcmludCwgdGhpcy50aHVtYnByaW50LCB0aGlzLnR0bCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbUNhY2hlOiBmdW5jdGlvbiBmcm9tQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0b3JlZCA9IHt9LCBpc0V4cGlyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9yZWQuZGF0YSA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzdG9yZWQucHJvdG9jb2wgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMucHJvdG9jb2wpO1xuICAgICAgICAgICAgICAgIHN0b3JlZC50aHVtYnByaW50ID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLnRodW1icHJpbnQpO1xuICAgICAgICAgICAgICAgIGlzRXhwaXJlZCA9IHN0b3JlZC50aHVtYnByaW50ICE9PSB0aGlzLnRodW1icHJpbnQgfHwgc3RvcmVkLnByb3RvY29sICE9PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmVkLmRhdGEgJiYgIWlzRXhwaXJlZCA/IHN0b3JlZC5kYXRhIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tTmV0d29yazogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHNldHRpbmdzO1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMucHJlcGFyZSh0aGlzLl9zZXR0aW5ncygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydChzZXR0aW5ncykuZmFpbChvbkVycm9yKS5kb25lKG9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblJlc3BvbnNlKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgdGhhdC50cmFuc2Zvcm0ocmVzcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJlZmV0Y2g7XG4gICAgfSgpO1xuICAgIHZhciBSZW1vdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIFJlbW90ZShvKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IG8udXJsO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3IFRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgICAgY2FjaGU6IG8uY2FjaGUsXG4gICAgICAgICAgICAgICAgbGltaXRlcjogby5saW1pdGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogby50cmFuc3BvcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUmVtb3RlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3NldHRpbmdzOiBmdW5jdGlvbiBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KHF1ZXJ5LCBjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgc2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMucHJlcGFyZShxdWVyeSwgdGhpcy5fc2V0dGluZ3MoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LmdldChzZXR0aW5ncywgb25SZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNwb25zZShlcnIsIHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyID8gY2IoW10pIDogY2IodGhhdC50cmFuc2Zvcm0ocmVzcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWxMYXN0UmVxdWVzdDogZnVuY3Rpb24gY2FuY2VsTGFzdFJlcXVlc3QoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVtb3RlO1xuICAgIH0oKTtcbiAgICB2YXIgb1BhcnNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHBhcnNlKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cywgc29ydGVyO1xuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpZGVudGlmeTogXy5zdHJpbmdpZnksXG4gICAgICAgICAgICAgICAgZGF0dW1Ub2tlbml6ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcXVlcnlUb2tlbml6ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgc3VmZmljaWVudDogNSxcbiAgICAgICAgICAgICAgICBzb3J0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9jYWw6IFtdLFxuICAgICAgICAgICAgICAgIHByZWZldGNoOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlbW90ZTogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvIHx8IHt9KTtcbiAgICAgICAgICAgICFvLmRhdHVtVG9rZW5pemVyICYmICQuZXJyb3IoXCJkYXR1bVRva2VuaXplciBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgICFvLnF1ZXJ5VG9rZW5pemVyICYmICQuZXJyb3IoXCJxdWVyeVRva2VuaXplciBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIHNvcnRlciA9IG8uc29ydGVyO1xuICAgICAgICAgICAgby5zb3J0ZXIgPSBzb3J0ZXIgPyBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHguc29ydChzb3J0ZXIpO1xuICAgICAgICAgICAgfSA6IF8uaWRlbnRpdHk7XG4gICAgICAgICAgICBvLmxvY2FsID0gXy5pc0Z1bmN0aW9uKG8ubG9jYWwpID8gby5sb2NhbCgpIDogby5sb2NhbDtcbiAgICAgICAgICAgIG8ucHJlZmV0Y2ggPSBwYXJzZVByZWZldGNoKG8ucHJlZmV0Y2gpO1xuICAgICAgICAgICAgby5yZW1vdGUgPSBwYXJzZVJlbW90ZShvLnJlbW90ZSk7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VQcmVmZXRjaChvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHM7XG4gICAgICAgICAgICBpZiAoIW8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICB0dGw6IDI0ICogNjAgKiA2MCAqIDFlMyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWNoZUtleTogbnVsbCxcbiAgICAgICAgICAgICAgICB0aHVtYnByaW50OiBcIlwiLFxuICAgICAgICAgICAgICAgIHByZXBhcmU6IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgfSA6IG87XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICAhby51cmwgJiYgJC5lcnJvcihcInByZWZldGNoIHJlcXVpcmVzIHVybCB0byBiZSBzZXRcIik7XG4gICAgICAgICAgICBvLnRyYW5zZm9ybSA9IG8uZmlsdGVyIHx8IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgby5jYWNoZUtleSA9IG8uY2FjaGVLZXkgfHwgby51cmw7XG4gICAgICAgICAgICBvLnRodW1icHJpbnQgPSBWRVJTSU9OICsgby50aHVtYnByaW50O1xuICAgICAgICAgICAgby50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydCA/IGNhbGxiYWNrVG9EZWZlcnJlZChvLnRyYW5zcG9ydCkgOiAkLmFqYXg7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYXJzZVJlbW90ZShvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHM7XG4gICAgICAgICAgICBpZiAoIW8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlcGFyZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsYWNlOiBudWxsLFxuICAgICAgICAgICAgICAgIHdpbGRjYXJkOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpbWl0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcmF0ZUxpbWl0Qnk6IFwiZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICByYXRlTGltaXRXYWl0OiAzMDAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgfSA6IG87XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICAhby51cmwgJiYgJC5lcnJvcihcInJlbW90ZSByZXF1aXJlcyB1cmwgdG8gYmUgc2V0XCIpO1xuICAgICAgICAgICAgby50cmFuc2Zvcm0gPSBvLmZpbHRlciB8fCBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG8ucHJlcGFyZSA9IHRvUmVtb3RlUHJlcGFyZShvKTtcbiAgICAgICAgICAgIG8ubGltaXRlciA9IHRvTGltaXRlcihvKTtcbiAgICAgICAgICAgIG8udHJhbnNwb3J0ID0gby50cmFuc3BvcnQgPyBjYWxsYmFja1RvRGVmZXJyZWQoby50cmFuc3BvcnQpIDogJC5hamF4O1xuICAgICAgICAgICAgZGVsZXRlIG8ucmVwbGFjZTtcbiAgICAgICAgICAgIGRlbGV0ZSBvLndpbGRjYXJkO1xuICAgICAgICAgICAgZGVsZXRlIG8ucmF0ZUxpbWl0Qnk7XG4gICAgICAgICAgICBkZWxldGUgby5yYXRlTGltaXRXYWl0O1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdG9SZW1vdGVQcmVwYXJlKG8pIHtcbiAgICAgICAgICAgIHZhciBwcmVwYXJlLCByZXBsYWNlLCB3aWxkY2FyZDtcbiAgICAgICAgICAgIHByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICByZXBsYWNlID0gby5yZXBsYWNlO1xuICAgICAgICAgICAgd2lsZGNhcmQgPSBvLndpbGRjYXJkO1xuICAgICAgICAgICAgaWYgKHByZXBhcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlcGFyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IHByZXBhcmVCeVJlcGxhY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG8ud2lsZGNhcmQpIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gcHJlcGFyZUJ5V2lsZGNhcmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBpZGVuaXR5UHJlcGFyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmVwYXJlO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHJlcGFyZUJ5UmVwbGFjZShxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSByZXBsYWNlKHNldHRpbmdzLnVybCwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXBhcmVCeVdpbGRjYXJkKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnVybCA9IHNldHRpbmdzLnVybC5yZXBsYWNlKHdpbGRjYXJkLCBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpZGVuaXR5UHJlcGFyZShxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdG9MaW1pdGVyKG8pIHtcbiAgICAgICAgICAgIHZhciBsaW1pdGVyLCBtZXRob2QsIHdhaXQ7XG4gICAgICAgICAgICBsaW1pdGVyID0gby5saW1pdGVyO1xuICAgICAgICAgICAgbWV0aG9kID0gby5yYXRlTGltaXRCeTtcbiAgICAgICAgICAgIHdhaXQgPSBvLnJhdGVMaW1pdFdhaXQ7XG4gICAgICAgICAgICBpZiAoIWxpbWl0ZXIpIHtcbiAgICAgICAgICAgICAgICBsaW1pdGVyID0gL150aHJvdHRsZSQvaS50ZXN0KG1ldGhvZCkgPyB0aHJvdHRsZSh3YWl0KSA6IGRlYm91bmNlKHdhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbWl0ZXI7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWJvdW5jZSh3YWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmRlYm91bmNlKGZuLCB3YWl0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdGhyb3R0bGUod2FpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZShmbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy50aHJvdHRsZShmbiwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYWxsYmFja1RvRGVmZXJyZWQoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyKG8pIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgZm4obywgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIEJsb29kaG91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBvbGQ7XG4gICAgICAgIG9sZCA9IHdpbmRvdyAmJiB3aW5kb3cuQmxvb2Rob3VuZDtcbiAgICAgICAgZnVuY3Rpb24gQmxvb2Rob3VuZChvKSB7XG4gICAgICAgICAgICBvID0gb1BhcnNlcihvKTtcbiAgICAgICAgICAgIHRoaXMuc29ydGVyID0gby5zb3J0ZXI7XG4gICAgICAgICAgICB0aGlzLmlkZW50aWZ5ID0gby5pZGVudGlmeTtcbiAgICAgICAgICAgIHRoaXMuc3VmZmljaWVudCA9IG8uc3VmZmljaWVudDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSBvLmxvY2FsO1xuICAgICAgICAgICAgdGhpcy5yZW1vdGUgPSBvLnJlbW90ZSA/IG5ldyBSZW1vdGUoby5yZW1vdGUpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJlZmV0Y2ggPSBvLnByZWZldGNoID8gbmV3IFByZWZldGNoKG8ucHJlZmV0Y2gpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXcgU2VhcmNoSW5kZXgoe1xuICAgICAgICAgICAgICAgIGlkZW50aWZ5OiB0aGlzLmlkZW50aWZ5LFxuICAgICAgICAgICAgICAgIGRhdHVtVG9rZW5pemVyOiBvLmRhdHVtVG9rZW5pemVyLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VG9rZW5pemVyOiBvLnF1ZXJ5VG9rZW5pemVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG8uaW5pdGlhbGl6ZSAhPT0gZmFsc2UgJiYgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvb2Rob3VuZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgICAgIHdpbmRvdyAmJiAod2luZG93LkJsb29kaG91bmQgPSBvbGQpO1xuICAgICAgICAgICAgcmV0dXJuIEJsb29kaG91bmQ7XG4gICAgICAgIH07XG4gICAgICAgIEJsb29kaG91bmQudG9rZW5pemVycyA9IHRva2VuaXplcnM7XG4gICAgICAgIF8ubWl4aW4oQmxvb2Rob3VuZC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9fdHRBZGFwdGVyOiBmdW5jdGlvbiB0dEFkYXB0ZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW90ZSA/IHdpdGhBc3luYyA6IHdpdGhvdXRBc3luYztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3aXRoQXN5bmMocXVlcnksIHN5bmMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNlYXJjaChxdWVyeSwgc3luYywgYXN5bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3aXRob3V0QXN5bmMocXVlcnksIHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2VhcmNoKHF1ZXJ5LCBzeW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2xvYWRQcmVmZXRjaDogZnVuY3Rpb24gbG9hZFByZWZldGNoKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZGVmZXJyZWQsIHNlcmlhbGl6ZWQ7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByZWZldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmlhbGl6ZWQgPSB0aGlzLnByZWZldGNoLmZyb21DYWNoZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXguYm9vdHN0cmFwKHNlcmlhbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaC5mcm9tTmV0d29yayhkb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb25lKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJlZmV0Y2guc3RvcmUodGhhdC5pbmRleC5zZXJpYWxpemUoKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2luaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgKHRoaXMuaW5pdFByb21pc2UgPSB0aGlzLl9sb2FkUHJlZmV0Y2goKSkuZG9uZShhZGRMb2NhbFRvSW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXRQcm9taXNlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZExvY2FsVG9JbmRleCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGQodGhhdC5sb2NhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaW5pdFByb21pc2UgfHwgZm9yY2UgPyB0aGlzLl9pbml0aWFsaXplKCkgOiB0aGlzLmluaXRQcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LmFkZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZHMpIHtcbiAgICAgICAgICAgICAgICBpZHMgPSBfLmlzQXJyYXkoaWRzKSA/IGlkcyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleC5nZXQoaWRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSwgc3luYywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGxvY2FsO1xuICAgICAgICAgICAgICAgIGxvY2FsID0gdGhpcy5zb3J0ZXIodGhpcy5pbmRleC5zZWFyY2gocXVlcnkpKTtcbiAgICAgICAgICAgICAgICBzeW5jKHRoaXMucmVtb3RlID8gbG9jYWwuc2xpY2UoKSA6IGxvY2FsKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1vdGUgJiYgbG9jYWwubGVuZ3RoIDwgdGhpcy5zdWZmaWNpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmdldChxdWVyeSwgcHJvY2Vzc1JlbW90ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5jYW5jZWxMYXN0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzUmVtb3RlKHJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9uRHVwbGljYXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2gocmVtb3RlLCBmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5zb21lKGxvY2FsLCBmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaWRlbnRpZnkocikgPT09IHRoYXQuaWRlbnRpZnkobCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSAmJiBub25EdXBsaWNhdGVzLnB1c2gocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhc3luYyAmJiBhc3luYyhub25EdXBsaWNhdGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiBhbGwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXguYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgucmVzZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclByZWZldGNoQ2FjaGU6IGZ1bmN0aW9uIGNsZWFyUHJlZmV0Y2hDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZldGNoICYmIHRoaXMucHJlZmV0Y2guY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclJlbW90ZUNhY2hlOiBmdW5jdGlvbiBjbGVhclJlbW90ZUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zcG9ydC5yZXNldENhY2hlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHRBZGFwdGVyOiBmdW5jdGlvbiB0dEFkYXB0ZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX190dEFkYXB0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCbG9vZGhvdW5kO1xuICAgIH0oKTtcbiAgICByZXR1cm4gQmxvb2Rob3VuZDtcbn0pO1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJ0eXBlYWhlYWQuanNcIiwgWyBcImpxdWVyeVwiIF0sIGZ1bmN0aW9uKGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShhMCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbigkKSB7XG4gICAgdmFyIF8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc01zaWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKG1zaWUgfHJ2OikoXFxkKyguXFxkKyk/KS9pKVsyXSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQmxhbmtTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGVSZWdFeENoYXJzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQXJyYXk6ICQuaXNBcnJheSxcbiAgICAgICAgICAgIGlzRnVuY3Rpb246ICQuaXNGdW5jdGlvbixcbiAgICAgICAgICAgIGlzT2JqZWN0OiAkLmlzUGxhaW5PYmplY3QsXG4gICAgICAgICAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbGVtZW50OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNKUXVlcnk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiAkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNVbmRlZmluZWQocykgfHwgcyA9PT0gbnVsbCA/IFwiXCIgOiBzICsgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiAkLnByb3h5LFxuICAgICAgICAgICAgZWFjaDogZnVuY3Rpb24oY29sbGVjdGlvbiwgY2IpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodmFsdWUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFwOiAkLm1hcCxcbiAgICAgICAgICAgIGZpbHRlcjogJC5ncmVwLFxuICAgICAgICAgICAgZXZlcnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb21lOiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1peGluOiAkLmV4dGVuZCxcbiAgICAgICAgICAgIGlkZW50aXR5OiBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJZEdlbmVyYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRpZnk6IGZ1bmN0aW9uIHRlbXBsYXRpZnkob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihvYmopID8gb2JqIDogdGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXI6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHMsIGxhdGVyLCBjYWxsTm93O1xuICAgICAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCwgYXJncywgdGltZW91dCwgcmVzdWx0LCBwcmV2aW91cywgbGF0ZXI7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzU3RyaW5nKHZhbCkgPyB2YWwgOiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vb3A6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcbiAgICB9KCk7XG4gICAgdmFyIFdXVyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGRlZmF1bHRDbGFzc05hbWVzID0ge1xuICAgICAgICAgICAgd3JhcHBlcjogXCJ0d2l0dGVyLXR5cGVhaGVhZFwiLFxuICAgICAgICAgICAgaW5wdXQ6IFwidHQtaW5wdXRcIixcbiAgICAgICAgICAgIGhpbnQ6IFwidHQtaGludFwiLFxuICAgICAgICAgICAgbWVudTogXCJ0dC1tZW51XCIsXG4gICAgICAgICAgICBkYXRhc2V0OiBcInR0LWRhdGFzZXRcIixcbiAgICAgICAgICAgIHN1Z2dlc3Rpb246IFwidHQtc3VnZ2VzdGlvblwiLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogXCJ0dC1zZWxlY3RhYmxlXCIsXG4gICAgICAgICAgICBlbXB0eTogXCJ0dC1lbXB0eVwiLFxuICAgICAgICAgICAgb3BlbjogXCJ0dC1vcGVuXCIsXG4gICAgICAgICAgICBjdXJzb3I6IFwidHQtY3Vyc29yXCIsXG4gICAgICAgICAgICBoaWdobGlnaHQ6IFwidHQtaGlnaGxpZ2h0XCJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkO1xuICAgICAgICBmdW5jdGlvbiBidWlsZChvKSB7XG4gICAgICAgICAgICB2YXIgd3d3LCBjbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3NlcyA9IF8ubWl4aW4oe30sIGRlZmF1bHRDbGFzc05hbWVzLCBvKTtcbiAgICAgICAgICAgIHd3dyA9IHtcbiAgICAgICAgICAgICAgICBjc3M6IGJ1aWxkQ3NzKCksXG4gICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBodG1sOiBidWlsZEh0bWwoY2xhc3NlcyksXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzOiBidWlsZFNlbGVjdG9ycyhjbGFzc2VzKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3NzOiB3d3cuY3NzLFxuICAgICAgICAgICAgICAgIGh0bWw6IHd3dy5odG1sLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHd3dy5jbGFzc2VzLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yczogd3d3LnNlbGVjdG9ycyxcbiAgICAgICAgICAgICAgICBtaXhpbjogZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgICBfLm1peGluKG8sIHd3dyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZEh0bWwoYykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyOiAnPHNwYW4gY2xhc3M9XCInICsgYy53cmFwcGVyICsgJ1wiPjwvc3Bhbj4nLFxuICAgICAgICAgICAgICAgIG1lbnU6ICc8ZGl2IGNsYXNzPVwiJyArIGMubWVudSArICdcIj48L2Rpdj4nXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3JzKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvcnMgPSB7fTtcbiAgICAgICAgICAgIF8uZWFjaChjbGFzc2VzLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzW2tdID0gXCIuXCIgKyB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQ3NzKCkge1xuICAgICAgICAgICAgdmFyIGNzcyA9IHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFwiMVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRXaXRoTm9IaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwidG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lbnU6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJub25lXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGx0cjoge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFwiYXV0b1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBydGw6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBcIiAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKF8uaXNNc2llKCkpIHtcbiAgICAgICAgICAgICAgICBfLm1peGluKGNzcy5pbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNylcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNzcztcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgRXZlbnRCdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBuYW1lc3BhY2UsIGRlcHJlY2F0aW9uTWFwO1xuICAgICAgICBuYW1lc3BhY2UgPSBcInR5cGVhaGVhZDpcIjtcbiAgICAgICAgZGVwcmVjYXRpb25NYXAgPSB7XG4gICAgICAgICAgICByZW5kZXI6IFwicmVuZGVyZWRcIixcbiAgICAgICAgICAgIGN1cnNvcmNoYW5nZTogXCJjdXJzb3JjaGFuZ2VkXCIsXG4gICAgICAgICAgICBzZWxlY3Q6IFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJhdXRvY29tcGxldGVkXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRCdXMobykge1xuICAgICAgICAgICAgaWYgKCFvIHx8ICFvLmVsKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIkV2ZW50QnVzIGluaXRpYWxpemVkIHdpdGhvdXQgZWxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoby5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihFdmVudEJ1cy5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF90cmlnZ2VyOiBmdW5jdGlvbih0eXBlLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlO1xuICAgICAgICAgICAgICAgICRlID0gJC5FdmVudChuYW1lc3BhY2UgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAoYXJncyA9IGFyZ3MgfHwgW10pLnVuc2hpZnQoJGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLnRyaWdnZXIuYXBwbHkodGhpcy4kZWwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncywgJGU7XG4gICAgICAgICAgICAgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICAkZSA9IHRoaXMuX3RyaWdnZXIoXCJiZWZvcmVcIiArIHR5cGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlcHJlY2F0ZWRUeXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIodHlwZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwcmVjYXRlZFR5cGUgPSBkZXByZWNhdGlvbk1hcFt0eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKGRlcHJlY2F0ZWRUeXBlLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFdmVudEJ1cztcbiAgICB9KCk7XG4gICAgdmFyIEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gL1xccysvLCBuZXh0VGljayA9IGdldE5leHRUaWNrKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN5bmM6IG9uU3luYyxcbiAgICAgICAgICAgIG9uQXN5bmM6IG9uQXN5bmMsXG4gICAgICAgICAgICBvZmY6IG9mZixcbiAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gb24obWV0aG9kLCB0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICBjYiA9IGNvbnRleHQgPyBiaW5kQ29udGV4dChjYiwgY29udGV4dCkgOiBjYjtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgICAgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXSA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHN5bmM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXVttZXRob2RdLnB1c2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Bc3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvbi5jYWxsKHRoaXMsIFwiYXN5bmNcIiwgdHlwZXMsIGNiLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gb24uY2FsbCh0aGlzLCBcInN5bmNcIiwgdHlwZXMsIGNiLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvZmYodHlwZXMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXIodHlwZXMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlLCBjYWxsYmFja3MsIGFyZ3MsIHN5bmNGbHVzaCwgYXN5bmNGbHVzaDtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICB3aGlsZSAoKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSAmJiAoY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5zeW5jLCB0aGlzLCBbIHR5cGUgXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIGFzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3MuYXN5bmMsIHRoaXMsIFsgdHlwZSBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgc3luY0ZsdXNoKCkgJiYgbmV4dFRpY2soYXN5bmNGbHVzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRGbHVzaChjYWxsYmFja3MsIGNvbnRleHQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmbHVzaDtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQ7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7ICFjYW5jZWxsZWQgJiYgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZCA9IGNhbGxiYWNrc1tpXS5hcHBseShjb250ZXh0LCBhcmdzKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhY2FuY2VsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE5leHRUaWNrKCkge1xuICAgICAgICAgICAgdmFyIG5leHRUaWNrRm47XG4gICAgICAgICAgICBpZiAod2luZG93LnNldEltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIG5leHRUaWNrRm4gPSBmdW5jdGlvbiBuZXh0VGlja1NldEltbWVkaWF0ZShmbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0VGlja0ZuID0gZnVuY3Rpb24gbmV4dFRpY2tTZXRUaW1lb3V0KGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRUaWNrRm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYmluZENvbnRleHQoZm4sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5iaW5kID8gZm4uYmluZChjb250ZXh0KSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBoaWdobGlnaHQgPSBmdW5jdGlvbihkb2MpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxuICAgICAgICAgICAgdGFnTmFtZTogXCJzdHJvbmdcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgIHdvcmRzT25seTogZmFsc2UsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gaGlnaHRsaWdodChvKSB7XG4gICAgICAgICAgICB2YXIgcmVnZXg7XG4gICAgICAgICAgICBvID0gXy5taXhpbih7fSwgZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgaWYgKCFvLm5vZGUgfHwgIW8ucGF0dGVybikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8ucGF0dGVybiA9IF8uaXNBcnJheShvLnBhdHRlcm4pID8gby5wYXR0ZXJuIDogWyBvLnBhdHRlcm4gXTtcbiAgICAgICAgICAgIHJlZ2V4ID0gZ2V0UmVnZXgoby5wYXR0ZXJuLCBvLmNhc2VTZW5zaXRpdmUsIG8ud29yZHNPbmx5KTtcbiAgICAgICAgICAgIHRyYXZlcnNlKG8ubm9kZSwgaGlnaHRsaWdodFRleHROb2RlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhpZ2h0bGlnaHRUZXh0Tm9kZSh0ZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCwgcGF0dGVybk5vZGUsIHdyYXBwZXJOb2RlO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IHJlZ2V4LmV4ZWModGV4dE5vZGUuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlck5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudChvLnRhZ05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBvLmNsYXNzTmFtZSAmJiAod3JhcHBlck5vZGUuY2xhc3NOYW1lID0gby5jbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuTm9kZSA9IHRleHROb2RlLnNwbGl0VGV4dChtYXRjaC5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5Ob2RlLnNwbGl0VGV4dChtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyTm9kZS5hcHBlbmRDaGlsZChwYXR0ZXJuTm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyTm9kZSwgcGF0dGVybk5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISFtYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYXZlcnNlKGVsLCBoaWdodGxpZ2h0VGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlLCBURVhUX05PREVfVFlQRSA9IDM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZSA9IGVsLmNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IFRFWFRfTk9ERV9UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IGhpZ2h0bGlnaHRUZXh0Tm9kZShjaGlsZE5vZGUpID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmF2ZXJzZShjaGlsZE5vZGUsIGhpZ2h0bGlnaHRUZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldFJlZ2V4KHBhdHRlcm5zLCBjYXNlU2Vuc2l0aXZlLCB3b3Jkc09ubHkpIHtcbiAgICAgICAgICAgIHZhciBlc2NhcGVkUGF0dGVybnMgPSBbXSwgcmVnZXhTdHI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0dGVybnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlc2NhcGVkUGF0dGVybnMucHVzaChfLmVzY2FwZVJlZ0V4Q2hhcnMocGF0dGVybnNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZ2V4U3RyID0gd29yZHNPbmx5ID8gXCJcXFxcYihcIiArIGVzY2FwZWRQYXR0ZXJucy5qb2luKFwifFwiKSArIFwiKVxcXFxiXCIgOiBcIihcIiArIGVzY2FwZWRQYXR0ZXJucy5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICAgICAgcmV0dXJuIGNhc2VTZW5zaXRpdmUgPyBuZXcgUmVnRXhwKHJlZ2V4U3RyKSA6IG5ldyBSZWdFeHAocmVnZXhTdHIsIFwiaVwiKTtcbiAgICAgICAgfVxuICAgIH0od2luZG93LmRvY3VtZW50KTtcbiAgICB2YXIgSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzcGVjaWFsS2V5Q29kZU1hcDtcbiAgICAgICAgc3BlY2lhbEtleUNvZGVNYXAgPSB7XG4gICAgICAgICAgICA5OiBcInRhYlwiLFxuICAgICAgICAgICAgMjc6IFwiZXNjXCIsXG4gICAgICAgICAgICAzNzogXCJsZWZ0XCIsXG4gICAgICAgICAgICAzOTogXCJyaWdodFwiLFxuICAgICAgICAgICAgMTM6IFwiZW50ZXJcIixcbiAgICAgICAgICAgIDM4OiBcInVwXCIsXG4gICAgICAgICAgICA0MDogXCJkb3duXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gSW5wdXQobywgd3d3KSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJpbnB1dCBpcyBtaXNzaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kaGludCA9ICQoby5oaW50KTtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0ID0gJChvLmlucHV0KTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlXaGVuRm9jdXNlZCA9IHRoaXMuaGFzRm9jdXMoKSA/IHRoaXMucXVlcnkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSBidWlsZE92ZXJmbG93SGVscGVyKHRoaXMuJGlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiRoaW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGludCA9IHRoaXMuZ2V0SGludCA9IHRoaXMuY2xlYXJIaW50ID0gdGhpcy5jbGVhckhpbnRJZkludmFsaWQgPSBfLm5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSW5wdXQubm9ybWFsaXplUXVlcnkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBfLnRvU3RyKHN0cikucmVwbGFjZSgvXlxccyovZywgXCJcIikucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oSW5wdXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vbkJsdXI6IGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImJsdXJyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRm9jdXM6IGZ1bmN0aW9uIG9uRm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVdoZW5Gb2N1c2VkID0gdGhpcy5xdWVyeTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJmb2N1c2VkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbktleWRvd246IGZ1bmN0aW9uIG9uS2V5ZG93bigkZSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlOYW1lID0gc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV07XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpO1xuICAgICAgICAgICAgICAgIGlmIChrZXlOYW1lICYmIHRoaXMuX3Nob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihrZXlOYW1lICsgXCJLZXllZFwiLCAkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbklucHV0OiBmdW5jdGlvbiBvbklucHV0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFF1ZXJ5KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySGludElmSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbWFuYWdlUHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIG1hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZlbnREZWZhdWx0O1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2hvdWxkVHJpZ2dlcjogZnVuY3Rpb24gc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInRhYlwiOlxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGNoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9ICh0aGlzLiRpbnB1dC5jc3MoXCJkaXJlY3Rpb25cIikgfHwgXCJsdHJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgIT09IGRpcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaGludC5hdHRyKFwiZGlyXCIsIGRpcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImxhbmdEaXJDaGFuZ2VkXCIsIGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkodmFsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJlRXF1aXZhbGVudCwgaGFzRGlmZmVyZW50V2hpdGVzcGFjZTtcbiAgICAgICAgICAgICAgICBhcmVFcXVpdmFsZW50ID0gYXJlUXVlcmllc0VxdWl2YWxlbnQodmFsLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlID0gYXJlRXF1aXZhbGVudCA/IHRoaXMucXVlcnkubGVuZ3RoICE9PSB2YWwubGVuZ3RoIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAoIXNpbGVudCAmJiAhYXJlRXF1aXZhbGVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJxdWVyeUNoYW5nZWRcIiwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc2lsZW50ICYmIGhhc0RpZmZlcmVudFdoaXRlc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwid2hpdGVzcGFjZUNoYW5nZWRcIiwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgb25CbHVyLCBvbkZvY3VzLCBvbktleWRvd24sIG9uSW5wdXQ7XG4gICAgICAgICAgICAgICAgb25CbHVyID0gXy5iaW5kKHRoaXMuX29uQmx1ciwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25Gb2N1cyA9IF8uYmluZCh0aGlzLl9vbkZvY3VzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbktleWRvd24gPSBfLmJpbmQodGhpcy5fb25LZXlkb3duLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbklucHV0ID0gXy5iaW5kKHRoaXMuX29uSW5wdXQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwiYmx1ci50dFwiLCBvbkJsdXIpLm9uKFwiZm9jdXMudHRcIiwgb25Gb2N1cykub24oXCJrZXlkb3duLnR0XCIsIG9uS2V5ZG93bik7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzTXNpZSgpIHx8IF8uaXNNc2llKCkgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwiaW5wdXQudHRcIiwgb25JbnB1dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJrZXlkb3duLnR0IGtleXByZXNzLnR0IGN1dC50dCBwYXN0ZS50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihfLmJpbmQodGhhdC5fb25JbnB1dCwgdGhhdCwgJGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsdXI6IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhbmdEaXI6IGZ1bmN0aW9uIGdldExhbmdEaXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFF1ZXJ5OiBmdW5jdGlvbiBnZXRRdWVyeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSB8fCBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFF1ZXJ5OiBmdW5jdGlvbiBzZXRRdWVyeSh2YWwsIHNpbGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh2YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFF1ZXJ5KHZhbCwgc2lsZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1czogZnVuY3Rpb24gaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkgIT09IHRoaXMucXVlcnlXaGVuRm9jdXNlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBnZXRJbnB1dFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySGludElmSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5xdWVyeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SGludDogZnVuY3Rpb24gZ2V0SGludCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaGludC52YWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIaW50OiBmdW5jdGlvbiBzZXRIaW50KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludC52YWwodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySGludDogZnVuY3Rpb24gY2xlYXJIaW50KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGludChcIlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhpbnRJZkludmFsaWQ6IGZ1bmN0aW9uIGNsZWFySGludElmSW52YWxpZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsLCBoaW50LCB2YWxJc1ByZWZpeE9mSGludCwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBoaW50ID0gdGhpcy5nZXRIaW50KCk7XG4gICAgICAgICAgICAgICAgdmFsSXNQcmVmaXhPZkhpbnQgPSB2YWwgIT09IGhpbnQgJiYgaGludC5pbmRleE9mKHZhbCkgPT09IDA7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHZhbCAhPT0gXCJcIiAmJiB2YWxJc1ByZWZpeE9mSGludCAmJiAhdGhpcy5oYXNPdmVyZmxvdygpO1xuICAgICAgICAgICAgICAgICFpc1ZhbGlkICYmIHRoaXMuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzRm9jdXM6IGZ1bmN0aW9uIGhhc0ZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRpbnB1dC5pcyhcIjpmb2N1c1wiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNPdmVyZmxvdzogZnVuY3Rpb24gaGFzT3ZlcmZsb3coKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnQgPSB0aGlzLiRpbnB1dC53aWR0aCgpIC0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci50ZXh0KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kb3ZlcmZsb3dIZWxwZXIud2lkdGgoKSA+PSBjb25zdHJhaW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ3Vyc29yQXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUxlbmd0aCwgc2VsZWN0aW9uU3RhcnQsIHJhbmdlO1xuICAgICAgICAgICAgICAgIHZhbHVlTGVuZ3RoID0gdGhpcy4kaW5wdXQudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gdGhpcy4kaW5wdXRbMF0uc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIoc2VsZWN0aW9uU3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25TdGFydCA9PT0gdmFsdWVMZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC12YWx1ZUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUxlbmd0aCA9PT0gcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludC5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQgPSB0aGlzLiRpbnB1dCA9IHRoaXMuJG92ZXJmbG93SGVscGVyID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIElucHV0O1xuICAgICAgICBmdW5jdGlvbiBidWlsZE92ZXJmbG93SGVscGVyKCRpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuICQoJzxwcmUgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9wcmU+JykuY3NzKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogXCJwcmVcIixcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAkaW5wdXQuY3NzKFwiZm9udC1mYW1pbHlcIiksXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICRpbnB1dC5jc3MoXCJmb250LXNpemVcIiksXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAkaW5wdXQuY3NzKFwiZm9udC1zdHlsZVwiKSxcbiAgICAgICAgICAgICAgICBmb250VmFyaWFudDogJGlucHV0LmNzcyhcImZvbnQtdmFyaWFudFwiKSxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAkaW5wdXQuY3NzKFwiZm9udC13ZWlnaHRcIiksXG4gICAgICAgICAgICAgICAgd29yZFNwYWNpbmc6ICRpbnB1dC5jc3MoXCJ3b3JkLXNwYWNpbmdcIiksXG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJGlucHV0LmNzcyhcImxldHRlci1zcGFjaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRleHRJbmRlbnQ6ICRpbnB1dC5jc3MoXCJ0ZXh0LWluZGVudFwiKSxcbiAgICAgICAgICAgICAgICB0ZXh0UmVuZGVyaW5nOiAkaW5wdXQuY3NzKFwidGV4dC1yZW5kZXJpbmdcIiksXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJGlucHV0LmNzcyhcInRleHQtdHJhbnNmb3JtXCIpXG4gICAgICAgICAgICB9KS5pbnNlcnRBZnRlcigkaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFyZVF1ZXJpZXNFcXVpdmFsZW50KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dC5ub3JtYWxpemVRdWVyeShhKSA9PT0gSW5wdXQubm9ybWFsaXplUXVlcnkoYik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd2l0aE1vZGlmaWVyKCRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJGUuYWx0S2V5IHx8ICRlLmN0cmxLZXkgfHwgJGUubWV0YUtleSB8fCAkZS5zaGlmdEtleTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgRGF0YXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGtleXMsIG5hbWVHZW5lcmF0b3I7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICB2YWw6IFwidHQtc2VsZWN0YWJsZS1kaXNwbGF5XCIsXG4gICAgICAgICAgICBvYmo6IFwidHQtc2VsZWN0YWJsZS1vYmplY3RcIlxuICAgICAgICB9O1xuICAgICAgICBuYW1lR2VuZXJhdG9yID0gXy5nZXRJZEdlbmVyYXRvcigpO1xuICAgICAgICBmdW5jdGlvbiBEYXRhc2V0KG8sIHd3dykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBvLnRlbXBsYXRlcyA9IG8udGVtcGxhdGVzIHx8IHt9O1xuICAgICAgICAgICAgby50ZW1wbGF0ZXMubm90Rm91bmQgPSBvLnRlbXBsYXRlcy5ub3RGb3VuZCB8fCBvLnRlbXBsYXRlcy5lbXB0eTtcbiAgICAgICAgICAgIGlmICghby5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBzb3VyY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIG5vZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5uYW1lICYmICFpc1ZhbGlkTmFtZShvLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImludmFsaWQgZGF0YXNldCBuYW1lOiBcIiArIG8ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBvLm5hbWUgfHwgbmFtZUdlbmVyYXRvcigpO1xuICAgICAgICAgICAgdGhpcy5saW1pdCA9IG8ubGltaXQgfHwgNTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUZuID0gZ2V0RGlzcGxheUZuKG8uZGlzcGxheSB8fCBvLmRpc3BsYXlLZXkpO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZXMgPSBnZXRUZW1wbGF0ZXMoby50ZW1wbGF0ZXMsIHRoaXMuZGlzcGxheUZuKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gby5zb3VyY2UuX190dEFkYXB0ZXIgPyBvLnNvdXJjZS5fX3R0QWRhcHRlcigpIDogby5zb3VyY2U7XG4gICAgICAgICAgICB0aGlzLmFzeW5jID0gXy5pc1VuZGVmaW5lZChvLmFzeW5jKSA/IHRoaXMuc291cmNlLmxlbmd0aCA+IDIgOiAhIW8uYXN5bmM7XG4gICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoby5ub2RlKS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZGF0YXNldCkuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmRhdGFzZXQgKyBcIi1cIiArIHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YXNldC5leHRyYWN0RGF0YSA9IGZ1bmN0aW9uIGV4dHJhY3REYXRhKGVsKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAgICAgICBpZiAoJGVsLmRhdGEoa2V5cy5vYmopKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAkZWwuZGF0YShrZXlzLnZhbCkgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqOiAkZWwuZGF0YShrZXlzLm9iaikgfHwgbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihEYXRhc2V0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb3ZlcndyaXRlOiBmdW5jdGlvbiBvdmVyd3JpdGUocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFzeW5jICYmIHRoaXMudGVtcGxhdGVzLnBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyUGVuZGluZyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5hc3luYyAmJiB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZChxdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicmVuZGVyZWRcIiwgdGhpcy5uYW1lLCBzdWdnZXN0aW9ucywgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggJiYgdGhpcy4kbGFzdFN1Z2dlc3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZFN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLiRsYXN0U3VnZ2VzdGlvbi5sZW5ndGggJiYgdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQocXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJyZW5kZXJlZFwiLCB0aGlzLm5hbWUsIHN1Z2dlc3Rpb25zLCB0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIHJlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkZnJhZ21lbnQ7XG4gICAgICAgICAgICAgICAgJGZyYWdtZW50ID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJGZyYWdtZW50LmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmh0bWwoJGZyYWdtZW50KS5wcmVwZW5kKHRoaXMuX2dldEhlYWRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpKS5hcHBlbmQodGhpcy5fZ2V0Rm9vdGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hcHBlbmRTdWdnZXN0aW9uczogZnVuY3Rpb24gYXBwZW5kU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRmcmFnbWVudCwgJGxhc3RTdWdnZXN0aW9uO1xuICAgICAgICAgICAgICAgICRmcmFnbWVudCA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICAkbGFzdFN1Z2dlc3Rpb24gPSAkZnJhZ21lbnQuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24uYWZ0ZXIoJGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICRsYXN0U3VnZ2VzdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyUGVuZGluZzogZnVuY3Rpb24gcmVuZGVyUGVuZGluZyhxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzLnBlbmRpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlICYmIHRoaXMuJGVsLmh0bWwodGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyTm90Rm91bmQ6IGZ1bmN0aW9uIHJlbmRlck5vdEZvdW5kKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlICYmIHRoaXMuJGVsLmh0bWwodGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50OiBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZnJhZ21lbnQ7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHN1Z2dlc3Rpb25zLCBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uTm9kZShzdWdnZXN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwsIGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGF0Ll9pbmplY3RRdWVyeShxdWVyeSwgc3VnZ2VzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICRlbCA9ICQodGhhdC50ZW1wbGF0ZXMuc3VnZ2VzdGlvbihjb250ZXh0KSkuZGF0YShrZXlzLm9iaiwgc3VnZ2VzdGlvbikuZGF0YShrZXlzLnZhbCwgdGhhdC5kaXNwbGF5Rm4oc3VnZ2VzdGlvbikpLmFkZENsYXNzKHRoYXQuY2xhc3Nlcy5zdWdnZXN0aW9uICsgXCIgXCIgKyB0aGF0LmNsYXNzZXMuc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCRlbFswXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgJiYgaGlnaGxpZ2h0KHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNsYXNzZXMuaGlnaGxpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBmcmFnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogcXVlcnlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChmcmFnbWVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldEZvb3RlcjogZnVuY3Rpb24gZ2V0Rm9vdGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcy5mb290ZXIgPyB0aGlzLnRlbXBsYXRlcy5mb290ZXIoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRIZWFkZXI6IGZ1bmN0aW9uIGdldEhlYWRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMuaGVhZGVyID8gdGhpcy50ZW1wbGF0ZXMuaGVhZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVzZXRMYXN0U3VnZ2VzdGlvbjogZnVuY3Rpb24gcmVzZXRMYXN0U3VnZ2VzdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaW5qZWN0UXVlcnk6IGZ1bmN0aW9uIGluamVjdFF1ZXJ5KHF1ZXJ5LCBvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc09iamVjdChvYmopID8gXy5taXhpbih7XG4gICAgICAgICAgICAgICAgICAgIF9xdWVyeTogcXVlcnlcbiAgICAgICAgICAgICAgICB9LCBvYmopIDogb2JqO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBjYW5jZWxlZCA9IGZhbHNlLCBzeW5jQ2FsbGVkID0gZmFsc2UsIHJlbmRlcmVkID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsID0gJC5ub29wO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmFzeW5jICYmIHRoYXQudHJpZ2dlcihcImFzeW5jQ2FuY2VsZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UocXVlcnksIHN5bmMsIGFzeW5jKTtcbiAgICAgICAgICAgICAgICAhc3luY0NhbGxlZCAmJiBzeW5jKFtdKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzeW5jKHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeW5jQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3luY0NhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gKHN1Z2dlc3Rpb25zIHx8IFtdKS5zbGljZSgwLCB0aGF0LmxpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWQgPSBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX292ZXJ3cml0ZShxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgPCB0aGF0LmxpbWl0ICYmIHRoYXQuYXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImFzeW5jUmVxdWVzdGVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhc3luYyhzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkICYmIHJlbmRlcmVkIDwgdGhhdC5saW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW5jZWwgPSAkLm5vb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZCArPSBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9hcHBlbmQocXVlcnksIHN1Z2dlc3Rpb25zLnNsaWNlKDAsIHRoYXQubGltaXQgLSByZW5kZXJlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hc3luYyAmJiB0aGF0LnRyaWdnZXIoXCJhc3luY1JlY2VpdmVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWw6ICQubm9vcCxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiY2xlYXJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbC5pcyhcIjplbXB0eVwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIERhdGFzZXQ7XG4gICAgICAgIGZ1bmN0aW9uIGdldERpc3BsYXlGbihkaXNwbGF5KSB7XG4gICAgICAgICAgICBkaXNwbGF5ID0gZGlzcGxheSB8fCBfLnN0cmluZ2lmeTtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRnVuY3Rpb24oZGlzcGxheSkgPyBkaXNwbGF5IDogZGlzcGxheUZuO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGlzcGxheUZuKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbZGlzcGxheV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGVzKHRlbXBsYXRlcywgZGlzcGxheUZuKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5vdEZvdW5kOiB0ZW1wbGF0ZXMubm90Rm91bmQgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5ub3RGb3VuZCksXG4gICAgICAgICAgICAgICAgcGVuZGluZzogdGVtcGxhdGVzLnBlbmRpbmcgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5wZW5kaW5nKSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHRlbXBsYXRlcy5oZWFkZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5oZWFkZXIpLFxuICAgICAgICAgICAgICAgIGZvb3RlcjogdGVtcGxhdGVzLmZvb3RlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmZvb3RlciksXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbjogdGVtcGxhdGVzLnN1Z2dlc3Rpb24gfHwgc3VnZ2VzdGlvblRlbXBsYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZnVuY3Rpb24gc3VnZ2VzdGlvblRlbXBsYXRlKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpLnRleHQoZGlzcGxheUZuKGNvbnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkTmFtZShzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiAvXltfYS16QS1aMC05LV0rJC8udGVzdChzdHIpO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBNZW51KG8sIHd3dykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJub2RlIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kbm9kZSA9ICQoby5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0cyA9IF8ubWFwKG8uZGF0YXNldHMsIGluaXRpYWxpemVEYXRhc2V0KTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhc2V0KG9EYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGF0LiRub2RlLmZpbmQob0RhdGFzZXQubm9kZSkuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICBvRGF0YXNldC5ub2RlID0gbm9kZS5sZW5ndGggPyBub2RlIDogJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuJG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YXNldChvRGF0YXNldCwgd3d3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKE1lbnUucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vblNlbGVjdGFibGVDbGljazogZnVuY3Rpb24gb25TZWxlY3RhYmxlQ2xpY2soJGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJzZWxlY3RhYmxlQ2xpY2tlZFwiLCAkKCRlLmN1cnJlbnRUYXJnZXQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZCh0eXBlLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSwgdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJkYXRhc2V0UmVuZGVyZWRcIiwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25DbGVhcmVkOiBmdW5jdGlvbiBvbkNsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHksIHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZGF0YXNldENsZWFyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Byb3BhZ2F0ZTogZnVuY3Rpb24gcHJvcGFnYXRlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hbGxEYXRhc2V0c0VtcHR5OiBmdW5jdGlvbiBhbGxEYXRhc2V0c0VtcHR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmV2ZXJ5KHRoaXMuZGF0YXNldHMsIGlzRGF0YXNldEVtcHR5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc0RhdGFzZXRFbXB0eShkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhc2V0LmlzRW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldFNlbGVjdGFibGVzOiBmdW5jdGlvbiBnZXRTZWxlY3RhYmxlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kbm9kZS5maW5kKHRoaXMuc2VsZWN0b3JzLnNlbGVjdGFibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW1vdmVDdXJzb3I6IGZ1bmN0aW9uIF9yZW1vdmVDdXJzb3IoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5nZXRBY3RpdmVTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGUgJiYgJHNlbGVjdGFibGUucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc2VzLmN1cnNvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Vuc3VyZVZpc2libGU6IGZ1bmN0aW9uIGVuc3VyZVZpc2libGUoJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsVG9wLCBlbEJvdHRvbSwgbm9kZVNjcm9sbFRvcCwgbm9kZUhlaWdodDtcbiAgICAgICAgICAgICAgICBlbFRvcCA9ICRlbC5wb3NpdGlvbigpLnRvcDtcbiAgICAgICAgICAgICAgICBlbEJvdHRvbSA9IGVsVG9wICsgJGVsLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgICAgIG5vZGVTY3JvbGxUb3AgPSB0aGlzLiRub2RlLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIG5vZGVIZWlnaHQgPSB0aGlzLiRub2RlLmhlaWdodCgpICsgcGFyc2VJbnQodGhpcy4kbm9kZS5jc3MoXCJwYWRkaW5nVG9wXCIpLCAxMCkgKyBwYXJzZUludCh0aGlzLiRub2RlLmNzcyhcInBhZGRpbmdCb3R0b21cIiksIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxUb3AgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuc2Nyb2xsVG9wKG5vZGVTY3JvbGxUb3AgKyBlbFRvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlSGVpZ2h0IDwgZWxCb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5zY3JvbGxUb3Aobm9kZVNjcm9sbFRvcCArIChlbEJvdHRvbSAtIG5vZGVIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBvblNlbGVjdGFibGVDbGljaztcbiAgICAgICAgICAgICAgICBvblNlbGVjdGFibGVDbGljayA9IF8uYmluZCh0aGlzLl9vblNlbGVjdGFibGVDbGljaywgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5vbihcImNsaWNrLnR0XCIsIHRoaXMuc2VsZWN0b3JzLnNlbGVjdGFibGUsIG9uU2VsZWN0YWJsZUNsaWNrKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZnVuY3Rpb24oZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0Lm9uU3luYyhcImFzeW5jUmVxdWVzdGVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwiYXN5bmNDYW5jZWxlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcImFzeW5jUmVjZWl2ZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJyZW5kZXJlZFwiLCB0aGF0Ll9vblJlbmRlcmVkLCB0aGF0KS5vblN5bmMoXCJjbGVhcmVkXCIsIHRoYXQuX29uQ2xlYXJlZCwgdGhhdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG5vZGUuaGFzQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmF0dHIoXCJkaXJcIiwgZGlyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcjogZnVuY3Rpb24gc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3IoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGVzLCAkb2xkQ3Vyc29yLCBvbGRJbmRleCwgbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgJG9sZEN1cnNvciA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlcyA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCk7XG4gICAgICAgICAgICAgICAgb2xkSW5kZXggPSAkb2xkQ3Vyc29yID8gJHNlbGVjdGFibGVzLmluZGV4KCRvbGRDdXJzb3IpIDogLTE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBvbGRJbmRleCArIGRlbHRhO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gKG5ld0luZGV4ICsgMSkgJSAoJHNlbGVjdGFibGVzLmxlbmd0aCArIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4IDwgLTEgPyAkc2VsZWN0YWJsZXMubGVuZ3RoIC0gMSA6IG5ld0luZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmRleCA9PT0gLTEgPyBudWxsIDogJHNlbGVjdGFibGVzLmVxKG5ld0luZGV4KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDdXJzb3I6IGZ1bmN0aW9uIHNldEN1cnNvcigkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9ICRzZWxlY3RhYmxlICYmICRzZWxlY3RhYmxlLmZpcnN0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdGFibGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmN1cnNvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vuc3VyZVZpc2libGUoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWxlY3RhYmxlRGF0YTogZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZURhdGEoJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbCAmJiAkZWwubGVuZ3RoID8gRGF0YXNldC5leHRyYWN0RGF0YSgkZWwpIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBY3RpdmVTZWxlY3RhYmxlOiBmdW5jdGlvbiBnZXRBY3RpdmVTZWxlY3RhYmxlKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCkuZmlsdGVyKHRoaXMuc2VsZWN0b3JzLmN1cnNvcikuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNlbGVjdGFibGUubGVuZ3RoID8gJHNlbGVjdGFibGUgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRvcFNlbGVjdGFibGU6IGZ1bmN0aW9uIGdldFRvcFNlbGVjdGFibGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2VsZWN0YWJsZS5sZW5ndGggPyAkc2VsZWN0YWJsZSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZFVwZGF0ZSA9IHF1ZXJ5ICE9PSB0aGlzLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIHVwZGF0ZURhdGFzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZFVwZGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC51cGRhdGUocXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGNsZWFyRGF0YXNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBkZXN0cm95RGF0YXNldCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVzdHJveURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gTWVudTtcbiAgICB9KCk7XG4gICAgdmFyIERlZmF1bHRNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgcyA9IE1lbnUucHJvdG90eXBlO1xuICAgICAgICBmdW5jdGlvbiBEZWZhdWx0TWVudSgpIHtcbiAgICAgICAgICAgIE1lbnUuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKERlZmF1bHRNZW51LnByb3RvdHlwZSwgTWVudS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgIXRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMub3Blbi5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuY2xvc2UuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbigpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuX29uUmVuZGVyZWQuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25DbGVhcmVkOiBmdW5jdGlvbiBvbkNsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4oKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzLl9vbkNsZWFyZWQuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5jc3MoZGlyID09PSBcImx0clwiID8gdGhpcy5jc3MubHRyIDogdGhpcy5jc3MucnRsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5zZXRMYW5ndWFnZURpcmVjdGlvbi5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9oaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuaGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zaG93OiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIERlZmF1bHRNZW51O1xuICAgIH0oKTtcbiAgICB2YXIgVHlwZWFoZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBUeXBlYWhlYWQobywgd3d3KSB7XG4gICAgICAgICAgICB2YXIgb25Gb2N1c2VkLCBvbkJsdXJyZWQsIG9uRW50ZXJLZXllZCwgb25UYWJLZXllZCwgb25Fc2NLZXllZCwgb25VcEtleWVkLCBvbkRvd25LZXllZCwgb25MZWZ0S2V5ZWQsIG9uUmlnaHRLZXllZCwgb25RdWVyeUNoYW5nZWQsIG9uV2hpdGVzcGFjZUNoYW5nZWQ7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIGlucHV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBtZW51XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLmV2ZW50QnVzKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgZXZlbnQgYnVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEJ1cyA9IG8uZXZlbnRCdXM7XG4gICAgICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IF8uaXNOdW1iZXIoby5taW5MZW5ndGgpID8gby5taW5MZW5ndGggOiAxO1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IG8uaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBvLm1lbnU7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaGFzRm9jdXMoKSAmJiB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmRpciA9IHRoaXMuaW5wdXQuZ2V0TGFuZ0RpcigpO1xuICAgICAgICAgICAgdGhpcy5faGFja3MoKTtcbiAgICAgICAgICAgIHRoaXMubWVudS5iaW5kKCkub25TeW5jKFwic2VsZWN0YWJsZUNsaWNrZWRcIiwgdGhpcy5fb25TZWxlY3RhYmxlQ2xpY2tlZCwgdGhpcykub25TeW5jKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgdGhpcy5fb25Bc3luY1JlcXVlc3RlZCwgdGhpcykub25TeW5jKFwiYXN5bmNDYW5jZWxlZFwiLCB0aGlzLl9vbkFzeW5jQ2FuY2VsZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jUmVjZWl2ZWRcIiwgdGhpcy5fb25Bc3luY1JlY2VpdmVkLCB0aGlzKS5vblN5bmMoXCJkYXRhc2V0UmVuZGVyZWRcIiwgdGhpcy5fb25EYXRhc2V0UmVuZGVyZWQsIHRoaXMpLm9uU3luYyhcImRhdGFzZXRDbGVhcmVkXCIsIHRoaXMuX29uRGF0YXNldENsZWFyZWQsIHRoaXMpO1xuICAgICAgICAgICAgb25Gb2N1c2VkID0gYyh0aGlzLCBcImFjdGl2YXRlXCIsIFwib3BlblwiLCBcIl9vbkZvY3VzZWRcIik7XG4gICAgICAgICAgICBvbkJsdXJyZWQgPSBjKHRoaXMsIFwiZGVhY3RpdmF0ZVwiLCBcIl9vbkJsdXJyZWRcIik7XG4gICAgICAgICAgICBvbkVudGVyS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25FbnRlcktleWVkXCIpO1xuICAgICAgICAgICAgb25UYWJLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vblRhYktleWVkXCIpO1xuICAgICAgICAgICAgb25Fc2NLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIl9vbkVzY0tleWVkXCIpO1xuICAgICAgICAgICAgb25VcEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwib3BlblwiLCBcIl9vblVwS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkRvd25LZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIm9wZW5cIiwgXCJfb25Eb3duS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkxlZnRLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vbkxlZnRLZXllZFwiKTtcbiAgICAgICAgICAgIG9uUmlnaHRLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vblJpZ2h0S2V5ZWRcIik7XG4gICAgICAgICAgICBvblF1ZXJ5Q2hhbmdlZCA9IGModGhpcywgXCJfb3BlbklmQWN0aXZlXCIsIFwiX29uUXVlcnlDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgb25XaGl0ZXNwYWNlQ2hhbmdlZCA9IGModGhpcywgXCJfb3BlbklmQWN0aXZlXCIsIFwiX29uV2hpdGVzcGFjZUNoYW5nZWRcIik7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmJpbmQoKS5vblN5bmMoXCJmb2N1c2VkXCIsIG9uRm9jdXNlZCwgdGhpcykub25TeW5jKFwiYmx1cnJlZFwiLCBvbkJsdXJyZWQsIHRoaXMpLm9uU3luYyhcImVudGVyS2V5ZWRcIiwgb25FbnRlcktleWVkLCB0aGlzKS5vblN5bmMoXCJ0YWJLZXllZFwiLCBvblRhYktleWVkLCB0aGlzKS5vblN5bmMoXCJlc2NLZXllZFwiLCBvbkVzY0tleWVkLCB0aGlzKS5vblN5bmMoXCJ1cEtleWVkXCIsIG9uVXBLZXllZCwgdGhpcykub25TeW5jKFwiZG93bktleWVkXCIsIG9uRG93bktleWVkLCB0aGlzKS5vblN5bmMoXCJsZWZ0S2V5ZWRcIiwgb25MZWZ0S2V5ZWQsIHRoaXMpLm9uU3luYyhcInJpZ2h0S2V5ZWRcIiwgb25SaWdodEtleWVkLCB0aGlzKS5vblN5bmMoXCJxdWVyeUNoYW5nZWRcIiwgb25RdWVyeUNoYW5nZWQsIHRoaXMpLm9uU3luYyhcIndoaXRlc3BhY2VDaGFuZ2VkXCIsIG9uV2hpdGVzcGFjZUNoYW5nZWQsIHRoaXMpLm9uU3luYyhcImxhbmdEaXJDaGFuZ2VkXCIsIHRoaXMuX29uTGFuZ0RpckNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oVHlwZWFoZWFkLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX2hhY2tzOiBmdW5jdGlvbiBoYWNrcygpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0LCAkbWVudTtcbiAgICAgICAgICAgICAgICAkaW5wdXQgPSB0aGlzLmlucHV0LiRpbnB1dCB8fCAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgJG1lbnUgPSB0aGlzLm1lbnUuJG5vZGUgfHwgJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgICRpbnB1dC5vbihcImJsdXIudHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSwgaXNBY3RpdmUsIGhhc0FjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPSAkbWVudS5pcyhhY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICBoYXNBY3RpdmUgPSAkbWVudS5oYXMoYWN0aXZlKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc01zaWUoKSAmJiAoaXNBY3RpdmUgfHwgaGFzQWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJG1lbnUub24oXCJtb3VzZWRvd24udHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25TZWxlY3RhYmxlQ2xpY2tlZDogZnVuY3Rpb24gb25TZWxlY3RhYmxlQ2xpY2tlZCh0eXBlLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkZWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRhdGFzZXRDbGVhcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRDbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25EYXRhc2V0UmVuZGVyZWQ6IGZ1bmN0aW9uIG9uRGF0YXNldFJlbmRlcmVkKHR5cGUsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJyZW5kZXJcIiwgc3VnZ2VzdGlvbnMsIGFzeW5jLCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY1JlcXVlc3RlZDogZnVuY3Rpb24gb25Bc3luY1JlcXVlc3RlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jcmVxdWVzdFwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNDYW5jZWxlZDogZnVuY3Rpb24gb25Bc3luY0NhbmNlbGVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNjYW5jZWxcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jUmVjZWl2ZWQ6IGZ1bmN0aW9uIG9uQXN5bmNSZWNlaXZlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jcmVjZWl2ZVwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRm9jdXNlZDogZnVuY3Rpb24gb25Gb2N1c2VkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbkxlbmd0aE1ldCgpICYmIHRoaXMubWVudS51cGRhdGUodGhpcy5pbnB1dC5nZXRRdWVyeSgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25CbHVycmVkOiBmdW5jdGlvbiBvbkJsdXJyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQuaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjaGFuZ2VcIiwgdGhpcy5pbnB1dC5nZXRRdWVyeSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRW50ZXJLZXllZDogZnVuY3Rpb24gb25FbnRlcktleWVkKHR5cGUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRBY3RpdmVTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblRhYktleWVkOiBmdW5jdGlvbiBvblRhYktleWVkKHR5cGUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRBY3RpdmVTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkVzY0tleWVkOiBmdW5jdGlvbiBvbkVzY0tleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25VcEtleWVkOiBmdW5jdGlvbiBvblVwS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKC0xKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Eb3duS2V5ZWQ6IGZ1bmN0aW9uIG9uRG93bktleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcigrMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uTGVmdEtleWVkOiBmdW5jdGlvbiBvbkxlZnRLZXllZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09IFwicnRsXCIgJiYgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUodGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJpZ2h0S2V5ZWQ6IGZ1bmN0aW9uIG9uUmlnaHRLZXllZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09IFwibHRyXCIgJiYgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUodGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblF1ZXJ5Q2hhbmdlZDogZnVuY3Rpb24gb25RdWVyeUNoYW5nZWQoZSwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5MZW5ndGhNZXQocXVlcnkpID8gdGhpcy5tZW51LnVwZGF0ZShxdWVyeSkgOiB0aGlzLm1lbnUuZW1wdHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25XaGl0ZXNwYWNlQ2hhbmdlZDogZnVuY3Rpb24gb25XaGl0ZXNwYWNlQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uTGFuZ0RpckNoYW5nZWQ6IGZ1bmN0aW9uIG9uTGFuZ0RpckNoYW5nZWQoZSwgZGlyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5zZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb3BlbklmQWN0aXZlOiBmdW5jdGlvbiBvcGVuSWZBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSgpICYmIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9taW5MZW5ndGhNZXQ6IGZ1bmN0aW9uIG1pbkxlbmd0aE1ldChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gXy5pc1N0cmluZyhxdWVyeSkgPyBxdWVyeSA6IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3VwZGF0ZUhpbnQ6IGZ1bmN0aW9uIHVwZGF0ZUhpbnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlLCBkYXRhLCB2YWwsIHF1ZXJ5LCBlc2NhcGVkUXVlcnksIGZyb250TWF0Y2hSZWdFeCwgbWF0Y2g7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuaW5wdXQuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmICFfLmlzQmxhbmtTdHJpbmcodmFsKSAmJiAhdGhpcy5pbnB1dC5oYXNPdmVyZmxvdygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gSW5wdXQubm9ybWFsaXplUXVlcnkodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZFF1ZXJ5ID0gXy5lc2NhcGVSZWdFeENoYXJzKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRNYXRjaFJlZ0V4ID0gbmV3IFJlZ0V4cChcIl4oPzpcIiArIGVzY2FwZWRRdWVyeSArIFwiKSguKyQpXCIsIFwiaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmcm9udE1hdGNoUmVnRXguZXhlYyhkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoICYmIHRoaXMuaW5wdXQuc2V0SGludCh2YWwgKyBtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW5hYmxlZCgpIHx8IHRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50QnVzLmJlZm9yZShcImlkbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiaWRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnUuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwib3BlblwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcIm9wZW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4oKSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJjbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWw6IGZ1bmN0aW9uIHNldFZhbCh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KF8udG9TdHIodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsOiBmdW5jdGlvbiBnZXRWYWwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdCgkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJzZWxlY3RcIiwgZGF0YS5vYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0YS52YWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJzZWxlY3RcIiwgZGF0YS5vYmopO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnksIGRhdGEsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGRhdGEgJiYgcXVlcnkgIT09IGRhdGEudmFsO1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImF1dG9jb21wbGV0ZVwiLCBkYXRhLm9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImF1dG9jb21wbGV0ZVwiLCBkYXRhLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvcihkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSwgJGNhbmRpZGF0ZSwgZGF0YSwgcGF5bG9hZCwgY2FuY2VsTW92ZTtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgICAgICAkY2FuZGlkYXRlID0gdGhpcy5tZW51LnNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yKGRlbHRhKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgIHBheWxvYWQgPSBkYXRhID8gZGF0YS5vYmogOiBudWxsO1xuICAgICAgICAgICAgICAgIGNhbmNlbE1vdmUgPSB0aGlzLl9taW5MZW5ndGhNZXQoKSAmJiB0aGlzLm1lbnUudXBkYXRlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbE1vdmUgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiY3Vyc29yY2hhbmdlXCIsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5zZXRDdXJzb3IoJGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjdXJzb3JjaGFuZ2VcIiwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFR5cGVhaGVhZDtcbiAgICAgICAgZnVuY3Rpb24gYyhjdHgpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2RzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIF8uZWFjaChtZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eFttZXRob2RdLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBvbGQsIGtleXMsIG1ldGhvZHM7XG4gICAgICAgIG9sZCA9ICQuZm4udHlwZWFoZWFkO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgd3d3OiBcInR0LXd3d1wiLFxuICAgICAgICAgICAgYXR0cnM6IFwidHQtYXR0cnNcIixcbiAgICAgICAgICAgIHR5cGVhaGVhZDogXCJ0dC10eXBlYWhlYWRcIlxuICAgICAgICB9O1xuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShvLCBkYXRhc2V0cykge1xuICAgICAgICAgICAgICAgIHZhciB3d3c7XG4gICAgICAgICAgICAgICAgZGF0YXNldHMgPSBfLmlzQXJyYXkoZGF0YXNldHMpID8gZGF0YXNldHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICAgICAgd3d3ID0gV1dXKG8uY2xhc3NOYW1lcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChhdHRhY2gpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCwgJHdyYXBwZXIsICRoaW50LCAkbWVudSwgZGVmYXVsdEhpbnQsIGRlZmF1bHRNZW51LCBldmVudEJ1cywgaW5wdXQsIG1lbnUsIHR5cGVhaGVhZCwgTWVudUNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goZGF0YXNldHMsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuaGlnaGxpZ2h0ID0gISFvLmhpZ2hsaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyID0gJCh3d3cuaHRtbC53cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQgPSAkZWxPck51bGwoby5oaW50KTtcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUgPSAkZWxPck51bGwoby5tZW51KTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhpbnQgPSBvLmhpbnQgIT09IGZhbHNlICYmICEkaGludDtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE1lbnUgPSBvLm1lbnUgIT09IGZhbHNlICYmICEkbWVudTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhpbnQgJiYgKCRoaW50ID0gYnVpbGRIaW50RnJvbUlucHV0KCRpbnB1dCwgd3d3KSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRNZW51ICYmICgkbWVudSA9ICQod3d3Lmh0bWwubWVudSkuY3NzKHd3dy5jc3MubWVudSkpO1xuICAgICAgICAgICAgICAgICAgICAkaGludCAmJiAkaGludC52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9IHByZXBJbnB1dCgkaW5wdXQsIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0SGludCB8fCBkZWZhdWx0TWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuY3NzKHd3dy5jc3Mud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuY3NzKGRlZmF1bHRIaW50ID8gd3d3LmNzcy5pbnB1dCA6IHd3dy5jc3MuaW5wdXRXaXRoTm9IaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC53cmFwKCR3cmFwcGVyKS5wYXJlbnQoKS5wcmVwZW5kKGRlZmF1bHRIaW50ID8gJGhpbnQgOiBudWxsKS5hcHBlbmQoZGVmYXVsdE1lbnUgPyAkbWVudSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE1lbnVDb25zdHJ1Y3RvciA9IGRlZmF1bHRNZW51ID8gRGVmYXVsdE1lbnUgOiBNZW51O1xuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJGlucHV0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IG5ldyBJbnB1dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50OiAkaGludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAkaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG5ldyBNZW51Q29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogJG1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogZGF0YXNldHNcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkID0gbmV3IFR5cGVhaGVhZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51OiBtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiBvLm1pbkxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLnd3dywgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy50eXBlYWhlYWQsIHR5cGVhaGVhZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbmFibGVkO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZCA9IHQuaXNFbmFibGVkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdC5pc0FjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcGVuO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA9IHQuaXNPcGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wZW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZSwgJGVsID0gJChlbCk7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5zZWxlY3QoJGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IGZ1bmN0aW9uIGF1dG9jb21wbGV0ZShlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2UsICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQuYXV0b2NvbXBsZXRlKCRlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvZShkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5tb3ZlQ3Vyc29yKGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWw6IGZ1bmN0aW9uIHZhbChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdC5nZXRWYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5zZXRWYWwobmV3VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0eXBlYWhlYWQsICRpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnQoJGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbi50eXBlYWhlYWQgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbi50eXBlYWhlYWQubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgICAgICAkLmZuLnR5cGVhaGVhZCA9IG9sZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB0dEVhY2goJGVscywgZm4pIHtcbiAgICAgICAgICAgICRlbHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgdHlwZWFoZWFkO1xuICAgICAgICAgICAgICAgICh0eXBlYWhlYWQgPSAkaW5wdXQuZGF0YShrZXlzLnR5cGVhaGVhZCkpICYmIGZuKHR5cGVhaGVhZCwgJGlucHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkSGludEZyb21JbnB1dCgkaW5wdXQsIHd3dykge1xuICAgICAgICAgICAgcmV0dXJuICRpbnB1dC5jbG9uZSgpLmFkZENsYXNzKHd3dy5jbGFzc2VzLmhpbnQpLnJlbW92ZURhdGEoKS5jc3Mod3d3LmNzcy5oaW50KS5jc3MoZ2V0QmFja2dyb3VuZFN0eWxlcygkaW5wdXQpKS5wcm9wKFwicmVhZG9ubHlcIiwgdHJ1ZSkucmVtb3ZlQXR0cihcImlkIG5hbWUgcGxhY2Vob2xkZXIgcmVxdWlyZWRcIikuYXR0cih7XG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXBJbnB1dCgkaW5wdXQsIHd3dykge1xuICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy5hdHRycywge1xuICAgICAgICAgICAgICAgIGRpcjogJGlucHV0LmF0dHIoXCJkaXJcIiksXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiAkaW5wdXQuYXR0cihcImF1dG9jb21wbGV0ZVwiKSxcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiAkaW5wdXQuYXR0cihcInNwZWxsY2hlY2tcIiksXG4gICAgICAgICAgICAgICAgc3R5bGU6ICRpbnB1dC5hdHRyKFwic3R5bGVcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKHd3dy5jbGFzc2VzLmlucHV0KS5hdHRyKHtcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IFwib2ZmXCIsXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAhJGlucHV0LmF0dHIoXCJkaXJcIikgJiYgJGlucHV0LmF0dHIoXCJkaXJcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0QmFja2dyb3VuZFN0eWxlcygkZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF0dGFjaG1lbnQ6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWF0dGFjaG1lbnRcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENsaXA6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWNsaXBcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRPcmlnaW46ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLW9yaWdpblwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJGVsLmNzcyhcImJhY2tncm91bmQtc2l6ZVwiKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXZlcnQoJGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgd3d3LCAkd3JhcHBlcjtcbiAgICAgICAgICAgIHd3dyA9ICRpbnB1dC5kYXRhKGtleXMud3d3KTtcbiAgICAgICAgICAgICR3cmFwcGVyID0gJGlucHV0LnBhcmVudCgpLmZpbHRlcih3d3cuc2VsZWN0b3JzLndyYXBwZXIpO1xuICAgICAgICAgICAgXy5lYWNoKCRpbnB1dC5kYXRhKGtleXMuYXR0cnMpLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgICAgICAgICAgIF8uaXNVbmRlZmluZWQodmFsKSA/ICRpbnB1dC5yZW1vdmVBdHRyKGtleSkgOiAkaW5wdXQuYXR0cihrZXksIHZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5yZW1vdmVEYXRhKGtleXMudHlwZWFoZWFkKS5yZW1vdmVEYXRhKGtleXMud3d3KS5yZW1vdmVEYXRhKGtleXMuYXR0cikucmVtb3ZlQ2xhc3Mod3d3LmNsYXNzZXMuaW5wdXQpO1xuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRpbnB1dC5kZXRhY2goKS5pbnNlcnRBZnRlcigkd3JhcHBlcik7XG4gICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gJGVsT3JOdWxsKG9iaikge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQsICRlbDtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBfLmlzSlF1ZXJ5KG9iaikgfHwgXy5pc0VsZW1lbnQob2JqKTtcbiAgICAgICAgICAgICRlbCA9IGlzVmFsaWQgPyAkKG9iaikuZmlyc3QoKSA6IFtdO1xuICAgICAgICAgICAgcmV0dXJuICRlbC5sZW5ndGggPyAkZWwgOiBudWxsO1xuICAgICAgICB9XG4gICAgfSkoKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAY29tcG9uZW50cy9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IFJlZGlyZWN0T3B0aW9uTWFuYWdlciBmcm9tICdAcGFnZXMvY2F0ZWdvcnkvZWRpdC9tYW5hZ2VyL3JlZGlyZWN0LW9wdGlvbi1tYW5hZ2VyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBSZWRpcmVjdE9wdGlvbk1hbmFnZXIoRXZlbnRFbWl0dGVyKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==