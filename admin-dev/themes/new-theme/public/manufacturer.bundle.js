window.manufacturer=function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=332)}({1:function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},10:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){var t=this;e.getHeaderContainer().on("click",".js-common_show_query-grid-action",function(){return t._onShowSqlQueryClick(e)}),e.getHeaderContainer().on("click",".js-common_export_sql_manager-grid-action",function(){return t._onExportSqlManagerClick(e)})}},{key:"_onShowSqlQueryClick",value:function(e){var t=r("#"+e.getId()+"_common_show_query_modal_form");this._fillExportForm(t,e);var n=r("#"+e.getId()+"_grid_common_show_query_modal");n.modal("show"),n.on("click",".btn-sql-submit",function(){return t.submit()})}},{key:"_onExportSqlManagerClick",value:function(e){var t=r("#"+e.getId()+"_common_show_query_modal_form");this._fillExportForm(t,e),t.submit()}},{key:"_fillExportForm",value:function(e,t){var n=t.getContainer().find(".js-grid-table").data("query");e.find('textarea[name="sql"]').val(n),e.find('input[name="name"]').val(this._getNameFromBreadcrumb())}},{key:"_getNameFromBreadcrumb",value:function(){var e=r(".header-toolbar").find(".breadcrumb-item"),t="";return e.each(function(e,n){var i=r(n),o=0<i.find("a").length?i.find("a").text():i.text();0<t.length&&(t=t.concat(" > ")),t=t.concat(o)}),t}}]),e}();t.default=a},11:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(){var t=this;return i(this,e),{extend:function(e){return t.extend(e)}}}return o(e,[{key:"extend",value:function(e){var t=this;e.getContainer().on("click",".js-bulk-action-submit-btn",function(n){t.submit(n,e)})}},{key:"submit",value:function(e,t){var n=r(e.currentTarget),i=n.data("confirm-message");if(!(void 0!==i&&0<i.length)||confirm(i)){var o=r("#"+t.getId()+"_filter_form");o.attr("action",n.data("form-url")),o.attr("method",n.data("form-method")),o.submit()}}}]),e}();t.default=a},12:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){e.getContainer().on("click",".js-submit-row-action",function(e){e.preventDefault();var t=r(e.currentTarget),n=t.data("confirm-message");if(!n.length||confirm(n)){var i=t.data("method"),o=["GET","POST"].includes(i),a=r("<form>",{action:t.data("url"),method:o?i:"POST"}).appendTo("body");o||a.append(r("<input>",{type:"_hidden",name:"_method",value:i})),a.submit()}})}}]),e}();t.default=a},13:function(e,t,n){"use strict";(function(e){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e.$,r=function(){function e(t){n(this,e),this.selector=".ps-sortable-column",this.columns=o(t).find(this.selector)}return i(e,[{key:"attach",value:function(){var e=this;this.columns.on("click",function(t){var n=o(t.delegateTarget);e._sortByColumn(n,e._getToggledSortDirection(n))})}},{key:"sortBy",value:function(e,t){var n=this.columns.is('[data-sort-col-name="'+e+'"]');if(!n)throw new Error('Cannot sort by "'+e+'": invalid column');this._sortByColumn(n,t)}},{key:"_sortByColumn",value:function(e,t){window.location=this._getUrl(e.data("sortColName"),"desc"===t?"desc":"asc",e.data("sortPrefix"))}},{key:"_getToggledSortDirection",value:function(e){return"asc"===e.data("sortDirection")?"desc":"asc"}},{key:"_getUrl",value:function(e,t,n){var i=new URL(window.location.href),o=i.searchParams;return n?(o.set(n+"[orderBy]",e),o.set(n+"[sortOrder]",t)):(o.set("orderBy",e),o.set("sortOrder",t)),i.toString()}}]),e}();t.default=r}).call(t,n(1))},14:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});/**
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
var n=e.$,i=function(e,t){n.post(e).then(function(){return window.location.assign(t)})};t.default=i}).call(t,n(1))},15:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(17),a=window.$,l=function(){function e(t){i(this,e),t=t||{},this.localeItemSelector=t.localeItemSelector||".js-locale-item",this.localeButtonSelector=t.localeButtonSelector||".js-locale-btn",this.localeInputSelector=t.localeInputSelector||".js-locale-input",a("body").on("click",this.localeItemSelector,this.toggleLanguage.bind(this)),r.EventEmitter.on("languageSelected",this.toggleInputs.bind(this))}return o(e,[{key:"toggleLanguage",value:function(e){var t=a(e.target),n=t.closest("form");r.EventEmitter.emit("languageSelected",{selectedLocale:t.data("locale"),form:n})}},{key:"toggleInputs",value:function(e){var t=e.form,n=e.selectedLocale,i=t.find(this.localeButtonSelector),o=i.data("change-language-url");i.text(n),t.find(this.localeInputSelector).addClass("d-none"),t.find(this.localeInputSelector+".js-locale-"+n).removeClass("d-none"),o&&this._saveSelectedLanguage(o,n)}},{key:"_saveSelectedLanguage",value:function(e,t){a.post({url:e,data:{language_iso_code:t}})}}]),e}();t.default=l},16:function(e,t,n){"use strict";(function(e){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e.$,r=function(){function e(){n(this,e)}return i(e,[{key:"extend",value:function(e){var t=this;e.getContainer().find("table.table").find(".ps-togglable-row").on("click",function(e){e.preventDefault(),t._toggleValue(o(e.delegateTarget))})}},{key:"_toggleValue",value:function(e){var t=e.data("toggleUrl");this._submitAsForm(t)}},{key:"_submitAsForm",value:function(e){o("<form>",{action:e,method:"POST"}).appendTo("body").submit()}}]),e}();t.default=r}).call(t,n(1))},17:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0;var i=n(19),o=function(e){return e&&e.__esModule?e:{default:e}}(i);t.EventEmitter=new o.default},18:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(t){var n=this;return i(this,e),this.$container=r(t),this.$container.on("click",".js-input-wrapper",function(e){var t=r(e.currentTarget);n._toggleChildTree(t)}),this.$container.on("click",".js-toggle-choice-tree-action",function(e){var t=r(e.currentTarget);n._toggleTree(t)}),{enableAutoCheckChildren:function(){return n.enableAutoCheckChildren()},enableAllInputs:function(){return n.enableAllInputs()},disableAllInputs:function(){return n.disableAllInputs()}}}return o(e,[{key:"enableAutoCheckChildren",value:function(){this.$container.on("change",'input[type="checkbox"]',function(e){var t=r(e.currentTarget);t.closest("li").find('ul input[type="checkbox"]').prop("checked",t.is(":checked"))})}},{key:"enableAllInputs",value:function(){this.$container.find("input").removeAttr("disabled")}},{key:"disableAllInputs",value:function(){this.$container.find("input").attr("disabled","disabled")}},{key:"_toggleChildTree",value:function(e){var t=e.closest("li");if(t.hasClass("expanded"))return void t.removeClass("expanded").addClass("collapsed");t.hasClass("collapsed")&&t.removeClass("collapsed").addClass("expanded")}},{key:"_toggleTree",value:function(e){var t=e.closest(".js-choice-tree-container"),n=e.data("action"),i={addClass:{expand:"expanded",collapse:"collapsed"},removeClass:{expand:"collapsed",collapse:"expanded"},nextAction:{expand:"collapse",collapse:"expand"},text:{expand:"collapsed-text",collapse:"expanded-text"},icon:{expand:"collapsed-icon",collapse:"expanded-icon"}};t.find("li").each(function(e,t){var o=r(t);o.hasClass(i.removeClass[n])&&o.removeClass(i.removeClass[n]).addClass(i.addClass[n])}),e.data("action",i.nextAction[n]),e.find(".material-icons").text(e.data(i.icon[n])),e.find(".js-toggle-text").text(e.data(i.text[n]))}}]),e}();t.default=a},19:function(e,t,n){"use strict";function i(e){console&&console.warn&&console.warn(e)}function o(){o.init.call(this)}function r(e){return void 0===e._maxListeners?o.defaultMaxListeners:e._maxListeners}function a(e,t,n,o){var a,l,c;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(l=e._events,void 0===l?(l=e._events=Object.create(null),e._eventsCount=0):(void 0!==l.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),l=e._events),c=l[t]),void 0===c)c=l[t]=n,++e._eventsCount;else if("function"==typeof c?c=l[t]=o?[n,c]:[c,n]:o?c.unshift(n):c.push(n),(a=r(e))>0&&c.length>a&&!c.warned){c.warned=!0;var s=new Error("Possible EventEmitter memory leak detected. "+c.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");s.name="MaxListenersExceededWarning",s.emitter=e,s.type=t,s.count=c.length,i(s)}return e}function l(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,p(this.listener,this.target,e))}function c(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=l.bind(i);return o.listener=n,i.wrapFn=o,o}function s(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?m(o):f(o,o.length)}function u(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function d(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function m(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}var h,v="object"==typeof Reflect?Reflect:null,p=v&&"function"==typeof v.apply?v.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};h=v&&"function"==typeof v.ownKeys?v.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var y=Number.isNaN||function(e){return e!==e};e.exports=o,o.EventEmitter=o,o.prototype._events=void 0,o.prototype._eventsCount=0,o.prototype._maxListeners=void 0;var g=10;Object.defineProperty(o,"defaultMaxListeners",{enumerable:!0,get:function(){return g},set:function(e){if("number"!=typeof e||e<0||y(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");g=e}}),o.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},o.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||y(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},o.prototype.getMaxListeners=function(){return r(this)},o.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var r;if(t.length>0&&(r=t[0]),r instanceof Error)throw r;var a=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw a.context=r,a}var l=o[e];if(void 0===l)return!1;if("function"==typeof l)p(l,this,t);else for(var c=l.length,s=f(l,c),n=0;n<c;++n)p(s[n],this,t);return!0},o.prototype.addListener=function(e,t){return a(this,e,t,!1)},o.prototype.on=o.prototype.addListener,o.prototype.prependListener=function(e,t){return a(this,e,t,!0)},o.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,c(this,e,t)),this},o.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,c(this,e,t)),this},o.prototype.removeListener=function(e,t){var n,i,o,r,a;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){a=n[r].listener,o=r;break}if(o<0)return this;0===o?n.shift():d(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,a||t)}return this},o.prototype.off=o.prototype.removeListener,o.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},o.prototype.listeners=function(e){return s(this,e,!0)},o.prototype.rawListeners=function(e){return s(this,e,!1)},o.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},o.prototype.listenerCount=u,o.prototype.eventNames=function(){return this._eventsCount>0?h(this._events):[]}},29:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});/**
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
var o=window.$,r=function e(t){var n=t.tokenFieldSelector,r=t.options,a=void 0===r?{}:r;i(this,e),o(n).tokenfield(a)};t.default=r},3:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(t){i(this,e),this.id=t,this.$container=r("#"+this.id+"_grid")}return o(e,[{key:"getId",value:function(){return this.id}},{key:"getContainer",value:function(){return this.$container}},{key:"getHeaderContainer",value:function(){return this.$container.closest(".js-grid-panel").find(".js-grid-header")}},{key:"addExtension",value:function(e){e.extend(this)}}]),e}();t.default=a},31:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(t){if(i(this,e),t=t||{},this.tinyMCELoaded=!1,void 0===t.baseAdminUrl)if(void 0!==window.baseAdminDir)t.baseAdminUrl=window.baseAdminDir;else{var n=window.location.pathname.split("/");n.every(function(e){return""===e||(t.baseAdminUrl="/"+e+"/",!1)})}void 0===t.langIsRtl&&(t.langIsRtl=void 0!==window.lang_is_rtl&&"1"===window.lang_is_rtl),this.setupTinyMCE(t)}return o(e,[{key:"setupTinyMCE",value:function(e){"undefined"==typeof tinyMCE?this.loadAndInitTinyMCE(e):this.initTinyMCE(e)}},{key:"fetchKey",value:function(e){var t=[];return t["bouwstaalmat.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["bouwstaalmat.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["constructiebalk.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["constructieklus.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["constructieklus.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["demodernesmid.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["demodernesmid.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["gerofitness.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["gerofitness.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["ijzershop.frl"]="paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4=",t["ijzershop.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["ijzershop176.local"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["paneelhek.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["paneelhek.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t[e]}},{key:"initTinyMCE",value:function(e){var t=this;if(void 0===n)var n=location.protocol+"//"+location.host+"/";var i=this.fetchKey(window.location.hostname);e=Object.assign({selector:"textarea.rte",plugins:["link","image","table","media","advlist","code","table","autoresize","bootstrap","fullscreen"],browser_spellcheck:!0,toolbar:"undo redo code image| bold italic underline strikethrough fullscreen | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap",contextmenu:"bootstrap",bootstrapConfig:{language:iso_user,url:n+"js/tiny_mce/plugins/bootstrap/",iconFont:"fontawesome5",imagesPath:"/upload",key:i,enableTemplateEdition:!1},editorStyleFormats:{textStyles:!0,blockStyles:!0,containerStyles:!0,responsive:["xs","sm"],spacing:["all","x","y","top","right","bottom","left"]},style_formats_autohide:!0,language:iso_user,content_style:"1"===lang_is_rtl?"body {direction:rtl;}":"",skin:"oxide",theme:"silver",menubar:!1,statusbar:!1,relative_urls:!1,convert_urls:!1,entity_encoding:"raw",extended_valid_elements:"em[class|name|id,@[role|data-*|aria-*]",valid_children:"+*[*]",valid_elements:"*[*]",rel_list:[{title:"nofollow",value:"nofollow"}],images_upload_handler:function(e,t,n){var i,o;i=new XMLHttpRequest,i.withCredentials=!1,i.open("POST","/custom_uploader/upload.php");var r=document.querySelectorAll(".tox-form input")[0].files[0];o=new FormData,o.append("path",""),o.append("path_thumb",""),o.append("file",r,r.name),i.send(o),i.onload=function(){var e;return 200!=i.status?void n("HTTP Error: "+i.status):(e=JSON.parse(i.responseText))&&"string"==typeof e.location?void t(e.location):void n("Invalid JSON: "+i.responseText)}},editor_selector:"autoload_rte",init_instance_callback:function(){},setup:function(e){t.setupEditor(e)}},e),void 0!==e.editor_selector&&(e.selector="."+e.editor_selector),tinyMCE.init(e),this.watchTabChanges(e)}},{key:"setupEditor",value:function(e){var t=this;e.on("loadContent",function(e){t.handleCounterTiny(e.target.id)}),e.on("change",function(e){tinyMCE.triggerSave(),t.handleCounterTiny(e.target.id)}),e.on("blur",function(){tinyMCE.triggerSave()})}},{key:"watchTabChanges",value:function(e){r(e.selector).each(function(e,t){var n=r(t).closest(".translation-field"),i=r(t).closest(".translations.tabbable");if(n.length&&i.length){var o=n.data("locale");r('.nav-item a[data-locale="'+o+'"]',i).on("shown.bs.tab",function(){var e=tinyMCE.get(t.id);e&&e.setContent(e.getContent())})}})}},{key:"loadAndInitTinyMCE",value:function(e){var t=this;if(!this.tinyMCELoaded){this.tinyMCELoaded=!0;var n=e.baseAdminUrl.split("/");n.splice(n.length-2,2);var i=n.join("/");window.tinyMCEPreInit={},window.tinyMCEPreInit.base=i+"/js/tiny_mce",window.tinyMCEPreInit.suffix=".min",r.getScript(i+"/js/tiny_mce/tinymce.min.js",function(){t.setupTinyMCE(e)})}}},{key:"changeToMaterial",value:function(){var e={"mce-i-code":'<i class="material-icons">code</i>',"mce-i-none":'<i class="material-icons">format_color_text</i>',"mce-i-bold":'<i class="material-icons">format_bold</i>',"mce-i-italic":'<i class="material-icons">format_italic</i>',"mce-i-underline":'<i class="material-icons">format_underlined</i>',"mce-i-strikethrough":'<i class="material-icons">format_strikethrough</i>',"mce-i-blockquote":'<i class="material-icons">format_quote</i>',"mce-i-link":'<i class="material-icons">link</i>',"mce-i-alignleft":'<i class="material-icons">format_align_left</i>',"mce-i-aligncenter":'<i class="material-icons">format_align_center</i>',"mce-i-alignright":'<i class="material-icons">format_align_right</i>',"mce-i-alignjustify":'<i class="material-icons">format_align_justify</i>',"mce-i-bullist":'<i class="material-icons">format_list_bulleted</i>',"mce-i-numlist":'<i class="material-icons">format_list_numbered</i>',"mce-i-image":'<i class="material-icons">image</i>',"mce-i-table":'<i class="material-icons">grid_on</i>',"mce-i-media":'<i class="material-icons">video_library</i>',"mce-i-browse":'<i class="material-icons">attachment</i>',"mce-i-checkbox":'<i class="mce-ico mce-i-checkbox"></i>'};r.each(e,function(e,t){r("."+e).replaceWith(t)})}},{key:"handleCounterTiny",value:function(e){var t=r("#"+e),n=t.attr("counter"),i=t.attr("counter_type"),o=tinyMCE.activeEditor.getContent().textContent;t.parent().find("span.currentLength").text(o),"recommended"!==i&&o>n?t.parent().find("span.maxLength").addClass("text-danger"):t.parent().find("span.maxLength").removeClass("text-danger")}}]),e}();t.default=a},332:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var o=n(15),r=i(o),a=n(29),l=i(a),c=n(54),s=i(c),u=n(3),f=i(u),d=n(8),m=i(d),h=n(5),v=i(h),p=n(7),y=i(p),g=n(16),b=i(g),w=n(12),_=i(w),k=n(11),E=i(k),C=n(9),x=i(C),L=n(10),O=i(L),j=n(18),T=i(j),M=n(43),A=i(M),S=n(31),F=i(S),I=n(6),P=i(I);(0,window.$)(function(){["manufacturer","manufacturer_address"].forEach(function(e){var t=new f.default(e);t.addExtension(new O.default),t.addExtension(new y.default),t.addExtension(new m.default),t.addExtension(new v.default),t.addExtension(new b.default),t.addExtension(new _.default),t.addExtension(new E.default),t.addExtension(new x.default),t.addExtension(new P.default)}),new r.default,new A.default,new F.default,new l.default({tokenFieldSelector:"input.js-taggable-field",options:{createTokensOnBlur:!0}}),new s.default,new T.default("#manufacturer_shop_association").enableAutoCheckChildren()})},43:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(17),a=window.$,l=function(){function e(t){i(this,e),t=t||{},this.localeButtonSelector=t.localeButtonSelector||'.translationsLocales.nav .nav-item a[data-toggle="tab"]',this.localeNavigationSelector=t.localeNavigationSelector||".translationsLocales.nav",a("body").on("shown.bs.tab",this.localeButtonSelector,this.toggleLanguage.bind(this)),r.EventEmitter.on("languageSelected",this.toggleFields.bind(this))}return o(e,[{key:"toggleLanguage",value:function(e){var t=a(e.target),n=t.closest("form");r.EventEmitter.emit("languageSelected",{selectedLocale:t.data("locale"),form:n})}},{key:"toggleFields",value:function(e){a(this.localeNavigationSelector).each(function(t,n){var i=a(".nav-item a.active",n),o=i.data("locale");e.selectedLocale!==o&&a('.nav-item a[data-locale="'+e.selectedLocale+'"]',n).tab("show")})}}]),e}();t.default=l},5:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(14),a=function(e){return e&&e.__esModule?e:{default:e}}(r),l=window.$,c=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){e.getContainer().on("click",".js-reset-search",function(e){(0,a.default)(l(e.currentTarget).data("url"),l(e.currentTarget).data("redirect"))})}}]),e}();t.default=c},54:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});/**
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
var o=window.$,r=function e(){i(this,e),o(document).on("click",".js-form-submit-btn",function(e){e.preventDefault();var t=o(this);if(!t.data("form-confirm-message")||!1!==confirm(t.data("form-confirm-message"))){var n=o("<form>",{action:t.data("form-submit-url"),method:"POST"});t.data("form-csrf-token")&&n.append(o("<input>",{type:"_hidden",name:"_csrf_token",value:t.data("form-csrf-token")})),n.appendTo("body").submit()}})};t.default=r},6:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){this.initRowLinks(e),this.initConfirmableActions(e)}},{key:"initConfirmableActions",value:function(e){e.getContainer().on("click",".js-link-row-action",function(e){var t=r(e.currentTarget).data("confirm-message");t.length&&!confirm(t)&&e.preventDefault()})}},{key:"initRowLinks",value:function(e){r("tr",e.getContainer()).each(function(){var e=r(this);r(".js-link-row-action[data-clickable-row=1]:first",e).each(function(){var t=r(this),n=t.closest("td");r("td.data-type, td.identifier-type:not(:has(input)), td.badge-type, td.position-type",e).not(n).addClass("cursor-pointer").click(function(){var e=t.data("confirm-message");e.length&&!confirm(e)||(document.location=t.attr("href"))})})})}}]),e}();t.default=a},7:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){e.getHeaderContainer().on("click",".js-common_refresh_list-grid-action",function(){location.reload()})}}]),e}();t.default=r},8:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(13),a=function(e){return e&&e.__esModule?e:{default:e}}(r),l=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){var t=e.getContainer().find("table.table");new a.default(t).attach()}}]),e}();t.default=l},9:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=window.$,a=function(){function e(){i(this,e)}return o(e,[{key:"extend",value:function(e){this._handleBulkActionCheckboxSelect(e),this._handleBulkActionSelectAllCheckbox(e)}},{key:"_handleBulkActionSelectAllCheckbox",value:function(e){var t=this;e.getContainer().on("change",".js-bulk-action-select-all",function(n){var i=r(n.currentTarget),o=i.is(":checked");o?t._enableBulkActionsBtn(e):t._disableBulkActionsBtn(e),e.getContainer().find(".js-bulk-action-checkbox").prop("checked",o)})}},{key:"_handleBulkActionCheckboxSelect",value:function(e){var t=this;e.getContainer().on("change",".js-bulk-action-checkbox",function(){e.getContainer().find(".js-bulk-action-checkbox:checked").length>0?t._enableBulkActionsBtn(e):t._disableBulkActionsBtn(e)})}},{key:"_enableBulkActionsBtn",value:function(e){e.getContainer().find(".js-bulk-actions-btn").prop("disabled",!1)}},{key:"_disableBulkActionsBtn",value:function(e){e.getContainer().find(".js-bulk-actions-btn").prop("disabled",!0)}}]),e}();t.default=a}});