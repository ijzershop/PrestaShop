!function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=316)}({1:function(n,e){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(n){"object"==typeof window&&(t=window)}n.exports=t},10:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){var e=this;return r(this,n),{extend:function(n){return e.extend(n)}}}return o(n,[{key:"extend",value:function(n){var e=this;n.getContainer().on("click",".js-bulk-action-submit-btn",function(t){e.submit(t,n)})}},{key:"submit",value:function(n,e){var t=a(n.currentTarget),r=t.data("confirm-message");if(!(void 0!==r&&0<r.length)||confirm(r)){var o=a("#"+e.getId()+"_filter_form");o.attr("action",t.data("form-url")),o.attr("method",t.data("form-method")),o.submit()}}}]),n}();e.a=i},11:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){r(this,n)}return o(n,[{key:"extend",value:function(n){n.getContainer().on("click",".js-submit-row-action",function(n){n.preventDefault();var e=a(n.currentTarget),t=e.data("confirm-message");if(!t.length||confirm(t)){var r=e.data("method"),o=["GET","POST"].includes(r),i=a("<form>",{action:e.data("url"),method:o?r:"POST"}).appendTo("body");o||i.append(a("<input>",{type:"_hidden",name:"_method",value:r})),i.submit()}})}}]),n}();e.a=i},12:function(n,e,t){"use strict";(function(n){function t(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),o=n.$,a=function(){function n(e){t(this,n),this.selector=".ps-sortable-column",this.columns=o(e).find(this.selector)}return r(n,[{key:"attach",value:function(){var n=this;this.columns.on("click",function(e){var t=o(e.delegateTarget);n._sortByColumn(t,n._getToggledSortDirection(t))})}},{key:"sortBy",value:function(n,e){var t=this.columns.is('[data-sort-col-name="'+n+'"]');if(!t)throw new Error('Cannot sort by "'+n+'": invalid column');this._sortByColumn(t,e)}},{key:"_sortByColumn",value:function(n,e){window.location=this._getUrl(n.data("sortColName"),"desc"===e?"desc":"asc",n.data("sortPrefix"))}},{key:"_getToggledSortDirection",value:function(n){return"asc"===n.data("sortDirection")?"desc":"asc"}},{key:"_getUrl",value:function(n,e,t){var r=new URL(window.location.href),o=r.searchParams;return t?(o.set(t+"[orderBy]",n),o.set(t+"[sortOrder]",e)):(o.set("orderBy",n),o.set("sortOrder",e)),r.toString()}}]),n}();e.a=a}).call(e,t(1))},13:function(n,e,t){"use strict";(function(n){/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
var t=n.$,r=function(n,e){t.post(n).then(function(){return window.location.assign(e)})};e.a=r}).call(e,t(1))},14:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(e){r(this,n),e=e||{},this.localeItemSelector=e.localeItemSelector||".js-locale-item",this.localeButtonSelector=e.localeButtonSelector||".js-locale-btn",this.localeInputSelector=e.localeInputSelector||".js-locale-input",a("body").on("click",this.localeItemSelector,this.toggleInputs.bind(this))}return o(n,[{key:"toggleInputs",value:function(n){var e=a(n.target),t=e.closest("form"),r=e.data("locale"),o=t.find(this.localeButtonSelector),i=o.data("change-language-url");o.text(r),t.find(this.localeInputSelector).addClass("d-none"),t.find(this.localeInputSelector+".js-locale-"+r).removeClass("d-none"),i&&this._saveSelectedLanguage(i,r)}},{key:"_saveSelectedLanguage",value:function(n,e){a.post({url:n,data:{language_iso_code:e}})}}]),n}();e.a=i},15:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){r(this,n)}return o(n,[{key:"extend",value:function(n){n.getContainer().on("click",".js-link-row-action",function(n){var e=a(n.currentTarget).data("confirm-message");e.length&&!confirm(e)&&n.preventDefault()})}}]),n}();e.a=i},18:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){var e=this;return r(this,n),{extend:function(n){return e.extend(n)}}}return o(n,[{key:"extend",value:function(n){var e=this;n.getContainer().on("click",".js-grid-action-submit-btn",function(t){e.handleSubmit(t,n)})}},{key:"handleSubmit",value:function(n,e){var t=a(n.currentTarget),r=t.data("confirm-message");if(!(void 0!==r&&0<r.length)||confirm(r)){var o=a("#"+e.getId()+"_filter_form");o.attr("action",t.data("url")),o.attr("method",t.data("method")),o.find('input[name="'+e.getId()+'[_token]"]').val(t.data("csrf")),o.submit()}}}]),n}();e.a=i},24:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
var o=window.$,a=function n(e){var t=e.tokenFieldSelector,a=e.options,i=void 0===a?{}:a;r(this,n),o(t).tokenfield(i)};e.a=a},242:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){var e=this;r(this,n);var t=a(".js-meta-page-name").val();this.setUrlRewriteDisabledStatusByCurrentPage(t),a(document).on("change",".js-meta-page-name",function(n){return e.changePageNameEvent(n)})}return o(n,[{key:"changePageNameEvent",value:function(n){var e=a(n.currentTarget),t=e.val();this.setUrlRewriteDisabledStatusByCurrentPage(t)}},{key:"setUrlRewriteDisabledStatusByCurrentPage",value:function(n){a(".js-url-rewrite input").prop("disabled","index"===n)}}]),n}();e.a=i},26:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){r(this,n)}return o(n,[{key:"extend",value:function(n){var e=n.getContainer();e.on("click",".js-remove-helper-block",function(n){e.remove();var t=a(n.target),r=t.data("closeUrl"),o=t.data("cardName");r&&a.post(r,{close:1,name:o})})}}]),n}();e.a=i},27:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(e){r(this,n),this.id=e,this.$container=a("#"+this.id)}return o(n,[{key:"getContainer",value:function(){return this.$container}},{key:"addExtension",value:function(n){n.extend(this)}}]),n}();e.a=i},316:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(4),o=t(6),a=t(9),i=t(5),c=t(7),u=t(15),l=t(18),s=t(10),f=t(8),d=t(11),v=t(27),h=t(26),b=t(24),g=t(14),m=t(242);(0,window.$)(function(){var n=new r.a("meta");n.addExtension(new o.a),n.addExtension(new a.a),n.addExtension(new i.a),n.addExtension(new c.a),n.addExtension(new u.a),n.addExtension(new l.a),n.addExtension(new s.a),n.addExtension(new d.a),n.addExtension(new f.a),new v.a("seo-urls-showcase-card").addExtension(new h.a),new b.a({tokenFieldSelector:"input.js-taggable-field",options:{createTokensOnBlur:!0}}),new g.a,new m.a})},4:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(e){r(this,n),this.id=e,this.$container=a("#"+this.id+"_grid")}return o(n,[{key:"getId",value:function(){return this.id}},{key:"getContainer",value:function(){return this.$container}},{key:"getHeaderContainer",value:function(){return this.$container.closest(".js-grid-panel").find(".js-grid-header")}},{key:"addExtension",value:function(n){n.extend(this)}}]),n}();e.a=i},5:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=t(13),a=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),i=window.$,c=function(){function n(){r(this,n)}return a(n,[{key:"extend",value:function(n){n.getContainer().on("click",".js-reset-search",function(n){t.i(o.a)(i(n.currentTarget).data("url"),i(n.currentTarget).data("redirect"))})}}]),n}();e.a=c},6:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=function(){function n(){r(this,n)}return o(n,[{key:"extend",value:function(n){n.getHeaderContainer().on("click",".js-common_refresh_list-grid-action",function(){location.reload()})}}]),n}();e.a=a},7:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=t(12),a=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),i=function(){function n(){r(this,n)}return a(n,[{key:"extend",value:function(n){var e=n.getContainer().find("table.table");new o.a(e).attach()}}]),n}();e.a=i},8:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){r(this,n)}return o(n,[{key:"extend",value:function(n){this._handleBulkActionCheckboxSelect(n),this._handleBulkActionSelectAllCheckbox(n)}},{key:"_handleBulkActionSelectAllCheckbox",value:function(n){var e=this;n.getContainer().on("change",".js-bulk-action-select-all",function(t){var r=a(t.currentTarget),o=r.is(":checked");o?e._enableBulkActionsBtn(n):e._disableBulkActionsBtn(n),n.getContainer().find(".js-bulk-action-checkbox").prop("checked",o)})}},{key:"_handleBulkActionCheckboxSelect",value:function(n){var e=this;n.getContainer().on("change",".js-bulk-action-checkbox",function(){n.getContainer().find(".js-bulk-action-checkbox:checked").length>0?e._enableBulkActionsBtn(n):e._disableBulkActionsBtn(n)})}},{key:"_enableBulkActionsBtn",value:function(n){n.getContainer().find(".js-bulk-actions-btn").prop("disabled",!1)}},{key:"_disableBulkActionsBtn",value:function(n){n.getContainer().find(".js-bulk-actions-btn").prop("disabled",!0)}}]),n}();e.a=i},9:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a=window.$,i=function(){function n(){r(this,n)}return o(n,[{key:"extend",value:function(n){var e=this;n.getHeaderContainer().on("click",".js-common_show_query-grid-action",function(){return e._onShowSqlQueryClick(n)}),n.getHeaderContainer().on("click",".js-common_export_sql_manager-grid-action",function(){return e._onExportSqlManagerClick(n)})}},{key:"_onShowSqlQueryClick",value:function(n){var e=a("#"+n.getId()+"_common_show_query_modal_form");this._fillExportForm(e,n);var t=a("#"+n.getId()+"_grid_common_show_query_modal");t.modal("show"),t.on("click",".btn-sql-submit",function(){return e.submit()})}},{key:"_onExportSqlManagerClick",value:function(n){var e=a("#"+n.getId()+"_common_show_query_modal_form");this._fillExportForm(e,n),e.submit()}},{key:"_fillExportForm",value:function(n,e){var t=e.getContainer().find(".js-grid-table").data("query");n.find('textarea[name="sql"]').val(t),n.find('input[name="name"]').val(this._getNameFromBreadcrumb())}},{key:"_getNameFromBreadcrumb",value:function(){var n=a(".header-toolbar").find(".breadcrumb-item"),e="";return n.each(function(n,t){var r=a(t),o=0<r.find("a").length?r.find("a").text():r.text();0<e.length&&(e=e.concat(" > ")),e=e.concat(o)}),e}}]),n}();e.a=i}});