var functions = require('functions');

var About = module.exports;

About.fetch = function () {
    functions.showCard(null, 'Roomer', '', 'Test', functions.getColorOptions('DATA'));
};