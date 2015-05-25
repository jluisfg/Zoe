define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/back@2x.png\"/></button><h1 class=\"title\"></h1><button id=\"rightButton\" class=\"button icon button-clear\"><img src=\"images/share@2x.png\"/></button></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><div class=\"padding\"><div id=\"image-wrapper\"><div id=\"image\" class=\"text-center\"><div id=\"owner\" class=\"hide badge badge-light\"></div><div class=\"block-refresher\"><div class=\"icon-refreshing\"></div><div class=\"text-refreshing\">Cargando</div></div></div></div><div id=\"caption-wrapper\" class=\"hidden text-center\"></div><textarea id=\"caption-wrapper-text\" class=\"hide\"></textarea><div id=\"like-area\" class=\"text-center\"><div id=\"like\" class=\"upvote\"><i class=\"icon ion-ios7-heart-outline\"></i></div><h3 id=\"likes\"></h3></div></div></div></div><div id=\"tabs-gallery-photo\" class=\"tabs tabs-dark tabs-icon-top hide\"><a id=\"delete\" class=\"tab-item\"><i class=\"icon ion-ios7-close-outline\"></i>Eliminar</a><a id=\"edit\" class=\"tab-item\"><i class=\"icon ion-ios7-compose-outline\"></i>Editar</a></div><div id=\"tabs-gallery-photo-edit\" class=\"tabs tabs-dark tabs-icon-top hide\"><a id=\"cancel\" class=\"tab-item\"><i class=\"icon ion-ios7-close-empty\"></i>Cancelar</a><a id=\"save\" disabled=\"disabled\" class=\"tab-item disabled\"><i class=\"icon ion-ios7-checkmark-empty\"></i>Guardar</a></div>");;return buf.join("");
};

});
