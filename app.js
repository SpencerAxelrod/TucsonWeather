window.addEventListener('load', ()=> {
    let lon;
    let lat;

    /* Hide key from public source in a .gitignore'd config.js file.  */
    let key = config.OPENWEATHER_KEY;

    let temperatureDegreeDiv = document.querySelector('.temperature-degree_div');
    let temperatureDegreeValue = document.querySelector('.temperature-degree_value');
    let temperatureDegreeUnit = document.querySelector('.temperature-degree_unit');
    let temperatureDescritption = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');

    function getTucsonWeatherData( ) {
        lat = 32.2226;
        lon = -110.9747;

        const openweather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
        fetch(openweather)
            .then(response =>{
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);


                const { temp, weather } = data.current;

                let temp_K = temp;
                let temp_C = Math.round(temp_K - 273.15);
                let temp_F = Math.round( (temp_K - 273.15) * (9 / 5) + 32);

                temperatureDegreeValue.textContent = temp_F;
                temperatureDescritption.textContent = weather[0].main;
                weatherIcon.src = "https://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png";

                temperatureDegreeDiv.addEventListener('click', () => {
                    if (temperatureDegreeUnit.textContent === "F") {
                        temperatureDegreeUnit.textContent = "C"
                        temperatureDegreeValue.textContent = temp_C;
                    } else {
                        temperatureDegreeUnit.textContent = "F"
                        temperatureDegreeValue.textContent = temp_F;
                    }
                })

            });
    };

    getTucsonWeatherData();
        
});