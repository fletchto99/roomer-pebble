//Imports
var config = require('Config.json');
var Settings = require('settings');
var functions = require('functions');

Settings.config(
    {
        url: (config.SETTINGS_URL )
    },
    function(e) {
        if (!e.response) {
            functions.showErrorCard('Error saving settings!');
        }
    }
);

//Setup the app
setTimeout(function() {
    functions.init();
}, 800);