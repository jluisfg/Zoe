define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"menuOverlay\" class=\"modal-backdrop active\"></div><ul class=\"text-center\"><li><button type=\"button\" data-view=\"#home\" root=\"root\" class=\"button-clear button\">Consumo Diario</button></li><li><button type=\"button\" data-view=\"#about\" root=\"root\" class=\"button-clear button\">¿Qué es Zoé Water?</button></li><li><button type=\"button\" data-view=\"#gallery\" root=\"root\" class=\"button-clear button\">Comparte tu Foto</button></li><li><button type=\"button\" data-view=\"#blog\" root=\"root\" class=\"button-clear button\">Blog Alcalino</button></li><li><button type=\"button\" data-view=\"#premier\" root=\"root\" class=\"button-clear button\">Zoé Water Premier</button></li><li><button type=\"button\" data-view=\"#pos\" root=\"root\" class=\"button-clear button\">Puntos de Venta</button></li><li><button id=\"menuStoreItem\" type=\"button\" data-view=\"#store\" root=\"root\" class=\"button-clear button\">Tienda en Línea</button></li></ul>");;return buf.join("");
};

});
