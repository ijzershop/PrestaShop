!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=320)}({320:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(46);(0,window.$)(function(){new r.a})},46:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),c=window.$,u=function(){function e(){var n=this;r(this,e),c(document).on("click",".js-multiple-choice-table-select-column",function(e){return n.handleSelectColumn(e)})}return o(e,[{key:"handleSelectColumn",value:function(e){e.preventDefault();var n=c(e.target),t=n.data("column-checked");n.data("column-checked",!t),n.closest("table").find("tbody tr td:nth-child("+n.data("column-num")+") input[type=checkbox]").prop("checked",!t)}}]),e}();n.a=u}});