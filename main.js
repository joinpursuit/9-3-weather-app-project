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

            //Function to display chance of sunshine to the main section
            function displayChanceOfSunshine() {
                sunshine.textContent = `Chance of Sunshine: ${weatherData.today.chanceofsunshine}%`;
            }
            displayChanceOfSunshine();

            //Function to display chance of rain to the main section
            function displayChanceOfRain() {
                rain.textContent = `Chance of Rain: ${weatherData.today.chanceofrain}%`;
            }
            displayChanceOfRain();

            //Function to display chance of snow to the main section
            function displayChanceOfSnow() {
                snow.textContent = `Chance of Snow:${weatherData.today.chanceofsnow}%`;
            }
            displayChanceOfSnow();

            //Function to display chance of thunder to the main section
            // function displayChanceOfThunder() {
            //     thunder.textContent = `Chance of Thunder:${weatherData.today.chanceofthunder}`;
            // }
            //displayChanceOfThunder();

            //Function to display chance of fog to the main section
            // function displayChanceOfFog() {
            //     fog.textContent = `Chance of Fog:${weatherData.today.chanceoffog}`;
            // }
            // displayChanceOfFog();


            //Function to display cloud cover to the main section
            // function displayCloudCover() {
            //     cloudcover.textContent = `Cloud Cover:${weatherData.today.cloudcover}`;
            // }
            // displayCloudCover();

            //Function to display humidity to the main section  
            // function displayHumidity() {
            //     humidity.textContent = `Humidity:${weatherData.today.humidity}`;
            // }
            // displayHumidity();

            //Function to display wind speed to the main section
            // function displayWindSpeed() {
            //     windspeed.textContent = `Wind Speed:${weatherData.today.windspeed}`;
            // }
            // displayWindSpeed();

            //function displayWindDirection() {
            //     winddir.textContent = `Wind Direction:${weatherData.today.winddir}`;
            // }
            // displayWindDirection();

            //Function to display wind direction to the main section
            // function displayWindDirectionDegree() {
            //     winddirdegree.textContent = `Wind Direction Degree:${weatherData.today.winddirdegree}`;
            // }
            // displayWindDirectionDegree();

            //Function to display visibility to the main section
            // function displayVisibility() {
            //     visibility.textContent = `Visibility:${weatherData.today.visibility}`;
            // }
            // displayVisibility();

            //Function to display wind chill fahrenheit to the main section
            // function displayWindChillF() {
            //     windchillF.textContent = `Wind Chill:${weatherData.today.windchillF}`;
            // }
            // displayWindChillF();

            //Function to display wind chill celsius to the main section
            // function displayWindChillC() {
            //     windchillC.textContent = `Wind Chill:${weatherData.today.windchillC}`;
            // }
            // displayWindChillC();

            //Display average temp to the main section for today
            function displayAverageTemp() {
                todayAvg.textContent = `Today average temp: ${weatherData.today.averageTemp}°F`;
            }
            displayAverageTemp();


            //Display max temp temp to the main section for today
            function displayMaxTemp() {
                todayMax.textContent = `Today Max Temp: ${weatherData.today.maxTemp}°F`;
            }
            displayMaxTemp();

            //Display min temp temp to the main section for today
            function displayMinTemp() {
                todayMin.textContent = `Today min temp: ${weatherData.today.minTemp}°F`;
            }
            displayMinTemp();

            //Display average temp to the main section for tomorrow
            function displayAverageTempTomorrow() {
                tomorrowAvg.textContent = `Tomorrow average temp: ${weatherData.tomorrow.averageTemp}°F`;
            }
            displayAverageTempTomorrow();

            //Display max temp temp to the main section for tomorrow
            function displayMaxTempTomorrow() {
                tomorrowMax.textContent = `Tomorrow max temp: ${weatherData.tomorrow.maxTemp}°F`;
            }
            displayMaxTempTomorrow();

            //Display min temp temp to the main section for tomorrow
            function displayMinTempTomorrow() {
                tomorrowMin.textContent = `Tomorrow min temp: ${weatherData.tomorrow.minTemp}°F`;
            }
            displayMinTempTomorrow();

            //Display average temp to the main section for day after tomorrow
            function displayAverageTempDayAfterTomorrow() {
                TwoDaysLaterAvg.textContent = `2 days later temp average: ${weatherData.dayAfterTomorrow.averageTemp}°F`;
            }
            displayAverageTempDayAfterTomorrow();

            //Display max temp temp to the main section for day after tomorrow
            function displayMaxTempDayAfterTomorrow() {
                TwoDaysLaterMax.textContent = `2 days later temp max: ${weatherData.dayAfterTomorrow.maxTemp}°F`;
            }
            displayMaxTempDayAfterTomorrow();

            //Display min temp temp to the main section for day after tomorrow
            function displayMinTempDayAfterTomorrow() {
                TwoDaysLaterMin.textContent = `2 days later min temp:${weatherData.dayAfterTomorrow.minTemp}°F`;
            }
            displayMinTempDayAfterTomorrow();

            //Function to remove aside
            function removeAside() {
                if (displayLocation) {
                    const remove = document.querySelectorAll('.remove');
                    remove.forEach(removeElement => {
                        removeElement.remove();
                    })
                }
            }
            removeAside();

            //Function to display location in the ul
            function displayLocationAside() {
                const location = document.createElement('li');
                //location.textContent = weatherData.city;
                const previousSearchLink = document.createElement('a');
                previousSearchLink.setAttribute('href', '#');
                previousSearchLink.textContent = weatherData.city;
                location.append(previousSearchLink);

                const ul = document.querySelector('#previous');
                const userCity = document.querySelector('#search').value;
                previousSearchLink.textContent = `${userCity} - ${weatherData.today.FeelsLikeF}°F`;
                ul.append(location);
            }
            displayLocationAside();

            

        
        






        })
        
        .catch((error) => {
            console.log(error);
        })
    
    });
