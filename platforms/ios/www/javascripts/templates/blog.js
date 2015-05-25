define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div><div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/menu@2x.png\"/></button><h1 class=\"title\"></h1><button id=\"rightButton\" class=\"button icon button-clear\"><img src=\"images/reload@2x.png\"/></button></div><div class=\"scroll-content has-header\"><div class=\"page-content animated\"><div id=\"entries\"></div></div><div class=\"ion-infinite-scroll\"><div class=\"scroll-infinite\"><div class=\"scroll-infinite-content\"><div class=\"icon ion-loading-d icon-refreshing\"></div><div class=\"h5\">Cargando...</div></div></div></div></div><div class=\"hide\"><button id=\"entry\" type=\"button\" data-view=\"Blog/entry\" child=\"child\"></button></div>");;return buf.join("");
};

});
