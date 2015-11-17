//Imports
var config = require('Config.json');
var Settings = require('settings');
var functions = require('functions');

var card = null;

Settings.config(
    {
        url: (config.SETTINGS_URL )
    },
    function(e) {
        if (!e.response) {
            functions.showErrorCard('Error saving settings!');
        }
        if (card != null) {
            card = functions.init();
            card.hide();
        }
    }
);

//Setup the app
setTimeout(function() {
    card = functions.init();
}, 800);