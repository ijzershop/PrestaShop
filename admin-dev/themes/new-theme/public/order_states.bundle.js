/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./js/pages/order-states/index.ts ***!
  \****************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

$(() => {
  const orderStatesGrid = new window.prestashop.component.Grid("order_states");
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  orderStatesGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  const orderReturnStatusesGrid = new window.prestashop.component.Grid("order_return_states");
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  orderReturnStatusesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
});

})();

window.order_states = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJfc3RhdGVzLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7O0FDdkJBLENBQUMsQ0FBQyxNQUFNO0FBQ04sUUFBTSxrQkFBa0IsSUFBSSxPQUFPLFdBQVcsVUFBVSxLQUFLLGNBQWM7QUFFM0Usa0JBQWdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHNCQUFzQixDQUFDO0FBQ25HLGtCQUFnQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0MsQ0FBQztBQUNqSCxrQkFBZ0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsaUJBQWlCLENBQUM7QUFDOUYsa0JBQWdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQ3pHLGtCQUFnQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQkFBb0IsQ0FBQztBQUNqRyxrQkFBZ0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDekcsa0JBQWdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQ3ZHLGtCQUFnQixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUN2RyxrQkFBZ0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUseUJBQXlCLENBQUM7QUFDdEcsa0JBQWdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHdCQUF3QixDQUFDO0FBRXJHLFFBQU0sMEJBQTBCLElBQUksT0FBTyxXQUFXLFVBQVUsS0FBSyxxQkFBcUI7QUFFMUYsMEJBQXdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHNCQUFzQixDQUFDO0FBQzNHLDBCQUF3QixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0MsQ0FBQztBQUN6SCwwQkFBd0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsaUJBQWlCLENBQUM7QUFDdEcsMEJBQXdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQ2pILDBCQUF3QixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQkFBb0IsQ0FBQztBQUN6RywwQkFBd0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDakgsMEJBQXdCLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQy9HLDBCQUF3QixhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUMvRywwQkFBd0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUseUJBQXlCLENBQUM7QUFDaEgsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXItc3RhdGVzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBvcmRlclN0YXRlc0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ29yZGVyX3N0YXRlcycpO1xyXG5cclxuICBvcmRlclN0YXRlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyU3RhdGVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuICBvcmRlclN0YXRlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBvcmRlclN0YXRlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyU3RhdGVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyU3RhdGVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJTdGF0ZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJTdGF0ZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJTdGF0ZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBvcmRlclN0YXRlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQ29sdW1uVG9nZ2xpbmdFeHRlbnNpb24oKSk7XHJcblxyXG4gIGNvbnN0IG9yZGVyUmV0dXJuU3RhdHVzZXNHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdvcmRlcl9yZXR1cm5fc3RhdGVzJyk7XHJcblxyXG4gIG9yZGVyUmV0dXJuU3RhdHVzZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICBvcmRlclJldHVyblN0YXR1c2VzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuICBvcmRlclJldHVyblN0YXR1c2VzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyUmV0dXJuU3RhdHVzZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbigpKTtcclxuICBvcmRlclJldHVyblN0YXR1c2VzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyUmV0dXJuU3RhdHVzZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICBvcmRlclJldHVyblN0YXR1c2VzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRHcmlkQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIG9yZGVyUmV0dXJuU3RhdHVzZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgb3JkZXJSZXR1cm5TdGF0dXNlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9