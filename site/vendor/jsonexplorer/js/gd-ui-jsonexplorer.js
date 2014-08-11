"use strict";angular.module("gd.ui.jsonexplorer",[]).directive("jsonExplorer",function(){return{restrict:"E",scope:{jsonData:"@"},link:function(e,n,t){t.$observe("jsonData",function(e){function t(e){var n=e.target,t=n.parentNode.getElementsByClassName("collapsible");if(t.length)if(t=t[0],"none"==t.style.display){var a=t.parentNode.getElementsByClassName("ellipsis")[0];t.parentNode.removeChild(a),t.style.display="",n.innerHTML="-"}else{t.style.display="none";var a=document.createElement("span");a.className="ellipsis",a.innerHTML=" &hellip; ",t.parentNode.insertBefore(a,t),n.innerHTML="+"}}var a={};a.jsString=function(e){var n,t={"\b":"b","\f":"f","\r":"r","\n":"n","	":"t"};for(n in t)-1===e.indexOf(n)&&delete t[n];e=JSON.stringify({a:e}),e=e.slice(6,-2);for(n in t)e=e.replace(new RegExp("\\\\u000"+n.charCodeAt().toString(16),"ig"),"\\"+t[n]);return this.htmlEncode(e)},a.htmlEncode=function(e){return null==e?"":e.toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},a.decorateWithSpan=function(e,n){return'<span class="'+n+'">'+this.htmlEncode(e)+"</span>"},a.arrayToHtml=function(e){var n=!1,t="",a=0;for(var r in e)a++;for(var r in e)n=!0,t+="<li>"+this.valueToHtml(e[r]),a>1&&(t+=","),t+="</li>",a--;return t=n?'[<ul class="array collapsible">'+t+"</ul>]":"[ ]"},a.objectToHtml=function(e){var n=!1,t="",a=0;for(var r in e)a++;for(var r in e)n=!0,t+='<li><span class="prop"><span class="q">"</span>'+this.jsString(r)+'<span class="q">"</span></span>: '+this.valueToHtml(e[r]),a>1&&(t+=","),t+="</li>",a--;return t=n?'{<ul class="obj collapsible">'+t+"</ul>}":"{ }"},a.valueToHtml=function(e){var n=e&&e.constructor,t="";return null==e&&(t+=this.decorateWithSpan("null","null")),e&&n==Array&&(t+=this.arrayToHtml(e)),e&&n==Object&&(t+=this.objectToHtml(e)),n==Number&&(t+=this.decorateWithSpan(e,"num")),n==String&&(t+=/^(http|https|file):\/\/[^\s]+$/i.test(e)?'<a href="'+e+'"><span class="q">"</span>'+this.jsString(e)+'<span class="q">"</span></a>':'<span class="string">"'+this.jsString(e)+'"</span>'),n==Boolean&&(t+=this.decorateWithSpan(e,"bool")),t},a.jsonToHtml=function(e){return'<div class="gd-ui-json-explorer">'+this.valueToHtml(e)+"</div>"};var r=JSON.parse(e),l=a.jsonToHtml(r);n.html(l);for(var s=angular.element(n)[0].getElementsByTagName("ul"),i=0;i<s.length;i++){var o=s[i];if(-1!=o.className.indexOf("collapsible")&&"LI"==o.parentNode.nodeName){var c=document.createElement("div");c.className="collapser",c.innerHTML="-",c.addEventListener("click",t,!1),o.parentNode.insertBefore(c,o.parentNode.firstChild)}}})}}});