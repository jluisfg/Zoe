define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"bar bar-header bar-dark\"><button id=\"leftButton\" class=\"button icon button-clear\"><img src=\"images/close@2x.png\"/></button><h1 class=\"title\"></h1><button id=\"rightButton\" class=\"button icon button-clear\"><img src=\"images/share@2x.png\"/></button></div><div class=\"scroll-content has-tabs has-header\"><div class=\"page-content animated\"><div class=\"padding\"><div class=\"ct-chart\"></div></div></div></div><div id=\"tabs\" class=\"tabs tabs-dark tabs-icon-top\"><a id=\"weekly\" class=\"tab-item active\"><i class=\"icon ion-stats-bars\"></i>Última semana</a><a id=\"monthly\" class=\"tab-item\"><i class=\"icon ion-calendar\"></i>Último mes</a></div>");;return buf.join("");
};

});
