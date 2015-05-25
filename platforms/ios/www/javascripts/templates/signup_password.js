define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_mixins["submitButton"] = function(text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"text-center\"><button type=\"submit\" class=\"button button-outline button-light\">");
if ( !text)
{
buf.push("Cambiar");
}
else
{
buf.push("" + (jade.escape((jade_interp = text) == null ? '' : jade_interp)) + "");
}
buf.push("</button></div>");
};
buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><form class=\"row\"><div class=\"col\"><div class=\"padding\"><div class=\"list\"><label class=\"item item-input\"><input id=\"password\" type=\"password\" placeholder=\"Contraseña\"/></label></div><div class=\"list\"><label class=\"item item-input\"><input id=\"passwordConfirmation\" type=\"password\" placeholder=\"Contraseña\"/></label></div>");
jade_mixins["submitButton"]('Siguiente');
buf.push("<br/><div class=\"text-center\">Al crear tu cuenta confirmas que has leido y <button id=\"authTos\" type=\"button\" class=\"button-clear\"><strong>Aceptas los términos de uso</strong></button></div></div></div></form></div></div>");;return buf.join("");
};

});
