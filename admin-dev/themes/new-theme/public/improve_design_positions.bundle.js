/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/improve/design_positions/hook-status-handler.ts"
/*!******************************************************************!*\
  !*** ./js/pages/improve/design_positions/hook-status-handler.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/improve/design_positions/positions-list-handler.ts"
/*!*********************************************************************!*\
  !*** ./js/pages/improve/design_positions/positions-list-handler.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
/*!****************************************************!*\
  !*** ./js/pages/improve/design_positions/index.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positions_list_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positions-list-handler */ "./js/pages/improve/design_positions/positions-list-handler.ts");
/* harmony import */ var _hook_status_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hook-status-handler */ "./js/pages/improve/design_positions/hook-status-handler.ts");



const { $ } = window;
$(() => {
  new _positions_list_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _hook_status_handler__WEBPACK_IMPORTED_MODULE_1__["default"]();
});

})();

window.improve_design_positions = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wcm92ZV9kZXNpZ25fcG9zaXRpb25zLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLQSxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosTUFBTSxrQkFBa0I7QUFBQSxFQUt0QixjQUFjO0FBQ1osVUFBTSxPQUFPO0FBQ2IsU0FBSyxjQUFjLEVBQUUscUJBQXFCO0FBQzFDLFNBQUssdUJBQXVCLEVBQUUsd0JBQXdCO0FBRXRELFNBQUssWUFBWSxHQUFHLFVBQVUsU0FBVSxHQUFHO0FBQ3pDLFFBQUUseUJBQXlCO0FBQzNCLFdBQUssaUJBQWlCLEVBQUUsSUFBSSxDQUFDO0FBQUEsSUFDL0IsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLGlCQUFpQixjQUE0QjtBQUMzQyxNQUFFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFNBQVMsRUFBQyxpQkFBaUIsV0FBVTtBQUFBLE1BQ3JDLEtBQUssS0FBSyxxQkFBcUIsS0FBSyxrQkFBa0I7QUFBQSxNQUN0RCxNQUFNLEVBQUMsUUFBUSxhQUFhLEtBQUssU0FBUyxFQUFDO0FBQUEsTUFDM0MsUUFBUSxNQUFNO0FBQ1osWUFBSSxLQUFLLFFBQVE7QUFDZixpQkFBTyxtQkFBbUIsS0FBSyxPQUFPO0FBQ3RDLGdCQUFNLG1CQUFtQixhQUN0QixRQUFRLGFBQWEsRUFDckIsS0FBSyxxQ0FBcUM7QUFDN0MsMkJBQWlCLE9BQU8sS0FBSyxLQUFLLGNBQWMsSUFBSSxHQUFHO0FBQUEsUUFDekQsT0FBTztBQUNMLGlCQUFPLGlCQUFpQixLQUFLLE9BQU87QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFFQSxpRUFBZSxpQkFBaUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFDakMsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLE1BQU0scUJBQXFCO0FBQUEsRUEyQnpCLGNBQWM7QUFsQ2hCO0FBbUNJLFNBQUssa0JBQWtCLEVBQUUsbUNBQW1DO0FBQzVELFNBQUssaUNBQWlDO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQ0EsU0FBSyxtQ0FBbUM7QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFDQSxVQUFNLGdCQUFnQixFQUFFLCtCQUErQjtBQUV2RCxTQUFLLDRCQUFvQyxVQUFLLGdCQUFnQixPQUFPLE1BQTVCLG1CQUErQjtBQUN4RSxRQUFJLGNBQWMsU0FBUyxHQUFHO0FBQzVCLFdBQUssNEJBQXFDLGNBQWMsWUFBWTtBQUFBLElBQ3RFO0FBQ0EsU0FBSyxlQUFlLEVBQUUsZUFBZTtBQUNyQyxTQUFLLGVBQWUsRUFBRSw0QkFBNEI7QUFDbEQsU0FBSyxnQkFBZ0IsRUFBRSxnQkFBZ0I7QUFDdkMsU0FBSyxjQUFjLEVBQUUsY0FBYztBQUNuQyxTQUFLLHVCQUF1QixFQUFFLHdCQUF3QjtBQUN0RCxTQUFLLHNCQUFzQixFQUFFLGdDQUFnQztBQUM3RCxTQUFLLHVCQUF1QixFQUFFLDZCQUE2QjtBQUMzRCxTQUFLLGFBQWEsQ0FBQztBQUNuQixTQUFLLDBCQUEwQixFQUFFLDJCQUEyQjtBQUU1RCxTQUFLLFdBQVc7QUFDaEIsU0FBSyxlQUFlO0FBR3BCLFNBQUssYUFBYSxRQUFRLFFBQVE7QUFDbEMsU0FBSyxhQUFhLFFBQVEsUUFBUTtBQUVsQyxNQUFFLG1DQUFtQyxFQUFFLEdBQUcsVUFBVSxNQUFNO0FBQ3hELFdBQUssV0FBVztBQUNoQixXQUFLLGVBQWU7QUFBQSxJQUN0QixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0EsYUFBbUI7QUFDakIsVUFBTSxPQUFPO0FBRWIsTUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLE1BQU07QUFDM0IsWUFBTSxhQUFxQixFQUFFLE1BQU0sRUFBRSxVQUFVO0FBQy9DLFdBQUssZ0JBQWdCO0FBQUEsUUFDbkI7QUFBQSxRQUNBLGFBQWEsS0FBSyxJQUFJLGFBQWEsS0FBSztBQUFBLE1BQzFDO0FBQUEsSUFDRixDQUFDO0FBRUQsU0FBSyxhQUFhLEdBQUcsVUFBVSxNQUFNO0FBQ25DLFlBQU0sZ0JBQWdCLEtBQUssYUFBYSxPQUFPLFVBQVUsRUFBRTtBQUUzRCxVQUFJLGtCQUFrQixHQUFHO0FBQ3ZCLGFBQUssb0JBQW9CLEtBQUs7QUFDOUIsYUFBSyxnQkFBZ0IsS0FBSztBQUMxQixhQUFLLCtCQUErQixLQUFLO0FBQ3pDLGFBQUssaUNBQWlDLEtBQUs7QUFBQSxNQUM3QyxXQUFXLGtCQUFrQixHQUFHO0FBQzlCLGFBQUssb0JBQW9CLEtBQUs7QUFDOUIsYUFBSyxnQkFBZ0IsS0FBSztBQUMxQixhQUFLLCtCQUErQixLQUFLO0FBQ3pDLGFBQUssaUNBQWlDLEtBQUs7QUFBQSxNQUM3QyxPQUFPO0FBQ0wsYUFBSyxvQkFBb0IsS0FBSztBQUM5QixhQUFLLGdCQUFnQixLQUFLO0FBQzFCLGFBQUssK0JBQStCLEtBQUs7QUFDekMsYUFBSyxpQ0FBaUMsS0FBSztBQUMzQyxVQUFFLG1DQUFtQyxFQUFFO0FBQUEsVUFDbkI7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxTQUFLLGdCQUFnQixLQUFLLFFBQVEsRUFBRSxHQUFHLFNBQVMsTUFBTTtBQUNwRCxRQUFFLDJCQUEyQixFQUFFLFFBQVEsT0FBTztBQUFBLElBQ2hELENBQUM7QUFFRCxTQUFLLGFBQWEsQ0FBQztBQUNuQixNQUFFLCtCQUErQixFQUFFLEtBQUssV0FBWTtBQUNsRCxZQUFNLFFBQVEsRUFBRSxJQUFJO0FBQ3BCLFdBQUssV0FBVyxLQUFLO0FBQUEsUUFDbkIsT0FBTyxNQUFNLEtBQUs7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxXQUFXLE1BQU0sUUFBUSxhQUFhO0FBQUEsTUFDeEMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFNBQUssYUFBYSxRQUFRO0FBQzFCLFNBQUssYUFBYSxHQUFHLFVBQVUsTUFBTTtBQUNuQyxXQUFLLDJCQUEyQjtBQUFBLElBQ2xDLENBQUM7QUFFRCxTQUFLLGNBQWMsR0FBRyxVQUFVLE1BQU07QUFDcEMsV0FBSywyQkFBMkI7QUFBQSxJQUNsQyxDQUFDO0FBRUQsU0FBSyxZQUFZLEdBQUcsU0FBUyxNQUFNO0FBQ2pDLFdBQUssMkJBQTJCO0FBQUEsSUFDbEMsQ0FBQztBQUdELFNBQUssMkJBQTJCO0FBRWhDLFNBQUssWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNO0FBQ3JDLFlBQU0sVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUUvQixhQUFPLFlBQVk7QUFBQSxJQUNyQixDQUFDO0FBRUQsTUFBRSxlQUFlLEVBQUUsR0FBRyxTQUFTLFdBQVk7QUFDekMsUUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssU0FBUyxHQUFHLEVBQUU7QUFBQSxRQUNuQztBQUFBLFFBQ0EsRUFBRSxJQUFJLEVBQUUsS0FBSyxTQUFTO0FBQUEsTUFDeEI7QUFBQSxJQUNGLENBQUM7QUFFRCxTQUFLLGFBQWEsR0FBRyxTQUFTLFdBQVk7QUFDeEMsUUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssU0FBUyxHQUFHLEVBQUU7QUFBQSxRQUNwQztBQUFBLFFBQ0EsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssU0FBUyxpQkFBaUIsRUFBRSxXQUFXO0FBQUEsTUFDaEU7QUFBQSxJQUNGLENBQUM7QUFFRCxTQUFLLHFCQUFxQixHQUFHLFNBQVMsV0FBWTtBQUNoRCxZQUFNLE9BQU8sRUFBRSxJQUFJO0FBQ25CLFlBQU0sV0FBVyxLQUFLLFFBQVEsY0FBYztBQUM1QyxVQUFJO0FBRUosVUFBSSxLQUFLLEtBQUssS0FBSyxHQUFHO0FBQ3BCLHVCQUFlLFNBQVMsS0FBSyxjQUFjO0FBQUEsTUFDN0MsT0FBTztBQUNMLHVCQUFlLFNBQVMsS0FBSyxjQUFjO0FBQUEsTUFDN0M7QUFFQSxVQUFJLGFBQWEsV0FBVyxHQUFHO0FBQzdCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxLQUFLLEtBQUssS0FBSyxHQUFHO0FBQ3BCLGlCQUFTLFlBQVksWUFBWTtBQUFBLE1BQ25DLE9BQU87QUFDTCxpQkFBUyxhQUFhLFlBQVk7QUFBQSxNQUNwQztBQUVBLFdBQUs7QUFBQSxRQUNIO0FBQUEsVUFDRSxRQUFRLEtBQUssS0FBSyxTQUFTO0FBQUEsVUFDM0IsVUFBVSxLQUFLLEtBQUssV0FBVztBQUFBLFVBQy9CLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFBQSxVQUNwQixXQUFXLENBQUM7QUFBQSxRQUNkO0FBQUEsUUFDQSxLQUFLLFFBQVEsSUFBSTtBQUFBLE1BQ25CO0FBRUEsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLGlCQUF1QjtBQUNyQixVQUFNLE9BQU87QUFFYixNQUFFLFdBQVcsRUFBRSxTQUFTO0FBQUEsTUFDdEIsc0JBQXNCO0FBQUEsTUFDdEIsTUFBTSxHQUFzQixJQUF5QjtBQUNuRCxVQUFFLElBQUksRUFBRSxLQUFLLGtCQUFrQixHQUFHLEtBQUssTUFBTSxDQUFDO0FBQUEsTUFDaEQ7QUFBQSxNQUNBLE9BQU8sUUFBMkIsSUFBeUI7QUFDekQsY0FBTSxDQUFDLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUc7QUFFdkQsY0FBTSxRQUFRO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxVQUNBLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxnQkFBZ0IsSUFBSSxHQUFHLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxVQUM1RCxXQUFXLENBQUM7QUFBQSxRQUNkO0FBRUEsYUFBSyxnQkFBZ0IsT0FBTyxFQUFFLE9BQU8sTUFBTSxDQUFDO0FBQUEsTUFDOUM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxnQkFBZ0IsT0FBNEIsT0FBOEI7QUFDeEUsVUFBTSxPQUFPO0FBQ2IsTUFBRSxLQUFLLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxZQUFZO0FBQzNDLFlBQU0sVUFBVSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDO0FBQUEsSUFDNUMsQ0FBQztBQUVELE1BQUUsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sU0FBUyxFQUFDLGlCQUFpQixXQUFVO0FBQUEsTUFDckMsS0FBSyxLQUFLLHFCQUFxQixLQUFLLFlBQVk7QUFBQSxNQUNoRCxNQUFNO0FBQUEsTUFDTixTQUFTLE1BQU07QUFDYixZQUFJLFFBQVE7QUFDWixVQUFFLEtBQUssTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLFlBQVk7QUFDM0MsbUJBQVM7QUFDVCxZQUFFLE9BQU8sRUFDTixLQUFLLGlCQUFpQixFQUN0QixLQUF1QixLQUFNO0FBQUEsUUFDbEMsQ0FBQztBQUVELGVBQU8sbUJBQW1CLE9BQU8sa0JBQWtCO0FBQUEsTUFDckQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLDZCQUFtQztBQUNqQyxVQUFNLE9BQU87QUFDYixVQUFNLFlBQW9CLEtBQUssWUFBWSxJQUFJO0FBQy9DLFVBQU0sWUFBb0IsS0FBSyxhQUFhLElBQUk7QUFDaEQsVUFBTSxTQUFTLElBQUksT0FBTyxJQUFJLGNBQWMsSUFBSTtBQUdoRCxVQUFNLHVCQUF1QixJQUFJLElBQUksS0FBSyx3QkFBd0IsS0FBSyxNQUFNLENBQUM7QUFDOUUseUJBQXFCLGFBQWEsSUFBSSxnQkFBZ0IsU0FBUztBQUMvRCxTQUFLLHdCQUF3QixLQUFLLFFBQVEscUJBQXFCLFNBQVMsQ0FBQztBQUV6RSxVQUFNLFlBQXFCLGNBQWMsTUFBTSxjQUFjO0FBRTdELGFBQVMsTUFBTSxHQUFHLE1BQU0sS0FBSyxXQUFXLFFBQVEsT0FBTyxHQUFHO0FBQ3hELFdBQUssV0FBVyxHQUFHLEVBQUUsVUFBVSxZQUFZLGdCQUFnQixTQUFTO0FBQ3BFLFdBQUssV0FBVyxHQUFHLEVBQUUsVUFBVSxPQUFPLFNBQVM7QUFDL0MsV0FBSyxXQUFXLEdBQUcsRUFBRSxRQUFRLEtBQUssS0FBSyxXQUFXLEdBQUcsRUFBRSxLQUFLO0FBQzVELFdBQUssV0FBVyxHQUFHLEVBQUUsVUFDbEIsS0FBSyxjQUFjLEVBQ25CLFlBQVksV0FBVztBQUFBLElBQzVCO0FBR0EsUUFBSSxjQUFjLE1BQU0sY0FBYyxPQUFPO0FBRTNDLFVBQUkseUJBQXlCLEVBQUU7QUFDL0IsVUFBSSwyQkFBMkIsRUFBRTtBQUNqQyxVQUFJO0FBQ0osVUFBSTtBQUVKLGVBQVMsTUFBTSxHQUFHLE1BQU0sS0FBSyxXQUFXLFFBQVEsT0FBTyxHQUFHO0FBRXhELFlBQUksY0FBYyxPQUFPO0FBQ3ZCLDBCQUFnQixLQUFLLFdBQVcsR0FBRyxFQUFFLFVBQVU7QUFBQSxZQUM3QyxvQkFBb0I7QUFBQSxVQUN0QjtBQUNBLGNBQUksY0FBYyxTQUFTLEdBQUc7QUFDNUIscUNBQXlCLHVCQUF1QjtBQUFBLGNBQzlDLEtBQUssV0FBVyxHQUFHLEVBQUU7QUFBQSxZQUN2QjtBQUNBLDBCQUFjLFNBQVMsV0FBVztBQUFBLFVBQ3BDO0FBQUEsUUFDRjtBQUdBLFlBQUksY0FBYyxJQUFJO0FBQ3BCLG1CQUFTLEtBQUssV0FBVyxHQUFHLEVBQUUsTUFDM0IsWUFBWSxFQUNaLE9BQU8sVUFBVSxZQUFZLENBQUM7QUFDakMsY0FBSSxXQUFXLElBQUk7QUFDakIsdUNBQTJCLHlCQUF5QjtBQUFBLGNBQ2xELEtBQUssV0FBVyxHQUFHLEVBQUU7QUFBQSxZQUN2QjtBQUNBLGlCQUFLLFdBQVcsR0FBRyxFQUFFLFFBQVE7QUFBQSxjQUMzQixLQUFLLFdBQVcsR0FBRyxFQUFFLE1BQU07QUFBQSxnQkFDekI7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBR0EsVUFBSSxjQUFjLFNBQVMsY0FBYyxJQUFJO0FBQzNDLGlDQUF5QixZQUFZLGdCQUFnQixJQUFJO0FBQ3pELGlDQUF5QixLQUFLO0FBQUEsTUFDaEMsV0FBVyxjQUFjLE1BQU0sY0FBYyxPQUFPO0FBRWxELCtCQUF1QixZQUFZLGdCQUFnQixJQUFJO0FBQ3ZELCtCQUF1QixLQUFLO0FBQUEsTUFDOUIsT0FBTztBQUVMLGlDQUF5QixPQUFPLHNCQUFzQixFQUFFLFlBQVksZ0JBQWdCLElBQUk7QUFDeEYsaUNBQXlCLE9BQU8sc0JBQXNCLEVBQUUsS0FBSztBQUFBLE1BQy9EO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxLQUFLLGNBQWMsS0FBSyxTQUFTLEdBQUc7QUFDdkMsZUFBUyxNQUFNLEdBQUcsTUFBTSxLQUFLLFdBQVcsUUFBUSxPQUFPLEdBQUc7QUFDeEQsWUFBSSxLQUFLLFdBQVcsR0FBRyxFQUFFLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRztBQUN2RCxlQUFLLFdBQVcsR0FBRyxFQUFFLFVBQVUsWUFBWSxnQkFBZ0IsS0FBSztBQUNoRSxlQUFLLFdBQVcsR0FBRyxFQUFFLFVBQVUsS0FBSztBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxpRUFBZSxvQkFBb0IsRUFBQzs7Ozs7OztVQ2xWcEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ0RpQztBQUNIO0FBRTlCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixNQUFJLCtEQUFvQixDQUFDO0FBQ3pCLE1BQUksNERBQWlCLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ltcHJvdmUvZGVzaWduX3Bvc2l0aW9ucy9ob29rLXN0YXR1cy1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ltcHJvdmUvZGVzaWduX3Bvc2l0aW9ucy9wb3NpdGlvbnMtbGlzdC1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ltcHJvdmUvZGVzaWduX3Bvc2l0aW9ucy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY2xhc3MgSG9va1N0YXR1c0hhbmRsZXIge1xyXG4gICRob29rU3RhdHVzOiBKUXVlcnk7XHJcblxyXG4gICRtb2R1bGVQb3NpdGlvbnNGb3JtOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLiRob29rU3RhdHVzID0gJCgnLmhvb2stc3dpdGNoLWFjdGlvbicpO1xyXG4gICAgdGhpcy4kbW9kdWxlUG9zaXRpb25zRm9ybSA9ICQoJyNtb2R1bGUtcG9zaXRpb25zLWZvcm0nKTtcclxuXHJcbiAgICB0aGlzLiRob29rU3RhdHVzLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzZWxmLnRvb2dsZUhvb2tTdGF0dXMoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvb2dsZSBob29rcyBzdGF0dXNcclxuICAgKi9cclxuICB0b29nbGVIb29rU3RhdHVzKCRob29rRWxlbWVudDogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcnM6IHsnY2FjaGUtY29udHJvbCc6ICduby1jYWNoZSd9LFxyXG4gICAgICB1cmw6IHRoaXMuJG1vZHVsZVBvc2l0aW9uc0Zvcm0uZGF0YSgndG9nZ2xlc3RhdHVzLXVybCcpLFxyXG4gICAgICBkYXRhOiB7aG9va0lkOiAkaG9va0VsZW1lbnQuZGF0YSgnaG9vay1pZCcpfSxcclxuICAgICAgc3VjY2VzcyhkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2hvd1N1Y2Nlc3NNZXNzYWdlKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICBjb25zdCAkaG9va01vZHVsZXNMaXN0ID0gJGhvb2tFbGVtZW50XHJcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuaG9vay1wYW5lbCcpXHJcbiAgICAgICAgICAgIC5maW5kKCcubW9kdWxlLWxpc3QsIC5tb2R1bGUtbGlzdC1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgJGhvb2tNb2R1bGVzTGlzdC5mYWRlVG8oNTAwLCBkYXRhLmhvb2tfc3RhdHVzID8gMSA6IDAuNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb29rU3RhdHVzSGFuZGxlcjtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmNsYXNzIFBvc2l0aW9uc0xpc3RIYW5kbGVyIHtcclxuICAkcGFuZWxTZWxlY3Rpb246IEpRdWVyeTtcclxuXHJcbiAgJHBhbmVsU2VsZWN0aW9uU2luZ2xlU2VsZWN0aW9uOiBKUXVlcnk7XHJcblxyXG4gICRwYW5lbFNlbGVjdGlvbk11bHRpcGxlU2VsZWN0aW9uOiBKUXVlcnk7XHJcblxyXG4gICRwYW5lbFNlbGVjdGlvbk9yaWdpbmFsWTogbnVtYmVyO1xyXG5cclxuICAkc2hvd01vZHVsZXM6IEpRdWVyeTtcclxuXHJcbiAgJG1vZHVsZXNMaXN0OiBKUXVlcnk7XHJcblxyXG4gICRob29rUG9zaXRpb246IEpRdWVyeTtcclxuXHJcbiAgJGhvb2tTZWFyY2g6IEpRdWVyeTtcclxuXHJcbiAgJG1vZHVsZVBvc2l0aW9uc0Zvcm06IEpRdWVyeTtcclxuXHJcbiAgJG1vZHVsZVVuaG9va0J1dHRvbjogSlF1ZXJ5O1xyXG5cclxuICAkbW9kdWxlQnV0dG9uc1VwZGF0ZTogSlF1ZXJ5O1xyXG5cclxuICAkdHJhbnNwbGFudE1vZHVsZUJ1dHRvbjogSlF1ZXJ5O1xyXG5cclxuICAkaG9va3NMaXN0OiBBcnJheTxSZWNvcmQ8c3RyaW5nLCBhbnk+PjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLiRwYW5lbFNlbGVjdGlvbiA9ICQoJyNtb2R1bGVzLXBvc2l0aW9uLXNlbGVjdGlvbi1wYW5lbCcpO1xyXG4gICAgdGhpcy4kcGFuZWxTZWxlY3Rpb25TaW5nbGVTZWxlY3Rpb24gPSAkKFxyXG4gICAgICAnI21vZHVsZXMtcG9zaXRpb24tc2luZ2xlLXNlbGVjdGlvbicsXHJcbiAgICApO1xyXG4gICAgdGhpcy4kcGFuZWxTZWxlY3Rpb25NdWx0aXBsZVNlbGVjdGlvbiA9ICQoXHJcbiAgICAgICcjbW9kdWxlcy1wb3NpdGlvbi1tdWx0aXBsZS1zZWxlY3Rpb24nLFxyXG4gICAgKTtcclxuICAgIGNvbnN0ICRhbGVydE1lc3NhZ2UgPSAkKCcjY29udGVudC1tZXNzYWdlLWJveCArIC5hbGVydCcpO1xyXG5cclxuICAgIHRoaXMuJHBhbmVsU2VsZWN0aW9uT3JpZ2luYWxZID0gPG51bWJlcj4gdGhpcy4kcGFuZWxTZWxlY3Rpb24ub2Zmc2V0KCk/LnRvcDtcclxuICAgIGlmICgkYWxlcnRNZXNzYWdlLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy4kcGFuZWxTZWxlY3Rpb25PcmlnaW5hbFkgKz0gPG51bWJlcj4gJGFsZXJ0TWVzc2FnZS5vdXRlckhlaWdodCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kc2hvd01vZHVsZXMgPSAkKCcjc2hvdy1tb2R1bGVzJyk7XHJcbiAgICB0aGlzLiRtb2R1bGVzTGlzdCA9ICQoJy5tb2R1bGVzLXBvc2l0aW9uLWNoZWNrYm94Jyk7XHJcbiAgICB0aGlzLiRob29rUG9zaXRpb24gPSAkKCcjaG9vay1wb3NpdGlvbicpO1xyXG4gICAgdGhpcy4kaG9va1NlYXJjaCA9ICQoJyNob29rLXNlYXJjaCcpO1xyXG4gICAgdGhpcy4kbW9kdWxlUG9zaXRpb25zRm9ybSA9ICQoJyNtb2R1bGUtcG9zaXRpb25zLWZvcm0nKTtcclxuICAgIHRoaXMuJG1vZHVsZVVuaG9va0J1dHRvbiA9ICQoJyN1bmhvb2stYnV0dG9uLXBvc2l0aW9uLWJvdHRvbScpO1xyXG4gICAgdGhpcy4kbW9kdWxlQnV0dG9uc1VwZGF0ZSA9ICQoJy5tb2R1bGUtYnV0dG9ucy11cGRhdGUgLmJ0bicpO1xyXG4gICAgdGhpcy4kaG9va3NMaXN0ID0gW107XHJcbiAgICB0aGlzLiR0cmFuc3BsYW50TW9kdWxlQnV0dG9uID0gJCgnLnRyYW5zcGxhbnQtbW9kdWxlLWJ1dHRvbicpO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlTGlzdCgpO1xyXG4gICAgdGhpcy5oYW5kbGVTb3J0YWJsZSgpO1xyXG5cclxuICAgIC8vIFRyaWdnZXIgc29tZSBldmVudHMgZm9yIHJlbG9hZGluZyBhbGwgcHJldmlvdXMgaG9va3NcclxuICAgIHRoaXMuJG1vZHVsZXNMaXN0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgdGhpcy4kbW9kdWxlc0xpc3QudHJpZ2dlcignc2Nyb2xsJyk7XHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1cImdlbmVyYWxbZW5hYmxlX3Rvc11cIl0nKS5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZUxpc3QoKTtcclxuICAgICAgdGhpcy5oYW5kbGVTb3J0YWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYWxsIGV2ZW50cyBmb3IgRGVzaWduIC0+IFBvc2l0aW9ucyBMaXN0XHJcbiAgICovXHJcbiAgaGFuZGxlTGlzdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCAkc2Nyb2xsVG9wID0gPG51bWJlcj4kKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uLmNzcyhcclxuICAgICAgICAndG9wJyxcclxuICAgICAgICAkc2Nyb2xsVG9wIDwgMjAgPyAwIDogJHNjcm9sbFRvcCAtIHNlbGYuJHBhbmVsU2VsZWN0aW9uT3JpZ2luYWxZLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi4kbW9kdWxlc0xpc3Qub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgY29uc3QgJGNoZWNrZWRDb3VudCA9IHNlbGYuJG1vZHVsZXNMaXN0LmZpbHRlcignOmNoZWNrZWQnKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAoJGNoZWNrZWRDb3VudCA9PT0gMCkge1xyXG4gICAgICAgIHNlbGYuJG1vZHVsZVVuaG9va0J1dHRvbi5oaWRlKCk7XHJcbiAgICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb24uaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uU2luZ2xlU2VsZWN0aW9uLmhpZGUoKTtcclxuICAgICAgICBzZWxmLiRwYW5lbFNlbGVjdGlvbk11bHRpcGxlU2VsZWN0aW9uLmhpZGUoKTtcclxuICAgICAgfSBlbHNlIGlmICgkY2hlY2tlZENvdW50ID09PSAxKSB7XHJcbiAgICAgICAgc2VsZi4kbW9kdWxlVW5ob29rQnV0dG9uLnNob3coKTtcclxuICAgICAgICBzZWxmLiRwYW5lbFNlbGVjdGlvbi5zaG93KCk7XHJcbiAgICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb25TaW5nbGVTZWxlY3Rpb24uc2hvdygpO1xyXG4gICAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uTXVsdGlwbGVTZWxlY3Rpb24uaGlkZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuJG1vZHVsZVVuaG9va0J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2VsZi4kcGFuZWxTZWxlY3Rpb24uc2hvdygpO1xyXG4gICAgICAgIHNlbGYuJHBhbmVsU2VsZWN0aW9uU2luZ2xlU2VsZWN0aW9uLmhpZGUoKTtcclxuICAgICAgICBzZWxmLiRwYW5lbFNlbGVjdGlvbk11bHRpcGxlU2VsZWN0aW9uLnNob3coKTtcclxuICAgICAgICAkKCcjbW9kdWxlcy1wb3NpdGlvbi1zZWxlY3Rpb24tY291bnQnKS5odG1sKFxyXG4gICAgICAgICAgPHN0cmluZz4oPHVua25vd24+JGNoZWNrZWRDb3VudCksXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi4kcGFuZWxTZWxlY3Rpb24uZmluZCgnYnV0dG9uJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAkKCdidXR0b25bbmFtZT1cInVuaG9va2Zvcm1cIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi4kaG9va3NMaXN0ID0gW107XHJcbiAgICAkKCdzZWN0aW9uLmhvb2stcGFuZWwgLmhvb2stbmFtZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIHNlbGYuJGhvb2tzTGlzdC5wdXNoKHtcclxuICAgICAgICB0aXRsZTogJHRoaXMuaHRtbCgpLFxyXG4gICAgICAgIGVsZW1lbnQ6ICR0aGlzLFxyXG4gICAgICAgIGNvbnRhaW5lcjogJHRoaXMucGFyZW50cygnLmhvb2stcGFuZWwnKSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRzaG93TW9kdWxlcy5zZWxlY3QyKCk7XHJcbiAgICBzZWxmLiRzaG93TW9kdWxlcy5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBzZWxmLm1vZHVsZXNQb3NpdGlvbkZpbHRlckhvb2tzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLiRob29rUG9zaXRpb24ub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgc2VsZi5tb2R1bGVzUG9zaXRpb25GaWx0ZXJIb29rcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi4kaG9va1NlYXJjaC5vbignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgIHNlbGYubW9kdWxlc1Bvc2l0aW9uRmlsdGVySG9va3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbHRlciBtb2R1bGVzIGxpc3Qgb24gdGhlIHBhZ2UgbG9hZFxyXG4gICAgc2VsZi5tb2R1bGVzUG9zaXRpb25GaWx0ZXJIb29rcygpO1xyXG5cclxuICAgIHNlbGYuJGhvb2tTZWFyY2gub24oJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG5cclxuICAgICAgcmV0dXJuIGtleUNvZGUgIT09IDEzO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmhvb2stY2hlY2tlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChgLmhvb2skeyQodGhpcykuZGF0YSgnaG9vay1pZCcpfWApLnByb3AoXHJcbiAgICAgICAgJ2NoZWNrZWQnLFxyXG4gICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcpLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi4kbW9kdWxlc0xpc3Qub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKGAjR2hvb2skeyQodGhpcykuZGF0YSgnaG9vay1pZCcpfWApLnByb3AoXHJcbiAgICAgICAgJ2NoZWNrZWQnLFxyXG4gICAgICAgICQoYC5ob29rJHskKHRoaXMpLmRhdGEoJ2hvb2staWQnKX06bm90KDpjaGVja2VkKWApLmxlbmd0aCA9PT0gMCxcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYuJG1vZHVsZUJ1dHRvbnNVcGRhdGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcclxuICAgICAgY29uc3QgJGN1cnJlbnQgPSAkYnRuLmNsb3Nlc3QoJy5tb2R1bGUtaXRlbScpO1xyXG4gICAgICBsZXQgJGRlc3RpbmF0aW9uO1xyXG5cclxuICAgICAgaWYgKCRidG4uZGF0YSgnd2F5JykpIHtcclxuICAgICAgICAkZGVzdGluYXRpb24gPSAkY3VycmVudC5uZXh0KCcubW9kdWxlLWl0ZW0nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkZGVzdGluYXRpb24gPSAkY3VycmVudC5wcmV2KCcubW9kdWxlLWl0ZW0nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCRkZXN0aW5hdGlvbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkYnRuLmRhdGEoJ3dheScpKSB7XHJcbiAgICAgICAgJGN1cnJlbnQuaW5zZXJ0QWZ0ZXIoJGRlc3RpbmF0aW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkY3VycmVudC5pbnNlcnRCZWZvcmUoJGRlc3RpbmF0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi51cGRhdGVQb3NpdGlvbnMoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaG9va0lkOiAkYnRuLmRhdGEoJ2hvb2staWQnKSxcclxuICAgICAgICAgIG1vZHVsZUlkOiAkYnRuLmRhdGEoJ21vZHVsZS1pZCcpLFxyXG4gICAgICAgICAgd2F5OiAkYnRuLmRhdGEoJ3dheScpLFxyXG4gICAgICAgICAgcG9zaXRpb25zOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICRidG4uY2xvc2VzdCgndWwnKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIHNvcnRhYmxlIGV2ZW50c1xyXG4gICAqL1xyXG4gIGhhbmRsZVNvcnRhYmxlKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnLnNvcnRhYmxlJykuc29ydGFibGUoe1xyXG4gICAgICBmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcclxuICAgICAgc3RhcnQoZTogSlF1ZXJ5RXZlbnRPYmplY3QsIHVpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdwcmV2aW91cy1pbmRleCcsIHVpLml0ZW0uaW5kZXgoKSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZSgkZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LCB1aTogUmVjb3JkPHN0cmluZywgYW55Pikge1xyXG4gICAgICAgIGNvbnN0IFtob29rSWQsIG1vZHVsZUlkXSA9IHVpLml0ZW0uYXR0cignaWQnKS5zcGxpdCgnXycpO1xyXG5cclxuICAgICAgICBjb25zdCAkZGF0YSA9IHtcclxuICAgICAgICAgIGhvb2tJZCxcclxuICAgICAgICAgIG1vZHVsZUlkLFxyXG4gICAgICAgICAgd2F5OiAkKHRoaXMpLmRhdGEoJ3ByZXZpb3VzLWluZGV4JykgPCB1aS5pdGVtLmluZGV4KCkgPyAxIDogMCxcclxuICAgICAgICAgIHBvc2l0aW9uczogW10sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2VsZi51cGRhdGVQb3NpdGlvbnMoJGRhdGEsICQoJGV2ZW50LnRhcmdldCkpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQb3NpdGlvbnMoJGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4sICRsaXN0OiBKUXVlcnk8RWxlbWVudD4pOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJC5lYWNoKCRsaXN0LmNoaWxkcmVuKCksIChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAkZGF0YS5wb3NpdGlvbnMucHVzaCgkKGVsZW1lbnQpLmF0dHIoJ2lkJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7J2NhY2hlLWNvbnRyb2wnOiAnbm8tY2FjaGUnfSxcclxuICAgICAgdXJsOiBzZWxmLiRtb2R1bGVQb3NpdGlvbnNGb3JtLmRhdGEoJ3VwZGF0ZS11cmwnKSxcclxuICAgICAgZGF0YTogJGRhdGEsXHJcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICBsZXQgc3RhcnQgPSAwO1xyXG4gICAgICAgICQuZWFjaCgkbGlzdC5jaGlsZHJlbigpLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIHN0YXJ0ICs9IDE7XHJcbiAgICAgICAgICAkKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIC5maW5kKCcuaW5kZXgtcG9zaXRpb24nKVxyXG4gICAgICAgICAgICAuaHRtbCg8c3RyaW5nPig8dW5rbm93bj5zdGFydCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3aW5kb3cuc2hvd1N1Y2Nlc3NNZXNzYWdlKHdpbmRvdy51cGRhdGVfc3VjY2Vzc19tc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgaG9va3MgLyBtb2R1bGVzIHNlYXJjaCBhbmQgZXZlcnl0aGluZ1xyXG4gICAqIGFib3V0IGhvb2tzIHBvc2l0aW9ucy5cclxuICAgKi9cclxuICBtb2R1bGVzUG9zaXRpb25GaWx0ZXJIb29rcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgJGhvb2tOYW1lID0gPHN0cmluZz5zZWxmLiRob29rU2VhcmNoLnZhbCgpO1xyXG4gICAgY29uc3QgJG1vZHVsZUlkID0gPHN0cmluZz5zZWxmLiRzaG93TW9kdWxlcy52YWwoKTtcclxuICAgIGNvbnN0ICRyZWdleCA9IG5ldyBSZWdFeHAoYCgkeyRob29rTmFtZX0pYCwgJ2dpJyk7XHJcblxyXG4gICAgLy8gVXBkYXRlIFwiVHJhbnNwbGFudCBtb2R1bGVcIiBidXR0b25cclxuICAgIGNvbnN0IHRyYW5zcGxhbnRNb2R1bGVIcmVmID0gbmV3IFVSTCh0aGlzLiR0cmFuc3BsYW50TW9kdWxlQnV0dG9uLnByb3AoJ2hyZWYnKSk7XHJcbiAgICB0cmFuc3BsYW50TW9kdWxlSHJlZi5zZWFyY2hQYXJhbXMuc2V0KCdzaG93X21vZHVsZXMnLCAkbW9kdWxlSWQpO1xyXG4gICAgdGhpcy4kdHJhbnNwbGFudE1vZHVsZUJ1dHRvbi5hdHRyKCdocmVmJywgdHJhbnNwbGFudE1vZHVsZUhyZWYudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgY29uc3QgaXNWaXNpYmxlOiBib29sZWFuID0gJGhvb2tOYW1lID09PSAnJyAmJiAkbW9kdWxlSWQgPT09ICdhbGwnO1xyXG5cclxuICAgIGZvciAobGV0ICRpZCA9IDA7ICRpZCA8IHNlbGYuJGhvb2tzTGlzdC5sZW5ndGg7ICRpZCArPSAxKSB7XHJcbiAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lci50b2dnbGVDbGFzcygnaG9vay12aXNpYmxlJywgaXNWaXNpYmxlKTtcclxuICAgICAgc2VsZi4kaG9va3NMaXN0WyRpZF0uY29udGFpbmVyLnRvZ2dsZShpc1Zpc2libGUpO1xyXG4gICAgICBzZWxmLiRob29rc0xpc3RbJGlkXS5lbGVtZW50Lmh0bWwoc2VsZi4kaG9va3NMaXN0WyRpZF0udGl0bGUpO1xyXG4gICAgICBzZWxmLiRob29rc0xpc3RbJGlkXS5jb250YWluZXJcclxuICAgICAgICAuZmluZCgnLm1vZHVsZS1pdGVtJylcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hpZ2hsaWdodCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhdmUgc2VsZWN0IGEgaG9vayBuYW1lIG9yIGEgbW9kdWxlIGlkXHJcbiAgICBpZiAoJGhvb2tOYW1lICE9PSAnJyB8fCAkbW9kdWxlSWQgIT09ICdhbGwnKSB7XHJcbiAgICAgIC8vIFByZXBhcmUgc2V0IG9mIG1hdGNoZWQgZWxlbWVudHNcclxuICAgICAgbGV0ICRob29rc1RvU2hvd0Zyb21Nb2R1bGUgPSAkKCk7XHJcbiAgICAgIGxldCAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUgPSAkKCk7XHJcbiAgICAgIGxldCAkY3VycmVudEhvb2tzO1xyXG4gICAgICBsZXQgJHN0YXJ0O1xyXG5cclxuICAgICAgZm9yIChsZXQgJGlkID0gMDsgJGlkIDwgc2VsZi4kaG9va3NMaXN0Lmxlbmd0aDsgJGlkICs9IDEpIHtcclxuICAgICAgICAvLyBQcmVwYXJlIGhpZ2hsaWdodCB3aGVuIG9uZSBtb2R1bGUgaXMgc2VsZWN0ZWRcclxuICAgICAgICBpZiAoJG1vZHVsZUlkICE9PSAnYWxsJykge1xyXG4gICAgICAgICAgJGN1cnJlbnRIb29rcyA9IHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lci5maW5kKFxyXG4gICAgICAgICAgICBgLm1vZHVsZS1wb3NpdGlvbi0keyRtb2R1bGVJZH1gLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmICgkY3VycmVudEhvb2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJGhvb2tzVG9TaG93RnJvbU1vZHVsZSA9ICRob29rc1RvU2hvd0Zyb21Nb2R1bGUuYWRkKFxyXG4gICAgICAgICAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lcixcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgJGN1cnJlbnRIb29rcy5hZGRDbGFzcygnaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQcmVwYXJlIGhpZ2hsaWdodCB3aGVuIHRoZXJlIGlzIGEgaG9vayBuYW1lXHJcbiAgICAgICAgaWYgKCRob29rTmFtZSAhPT0gJycpIHtcclxuICAgICAgICAgICRzdGFydCA9IHNlbGYuJGhvb2tzTGlzdFskaWRdLnRpdGxlXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5zZWFyY2goJGhvb2tOYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgaWYgKCRzdGFydCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgJGhvb2tzVG9TaG93RnJvbUhvb2tOYW1lID0gJGhvb2tzVG9TaG93RnJvbUhvb2tOYW1lLmFkZChcclxuICAgICAgICAgICAgICBzZWxmLiRob29rc0xpc3RbJGlkXS5jb250YWluZXIsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmVsZW1lbnQuaHRtbChcclxuICAgICAgICAgICAgICBzZWxmLiRob29rc0xpc3RbJGlkXS50aXRsZS5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgICAgJHJlZ2V4LFxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0XCI+JDE8L3NwYW4+JyxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTm90aGluZyBzZWxlY3RlZFxyXG4gICAgICBpZiAoJG1vZHVsZUlkID09PSAnYWxsJyAmJiAkaG9va05hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgJGhvb2tzVG9TaG93RnJvbUhvb2tOYW1lLnRvZ2dsZUNsYXNzKCdob29rLXZpc2libGUnLCB0cnVlKTtcclxuICAgICAgICAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUuc2hvdygpO1xyXG4gICAgICB9IGVsc2UgaWYgKCRob29rTmFtZSA9PT0gJycgJiYgJG1vZHVsZUlkICE9PSAnYWxsJykge1xyXG4gICAgICAgIC8vIEhhdmUgbm8gaG9vayBidWcgaGF2ZSBhIG1vZHVsZVxyXG4gICAgICAgICRob29rc1RvU2hvd0Zyb21Nb2R1bGUudG9nZ2xlQ2xhc3MoJ2hvb2stdmlzaWJsZScsIHRydWUpO1xyXG4gICAgICAgICRob29rc1RvU2hvd0Zyb21Nb2R1bGUuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEJvdGggc2VsZWN0ZWRcclxuICAgICAgICAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUuZmlsdGVyKCRob29rc1RvU2hvd0Zyb21Nb2R1bGUpLnRvZ2dsZUNsYXNzKCdob29rLXZpc2libGUnLCB0cnVlKTtcclxuICAgICAgICAkaG9va3NUb1Nob3dGcm9tSG9va05hbWUuZmlsdGVyKCRob29rc1RvU2hvd0Zyb21Nb2R1bGUpLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZi4kaG9va1Bvc2l0aW9uLnByb3AoJ2NoZWNrZWQnKSkge1xyXG4gICAgICBmb3IgKGxldCAkaWQgPSAwOyAkaWQgPCBzZWxmLiRob29rc0xpc3QubGVuZ3RoOyAkaWQgKz0gMSkge1xyXG4gICAgICAgIGlmIChzZWxmLiRob29rc0xpc3RbJGlkXS5jb250YWluZXIuaXMoJy5ob29rLXBvc2l0aW9uJykpIHtcclxuICAgICAgICAgIHNlbGYuJGhvb2tzTGlzdFskaWRdLmNvbnRhaW5lci50b2dnbGVDbGFzcygnaG9vay12aXNpYmxlJywgZmFsc2UpO1xyXG4gICAgICAgICAgc2VsZi4kaG9va3NMaXN0WyRpZF0uY29udGFpbmVyLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvc2l0aW9uc0xpc3RIYW5kbGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBQb3NpdGlvbnNMaXN0SGFuZGxlciBmcm9tICcuL3Bvc2l0aW9ucy1saXN0LWhhbmRsZXInO1xyXG5pbXBvcnQgSG9va1N0YXR1c0hhbmRsZXIgZnJvbSAnLi9ob29rLXN0YXR1cy1oYW5kbGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBQb3NpdGlvbnNMaXN0SGFuZGxlcigpO1xyXG4gIG5ldyBIb29rU3RhdHVzSGFuZGxlcigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9