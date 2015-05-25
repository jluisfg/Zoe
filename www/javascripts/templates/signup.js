define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div>");
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
buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><form><div class=\"row\"><div class=\"col\"><div class=\"padding\"><div class=\"list\"><label class=\"item item-input\"><input id=\"username\" type=\"text\" placeholder=\"Nombre de usuario\" autocomplete=\"off\" autocapitalize=\"off\"/></label></div><div class=\"list\"><label class=\"item item-input\"><input id=\"email\" type=\"email\" placeholder=\"Correo electronico\"/></label></div><h5>Fecha de nacimiento</h5><div class=\"list\"><label class=\"item item-input\"><input id=\"birthdate\" type=\"date\" placeholder=\"01-01-1996\" min=\"01-01-1900\" max=\"01-01-2014\"/></label></div></div></div></div><div class=\"row\"><div class=\"col\">");
jade_mixins["submitButton"]('Siguiente');
buf.push("<br/><div class=\"text-center\">Al crear tu cuenta confirmas que has leido y <button id=\"authTos\" type=\"button\" class=\"button-clear\"><strong>Aceptas los términos de uso</strong></button></div></div></div></form></div></div>");;return buf.join("");
};

});
