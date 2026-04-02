/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/webservice/permissions-row-selector.ts"
/*!*********************************************************!*\
  !*** ./js/pages/webservice/permissions-row-selector.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PermissionsRowSelector)
/* harmony export */ });

const { $ } = window;
class PermissionsRowSelector {
  constructor() {
    $('input[id^="webservice_key_permissions_all"]').on(
      "change",
      (event) => {
        const $checkedBox = $(event.currentTarget);
        const isChecked = $checkedBox.is(":checked");
        $checkedBox.closest("tr").find(`input:not(input[id="${$checkedBox.attr("id")}"])`).each((i, input) => {
          $(input).prop("checked", isChecked);
        });
      }
    );
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
/*!**************************************!*\
  !*** ./js/pages/webservice/index.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _permissions_row_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permissions-row-selector */ "./js/pages/webservice/permissions-row-selector.ts");


const { $ } = window;
$(() => {
  const webserviceGrid = new window.prestashop.component.Grid("webservice_key");
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  webserviceGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  new window.prestashop.component.ChoiceTree("#webservice_key_shop_association").enableAutoCheckChildren();
  window.prestashop.component.initComponents(["MultipleChoiceTable", "GeneratableInput"]);
  window.prestashop.instance.generatableInput.attachOn(".js-generator-btn");
  new _permissions_row_selector__WEBPACK_IMPORTED_MODULE_0__["default"]();
  window.prestashop.component.initComponents(
    [
      "MultistoreConfigField"
    ]
  );
});

})();

window.webservice = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQU9HLE1BQU0sdUJBQXVCO0FBQUEsRUFDMUMsY0FBYztBQUVaLE1BQUUsNkNBQTZDLEVBQUU7QUFBQSxNQUMvQztBQUFBLE1BQ0EsQ0FBQyxVQUE2QjtBQUM1QixjQUFNLGNBQWMsRUFBRSxNQUFNLGFBQWE7QUFFekMsY0FBTSxZQUFZLFlBQVksR0FBRyxVQUFVO0FBRzNDLG9CQUNHLFFBQVEsSUFBSSxFQUNaLEtBQUssdUJBQXVCLFlBQVksS0FBSyxJQUFJLE1BQU0sRUFDdkQsS0FBSyxDQUFDLEdBQUcsVUFBVTtBQUNsQixZQUFFLEtBQUssRUFBRSxLQUFLLFdBQVcsU0FBUztBQUFBLFFBQ3BDLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7Ozs7OztVQ2hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNEbUM7QUFFbkMsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLFFBQU0saUJBQWlCLElBQUksT0FBTyxXQUFXLFVBQVUsS0FBSyxnQkFBZ0I7QUFFNUUsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0JBQW9CLENBQUM7QUFDaEcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDeEcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsc0JBQXNCLENBQUM7QUFDbEcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsd0JBQXdCLENBQUM7QUFDcEcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsaUJBQWlCLENBQUM7QUFDN0YsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsMEJBQTBCLENBQUM7QUFDdEcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUseUJBQXlCLENBQUM7QUFDckcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDeEcsaUJBQWUsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsdUJBQXVCLENBQUM7QUFHbkcsTUFBSSxPQUFPLFdBQVcsVUFBVSxXQUFXLGtDQUFrQyxFQUFFLHdCQUF3QjtBQUN2RyxTQUFPLFdBQVcsVUFBVSxlQUFlLENBQUMsdUJBQXVCLGtCQUFrQixDQUFDO0FBRXRGLFNBQU8sV0FBVyxTQUFTLGlCQUFpQixTQUFTLG1CQUFtQjtBQUV4RSxNQUFJLGlFQUFzQixDQUFDO0FBRTNCLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvd2Vic2VydmljZS9wZXJtaXNzaW9ucy1yb3ctc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvd2Vic2VydmljZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIEluIEFkZC9FZGl0IHBhZ2Ugb2YgV2Vic2VydmljZSBrZXkgdGhlcmUgaXMgcGVybWlzc2lvbnMgdGFibGUgaW5wdXQgKHBlcm1pc3NvbnMgYXMgY29sdW1ucyAvIHJlc291cmNlcyBhcyByb3dzKS5cclxuICogVGhlcmUgaXMgXCJBbGxcIiBjb2x1bW4gYW5kIG9uY2UgcmVzb3VyY2UgaXMgY2hlY2tlZCB1bmRlciB0aGlzIGNvbHVtblxyXG4gKiBldmVyeSBvdGhlciBwZXJtaXNzaW9uIGNvbHVtbiBzaG91bGQgYmUgYXV0by1zZWxlY3RlZCBmb3IgdGhhdCByZXNvdXJjZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcm1pc3Npb25zUm93U2VsZWN0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gd2hlbiBjaGVja2JveCBpbiBcIkFsbFwiIGNvbHVtbiBpcyBjaGVja2VkXHJcbiAgICAkKCdpbnB1dFtpZF49XCJ3ZWJzZXJ2aWNlX2tleV9wZXJtaXNzaW9uc19hbGxcIl0nKS5vbihcclxuICAgICAgJ2NoYW5nZScsXHJcbiAgICAgIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICBjb25zdCAkY2hlY2tlZEJveCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICRjaGVja2VkQm94LmlzKCc6Y2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCBpbiBzYW1lIHJvdyB3ZSBuZWVkIHRvIHRvZ2dsZSBpdHMgdmFsdWVcclxuICAgICAgICAkY2hlY2tlZEJveFxyXG4gICAgICAgICAgLmNsb3Nlc3QoJ3RyJylcclxuICAgICAgICAgIC5maW5kKGBpbnB1dDpub3QoaW5wdXRbaWQ9XCIkeyRjaGVja2VkQm94LmF0dHIoJ2lkJyl9XCJdKWApXHJcbiAgICAgICAgICAuZWFjaCgoaSwgaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgJChpbnB1dCkucHJvcCgnY2hlY2tlZCcsIGlzQ2hlY2tlZCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFBlcm1pc3Npb25zUm93U2VsZWN0b3IgZnJvbSAnLi9wZXJtaXNzaW9ucy1yb3ctc2VsZWN0b3InO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3Qgd2Vic2VydmljZUdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ3dlYnNlcnZpY2Vfa2V5Jyk7XHJcblxyXG4gIHdlYnNlcnZpY2VHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgd2Vic2VydmljZUdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIHdlYnNlcnZpY2VHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICB3ZWJzZXJ2aWNlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Db2x1bW5Ub2dnbGluZ0V4dGVuc2lvbigpKTtcclxuICB3ZWJzZXJ2aWNlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIHdlYnNlcnZpY2VHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgd2Vic2VydmljZUdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIHdlYnNlcnZpY2VHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICB3ZWJzZXJ2aWNlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICAvLyBuZWVkZWQgZm9yIHNob3AgYXNzb2NpYXRpb24gaW5wdXQgaW4gZm9ybVxyXG4gIG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuQ2hvaWNlVHJlZSgnI3dlYnNlcnZpY2Vfa2V5X3Nob3BfYXNzb2NpYXRpb24nKS5lbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpO1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhbJ011bHRpcGxlQ2hvaWNlVGFibGUnLCAnR2VuZXJhdGFibGVJbnB1dCddKTtcclxuICAvLyBuZWVkZWQgZm9yIGtleSBpbnB1dCBpbiBmb3JtXHJcbiAgd2luZG93LnByZXN0YXNob3AuaW5zdGFuY2UuZ2VuZXJhdGFibGVJbnB1dC5hdHRhY2hPbignLmpzLWdlbmVyYXRvci1idG4nKTtcclxuXHJcbiAgbmV3IFBlcm1pc3Npb25zUm93U2VsZWN0b3IoKTtcclxuXHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFxyXG4gICAgW1xyXG4gICAgICAnTXVsdGlzdG9yZUNvbmZpZ0ZpZWxkJyxcclxuICAgIF0sXHJcbiAgKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==