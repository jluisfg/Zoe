define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
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
buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><form><div class=\"row\"><div class=\"col\"><div class=\"padding\"><h5 class=\"text-center\">Por favor, agrega tu fecha de nacimiento para continuar.</h5><div class=\"list\"><label class=\"item item-input\"><input id=\"birthdate\" type=\"date\" placeholder=\"2014-01-01\" min=\"01-01-1900\" max=\"2014-01-01\"" + (jade.attr("value", data.birthdate, true, false)) + "/></label></div></div></div></div><div class=\"row\"><div class=\"col\">");
jade_mixins["submitButton"]('Actualizar');
buf.push("</div></div></form></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
