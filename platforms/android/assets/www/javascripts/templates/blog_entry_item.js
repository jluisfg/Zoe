define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
buf.push("<div class=\"item item-image\">");
if ((data.image && data.image.url))
{
buf.push("<img" + (jade.attr("src", data.image.url, true, false)) + "/>");
}
else
{
buf.push("<img src=\"images/blog_placeholder.jpg\"/>");
}
buf.push("</div><div class=\"item item-body\"><h2 class=\"positive\">" + (jade.escape((jade_interp = data.title) == null ? '' : jade_interp)) + "</h2><p class=\"calm\">" + (jade.escape((jade_interp = data.description) == null ? '' : jade_interp)) + "</p><button type=\"button\" class=\"button button-energized button-block text-center\">Leer mas</button></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
