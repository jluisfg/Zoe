define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

if(!message){var message = 'Ha ocurrido un error.'}
buf.push("<div class=\"row error-message\"><div class=\"col col-center\"><div class=\"padding-large\"><h1><div class=\"icon ion-alert-circled\"></div></h1><h2>" + (jade.escape((jade_interp = message) == null ? '' : jade_interp)) + "</h2></div></div></div>");;return buf.join("");
};

});
