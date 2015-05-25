define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
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
buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><form class=\"row\"><div class=\"col\"><div class=\"padding\"><h5 class=\"text-center\">Puedes editar tu fecha de nacimiento.</h5><div class=\"list\"><label class=\"item item-input\"><input id=\"birthdate\" type=\"date\" placeholder=\"2014-01-01\" min=\"01-01-1900\" max=\"2014-01-01\"/></label></div><div class=\"text-center\">Fecha de nacimiento:<strong id=\"currentBirthdate\">" + (jade.escape((jade_interp = data.birthdate) == null ? '' : jade_interp)) + "</strong></div><br/>");
jade_mixins["submitButton"]();
buf.push("</div></div></form></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
