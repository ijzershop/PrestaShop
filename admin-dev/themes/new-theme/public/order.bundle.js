/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/order/preview-products-toggler.ts"
/*!****************************************************!*\
  !*** ./js/pages/order/preview-products-toggler.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ previewProductsToggler)
/* harmony export */ });

const { $ } = window;
function previewProductsToggler($row) {
  toggleStockLocationColumn($row);
  $row.on("click", ".js-preview-more-products-btn", (event) => {
    event.preventDefault();
    const $btn = $(event.currentTarget);
    const $hiddenProducts = $btn.closest("tbody").find(".js-product-preview-more");
    $hiddenProducts.removeClass("d-none");
    $btn.closest("tr").remove();
    toggleStockLocationColumn($row);
  });
}
function toggleStockLocationColumn($container) {
  let showColumn = false;
  $(
    ".js-cell-product-stock-location",
    // eslint-disable-next-line
    $container.find("tr:not(.d-none)")
  ).filter("td").each(
    (index, element) => {
      if ($(element).html().trim() !== "") {
        showColumn = true;
        return false;
      }
    }
  );
  $(".js-cell-product-stock-location", $container).toggle(showColumn);
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
/*!*********************************!*\
  !*** ./js/pages/order/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_order_preview_products_toggler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/order/preview-products-toggler */ "./js/pages/order/preview-products-toggler.ts");


const { $ } = window;
$(() => {
  const orderGrid = new window.prestashop.component.Grid("order");
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.ModalFormSubmitExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.ChoiceExtension());
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.PreviewExtension(_pages_order_preview_products_toggler__WEBPACK_IMPORTED_MODULE_0__["default"], orderGrid));
  orderGrid.addExtension(new window.prestashop.component.GridExtensions.BulkOpenTabsExtension());
});

})();

window.order = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ci9wcmV2aWV3LXByb2R1Y3RzLXRvZ2dsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGhpZGRlbiBwcm9kdWN0cyBpbiBvcmRlciBwcmV2aWV3IGJsb2NrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2pRdWVyeX0gJGdyaWRDb250YWluZXJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXZpZXdQcm9kdWN0c1RvZ2dsZXIoJHJvdzogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgdG9nZ2xlU3RvY2tMb2NhdGlvbkNvbHVtbigkcm93KTtcclxuICAkcm93Lm9uKCdjbGljaycsICcuanMtcHJldmlldy1tb3JlLXByb2R1Y3RzLWJ0bicsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCAkaGlkZGVuUHJvZHVjdHMgPSAkYnRuLmNsb3Nlc3QoJ3Rib2R5JykuZmluZCgnLmpzLXByb2R1Y3QtcHJldmlldy1tb3JlJyk7XHJcblxyXG4gICAgJGhpZGRlblByb2R1Y3RzLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICRidG4uY2xvc2VzdCgndHInKS5yZW1vdmUoKTtcclxuICAgIHRvZ2dsZVN0b2NrTG9jYXRpb25Db2x1bW4oJHJvdyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVN0b2NrTG9jYXRpb25Db2x1bW4oJGNvbnRhaW5lcjogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgbGV0IHNob3dDb2x1bW4gPSBmYWxzZTtcclxuICAkKFxyXG4gICAgJy5qcy1jZWxsLXByb2R1Y3Qtc3RvY2stbG9jYXRpb24nLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAkY29udGFpbmVyLmZpbmQoJ3RyOm5vdCguZC1ub25lKScpKS5maWx0ZXIoJ3RkJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgIGlmICgkKGVsZW1lbnQpLmh0bWwoKS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgIHNob3dDb2x1bW4gPSB0cnVlO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICApO1xyXG5cclxuICAkKCcuanMtY2VsbC1wcm9kdWN0LXN0b2NrLWxvY2F0aW9uJywgJGNvbnRhaW5lcikudG9nZ2xlKHNob3dDb2x1bW4pO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByZXZpZXdQcm9kdWN0c1RvZ2dsZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ByZXZpZXctcHJvZHVjdHMtdG9nZ2xlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBvcmRlckdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ29yZGVyJyk7XHJcbiAgb3JkZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbigpKTtcclxuICBvcmRlckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRHcmlkQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNTdWJtaXRCdXR0b25FbmFibGVyRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Nb2RhbEZvcm1TdWJtaXRFeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkNob2ljZUV4dGVuc2lvbigpKTtcclxuICBvcmRlckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUHJldmlld0V4dGVuc2lvbihwcmV2aWV3UHJvZHVjdHNUb2dnbGVyLCBvcmRlckdyaWQpKTtcclxuICBvcmRlckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa09wZW5UYWJzRXh0ZW5zaW9uKCkpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9