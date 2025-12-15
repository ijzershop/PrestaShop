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
/*!***************************************!*\
  !*** ./js/pages/sql-manager/index.ts ***!
  \***************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixLQUFLLE9BQU8sS0FBSyxZQUFZLENBQUM7QUFBQSxVQUNuQztBQUFBLFFBQ0o7QUFFRixlQUFPLEtBQUssT0FBTyxFQUFFLE9BQU8sSUFBSTtBQUFBLE1BQ2xDLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0Esa0JBQWtCLE9BQWdDO0FBQ2hELFVBQU0sa0JBQWtCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLGlCQUFpQjtBQUV4RSxRQUFJLGdCQUFnQixXQUFXLEdBQUc7QUFDaEMsWUFBTSxDQUFDLENBQUMsTUFBTSxNQUFNLEVBQUUsS0FBSyxzQkFBc0IsQ0FBQztBQUVsRDtBQUFBLElBQ0Y7QUFFQSxTQUFLLFdBQW1CLGdCQUFnQixJQUFJLENBQUM7QUFBQSxFQUMvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLHdCQUF3QixPQUFnQztBQUN0RCxTQUFLLFdBQVcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxFQUFFLEtBQUssUUFBUSxDQUFDO0FBQUEsRUFDaEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQSxXQUFXLE1BQW9CO0FBQzdCLFVBQU0sY0FBYyxDQUFDLENBQUMsa0JBQWtCO0FBQ3hDLGdCQUFZLElBQUksR0FBRyxZQUFZLElBQUksS0FBSyxNQUFNO0FBQUEsRUFDaEQ7QUFDRjtBQUVBLENBQUMsQ0FBQyxNQUFNO0FBQ04sTUFBSSxlQUFlO0FBQ3JCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3NxbC1tYW5hZ2VyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuY2xhc3MgU3FsTWFuYWdlclBhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgcmVxdWVzdFNxbEdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ3NxbF9yZXF1ZXN0Jyk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uKCkpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRHcmlkQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNTdWJtaXRCdXR0b25FbmFibGVyRXh0ZW5zaW9uKCkpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnLmpzLWRiLXRhYmxlcy1zZWxlY3QnLCAoKSA9PiB0aGlzLnJlbG9hZERiVGFibGVDb2x1bW5zKCksXHJcbiAgICApO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1hZGQtZGItdGFibGUtdG8tcXVlcnktYnRuJywgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5hZGREYlRhYmxlVG9RdWVyeShldmVudCksXHJcbiAgICApO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1hZGQtZGItdGFibGUtY29sdW1uLXRvLXF1ZXJ5LWJ0bicsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgdGhpcy5hZGREYlRhYmxlQ29sdW1uVG9RdWVyeShldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbG9hZCBkYXRhYmFzZSB0YWJsZSBjb2x1bW5zXHJcbiAgICovXHJcbiAgcmVsb2FkRGJUYWJsZUNvbHVtbnMoKSB7XHJcbiAgICBjb25zdCAkc2VsZWN0ZWRPcHRpb24gPSAkKCcuanMtZGItdGFibGVzLXNlbGVjdCcpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpO1xyXG4gICAgY29uc3QgJHRhYmxlID0gJCgnLmpzLXRhYmxlLWNvbHVtbnMnKTtcclxuXHJcbiAgICAkLmFqYXgoJHNlbGVjdGVkT3B0aW9uLmRhdGEoJ3RhYmxlLWNvbHVtbnMtdXJsJykpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICQoJy5qcy10YWJsZS1hbGVydCcpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHJcbiAgICAgIGNvbnN0IHtjb2x1bW5zfSA9IHJlc3BvbnNlO1xyXG5cclxuICAgICAgJHRhYmxlLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgJHRhYmxlLmZpbmQoJ3Rib2R5JykuZW1wdHkoKTtcclxuXHJcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiB7XHJcbiAgICAgICAgY29uc3QgJHJvdyA9ICQoJzx0cj4nKVxyXG4gICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JykuaHRtbChjb2x1bW4ubmFtZSkpXHJcbiAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKS5odG1sKGNvbHVtbi50eXBlKSlcclxuICAgICAgICAgIC5hcHBlbmQoXHJcbiAgICAgICAgICAgICQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgIC5hZGRDbGFzcygndGV4dC1yaWdodCcpXHJcbiAgICAgICAgICAgICAgLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICQoJzxidXR0b24+JylcclxuICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFxyXG4gICAgICAgICAgICAgICAgICAgICdidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqcy1hZGQtZGItdGFibGUtY29sdW1uLXRvLXF1ZXJ5LWJ0bicsXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtY29sdW1uJywgY29sdW1uLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgIC5odG1sKCR0YWJsZS5kYXRhKCdhY3Rpb24tYnRuJykpLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAkdGFibGUuZmluZCgndGJvZHknKS5hcHBlbmQoJHJvdyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2VsZWN0ZWQgZGF0YWJhc2UgdGFibGUgbmFtZSB0byBTUUwgcXVlcnkgaW5wdXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIGFkZERiVGFibGVUb1F1ZXJ5KGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgJHNlbGVjdGVkT3B0aW9uID0gJCgnLmpzLWRiLXRhYmxlcy1zZWxlY3QnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKTtcclxuXHJcbiAgICBpZiAoJHNlbGVjdGVkT3B0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBhbGVydCgkKGV2ZW50LnRhcmdldCkuZGF0YSgnY2hvb3NlLXRhYmxlLW1lc3NhZ2UnKSk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRUb1F1ZXJ5KDxzdHJpbmc+JHNlbGVjdGVkT3B0aW9uLnZhbCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0YWJsZSBjb2x1bW4gdG8gU1FMIHF1ZXJ5IGlucHV0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBhZGREYlRhYmxlQ29sdW1uVG9RdWVyeShldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkVG9RdWVyeSgkKGV2ZW50LnRhcmdldCkuZGF0YSgnY29sdW1uJykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGRhdGEgdG8gU1FMIHF1ZXJ5IGlucHV0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxyXG4gICAqL1xyXG4gIGFkZFRvUXVlcnkoZGF0YTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCAkcXVlcnlJbnB1dCA9ICQoJyNzcWxfcmVxdWVzdF9zcWwnKTtcclxuICAgICRxdWVyeUlucHV0LnZhbChgJHskcXVlcnlJbnB1dC52YWwoKX0gJHtkYXRhfWApO1xyXG4gIH1cclxufVxyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IFNxbE1hbmFnZXJQYWdlKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=