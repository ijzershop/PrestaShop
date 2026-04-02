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
/*!***************************************!*\
  !*** ./js/pages/sql-manager/index.ts ***!
  \***************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

class SqlManagerPage {
  constructor() {
    const requestSqlGrid = new window.prestashop.component.Grid("sql_request");
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
    requestSqlGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
    $(document).on(
      "change",
      ".js-db-tables-select",
      () => this.reloadDbTableColumns()
    );
    $(document).on(
      "click",
      ".js-add-db-table-to-query-btn",
      (event) => this.addDbTableToQuery(event)
    );
    $(document).on("click", ".js-add-db-table-column-to-query-btn", (event) => {
      this.addDbTableColumnToQuery(event);
    });
  }
  /**
   * Reload database table columns
   */
  reloadDbTableColumns() {
    const $selectedOption = $(".js-db-tables-select").find("option:selected");
    const $table = $(".js-table-columns");
    $.ajax($selectedOption.data("table-columns-url")).then((response) => {
      $(".js-table-alert").addClass("d-none");
      const { columns } = response;
      $table.removeClass("d-none");
      $table.find("tbody").empty();
      columns.forEach((column) => {
        const $row = $("<tr>").append($("<td>").html(column.name)).append($("<td>").html(column.type)).append(
          $("<td>").addClass("text-right").append(
            $("<button>").addClass(
              "btn btn-sm btn-outline-secondary js-add-db-table-column-to-query-btn"
            ).attr("data-column", column.name).html($table.data("action-btn"))
          )
        );
        $table.find("tbody").append($row);
      });
    });
  }
  /**
   * Add selected database table name to SQL query input
   *
   * @param event
   */
  addDbTableToQuery(event) {
    const $selectedOption = $(".js-db-tables-select").find("option:selected");
    if ($selectedOption.length === 0) {
      alert($(event.target).data("choose-table-message"));
      return;
    }
    this.addToQuery($selectedOption.val());
  }
  /**
   * Add table column to SQL query input
   *
   * @param event
   */
  addDbTableColumnToQuery(event) {
    this.addToQuery($(event.target).data("column"));
  }
  /**
   * Add data to SQL query input
   *
   * @param {String} data
   */
  addToQuery(data) {
    const $queryInput = $("#sql_request_sql");
    $queryInput.val(`${$queryInput.val()} ${data}`);
  }
}
$(() => {
  new SqlManagerPage();
});

})();

window.sql_manager = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFDbEMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQSxrQkFBa0IsT0FBZ0M7QUFDaEQsVUFBTSxrQkFBa0IsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEtBQUssaUJBQWlCO0FBRXhFLFFBQUksZ0JBQWdCLFdBQVcsR0FBRztBQUNoQyxZQUFNLENBQUMsQ0FBQyxNQUFNLE1BQU0sRUFBRSxLQUFLLHNCQUFzQixDQUFDO0FBRWxEO0FBQUEsSUFDRjtBQUVBLFNBQUssV0FBbUIsZ0JBQWdCLElBQUksQ0FBQztBQUFBLEVBQy9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0Esd0JBQXdCLE9BQWdDO0FBQ3RELFNBQUssV0FBVyxDQUFDLENBQUMsTUFBTSxNQUFNLEVBQUUsS0FBSyxRQUFRLENBQUM7QUFBQSxFQUNoRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLFdBQVcsTUFBb0I7QUFDN0IsVUFBTSxjQUFjLENBQUMsQ0FBQyxrQkFBa0I7QUFDeEMsZ0JBQVksSUFBSSxHQUFHLFlBQVksSUFBSSxLQUFLLE1BQU07QUFBQSxFQUNoRDtBQUNGO0FBRUEsQ0FBQyxDQUFDLE1BQU07QUFDTixNQUFJLGVBQWU7QUFDckIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvc3FsLW1hbmFnZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNsYXNzIFNxbE1hbmFnZXJQYWdlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RTcWxHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdzcWxfcmVxdWVzdCcpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlNvcnRpbmdFeHRlbnNpb24oKSk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0R3JpZEFjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5qcy1kYi10YWJsZXMtc2VsZWN0JywgKCkgPT4gdGhpcy5yZWxvYWREYlRhYmxlQ29sdW1ucygpLFxyXG4gICAgKTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYWRkLWRiLXRhYmxlLXRvLXF1ZXJ5LWJ0bicsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMuYWRkRGJUYWJsZVRvUXVlcnkoZXZlbnQpLFxyXG4gICAgKTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYWRkLWRiLXRhYmxlLWNvbHVtbi10by1xdWVyeS1idG4nLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuYWRkRGJUYWJsZUNvbHVtblRvUXVlcnkoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWxvYWQgZGF0YWJhc2UgdGFibGUgY29sdW1uc1xyXG4gICAqL1xyXG4gIHJlbG9hZERiVGFibGVDb2x1bW5zKCkge1xyXG4gICAgY29uc3QgJHNlbGVjdGVkT3B0aW9uID0gJCgnLmpzLWRiLXRhYmxlcy1zZWxlY3QnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKTtcclxuICAgIGNvbnN0ICR0YWJsZSA9ICQoJy5qcy10YWJsZS1jb2x1bW5zJyk7XHJcblxyXG4gICAgJC5hamF4KCRzZWxlY3RlZE9wdGlvbi5kYXRhKCd0YWJsZS1jb2x1bW5zLXVybCcpKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAkKCcuanMtdGFibGUtYWxlcnQnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcblxyXG4gICAgICBjb25zdCB7Y29sdW1uc30gPSByZXNwb25zZTtcclxuXHJcbiAgICAgICR0YWJsZS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICR0YWJsZS5maW5kKCd0Ym9keScpLmVtcHR5KCk7XHJcblxyXG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbjogUmVjb3JkPHN0cmluZywgYW55PikgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRyb3cgPSAkKCc8dHI+JylcclxuICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpLmh0bWwoY29sdW1uLm5hbWUpKVxyXG4gICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JykuaHRtbChjb2x1bW4udHlwZSkpXHJcbiAgICAgICAgICAuYXBwZW5kKFxyXG4gICAgICAgICAgICAkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3RleHQtcmlnaHQnKVxyXG4gICAgICAgICAgICAgIC5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAkKCc8YnV0dG9uPicpXHJcbiAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcclxuICAgICAgICAgICAgICAgICAgICAnYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkganMtYWRkLWRiLXRhYmxlLWNvbHVtbi10by1xdWVyeS1idG4nLFxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLWNvbHVtbicsIGNvbHVtbi5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAuaHRtbCgkdGFibGUuZGF0YSgnYWN0aW9uLWJ0bicpKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgJHRhYmxlLmZpbmQoJ3Rib2R5JykuYXBwZW5kKCRyb3cpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHNlbGVjdGVkIGRhdGFiYXNlIHRhYmxlIG5hbWUgdG8gU1FMIHF1ZXJ5IGlucHV0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBhZGREYlRhYmxlVG9RdWVyeShldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRzZWxlY3RlZE9wdGlvbiA9ICQoJy5qcy1kYi10YWJsZXMtc2VsZWN0JykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJyk7XHJcblxyXG4gICAgaWYgKCRzZWxlY3RlZE9wdGlvbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgYWxlcnQoJChldmVudC50YXJnZXQpLmRhdGEoJ2Nob29zZS10YWJsZS1tZXNzYWdlJykpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkVG9RdWVyeSg8c3RyaW5nPiRzZWxlY3RlZE9wdGlvbi52YWwoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGFibGUgY29sdW1uIHRvIFNRTCBxdWVyeSBpbnB1dFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgYWRkRGJUYWJsZUNvbHVtblRvUXVlcnkoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZFRvUXVlcnkoJChldmVudC50YXJnZXQpLmRhdGEoJ2NvbHVtbicpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBkYXRhIHRvIFNRTCBxdWVyeSBpbnB1dFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcclxuICAgKi9cclxuICBhZGRUb1F1ZXJ5KGRhdGE6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgJHF1ZXJ5SW5wdXQgPSAkKCcjc3FsX3JlcXVlc3Rfc3FsJyk7XHJcbiAgICAkcXVlcnlJbnB1dC52YWwoYCR7JHF1ZXJ5SW5wdXQudmFsKCl9ICR7ZGF0YX1gKTtcclxuICB9XHJcbn1cclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBTcWxNYW5hZ2VyUGFnZSgpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9