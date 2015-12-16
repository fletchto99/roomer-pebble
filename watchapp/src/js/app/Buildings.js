var functions = require('functions');
var ajax = require('ajax');
var rooms = require('Rooms');
var UI = require('ui');

var Buildings = module.exports;

function getBuildings(schoolID) {
    loadingCard = functions.showLoadingCard('Buildings', 'Populating buildings...');
    ajax({
            url: functions.getAPIURL(),
            type: 'json',
            method: 'post',
            data: {
                method: 'buildings',
                schoolid: schoolID
            },
            cache: false
        }, function (data) {
            if (data.error) {
                functions.showErrorCard(data.error, loadingCard);
            } else {
                loadingCard.hide();
                var menuItems = [data.length];
                for (var i = 0; i < data.length; i++) {
                    menuItems[i] = {
                        title: data[i]
                    };
                }
                var menu = new UI.Menu({
                    sections: [{
                        title: 'Buildings - ' + data.length, items: menuItems
                    }],
                    highlightBackgroundColor: '#00AA55'
                });

                menu.on('select', function (event) {
                    rooms.fetch(schoolID, menuItems[event.itemIndex].title);
                });
                menu.show();
            }
        }, function (error, status, request) {
            console.log(error);
            console.log(status);
            functions.showErrorCard('Error contacting server.', loadingCard);
            console.log('Error loading buildings ' + error)
        });
}

Buildings.fetch = function (schoolID) {
    if (!isNaN(schoolID)) {
        getBuildings(schoolID);
    } else {
        functions.showErrorCard('Invalid school selected. Please check the school you have selected in your settings.');
    }
};
