var functions = require('functions');

var About = module.exports;

About.fetch = function () {
    functions.showCard(null, 'Roomer', '', 'Displays free times for study rooms within select universities. iPhone and Android app at roomerapp.com', functions.getColorOptions('DATA'));
};