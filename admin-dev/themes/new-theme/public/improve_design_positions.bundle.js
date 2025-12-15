/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/improve/design_positions/hook-status-handler.ts":
/*!******************************************************************!*\
  !*** ./js/pages/improve/design_positions/hook-status-handler.ts ***!
  \******************************************************************/
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
const { $ } = window;
class HookStatusHandler {
  constructor() {
    const self = this;
    this.$hookStatus = $(".hook-switch-action");
    this.$modulePositionsForm = $("#module-positions-form");
    this.$hookStatus.on("change", function(e) {
      e.stopImmediatePropagation();
      self.toogleHookStatus($(this));
    });
  }
  /**
   * Toogle hooks status
   */
  toogleHookStatus($hookElement) {
    $.ajax({
      type: "POST",
      headers: { "cache-control": "no-cache" },
      url: this.$modulePositionsForm.data("togglestatus-url"),
      data: { hookId: $hookElement.data("hook-id") },
      success(data) {
        if (data.status) {
          window.showSuccessMessage(data.message);
          const $hookModulesList = $hookElement.closest(".hook-panel").find(".module-list, .module-list-disabled");
          $hookModulesList.fadeTo(500, data.hook_status ? 1 : 0.5);
        } else {
          window.showErrorMessage(data.message);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HookStatusHandler);


/***/ }),

/***/ "./js/pages/improve/design_positions/positions-list-handler.ts":
/*!*********************************************************************!*\
  !*** ./js/pages/improve/design_positions/positions-list-handler.ts ***!
  \*********************************************************************/
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
const { $ } = window;
class PositionsListHandler {
  constructor() {
    var _a;
    this.$panelSelection = $("#modules-position-selection-panel");
    this.$panelSelectionSingleSelection = $(
      "#modules-position-single-selection"
    );
    this.$panelSelectionMultipleSelection = $(
      "#modules-position-multiple-selection"
    );
    const $alertMessage = $("#content-message-box + .alert");
    this.$panelSelectionOriginalY = (_a = this.$panelSelection.offset()) == null ? void 0 : _a.top;
    if ($alertMessage.length > 0) {
      this.$panelSelectionOriginalY += $alertMessage.outerHeight();
    }
    this.$showModules = $("#show-modules");
    this.$modulesList = $(".modules-position-checkbox");
    this.$hookPosition = $("#hook-position");
    this.$hookSearch = $("#hook-search");
    this.$modulePositionsForm = $("#module-positions-form");
    this.$moduleUnhookButton = $("#unhook-button-position-bottom");
    this.$moduleButtonsUpdate = $(".module-buttons-update .btn");
    this.$hooksList = [];
    this.$transplantModuleButton = $(".transplant-module-button");
    this.handleList();
    this.handleSortable();
    this.$modulesList.trigger("change");
    this.$modulesList.trigger("scroll");
    $('input[name="general[enable_tos]"]').on("change", () => {
      this.handleList();
      this.handleSortable();
    });
  }
  /**
   * Handle all events for Design -> Positions List
   */
  handleList() {
    const self = this;
    $(window).on("scroll", () => {
      const $scrollTop = $(window).scrollTop();
      self.$panelSelection.css(
        "top",
        $scrollTop < 20 ? 0 : $scrollTop - self.$panelSelectionOriginalY
      );
    });
    self.$modulesList.on("change", () => {
      const $checkedCount = self.$modulesList.filter(":checked").length;
      if ($checkedCount === 0) {
        self.$moduleUnhookButton.hide();
        self.$panelSelection.hide();
        self.$panelSelectionSingleSelection.hide();
        self.$panelSelectionMultipleSelection.hide();
      } else if ($checkedCount === 1) {
        self.$moduleUnhookButton.show();
        self.$panelSelection.show();
        self.$panelSelectionSingleSelection.show();
        self.$panelSelectionMultipleSelection.hide();
      } else {
        self.$moduleUnhookButton.show();
        self.$panelSelection.show();
        self.$panelSelectionSingleSelection.hide();
        self.$panelSelectionMultipleSelection.show();
        $("#modules-position-selection-count").html(
          $checkedCount
        );
      }
    });
    self.$panelSelection.find("button").on("click", () => {
      $('button[name="unhookform"]').trigger("click");
    });
    self.$hooksList = [];
    $("section.hook-panel .hook-name").each(function() {
      const $this = $(this);
      self.$hooksList.push({
        title: $this.html(),
        element: $this,
        container: $this.parents(".hook-panel")
      });
    });
    self.$showModules.select2();
    self.$showModules.on("change", () => {
      self.modulesPositionFilterHooks();
    });
    self.$hookPosition.on("change", () => {
      self.modulesPositionFilterHooks();
    });
    self.$hookSearch.on("input", () => {
      self.modulesPositionFilterHooks();
    });
    self.modulesPositionFilterHooks();
    self.$hookSearch.on("keypress", (e) => {
      const keyCode = e.keyCode || e.which;
      return keyCode !== 13;
    });
    $(".hook-checker").on("click", function() {
      $(`.hook${$(this).data("hook-id")}`).prop(
        "checked",
        $(this).prop("checked")
      );
    });
    self.$modulesList.on("click", function() {
      $(`#Ghook${$(this).data("hook-id")}`).prop(
        "checked",
        $(`.hook${$(this).data("hook-id")}:not(:checked)`).length === 0
      );
    });
    self.$moduleButtonsUpdate.on("click", function() {
      const $btn = $(this);
      const $current = $btn.closest(".module-item");
      let $destination;
      if ($btn.data("way")) {
        $destination = $current.next(".module-item");
      } else {
        $destination = $current.prev(".module-item");
      }
      if ($destination.length === 0) {
        return false;
      }
      if ($btn.data("way")) {
        $current.insertAfter($destination);
      } else {
        $current.insertBefore($destination);
      }
      self.updatePositions(
        {
          hookId: $btn.data("hook-id"),
          moduleId: $btn.data("module-id"),
          way: $btn.data("way"),
          positions: []
        },
        $btn.closest("ul")
      );
      return false;
    });
  }
  /**
   * Handle sortable events
   */
  handleSortable() {
    const self = this;
    $(".sortable").sortable({
      forcePlaceholderSize: true,
      start(e, ui) {
        $(this).data("previous-index", ui.item.index());
      },
      update($event, ui) {
        const [hookId, moduleId] = ui.item.attr("id").split("_");
        const $data = {
          hookId,
          moduleId,
          way: $(this).data("previous-index") < ui.item.index() ? 1 : 0,
          positions: []
        };
        self.updatePositions($data, $($event.target));
      }
    });
  }
  updatePositions($data, $list) {
    const self = this;
    $.each($list.children(), (index, element) => {
      $data.positions.push($(element).attr("id"));
    });
    $.ajax({
      type: "POST",
      headers: { "cache-control": "no-cache" },
      url: self.$modulePositionsForm.data("update-url"),
      data: $data,
      success: () => {
        let start = 0;
        $.each($list.children(), (index, element) => {
          start += 1;
          $(element).find(".index-position").html(start);
        });
        window.showSuccessMessage(window.update_success_msg);
      }
    });
  }
  /**
   * Filter hooks / modules search and everything
   * about hooks positions.
   */
  modulesPositionFilterHooks() {
    const self = this;
    const $hookName = self.$hookSearch.val();
    const $moduleId = self.$showModules.val();
    const $regex = new RegExp(`(${$hookName})`, "gi");
    const transplantModuleHref = new URL(this.$transplantModuleButton.prop("href"));
    transplantModuleHref.searchParams.set("show_modules", $moduleId);
    this.$transplantModuleButton.attr("href", transplantModuleHref.toString());
    const isVisible = $hookName === "" && $moduleId === "all";
    for (let $id = 0; $id < self.$hooksList.length; $id += 1) {
      self.$hooksList[$id].container.toggleClass("hook-visible", isVisible);
      self.$hooksList[$id].container.toggle(isVisible);
      self.$hooksList[$id].element.html(self.$hooksList[$id].title);
      self.$hooksList[$id].container.find(".module-item").removeClass("highlight");
    }
    if ($hookName !== "" || $moduleId !== "all") {
      let $hooksToShowFromModule = $();
      let $hooksToShowFromHookName = $();
      let $currentHooks;
      let $start;
      for (let $id = 0; $id < self.$hooksList.length; $id += 1) {
        if ($moduleId !== "all") {
          $currentHooks = self.$hooksList[$id].container.find(
            `.module-position-${$moduleId}`
          );
          if ($currentHooks.length > 0) {
            $hooksToShowFromModule = $hooksToShowFromModule.add(
              self.$hooksList[$id].container
            );
            $currentHooks.addClass("highlight");
          }
        }
        if ($hookName !== "") {
          $start = self.$hooksList[$id].title.toLowerCase().search($hookName.toLowerCase());
          if ($start !== -1) {
            $hooksToShowFromHookName = $hooksToShowFromHookName.add(
              self.$hooksList[$id].container
            );
            self.$hooksList[$id].element.html(
              self.$hooksList[$id].title.replace(
                $regex,
                '<span class="highlight">$1</span>'
              )
            );
          }
        }
      }
      if ($moduleId === "all" && $hookName !== "") {
        $hooksToShowFromHookName.toggleClass("hook-visible", true);
        $hooksToShowFromHookName.show();
      } else if ($hookName === "" && $moduleId !== "all") {
        $hooksToShowFromModule.toggleClass("hook-visible", true);
        $hooksToShowFromModule.show();
      } else {
        $hooksToShowFromHookName.filter($hooksToShowFromModule).toggleClass("hook-visible", true);
        $hooksToShowFromHookName.filter($hooksToShowFromModule).show();
      }
    }
    if (!self.$hookPosition.prop("checked")) {
      for (let $id = 0; $id < self.$hooksList.length; $id += 1) {
        if (self.$hooksList[$id].container.is(".hook-position")) {
          self.$hooksList[$id].container.toggleClass("hook-visible", false);
          self.$hooksList[$id].container.hide();
        }
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionsListHandler);


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
/*!****************************************************!*\
  !*** ./js/pages/improve/design_positions/index.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positions_list_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positions-list-handler */ "./js/pages/improve/design_positions/positions-list-handler.ts");
/* harmony import */ var _hook_status_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hook-status-handler */ "./js/pages/improve/design_positions/hook-status-handler.ts");

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
  new _positions_list_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _hook_status_handler__WEBPACK_IMPORTED_MODULE_1__["default"]();
});

})();

window.improve_design_positions = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QmlDO0FBQ0g7QUFFOUIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLE1BQUksK0RBQW9CLENBQUM7QUFDekIsTUFBSSw0REFBaUIsQ0FBQztBQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvaW1wcm92ZS9kZXNpZ25fcG9zaXRpb25zL2hvb2stc3RhdHVzLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvaW1wcm92ZS9kZXNpZ25fcG9zaXRpb25zL3Bvc2l0aW9ucy1saXN0LWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvaW1wcm92ZS9kZXNpZ25fcG9zaXRpb25zL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5jbGFzcyBIb29rU3RhdHVzSGFuZGxlciB7XHJcbiAgJGhvb2tTdGF0dXM6IEpRdWVyeTtcclxuXHJcbiAgJG1vZHVsZVBvc2l0aW9uc0Zvcm06IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuJGhvb2tTdGF0dXMgPSAkKCcuaG9vay1zd2l0Y2gtYWN0aW9uJyk7XHJcbiAgICB0aGlzLiRtb2R1bGVQb3NpdGlvbnNGb3JtID0gJCgnI21vZHVsZS1wb3NpdGlvbnMtZm9ybScpO1xyXG5cclxuICAgIHRoaXMuJGhvb2tTdGF0dXMub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHNlbGYudG9vZ2xlSG9va1N0YXR1cygkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9vZ2xlIGhvb2tzIHN0YXR1c1xyXG4gICAqL1xyXG4gIHRvb2dsZUhvb2tTdGF0dXMoJGhvb2tFbGVtZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczogeydjYWNoZS1jb250cm9sJzogJ25vLWNhY2hlJ30sXHJcbiAgICAgIHVybDogdGhpcy4kbW9kdWxlUG9zaXRpb25zRm9ybS5kYXRhKCd0b2dnbGVzdGF0dXMtdXJsJyksXHJcbiAgICAgIGRhdGE6IHtob29rSWQ6ICRob29rRWxlbWVudC5kYXRhKCdob29rLWlkJyl9LFxyXG4gICAgICBzdWNjZXNzKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgIHdpbmRvdy5zaG93U3VjY2Vzc01lc3NhZ2UoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgIGNvbnN0ICRob29rTW9kdWxlc0xpc3QgPSAkaG9va0VsZW1lbnRcclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5ob29rLXBhbmVsJylcclxuICAgICAgICAgICAgLmZpbmQoJy5tb2R1bGUtbGlzdCwgLm1vZHVsZS1saXN0LWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAkaG9va01vZHVsZXNMaXN0LmZhZGVUbyg1MDAsIGRhdGEuaG9va19zdGF0dXMgPyAxIDogMC41KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvb2tTdGF0dXNIYW5kbGVyO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY2xhc3MgUG9zaXRpb25zTGlzdEhhbmRsZXIge1xyXG4gICRwYW5lbFNlbGVjdGlvbjogSlF1ZXJ5O1xyXG5cclxuICAkcGFuZWxTZWxlY3Rpb25TaW5nbGVTZWxlY3Rpb246IEpRdWVyeTtcclxuXHJcbiAgJHBhbmVsU2VsZWN0aW9uTXVsdGlwbGVTZWxlY3Rpb246IEpRdWVyeTtcclxuXHJcbiAgJHBhbmVsU2VsZWN0aW9uT3JpZ2luYWxZOiBudW1iZXI7XHJcblxyXG4gICRzaG93TW9kdWxlczogSlF1ZXJ5O1xyXG5cclxuICAkbW9kdWxlc0xpc3Q6IEpRdWVyeTtcclxuXHJcbiAgJGhvb2tQb3NpdGlvbjogSlF1ZXJ5O1xyXG5cclxuICAkaG9va1NlYXJjaDogSlF1ZXJ5O1xyXG5cclxuICAkbW9kdWxlUG9zaXRpb25zRm9ybTogSlF1ZXJ5O1xyXG5cclxuICAkbW9kdWxlVW5ob29rQnV0dG9uOiBKUXVlcnk7XHJcblxyXG4gICRtb2R1bGVCdXR0b25zVXBkYXRlOiBKUXVlcnk7XHJcblxyXG4gICR0cmFuc3BsYW50TW9kdWxlQnV0dG9uOiBKUXVlcnk7XHJcblxyXG4gICRob29rc0xpc3Q6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuJHBhbmVsU2VsZWN0aW9uID0gJCgnI21vZHVsZXMtcG9zaXRpb24tc2VsZWN0aW9uLXBhbmVsJyk7XHJcbiAgICB0aGlzLiRwYW5lbFNlbGVjdGlvblNpbmdsZVNlbGVjdGlvbiA9ICQoXHJcbiAgICAgICcjbW9kdWxlcy1wb3NpdGlvbi1zaW5nbGUtc2VsZWN0aW9uJyxcclxuICAgICk7XHJcbiAgICB0aGlzLiRwYW5lbFNlbGVjdGlvbk11bHRpcGxlU2VsZWN0aW9uID0gJChcclxuICAgICAgJyNtb2R1bGVzLXBvc2l0aW9uLW11bHRpcGxlLXNlbGVjdGlvbicsXHJcbiAgICApO1xyXG4gICAgY29uc3QgJGFsZXJ0TWVzc2FnZSA9ICQoJyNjb250ZW50LW1lc3NhZ2UtYm94ICsgLmFsZXJ0Jyk7XHJcblxyXG4gICAgdGhpcy4kcGFuZWxTZWxlY3Rpb25PcmlnaW5hbFkgPSA8bnVtYmVyPiB0aGlzLiRwYW5lbFNlbGVjdGlvbi5vZmZzZXQoKT8udG9wO1xyXG4gICAgaWYgKCRhbGVydE1lc3NhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLiRwYW5lbFNlbGVjdGlvbk9yaWdpbmFsWSArPSA8bnVtYmVyPiAkYWxlcnRNZXNzYWdlLm91dGVySGVpZ2h0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLiRzaG93TW9kdWxlcyA9ICQoJyNzaG93LW1vZHVsZXMnKTtcclxuICAgIHRoaXMuJG1vZHVsZXNMaXN0ID0gJCgnLm1vZHVsZXMtcG9zaXRpb24tY2hlY2tib3gnKTtcclxuICAgIHRoaXMuJGhvb2tQb3NpdGlvbiA9ICQoJyNob29rLXBvc2l0aW9uJyk7XHJcbiAgICB0aGlzLiRob29rU2VhcmNoID0gJCgnI2hvb2stc2VhcmNoJyk7XHJcbiAgICB0aGlzLiRtb2R1bGVQb3NpdGlvbnNGb3JtID0gJCgnI21vZHVsZS1wb3NpdGlvbnMtZm9ybScpO1xyXG4gICAgdGhpcy4kbW9kdWxlVW5ob29rQnV0dG9uID0gJCgnI3VuaG9vay1idXR0b24tcG9zaXRpb24tYm90dG9tJyk7XHJcbiAgICB0aGlzLiRtb2R1bGVCdXR0b25zVXBkYXRlID0gJCgnLm1vZHVsZS1idXR0b25zLXVwZGF0ZSAuYnRuJyk7XHJcbiAgICB0aGlzLiRob29rc0xpc3QgPSBbXTtcclxuICAgIHRoaXMuJHRyYW5zcGxhbnRNb2R1bGVCdXR0b24gPSAkKCcudHJhbnNwbGFudC1tb2R1bGUtYnV0dG9uJyk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVMaXN0KCk7XHJcbiAgICB0aGlzLmhhbmRsZVNvcnRhYmxlKCk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciBzb21lIGV2ZW50cyBmb3IgcmVsb2FkaW5nIGFsbCBwcmV2aW91cyBob29rc1xyXG4gICAgdGhpcy4kbW9kdWxlc0xpc3QudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB0aGlzLiRtb2R1bGVzTGlzdC50cmlnZ2VyKCdzY3JvbGwnKTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPVwiZ2VuZXJhbFtlbmFibGVfdG9zXVwiXScpLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlTGlzdCgpO1xyXG4gICAgICB0aGlzLmhhbmRsZVNvcnRhYmxlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBhbGwgZXZlbnRzIGZvciBEZXNpZ24gLT4gUG9zaXRpb25zIExpc3RcclxuICAgKi9cclxuICBoYW5kbGVMaXN0KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRzY3JvbGxUb3AgPSA8bnVtYmVyPiQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb24uY3NzKFxyXG4gICAgICAgICd0b3AnLFxyXG4gICAgICAgICRzY3JvbGxUb3AgPCAyMCA/IDAgOiAkc2Nyb2xsVG9wIC0gc2VsZi4kcGFuZWxTZWxlY3Rpb25PcmlnaW5hbFksXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRtb2R1bGVzTGlzdC5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCAkY2hlY2tlZENvdW50ID0gc2VsZi4kbW9kdWxlc0xpc3QuZmlsdGVyKCc6Y2hlY2tlZCcpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmICgkY2hlY2tlZENvdW50ID09PSAwKSB7XHJcbiAgICAgICAgc2VsZi4kbW9kdWxlVW5ob29rQnV0dG9uLmhpZGUoKTtcclxuICAgICAgICBzZWxmLiRwYW5lbFNlbGVjdGlvbi5oaWRlKCk7XHJcbiAgICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb25TaW5nbGVTZWxlY3Rpb24uaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uTXVsdGlwbGVTZWxlY3Rpb24uaGlkZSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCRjaGVja2VkQ291bnQgPT09IDEpIHtcclxuICAgICAgICBzZWxmLiRtb2R1bGVVbmhvb2tCdXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uLnNob3coKTtcclxuICAgICAgICBzZWxmLiRwYW5lbFNlbGVjdGlvblNpbmdsZVNlbGVjdGlvbi5zaG93KCk7XHJcbiAgICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb25NdWx0aXBsZVNlbGVjdGlvbi5oaWRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi4kbW9kdWxlVW5ob29rQnV0dG9uLnNob3coKTtcclxuICAgICAgICBzZWxmLiRwYW5lbFNlbGVjdGlvbi5zaG93KCk7XHJcbiAgICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb25TaW5nbGVTZWxlY3Rpb24uaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uTXVsdGlwbGVTZWxlY3Rpb24uc2hvdygpO1xyXG4gICAgICAgICQoJyNtb2R1bGVzLXBvc2l0aW9uLXNlbGVjdGlvbi1jb3VudCcpLmh0bWwoXHJcbiAgICAgICAgICA8c3RyaW5nPig8dW5rbm93bj4kY2hlY2tlZENvdW50KSxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRwYW5lbFNlbGVjdGlvbi5maW5kKCdidXR0b24nKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICQoJ2J1dHRvbltuYW1lPVwidW5ob29rZm9ybVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRob29rc0xpc3QgPSBbXTtcclxuICAgICQoJ3NlY3Rpb24uaG9vay1wYW5lbCAuaG9vay1uYW1lJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgc2VsZi4kaG9va3NMaXN0LnB1c2goe1xyXG4gICAgICAgIHRpdGxlOiAkdGhpcy5odG1sKCksXHJcbiAgICAgICAgZWxlbWVudDogJHRoaXMsXHJcbiAgICAgICAgY29udGFpbmVyOiAkdGhpcy5wYXJlbnRzKCcuaG9vay1wYW5lbCcpLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYuJHNob3dNb2R1bGVzLnNlbGVjdDIoKTtcclxuICAgIHNlbGYuJHNob3dNb2R1bGVzLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIHNlbGYubW9kdWxlc1Bvc2l0aW9uRmlsdGVySG9va3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYuJGhvb2tQb3NpdGlvbi5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBzZWxmLm1vZHVsZXNQb3NpdGlvbkZpbHRlckhvb2tzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRob29rU2VhcmNoLm9uKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgc2VsZi5tb2R1bGVzUG9zaXRpb25GaWx0ZXJIb29rcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmlsdGVyIG1vZHVsZXMgbGlzdCBvbiB0aGUgcGFnZSBsb2FkXHJcbiAgICBzZWxmLm1vZHVsZXNQb3NpdGlvbkZpbHRlckhvb2tzKCk7XHJcblxyXG4gICAgc2VsZi4kaG9va1NlYXJjaC5vbigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcblxyXG4gICAgICByZXR1cm4ga2V5Q29kZSAhPT0gMTM7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuaG9vay1jaGVja2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKGAuaG9vayR7JCh0aGlzKS5kYXRhKCdob29rLWlkJyl9YCkucHJvcChcclxuICAgICAgICAnY2hlY2tlZCcsXHJcbiAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJyksXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRtb2R1bGVzTGlzdC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoYCNHaG9vayR7JCh0aGlzKS5kYXRhKCdob29rLWlkJyl9YCkucHJvcChcclxuICAgICAgICAnY2hlY2tlZCcsXHJcbiAgICAgICAgJChgLmhvb2skeyQodGhpcykuZGF0YSgnaG9vay1pZCcpfTpub3QoOmNoZWNrZWQpYCkubGVuZ3RoID09PSAwLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi4kbW9kdWxlQnV0dG9uc1VwZGF0ZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xyXG4gICAgICBjb25zdCAkY3VycmVudCA9ICRidG4uY2xvc2VzdCgnLm1vZHVsZS1pdGVtJyk7XHJcbiAgICAgIGxldCAkZGVzdGluYXRpb247XHJcblxyXG4gICAgICBpZiAoJGJ0bi5kYXRhKCd3YXknKSkge1xyXG4gICAgICAgICRkZXN0aW5hdGlvbiA9ICRjdXJyZW50Lm5leHQoJy5tb2R1bGUtaXRlbScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRkZXN0aW5hdGlvbiA9ICRjdXJyZW50LnByZXYoJy5tb2R1bGUtaXRlbScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoJGRlc3RpbmF0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCRidG4uZGF0YSgnd2F5JykpIHtcclxuICAgICAgICAkY3VycmVudC5pbnNlcnRBZnRlcigkZGVzdGluYXRpb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjdXJyZW50Lmluc2VydEJlZm9yZSgkZGVzdGluYXRpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnVwZGF0ZVBvc2l0aW9ucyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBob29rSWQ6ICRidG4uZGF0YSgnaG9vay1pZCcpLFxyXG4gICAgICAgICAgbW9kdWxlSWQ6ICRidG4uZGF0YSgnbW9kdWxlLWlkJyksXHJcbiAgICAgICAgICB3YXk6ICRidG4uZGF0YSgnd2F5JyksXHJcbiAgICAgICAgICBwb3NpdGlvbnM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGJ0bi5jbG9zZXN0KCd1bCcpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgc29ydGFibGUgZXZlbnRzXHJcbiAgICovXHJcbiAgaGFuZGxlU29ydGFibGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkKCcuc29ydGFibGUnKS5zb3J0YWJsZSh7XHJcbiAgICAgIGZvcmNlUGxhY2Vob2xkZXJTaXplOiB0cnVlLFxyXG4gICAgICBzdGFydChlOiBKUXVlcnlFdmVudE9iamVjdCwgdWk6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcclxuICAgICAgICAkKHRoaXMpLmRhdGEoJ3ByZXZpb3VzLWluZGV4JywgdWkuaXRlbS5pbmRleCgpKTtcclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlKCRldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsIHVpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICAgICAgY29uc3QgW2hvb2tJZCwgbW9kdWxlSWRdID0gdWkuaXRlbS5hdHRyKCdpZCcpLnNwbGl0KCdfJyk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRkYXRhID0ge1xyXG4gICAgICAgICAgaG9va0lkLFxyXG4gICAgICAgICAgbW9kdWxlSWQsXHJcbiAgICAgICAgICB3YXk6ICQodGhpcykuZGF0YSgncHJldmlvdXMtaW5kZXgnKSA8IHVpLml0ZW0uaW5kZXgoKSA/IDEgOiAwLFxyXG4gICAgICAgICAgcG9zaXRpb25zOiBbXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZWxmLnVwZGF0ZVBvc2l0aW9ucygkZGF0YSwgJCgkZXZlbnQudGFyZ2V0KSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBvc2l0aW9ucygkZGF0YTogUmVjb3JkPHN0cmluZywgYW55PiwgJGxpc3Q6IEpRdWVyeTxFbGVtZW50Pik6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAkLmVhY2goJGxpc3QuY2hpbGRyZW4oKSwgKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICRkYXRhLnBvc2l0aW9ucy5wdXNoKCQoZWxlbWVudCkuYXR0cignaWQnKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcnM6IHsnY2FjaGUtY29udHJvbCc6ICduby1jYWNoZSd9LFxyXG4gICAgICB1cmw6IHNlbGYuJG1vZHVsZVBvc2l0aW9uc0Zvcm0uZGF0YSgndXBkYXRlLXVybCcpLFxyXG4gICAgICBkYXRhOiAkZGF0YSxcclxuICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgIGxldCBzdGFydCA9IDA7XHJcbiAgICAgICAgJC5lYWNoKCRsaXN0LmNoaWxkcmVuKCksIChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgc3RhcnQgKz0gMTtcclxuICAgICAgICAgICQoZWxlbWVudClcclxuICAgICAgICAgICAgLmZpbmQoJy5pbmRleC1wb3NpdGlvbicpXHJcbiAgICAgICAgICAgIC5odG1sKDxzdHJpbmc+KDx1bmtub3duPnN0YXJ0KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5zaG93U3VjY2Vzc01lc3NhZ2Uod2luZG93LnVwZGF0ZV9zdWNjZXNzX21zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciBob29rcyAvIG1vZHVsZXMgc2VhcmNoIGFuZCBldmVyeXRoaW5nXHJcbiAgICogYWJvdXQgaG9va3MgcG9zaXRpb25zLlxyXG4gICAqL1xyXG4gIG1vZHVsZXNQb3NpdGlvbkZpbHRlckhvb2tzKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCAkaG9va05hbWUgPSA8c3RyaW5nPnNlbGYuJGhvb2tTZWFyY2gudmFsKCk7XHJcbiAgICBjb25zdCAkbW9kdWxlSWQgPSA8c3RyaW5nPnNlbGYuJHNob3dNb2R1bGVzLnZhbCgpO1xyXG4gICAgY29uc3QgJHJlZ2V4ID0gbmV3IFJlZ0V4cChgKCR7JGhvb2tOYW1lfSlgLCAnZ2knKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgXCJUcmFuc3BsYW50IG1vZHVsZVwiIGJ1dHRvblxyXG4gICAgY29uc3QgdHJhbnNwbGFudE1vZHVsZUhyZWYgPSBuZXcgVVJMKHRoaXMuJHRyYW5zcGxhbnRNb2R1bGVCdXR0b24ucHJvcCgnaHJlZicpKTtcclxuICAgIHRyYW5zcGxhbnRNb2R1bGVIcmVmLnNlYXJjaFBhcmFtcy5zZXQoJ3Nob3dfbW9kdWxlcycsICRtb2R1bGVJZCk7XHJcbiAgICB0aGlzLiR0cmFuc3BsYW50TW9kdWxlQnV0dG9uLmF0dHIoJ2hyZWYnLCB0cmFuc3BsYW50TW9kdWxlSHJlZi50b1N0cmluZygpKTtcclxuXHJcbiAgICBjb25zdCBpc1Zpc2libGU6IGJvb2xlYW4gPSAkaG9va05hbWUgPT09ICcnICYmICRtb2R1bGVJZCA9PT0gJ2FsbCc7XHJcblxyXG4gICAgZm9yIChsZXQgJGlkID0gMDsgJGlkIDwgc2VsZi4kaG9va3NMaXN0Lmxlbmd0aDsgJGlkICs9IDEpIHtcclxuICAgICAgc2VsZi4kaG9va3NMaXN0WyRpZF0uY29udGFpbmVyLnRvZ2dsZUNsYXNzKCdob29rLXZpc2libGUnLCBpc1Zpc2libGUpO1xyXG4gICAgICBzZWxmLiRob29rc0xpc3RbJGlkXS5jb250YWluZXIudG9nZ2xlKGlzVmlzaWJsZSk7XHJcbiAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmVsZW1lbnQuaHRtbChzZWxmLiRob29rc0xpc3RbJGlkXS50aXRsZSk7XHJcbiAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lclxyXG4gICAgICAgIC5maW5kKCcubW9kdWxlLWl0ZW0nKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaGlnaGxpZ2h0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGF2ZSBzZWxlY3QgYSBob29rIG5hbWUgb3IgYSBtb2R1bGUgaWRcclxuICAgIGlmICgkaG9va05hbWUgIT09ICcnIHx8ICRtb2R1bGVJZCAhPT0gJ2FsbCcpIHtcclxuICAgICAgLy8gUHJlcGFyZSBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50c1xyXG4gICAgICBsZXQgJGhvb2tzVG9TaG93RnJvbU1vZHVsZSA9ICQoKTtcclxuICAgICAgbGV0ICRob29rc1RvU2hvd0Zyb21Ib29rTmFtZSA9ICQoKTtcclxuICAgICAgbGV0ICRjdXJyZW50SG9va3M7XHJcbiAgICAgIGxldCAkc3RhcnQ7XHJcblxyXG4gICAgICBmb3IgKGxldCAkaWQgPSAwOyAkaWQgPCBzZWxmLiRob29rc0xpc3QubGVuZ3RoOyAkaWQgKz0gMSkge1xyXG4gICAgICAgIC8vIFByZXBhcmUgaGlnaGxpZ2h0IHdoZW4gb25lIG1vZHVsZSBpcyBzZWxlY3RlZFxyXG4gICAgICAgIGlmICgkbW9kdWxlSWQgIT09ICdhbGwnKSB7XHJcbiAgICAgICAgICAkY3VycmVudEhvb2tzID0gc2VsZi4kaG9va3NMaXN0WyRpZF0uY29udGFpbmVyLmZpbmQoXHJcbiAgICAgICAgICAgIGAubW9kdWxlLXBvc2l0aW9uLSR7JG1vZHVsZUlkfWAsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKCRjdXJyZW50SG9va3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkaG9va3NUb1Nob3dGcm9tTW9kdWxlID0gJGhvb2tzVG9TaG93RnJvbU1vZHVsZS5hZGQoXHJcbiAgICAgICAgICAgICAgc2VsZi4kaG9va3NMaXN0WyRpZF0uY29udGFpbmVyLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAkY3VycmVudEhvb2tzLmFkZENsYXNzKCdoaWdobGlnaHQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgaGlnaGxpZ2h0IHdoZW4gdGhlcmUgaXMgYSBob29rIG5hbWVcclxuICAgICAgICBpZiAoJGhvb2tOYW1lICE9PSAnJykge1xyXG4gICAgICAgICAgJHN0YXJ0ID0gc2VsZi4kaG9va3NMaXN0WyRpZF0udGl0bGVcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLnNlYXJjaCgkaG9va05hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICBpZiAoJHN0YXJ0ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUgPSAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUuYWRkKFxyXG4gICAgICAgICAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lcixcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc2VsZi4kaG9va3NMaXN0WyRpZF0uZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLnRpdGxlLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAkcmVnZXgsXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRcIj4kMTwvc3Bhbj4nLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOb3RoaW5nIHNlbGVjdGVkXHJcbiAgICAgIGlmICgkbW9kdWxlSWQgPT09ICdhbGwnICYmICRob29rTmFtZSAhPT0gJycpIHtcclxuICAgICAgICAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUudG9nZ2xlQ2xhc3MoJ2hvb2stdmlzaWJsZScsIHRydWUpO1xyXG4gICAgICAgICRob29rc1RvU2hvd0Zyb21Ib29rTmFtZS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJGhvb2tOYW1lID09PSAnJyAmJiAkbW9kdWxlSWQgIT09ICdhbGwnKSB7XHJcbiAgICAgICAgLy8gSGF2ZSBubyBob29rIGJ1ZyBoYXZlIGEgbW9kdWxlXHJcbiAgICAgICAgJGhvb2tzVG9TaG93RnJvbU1vZHVsZS50b2dnbGVDbGFzcygnaG9vay12aXNpYmxlJywgdHJ1ZSk7XHJcbiAgICAgICAgJGhvb2tzVG9TaG93RnJvbU1vZHVsZS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQm90aCBzZWxlY3RlZFxyXG4gICAgICAgICRob29rc1RvU2hvd0Zyb21Ib29rTmFtZS5maWx0ZXIoJGhvb2tzVG9TaG93RnJvbU1vZHVsZSkudG9nZ2xlQ2xhc3MoJ2hvb2stdmlzaWJsZScsIHRydWUpO1xyXG4gICAgICAgICRob29rc1RvU2hvd0Zyb21Ib29rTmFtZS5maWx0ZXIoJGhvb2tzVG9TaG93RnJvbU1vZHVsZSkuc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWxmLiRob29rUG9zaXRpb24ucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgIGZvciAobGV0ICRpZCA9IDA7ICRpZCA8IHNlbGYuJGhvb2tzTGlzdC5sZW5ndGg7ICRpZCArPSAxKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lci5pcygnLmhvb2stcG9zaXRpb24nKSkge1xyXG4gICAgICAgICAgc2VsZi4kaG9va3NMaXN0WyRpZF0uY29udGFpbmVyLnRvZ2dsZUNsYXNzKCdob29rLXZpc2libGUnLCBmYWxzZSk7XHJcbiAgICAgICAgICBzZWxmLiRob29rc0xpc3RbJGlkXS5jb250YWluZXIuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9zaXRpb25zTGlzdEhhbmRsZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQb3NpdGlvbnNMaXN0SGFuZGxlciBmcm9tICcuL3Bvc2l0aW9ucy1saXN0LWhhbmRsZXInO1xyXG5pbXBvcnQgSG9va1N0YXR1c0hhbmRsZXIgZnJvbSAnLi9ob29rLXN0YXR1cy1oYW5kbGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBQb3NpdGlvbnNMaXN0SGFuZGxlcigpO1xyXG4gIG5ldyBIb29rU3RhdHVzSGFuZGxlcigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9