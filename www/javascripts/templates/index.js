define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div><div class=\"scroll-content\"><div class=\"page-content\"><div class=\"padding\"><div class=\"row\"><div class=\"col\"><div class=\"padding-large\"><img src=\"images/logo-color.png\" class=\"full-image\"/></div></div></div><div class=\"padding-large\"><button id=\"facebook\" type=\"button\" class=\"button button-block button-positive\">Registro con Facebook</button><button id=\"authSignup\" type=\"button\" data-view=\"Auth/new\" child=\"child\" class=\"button button-block button-stable\">Registro con Mail</button><button id=\"authLogin\" type=\"button\" data-view=\"Auth/login\" child=\"child\" class=\"button button-block button-stable\">Ya tengo cuenta</button></div></div></div></div>");;return buf.join("");
};

});
