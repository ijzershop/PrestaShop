/*
* 2010-2020 Tuni-Soft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* It is available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize the module for your
* needs please refer to
* http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
* for more information.
*
* @author    Tuni-Soft
* @copyright 2010-2020 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

!function(t){t.Colors=function(t,l){"use strict";var G={rgb:{r:[0,255],g:[0,255],b:[0,255]},hsv:{h:[0,360],s:[0,100],v:[0,100]},hsl:{h:[0,360],s:[0,100],l:[0,100]},alpha:{alpha:[0,1]},HEX:{HEX:[0,16777215]}},M=t.Math,R=M.round,E={},H={},r={r:.298954,g:.586434,b:.114612},o={r:.2126,g:.7152,b:.0722},e=function(t){this.colors={RND:{}};this.options={color:"rgba(0,0,0,0)",grey:r,luminance:o,valueRanges:G};i(this,t||{})},i=function(t,r){var o,e=t.options,i;s(t);for(var n in r){if(r[n]!==l)e[n]=r[n]}i=e.customBG;e.customBG=typeof i==="string"?F.txt2color(i).rgb:i;H=c(t.colors,e.color,l,true)},s=function(t){if(E!==t){E=t;H=t.colors}};function c(t,r,o,e,i){if(typeof r==="string"){var r=F.txt2color(r);o=r.type;H[o]=r[o];i=i!==l?i:r.alpha}else if(r){for(var n in r){t[o][n]=u(r[n]/G[o][n][1],0,1)}}if(i!==l){t.alpha=u(+i,0,1)}return a(o,e?t:l)}function D(t,r,o){var e=E.options.grey,i={};i.RGB={r:t.r,g:t.g,b:t.b};i.rgb={r:r.r,g:r.g,b:r.b};i.alpha=o;i.equivalentGrey=R(e.r*t.r+e.g*t.g+e.b*t.b);i.rgbaMixBlack=A(r,{r:0,g:0,b:0},o,1);i.rgbaMixWhite=A(r,{r:1,g:1,b:1},o,1);i.rgbaMixBlack.luminance=S(i.rgbaMixBlack,true);i.rgbaMixWhite.luminance=S(i.rgbaMixWhite,true);if(E.options.customBG){i.rgbaMixCustom=A(r,E.options.customBG,o,1);i.rgbaMixCustom.luminance=S(i.rgbaMixCustom,true);E.options.customBG.luminance=S(E.options.customBG,true)}return i}function a(t,r){var o=r||H,e=F,i=E.options,n=G,s=o.RND,c,a="",l="",u={hsl:"hsv",rgb:t},h=s.rgb,g,f;if(t!=="alpha"){for(var p in n){if(!n[p][p]){if(t!==p){l=u[p]||"rgb";o[p]=e[l+"2"+p](o[l])}if(!s[p])s[p]={};c=o[p];for(a in c){s[p][a]=R(c[a]*n[p][a][1])}}}h=s.rgb;o.HEX=e.RGB2HEX(h);o.equivalentGrey=i.grey.r*o.rgb.r+i.grey.g*o.rgb.g+i.grey.b*o.rgb.b;o.webSave=g=X(h,51);o.webSmart=f=X(h,17);o.saveColor=h.r===g.r&&h.g===g.g&&h.b===g.b?"web save":h.r===f.r&&h.g===f.g&&h.b===f.b?"web smart":"";o.hueRGB=F.hue2RGB(o.hsv.h);if(r){o.background=D(h,o.rgb,o.alpha)}}var b=o.rgb,d=o.alpha,v="luminance",m=o.background,x,_,C,y,k,B,w;x=A(b,{r:0,g:0,b:0},d,1);x[v]=S(x,true);o.rgbaMixBlack=x;_=A(b,{r:1,g:1,b:1},d,1);_[v]=S(_,true);o.rgbaMixWhite=_;if(i.customBG){w=A(b,m.rgbaMixCustom,d,1);w[v]=S(w,true);w.WCAG2Ratio=$(w[v],m.rgbaMixCustom[v]);o.rgbaMixBGMixCustom=w;w.luminanceDelta=M.abs(w[v]-m.rgbaMixCustom[v]);w.hueDelta=z(m.rgbaMixCustom,w,true)}o.RGBLuminance=S(h);o.HUELuminance=S(o.hueRGB);if(i.convertCallback){i.convertCallback(o,t)}return o}e.prototype.setColor=function(t,r,o){s(this);if(t){return c(this.colors,t,r,l,o)}else{if(o!==l){this.colors.alpha=u(o,0,1)}return a(r)}},e.prototype.setCustomBackground=function(t){s(this);this.options.customBG=typeof t==="string"?F.txt2color(t).rgb:t;return c(this.colors,l,"rgb")},e.prototype.saveAsBackground=function(){s(this);return c(this.colors,l,"rgb",true)},e.prototype.toString=function(t,r){return F.color2text((t||"rgb").toLowerCase(),this.colors,r)};var F={txt2color:function(t){var r={},o=t.replace(/(?:#|\)|%)/g,"").split("("),e=(o[1]||"").split(/,\s*/),i=o[1]?o[0].substr(0,3):"rgb",n="";r.type=i;r[i]={};if(o[1]){for(var s=3;s--;){n=i[s]||i.charAt(s);r[i][n]=+e[s]/G[i][n][1]}}else{r.rgb=F.HEX2rgb(o[0])}r.alpha=e[3]?+e[3]:1;return r},color2text:function(t,r,o){var e=o!==false&&R(r.alpha*100)/100,i=typeof e==="number"&&o!==false&&(o||e!==1),n=r.RND.rgb,s=r.RND.hsl,c=t==="hex"&&i,a=t==="hex"&&!c,l=t==="rgb"||c,u=l?n.r+", "+n.g+", "+n.b:!a?s.h+", "+s.s+"%, "+s.l+"%":"#"+r.HEX;return a?u:(c?"rgb":t)+(i?"a":"")+"("+u+(i?", "+e:"")+")"},RGB2HEX:function(t){return((t.r<16?"0":"")+t.r.toString(16)+(t.g<16?"0":"")+t.g.toString(16)+(t.b<16?"0":"")+t.b.toString(16)).toUpperCase()},HEX2rgb:function(t){t=t.split("");return{r:+("0x"+t[0]+t[t[3]?1:0])/255,g:+("0x"+t[t[3]?2:1]+(t[3]||t[1]))/255,b:+("0x"+(t[4]||t[2])+(t[5]||t[2]))/255}},hue2RGB:function(t){var r=t*6,o=~~r%6,e=r===6?0:r-o;return{r:R([1,1-e,0,0,e,1][o]*255),g:R([e,1,1,1-e,0,0][o]*255),b:R([0,0,e,1,1,1-e][o]*255)}},rgb2hsv:function(t){var r=t.r,o=t.g,e=t.b,i=0,n,s,c;if(o<e){o=e+(e=o,0);i=-1}s=e;if(r<o){r=o+(o=r,0);i=-2/6-i;s=M.min(o,e)}n=r-s;c=r?n/r:0;return{h:c<1e-15?H&&H.hsl&&H.hsl.h||0:n?M.abs(i+(o-e)/(6*n)):0,s:r?n/r:H&&H.hsv&&H.hsv.s||0,v:r}},hsv2rgb:function(t){var r=t.h*6,o=t.s,e=t.v,i=~~r,n=r-i,s=e*(1-o),c=e*(1-n*o),a=e*(1-(1-n)*o),l=i%6;return{r:[e,c,s,s,a,e][l],g:[a,e,e,c,s,s][l],b:[s,s,a,e,e,c][l]}},hsv2hsl:function(t){var r=(2-t.s)*t.v,o=t.s*t.v;o=!t.s?0:r<1?r?o/r:0:o/(2-r);return{h:t.h,s:!t.v&&!o?H&&H.hsl&&H.hsl.s||0:o,l:r/2}},rgb2hsl:function(t,r){var o=F.rgb2hsv(t);return F.hsv2hsl(r?o:H.hsv=o)},hsl2rgb:function(t){var r=t.h*6,o=t.s,e=t.l,i=e<.5?e*(1+o):e+o-o*e,n=e+e-i,s=i?(i-n)/i:0,c=~~r,a=r-c,l=i*s*a,u=n+l,h=i-l,g=c%6;return{r:[i,h,n,n,u,i][g],g:[u,i,i,h,n,n][g],b:[n,n,u,i,i,h][g]}}};function X(t,r){var o={},e=0,i=r/2;for(var n in t){e=t[n]%r;o[n]=t[n]+(e>i?r-e:-e)}return o}function z(t,r,o){return(M.max(t.r-r.r,r.r-t.r)+M.max(t.g-r.g,r.g-t.g)+M.max(t.b-r.b,r.b-t.b))*(o?255:1)/765}function S(t,r){var o=r?1:255,e=[t.r/o,t.g/o,t.b/o],i=E.options.luminance;for(var n=e.length;n--;){e[n]=e[n]<=.03928?e[n]/12.92:M.pow((e[n]+.055)/1.055,2.4)}return i.r*e[0]+i.g*e[1]+i.b*e[2]}function A(t,r,o,e){var i={},n=o!==l?o:1,s=e!==l?e:1,c=n+s*(1-n);for(var a in t){i[a]=(t[a]*n+r[a]*s*(1-n))/c}i.a=c;return i}function $(t,r){var o=1;if(t>=r){o=(t+.05)/(r+.05)}else{o=(r+.05)/(t+.05)}return R(o*100)/100}function u(t,r,o){return t>o?o:t<r?r:t}return e}(t)}(this),function(o,e){"object"==typeof exports||("function"==typeof define&&define.amd?define(["jquery","colors"],function(t,r){return e(o,t,r)}):e(o,o.jQuery,o.Colors))}(this,function(n,s,r,b){"use strict";function o(t){d=this.color=new r(t),v=d.options,c=this}var c,d,v,m,a,x,_,C,y,k,B,e=s(document),i=s(),l="touchmove.tcp mousemove.tcp pointermove.tcp",u="touchstart.tcp mousedown.tcp pointerdown.tcp",h="touchend.tcp mouseup.tcp pointerup.tcp",w=!1,G=n.requestAnimationFrame||n.webkitRequestAnimationFrame||function(t){t()},g='<div class="cp-color-picker"><div class="cp-z-slider"><div class="cp-z-cursor"></div></div><div class="cp-xy-slider"><div class="cp-white"></div><div class="cp-xy-cursor"></div></div><div class="cp-alpha"><div class="cp-alpha-cursor"></div></div></div>';function f(t){return t.value||t.getAttribute("value")||s(t).css("background-color")||"#FFF"}function p(t){return(t=t.originalEvent&&t.originalEvent.touches?t.originalEvent.touches[0]:t).originalEvent?t.originalEvent:t}function M(t){return s(t.find(v.doRender)[0]||t[0])}function R(t){var r=s(this),o=r.offset(),e=s(n),i=v.gap;t?((m=M(r))._colorMode=m.data("colorMode"),c.$trigger=r,(a||s(g).css({margin:v.margin}).appendTo("body").show(0,function(){c.$UI=a=s(this),w=v.GPU&&a.css("perspective")!==b,x=s(".cp-z-slider",this),_=s(".cp-xy-slider",this),C=s(".cp-xy-cursor",this),y=s(".cp-z-cursor",this),k=s(".cp-alpha",this),B=s(".cp-alpha-cursor",this),v.buildCallback.call(c,a),a.prepend("<div>").children().eq(0).css("width",a.children().eq(0).width()),a._width=this.offsetWidth,a._height=this.offsetHeight}).hide()).css(v.positionCallback.call(c,r)||{left:(a._left=o.left)-(0<(a._left+=a._width-(e.scrollLeft()+e.width()))+i?a._left+i:0),top:(a._top=o.top+r.outerHeight())-(0<(a._top+=a._height-(e.scrollTop()+e.height()))+i?a._top+i:0)}).show(v.animationSpeed,function(){!0!==t&&(k.toggle(!!v.opacity)._width=k.width(),_._width=_.width(),_._height=_.height(),x._height=x.height(),d.setColor(f(m[0])),X(!0))}).off(".tcp").on(u,".cp-xy-slider,.cp-z-slider,.cp-alpha",E)):c.$trigger&&s(a).hide(v.animationSpeed,function(){X(!1),c.$trigger=null}).off(".tcp")}function E(t){var r=this.className.replace(/cp-(.*?)(?:\s*|$)/,"$1").replace("-","_");1<(t.button||t.which)||(t.preventDefault&&t.preventDefault(),t.returnValue=!1,m._offset=s(this).offset(),(r="xy_slider"===r?H:"z_slider"===r?D:F)(t),X(),e.on(h,function(t){e.off(".tcp")}).on(l,function(t){r(t),X()}))}function H(t){var r=p(t),o=r.pageX-m._offset.left,e=r.pageY-m._offset.top;d.setColor({s:o/_._width*100,v:100-e/_._height*100},"hsv")}function D(t){var r=p(t).pageY-m._offset.top;d.setColor({h:360-r/x._height*360},"hsv")}function F(t){var r=(p(t).pageX-m._offset.left)/k._width;d.setColor({},"rgb",r)}function X(t){if(void 0!==m){var r=d.colors,o=r.hueRGB,e=(r.RND.rgb,r.RND.hsl,v.dark),i=v.light,n=d.toString(m._colorModez,v.forceAlpha),s=.22<r.HUELuminance?e:i,c=.22<r.rgbaMixBlack.luminance?e:i,a=(1-r.hsv.h)*x._height,l=r.hsv.s*_._width,u=(1-r.hsv.v)*_._height,h=r.alpha*k._width,g=w?"translate3d":"",f=m[0].value,p=m[0].hasAttribute("value")&&""===f&&t!==b;_._css={backgroundColor:"rgb("+o.r+","+o.g+","+o.b+")"},C._css={transform:g+"("+l+"px, "+u+"px, 0)",left:w?"":l,top:w?"":u,borderColor:.22<r.RGBLuminance?e:i},y._css={transform:g+"(0, "+a+"px, 0)",top:w?"":a,borderColor:"transparent "+s},k._css={backgroundColor:"#"+r.HEX},B._css={transform:g+"("+h+"px, 0, 0)",left:w?"":h,borderColor:c+" transparent"},m._css={backgroundColor:p?"":n,color:p?"":.22<r.rgbaMixBGMixCustom.luminance?e:i},m.text=p?"":f!==n?n:"",t!==b?z(t):G(z)}}function z(t){_.css(_._css),C.css(C._css),y.css(y._css),k.css(k._css),B.css(B._css),v.doRender&&m.css(m._css),m.text&&m.val(m.text),v.renderCallback.call(c,m,"boolean"==typeof t?t:b)}o.prototype={render:X,toggle:R},s.fn.colorPicker=function(e){function t(){}var r=this;return e=s.extend({animationSpeed:150,GPU:!0,doRender:!0,customBG:"#FFF",opacity:!0,renderCallback:t,buildCallback:t,positionCallback:t,body:document.body,scrollResize:!0,gap:4,dark:"#222",light:"#DDD"},e),!c&&e.scrollResize&&s(n).on("resize.tcp scroll.tcp",function(){c.$trigger&&c.toggle.call(c.$trigger[0],!0)}),i=i.add(this),this.colorPicker=c||new o(e),s(this).data("colorpicker",this.colorPicker),this.options=e,s(e.body).off(".tcp").on(u,function(t){-1===i.add(a).add(s(a).find(t.target)).index(t.target)&&R()}),this.on("focusin.tcp click.tcp",function(t){return c.color.options=s.extend(c.color.options,v=r.options),R.call(this,t),!1}).on("change.tcp",function(){d.setColor(this.value||"#FFF"),r.colorPicker.render(!0)}).each(function(){var t=f(this),r=t.split("("),o=M(s(this));o.data("colorMode",r[1]?r[0].substr(0,3):"HEX").attr("readonly",v.preventFocus),e.doRender&&o.css({"background-color":t,color:function(){return.22<d.setColor(t).rgbaMixBGMixCustom.luminance?e.dark:e.light}})})},s.fn.colorPicker.destroy=function(){s("*").off(".tcp"),c.toggle(!1),i=s()}});