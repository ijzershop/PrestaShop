!function(){function t(t,o,e){var i;return(o="symbol"==typeof(i=function(t,o){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,o||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===o?String:Number)(t)}(o,"string"))?i:i+"")in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}System.register(["./product-config-legacy-DrzpgOoj.js"],(function(o,e){"use strict";return{setters:[null],execute:function(){const o=new class{constructor(){t(this,"document",void 0),t(this,"window",void 0),t(this,"starter",void 0)}bootstrap(t){this.starter=t,this.init(),this.detectDocumentReady(),this.detectWindowLoad()}init(){this.document=$(document),this.window=$(window)}detectDocumentReady(){this.document.ready((()=>this.starter.handleDocumentReady()))}detectWindowLoad(){this.window.on("load",(()=>this.starter.handleWindowLoad()))}},e=new class{constructor(){t(this,"container",void 0)}async handleDocumentReady(){this.displayLogoOnDynamicProducts()}async handleWindowLoad(){}async displayLogoOnDynamicProducts(){const{products:t,linked_configs:o}=await this.loadData();if(void 0!==t){let e=$("table.product");0===e.length&&(e=$("table#product_grid_table"));const i=e.find("tbody tr").toArray();for(const n of i){let e=parseInt($(n).data("product-id"));if(!e||isNaN(e)){const t=$(n).find("td.column-id_product");t.length>0&&(e=parseInt($(t).text().trim()))}if(e&&!isNaN(e)){const i=dp_product_config_url.replace("_id_product_",e.toString());t[e]&&!o[e]&&$(`<a href="${i}" target="dp_new_tab_${e}"><img src="${dp_logo_url}" width="24" /></a>`).prependTo($(n).find("td:eq(3)")),o[e]&&$(`<a href=${i} target="dp_new_tab_${e}"><img src="${dp_logo_link_url}" width="24" /></a>`).prependTo($(n).find("td:eq(3)"))}}}}async loadData(){return(await fetch(do_product_settings,{method:"post",body:JSON.stringify({action:"load_products",no_msg:!0})})).json()}};o.bootstrap(e)}}}))}();
