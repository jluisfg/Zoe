define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"modal-backdrop active\"></div><div class=\"modal\"><div class=\"text-center padding-large\"><button id=\"deleteLast\" type=\"button\" disabled=\"disabled\" class=\"button button-dark\">Borrar Último Consumo</button><div id=\"bottles\" class=\"padding-large row\"><div class=\"col col-bottom\"><a href=\"#\" data-value=\"300\" class=\"check\"><img src=\"images/check_250.png\" class=\"full-image\"/></a></div><div class=\"col col-bottom\"><a href=\"#\" data-value=\"500\" class=\"check\"><img src=\"images/check_500.png\" class=\"full-image\"/></a></div><div class=\"col\"><a href=\"#\" data-value=\"900\" class=\"check\"><img src=\"images/check_900.png\" class=\"full-image\"/></a></div></div><button class=\"button button-dark close\">Cancelar</button></div></div>");;return buf.join("");
};

});
