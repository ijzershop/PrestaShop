(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboardActivityVisit"],{"060a":function(t,a,e){"use strict";var s=e("8e94"),i=e.n(s);i.a},"09c6":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"tw-border-2 tw-border-dashed tw-border-gray-500 tw-bg-gray-100 tw-p-8"},[t._m(0),e("div",{staticClass:"tw-text-base tw-text-center tw-pb-6"},[t._v(" "+t._s(t.$t("needGAPanel.textContent"))+" ")]),e("div",{staticClass:"tw-text-center"},[e("b-button",{attrs:{variant:"primary"},on:{click:function(a){return t.goToSettings()}}},[t._v(t._s(t.$t("needGAPanel.configure")))])],1)])},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"tw-pb-4"},[s("img",{staticClass:"tw-w-24 tw-m-auto",attrs:{src:e("9943"),alt:"need_google_analytics"}})])}],n={name:"NeedGAPanel",methods:{goToSettings:function(){window.location.href=this.$store.getters.getConfigurationLink}}},o=n,r=e("2877"),l=Object(r["a"])(o,s,i,!1,null,null,null);a["a"]=l.exports},"0d66":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[this.$store.getters.gaIsOnboarded?e("b-container",{staticClass:"tw-px-0",on:{scroll:t.onScroll}},[e("b-button-group",{staticClass:"tw-mb-8",attrs:{size:"sm"}},t._l(t.buttons,(function(a){return e("b-button",{key:a.id,attrs:{id:a.id,variant:a.variantButton,disabled:a.disabled},on:{click:function(e){return e.preventDefault(),t.activateButton(a)}}},[t._v(t._s(a.label[0].toUpperCase()+a.label.slice(1)))])})),1),e("b-container",{staticClass:"tw-px-0"},[e("BarChartWithLoader-ExtensionPoint",{key:t.title,attrs:{"key-id":t.title,"choice-tab":t.title,data:this.$store.state.dashboard.state.dataVisits,loading:this.$store.state.dashboard.state.loadingVisitsByPeriodicity,labels:this.$store.state.dashboard.state.labelsVisits,granularity:t.granularity}})],1),e("b-container",{staticClass:"tw-px-0"},[e("PieChartWithLoader",{key:t.title,attrs:{data:this.$store.state.dashboard.state.dataVisitsByCategory,loading:this.$store.state.dashboard.state.loadingVisitsByCategory,labels:this.$store.state.dashboard.state.labelsVisitsByCategory,title:t.$t("tabsBody.visits.trafficPerChannel"),"choice-tab":t.title}})],1)],1):e("NeedGAPanel")],1)},i=[],n=(e("4160"),e("d81d"),e("159b"),e("5530")),o=e("cebc"),r=e("896f"),l=e("09c6"),d=e("c1df"),c={name:"Visits",components:{PieChartWithLoader:r["a"],NeedGAPanel:l["a"]},props:{title:{type:String,default:"sessions"}},data:function(){return{buttons:[{id:1,pressed:!0,label:this.$t("tabsBody.dates.day"),slug:"days",variantButton:"primary",disabled:!1},{id:2,pressed:!1,label:this.$t("tabsBody.dates.week"),slug:"weeks",variantButton:"outline-secondary",disabled:!1},{id:3,pressed:!1,label:this.$t("tabsBody.dates.month"),slug:"months",variantButton:"outline-secondary",disabled:!1}],granularity:"days",unwatchButtonDate:""}},created:function(){var t=this;this.setTabSelected("sessions"),this.unwatchButtonDate=this.$store.watch((function(t,a){return{buttonDate:a.buttonDate,dateRange:a.dateRange}}),(function(a){t.detectButtonDisable(a.buttonDate,a.dateRange),t.getVisits({date:a.dateRange,granularity:t.granularity})}),{immediate:!0})},beforeDestroy:function(){this.unwatchButtonDate()},methods:Object(n["a"])(Object(n["a"])({},Object(o["c"])({getVisits:"getVisits",setTabSelected:"setTabSelected"})),{},{activateButton:function(t){this.granularity=t.slug,this.deactivateButtons(),t.pressed=!0,t.variantButton="primary",this.getVisits({date:this.$store.getters.dateRange,granularity:this.granularity}),this.$segment.track("Change Granularity",{title:t.label,module:"ps_metrics"})},deactivateButtons:function(){this.buttons.forEach((function(t){t.pressed=!1,t.variantButton="outline-secondary"}))},onScroll:function(t){var a=t.target,e=a.scrollTop,s=a.clientHeight,i=a.scrollHeight;e+s>=i&&this.$segment.track("scroll visits",{title:this.title,module:"ps_metrics"})},detectButtonDisable:function(t,a){switch(t){case"yesterday":case"7days":this.buttons[1].disabled=!0,this.buttons[2].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary";break;case"custom":var e=Math.abs(d(a.start).diff(d(a.end),"days"))+1;e<=7?(this.buttons[1].disabled=!0,this.buttons[2].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary"):e>7&&e<30?(this.buttons[1].disabled=!1,this.buttons[2].disabled=!0,this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary"):(this.buttons.map((function(t){t.disabled=!1})),this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary");break;default:this.buttons.map((function(t){t.disabled=!1})),this.deactivateButtons(),this.buttons[0].pressed=!0,this.buttons[0].variantButton="primary";break}}})},u=c,h=e("2877"),b=Object(h["a"])(u,s,i,!1,null,null,null);a["default"]=b.exports},"3b95":function(t,a,e){var s=e("24fb");a=s(!1),a.push([t.i,'.traffic-per-channel{color:#363a41;font-family:Open Sans;font-size:16px;font-weight:700;letter-spacing:-.17px;line-height:22px;margin:12px}.legend{position:relative;top:-200px;left:40%}.legend ul{list-style:none!important}.legend ul li:before{content:"\\2022"!important;color:var(--bubble-color)!important;font-weight:700;display:inline-block;width:1em;font-size:2em;margin-left:-1em;vertical-align:sub}.legend ul li span{margin-left:-10px;vertical-align:text-bottom}.legend ul li i{vertical-align:initial!important}',""]),t.exports=a},"896f":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bg-horizontal-bar col-sm-10 tw-p-0"},[e("div",{staticClass:"traffic-per-channel tw-py-4"},[t._v(" "+t._s(t.title)+" ")]),t.loading?e("BarChartSkeleton"):!t.loading&&t.data.every((function(t){return 0===t}))?e("NoData"):e("PieChart",{staticStyle:{"margin-left":"-66%","margin-top":"2%"},attrs:{title:t.title,labels:t.labels,data:t.data,width:280,height:184,"choice-tab":t.choiceTab},on:{generated:t.setLegend}}),t.loading||t.data.every((function(t){return 0===t}))?t._e():e("div",{staticClass:"legend",domProps:{innerHTML:t._s(t.message)}})],1)},i=[],n=(e("99af"),e("a15b"),e("a9e3"),e("b680"),e("ac1f"),e("1276"),e("1fca")),o=e("c583"),r={maintainAspectRatio:!1,legend:{display:!1,position:"right",align:"start",onClick:function(t){return t.stopPropagation()}},tooltips:{bodySpacing:4,xPadding:10,yPadding:10,caretPadding:10},responsive:!0,layout:{padding:{left:0,right:0,top:15,bottom:15}}},l={name:"pie-chart",extends:n["d"],props:["labels","datasets","data","extraOptions","title","hoverColor","choiceTab"],data:function(){return{color:[]}},mounted:function(){this.render();var t=this.$data._chart.generateLegend();this.$emit("generated",t)},methods:{render:function(){var t=this;(!this.color||0===this.color.length||this.color.length<this.data.length)&&(this.color=[],this.color=Object(o["a"])(this.data.length));var a=Object.assign(r,this.extraOptions||{});a.tooltips={callbacks:{label:function(a,e){var s=a.index;return"sessions"!==t.choiceTab.toLowerCase()?"".concat(t.$t("tabsBody.conversionRate.".concat(e.labels[s].toLowerCase().split(" ").join("_"))),": ").concat(t.$n(e.datasets[0].data[s],"currency")):"".concat(e.labels[s],": ").concat(e.datasets[0].data[s])}}},a.legendCallback=function(a){for(var e=[],s=0,i=0;i<a.data.labels.length;i++)s+=parseInt(a.data.datasets[0].data[i]);e.push("<ul>");for(var n=0;n<a.data.labels.length;n++)e.push('<li style="--bubble-color: '.concat(a.data.datasets[0].backgroundColor[n],';">')),a.data.labels[n]&&("sessions"===t.choiceTab.toLowerCase()?e.push('<span class="tooltip-tab">'.concat(a.data.labels[n]," ").concat(Number(a.data.datasets[0].data[n]/s*100).toFixed(2),' % \n                <i class="material-icons info" style="font-size: small!important;">info_outlined</i>\n                <span class="tooltip-text-tab">').concat(t.$t("tabsBody.visits.".concat(a.data.labels[n].toLowerCase().split(" ").join("_"))),"</span>\n                </span>")):e.push('<span class="tooltip-tab">'.concat(t.$t("tabsBody.conversionRate.".concat(a.data.labels[n].toLowerCase().split(" ").join("_")))," ").concat(t.$n(a.data.datasets[0].data[n],"currency"),' \n                <i class="material-icons info" style="font-size: small!important;">info_outlined</i>\n                <span class="tooltip-text-tab">').concat(t.$t("tabsBody.conversionRate.".concat(a.data.labels[n].toLowerCase().split(" ").join("_"),"Tooltip")),"</span>\n                </span>"))),e.push("</li>");return e.push("</ul>"),e.join("")},this.renderChart({labels:this.labels||[],datasets:this.datasets?this.datasets:[{label:this.title||"",backgroundColor:this.color,hoverBackgroundColor:this.color,borderWidth:1,data:this.data||[]}]},a)},updateState:function(t,a){this[a]=t,this.render()}},watch:{labels:function(t){this.updateState(t,"labels")},data:function(t){this.updateState(t,"data")},title:function(t){this.updateState(t,"title")},hoverColor:function(t){this.updateState(t,"hoverColor")},choiceTab:function(t){this.updateState(t,"choiceTab")}}},d=e("19a3"),c=e("110c"),u={components:{PieChart:l,BarChartSkeleton:d["a"],NoData:c["a"]},props:{granularity:{type:String,default:"days"},loading:{type:Boolean,default:!0},data:{type:Array,default:function(){return[]}},labels:{type:Array,default:function(){return[]}},title:{type:String,default:"Traffic per Channel"},choiceTab:{type:String,default:"visits"}},data:function(){return{isGradient:!1,color:"#34219e",hoverColor:"#FF0076",message:""}},methods:{updateData:function(t,a){this[a]=t},setLegend:function(t){this.message=t}},watch:{data:function(t){this.updateData(t,"data")},labels:function(t){this.updateData(t,"labels")}}},h=u,b=(e("060a"),e("2877")),p=Object(b["a"])(h,s,i,!1,null,null,null);a["a"]=p.exports},"8e94":function(t,a,e){var s=e("3b95");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var i=e("499e").default;i("0ad149bc",s,!0,{sourceMap:!1,shadowMode:!1})}}]);