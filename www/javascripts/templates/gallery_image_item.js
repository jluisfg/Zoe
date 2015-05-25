define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (image) {
buf.push("<div class=\"rounded\"><img" + (jade.attr("src", image.url, true, false)) + " class=\"full-image\"/></div>");}.call(this,"image" in locals_for_with?locals_for_with.image:typeof image!=="undefined"?image:undefined));;return buf.join("");
};

});
