define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
buf.push("<div class=\"h2 dark\"><div class=\"h2 dark\"><strong>Hoy</strong></div><div class=\"h2 dark\">ganaste</div><h2 class=\"dark\">el <strong>" + (jade.escape((jade_interp = data.total) == null ? '' : jade_interp)) + "% </strong>de tu</h2><div class=\"h2 dark\">hidratación.</div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
