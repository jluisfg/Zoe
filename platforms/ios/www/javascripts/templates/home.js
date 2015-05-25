define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div><div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/menu@2x.png\"/></button><h1 class=\"title\"> <img src=\"images/logo@2x.png\"/></h1><button id=\"rightButton\" class=\"button icon button-clear\"><img src=\"images/settings@2x.png\"/></button></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><div id=\"homeGreeting\" class=\"padding-top\"><div class=\"h4 text-center\">¡Hola <span id=\"username\">" + (jade.escape((jade_interp = data.username) == null ? '' : jade_interp)) + "!</span></div><div class=\"h4 text-center\">Tu meta del día son <span id=\"goal\">" + (jade.escape((jade_interp = data.goal) == null ? '' : jade_interp)) + "</span></div></div><div class=\"text-center grid\"><div class=\"row\"><div class=\"col text-right\"><button id=\"stats\" type=\"button\" class=\"button button-dark button-small\">Estadísticas</button></div><div class=\"col text-left\"><button id=\"tips\" type=\"button\" class=\"button button-dark button-small\">Tips</button></div></div></div><div id=\"goalArea\" class=\"text-center\"><div id=\"circle\"></div><button id=\"track\" type=\"button\"></button></div><div class=\"text-center h3\"><span id=\"percentage\"></span><span>%</span></div><div class=\"text-center\"><button id=\"share\" class=\"button button-energized\">Compartir</button></div></div></div><div class=\"hide\"><button id=\"settings\" type=\"button\" data-view=\"Settings/index\" child=\"child\"></button><button id=\"weight\" type=\"button\" data-view=\"Settings/weight\" child=\"child\"></button><audio src=\"audio/confirmation.wav\" id=\"confirmation-audio\"></audio></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
