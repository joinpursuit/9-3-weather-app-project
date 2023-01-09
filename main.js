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
            console.log('123131',weather);
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
                    chanceoffog: weather[0].hourly[0].chanceoffog,
                    chanceofwindy: weather[0].hourly[0].chanceofwindy,
                    chanceofthunder: weather[0].hourly[0].chanceofthunder,
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

            //console.log('12313212', weatherData.today.weatherDesc);
            console.log('232112',weather[0].hourly[0].weatherDesc)
            const weatherDescriptions = weather[0].hourly[0].weatherDesc.map(hour => hour.value.toLowerCase());

            console.log('weatherDescriptions', weatherDescriptions);
            


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
                //region.textContent = `Region: ${weatherData.region}`;
                const region = document.querySelector('#region');
                region.textContent = `Region: ${weatherData.region}`;
            }
            displayRegion();



            //Display country to the main section
            function displayCountry() {
                country.textContent = `Country: ${weatherData.country}`;
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
                todayAvg.textContent = `Today Average temp: ${weatherData.today.averageTemp}°F`;
            }
            displayAverageTemp();


            //Display max temp temp to the main section for today
            function displayMaxTemp() {
                todayMax.textContent = `Today Max Temp: ${weatherData.today.maxTemp}°F`;
            }
            displayMaxTemp();

            //Display min temp temp to the main section for today
            function displayMinTemp() {
                todayMin.textContent = `Today Min Temp: ${weatherData.today.minTemp}°F`;
            }
            displayMinTemp();

            //Display average temp to the main section for tomorrow
            function displayAverageTempTomorrow() {
                tomorrowAvg.textContent = `Tomorrow Average Temp: ${weatherData.tomorrow.averageTemp}°F`;
            }
            displayAverageTempTomorrow();

            //Display max temp temp to the main section for tomorrow
            function displayMaxTempTomorrow() {
                tomorrowMax.textContent = `Tomorrow Max Temp: ${weatherData.tomorrow.maxTemp}°F`;
            }
            displayMaxTempTomorrow();

            //Display min temp temp to the main section for tomorrow
            function displayMinTempTomorrow() {
                tomorrowMin.textContent = `Tomorrow Min Temp: ${weatherData.tomorrow.minTemp}°F`;
            }
            displayMinTempTomorrow();

            //Display average temp to the main section for day after tomorrow
            function displayAverageTempDayAfterTomorrow() {
                TwoDaysLaterAvg.textContent = `Two Days Later Temp Average: ${weatherData.dayAfterTomorrow.averageTemp}°F`;
            }
            displayAverageTempDayAfterTomorrow();

            //Display max temp temp to the main section for day after tomorrow
            function displayMaxTempDayAfterTomorrow() {
                TwoDaysLaterMax.textContent = `Two Days Later Temp Max: ${weatherData.dayAfterTomorrow.maxTemp}°F`;
            }
            displayMaxTempDayAfterTomorrow();

            //Display min temp temp to the main section for day after tomorrow
            function displayMinTempDayAfterTomorrow() {
                TwoDaysLaterMin.textContent = `Two Days Later Min Temp:${weatherData.dayAfterTomorrow.minTemp}°F`;
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
                previousSearchLink.setAttribute('id', 'already_searched')
                previousSearchLink.setAttribute('href', '#');
                previousSearchLink.setAttribute('class', 'styleATag');
                previousSearchLink.textContent = weatherData.city;
                location.append(previousSearchLink);

                const ul = document.querySelector('#previous');
                const userCity = document.querySelector('#search').value;
                previousSearchLink.textContent = `${userCity} - ${weatherData.today.FeelsLikeF}°F`;
                ul.append(location);
            }
            displayLocationAside();

           //Function to give previous search links functionality display to the main section
            
            
           function previousSearchLink() {
               const previousSearch = document.querySelectorAll('#already_searched');
               console.log('12',previousSearch)
            previousSearch.forEach(link => {
                link.addEventListener('click', (clickEvent) => {
                    clickEvent.preventDefault();
                    link = BASE_URL
                    
                    
                
                    

                   

                })
            })
        }
        previousSearchLink();
            
            
              
            

            //Function to reset search input

            function resetSearch() {
                const resetSearch = document.querySelector('#search')
                resetSearch.value = '';
            }

            resetSearch();

          
            
            

         //Function to display weather gif over 50% chance
            function displayWeatherGif() {
                
                const weatherGif = document.querySelector('#weatherImage');
               
                        
                        if (Number(weatherData.today.chanceofsunshine) > 50) {
                            console.log('10', (weatherData.today.chanceofsunshine))
                            weatherGif.setAttribute('src', './assets/icons8-summer.gif');
                            weatherGif.setAttribute('alt', 'sun');
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                            
                        } else if (Number(weatherData.today.chanceofrain) > 50) {
                            weatherGif.setAttribute('src', './assets/icons8-torrential-rain.gif');
                            weatherGif.setAttribute('alt', 'rain');
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                           
                        } else if (Number(weatherData.today.chanceofsnow) > 50) {
                            weatherGif.setAttribute("src", "./assets/icons8-light-snow.gif");
                            weatherGif.setAttribute("alt", "snow");
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                           
                        } else if (Number(weatherData.today.chanceoffog) > 50) {
                            weatherGif.setAttribute("src", "./assets/icons8-fog.gif");
                            weatherGif.setAttribute("alt", "fog");
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                        } else if (Number(weatherData.today.chanceofwindy) > 50) {
                            weatherGif.setAttribute("src", "./assets/icons8-wind.gif");
                            weatherGif.setAttribute("alt", "windy");
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                        } else if (Number(weatherData.today.chanceofthunder) > 50) {
                            weatherGif.setAttribute("src", "./assets/icons8-storm.gif");
                            weatherGif.setAttribute("alt", "thunder");
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                        }
                        
                        else {
                            weatherGif.setAttribute("src", "./assets/icons8-night.gif");
                            weatherGif.setAttribute("alt", "clouds");
                            //weatherGifImage.setAttribute('class', 'weatherGif');
                            
                        }

    //}
            }
        
            displayWeatherGif();

            
console.log('weatherDescriptions', weatherData.today);
            

            //Function to display current weather fog gif

            function displayCurrentWeatherGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('fog'))) {
                    displayBackground.setAttribute('class', 'fog');
                    
                }

            }

            displayCurrentWeatherGif();

            //Function to display current weather rain gif

            function displayCurrentWeatherRainGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('rain'))) {
                    displayBackground.setAttribute('class', 'rain');
                    
                }
            }

            displayCurrentWeatherRainGif();

            //Function to display current weather sunny gif

            function displayCurrentWeatherSunnyGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('sun'))) {
                    displayBackground.setAttribute('class', 'sunny');
                    
                }
            }

            displayCurrentWeatherSunnyGif();

            //Function to display current weather snow gif

            function displayCurrentWeatherSnowGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('snow'))) {
                    displayBackground.setAttribute('class', 'snow');
                    
                }
            }

            displayCurrentWeatherSnowGif();

            //Function to display clear sky gif

            function displayCurrentWeatherClearSkyGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('clear'))) {
                    displayBackground.setAttribute('class', 'clear_day');
                    
                }

            }

            displayCurrentWeatherClearSkyGif();

            //Function to display current weather overcast gif

            function displayCurrentWeatherOvercastGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('overcast'))) {
                    displayBackground.setAttribute('class', 'overcast');
                    
                }
            }

            displayCurrentWeatherOvercastGif();

            //Function to display current weather mist gif

            function displayCurrentWeatherMistGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('mist'))) {
                    displayBackground.setAttribute('class', 'mist');
                    
                }
            }

            displayCurrentWeatherMistGif();

            //Function to display current thunder gif

            function displayCurrentWeatherThunderGif() {
                const displayBackground = document.querySelector('#background');
                if (weatherDescriptions.some(description => description.includes('thunder'))) {
                    displayBackground.setAttribute('class', 'thunderstorm');
                    
                }
            }

            displayCurrentWeatherThunderGif();





            })
        
    
        
        .catch((error) => {
            console.log(error);
        })
    
    });

    
   
//Function to convert fahrenheit to celsius
function convertTemp() {
    const convertForm = document.querySelector('#convertTemps');
    convertForm.addEventListener('submit', checkIfFahrenheitToCelsiusIsChecked);

}
convertTemp();

//Function to create a widget that converts fahrenheit to celsius
 function convertFahrenheitToCelsius(event) {
    const celsiusResult = document.querySelector('#temperatureConvert')
    const givenTemp = document.querySelector('#temp-to-convert').value;

     const fahrenheitToCelsius = (givenTemp - 32) * 5 / 9;
     celsiusResult.textContent = `${fahrenheitToCelsius.toFixed(2)}\u00B0C`;

 }


//Function to create a widget that converts celsius to fahrenheit
function convertCelsiusToFahrenheit(event) {
    const fahrenheitResult = document.querySelector('#temperatureConvert')
    const givenTemp = document.querySelector('#temp-to-convert').value;
    const celsiusToFahrenheit = (givenTemp * 9 / 5) + 32;
    fahrenheitResult.textContent = `${celsiusToFahrenheit.toFixed(2)}\u00B0F`;
}


//Function to check if radio button is checked for fahrenheit to celsius
function checkIfFahrenheitToCelsiusIsChecked(event) {
    event.preventDefault();
    const fahrenheitToCelsius = document.querySelector('#to-c');
    if (fahrenheitToCelsius.checked) {
        convertFahrenheitToCelsius();
    } else {
        convertCelsiusToFahrenheit()
    }
}

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}