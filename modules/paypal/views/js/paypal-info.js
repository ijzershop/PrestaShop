/*! For license information please see paypal-info.js.LICENSE */
!function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=12)}({12:function(e,o){$(document).ready((function(){$(".payment-option").each((function(e){var o=e+1;if($("#payment-option-".concat(o,"-container [data-module-name^='paypal']")).length>0){var t=$("#payment-option-".concat(o,"-additional-information [data-paypal-info]"));if(t.length>0){var n=document.querySelector("[data-pp-info]");n instanceof Element&&(t.find("[data-paypal-info-popover]").attr("data-content",n.outerHTML),n.remove()),t.insertAfter($("#payment-option-".concat(o,"-container label"))),t.show()}}}));try{var e=t();$("[data-paypal-info-popover]").popover({placement:e.popoverPlacement,trigger:e.popoverTrigger})}catch(e){console.error(e)}$(window).width()>991&&n()}));var t=function(){var e="right",o="hover";return $(window).width()<992&&(e="bottom",o="click"),{popoverPlacement:e,popoverTrigger:o}},n=function(){$("[data-paypal-info-popover] i").on("mouseover",(function(e){e.target.innerText="cancel",$("body").addClass("pp-popover")})),$("[data-paypal-info-popover] i").on("mouseout",(function(e){e.target.innerText="info",$("[data-pp-info]").is(":visible")||$("body").removeClass("pp-popover")})),$("[data-paypal-info-popover] i").on("click",(function(e){hidePopup($(e.target))}))}}});
//# sourceMappingURL=paypal-info.js.map