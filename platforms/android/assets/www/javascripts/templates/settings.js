define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><br/><div id=\"options\" class=\"list clean\"><a id=\"updateName\" class=\"item item-icon-right item-dark\">Cambiar Nombre<i class=\"ion-ios7-arrow-right icon\"></i></a><a id=\"updateEmail\" class=\"item item-icon-right item-dark\">Cambiar Correo<i class=\"ion-ios7-arrow-right icon\"></i></a><a id=\"updatePassword\" class=\"item item-icon-right item-dark\">Cambiar Contraseña<i class=\"ion-ios7-arrow-right icon\"></i></a><a id=\"updateWeight\" class=\"item item-icon-right item-dark\">Configurar Consumo<i class=\"ion-ios7-arrow-right icon\"></i></a><a id=\"updateBirthdate\" class=\"item item-icon-right item-dark\">Fecha de Nacimiento<i class=\"ion-ios7-arrow-right icon\"></i></a><a id=\"signout\" class=\"item item-icon-right item-assertive\">Cerrar Sesión</a></div><div class=\"text-center\"><img id=\"settingsBottle\" src=\"images/bottle.png\"/></div><div class=\"text-center\"><button id=\"tos\" class=\"button button-clear\"><strong>Ver términos de uso</strong></button></div><a href=\"http://sourcecode.mx\" class=\"button button-clear button-block text-center\">Welcome to the Source/Code</a></div></div>");;return buf.join("");
};

});
