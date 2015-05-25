define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (data) {
buf.push("<span class=\"date\">" + (jade.escape((jade_interp = data.date) == null ? '' : jade_interp)) + "</span><i class=\"icon\"></i><span class=\"total\">" + (jade.escape((jade_interp = data.total) == null ? '' : jade_interp)) + "Litros</span><span class=\"percentage\">" + (jade.escape((jade_interp = data.percentage) == null ? '' : jade_interp)) + "%</span>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
};

});
