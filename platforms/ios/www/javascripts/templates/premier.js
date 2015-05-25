define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"offline\" class=\"offline offline-ui\"><div class=\"offline-ui-content\"></div><div class=\"offline-ui-retry\"></div></div><div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/menu@2x.png\"/></button><h1 class=\"title\"></h1></div><div class=\"scroll-content has-header\"><div class=\"page-content\"><div class=\"padding\"><div class=\"row\"><div class=\"col\"><img id=\"premierLogo\" src=\"images/premier_logo.png\" class=\"full-image\"/></div><div class=\"col\"></div><div class=\"col\"></div></div><h4>Suscribete al club Zoé Water Premier y obten beneficios como:</h4><ul id=\"benefits\"><li>Credencial Zoé Water Premier.</li><li>Un Kit Premier de bienvenida.</li><li>Promociones especiales cada mes.</li><li>10% de descuento en cajas de Zoé Water.</li><li>Compra exclusiva de garrafones Zoé Water.</li><li>Invitaciones a eventos exclusivos.</li></ul><div class=\"text-center\"><button id=\"information\" class=\"button button-outline\">Solicitar Informacion</button></div></div></div></div>");;return buf.join("");
};

});
