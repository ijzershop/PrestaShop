/*! For license information please see helpAdmin.js.LICENSE */
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}({0:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r});var o=function(e){$(".defaultForm").removeClass("pp-settings-link-on"),$(".page-head-tabs a").removeClass("pp-settings-link-on pp__border-b-primary"),e.addClass("pp-settings-link-on"),$("html, body").animate({scrollTop:e.offset().top-200+"px"},900)},r=function(){var e=document.querySelectorAll(".page-head-tabs a"),t=$(".page-head-tabs a.current");e.forEach(function(e){var n=$(e).attr("href").includes("AdminPayPalCustomizeCheckout"),o=$(e).attr("href").includes("AdminPayPalSetup");(t.attr("href").includes("AdminPayPalCustomizeCheckout")&&o||t.attr("href").includes("AdminPayPalSetup")&&n)&&$(e).addClass("pp-settings-link-on pp__border-b-primary")}),$("html, body").animate({scrollTop:$(".page-head-tabs").offset().top-200+"px"},900)}},1:function(e,t,n){"use strict";n.r(t);var o=n(0),r=function(e,t){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"handleOnboardingResponse",authCode:e,sharedId:t},success:function(e){console.log(e)}})},c=function(){if("undefined"!=typeof paypalOnboardingLib){var e=document.createElement("script");e.src=paypalOnboardingLib,document.body.appendChild(e)}};n.d(t,"SetupAdmin",function(){return a});var a={init:function(){$("#logoutAccount").on("click",function(e){a.logoutAccount()}),$("#confirmCredentials").click(function(e){$(e.currentTarget).closest("form").submit()}),$(document).on("click","#btn-check-requirements",function(){a.checkRequirements()}),$("[data-pp-link-settings]").on("click",function(e){e.preventDefault();var t=$(e.target.attributes.href.value);t.length?Object(o.a)(t):Object(o.b)()}),$(".defaultForm").on("mouseleave",function(e){$(e.currentTarget).removeClass("pp-settings-link-on")}),$(".ps-checkout-info").on("click",function(e){var t=e.target.getAttribute("data-action");a.psCheckoutHandleAction(t)}),window.onboardCallback=r,c()},logoutAccount:function(){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"logOutAccount"},success:function(e){e.status&&(document.location=e.redirectUrl)}})},checkRequirements:function(){$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"CheckCredentials"},success:function(e){$("#btn-check-requirements").closest(".status-block-container").html(e)}})},psCheckoutHandleAction:function(e){null!=e&&$.ajax({url:controllerUrl,type:"POST",data:{ajax:!0,action:"HandlePsCheckoutAction",actionHandled:e},success:function(e){e.redirect&&window.open(e.url,"_blank")}})}};$(document).ready(function(){return a.init()})},9:function(e,t,n){"use strict";n.r(t);var o=n(1),r={init:function(){$("#ckeck_requirements").click(function(){r.checkCredentials()}),$(".install-ps-checkout").click(function(){o.SetupAdmin.psCheckoutHandleAction("install")})},checkCredentials:function(){$.ajax({url:controllerUrl,type:"POST",dataType:"JSON",data:{ajax:!0,action:"CheckCredentials"},success:function(e){var t,n;for(var o in $(".action_response").html(""),n=1==e.success?"success":"danger",e.message)t=r.getAlert(e.message[o],n),$(t).appendTo(".action_response")}})},getAlert:function(e,t){var n=document.createElement("div"),o=document.createElement("div");return o.innerHTML=e,n.className="alert alert-".concat(t),n.appendChild(o),n}};document.addEventListener("DOMContentLoaded",function(){r.init()})}});
//# sourceMappingURL=helpAdmin.js.map