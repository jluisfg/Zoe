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
buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><br/><div id=\"settings-weight-items\" class=\"list clean\"><label class=\"item item-radio item-dark\"><input id=\"settingsConsumptionByWeightToggle\" type=\"radio\" name=\"consumptionType\" value=\"weight\"/><div class=\"item-content\">Por Peso</div><i class=\"radio-icon ion-checkmark\"></i></label><label class=\"item item-radio item-dark\"><input id=\"settingsCustomConsumptionToggle\" type=\"radio\" name=\"consumptionType\" value=\"custom\"/><div class=\"item-content\">Por Litros</div><i class=\"radio-icon ion-checkmark\"></i></label></div><form><div id=\"consumptionByCustom\" class=\"hide\"><p class=\"padding text-center\">Introduce una cantidad en litros,<br/>esa cantidad sera tu consumo óptimo diario.</p><div class=\"list\"><label class=\"item item-input\"><div class=\"input-label\">Litros</div>");
if ((data.liters))
{
buf.push("<input id=\"lts\" type=\"number\" placeholder=\"00.00\" autocomplete=\"off\" autocapitalize=\"off\"" + (jade.attr("value", "" + (data.liters) + "", true, false)) + " class=\"text-center\"/>");
}
else
{
buf.push("<input id=\"lts\" type=\"number\" placeholder=\"00.00\" autocomplete=\"off\" autocapitalize=\"off\" class=\"text-center\"/>");
}
buf.push("</label></div><br/></div><div id=\"consumptionByWeight\" class=\"hide\"><p class=\"padding text-center\">Para generar tu consumo ideal,<br/>necesitamos conocer tu peso en kilos.</p><div class=\"list\"><label class=\"item item-input\"><div class=\"input-label\">Kilogramos</div>");
if ((data.weight))
{
buf.push("<input id=\"kgs\" type=\"number\" placeholder=\"00.00\" autocomplete=\"off\" autocapitalize=\"off\"" + (jade.attr("value", "" + (data.weight) + "", true, false)) + " class=\"text-center\"/>");
}
else
{
buf.push("<input id=\"kgs\" type=\"tel\" placeholder=\"00.00\" autocomplete=\"off\" autocapitalize=\"off\" class=\"text-center\"/>");
}
buf.push("</label></div><br/></div>");
jade_mixins["submitButton"]();
buf.push("</form></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
