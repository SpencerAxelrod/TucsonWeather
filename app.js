window.addEventListener('load', ()=> {
    let long;
    let lat;

    if(navigator.geolocation){

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }
});