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

/***/ "./js/components/text-to-link-rewrite-copier.ts"
/*!******************************************************!*\
  !*** ./js/components/text-to-link-rewrite-copier.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const { $ } = window;
const textToLinkRewriteCopier = ({
  sourceElementSelector,
  destinationElementSelector,
  options = { eventName: "input" }
}) => {
  $(document).on(options.eventName, `${sourceElementSelector}`, (event) => {
    if (!$(event.currentTarget).closest("form").data("id")) {
      $(destinationElementSelector).val(
        window.str2url($(event.currentTarget).val(), "UTF-8")
      );
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (textToLinkRewriteCopier);


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
/*!************************************!*\
  !*** ./js/pages/cms-page/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_text_to_link_rewrite_copier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/text-to-link-rewrite-copier */ "./js/components/text-to-link-rewrite-copier.ts");
/* harmony import */ var _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/showcase-card/showcase-card */ "./js/components/showcase-card/showcase-card.ts");
/* harmony import */ var _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/showcase-card/extension/showcase-card-close-extension */ "./js/components/showcase-card/extension/showcase-card-close-extension.ts");




const { $ } = window;
$(() => {
  const cmsCategory = new window.prestashop.component.Grid("cms_page_category");
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.PositionExtension(cmsCategory));
  cmsCategory.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
  const translatorInput = window.prestashop.instance.translatableInput;
  (0,_components_text_to_link_rewrite_copier__WEBPACK_IMPORTED_MODULE_0__["default"])({
    sourceElementSelector: 'input[name^="cms_page_category[name]"]',
    /* eslint-disable-next-line max-len */
    destinationElementSelector: `${translatorInput.localeInputSelector}:not(.d-none) input[name^="cms_page_category[friendly_url]"]`
  });
  new window.prestashop.component.ChoiceTree("#cms_page_category_parent_category");
  const shopChoiceTree = new window.prestashop.component.ChoiceTree("#cms_page_category_shop_association");
  shopChoiceTree.enableAutoCheckChildren();
  const cmsGrid = new window.prestashop.component.Grid("cms_page");
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.PositionExtension(cmsGrid));
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  cmsGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  const helperBlock = new _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_1__["default"]("cms-pages-showcase-card");
  helperBlock.addExtension(new _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_2__["default"]());
});

})();

window.cms_page = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixVQUFRLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHdCQUF3QixDQUFDO0FBQzdGLFVBQVEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDakcsVUFBUSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUMvRixVQUFRLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHlCQUF5QixDQUFDO0FBQzlGLFVBQVEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsa0JBQWtCLE9BQU8sQ0FBQztBQUM5RixVQUFRLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLG9DQUFvQyxDQUFDO0FBQ3pHLFVBQVEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsdUJBQXVCLENBQUM7QUFFNUYsUUFBTSxjQUFjLElBQUksK0VBQVksQ0FBQyx5QkFBeUI7QUFDOUQsY0FBWSxhQUFhLElBQUkseUdBQTBCLENBQUMsQ0FBQztBQUMzRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL2V4dGVuc2lvbi9zaG93Y2FzZS1jYXJkLWNsb3NlLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3Nob3djYXNlLWNhcmQvc2hvd2Nhc2UtY2FyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3RleHQtdG8tbGluay1yZXdyaXRlLWNvcGllci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jbXMtcGFnZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge1Nob3djYXNlQ2FyZH0gZnJvbSAnQFBTVHlwZXMvc2hvd2Nhc2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uIGlzIHJlc3BvbnNpYmxlIGZvciBwcm92aWRpbmcgaGVscGVyIGJsb2NrIGNsb3NpbmcgYmVoYXZpb3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgaGVscGVyIGJsb2NrLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTaG93Y2FzZUNhcmR9IGhlbHBlckJsb2NrXHJcbiAgICovXHJcbiAgZXh0ZW5kKGhlbHBlckJsb2NrOiBTaG93Y2FzZUNhcmQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGhlbHBlckJsb2NrLmdldENvbnRhaW5lcigpO1xyXG4gICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuanMtcmVtb3ZlLWhlbHBlci1ibG9jaycsIChldnQ6IEpRdWVyeS5DbGlja0V2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcclxuXHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2dC50YXJnZXQpO1xyXG4gICAgICBjb25zdCB1cmwgPSAkYnRuLmRhdGEoJ2Nsb3NlVXJsJyk7XHJcbiAgICAgIGNvbnN0IGNhcmROYW1lID0gJGJ0bi5kYXRhKCdjYXJkTmFtZScpO1xyXG5cclxuICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgIC8vIG5vdGlmeSB0aGUgY2FyZCB3YXMgY2xvc2VkXHJcbiAgICAgICAgJC5wb3N0KHVybCwge1xyXG4gICAgICAgICAgY2xvc2U6IDEsXHJcbiAgICAgICAgICBuYW1lOiBjYXJkTmFtZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCB7U2hvd2Nhc2VFeHRlbnNpb259IGZyb20gJ0BQU1R5cGVzL3Nob3djYXNlJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBTaG93Y2FzZUNhcmQgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIGV2ZW50cyByZWxhdGVkIHdpdGggc2hvd2Nhc2UgY2FyZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3djYXNlQ2FyZCB7XHJcbiAgaWQ6IHN0cmluZztcclxuXHJcbiAgJGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICAvKipcclxuICAgKiBTaG93Y2FzZSBjYXJkIGlkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy4kY29udGFpbmVyID0gJChgIyR7dGhpcy5pZH1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzaG93Y2FzZSBjYXJkIGNvbnRhaW5lci5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAgICovXHJcbiAgZ2V0Q29udGFpbmVyKCk6IEpRdWVyeSB7XHJcbiAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIHNob3djYXNlIGNhcmQgd2l0aCBleHRlcm5hbCBleHRlbnNpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGV4dGVuc2lvblxyXG4gICAqL1xyXG4gIGFkZEV4dGVuc2lvbihleHRlbnNpb246IFNob3djYXNlRXh0ZW5zaW9uKTogdm9pZCB7XHJcbiAgICBleHRlbnNpb24uZXh0ZW5kKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuaW50ZXJmYWNlIFRleHRUb0xpbmtQYXJhbXMge1xyXG4gIHNvdXJjZUVsZW1lbnRTZWxlY3Rvcjogc3RyaW5nO1xyXG4gIGRlc3RpbmF0aW9uRWxlbWVudFNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgd2hpY2ggYWxsb3dzIHRvIGNvcHkgcmVndWxhciB0ZXh0IHRvIHVybCBmcmllbmRseSB0ZXh0XHJcbiAqXHJcbiAqIFVzYWdlIGV4YW1wbGUgaW4gdGVtcGxhdGU6XHJcbiAqXHJcbiAqIDxpbnB1dCBuYW1lPVwic291cmNlLWlucHV0XCJcclxuICogICAgICAgIGNsYXNzPVwianMtbGluay1yZXdyaXRlLWNvcGllci1zb3VyY2VcIj4gLy8gVGhlIG9yaWdpbmFsIHRleHQgd2lsbCBiZSB0YWtlbiBmcm9tIHRoaXMgZWxlbWVudFxyXG4gKiA8aW5wdXQgbmFtZT1cImRlc3RpbmF0aW9uLWlucHV0XCJcclxuICogICAgICAgIGNsYXNzPVwianMtbGluay1yZXdyaXRlLWNvcGllci1kZXN0aW5hdGlvblwiPiAvLyBNb2RpZmllZCB0ZXh0IHdpbGwgYmUgYWRkZWQgdG8gdGhpcyBpbnB1dFxyXG4gKlxyXG4gKiBpbiBqYXZhc2NyaXB0OlxyXG4gKlxyXG4gKiB0ZXh0VG9MaW5rUmV3cml0ZUNvcGllcih7XHJcbiAqICAgc291cmNlRWxlbWVudFNlbGVjdG9yOiAnLmpzLWxpbmstcmV3cml0ZS1jb3BpZXItc291cmNlJ1xyXG4gKiAgIGRlc3RpbmF0aW9uRWxlbWVudFNlbGVjdG9yOiAnLmpzLWxpbmstcmV3cml0ZS1jb3BpZXItZGVzdGluYXRpb24nLFxyXG4gKiB9KTtcclxuICpcclxuICogSWYgdGhlIHNvdXJjZS1pbnB1dCBoYXMgdmFsdWUgXCJ0ZXN0IG5hbWVcIiB0aGUgbGluayByZXdyaXRlIHZhbHVlIHdpbGwgYmUgXCJ0ZXN0LW5hbWVcIi5cclxuICogSWYgdGhlIHNvdXJjZS1pbnB1dCBoYXMgdmFsdWUgXCJ0ZXN0IG5hbWUgIyRcIiBsaW5rIHJld3JpdGUgd2lsbCBiZSBcInRlc3QtbmFtZS1cIiBzaW5jZSAjJFxyXG4gKiBhcmUgdW4gYWxsb3dlZCBjaGFyYWN0ZXJzIGluIHVybC5cclxuICpcclxuICogWW91IGNhbiBhbHNvIHBhc3MgYWRkaXRpb25hbCBvcHRpb25zIHRvIGNoYW5nZSB0aGUgZXZlbnQgbmFtZSwgb3IgZW5jb2RpbmcgZm9ybWF0OlxyXG4gKlxyXG4gKiB0ZXh0VG9MaW5rUmV3cml0ZUNvcGllcih7XHJcbiAqICAgc291cmNlRWxlbWVudFNlbGVjdG9yOiAnLmpzLWxpbmstcmV3cml0ZS1jb3BpZXItc291cmNlJ1xyXG4gKiAgIGRlc3RpbmF0aW9uRWxlbWVudFNlbGVjdG9yOiAnLmpzLWxpbmstcmV3cml0ZS1jb3BpZXItZGVzdGluYXRpb24nLFxyXG4gKiAgIG9wdGlvbnM6IHtcclxuICogICAgIGV2ZW50TmFtZTogJ2NoYW5nZScsIC8vIGRlZmF1bHQgaXMgJ2lucHV0J1xyXG4gKiAgIH1cclxuICogfSk7XHJcbiAqXHJcbiAqL1xyXG5jb25zdCB0ZXh0VG9MaW5rUmV3cml0ZUNvcGllciA9ICh7XHJcbiAgc291cmNlRWxlbWVudFNlbGVjdG9yLFxyXG4gIGRlc3RpbmF0aW9uRWxlbWVudFNlbGVjdG9yLFxyXG4gIG9wdGlvbnMgPSB7ZXZlbnROYW1lOiAnaW5wdXQnfSxcclxufTogVGV4dFRvTGlua1BhcmFtcyk6IHZvaWQgPT4ge1xyXG4gICQoZG9jdW1lbnQpLm9uKG9wdGlvbnMuZXZlbnROYW1lLCBgJHtzb3VyY2VFbGVtZW50U2VsZWN0b3J9YCwgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoISQoZXZlbnQuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnZm9ybScpLmRhdGEoJ2lkJykpIHtcclxuICAgICAgJChkZXN0aW5hdGlvbkVsZW1lbnRTZWxlY3RvcikudmFsKFxyXG4gICAgICAgIHdpbmRvdy5zdHIydXJsKCQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCksICdVVEYtOCcpLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGV4dFRvTGlua1Jld3JpdGVDb3BpZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHRleHRUb0xpbmtSZXdyaXRlQ29waWVyIGZyb20gJ0Bjb21wb25lbnRzL3RleHQtdG8tbGluay1yZXdyaXRlLWNvcGllcic7XHJcbmltcG9ydCBTaG93Y2FzZUNhcmQgZnJvbSAnQGNvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9zaG93Y2FzZS1jYXJkJztcclxuaW1wb3J0IFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uIGZyb20gJ0Bjb21wb25lbnRzL3Nob3djYXNlLWNhcmQvZXh0ZW5zaW9uL3Nob3djYXNlLWNhcmQtY2xvc2UtZXh0ZW5zaW9uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0IGNtc0NhdGVnb3J5ID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdjbXNfcGFnZV9jYXRlZ29yeScpO1xyXG5cclxuICBjbXNDYXRlZ29yeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIGNtc0NhdGVnb3J5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbigpKTtcclxuICBjbXNDYXRlZ29yeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgY21zQ2F0ZWdvcnkuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBjbXNDYXRlZ29yeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGNtc0NhdGVnb3J5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY21zQ2F0ZWdvcnkuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGNtc0NhdGVnb3J5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjbXNDYXRlZ29yeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Db2x1bW5Ub2dnbGluZ0V4dGVuc2lvbigpKTtcclxuICBjbXNDYXRlZ29yeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Qb3NpdGlvbkV4dGVuc2lvbihjbXNDYXRlZ29yeSkpO1xyXG4gIGNtc0NhdGVnb3J5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNTdWJtaXRCdXR0b25FbmFibGVyRXh0ZW5zaW9uKCkpO1xyXG5cclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoXHJcbiAgICBbXHJcbiAgICAgICdUcmFuc2xhdGFibGVJbnB1dCcsXHJcbiAgICBdLFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRyYW5zbGF0b3JJbnB1dCA9IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlLnRyYW5zbGF0YWJsZUlucHV0O1xyXG5cclxuICB0ZXh0VG9MaW5rUmV3cml0ZUNvcGllcih7XHJcbiAgICBzb3VyY2VFbGVtZW50U2VsZWN0b3I6ICdpbnB1dFtuYW1lXj1cImNtc19wYWdlX2NhdGVnb3J5W25hbWVdXCJdJyxcclxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuICovXHJcbiAgICBkZXN0aW5hdGlvbkVsZW1lbnRTZWxlY3RvcjogYCR7dHJhbnNsYXRvcklucHV0LmxvY2FsZUlucHV0U2VsZWN0b3J9Om5vdCguZC1ub25lKSBpbnB1dFtuYW1lXj1cImNtc19wYWdlX2NhdGVnb3J5W2ZyaWVuZGx5X3VybF1cIl1gLFxyXG4gIH0pO1xyXG5cclxuICBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkNob2ljZVRyZWUoJyNjbXNfcGFnZV9jYXRlZ29yeV9wYXJlbnRfY2F0ZWdvcnknKTtcclxuXHJcbiAgY29uc3Qgc2hvcENob2ljZVRyZWUgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkNob2ljZVRyZWUoJyNjbXNfcGFnZV9jYXRlZ29yeV9zaG9wX2Fzc29jaWF0aW9uJyk7XHJcbiAgc2hvcENob2ljZVRyZWUuZW5hYmxlQXV0b0NoZWNrQ2hpbGRyZW4oKTtcclxuXHJcbiAgY29uc3QgY21zR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnY21zX3BhZ2UnKTtcclxuICBjbXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgY21zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgY21zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgY21zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGNtc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQ29sdW1uVG9nZ2xpbmdFeHRlbnNpb24oKSk7XHJcbiAgY21zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgY21zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGNtc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGNtc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUG9zaXRpb25FeHRlbnNpb24oY21zR3JpZCkpO1xyXG4gIGNtc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcbiAgY21zR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBoZWxwZXJCbG9jayA9IG5ldyBTaG93Y2FzZUNhcmQoJ2Ntcy1wYWdlcy1zaG93Y2FzZS1jYXJkJyk7XHJcbiAgaGVscGVyQmxvY2suYWRkRXh0ZW5zaW9uKG5ldyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbigpKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==