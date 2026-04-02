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
/*!**************************************!*\
  !*** ./js/pages/attachment/index.ts ***!
  \**************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

$(() => {
  const attachmentGrid = new window.prestashop.component.Grid("attachment");
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  attachmentGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
});

})();

window.attachment = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7OztBQ3ZCQSxDQUFDLENBQUMsTUFBTTtBQUNOLFFBQU0saUJBQWlCLElBQUksT0FBTyxXQUFXLFVBQVUsS0FBSyxZQUFZO0FBRXhFLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHNCQUFzQixDQUFDO0FBQ2xHLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLGlCQUFpQixDQUFDO0FBQzdGLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQ3hHLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLG9CQUFvQixDQUFDO0FBQ2hHLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQ3hHLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQ3RHLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHlCQUF5QixDQUFDO0FBQ3JHLGlCQUFlLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHVCQUF1QixDQUFDO0FBRW5HLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9hdHRhY2htZW50L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBhdHRhY2htZW50R3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnYXR0YWNobWVudCcpO1xyXG5cclxuICBhdHRhY2htZW50R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgYXR0YWNobWVudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBhdHRhY2htZW50R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgYXR0YWNobWVudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICBhdHRhY2htZW50R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgYXR0YWNobWVudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBhdHRhY2htZW50R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgYXR0YWNobWVudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFxyXG4gICAgW1xyXG4gICAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgXSxcclxuICApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9