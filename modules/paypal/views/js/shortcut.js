/*! For license information please see shortcut.js.LICENSE */
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}({7:function(t,e){var n={idProduct:null,combination:null,productQuantity:null,page:null,button:null,controller:sc_init_url,controllerScOrder:scOrderUrl,styleSetting:"undefined"==typeof styleSetting?null:styleSetting,init:function(){this.updateInfo(),prestashop.on("updatedProduct",function(t,e,o){n.checkProductAvailability()})},updateInfo:function(){this.page=$("[data-container-express-checkout]").data("paypal-source-page"),this.button=document.querySelector("[paypal-button-container]"),"product"==this.page&&(this.productQuantity=$('input[name="qty"]').val(),this.idProduct=$("[data-paypal-id-product]").val(),this.combination=this.getCombination())},getCombination:function(){var t=[],e=/group\[([0-9]+)\]/;return $.each($("#add-to-cart-or-refresh").serializeArray(),function(n,o){(res=o.name.match(e))&&t.push("".concat(res[1]," : ").concat(o.value))}),t},initButton:function(){void 0!==n.getStyleSetting().width&&(n.button.style.width=n.getStyleSetting().width+"px"),paypal.Buttons({fundingSource:paypal.FUNDING.PAYPAL,style:n.getStyleSetting(),createOrder:function(t,e){return n.getIdOrder()},onApprove:function(t,e){n.sendData(t)}}).render(this.button)},sendData:function(t){var e=document.createElement("form"),o=document.createElement("input");o.name="paymentData",o.value=JSON.stringify(t),e.method="POST",e.action=n.controllerScOrder,e.appendChild(o),document.body.appendChild(e),e.submit()},getIdOrder:function(){var t=new Object,e=new URL(this.controller);return e.searchParams.append("ajax","1"),e.searchParams.append("action","CreateOrder"),this.updateInfo(),t.page=this.page,"product"==this.page&&(t.idProduct=this.idProduct,t.quantity=this.productQuantity,t.combination=this.combination.join("|")),fetch(e.toString(),{method:"post",headers:{"content-type":"application/json;charset=utf-8"},body:JSON.stringify(t)}).then(function(t){return t.json()}).then(function(t){if(t.success)return t.idOrder})},checkProductAvailability:function(){var t=new Object,e=new URL(this.controller);e.searchParams.append("ajax","1"),e.searchParams.append("action","CheckAvailability"),this.updateInfo(),t.page=this.page,"product"==this.page&&(t.idProduct=this.idProduct,t.quantity=this.productQuantity,t.combination=this.combination.join("|")),fetch(e.toString(),{method:"post",headers:{"content-type":"application/json;charset=utf-8"},body:JSON.stringify(t)}).then(function(t){return t.json()}).then(function(t){t.success?n.button.style.display="block":n.button.style.display="none"})},getStyleSetting:function(){return null===this.styleSetting?{label:"buynow",height:35}:this.styleSetting}};window.Shortcut=n}});
//# sourceMappingURL=shortcut.js.map