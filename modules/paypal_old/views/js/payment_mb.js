/*! For license information please see payment_mb.js.LICENSE */
!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}({10:function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var a={ppp:null,config:null,paymentId:null,setConfig:function(e,t){this.config={approvalUrl:e.approvalUrlPPP,placeholder:t,mode:e.paypalMode,payerEmail:e.payerInfo.email,payerFirstName:e.payerInfo.first_name,payerLastName:e.payerInfo.last_name,payerTaxId:e.payerInfo.tax_id,payerTaxIdType:e.payerInfo.tax_id_type,language:e.language,country:e.country,disallowRememberedCards:e.disallowRememberedCards,rememberedCards:e.rememberedCards,onError:this.handleError,merchantInstallmentSelectionOptional:1==e.merchantInstallmentSelectionOptional,merchantInstallmentSelection:1},this.paymentId=e.paymentId},initCheckout:function(){var e=this;this.setLoader("#ppplus-mb"),this.getPaymentInfo().then(function(t){if(e.setConfig(t,"ppplus-mb"),"BR"!=e.config.country||""!=e.config.payerTaxId)e.ppp=PAYPAL.apps.PPP(e.config);else{var n="undefined"!=typeof EMPTY_TAX_ID?EMPTY_TAX_ID:"Payer tax id is empty";e.showMessage(n,"#ppplus-mb","danger")}}).catch(function(e){console.log(e)})},showMessage:function(e,t,n){var a=$('<div class="alert alert-'.concat(n,'" />'));a.text(e),$(t).html(a)},setLoader:function(e){$(e).html('<div class="pp__flex pp__justify-content-center"><div class="paypal-loader"></div></div>')},doPayment:function(){null!=this.ppp&&this.ppp.doContinue()},getPaymentInfo:function(){return new Promise(function(e,t){$.ajax({url:ajaxPatch,type:"POST",dataType:"JSON",data:{ajax:!0,action:"getPaymentInfo"},before:function(){},success:function(t){"success"in t&&1==t.success&&e(t.paymentInfo)}})})},messageListener:function(e){try{var t=JSON.parse(e.data);"checkout"==t.action&&"APPROVED"==t.result.state&&(t.paymentId=a.paymentId,a.sendData(t,ajaxPatch))}catch(e){console.log(e)}},handleError:function(e){if(void 0!==e.cause){var t=e.cause.replace(/['"]+/g,"");switch(t){case"INTERNAL_SERVICE_ERROR":case"SOCKET_HANG_UP":case"socket hang up":case"connect ECONNREFUSED":case"connect ETIMEDOUT":case"UNKNOWN_INTERNAL_ERROR":case"fiWalletLifecycle_unknown_error":case"Failed to decrypt term info":case"RESOURCE_NOT_FOUND":case"INTERNAL_SERVER_ERROR":alert("Ocorreu um erro inesperado, por favor tente novamente. ("+t+")");break;case"RISK_N_DECLINE":case"NO_VALID_FUNDING_SOURCE_OR_RISK_REFUSED":case"TRY_ANOTHER_CARD":case"NO_VALID_FUNDING_INSTRUMENT":alert("Seu pagamento não foi aprovado. Por favor utilize outro cartão, caso o problema persista entre em contato com o PayPal (0800-047-4482). ("+t+")");break;case"CARD_ATTEMPT_INVALID":alert("Ocorreu um erro inesperado, por favor tente novamente. ("+t+")");break;case"INVALID_OR_EXPIRED_TOKEN":alert("A sua sessão expirou, por favor tente novamente. ("+t+")");break;case"CHECK_ENTRY":alert("Por favor revise os dados de Cartão de Crédito inseridos. ("+t+")");break;default:alert("Ocorreu um erro inesperado, por favor tente novamente. ("+t+")")}}console.log(e,n(e))},sendData:function(e,t){var n;n="undefined"!=typeof PAYMENT_SUCCESS?PAYMENT_SUCCESS:"Payment successful! You will be redirected to the payment confirmation page in a couple of seconds.",a.showMessage(n,"#ppplus-mb","success"),$("#ppplus-mb").css("height","100%");var o=document.createElement("form"),r=document.createElement("input");r.name="paymentData",r.value=JSON.stringify(e),o.method="POST",o.action=t,o.appendChild(r),o.style="display: none",document.body.appendChild(o),o.submit()}};$(document).ready(function(){if($('.payment-options input[name="payment-option"]').click(function(e){"paypal_plus_mb"==$(e.target).attr("data-module-name")&&a.initCheckout(),prestashop.on("updatedCart",function(){a.initCheckout()})}),$("#payment-confirmation button").on("click",function(e){"paypal_plus_mb"==$("input[name=payment-option]:checked").attr("data-module-name")&&(e.preventDefault(),e.stopPropagation(),a.doPayment())}),window.addEventListener)window.addEventListener("message",a.messageListener,!1);else{if(!window.attachEvent)throw new Error("Can't attach message listener");window.attachEvent("onmessage",a.messageListener)}})}});
//# sourceMappingURL=payment_mb.js.map