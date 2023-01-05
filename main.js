//Create a variable to store the form element

const weatherSubmit = document.querySelector('#submit');

weatherSubmit.addEventListener('click', (submitEvent) => {
    submitEvent.preventDefault();
    const city = document.querySelector('#search');
    const BASE_URL = `https://wttr.in/${city.value}?format=j1`;
    fetch(BASE_URL)
        .then((response) => response.json())
        .then(({current_condition, nearest_area, weather, request }) => {
            console.log(current_condition);
            console.log(nearest_area);
            console.log(weather);
            console.log(weather[0].avgtempF)
            console.log(request);

            const weatherData = {
                city: nearest_area[0].areaName[0].value,
                country: nearest_area[0].country[0].value,
                temperature: current_condition[0].temp_C,
                weather: weather[0].hourly[0].weatherDesc[0].value,
                region: nearest_area[0].region[0].value,
                
                today: {
                    averageTemp: weather[0].avgtempF,
                    maxTemp: weather[0].maxtempF,
                    minTemp: weather[0].mintempF,
                    totalSnow: weather[0].totalSnow_cm,
                    precip: weather[0].hourly[0].chanceofrain,
                    humidity: weather[0].hourly[0].humidity,
                    wind: weather[0].hourly[0].windspeedKmph,
                    visibility: weather[0].hourly[0].visibility,
                    pressure: weather[0].hourly[0].pressure,
                    cloudcover: weather[0].hourly[0].cloudcover,
                    FeelsLikeF: current_condition[0].FeelsLikeF,
                    FeelsLikeC: current_condition[0].FeelsLikeC,
                    uvindex: weather[0].hourly[0].uvIndex,
                    winddir: weather[0].hourly[0].winddir16Point,
                    chanceofsunshine: weather[0].hourly[0].chanceofsunshine,
                    chanceoffrost: weather[0].hourly[0].chanceoffrost,
                    chanceofsnow: weather[0].hourly[0].chanceofsnow,
                    chanceofrain: weather[0].hourly[0].chanceofrain,
                    winddirdegree: weather[0].hourly[0].winddirDegree,
                    windspeed: weather[0].hourly[0].windspeedMiles,
                    weathercode: weather[0].hourly[0].weatherCode,
                    weathericon: weather[0].hourly[0].weatherIconUrl[0].value,
                    weatherdesc: weather[0].hourly[0].weatherDesc[0].value,
                    precipInches: weather[0].hourly[0].precipInches,
                    heatindexF: weather[0].hourly[0].HeatIndexF,
                    dewpointF: weather[0].hourly[0].DewPointF,
                    windchillF: weather[0].hourly[0].WindChillF,
                    windchillC: weather[0].hourly[0].WindChillC,
                    windgustMiles: weather[0].hourly[0].WindGustMiles,
                    windgustKmph: weather[0].hourly[0].WindGustKmph,
                    cloudcover: weather[0].hourly[0].cloudcover,
                    chanceofthunder: weather[0].hourly[0].chanceofthunder,
                    chanceoffog: weather[0].hourly[0].chanceoffog,
                    weathericon: weather[0].hourly[0].weatherIconUrl[0].value,
                    weatherDesc: weather[0].hourly[0].weatherDesc[0].value,

                    
                },
                tomorrow: {
                    averageTemp: weather[1].avgtempF,
                    maxTemp: weather[1].maxtempF,
                    minTemp: weather[1].mintempF,
                    totalSnow: weather[1].totalSnow_cm,
                    precip: weather[1].hourly[0].chanceofrain,
                    humidity: weather[1].hourly[0].humidity,
                    wind: weather[1].hourly[0].windspeedKmph,
                    visibility: weather[1].hourly[0].visibility,
                    pressure: weather[1].hourly[0].pressure,
                    cloudcover: weather[1].hourly[0].cloudcover,
                    uvindex: weather[1].hourly[0].uvIndex,
                    winddir: weather[1].hourly[0].winddir16Point,
                    winddirdegree: weather[1].hourly[0].winddirDegree,
                    windspeed: weather[1].hourly[0].windspeedMiles,
                    weathericon: weather[1].hourly[0].weatherIconUrl[0].value,
                    weatherdesc: weather[1].hourly[0].weatherDesc[0].value,
                    precipInches: weather[1].hourly[0].precipInches,
                    heatindexF: weather[1].hourly[0].HeatIndexF,
                    dewpointF: weather[1].hourly[0].DewPointF,
                    windchillF: weather[1].hourly[0].WindChillF,
                    windgustMiles: weather[1].hourly[0].WindGustMiles,
                    windgustKmph: weather[1].hourly[0].WindGustKmph,
                },
                dayAfterTomorrow: {
                    averageTemp: weather[2].avgtempF,
                    maxTemp: weather[2].maxtempF,
                    minTemp: weather[2].mintempF,
                    totalSnow: weather[2].totalSnow_cm,
                    precip: weather[2].hourly[0].chanceofrain,
                    humidity: weather[2].hourly[0].humidity,
                    wind: weather[2].hourly[0].windspeedKmph,
                    visibility: weather[2].hourly[0].visibility,
                    pressure: weather[2].hourly[0].pressure,
                    cloudcover: weather[2].hourly[0].cloudcover,
                    uvindex: weather[2].hourly[0].uvIndex,
                    winddir: weather[2].hourly[0].winddir16Point,
                    winddirdegree: weather[2].hourly[0].winddirDegree,
                    windspeed: weather[2].hourly[0].windspeedMiles,
                    weathercode: weather[2].hourly[0].weatherCode,
                    weathericon: weather[2].hourly[0].weatherIconUrl[0].value,
                    weatherdesc: weather[2].hourly[0].weatherDesc[0].value,
                    precipInches: weather[2].hourly[0].precipInches,
                    heatindexF: weather[2].hourly[0].HeatIndexF,
                    dewpointF: weather[2].hourly[0].DewPointF,
                    windchillF: weather[2].hourly[0].WindChillF,
                    windgustMiles: weather[2].hourly[0].WindGustMiles,
                    windgustKmph: weather[2].hourly[0].WindGustKmph,
                },
    
            };
            
            //Function to display location or nearest area to the main section
            function displayLocation() {
                const userLocation = document.querySelector('#search');
                LocationName.textContent = userLocation.value;
                if (weatherData.city.toLowerCase() == userLocation.value.toLowerCase()) {
                    area.textContent = `Area: \n${weatherData.city}`;
                } else {
                    area.textContent = `Nearest Area: \n${weatherData.city}`;
                }
                }
            displayLocation();
            
            //Display region to the main section
            function displayRegion() {
                region.textContent = weatherData.region;
            }
            displayRegion();

            //Display country to the main section
            function displayCountry() {
                country.textContent = weatherData.country;
            }
            displayCountry();

            //Display current weather to the main section

            function displayCurrentWeather() {
                currentTemperature.textContent = `Current: ${weatherData.today.FeelsLikeF}°F`;
            }
            displayCurrentWeather();

            //Function to display location or nearest area to the main section
            function displayLocation() {
                const userLocation = document.querySelector('#search');
                LocationName.textContent = userLocation.value;
                if (weatherData.city.toLowerCase() == userLocation.value.toLowerCase()) {
                    area.textContent = `Area: \n${weatherData.city}`;
                } else {
                    area.textContent = `Nearest Area: \n${weatherData.city}`;
                }
                }
            displayLocation();
            
            //Display region to the main section
            function displayRegion() {
                region.textContent = weatherData.region;
            }
            displayRegion();

            //Display country to the main section
            function displayCountry() {
                country.textContent = weatherData.country;
            }
            displayCountry();

            //Display current weather to the main section

            function displayCurrentWeather() {
                currentTemperature.textContent = `Current: ${weatherData.today.FeelsLikeF}°F`;
            }
            displayCurrentWeather();
        
        






        })
        
        .catch((error) => {
            console.log(error);
        })
    
    });
