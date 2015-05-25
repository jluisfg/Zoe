define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"modal-backdrop active\"></div><div class=\"modal\"><div class=\"text-center padding\"><h1>Fotografía</h1><div id=\"image\"></div></div><div class=\"text-center padding\"><textarea id=\"caption\" placeholder=\"Agrega una descripción a tu foto\"></textarea></div><div class=\"padding row\"><div class=\"col\"><button id=\"save\" class=\"button button-energized button-block\">Compartir</button></div><div class=\"col\"><button data-dismiss=\"data-dismiss\" class=\"button button-dark button-block\">Cancelar</button></div></div></div>");;return buf.join("");
};

});
