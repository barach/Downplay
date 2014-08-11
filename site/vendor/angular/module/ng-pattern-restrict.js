angular.module("ngPatternRestrict",[]).value("ngPatternRestrictConfig",{showDebugInfo:true}).directive("ngPatternRestrict",["ngPatternRestrictConfig",function(e){function t(t){if(e.showDebugInfo){}}return{restrict:"A",require:"?ngModel",compile:function(){var r=e;t("Loaded");return function(n,r,i,s){function h(){if(l)return;t("Initializing");p();f=r.val();if(!f)f="";t("Original value: "+f);v();l=true}function p(){o=i.pattern;t("Original pattern: "+o);var e=!!i.ngPatternRestrict?i.ngPatternRestrict:o;t("RegEx to use: "+e);g(e)}function d(){t("Uninitializing");m()}function v(){if(u)return;r.bind("input keyup click",y);t("Bound events: input, keyup, click")}function m(){if(!u)return;r.unbind("input",y);r.unbind("keyup",y);r.unbind("click",y);t("Unbound events: input, keyup, click");u=false}function g(e){try{a=new RegExp(e)}catch(t){throw"Invalid RegEx string parsed for ngPatternRestrict: "+e}}function y(e){t("Reacting to event: "+e.type);var n=r.val();var i=r.prop("validity");if(n===""&&r.attr("type")==="number"&&i&&i.badInput){t("Value cannot be verified. Should be invalid. Reverting back to: '"+f+"'");e.preventDefault();b()}else if(a.test(n)){t("New value passed validation against "+a+": '"+n+"'");w(n)}else{t("New value did NOT pass validation against "+a+": '"+n+"', reverting back to: '"+f+"'");e.preventDefault();b()}}function b(){if(s){n.$apply(function(){s.$setViewValue(f)})}r.val(f);if(!angular.isUndefined(c))S(c)}function w(e){f=e;c=E()}function E(){var e=r[0];if(document.selection){var t=document.selection.createRange();t.moveStart("character",-r.val().length);return t.text.length}else{return e.selectionStart}}function S(e){var t=r[0];if(t.createTextRange){var n=t.createTextRange();n.collapse(true);n.moveEnd("character",e);n.moveStart("character",e);n.select()}else{t.setSelectionRange(e,e)}}var o;var u=false;var a;var f;var l=false;var c;i.$observe("ngPatternRestrict",p);i.$observe("pattern",p);n.$on("$destroy",d);h()}}}}])