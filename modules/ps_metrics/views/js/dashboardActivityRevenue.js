<<<<<<< HEAD
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboardActivityRevenue"],{"0395":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"tw-px-0",on:{scroll:t.onScroll}},[n("ErrorBoundary",[n("b-button-group",{staticClass:"tw-mb-8",attrs:{size:"sm"}},t._l(t.granularityButtons,(function(e){return n("b-button",{key:e.id,attrs:{id:e.id,variant:e.id==t.pressedButtonId?"primary":"outline-secondary",disabled:e.disabled},on:{click:function(n){return n.preventDefault(),t.activateButton(e)}}},[t._v(" "+t._s(e.label[0].toUpperCase()+e.label.slice(1))+" ")])})),1),n("b-container",{staticClass:"tw-px-0"},[n("LineChartWithLoader",{attrs:{"choice-tab":t.title,"data-sets":t.dataSets,loading:t.loading,granularity:t.granularity,"short-cut-date":this.$store.getters.buttonDate,"is-numeric":!0}})],1),n("b-container",{staticClass:"tw-px-0 tw-flex tw-flex-wrap"},[n("PieChartWithLoader",{staticClass:"tw-w-1/2",attrs:{"choice-tab":t.title,data:this.$store.state.dashboard.state.dataRevenueByCategory,loading:this.$store.state.dashboard.state.loadingRevenueByCategory,labels:this.$store.state.dashboard.state.labelsRevenueByCategory,"legend-callback":function(){},"use-inline-label":"",title:t.$t("tabsBody.revenues.revenuePerCategory")}}),n("b-col",{staticClass:"tw-flex-wrap tw-w-1/4"},[n("div",{staticClass:"revenue-analysis tw-flex tw-py-4"},[t._v(" "+t._s(t.$t("tabsBody.revenues.revenueAnalysis"))+" "),n("ToolTip",{attrs:{target:"popover-revenue-analysis",triggers:"click hover",placement:"top",content:t.$t("tabsBody.revenues.revenueAnalysisTooltip"),"style-button":"margin-left: 10px;"}})],1),n("div",{staticClass:"tw-my-8"},[t.loading?t._e():n("BasicKpi",{attrs:{label:t.$t("tabsBody.revenues.revenueNet"),value:t.revenuesHt,currency:""}}),t.loading?t._e():n("BasicKpi",{attrs:{label:t.$t("tabsBody.revenues.totalTaxes"),value:t.taxes,currency:""}})],1)])],1)],1)],1)},i=[],r=(n("7db0"),n("4160"),n("d81d"),n("159b"),n("5530")),s=n("0812"),o=n("896f"),u=n("cebc"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"tw-mb-8 tw-p-0"},[n("b-col",{staticClass:"tw-p-0",attrs:{cols:""}},[n("div",{staticClass:"title tw-flex"},[t._v(" "+t._s(t.label)+" "),t.tooltip?n("ToolTip",{attrs:{target:t.tooltip_target,triggers:"click hover",placement:"top",content:t.tooltip,"style-button":"margin-left: 10px;"}}):t._e()],1)]),n("div",{staticClass:"value"},[n("AnimatedNumber",{attrs:{currency:t.currency,percent:t.percent,value:t.value}})],1)],1)},d=[],c=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.currency?n("span",[t._v(t._s(t.$n(t.animatedNumber,"currency")))]):n("span",[t._v(t._s(t.animatedNumber)+" "),t.percent?[t._v("%")]:t._e()],2)}),h=[],f=(n("b680"),n("3911")),p=n.n(f),b={props:{value:{type:Number,default:0},duration:{type:Number,default:500},currency:{type:Boolean,default:!1},percent:{type:Boolean,default:!1}},data:function(){return{animatedNumber:0}},methods:{initAnimation:function(t,e){var n=this;function a(){p.a.update()&&requestAnimationFrame(a)}new p.a.Tween({tweeningNumber:e}).easing(p.a.Easing.Quadratic.Out).to({tweeningNumber:t},this.duration).onUpdate((function(){n.animatedNumber=this.tweeningNumber.toFixed(0)})).start(),a()}},mounted:function(){this.initAnimation(this.value,0)},watch:{number:function(t,e){this.initAnimation(t,e)}}},v=b,g=n("2877"),y=Object(g["a"])(v,c,h,!1,null,null,null),m=y.exports,w=n("12d5"),B={components:{ToolTip:w["a"],AnimatedNumber:m},props:{label:{type:String,required:!0},tooltip:{type:String,required:!1,default:null},value:{type:[String,Number],required:!0},currency:{type:Boolean,required:!1,default:!1},percent:{type:Boolean,required:!1,default:!1},type:{type:String,default:"number"}},computed:{tooltip_target:function(){return"popover-kpi-".concat(this._uid)}}},x=B,I=(n("2922"),Object(g["a"])(x,l,d,!1,null,"fb60996e",null)),M=I.exports,O=n("c1df"),C=n("4c62"),_={name:"Revenues",components:{LineChartWithLoader:s["a"],PieChartWithLoader:o["a"],BasicKpi:M,ToolTip:w["a"]},props:{title:{type:String,default:"revenue"}},data:function(){return{buttons:[{id:1,pressed:!0,label:this.$t("tabsBody.dates.hour"),slug:"hours",variantButton:"primary",disabled:!1},{id:2,pressed:!0,label:this.$t("tabsBody.dates.day"),slug:"days",variantButton:"primary",disabled:!1},{id:3,pressed:!1,label:this.$t("tabsBody.dates.week"),slug:"weeks",variantButton:"outline-secondary",disabled:!1},{id:4,pressed:!1,label:this.$t("tabsBody.dates.month"),slug:"months",variantButton:"outline-secondary",disabled:!1}],granularity:"days",pressedButtonId:1,unwatchButtonDate:"",dateRange:null,settingsStorage:new C["a"]("dashboard_settings")}},created:function(){var t=this;if(this.settingsStorage.getItem("chart_granularity")){var e=this.settingsStorage.getItem("chart_granularity"),n=this.buttons.find((function(t){return t.slug===e}));this.activateButton(n)}else this.activateButton(this.granularityButtons[0]);this.setTabSelected("revenue"),this.unwatchButtonDate=this.$store.watch((function(t,e){return{buttonDate:e.buttonDate,dateRange:e.dateRange,compareMode:e.getCompareMode}}),(function(e){t.dateRange=Object(r["a"])({},e.dateRange),t.detectButtonDisable(e.buttonDate,e.dateRange),t.getRevenueByPeriodicity({date:e.dateRange,granularity:t.granularity})}),{immediate:!0})},beforeDestroy:function(){this.unwatchButtonDate()},watch:{dateRange:function(){var t=this,e=this.granularityButtons.find((function(e){return e.id===t.pressedButtonId}));!e&&this.granularityButtons.length&&this.activateButton(this.granularityButtons[0])}},methods:Object(r["a"])(Object(r["a"])({},Object(u["c"])({getRevenueByPeriodicity:"getRevenueByPeriodicity",setTabSelected:"setTabSelected"})),{},{activateButton:function(t){this.granularity=t.slug,this.settingsStorage.set("chart_granularity",t.slug),this.pressedButtonId=t.id,this.deactivateButtons(),t.pressed=!0,t.variantButton="primary",this.getRevenueByPeriodicity({date:this.$store.getters.dateRange,granularity:this.granularity}),this.$segment.track("Change Granularity",{title:t.label,module:"ps_metrics"})},deactivateButtons:function(){this.buttons.forEach((function(t){t.pressed=!1,t.variantButton="outline-secondary"}))},onScroll:function(t){var e=t.target,n=e.scrollTop,a=e.clientHeight,i=e.scrollHeight;n+a>=i&&this.$segment.track("scroll revenue",{title:this.title,module:"ps_metrics"})},detectButtonDisable:function(t,e){switch(t){case"today":case"yesterday":this.buttons[0].disabled=!1,this.buttons[1].disabled=!0,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary";break;case"7days":this.buttons[0].disabled=!0,this.buttons[1].disabled=!1,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary";break;case"30days":this.buttons[0].disabled=!0,this.buttons[1].disabled=!1,this.buttons[2].disabled=!1,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[2].pressed=!0,this.buttons[2].variantButton="primary";break;case"custom":var n=Math.abs(O(e.start).diff(O(e.end),"days"))+1;n<2?(this.buttons[1].disabled=!0,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary"):n<=7?(this.buttons[0].disabled=!0,this.buttons[1].disabled=!1,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary"):n>7&&n<30?(this.buttons[0].disabled=!1,this.buttons[2].disabled=!1,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary"):(this.buttons.map((function(t){t.disabled=!1})),this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary");break;default:this.buttons.map((function(t){t.disabled=!1})),this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary";break}}}),computed:{granularityButtons:function(){var t,e=this,n=[{min:0,max:1,buttonIds:[0]},{min:2,max:7,buttonIds:[1]},{min:8,max:25,buttonIds:[1,2]},{min:26,max:59,buttonIds:[1,2]},{min:60,max:89,buttonIds:[1,2,3]},{min:90,max:1/0,buttonIds:[2,3]}];if(!this.dateRange)return[n[0]];for(var a=O(this.dateRange.start),i=O(this.dateRange.end),r=i.diff(a,"days"),s=n.length-1;!t&&s>=0;s--)r>=n[s].min&&r<=n[s].max&&(t=n[s].buttonIds.map((function(t){return e.buttons[t]})));return t||[]},revenuesHt:function(){return this.$store.state.dashboard.state.dataRevenuesByTax.revenuesHT},taxes:function(){return this.$store.state.dashboard.state.dataRevenuesByTax.taxes},loading:function(){var t,e,n,a;return!(null===(t=this.$store)||void 0===t||null===(e=t.state)||void 0===e||null===(n=e.dashboard)||void 0===n||null===(a=n.state)||void 0===a||!a.loadingRevenueByCategory)},dataSets:function(){return this.$store.getters.getRevenuesDataSets}}},R=_,$=(n("158f"),Object(g["a"])(R,a,i,!1,null,"4ae9f926",null));e["default"]=$.exports},"158f":function(t,e,n){"use strict";n("ee15")},2922:function(t,e,n){"use strict";n("bae7")},3911:function(t,e,n){(function(n){var a,i,r=r||function(){var t=[];return{getAll:function(){return t},removeAll:function(){t=[]},add:function(e){t.push(e)},remove:function(e){var n=t.indexOf(e);-1!==n&&t.splice(n,1)},update:function(e,n){if(0===t.length)return!1;var a=0;e=void 0!==e?e:r.now();while(a<t.length)t[a].update(e)||n?a++:t.splice(a,1);return!0}}}();"undefined"===typeof window&&"undefined"!==typeof n?r.now=function(){var t=n.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!==typeof window&&void 0!==window.performance&&void 0!==window.performance.now?r.now=window.performance.now.bind(window.performance):void 0!==Date.now?r.now=Date.now:r.now=function(){return(new Date).getTime()},r.Tween=function(t){var e,n=t,a={},i={},s={},o=1e3,u=0,l=!1,d=!1,c=!1,h=0,f=null,p=r.Easing.Linear.None,b=r.Interpolation.Linear,v=[],g=null,y=!1,m=null,w=null,B=null;this.to=function(t,e){return i=t,void 0!==e&&(o=e),this},this.start=function(t){for(var e in r.add(this),d=!0,y=!1,f=void 0!==t?t:r.now(),f+=h,i){if(i[e]instanceof Array){if(0===i[e].length)continue;i[e]=[n[e]].concat(i[e])}void 0!==n[e]&&(a[e]=n[e],a[e]instanceof Array===!1&&(a[e]*=1),s[e]=a[e]||0)}return this},this.stop=function(){return d?(r.remove(this),d=!1,null!==B&&B.call(n,n),this.stopChainedTweens(),this):this},this.end=function(){return this.update(f+o),this},this.stopChainedTweens=function(){for(var t=0,e=v.length;t<e;t++)v[t].stop()},this.delay=function(t){return h=t,this},this.repeat=function(t){return u=t,this},this.repeatDelay=function(t){return e=t,this},this.yoyo=function(t){return l=t,this},this.easing=function(t){return p=t,this},this.interpolation=function(t){return b=t,this},this.chain=function(){return v=arguments,this},this.onStart=function(t){return g=t,this},this.onUpdate=function(t){return m=t,this},this.onComplete=function(t){return w=t,this},this.onStop=function(t){return B=t,this},this.update=function(t){var r,d,B;if(t<f)return!0;for(r in!1===y&&(null!==g&&g.call(n,n),y=!0),d=(t-f)/o,d=d>1?1:d,B=p(d),i)if(void 0!==a[r]){var x=a[r]||0,I=i[r];I instanceof Array?n[r]=b(I,B):("string"===typeof I&&(I="+"===I.charAt(0)||"-"===I.charAt(0)?x+parseFloat(I):parseFloat(I)),"number"===typeof I&&(n[r]=x+(I-x)*B))}if(null!==m&&m.call(n,B),1===d){if(u>0){for(r in isFinite(u)&&u--,s){if("string"===typeof i[r]&&(s[r]=s[r]+parseFloat(i[r])),l){var M=s[r];s[r]=i[r],i[r]=M}a[r]=s[r]}return l&&(c=!c),f=void 0!==e?t+e:t+h,!0}null!==w&&w.call(n,n);for(var O=0,C=v.length;O<C;O++)v[O].start(f+o);return!1}return!0}},r.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1)}},Back:{In:function(t){var e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-r.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*r.Easing.Bounce.In(2*t):.5*r.Easing.Bounce.Out(2*t-1)+.5}}},r.Interpolation={Linear:function(t,e){var n=t.length-1,a=n*e,i=Math.floor(a),s=r.Interpolation.Utils.Linear;return e<0?s(t[0],t[1],a):e>1?s(t[n],t[n-1],n-a):s(t[i],t[i+1>n?n:i+1],a-i)},Bezier:function(t,e){for(var n=0,a=t.length-1,i=Math.pow,s=r.Interpolation.Utils.Bernstein,o=0;o<=a;o++)n+=i(1-e,a-o)*i(e,o)*t[o]*s(a,o);return n},CatmullRom:function(t,e){var n=t.length-1,a=n*e,i=Math.floor(a),s=r.Interpolation.Utils.CatmullRom;return t[0]===t[n]?(e<0&&(i=Math.floor(a=n*(1+e))),s(t[(i-1+n)%n],t[i],t[(i+1)%n],t[(i+2)%n],a-i)):e<0?t[0]-(s(t[0],t[0],t[1],t[1],-a)-t[0]):e>1?t[n]-(s(t[n],t[n],t[n-1],t[n-1],a-n)-t[n]):s(t[i?i-1:0],t[i],t[n<i+1?n:i+1],t[n<i+2?n:i+2],a-i)},Utils:{Linear:function(t,e,n){return(e-t)*n+t},Bernstein:function(t,e){var n=r.Interpolation.Utils.Factorial;return n(t)/n(e)/n(t-e)},Factorial:function(){var t=[1];return function(e){var n=1;if(t[e])return t[e];for(var a=e;a>1;a--)n*=a;return t[e]=n,n}}(),CatmullRom:function(t,e,n,a,i){var r=.5*(n-t),s=.5*(a-e),o=i*i,u=i*o;return(2*e-2*n+r+s)*u+(-3*e+3*n-2*r-s)*o+r*i+e}}},function(n){a=[],i=function(){return r}.apply(e,a),void 0===i||(t.exports=i)}()}).call(this,n("4362"))},"3c74":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".title[data-v-fb60996e]{font-size:10px;line-height:14px}.title[data-v-fb60996e],.value[data-v-fb60996e]{color:#363a41!important;font-family:Open Sans;letter-spacing:0}.value[data-v-fb60996e]{font-size:24px;font-weight:700;line-height:33px}@media (max-width:1400px){.title[data-v-fb60996e]{font-size:10px!important;line-height:14px}.title[data-v-fb60996e],.value[data-v-fb60996e]{color:#363a41!important;font-family:Open Sans;letter-spacing:0}.value[data-v-fb60996e]{font-size:1em;font-weight:700;line-height:33px}}@media (max-width:1024px){.title[data-v-fb60996e]{font-size:7px!important;line-height:14px}.title[data-v-fb60996e],.value[data-v-fb60996e]{color:#363a41!important;font-family:Open Sans;letter-spacing:0}.value[data-v-fb60996e]{font-size:1em;font-weight:700;line-height:33px}}",""]),t.exports=e},"73fb":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".revenue-analysis[data-v-4ae9f926]{color:#363a41;font-family:Open Sans;font-size:16px;font-weight:700;letter-spacing:-.17px;line-height:22px;margin:12px 0}",""]),t.exports=e},bae7:function(t,e,n){var a=n("3c74");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("ac59a488",a,!0,{sourceMap:!1,shadowMode:!1})},ee15:function(t,e,n){var a=n("73fb");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("762c47d8",a,!0,{sourceMap:!1,shadowMode:!1})}}]);
=======
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboardActivityRevenue"],{"0395":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"tw-px-0",on:{scroll:t.onScroll}},[n("ErrorBoundary",[n("b-button-group",{staticClass:"tw-mb-8",attrs:{size:"sm"}},t._l(t.granularityButtons,(function(e){return n("b-button",{key:e.id,attrs:{id:e.id,variant:e.id==t.pressedButtonId?"primary":"outline-secondary",disabled:e.disabled},on:{click:function(n){return n.preventDefault(),t.activateButton(e)}}},[t._v(" "+t._s(e.label[0].toUpperCase()+e.label.slice(1))+" ")])})),1),n("b-container",{staticClass:"tw-px-0"},[n("LineChartWithLoader",{attrs:{"choice-tab":t.title,"data-sets":t.dataSets,loading:t.loading,granularity:t.granularity,"short-cut-date":this.$store.getters.buttonDate,"is-numeric":!0}})],1),n("b-container",{staticClass:"tw-px-0 tw-flex tw-flex-wrap"},[n("PieChartWithLoader",{staticClass:"tw-w-1/2",attrs:{"choice-tab":t.title,data:this.$store.state.dashboard.state.dataRevenueByCategory,loading:this.$store.state.dashboard.state.loadingRevenueByCategory,labels:this.$store.state.dashboard.state.labelsRevenueByCategory,"legend-callback":function(){},"use-inline-label":"",title:t.$t("tabsBody.revenues.revenuePerCategory")}}),n("b-col",{staticClass:"tw-flex-wrap tw-w-1/4"},[n("div",{staticClass:"revenue-analysis tw-flex tw-py-4"},[t._v(" "+t._s(t.$t("tabsBody.revenues.revenueAnalysis"))+" "),n("ToolTip",{attrs:{target:"popover-revenue-analysis",triggers:"click hover",placement:"top",content:t.$t("tabsBody.revenues.revenueAnalysisTooltip"),"style-button":"margin-left: 10px;"}})],1),n("div",{staticClass:"tw-my-8"},[t.loading?t._e():n("BasicKpi",{attrs:{label:t.$t("tabsBody.revenues.revenueNet"),value:t.revenuesHt,currency:""}}),t.loading?t._e():n("BasicKpi",{attrs:{label:t.$t("tabsBody.revenues.totalTaxes"),value:t.taxes,currency:""}})],1)])],1)],1)],1)},i=[],r=(n("7db0"),n("4160"),n("d81d"),n("159b"),n("5530")),s=n("0812"),o=n("896f"),u=n("cebc"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"tw-mb-8 tw-p-0"},[n("b-col",{staticClass:"tw-p-0",attrs:{cols:""}},[n("div",{staticClass:"title tw-flex"},[t._v(" "+t._s(t.label)+" "),t.tooltip?n("ToolTip",{attrs:{target:t.tooltip_target,triggers:"click hover",placement:"top",content:t.tooltip,"style-button":"margin-left: 10px;"}}):t._e()],1)]),n("div",{staticClass:"value"},[n("AnimatedNumber",{attrs:{currency:t.currency,percent:t.percent,value:t.value}})],1)],1)},d=[],c=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.currency?n("span",[t._v(t._s(t.$n(t.animatedNumber,"currency")))]):n("span",[t._v(t._s(t.animatedNumber)+" "),t.percent?[t._v("%")]:t._e()],2)}),h=[],f=(n("b680"),n("3911")),p=n.n(f),b={props:{value:{type:Number,default:0},duration:{type:Number,default:500},currency:{type:Boolean,default:!1},percent:{type:Boolean,default:!1}},data:function(){return{animatedNumber:0}},methods:{initAnimation:function(t,e){var n=this;function a(){p.a.update()&&requestAnimationFrame(a)}new p.a.Tween({tweeningNumber:e}).easing(p.a.Easing.Quadratic.Out).to({tweeningNumber:t},this.duration).onUpdate((function(){n.animatedNumber=this.tweeningNumber.toFixed(0)})).start(),a()}},mounted:function(){this.initAnimation(this.value,0)},watch:{number:function(t,e){this.initAnimation(t,e)}}},v=b,g=n("2877"),y=Object(g["a"])(v,c,h,!1,null,null,null),m=y.exports,w=n("12d5"),B={components:{ToolTip:w["a"],AnimatedNumber:m},props:{label:{type:String,required:!0},tooltip:{type:String,required:!1,default:null},value:{type:[String,Number],required:!0},currency:{type:Boolean,required:!1,default:!1},percent:{type:Boolean,required:!1,default:!1},type:{type:String,default:"number"}},computed:{tooltip_target:function(){return"popover-kpi-".concat(this._uid)}}},x=B,I=(n("2922"),Object(g["a"])(x,l,d,!1,null,"fb60996e",null)),M=I.exports,O=n("c1df"),C=n("4c62"),_={name:"Revenues",components:{LineChartWithLoader:s["a"],PieChartWithLoader:o["a"],BasicKpi:M,ToolTip:w["a"]},props:{title:{type:String,default:"revenue"}},data:function(){return{buttons:[{id:1,pressed:!0,label:this.$t("tabsBody.dates.hour"),slug:"hours",variantButton:"primary",disabled:!1},{id:2,pressed:!0,label:this.$t("tabsBody.dates.day"),slug:"days",variantButton:"primary",disabled:!1},{id:3,pressed:!1,label:this.$t("tabsBody.dates.week"),slug:"weeks",variantButton:"outline-secondary",disabled:!1},{id:4,pressed:!1,label:this.$t("tabsBody.dates.month"),slug:"months",variantButton:"outline-secondary",disabled:!1}],granularity:"days",pressedButtonId:1,unwatchButtonDate:"",dateRange:null,settingsStorage:new C["a"]("dashboard_settings")}},created:function(){var t=this;if(this.settingsStorage.getItem("chart_granularity")){var e=this.settingsStorage.getItem("chart_granularity"),n=this.buttons.find((function(t){return t.slug===e}));this.activateButton(n)}else this.activateButton(this.granularityButtons[0]);this.setTabSelected("revenue"),this.unwatchButtonDate=this.$store.watch((function(t,e){return{buttonDate:e.buttonDate,dateRange:e.dateRange,compareMode:e.getCompareMode}}),(function(e){t.dateRange=Object(r["a"])({},e.dateRange),t.detectButtonDisable(e.buttonDate,e.dateRange),t.getRevenueByPeriodicity({date:e.dateRange,granularity:t.granularity})}),{immediate:!0})},beforeDestroy:function(){this.unwatchButtonDate()},watch:{dateRange:function(){var t=this,e=this.granularityButtons.find((function(e){return e.id===t.pressedButtonId}));!e&&this.granularityButtons.length&&this.activateButton(this.granularityButtons[0])}},methods:Object(r["a"])(Object(r["a"])({},Object(u["c"])({getRevenueByPeriodicity:"getRevenueByPeriodicity",setTabSelected:"setTabSelected"})),{},{activateButton:function(t){this.granularity=t.slug,this.settingsStorage.set("chart_granularity",t.slug),this.pressedButtonId=t.id,this.deactivateButtons(),t.pressed=!0,t.variantButton="primary",this.getRevenueByPeriodicity({date:this.$store.getters.dateRange,granularity:this.granularity}),this.$segment.track("Change Granularity",{title:t.label,module:"ps_metrics"})},deactivateButtons:function(){this.buttons.forEach((function(t){t.pressed=!1,t.variantButton="outline-secondary"}))},onScroll:function(t){var e=t.target,n=e.scrollTop,a=e.clientHeight,i=e.scrollHeight;n+a>=i&&this.$segment.track("scroll revenue",{title:this.title,module:"ps_metrics"})},detectButtonDisable:function(t,e){switch(t){case"today":case"yesterday":this.buttons[0].disabled=!1,this.buttons[1].disabled=!0,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary";break;case"7days":this.buttons[0].disabled=!0,this.buttons[1].disabled=!1,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary";break;case"30days":this.buttons[0].disabled=!0,this.buttons[1].disabled=!1,this.buttons[2].disabled=!1,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[2].pressed=!0,this.buttons[2].variantButton="primary";break;case"custom":var n=Math.abs(O(e.start).diff(O(e.end),"days"))+1;n<2?(this.buttons[1].disabled=!0,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary"):n<=7?(this.buttons[0].disabled=!0,this.buttons[1].disabled=!1,this.buttons[2].disabled=!0,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary"):n>7&&n<30?(this.buttons[0].disabled=!1,this.buttons[2].disabled=!1,this.buttons[3].disabled=!0,this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary"):(this.buttons.map((function(t){t.disabled=!1})),this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary");break;default:this.buttons.map((function(t){t.disabled=!1})),this.deactivateButtons(),this.buttons[1].pressed=!0,this.buttons[1].variantButton="primary";break}}}),computed:{granularityButtons:function(){var t,e=this,n=[{min:0,max:1,buttonIds:[0]},{min:2,max:7,buttonIds:[1]},{min:8,max:25,buttonIds:[1,2]},{min:26,max:59,buttonIds:[1,2]},{min:60,max:89,buttonIds:[1,2,3]},{min:90,max:1/0,buttonIds:[2,3]}];if(!this.dateRange)return[n[0]];for(var a=O(this.dateRange.start),i=O(this.dateRange.end),r=i.diff(a,"days"),s=n.length-1;!t&&s>=0;s--)r>=n[s].min&&r<=n[s].max&&(t=n[s].buttonIds.map((function(t){return e.buttons[t]})));return t||[]},revenuesHt:function(){return this.$store.state.dashboard.state.dataRevenuesByTax.revenuesHT},taxes:function(){return this.$store.state.dashboard.state.dataRevenuesByTax.taxes},loading:function(){var t,e,n,a;return!(null===(t=this.$store)||void 0===t||null===(e=t.state)||void 0===e||null===(n=e.dashboard)||void 0===n||null===(a=n.state)||void 0===a||!a.loadingRevenueByCategory)},dataSets:function(){return this.$store.getters.getRevenuesDataSets}}},R=_,$=(n("8645"),Object(g["a"])(R,a,i,!1,null,"fb3481e6",null));e["default"]=$.exports},"25dd":function(t,e,n){var a=n("6961");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("034fd7b6",a,!0,{sourceMap:!1,shadowMode:!1})},2922:function(t,e,n){"use strict";n("bae7")},3911:function(t,e,n){(function(n){var a,i,r=r||function(){var t=[];return{getAll:function(){return t},removeAll:function(){t=[]},add:function(e){t.push(e)},remove:function(e){var n=t.indexOf(e);-1!==n&&t.splice(n,1)},update:function(e,n){if(0===t.length)return!1;var a=0;e=void 0!==e?e:r.now();while(a<t.length)t[a].update(e)||n?a++:t.splice(a,1);return!0}}}();"undefined"===typeof window&&"undefined"!==typeof n?r.now=function(){var t=n.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!==typeof window&&void 0!==window.performance&&void 0!==window.performance.now?r.now=window.performance.now.bind(window.performance):void 0!==Date.now?r.now=Date.now:r.now=function(){return(new Date).getTime()},r.Tween=function(t){var e,n=t,a={},i={},s={},o=1e3,u=0,l=!1,d=!1,c=!1,h=0,f=null,p=r.Easing.Linear.None,b=r.Interpolation.Linear,v=[],g=null,y=!1,m=null,w=null,B=null;this.to=function(t,e){return i=t,void 0!==e&&(o=e),this},this.start=function(t){for(var e in r.add(this),d=!0,y=!1,f=void 0!==t?t:r.now(),f+=h,i){if(i[e]instanceof Array){if(0===i[e].length)continue;i[e]=[n[e]].concat(i[e])}void 0!==n[e]&&(a[e]=n[e],a[e]instanceof Array===!1&&(a[e]*=1),s[e]=a[e]||0)}return this},this.stop=function(){return d?(r.remove(this),d=!1,null!==B&&B.call(n,n),this.stopChainedTweens(),this):this},this.end=function(){return this.update(f+o),this},this.stopChainedTweens=function(){for(var t=0,e=v.length;t<e;t++)v[t].stop()},this.delay=function(t){return h=t,this},this.repeat=function(t){return u=t,this},this.repeatDelay=function(t){return e=t,this},this.yoyo=function(t){return l=t,this},this.easing=function(t){return p=t,this},this.interpolation=function(t){return b=t,this},this.chain=function(){return v=arguments,this},this.onStart=function(t){return g=t,this},this.onUpdate=function(t){return m=t,this},this.onComplete=function(t){return w=t,this},this.onStop=function(t){return B=t,this},this.update=function(t){var r,d,B;if(t<f)return!0;for(r in!1===y&&(null!==g&&g.call(n,n),y=!0),d=(t-f)/o,d=d>1?1:d,B=p(d),i)if(void 0!==a[r]){var x=a[r]||0,I=i[r];I instanceof Array?n[r]=b(I,B):("string"===typeof I&&(I="+"===I.charAt(0)||"-"===I.charAt(0)?x+parseFloat(I):parseFloat(I)),"number"===typeof I&&(n[r]=x+(I-x)*B))}if(null!==m&&m.call(n,B),1===d){if(u>0){for(r in isFinite(u)&&u--,s){if("string"===typeof i[r]&&(s[r]=s[r]+parseFloat(i[r])),l){var M=s[r];s[r]=i[r],i[r]=M}a[r]=s[r]}return l&&(c=!c),f=void 0!==e?t+e:t+h,!0}null!==w&&w.call(n,n);for(var O=0,C=v.length;O<C;O++)v[O].start(f+o);return!1}return!0}},r.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1)}},Back:{In:function(t){var e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-r.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*r.Easing.Bounce.In(2*t):.5*r.Easing.Bounce.Out(2*t-1)+.5}}},r.Interpolation={Linear:function(t,e){var n=t.length-1,a=n*e,i=Math.floor(a),s=r.Interpolation.Utils.Linear;return e<0?s(t[0],t[1],a):e>1?s(t[n],t[n-1],n-a):s(t[i],t[i+1>n?n:i+1],a-i)},Bezier:function(t,e){for(var n=0,a=t.length-1,i=Math.pow,s=r.Interpolation.Utils.Bernstein,o=0;o<=a;o++)n+=i(1-e,a-o)*i(e,o)*t[o]*s(a,o);return n},CatmullRom:function(t,e){var n=t.length-1,a=n*e,i=Math.floor(a),s=r.Interpolation.Utils.CatmullRom;return t[0]===t[n]?(e<0&&(i=Math.floor(a=n*(1+e))),s(t[(i-1+n)%n],t[i],t[(i+1)%n],t[(i+2)%n],a-i)):e<0?t[0]-(s(t[0],t[0],t[1],t[1],-a)-t[0]):e>1?t[n]-(s(t[n],t[n],t[n-1],t[n-1],a-n)-t[n]):s(t[i?i-1:0],t[i],t[n<i+1?n:i+1],t[n<i+2?n:i+2],a-i)},Utils:{Linear:function(t,e,n){return(e-t)*n+t},Bernstein:function(t,e){var n=r.Interpolation.Utils.Factorial;return n(t)/n(e)/n(t-e)},Factorial:function(){var t=[1];return function(e){var n=1;if(t[e])return t[e];for(var a=e;a>1;a--)n*=a;return t[e]=n,n}}(),CatmullRom:function(t,e,n,a,i){var r=.5*(n-t),s=.5*(a-e),o=i*i,u=i*o;return(2*e-2*n+r+s)*u+(-3*e+3*n-2*r-s)*o+r*i+e}}},function(n){a=[],i=function(){return r}.apply(e,a),void 0===i||(t.exports=i)}()}).call(this,n("4362"))},"3c74":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".title[data-v-fb60996e]{font-size:10px;line-height:14px}.title[data-v-fb60996e],.value[data-v-fb60996e]{color:#363a41!important;font-family:Open Sans;letter-spacing:0}.value[data-v-fb60996e]{font-size:24px;font-weight:700;line-height:33px}@media (max-width:1400px){.title[data-v-fb60996e]{font-size:10px!important;line-height:14px}.title[data-v-fb60996e],.value[data-v-fb60996e]{color:#363a41!important;font-family:Open Sans;letter-spacing:0}.value[data-v-fb60996e]{font-size:1em;font-weight:700;line-height:33px}}@media (max-width:1024px){.title[data-v-fb60996e]{font-size:7px!important;line-height:14px}.title[data-v-fb60996e],.value[data-v-fb60996e]{color:#363a41!important;font-family:Open Sans;letter-spacing:0}.value[data-v-fb60996e]{font-size:1em;font-weight:700;line-height:33px}}",""]),t.exports=e},6961:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".revenue-analysis[data-v-fb3481e6]{color:#363a41;font-family:Open Sans;font-size:16px;font-weight:700;letter-spacing:-.17px;line-height:22px;margin:0}",""]),t.exports=e},8645:function(t,e,n){"use strict";n("25dd")},bae7:function(t,e,n){var a=n("3c74");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("ac59a488",a,!0,{sourceMap:!1,shadowMode:!1})}}]);
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f
