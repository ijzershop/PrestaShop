window.imports=function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=499)}({0:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},1:function(e,t,n){"use strict";t.__esModule=!0;var o=n(19),r=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,r.default)(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()},11:function(e,t,n){var o=n(4);e.exports=function(e){if(!o(e))throw TypeError(e+" is not an object!");return e}},12:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},13:function(e,t,n){var o=n(18);e.exports=function(e,t,n){if(o(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,o){return e.call(t,n,o)};case 3:return function(n,o,r){return e.call(t,n,o,r)}}return function(){return e.apply(t,arguments)}}},14:function(e,t,n){var o=n(4);e.exports=function(e,t){if(!o(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!o(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},16:function(e,t,n){var o=n(4),r=n(5).document,i=o(r)&&o(r.createElement);e.exports=function(e){return i?r.createElement(e):{}}},17:function(e,t,n){e.exports=!n(2)&&!n(7)(function(){return 7!=Object.defineProperty(n(16)("div"),"a",{get:function(){return 7}}).a})},18:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},19:function(e,t,n){e.exports={default:n(20),__esModule:!0}},2:function(e,t,n){e.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},20:function(e,t,n){n(21);var o=n(3).Object;e.exports=function(e,t,n){return o.defineProperty(e,t,n)}},21:function(e,t,n){var o=n(8);o(o.S+o.F*!n(2),"Object",{defineProperty:n(6).f})},3:function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},4:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},411:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=o(r),l=n(1),a=o(l),u=n(498),s=o(u),f=window.$,c=function(){function e(){var t=this;(0,i.default)(this,e),new s.default,f(".js-from-files-history-btn").on("click",function(){return t.showFilesHistoryHandler()}),f(".js-close-files-history-block-btn").on("click",function(){return t.closeFilesHistoryHandler()}),f("#fileHistoryTable").on("click",".js-use-file-btn",function(e){return t.useFileFromFilesHistory(e)}),f(".js-change-import-file-btn").on("click",function(){return t.changeImportFileHandler()}),f(".js-import-file").on("change",function(){return t.uploadFile()}),this.toggleSelectedFile(),this.handleSubmit()}return(0,a.default)(e,[{key:"handleSubmit",value:function(){f(".js-import-form").on("submit",function(){var e=f(this);if("1"===e.find('input[name="truncate"]:checked').val())return confirm(e.data("delete-confirm-message")+" "+f.trim(f("#entity > option:selected").text().toLowerCase())+"?")})}},{key:"toggleSelectedFile",value:function(){var e=f("#csv").val();e.length>0&&(this.showImportFileAlert(e),this.hideFileUploadBlock())}},{key:"changeImportFileHandler",value:function(){this.hideImportFileAlert(),this.showFileUploadBlock()}},{key:"showFilesHistoryHandler",value:function(){this.showFilesHistory(),this.hideFileUploadBlock()}},{key:"closeFilesHistoryHandler",value:function(){this.closeFilesHistory(),this.showFileUploadBlock()}},{key:"showFilesHistory",value:function(){f(".js-files-history-block").removeClass("d-none")}},{key:"closeFilesHistory",value:function(){f(".js-files-history-block").addClass("d-none")}},{key:"useFileFromFilesHistory",value:function(e){var t=f(e.target).closest(".btn-group").data("file");f(".js-import-file-input").val(t),this.showImportFileAlert(t),this.closeFilesHistory()}},{key:"showImportFileAlert",value:function(e){f(".js-import-file-alert").removeClass("d-none"),f(".js-import-file").text(e)}},{key:"hideImportFileAlert",value:function(){f(".js-import-file-alert").addClass("d-none")}},{key:"hideFileUploadBlock",value:function(){f(".js-file-upload-form-group").addClass("d-none")}},{key:"showFileUploadBlock",value:function(){f(".js-file-upload-form-group").removeClass("d-none")}},{key:"enableFilesHistoryBtn",value:function(){f(".js-from-files-history-btn").removeAttr("disabled")}},{key:"showImportFileError",value:function(e,t,n){var o=f(".js-import-file-error"),r=e+" ("+this.humanizeSize(t)+")";o.find(".js-file-data").text(r),o.find(".js-error-message").text(n),o.removeClass("d-none")}},{key:"hideImportFileError",value:function(){f(".js-import-file-error").addClass("d-none")}},{key:"humanizeSize",value:function(e){return"number"!=typeof e?"":e>=1e9?(e/1e9).toFixed(2)+" GB":e>=1e6?(e/1e6).toFixed(2)+" MB":(e/1e3).toFixed(2)+" KB"}},{key:"uploadFile",value:function(){var e=this;this.hideImportFileError();var t=f("#file"),n=t.prop("files")[0];if(t.data("max-file-upload-size")<n.size)return void this.showImportFileError(n.name,n.size,"File is too large");var o=new FormData;o.append("file",n),f.ajax({type:"POST",url:f(".js-import-form").data("file-upload-url"),data:o,cache:!1,contentType:!1,processData:!1}).then(function(t){if(t.error)return void e.showImportFileError(n.name,n.size,t.error);var o=t.file.name;f(".js-import-file-input").val(o),e.showImportFileAlert(o),e.hideFileUploadBlock(),e.addFileToHistoryTable(o),e.enableFilesHistoryBtn()})}},{key:"addFileToHistoryTable",value:function(e){var t=f("#fileHistoryTable"),n=t.data("delete-file-url"),o=n+"&filename="+encodeURIComponent(e),r=t.data("download-file-url"),i=r+"&filename="+encodeURIComponent(e),l=t.find("tr:first").clone();l.removeClass("d-none"),l.find("td:first").text(e),l.find(".btn-group").attr("data-file",e),l.find(".js-delete-file-btn").attr("href",o),l.find(".js-download-file-btn").attr("href",i),t.find("tbody").append(l);var a=t.find("tr").length-1;f(".js-files-history-number").text(a)}}]),e}();t.default=c},498:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=o(r),l=n(1),a=o(l),u=window.$,s=function(){function e(){var t=this;(0,i.default)(this,e),u(".js-entity-select").on("change",function(){return t.toggleForm()}),this.toggleForm()}return(0,a.default)(e,[{key:"toggleForm",value:function(){var e=u("#entity").find("option:selected"),t=parseInt(e.val()),n=e.text().toLowerCase();this.toggleEntityAlert(t),this.toggleFields(t,n),this.loadAvailableFields(t)}},{key:"toggleEntityAlert",value:function(e){var t=u(".js-entity-alert");[0,1].includes(e)?t.show():t.hide()}},{key:"toggleFields",value:function(e,t){var n=u(".js-truncate-form-group"),o=u(".js-match-ref-form-group"),r=u(".js-regenerate-form-group"),i=u(".js-force-ids-form-group"),l=u(".js-entity-name");8===e?n.hide():n.show(),[1,2].includes(e)?o.show():o.hide(),[0,1,5,6,8].includes(e)?r.show():r.hide(),[0,1,3,4,5,6,8,7].includes(e)?i.show():i.hide(),l.html(t)}},{key:"loadAvailableFields",value:function(e){var t=this,n=u(".js-available-fields");u.ajax({url:n.data("url"),data:{entity:e},dataType:"json"}).then(function(e){t._removeAvailableFields(n);for(var o=0;o<e.length;o++)t._appendAvailableField(n,e[o].label+(e[o].required?"*":""),e[o].description);n.find('[data-toggle="popover"]').popover()})}},{key:"_removeAvailableFields",value:function(e){e.find('[data-toggle="popover"]').popover("hide"),e.empty()}},{key:"_appendHelpBox",value:function(e,t){var n=u(".js-available-field-popover-template").clone();n.attr("data-content",t),n.removeClass("js-available-field-popover-template d-none"),e.append(n)}},{key:"_appendAvailableField",value:function(e,t,n){var o=u(".js-available-field-template").clone();o.text(t),n&&this._appendHelpBox(o,n),o.removeClass("js-available-field-template d-none"),o.appendTo(e)}}]),e}();t.default=s},499:function(e,t,n){"use strict";var o=n(411),r=function(e){return e&&e.__esModule?e:{default:e}}(o);/**
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
(0,window.$)(function(){new r.default})},5:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},6:function(e,t,n){var o=n(11),r=n(17),i=n(14),l=Object.defineProperty;t.f=n(2)?Object.defineProperty:function(e,t,n){if(o(e),t=i(t,!0),o(n),r)try{return l(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},7:function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},8:function(e,t,n){var o=n(5),r=n(3),i=n(13),l=n(9),a=function(e,t,n){var u,s,f,c=e&a.F,d=e&a.G,p=e&a.S,v=e&a.P,h=e&a.B,y=e&a.W,m=d?r:r[t]||(r[t]={}),F=m.prototype,b=d?o:p?o[t]:(o[t]||{}).prototype;d&&(n=t);for(u in n)(s=!c&&b&&void 0!==b[u])&&u in m||(f=s?b[u]:n[u],m[u]=d&&"function"!=typeof b[u]?n[u]:h&&s?i(f,o):y&&b[u]==f?function(e){var t=function(t,n,o){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,o)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(f):v&&"function"==typeof f?i(Function.call,f):f,v&&((m.virtual||(m.virtual={}))[u]=f,e&a.R&&F&&!F[u]&&l(F,u,f)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,e.exports=a},9:function(e,t,n){var o=n(6),r=n(12);e.exports=n(2)?function(e,t,n){return o.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}}});