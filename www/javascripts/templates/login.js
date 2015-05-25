define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div><div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><form class=\"row\"><div class=\"col\"><div class=\"padding\"><div class=\"list\"><label class=\"item item-input\"><input id=\"username\" type=\"text\" placeholder=\"Usuario\" autocomplete=\"off\" autocapitalize=\"off\"/></label></div><div class=\"list\"><label class=\"item item-input\"><input id=\"password\" type=\"password\" placeholder=\"Contraseña\"/></label></div><div class=\"text-center\"><button type=\"submit\" class=\"button button-outline button-light\">Siguiente</button></div><br/><div class=\"text-center\"><button id=\"forgot\" type=\"button\" data-view=\"Auth/forgot\" child=\"child\" class=\"button button-clear\">¿Olvidaste tu usuario o contraseña?</button></div></div></div></form></div></div>");;return buf.join("");
};

});
