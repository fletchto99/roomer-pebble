//Imports
var config = require('Config.json');
var Settings = require('settings');
var functions = require('functions');

var university = (Settings.data('university') ? 'university=' + encodeURIComponent(Settings.data('university')) : '');

Settings.config({url: (config.SETTINGS_URL + university )}, function (e) {
        if (!e.response) {
            return;
        }
        var data = JSON.parse(decodeURIComponent(e.response));
        Settings.data('university', data.university);
    });

//Setup the app
setTimeout(function() {
    functions.init();
}, 800);