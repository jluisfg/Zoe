define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div><div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/menu@2x.png\"/></button><h1 class=\"title\"></h1><button id=\"rightButton\" class=\"button icon button-clear\"><img src=\"images/location@2x.png\"/></button></div><div class=\"scroll-content has-header\"><div id=\"map\" class=\"page-content\"></div></div>");;return buf.join("");
};

});
