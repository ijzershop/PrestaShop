/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/components-map.ts":
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
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

/***/ "./js/components/form-submit-button.ts":
/*!*********************************************!*\
  !*** ./js/components/form-submit-button.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitButton)
/* harmony export */ });
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");

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
class FormSubmitButton {
  constructor() {
    $(document).on(
      "click",
      _components_map__WEBPACK_IMPORTED_MODULE_0__["default"].formSubmitButton,
      (event) => {
        event.preventDefault();
        const $btn = $(event.target);
        if ($btn.data("form-confirm-message") && window.confirm($btn.data("form-confirm-message")) === false) {
          return;
        }
        let method = "POST";
        let addInput = null;
        if ($btn.data("method")) {
          const btnMethod = $btn.data("method");
          const isGetOrPostMethod = ["GET", "POST"].includes(btnMethod);
          method = isGetOrPostMethod ? btnMethod : "POST";
          if (!isGetOrPostMethod) {
            addInput = $("<input>", {
              type: "_hidden",
              name: "_method",
              value: btnMethod
            });
          }
        }
        const $form = $("<form>", {
          action: $btn.data("form-submit-url"),
          method
        });
        if (addInput) {
          $form.append(addInput);
        }
        if ($btn.data("form-csrf-token")) {
          $form.append(
            $("<input>", {
              type: "_hidden",
              name: "_csrf_token",
              value: $btn.data("form-csrf-token")
            })
          );
        }
        $form.appendTo("body").submit();
      }
    );
  }
}


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
/*!************************************!*\
  !*** ./js/pages/security/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_submit_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form-submit-button */ "./js/components/form-submit-button.ts");

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
  const employeeSessionGrid = new window.prestashop.component.Grid("security_session_employee");
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  employeeSessionGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  const customerSessionsGrid = new window.prestashop.component.Grid("security_session_customer");
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  customerSessionsGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  new _components_form_submit_button__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.security = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCQSxpRUFBZTtBQUFBLEVBQ2Isb0JBQW9CO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLElBQ2hCLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWUsQ0FDYixVQUNBLFdBQ0EsV0FDVyxHQUFHLDJCQUEyQixhQUFhO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2Qsc0JBQXNCLENBQUMsY0FBOEIseUJBQXlCO0FBQUEsRUFDaEY7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCLFlBQVk7QUFBQSxJQUNWLGdCQUFnQixDQUFDLGFBQTZCLHdDQUF3QztBQUFBLElBQ3RGLFlBQVksQ0FBQyxhQUE2QixnQ0FBZ0M7QUFBQSxFQUM1RTtBQUFBLEVBQ0EsY0FBYyxDQUFDLFlBQTRCLElBQUk7QUFBQSxFQUMvQyxtQkFBbUI7QUFBQSxJQUNqQixXQUFXO0FBQUEsSUFDWCxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixnQkFBZ0IsQ0FBQyxtQkFBbUMsNEJBQTRCO0FBQUEsRUFDbEY7QUFBQSxFQUNBLG1CQUFtQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDJCQUEyQjtBQUFBLElBQzNCLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixjQUFjLENBQUMsYUFBNkIsNkNBQTZDO0FBQUEsSUFDekYsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4Qix1QkFBdUI7QUFBQSxJQUN2QixxQkFBcUI7QUFBQSxJQUNyQixnQ0FBZ0M7QUFBQSxFQUNsQztBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Ysd0JBQXdCO0FBQUEsRUFDeEIsb0JBQW9CO0FBQUEsRUFDcEIsV0FBVztBQUFBLEVBQ1gseUJBQXlCO0FBQUEsRUFDekIsaUNBQWlDO0FBQUEsRUFDakMsa0JBQWtCO0FBQUEsRUFDbEIsZ0JBQWdCO0FBQUEsRUFDaEIsa0JBQWtCO0FBQUEsRUFDbEIsZUFBZTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSx3QkFBd0I7QUFBQSxJQUN0QixPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsV0FBVztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNiLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLHdCQUF3QjtBQUFBLE1BQ3hCLHdCQUF3QjtBQUFBLE1BQ3hCLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLE1BQ3BCLG9CQUFvQixDQUFDLFdBQTJCLFlBQVk7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNWLGVBQWU7QUFBQSxFQUNqQjtBQUNGLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0IwQjtBQUUxQixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBNEJHLE1BQU0saUJBQWlCO0FBQUEsRUFDcEMsY0FBYztBQUNaLE1BQUUsUUFBUSxFQUFFO0FBQUEsTUFDVjtBQUFBLE1BQ0EsdURBQWEsQ0FBQztBQUFBLE1BQ2QsQ0FBQyxVQUE2QjtBQUM1QixjQUFNLGVBQWU7QUFFckIsY0FBTSxPQUFPLEVBQUUsTUFBTSxNQUFNO0FBRTNCLFlBQ0UsS0FBSyxLQUFLLHNCQUFzQixLQUM3QixPQUFPLFFBQVEsS0FBSyxLQUFLLHNCQUFzQixDQUFDLE1BQU0sT0FDekQ7QUFDQTtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFNBQVM7QUFDYixZQUFJLFdBQVc7QUFFZixZQUFJLEtBQUssS0FBSyxRQUFRLEdBQUc7QUFDdkIsZ0JBQU0sWUFBWSxLQUFLLEtBQUssUUFBUTtBQUNwQyxnQkFBTSxvQkFBb0IsQ0FBQyxPQUFPLE1BQU0sRUFBRSxTQUFTLFNBQVM7QUFDNUQsbUJBQVMsb0JBQW9CLFlBQVk7QUFFekMsY0FBSSxDQUFDLG1CQUFtQjtBQUN0Qix1QkFBVyxFQUFFLFdBQVc7QUFBQSxjQUN0QixNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsY0FDTixPQUFPO0FBQUEsWUFDVCxDQUFDO0FBQUEsVUFDSDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFFBQVEsRUFBRSxVQUFVO0FBQUEsVUFDeEIsUUFBUSxLQUFLLEtBQUssaUJBQWlCO0FBQUEsVUFDbkM7QUFBQSxRQUNGLENBQUM7QUFFRCxZQUFJLFVBQVU7QUFDWixnQkFBTSxPQUFPLFFBQVE7QUFBQSxRQUN2QjtBQUVBLFlBQUksS0FBSyxLQUFLLGlCQUFpQixHQUFHO0FBQ2hDLGdCQUFNO0FBQUEsWUFDSixFQUFFLFdBQVc7QUFBQSxjQUNYLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxjQUNOLE9BQU8sS0FBSyxLQUFLLGlCQUFpQjtBQUFBLFlBQ3BDLENBQUM7QUFBQSxVQUNIO0FBQUEsUUFDRjtBQUVBLGNBQU0sU0FBUyxNQUFNLEVBQUUsT0FBTztBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7Ozs7OztVQy9HQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCNkI7QUFFN0IsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLFFBQU0sc0JBQXNCLElBQUksT0FBTyxXQUFXLFVBQVUsS0FBSywyQkFBMkI7QUFFNUYsc0JBQW9CLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLG9CQUFvQixDQUFDO0FBQ3JHLHNCQUFvQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSw0QkFBNEIsQ0FBQztBQUM3RyxzQkFBb0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsc0JBQXNCLENBQUM7QUFDdkcsc0JBQW9CLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLGlCQUFpQixDQUFDO0FBQ2xHLHNCQUFvQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSw0QkFBNEIsQ0FBQztBQUM3RyxzQkFBb0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsMEJBQTBCLENBQUM7QUFDM0csc0JBQW9CLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQzNHLHNCQUFvQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx5QkFBeUIsQ0FBQztBQUMxRyxzQkFBb0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsdUJBQXVCLENBQUM7QUFDeEcsc0JBQW9CLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHdCQUF3QixDQUFDO0FBQ3pHLHNCQUFvQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0MsQ0FBQztBQUVySCxRQUFNLHVCQUF1QixJQUFJLE9BQU8sV0FBVyxVQUFVLEtBQUssMkJBQTJCO0FBRTdGLHVCQUFxQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQkFBb0IsQ0FBQztBQUN0Ryx1QkFBcUIsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDOUcsdUJBQXFCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHNCQUFzQixDQUFDO0FBQ3hHLHVCQUFxQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxpQkFBaUIsQ0FBQztBQUNuRyx1QkFBcUIsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDOUcsdUJBQXFCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQzVHLHVCQUFxQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUM1Ryx1QkFBcUIsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUseUJBQXlCLENBQUM7QUFDM0csdUJBQXFCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHVCQUF1QixDQUFDO0FBQ3pHLHVCQUFxQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx3QkFBd0IsQ0FBQztBQUMxRyx1QkFBcUIsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0NBQW9DLENBQUM7QUFFdEgsTUFBSSxzRUFBZ0IsQ0FBQztBQUN2QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0tc3VibWl0LWJ1dHRvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9zZWN1cml0eS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnLi9jb21wb25lbnRzLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHdoaWNoIGFsbG93cyBzdWJtaXR0aW5nIHZlcnkgc2ltcGxlIGZvcm1zIHdpdGhvdXQgaGF2aW5nIHRvIHVzZSA8Zm9ybT4gZWxlbWVudC5cclxuICpcclxuICogVXNlZnVsIHdoZW4gcGVyZm9ybWluZyBhY3Rpb25zIG9uIHJlc291cmNlIHdoZXJlIFVSTCBjb250YWlucyBhbGwgbmVlZGVkIGRhdGEuXHJcbiAqIEZvciBleGFtcGxlLCB0byB0b2dnbGUgY2F0ZWdvcnkgc3RhdHVzIHZpYSBcIlBPU1QgL2NhdGVnb3JpZXMvMi90b2dnbGUtc3RhdHVzKVwiXHJcbiAqIG9yIGRlbGV0ZSBjb3ZlciBpbWFnZSB2aWEgXCJQT1NUIC9jYXRlZ29yaWVzLzIvZGVsZXRlLWNvdmVyLWltYWdlXCIuXHJcbiAqXHJcbiAqIFVzYWdlIGV4YW1wbGUgaW4gdGVtcGxhdGU6XHJcbiAqXHJcbiAqIDxidXR0b24gY2xhc3M9XCJqcy1mb3JtLXN1Ym1pdC1idG5cIlxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1zdWJtaXQtdXJsPVwiL215LWN1c3RvbS11cmxcIiAgICAgICAgICAvLyAocmVxdWlyZWQpIFVSTCB0byB3aGljaCBmb3JtIHdpbGwgYmUgc3VibWl0dGVkXHJcbiAqICAgICAgICAgZGF0YS1tZXRob2Q9XCJHRVR8UE9TVHxERUxFVEV8UEFUQ0hcIiAgICAgICAgICAgIC8vIChvcHRpb25hbCkgc3BlY2lmeSB0aGUgdmVyYiB0byB1c2UgZm9yIHRoZSByZXF1ZXN0LlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUE9TVCBpcyB0YWtlbiBieSBkZWZhdWx0IGlmIG5vdCB2YWx1ZSBpcyBzZXRcclxuICogICAgICAgICBkYXRhLWZvcm0tY3NyZi10b2tlbj1cIm15LWdlbmVyYXRlZC1jc3JmLXRva2VuXCIgLy8gKG9wdGlvbmFsKSB0byBpbmNyZWFzZSBzZWN1cml0eVxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1jb25maXJtLW1lc3NhZ2U9XCJBcmUgeW91IHN1cmU/XCIgICAgICAvLyAob3B0aW9uYWwpIHRvIGNvbmZpcm0gYWN0aW9uIGJlZm9yZSBzdWJtaXRcclxuICogICAgICAgICB0eXBlPVwiYnV0dG9uXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0cyBzaW1wbGUgYnV0dG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXZvaWQgc3VibWl0dGluZyBhY3R1YWwgZm9ybVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBvdXIgYnV0dG9uIGlzIGRlZmluZWQgaW5zaWRlIGZvcm1cclxuICogPlxyXG4gKiAgICAgQ2xpY2sgbWUgdG8gc3VibWl0IGZvcm1cclxuICogPC9idXR0b24+XHJcbiAqXHJcbiAqIEluIHBhZ2Ugc3BlY2lmaWMgSlMgeW91IGhhdmUgdG8gZW5hYmxlIHRoaXMgZmVhdHVyZTpcclxuICpcclxuICogbmV3IEZvcm1TdWJtaXRCdXR0b24oKTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TdWJtaXRCdXR0b24ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIENvbXBvbmVudHNNYXAuZm9ybVN1Ym1pdEJ1dHRvbixcclxuICAgICAgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICRidG4uZGF0YSgnZm9ybS1jb25maXJtLW1lc3NhZ2UnKVxyXG4gICAgICAgICAgJiYgd2luZG93LmNvbmZpcm0oJGJ0bi5kYXRhKCdmb3JtLWNvbmZpcm0tbWVzc2FnZScpKSA9PT0gZmFsc2VcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCc7XHJcbiAgICAgICAgbGV0IGFkZElucHV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCRidG4uZGF0YSgnbWV0aG9kJykpIHtcclxuICAgICAgICAgIGNvbnN0IGJ0bk1ldGhvZCA9ICRidG4uZGF0YSgnbWV0aG9kJyk7XHJcbiAgICAgICAgICBjb25zdCBpc0dldE9yUG9zdE1ldGhvZCA9IFsnR0VUJywgJ1BPU1QnXS5pbmNsdWRlcyhidG5NZXRob2QpO1xyXG4gICAgICAgICAgbWV0aG9kID0gaXNHZXRPclBvc3RNZXRob2QgPyBidG5NZXRob2QgOiAnUE9TVCc7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc0dldE9yUG9zdE1ldGhvZCkge1xyXG4gICAgICAgICAgICBhZGRJbnB1dCA9ICQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ19oaWRkZW4nLFxyXG4gICAgICAgICAgICAgIG5hbWU6ICdfbWV0aG9kJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogYnRuTWV0aG9kLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnPGZvcm0+Jywge1xyXG4gICAgICAgICAgYWN0aW9uOiAkYnRuLmRhdGEoJ2Zvcm0tc3VibWl0LXVybCcpLFxyXG4gICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoYWRkSW5wdXQpIHtcclxuICAgICAgICAgICRmb3JtLmFwcGVuZChhZGRJbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGJ0bi5kYXRhKCdmb3JtLWNzcmYtdG9rZW4nKSkge1xyXG4gICAgICAgICAgJGZvcm0uYXBwZW5kKFxyXG4gICAgICAgICAgICAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdfaGlkZGVuJyxcclxuICAgICAgICAgICAgICBuYW1lOiAnX2NzcmZfdG9rZW4nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAkYnRuLmRhdGEoJ2Zvcm0tY3NyZi10b2tlbicpLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZm9ybS5hcHBlbmRUbygnYm9keScpLnN1Ym1pdCgpO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IEZvcm1TdWJtaXRCdXR0b24gZnJvbSAnQGNvbXBvbmVudHMvZm9ybS1zdWJtaXQtYnV0dG9uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0IGVtcGxveWVlU2Vzc2lvbkdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ3NlY3VyaXR5X3Nlc3Npb25fZW1wbG95ZWUnKTtcclxuXHJcbiAgZW1wbG95ZWVTZXNzaW9uR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlU2Vzc2lvbkdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlU2Vzc2lvbkdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlU2Vzc2lvbkdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBlbXBsb3llZVNlc3Npb25HcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICBlbXBsb3llZVNlc3Npb25HcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZW1wbG95ZWVTZXNzaW9uR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRHcmlkQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlU2Vzc2lvbkdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlU2Vzc2lvbkdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBlbXBsb3llZVNlc3Npb25HcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkNvbHVtblRvZ2dsaW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlU2Vzc2lvbkdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcblxyXG4gIGNvbnN0IGN1c3RvbWVyU2Vzc2lvbnNHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdzZWN1cml0eV9zZXNzaW9uX2N1c3RvbWVyJyk7XHJcblxyXG4gIGN1c3RvbWVyU2Vzc2lvbnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJTZXNzaW9uc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyU2Vzc2lvbnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lclNlc3Npb25zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyU2Vzc2lvbnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lclNlc3Npb25zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyU2Vzc2lvbnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJTZXNzaW9uc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyU2Vzc2lvbnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJTZXNzaW9uc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQ29sdW1uVG9nZ2xpbmdFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJTZXNzaW9uc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcblxyXG4gIG5ldyBGb3JtU3VibWl0QnV0dG9uKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=