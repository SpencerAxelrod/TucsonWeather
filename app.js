window.addEventListener('load', ()=> {
    let lon;
    let lat;

    /* Hide key from public source in a .gitignore'd config.js file.  */
    let key = config.OPENWEATHER_KEY;

    let temperatureDescritption = document.querySelector('.temperature-description');
    let temperatureDegreeValue = document.querySelector('.temperature-degree_value');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');

    if(navigator.geolocation){

        function success(pos) {
            lon = pos.coords.longitude;
            lat = pos.coords.latitude;

            const openweather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
            fetch(openweather)
                .then(response =>{
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp, weather } = data.current;

                    temperatureDegreeValue.textContent = Math.round( (temp - 273.15) * (9 / 5) + 32);
                    temperatureDescritption.textContent = weather[0].main;
                    locationTimezone.textContent = data.timezone;
                    weatherIcon.src = "https://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png";

                });
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
        
    }
});