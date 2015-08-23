function getQueryParam(variable, def) {
    var result = def;
    try {
        var obj = JSON.parse(decodeURIComponent(window.location.hash.substr(1)));
        if (variable in obj) {
            result = obj[variable];
        }
    } catch(ignored) {
    }
    return result;
}

$(function () {
    var loading = true;
    var failed = false;
    var university = document.getElementById('university');
    var savebutton = document.getElementById('savebutton');
    var donatebutton = document.getElementById('donatebutton');

    savebutton.disabled = true;

    $.ajax({
        type: 'POST',
        url: 'api.php',
        dataType: 'json',
        data: {
            method:'schools'
        },
        success: function(data) {
            savebutton.disabled = false;
            university.disabled = false;
            university.innerHTML = '';
            data.forEach(function(school){
                var elem = document.createElement('option');
                elem.className = 'item-select-option';
                elem.value = school.id;
                if (school.id == getQueryParam('university')) {
                    elem.selected = true;
                }
                elem.textContent = school.proper_name;
                university.appendChild(elem);
            });
            loading = false;
        },
        error: function() {
            loading = false;
            failed = true;
            savebutton.value = 'Close';
            university.innerHTML = '';
            var elem = document.createElement('option');
            elem.className = 'item-select-option';
            elem.textContent = 'Error!';
            university.appendChild(elem);
            alert('There was an error while loading the list of schools, please try again later!');
        }
    });

    donatebutton.addEventListener('click', function () {
        savebutton.value = 'Loading PayPal...';
        savebutton.disabled = true;
        donatebutton.value = 'Thank You!';
        donatebutton.disabled = true;
        document.location = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=3PXVE99RCWGRQ&lc=CA&item_name=Roomer%20for%20Pebble%20by%20Matt%20Langlois&currency_code=CAD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted&return=fletchto99.com/other/pebble/metup/settings.html';
    });

    savebutton.addEventListener('click', function() {
        if (loading) {
            alert('Please wait until the list of universities has loaded before saving!');
        } else if (failed) {
            alert('There was an error while loading the list of schools, please try again later!');
        } else {
            savebutton.value = 'Saving...';
            savebutton.disabled = true;
            document.location =  getQueryParam('return_to', 'pebblejs://close#') + encodeURIComponent(JSON.stringify({
                    'university': university.value
                }));
        }
    });

});