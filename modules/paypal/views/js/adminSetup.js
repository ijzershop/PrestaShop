/*! For license information please see adminSetup.js.LICENSE */
!function(t){var n={};function e(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(o,a,function(n){return t[n]}.bind(null,a));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=2)}([function(t,n,e){"use strict";e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return a}));var o=function(t){$(".defaultForm").removeClass("pp-settings-link-on"),$(".page-head-tabs a").removeClass("pp-settings-link-on pp__border-b-primary"),t.addClass("pp-settings-link-on"),$("html, body").animate({scrollTop:t.offset().top-200+"px"},900)},a=function(){var t=document.querySelectorAll(".page-head-tabs a"),n=$(".page-head-tabs a.current");t.forEach((function(t){var e=$(t).attr("href").includes("AdminPayPalCustomizeCheckout"),o=$(t).attr("href").includes("AdminPayPalSetup");(n.attr("href").includes("AdminPayPalCustomizeCheckout")&&o||n.attr("href").includes("AdminPayPalSetup")&&e)&&$(t).addClass("pp-settings-link-on pp__border-b-primary")})),$("html, body").animate({scrollTop:$(".page-head-tabs").offset().top-200+"px"},900)}},,function(t,n,e){"use strict";e.r(n),e.d(n,"SetupAdmin",(function(){return r}));var o=e(0),a=function(t,n){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"handleOnboardingResponse",authCode:t,sharedId:n},success:function(t){console.log(t)}})},r={init:function(){$("#logoutAccount").on("click",(function(t){r.logoutAccount()})),$("#confirmCredentials").click((function(t){$(t.currentTarget).closest("form").submit()})),$(document).on("click","#btn-check-requirements",(function(){r.checkRequirements()})),$("[data-pp-link-settings]").on("click",(function(t){t.preventDefault();var n=$(t.target.attributes.href.value);n.length?Object(o.a)(n):Object(o.b)()})),$(".defaultForm").on("mouseleave",(function(t){$(t.currentTarget).removeClass("pp-settings-link-on")})),$(".ps-checkout-info").on("click",(function(t){var n=t.target.getAttribute("data-action");r.psCheckoutHandleAction(n)})),$(document).on("contextmenu","[data-paypal-button]",(function(t){t.preventDefault()})),window.onboardCallback=a,$("[data-update-rounding-settings]").on("click",(function(t){r.updateRoundingSettings(t)})),$("[data-show-rounding-alert]").on("click",(function(t){var n=$("[data-rounding-alert]");n.removeClass("hidden");var e=n.offset().top-$(".page-head").height()-45;$("html, body").animate({scrollTop:e},500)}))},logoutAccount:function(){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"logOutAccount"},success:function(t){t.status&&(document.location=t.redirectUrl)}})},checkRequirements:function(){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"CheckCredentials"},success:function(t){$("#btn-check-requirements").closest(".status-block-container").html(t)}})},psCheckoutHandleAction:function(t){null!=t&&$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"HandlePsCheckoutAction",actionHandled:t},success:function(t){t.redirect&&window.open(t.url,"_blank")}})},updateRoundingSettings:function(t){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"UpdateRoundingSettings"},success:function(n){var e=$(t.currentTarget).closest("[data-rounding-alert]");e.length>0&&(e.removeClass("alert-warning").addClass("alert-success"),e.html(n),setTimeout((function(){return e.remove()}),5e3))}})}};window.addEventListener("load",(function(){return r.init()})),$(window).on("load",(function(){return $("[data-paypal-button]").removeClass("spinner-button")}))}]);
//# sourceMappingURL=adminSetup.js.map