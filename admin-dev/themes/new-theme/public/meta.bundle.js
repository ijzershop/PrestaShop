/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/showcase-card/extension/showcase-card-close-extension.ts"
/*!********************************************************************************!*\
  !*** ./js/components/showcase-card/extension/showcase-card-close-extension.ts ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCardCloseExtension)
/* harmony export */ });

const { $ } = window;
class ShowcaseCardCloseExtension {
  /**
   * Extend helper block.
   *
   * @param {ShowcaseCard} helperBlock
   */
  extend(helperBlock) {
    const container = helperBlock.getContainer();
    container.on("click", ".js-remove-helper-block", (evt) => {
      container.remove();
      const $btn = $(evt.target);
      const url = $btn.data("closeUrl");
      const cardName = $btn.data("cardName");
      if (url) {
        $.post(url, {
          close: 1,
          name: cardName
        });
      }
    });
  }
}


/***/ },

/***/ "./js/components/showcase-card/showcase-card.ts"
/*!******************************************************!*\
  !*** ./js/components/showcase-card/showcase-card.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCard)
/* harmony export */ });

const { $ } = window;
class ShowcaseCard {
  /**
   * Showcase card id.
   *
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.$container = $(`#${this.id}`);
  }
  /**
   * Get showcase card container.
   *
   * @returns {jQuery}
   */
  getContainer() {
    return this.$container;
  }
  /**
   * Extend showcase card with external extensions.
   *
   * @param {object} extension
   */
  addExtension(extension) {
    extension.extend(this);
  }
}


/***/ },

/***/ "./js/pages/meta/meta-page-name-option-handler.ts"
/*!********************************************************!*\
  !*** ./js/pages/meta/meta-page-name-option-handler.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MetaPageNameOptionHandler)
/* harmony export */ });

const { $ } = window;
class MetaPageNameOptionHandler {
  constructor() {
    const pageNameSelector = ".js-meta-page-name";
    const currentPage = $(pageNameSelector).val();
    this.setUrlRewriteDisabledStatusByCurrentPage(currentPage);
    $(document).on(
      "change",
      pageNameSelector,
      (event) => this.changePageNameEvent(event)
    );
  }
  /**
   * An event which is being called after the selector is being updated.
   * @param {object} event
   * @private
   */
  changePageNameEvent(event) {
    const $this = $(event.currentTarget);
    const currentPage = $this.val();
    this.setUrlRewriteDisabledStatusByCurrentPage(currentPage);
  }
  /**
   * Sets url rewrite form field to disabled or enabled according to current page value.
   * @param {string} currentPage
   * @private
   */
  setUrlRewriteDisabledStatusByCurrentPage(currentPage) {
    $(".js-url-rewrite input").prop("disabled", currentPage === "index");
  }
}


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
/*!********************************!*\
  !*** ./js/pages/meta/index.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/showcase-card/showcase-card */ "./js/components/showcase-card/showcase-card.ts");
/* harmony import */ var _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/showcase-card/extension/showcase-card-close-extension */ "./js/components/showcase-card/extension/showcase-card-close-extension.ts");
/* harmony import */ var _pages_meta_meta_page_name_option_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/meta/meta-page-name-option-handler */ "./js/pages/meta/meta-page-name-option-handler.ts");




const { $ } = window;
$(() => {
  const meta = new window.prestashop.component.Grid("meta");
  meta.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  meta.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  const helperBlock = new _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_0__["default"]("seo-urls-showcase-card");
  helperBlock.addExtension(new _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_1__["default"]());
  new window.prestashop.component.TaggableField({
    tokenFieldSelector: "input.js-taggable-field",
    options: {
      createTokensOnBlur: true
    }
  });
  new _pages_meta_meta_page_name_option_handler__WEBPACK_IMPORTED_MODULE_2__["default"]();
  window.prestashop.component.initComponents(
    [
      "MultistoreConfigField",
      "TranslatableInput",
      "TextWithRecommendedLengthCounter"
    ]
  );
});

})();

window.meta = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFBVSxlQUFlLHNCQUFzQixDQUFDO0FBQ3hGLE9BQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsaUJBQWlCLENBQUM7QUFDbkYsT0FBSyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx1QkFBdUIsQ0FBQztBQUN6RixPQUFLLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQzVGLE9BQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsMEJBQTBCLENBQUM7QUFDNUYsT0FBSyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx5QkFBeUIsQ0FBQztBQUMzRixPQUFLLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQzlGLE9BQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0NBQW9DLENBQUM7QUFFdEcsUUFBTSxjQUFjLElBQUksK0VBQVksQ0FBQyx3QkFBd0I7QUFDN0QsY0FBWSxhQUFhLElBQUkseUdBQTBCLENBQUMsQ0FBQztBQUV6RCxNQUFJLE9BQU8sV0FBVyxVQUFVLGNBQWM7QUFBQSxJQUM1QyxvQkFBb0I7QUFBQSxJQUNwQixTQUFTO0FBQUEsTUFDUCxvQkFBb0I7QUFBQSxJQUN0QjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksaUZBQXlCLENBQUM7QUFFOUIsU0FBTyxXQUFXLFVBQVU7QUFBQSxJQUMxQjtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9leHRlbnNpb24vc2hvd2Nhc2UtY2FyZC1jbG9zZS1leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL3Nob3djYXNlLWNhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvbWV0YS9tZXRhLXBhZ2UtbmFtZS1vcHRpb24taGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tZXRhL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCB7U2hvd2Nhc2VDYXJkfSBmcm9tICdAUFNUeXBlcy9zaG93Y2FzZSc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24gaXMgcmVzcG9uc2libGUgZm9yIHByb3ZpZGluZyBoZWxwZXIgYmxvY2sgY2xvc2luZyBiZWhhdmlvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBoZWxwZXIgYmxvY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1Nob3djYXNlQ2FyZH0gaGVscGVyQmxvY2tcclxuICAgKi9cclxuICBleHRlbmQoaGVscGVyQmxvY2s6IFNob3djYXNlQ2FyZCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gaGVscGVyQmxvY2suZ2V0Q29udGFpbmVyKCk7XHJcbiAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy5qcy1yZW1vdmUtaGVscGVyLWJsb2NrJywgKGV2dDogSlF1ZXJ5LkNsaWNrRXZlbnQpID0+IHtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZ0LnRhcmdldCk7XHJcbiAgICAgIGNvbnN0IHVybCA9ICRidG4uZGF0YSgnY2xvc2VVcmwnKTtcclxuICAgICAgY29uc3QgY2FyZE5hbWUgPSAkYnRuLmRhdGEoJ2NhcmROYW1lJyk7XHJcblxyXG4gICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgLy8gbm90aWZ5IHRoZSBjYXJkIHdhcyBjbG9zZWRcclxuICAgICAgICAkLnBvc3QodXJsLCB7XHJcbiAgICAgICAgICBjbG9zZTogMSxcclxuICAgICAgICAgIG5hbWU6IGNhcmROYW1lLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IHtTaG93Y2FzZUV4dGVuc2lvbn0gZnJvbSAnQFBTVHlwZXMvc2hvd2Nhc2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFNob3djYXNlQ2FyZCBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgZXZlbnRzIHJlbGF0ZWQgd2l0aCBzaG93Y2FzZSBjYXJkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd2Nhc2VDYXJkIHtcclxuICBpZDogc3RyaW5nO1xyXG5cclxuICAkY29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3djYXNlIGNhcmQgaWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLiRjb250YWluZXIgPSAkKGAjJHt0aGlzLmlkfWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNob3djYXNlIGNhcmQgY29udGFpbmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2pRdWVyeX1cclxuICAgKi9cclxuICBnZXRDb250YWluZXIoKTogSlF1ZXJ5IHtcclxuICAgIHJldHVybiB0aGlzLiRjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRlbmQgc2hvd2Nhc2UgY2FyZCB3aXRoIGV4dGVybmFsIGV4dGVuc2lvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZXh0ZW5zaW9uXHJcbiAgICovXHJcbiAgYWRkRXh0ZW5zaW9uKGV4dGVuc2lvbjogU2hvd2Nhc2VFeHRlbnNpb24pOiB2b2lkIHtcclxuICAgIGV4dGVuc2lvbi5leHRlbmQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgTWV0YVBhZ2VOYW1lT3B0aW9uSGFuZGxlciBpcyByZXNwb25zaWJsZSBmb3IgY2hlY2tpbmcgdGhlIGluZGV4IHBhZ2UgY29uZGl0aW9uIC0gaWYgaW5kZXggcGFnZSBpcyBzZWxlY3RlZCBpdFxyXG4gKiBkb2VzIG5vdCBhbGxvdyB0byBlbnRlciB1cmwgcmV3cml0ZSBmaWVsZCBieSBkaXNhYmxpbmcgdGhhdCBpbnB1dC4gSW4gYW5vdGhlciBjYXNlcyB1cmwgcmV3cml0ZSBmaWVsZCBpcyBtYW5kYXRvcnkgdG9cclxuICogZW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRhUGFnZU5hbWVPcHRpb25IYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnN0IHBhZ2VOYW1lU2VsZWN0b3IgPSAnLmpzLW1ldGEtcGFnZS1uYW1lJztcclxuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gJChwYWdlTmFtZVNlbGVjdG9yKS52YWwoKTtcclxuICAgIHRoaXMuc2V0VXJsUmV3cml0ZURpc2FibGVkU3RhdHVzQnlDdXJyZW50UGFnZSg8c3RyaW5nPmN1cnJlbnRQYWdlKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgcGFnZU5hbWVTZWxlY3RvciwgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5jaGFuZ2VQYWdlTmFtZUV2ZW50KGV2ZW50KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCB3aGljaCBpcyBiZWluZyBjYWxsZWQgYWZ0ZXIgdGhlIHNlbGVjdG9yIGlzIGJlaW5nIHVwZGF0ZWQuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGNoYW5nZVBhZ2VOYW1lRXZlbnQoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCAkdGhpcyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9ICR0aGlzLnZhbCgpO1xyXG5cclxuICAgIHRoaXMuc2V0VXJsUmV3cml0ZURpc2FibGVkU3RhdHVzQnlDdXJyZW50UGFnZSg8c3RyaW5nPmN1cnJlbnRQYWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdXJsIHJld3JpdGUgZm9ybSBmaWVsZCB0byBkaXNhYmxlZCBvciBlbmFibGVkIGFjY29yZGluZyB0byBjdXJyZW50IHBhZ2UgdmFsdWUuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRQYWdlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNldFVybFJld3JpdGVEaXNhYmxlZFN0YXR1c0J5Q3VycmVudFBhZ2UoY3VycmVudFBhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgJCgnLmpzLXVybC1yZXdyaXRlIGlucHV0JykucHJvcCgnZGlzYWJsZWQnLCBjdXJyZW50UGFnZSA9PT0gJ2luZGV4Jyk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFNob3djYXNlQ2FyZCBmcm9tICdAY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL3Nob3djYXNlLWNhcmQnO1xyXG5pbXBvcnQgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24gZnJvbSAnQGNvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9leHRlbnNpb24vc2hvd2Nhc2UtY2FyZC1jbG9zZS1leHRlbnNpb24nO1xyXG5pbXBvcnQgTWV0YVBhZ2VOYW1lT3B0aW9uSGFuZGxlciBmcm9tICdAcGFnZXMvbWV0YS9tZXRhLXBhZ2UtbmFtZS1vcHRpb24taGFuZGxlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBtZXRhID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdtZXRhJyk7XHJcbiAgbWV0YS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIG1ldGEuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIG1ldGEuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uKCkpO1xyXG4gIG1ldGEuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBtZXRhLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgbWV0YS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRHcmlkQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIG1ldGEuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBtZXRhLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBtZXRhLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICBtZXRhLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNTdWJtaXRCdXR0b25FbmFibGVyRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBoZWxwZXJCbG9jayA9IG5ldyBTaG93Y2FzZUNhcmQoJ3Nlby11cmxzLXNob3djYXNlLWNhcmQnKTtcclxuICBoZWxwZXJCbG9jay5hZGRFeHRlbnNpb24obmV3IFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LlRhZ2dhYmxlRmllbGQoe1xyXG4gICAgdG9rZW5GaWVsZFNlbGVjdG9yOiAnaW5wdXQuanMtdGFnZ2FibGUtZmllbGQnLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBjcmVhdGVUb2tlbnNPbkJsdXI6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBuZXcgTWV0YVBhZ2VOYW1lT3B0aW9uSGFuZGxlcigpO1xyXG5cclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoXHJcbiAgICBbXHJcbiAgICAgICdNdWx0aXN0b3JlQ29uZmlnRmllbGQnLFxyXG4gICAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgICAnVGV4dFdpdGhSZWNvbW1lbmRlZExlbmd0aENvdW50ZXInLFxyXG4gICAgXSxcclxuICApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9