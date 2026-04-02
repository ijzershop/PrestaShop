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
/*!**************************************************!*\
  !*** ./js/components/form/form-popover-error.ts ***!
  \**************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

$(() => {
  $('[data-toggle="form-popover-error"]').popover({
    html: true,
    content() {
      return getErrorContent(this);
    }
  });
  const repositionPopover = (event) => {
    const $element = $(event.currentTarget);
    const $formGroup = $element.closest(".form-group");
    const $invalidFeedbackContainer = $formGroup.find(
      ".invalid-feedback-container"
    );
    const $errorPopover = $formGroup.find(".form-popover-error");
    const localeVisibleElementWidth = $invalidFeedbackContainer.width();
    $errorPopover.css("width", localeVisibleElementWidth);
    const horizontalDifference = getHorizontalDifference(
      $invalidFeedbackContainer,
      $errorPopover
    );
    $errorPopover.css("left", `${horizontalDifference}px`);
  };
  const getHorizontalDifference = ($invalidFeedbackContainer, $errorPopover) => {
    const invalidContainerOffset = $invalidFeedbackContainer.offset();
    const errorPopoverOffset = $errorPopover.offset();
    if (invalidContainerOffset && errorPopoverOffset) {
      const inputHorizontalPosition = invalidContainerOffset.left;
      const popoverHorizontalPosition = errorPopoverOffset.left;
      return inputHorizontalPosition - popoverHorizontalPosition;
    }
    return null;
  };
  const getErrorContent = (popoverTriggerElement) => {
    const popoverTriggerId = $(popoverTriggerElement).data("id");
    return $(`.js-popover-error-content[data-id="${popoverTriggerId}"]`).html();
  };
  $(document).on(
    "shown.bs.popover",
    '[data-toggle="form-popover-error"]',
    (event) => repositionPopover(event)
  );
});

})();

window.form_popover_error = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9wb3BvdmVyX2Vycm9yLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7O0FDbEJBLENBQUMsQ0FBQyxNQUFNO0FBRU4sR0FBQyxDQUFDLG9DQUFvQyxFQUFFLFFBQVE7QUFBQSxJQUM5QyxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQ1IsYUFBTyxnQkFBOEIsSUFBSTtBQUFBLElBQzNDO0FBQUEsRUFDRixDQUFDO0FBT0QsUUFBTSxvQkFBb0IsQ0FBQyxVQUE2QjtBQUN0RCxVQUFNLFdBQVcsQ0FBQyxDQUFDLE1BQU0sYUFBYTtBQUN0QyxVQUFNLGFBQWEsU0FBUyxRQUFRLGFBQWE7QUFDakQsVUFBTSw0QkFBNEIsV0FBVztBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUNBLFVBQU0sZ0JBQWdCLFdBQVcsS0FBSyxxQkFBcUI7QUFFM0QsVUFBTSw0QkFDSiwwQkFBMEIsTUFBTTtBQUdsQyxrQkFBYyxJQUFJLFNBQVMseUJBQXlCO0FBRXBELFVBQU0sdUJBQXVCO0FBQUEsTUFDM0I7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUVBLGtCQUFjLElBQUksUUFBUSxHQUFHLHdCQUF3QjtBQUFBLEVBQ3ZEO0FBUUEsUUFBTSwwQkFBMEIsQ0FDOUIsMkJBQ0Esa0JBQ2tCO0FBQ2xCLFVBQU0seUJBQXlCLDBCQUEwQixPQUFPO0FBQ2hFLFVBQU0scUJBQXFCLGNBQWMsT0FBTztBQUVoRCxRQUFJLDBCQUEwQixvQkFBb0I7QUFDaEQsWUFBTSwwQkFBMEIsdUJBQXVCO0FBQ3ZELFlBQU0sNEJBQTRCLG1CQUFtQjtBQUVyRCxhQUFPLDBCQUEwQjtBQUFBLElBQ25DO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFTQSxRQUFNLGtCQUFrQixDQUFDLDBCQUF1QztBQUM5RCxVQUFNLG1CQUFtQixDQUFDLENBQUMscUJBQXFCLEVBQUUsS0FBSyxJQUFJO0FBRTNELFdBQU8sQ0FBQyxDQUFDLHNDQUFzQyxvQkFBb0IsRUFBRSxLQUFLO0FBQUEsRUFDNUU7QUFHQSxHQUFDLENBQUMsUUFBUSxFQUFFO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBLENBQUMsVUFBNkIsa0JBQWtCLEtBQUs7QUFBQSxFQUN2RDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9mb3JtLXBvcG92ZXItZXJyb3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgZm9ybSBwb3BvdmVyIGVycm9ycyB3aXRoIG1vZGlmaWVkXHJcbiAqIHdpZHRoIHdoaWNoIGlzIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlXHJcbiAqIGZvcm0gZ3JvdXAgd2lkdGguXHJcbiAqL1xyXG4kKCgpID0+IHtcclxuICAvLyBsb2FkcyBmb3JtIHBvcG92ZXIgaW5zdGFuY2VcclxuICAkKCdbZGF0YS10b2dnbGU9XCJmb3JtLXBvcG92ZXItZXJyb3JcIl0nKS5wb3BvdmVyKHtcclxuICAgIGh0bWw6IHRydWUsXHJcbiAgICBjb250ZW50KCkge1xyXG4gICAgICByZXR1cm4gZ2V0RXJyb3JDb250ZW50KDxIVE1MRWxlbWVudD4gdGhpcyk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvKipcclxuICAgKiBSZWNhbGN1bGF0ZXMgcG9wb3ZlciBwb3NpdGlvbiBzbyBpdCBpcyBhbHdheXMgYWxpZ25lZCBob3Jpem9udGFsbHkgYW5kIHdpZHRoIGlzIGlkZW50aWNhbFxyXG4gICAqIHRvIHRoZSBjaGlsZCBlbGVtZW50cyBvZiB0aGUgZm9ybS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcclxuICAgKi9cclxuICBjb25zdCByZXBvc2l0aW9uUG9wb3ZlciA9IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgIGNvbnN0ICRlbGVtZW50ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0ICRmb3JtR3JvdXAgPSAkZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpO1xyXG4gICAgY29uc3QgJGludmFsaWRGZWVkYmFja0NvbnRhaW5lciA9ICRmb3JtR3JvdXAuZmluZChcclxuICAgICAgJy5pbnZhbGlkLWZlZWRiYWNrLWNvbnRhaW5lcicsXHJcbiAgICApO1xyXG4gICAgY29uc3QgJGVycm9yUG9wb3ZlciA9ICRmb3JtR3JvdXAuZmluZCgnLmZvcm0tcG9wb3Zlci1lcnJvcicpO1xyXG5cclxuICAgIGNvbnN0IGxvY2FsZVZpc2libGVFbGVtZW50V2lkdGg6IG51bWJlciA9IDxudW1iZXI+KFxyXG4gICAgICAkaW52YWxpZEZlZWRiYWNrQ29udGFpbmVyLndpZHRoKClcclxuICAgICk7XHJcblxyXG4gICAgJGVycm9yUG9wb3Zlci5jc3MoJ3dpZHRoJywgbG9jYWxlVmlzaWJsZUVsZW1lbnRXaWR0aCk7XHJcblxyXG4gICAgY29uc3QgaG9yaXpvbnRhbERpZmZlcmVuY2UgPSBnZXRIb3Jpem9udGFsRGlmZmVyZW5jZShcclxuICAgICAgJGludmFsaWRGZWVkYmFja0NvbnRhaW5lcixcclxuICAgICAgJGVycm9yUG9wb3ZlcixcclxuICAgICk7XHJcblxyXG4gICAgJGVycm9yUG9wb3Zlci5jc3MoJ2xlZnQnLCBgJHtob3Jpem9udGFsRGlmZmVyZW5jZX1weGApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldHMgaG9yaXpvbnRhbCBkaWZmZXJlbmNlIHdoaWNoIGhlbHBzIHRvIGFsaWduIHBvcG92ZXIgaG9yaXpvbnRhbGx5LlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkaW52YWxpZEZlZWRiYWNrQ29udGFpbmVyXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlcnJvclBvcG92ZXJcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGNvbnN0IGdldEhvcml6b250YWxEaWZmZXJlbmNlID0gKFxyXG4gICAgJGludmFsaWRGZWVkYmFja0NvbnRhaW5lcjogSlF1ZXJ5LFxyXG4gICAgJGVycm9yUG9wb3ZlcjogSlF1ZXJ5LFxyXG4gICk6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgaW52YWxpZENvbnRhaW5lck9mZnNldCA9ICRpbnZhbGlkRmVlZGJhY2tDb250YWluZXIub2Zmc2V0KCk7XHJcbiAgICBjb25zdCBlcnJvclBvcG92ZXJPZmZzZXQgPSAkZXJyb3JQb3BvdmVyLm9mZnNldCgpO1xyXG5cclxuICAgIGlmIChpbnZhbGlkQ29udGFpbmVyT2Zmc2V0ICYmIGVycm9yUG9wb3Zlck9mZnNldCkge1xyXG4gICAgICBjb25zdCBpbnB1dEhvcml6b250YWxQb3NpdGlvbiA9IGludmFsaWRDb250YWluZXJPZmZzZXQubGVmdDtcclxuICAgICAgY29uc3QgcG9wb3Zlckhvcml6b250YWxQb3NpdGlvbiA9IGVycm9yUG9wb3Zlck9mZnNldC5sZWZ0O1xyXG5cclxuICAgICAgcmV0dXJuIGlucHV0SG9yaXpvbnRhbFBvc2l0aW9uIC0gcG9wb3Zlckhvcml6b250YWxQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHBvcG92ZXIgZXJyb3IgY29udGVudCBwcmUtZmV0Y2hlZCBpbiBodG1sLlxyXG4gICAqIEl0IHVzZWQgdW5pcXVlIHNlbGVjdG9yIHRvIGlkZW50aWZ5IHdoaWNoIG9uZSBjb250ZW50IHRvIHJlbmRlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwb3BvdmVyVHJpZ2dlckVsZW1lbnRcclxuICAgKiBAcmV0dXJucyB7alF1ZXJ5fVxyXG4gICAqL1xyXG4gIGNvbnN0IGdldEVycm9yQ29udGVudCA9IChwb3BvdmVyVHJpZ2dlckVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCBwb3BvdmVyVHJpZ2dlcklkID0gJChwb3BvdmVyVHJpZ2dlckVsZW1lbnQpLmRhdGEoJ2lkJyk7XHJcblxyXG4gICAgcmV0dXJuICQoYC5qcy1wb3BvdmVyLWVycm9yLWNvbnRlbnRbZGF0YS1pZD1cIiR7cG9wb3ZlclRyaWdnZXJJZH1cIl1gKS5odG1sKCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gcmVnaXN0ZXJzIHRoZSBldmVudCB3aGljaCBkaXNwbGF5cyB0aGUgcG9wb3ZlclxyXG4gICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgJ3Nob3duLmJzLnBvcG92ZXInLFxyXG4gICAgJ1tkYXRhLXRvZ2dsZT1cImZvcm0tcG9wb3Zlci1lcnJvclwiXScsXHJcbiAgICAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiByZXBvc2l0aW9uUG9wb3ZlcihldmVudCksXHJcbiAgKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==