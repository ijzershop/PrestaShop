/******/!function(n){function e(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}// webpackBootstrap
/******/
var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=394)}({10:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),o=window.$,a=function(){function n(e){r(this,n),this.id=e,this.$container=o("#"+this.id+"_grid")}return i(n,[{key:"getId",value:function(){return this.id}},{key:"getContainer",value:function(){return this.$container}},{key:"addExtension",value:function(n){n.extend(this)}}]),n}();e.a=a},16:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),o=window.$,a=function(){function n(){r(this,n)}return i(n,[{key:"extend",value:function(n){this._handleBulkActionCheckboxSelect(n),this._handleBulkActionSelectAllCheckbox(n)}},{key:"_handleBulkActionSelectAllCheckbox",value:function(n){var e=this;n.getContainer().on("change",".js-bulk-action-select-all",function(t){var r=o(t.currentTarget),i=r.is(":checked");i?e._enableBulkActionsBtn(n):e._disableBulkActionsBtn(n),n.getContainer().find(".js-bulk-action-checkbox").prop("checked",i)})}},{key:"_handleBulkActionCheckboxSelect",value:function(n){var e=this;n.getContainer().on("change",".js-bulk-action-checkbox",function(){n.getContainer().find(".js-bulk-action-checkbox:checked").length>0?e._enableBulkActionsBtn(n):e._disableBulkActionsBtn(n)})}},{key:"_enableBulkActionsBtn",value:function(n){n.getContainer().find(".js-bulk-actions-btn").prop("disabled",!1)}},{key:"_disableBulkActionsBtn",value:function(n){n.getContainer().find(".js-bulk-actions-btn").prop("disabled",!0)}}]),n}();e.a=a},19:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),o=window.$,a=function(){function n(){r(this,n)}return i(n,[{key:"extend",value:function(n){n.getContainer().on("click",".js-link-row-action",function(n){var e=o(n.currentTarget).data("confirm-message");e.length&&!confirm(e)&&n.preventDefault()})}}]),n}();e.a=a},196:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(10),i=t(16),o=t(22),a=t(19),u=t(233);(0,window.$)(function(){var n=new r.a("backup");n.addExtension(new i.a),n.addExtension(new o.a),n.addExtension(new a.a),n.addExtension(new u.a)})},22:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),o=window.$,a=function(){function n(){var e=this;return r(this,n),{extend:function(n){return e.extend(n)}}}return i(n,[{key:"extend",value:function(n){var e=this;n.getContainer().on("click",".js-bulk-action-submit-btn",function(t){e.submit(t,n)})}},{key:"submit",value:function(n,e){var t=o(n.currentTarget),r=t.data("confirm-message");if(!(void 0!==r&&0<r.length)||confirm(r)){var i=o("#"+e.getId()+"_filter_form");i.attr("action",t.data("form-url")),i.attr("method",t.data("form-method")),i.submit()}}}]),n}();e.a=a},233:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),o=window.$,a=function(){function n(){r(this,n)}return i(n,[{key:"extend",value:function(n){n.getContainer().on("click",".js-submit-row-action",function(n){n.preventDefault();var e=o(n.currentTarget),t=e.data("confirm-message");if(!t.length||confirm(t)){var r=e.data("method"),i=["GET","POST"].includes(r),a=o("<form>",{action:e.data("url"),method:i?r:"POST"}).appendTo("body");i||a.append(o("<input>",{type:"_hidden",name:"_method",value:r})),a.submit()}})}}]),n}();e.a=a},394:function(n,e,t){n.exports=t(196)}});