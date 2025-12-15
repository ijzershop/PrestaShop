/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./js/components/form/form-popover-error.ts ***!
  \**************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9wb3BvdmVyX2Vycm9yLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQThCQSxDQUFDLENBQUMsTUFBTTtBQUVOLEdBQUMsQ0FBQyxvQ0FBb0MsRUFBRSxRQUFRO0FBQUEsSUFDOUMsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUNSLGFBQU8sZ0JBQThCLElBQUk7QUFBQSxJQUMzQztBQUFBLEVBQ0YsQ0FBQztBQU9ELFFBQU0sb0JBQW9CLENBQUMsVUFBNkI7QUFDdEQsVUFBTSxXQUFXLENBQUMsQ0FBQyxNQUFNLGFBQWE7QUFDdEMsVUFBTSxhQUFhLFNBQVMsUUFBUSxhQUFhO0FBQ2pELFVBQU0sNEJBQTRCLFdBQVc7QUFBQSxNQUMzQztBQUFBLElBQ0Y7QUFDQSxVQUFNLGdCQUFnQixXQUFXLEtBQUsscUJBQXFCO0FBRTNELFVBQU0sNEJBQ0osMEJBQTBCLE1BQU07QUFHbEMsa0JBQWMsSUFBSSxTQUFTLHlCQUF5QjtBQUVwRCxVQUFNLHVCQUF1QjtBQUFBLE1BQzNCO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFFQSxrQkFBYyxJQUFJLFFBQVEsR0FBRyx3QkFBd0I7QUFBQSxFQUN2RDtBQVFBLFFBQU0sMEJBQTBCLENBQzlCLDJCQUNBLGtCQUNrQjtBQUNsQixVQUFNLHlCQUF5QiwwQkFBMEIsT0FBTztBQUNoRSxVQUFNLHFCQUFxQixjQUFjLE9BQU87QUFFaEQsUUFBSSwwQkFBMEIsb0JBQW9CO0FBQ2hELFlBQU0sMEJBQTBCLHVCQUF1QjtBQUN2RCxZQUFNLDRCQUE0QixtQkFBbUI7QUFFckQsYUFBTywwQkFBMEI7QUFBQSxJQUNuQztBQUVBLFdBQU87QUFBQSxFQUNUO0FBU0EsUUFBTSxrQkFBa0IsQ0FBQywwQkFBdUM7QUFDOUQsVUFBTSxtQkFBbUIsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLEtBQUssSUFBSTtBQUUzRCxXQUFPLENBQUMsQ0FBQyxzQ0FBc0Msb0JBQW9CLEVBQUUsS0FBSztBQUFBLEVBQzVFO0FBR0EsR0FBQyxDQUFDLFFBQVEsRUFBRTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQSxDQUFDLFVBQTZCLGtCQUFrQixLQUFLO0FBQUEsRUFDdkQ7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vZm9ybS1wb3BvdmVyLWVycm9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyBmb3JtIHBvcG92ZXIgZXJyb3JzIHdpdGggbW9kaWZpZWRcclxuICogd2lkdGggd2hpY2ggaXMgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGVcclxuICogZm9ybSBncm91cCB3aWR0aC5cclxuICovXHJcbiQoKCkgPT4ge1xyXG4gIC8vIGxvYWRzIGZvcm0gcG9wb3ZlciBpbnN0YW5jZVxyXG4gICQoJ1tkYXRhLXRvZ2dsZT1cImZvcm0tcG9wb3Zlci1lcnJvclwiXScpLnBvcG92ZXIoe1xyXG4gICAgaHRtbDogdHJ1ZSxcclxuICAgIGNvbnRlbnQoKSB7XHJcbiAgICAgIHJldHVybiBnZXRFcnJvckNvbnRlbnQoPEhUTUxFbGVtZW50PiB0aGlzKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2FsY3VsYXRlcyBwb3BvdmVyIHBvc2l0aW9uIHNvIGl0IGlzIGFsd2F5cyBhbGlnbmVkIGhvcml6b250YWxseSBhbmQgd2lkdGggaXMgaWRlbnRpY2FsXHJcbiAgICogdG8gdGhlIGNoaWxkIGVsZW1lbnRzIG9mIHRoZSBmb3JtLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG4gICAqL1xyXG4gIGNvbnN0IHJlcG9zaXRpb25Qb3BvdmVyID0gKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgY29uc3QgJGVsZW1lbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgY29uc3QgJGZvcm1Hcm91cCA9ICRlbGVtZW50LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJyk7XHJcbiAgICBjb25zdCAkaW52YWxpZEZlZWRiYWNrQ29udGFpbmVyID0gJGZvcm1Hcm91cC5maW5kKFxyXG4gICAgICAnLmludmFsaWQtZmVlZGJhY2stY29udGFpbmVyJyxcclxuICAgICk7XHJcbiAgICBjb25zdCAkZXJyb3JQb3BvdmVyID0gJGZvcm1Hcm91cC5maW5kKCcuZm9ybS1wb3BvdmVyLWVycm9yJyk7XHJcblxyXG4gICAgY29uc3QgbG9jYWxlVmlzaWJsZUVsZW1lbnRXaWR0aDogbnVtYmVyID0gPG51bWJlcj4oXHJcbiAgICAgICRpbnZhbGlkRmVlZGJhY2tDb250YWluZXIud2lkdGgoKVxyXG4gICAgKTtcclxuXHJcbiAgICAkZXJyb3JQb3BvdmVyLmNzcygnd2lkdGgnLCBsb2NhbGVWaXNpYmxlRWxlbWVudFdpZHRoKTtcclxuXHJcbiAgICBjb25zdCBob3Jpem9udGFsRGlmZmVyZW5jZSA9IGdldEhvcml6b250YWxEaWZmZXJlbmNlKFxyXG4gICAgICAkaW52YWxpZEZlZWRiYWNrQ29udGFpbmVyLFxyXG4gICAgICAkZXJyb3JQb3BvdmVyLFxyXG4gICAgKTtcclxuXHJcbiAgICAkZXJyb3JQb3BvdmVyLmNzcygnbGVmdCcsIGAke2hvcml6b250YWxEaWZmZXJlbmNlfXB4YCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0cyBob3Jpem9udGFsIGRpZmZlcmVuY2Ugd2hpY2ggaGVscHMgdG8gYWxpZ24gcG9wb3ZlciBob3Jpem9udGFsbHkuXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRpbnZhbGlkRmVlZGJhY2tDb250YWluZXJcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVycm9yUG9wb3ZlclxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgY29uc3QgZ2V0SG9yaXpvbnRhbERpZmZlcmVuY2UgPSAoXHJcbiAgICAkaW52YWxpZEZlZWRiYWNrQ29udGFpbmVyOiBKUXVlcnksXHJcbiAgICAkZXJyb3JQb3BvdmVyOiBKUXVlcnksXHJcbiAgKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBpbnZhbGlkQ29udGFpbmVyT2Zmc2V0ID0gJGludmFsaWRGZWVkYmFja0NvbnRhaW5lci5vZmZzZXQoKTtcclxuICAgIGNvbnN0IGVycm9yUG9wb3Zlck9mZnNldCA9ICRlcnJvclBvcG92ZXIub2Zmc2V0KCk7XHJcblxyXG4gICAgaWYgKGludmFsaWRDb250YWluZXJPZmZzZXQgJiYgZXJyb3JQb3BvdmVyT2Zmc2V0KSB7XHJcbiAgICAgIGNvbnN0IGlucHV0SG9yaXpvbnRhbFBvc2l0aW9uID0gaW52YWxpZENvbnRhaW5lck9mZnNldC5sZWZ0O1xyXG4gICAgICBjb25zdCBwb3BvdmVySG9yaXpvbnRhbFBvc2l0aW9uID0gZXJyb3JQb3BvdmVyT2Zmc2V0LmxlZnQ7XHJcblxyXG4gICAgICByZXR1cm4gaW5wdXRIb3Jpem9udGFsUG9zaXRpb24gLSBwb3BvdmVySG9yaXpvbnRhbFBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgcG9wb3ZlciBlcnJvciBjb250ZW50IHByZS1mZXRjaGVkIGluIGh0bWwuXHJcbiAgICogSXQgdXNlZCB1bmlxdWUgc2VsZWN0b3IgdG8gaWRlbnRpZnkgd2hpY2ggb25lIGNvbnRlbnQgdG8gcmVuZGVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBvcG92ZXJUcmlnZ2VyRWxlbWVudFxyXG4gICAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAgICovXHJcbiAgY29uc3QgZ2V0RXJyb3JDb250ZW50ID0gKHBvcG92ZXJUcmlnZ2VyRWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHBvcG92ZXJUcmlnZ2VySWQgPSAkKHBvcG92ZXJUcmlnZ2VyRWxlbWVudCkuZGF0YSgnaWQnKTtcclxuXHJcbiAgICByZXR1cm4gJChgLmpzLXBvcG92ZXItZXJyb3ItY29udGVudFtkYXRhLWlkPVwiJHtwb3BvdmVyVHJpZ2dlcklkfVwiXWApLmh0bWwoKTtcclxuICB9O1xyXG5cclxuICAvLyByZWdpc3RlcnMgdGhlIGV2ZW50IHdoaWNoIGRpc3BsYXlzIHRoZSBwb3BvdmVyXHJcbiAgJChkb2N1bWVudCkub24oXHJcbiAgICAnc2hvd24uYnMucG9wb3ZlcicsXHJcbiAgICAnW2RhdGEtdG9nZ2xlPVwiZm9ybS1wb3BvdmVyLWVycm9yXCJdJyxcclxuICAgIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHJlcG9zaXRpb25Qb3BvdmVyKGV2ZW50KSxcclxuICApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9