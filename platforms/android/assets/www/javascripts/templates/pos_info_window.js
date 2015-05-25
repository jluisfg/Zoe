define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
buf.push("<div class=\"infobox-wrapper\"><button class=\"button close button-clear\"></button><div id=\"infoBox\"><h4>" + (jade.escape((jade_interp = data.nombre) == null ? '' : jade_interp)) + "</h4><dl>");
if ((data.direc))
{
buf.push("<dt>Direccion</dt><dd>" + (jade.escape((jade_interp = data.direc) == null ? '' : jade_interp)) + "</dd>");
}
if ((data.ciudad))
{
buf.push("<dt>Ciudad</dt><dd>" + (jade.escape((jade_interp = data.ciudad) == null ? '' : jade_interp)) + "</dd>");
}
if ((data.estado))
{
buf.push("<dt>Estado</dt><dd>" + (jade.escape((jade_interp = data.estado) == null ? '' : jade_interp)) + "</dd>");
}
if ((data.colonia))
{
buf.push("<dt>Colonia</dt><dd>" + (jade.escape((jade_interp = data.colonia) == null ? '' : jade_interp)) + "</dd>");
}
if ((data.cp))
{
buf.push("<dt>C.P.</dt><dd>" + (jade.escape((jade_interp = data.cp) == null ? '' : jade_interp)) + "</dd>");
}
if ((data.tel))
{
buf.push("<dt>Telefono</dt><dd><a" + (jade.attr("href", "tel:" + (data.tel) + "", true, false)) + ">" + (jade.escape((jade_interp = data.tel) == null ? '' : jade_interp)) + "</a></dd>");
}
if ((data.correo))
{
buf.push("<dt>Email</dt><dd><a" + (jade.attr("href", "mailto:" + (data.correo) + "", true, false)) + ">" + (jade.escape((jade_interp = data.correo) == null ? '' : jade_interp)) + "</a></dd>");
}
if ((data.contacto))
{
buf.push("<dt>Contacto</dt><dd>" + (jade.escape((jade_interp = data.contacto) == null ? '' : jade_interp)) + "</dd>");
}
buf.push("</dl></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
