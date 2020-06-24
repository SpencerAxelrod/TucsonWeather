window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let key = config.OPENWEATHER_KEY;

    if(navigator.geolocation){

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            lon = pos.coords.longitude;
            lat = pos.coords.latitude;

            const openweather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
            fetch(openweather)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
        
        
    }
});