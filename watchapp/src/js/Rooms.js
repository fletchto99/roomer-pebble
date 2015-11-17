var UI = require('ui');
var functions = require('functions');
var ajax = require('ajax');


var Rooms = module.exports;

function getRooms(schoolID, building_code) {
    loadingCard = functions.showLoadingCard('Rooms', 'Populating rooms list...');
    ajax({
             url: functions.getAPIURL(),
             type: 'json',
             method: 'post',
             data: {
                 method: 'rooms',
                 schoolid: schoolID,
                 building: building_code
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
                    title: data[i].name,
                    subtitle: data[i].time_left
                };
            }
            var menu = new UI.Menu({
                sections: [{
                    title: 'Rooms in '+building_code+' - ' + data.length, items: menuItems
                }],
                highlightBackgroundColor: '#00AA55'
            });

            menu.on('select', function (event) {
            });
            menu.show();
        }
    }, function (error) {
        functions.showErrorCard('Error contacting server.', loadingCard);
        console.log('Error loading buildings ' + error)
    });
}

Rooms.fetch = function (schoolID, building) {
    if (!isNaN(schoolID) && building) {
        getRooms(schoolID, building);
    } else {
        functions.showErrorCard('Invalid building selected! How did this happen?');
    }
};
