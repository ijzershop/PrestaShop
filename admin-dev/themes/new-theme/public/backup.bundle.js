window.backup=function(n){function e(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};return e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,i){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:i})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=312)}({11:function(n,e,t){"use strict";function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),r=window.$,a=function(){function n(){var e=this;return i(this,n),{extend:function(n){return e.extend(n)}}}return o(n,[{key:"extend",value:function(n){var e=this;n.getContainer().on("click",".js-bulk-action-submit-btn",function(t){e.submit(t,n)})}},{key:"submit",value:function(n,e){var t=r(n.currentTarget),i=t.data("confirm-message");if(!(void 0!==i&&0<i.length)||confirm(i)){var o=r("#"+e.getId()+"_filter_form");o.attr("action",t.data("form-url")),o.attr("method",t.data("form-method")),o.submit()}}}]),n}();e.default=a},12:function(n,e,t){"use strict";function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),r=window.$,a=function(){function n(){i(this,n)}return o(n,[{key:"extend",value:function(n){n.getContainer().on("click",".js-submit-row-action",function(n){n.preventDefault();var e=r(n.currentTarget),t=e.data("confirm-message");if(!t.length||confirm(t)){var i=e.data("method"),o=["GET","POST"].includes(i),a=r("<form>",{action:e.data("url"),method:o?i:"POST"}).appendTo("body");o||a.append(r("<input>",{type:"_hidden",name:"_method",value:i})),a.submit()}})}}]),n}();e.default=a},3:function(n,e,t){"use strict";function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),r=window.$,a=function(){function n(e){i(this,n),this.id=e,this.$container=r("#"+this.id+"_grid")}return o(n,[{key:"getId",value:function(){return this.id}},{key:"getContainer",value:function(){return this.$container}},{key:"getHeaderContainer",value:function(){return this.$container.closest(".js-grid-panel").find(".js-grid-header")}},{key:"addExtension",value:function(n){n.extend(this)}}]),n}();e.default=a},312:function(n,e,t){"use strict";function i(n){return n&&n.__esModule?n:{default:n}}var o=t(3),r=i(o),a=t(9),u=i(a),c=t(11),l=i(c),f=t(6),s=i(f),d=t(12),b=i(d);/**
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
(0,window.$)(function(){var n=new r.default("backup");n.addExtension(new u.default),n.addExtension(new l.default),n.addExtension(new s.default),n.addExtension(new b.default)})},6:function(n,e,t){"use strict";function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),r=window.$,a=function(){function n(){i(this,n)}return o(n,[{key:"extend",value:function(n){this.initRowLinks(n),this.initConfirmableActions(n)}},{key:"initConfirmableActions",value:function(n){n.getContainer().on("click",".js-link-row-action",function(n){var e=r(n.currentTarget).data("confirm-message");e.length&&!confirm(e)&&n.preventDefault()})}},{key:"initRowLinks",value:function(n){r("tr",n.getContainer()).each(function(){var n=r(this);r(".js-link-row-action[data-clickable-row=1]:first",n).each(function(){var e=r(this),t=e.closest("td");r("td.data-type, td.identifier-type:not(:has(input)), td.badge-type, td.position-type",n).not(t).addClass("cursor-pointer").click(function(){var n=e.data("confirm-message");n.length&&!confirm(n)||(document.location=e.attr("href"))})})})}}]),n}();e.default=a},9:function(n,e,t){"use strict";function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),r=window.$,a=function(){function n(){i(this,n)}return o(n,[{key:"extend",value:function(n){this._handleBulkActionCheckboxSelect(n),this._handleBulkActionSelectAllCheckbox(n)}},{key:"_handleBulkActionSelectAllCheckbox",value:function(n){var e=this;n.getContainer().on("change",".js-bulk-action-select-all",function(t){var i=r(t.currentTarget),o=i.is(":checked");o?e._enableBulkActionsBtn(n):e._disableBulkActionsBtn(n),n.getContainer().find(".js-bulk-action-checkbox").prop("checked",o)})}},{key:"_handleBulkActionCheckboxSelect",value:function(n){var e=this;n.getContainer().on("change",".js-bulk-action-checkbox",function(){n.getContainer().find(".js-bulk-action-checkbox:checked").length>0?e._enableBulkActionsBtn(n):e._disableBulkActionsBtn(n)})}},{key:"_enableBulkActionsBtn",value:function(n){n.getContainer().find(".js-bulk-actions-btn").prop("disabled",!1)}},{key:"_disableBulkActionsBtn",value:function(n){n.getContainer().find(".js-bulk-actions-btn").prop("disabled",!0)}}]),n}();e.default=a}});