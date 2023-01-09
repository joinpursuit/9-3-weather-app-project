// Create a variable for the user Search
const userSearch = document.querySelector("#preferredCity");

const resetSearch = document.querySelector('.myHover2');

// Create a variable for users chosen location
const chooseLocationPTag = document.querySelector(".chooseLocation");

const chooseLocationPTag2 = document.querySelector(".chooseLocation2");

// Create a variable for the 'main' element.
      const main = document.querySelector("main");

      const h4result = document.querySelector('.h4_result')
      const convertForm = document.querySelector('.convertor-form')


      function celsiusToFahrenheit(degree) {
        return (degree * 9) / 5 + 32;
      }
      function fahrenheitToCelsius(degree) {
        return ((degree - 32) * 5) / 9;
      };

                 // Create a function to display today's average, maximum, and minimum temperatures
                 function getTodayTempF(avgTempF, maxTempF, minTempF) {
                    // Using .textContent method to set text content of today_h3 ID to "Today"
                  today_h3.textContent = "Today";
                    // Using .textContent method to set text content of element with today_avg_temp_F ID to a template literal that displays today's average temp
                  today_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
                    // Using .textContent method to set text content of element with  today_max_temp_f ID to a template literal that displays today's max temp
                  today_max_temp_f.textContent = `Max Temperature: ${maxTempF}°F`;
                    // Using .textContent method to set text content of element with today_min_temp_f ID to a template literal that displays today's min temp
                  today_min_temp_f.textContent = `Min Temperature: ${minTempF}°F`;
              }
                  // Create a function to display tomorrow's average, maximum, and minimum temperatures
              function getTomorrowTempF(avgTempF, maxTempF, minTempF) {
                  // Using .textContent method to set text content of element with tomorrow_h3 ID to "Tomorrow"
                  tomorrow_h3.textContent = "Tomorrow";
                  // Using .textContent method to set text content of element with tomorrow_avg_temp_f ID to a template literal that displays tomorrow's average temp            
                  tomorrow_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
                  // Using .textContent method to set text content of element with tomorrow_max_temp_f ID to a template literal that displays tomorrow's max temp
                  tomorrow_max_temp_f.textContent = `Max Temperature: ${maxTempF}°F`;
                  // Using .textContent method to set text content of element with tomorrow_min_temp_f ID to a template literal that displays tomorrow's min temp
                  tomorrow_min_temp_f.textContent = `Min Temperature: ${minTempF}°F`;
              }
                 // Create a function to display the day after tomorrow's average, maximum, and minimum temperatures
              function getDayAfterTomorrowTempF(avgTempF, maxTempF, minTempF) {
                  // Using .textContent method to set text content of element with day_after_tomorrow_h3 ID to "Day After Tomorrow"
                  day_after_tomorrow_h3.textContent = "Day After Tomorrow";
                  // Using .textContent method to set text content of element with day_after_tomorrow_avg_temp_f ID to a template literal that displays day after tomorrow's average temp
                  day_after_tomorrow_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
                  // Using .textContent method to set text content of element with day_after_tomorrow_max_temp_f ID to a template literal that displays day after tomorrow's max temp
                  day_after_tomorrow_max_temp_f.textContent = `Max Temperature: ${maxTempF}°F;`;
                  // Using .textContent method to set text content of element with day_after_tomorrow_min_temp_f ID to a template literal that displays day after tomorrow's min temp
                  day_after_tomorrow_min_temp_f.textContent = `Min Temperature: ${minTempF}°F`;
              }

      convertForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // class celsiusToFahrenheit
      const c = document.querySelector(".c").checked
      const f = document.querySelector(".f").checked
      if (c) {
         h4result.textContent = parseFloat(fahrenheitToCelsius(event.target.temp.value)).toFixed(2) + "°C"
      }
    if (f){
        h4result.textContent = parseFloat(celsiusToFahrenheit(event.target.temp.value)).toFixed(2)+ "°F"
    }
    });


// Create an event listener for the submit button within the form
       const form = document.querySelector("form");
           form.addEventListener("submit", (event) => {
       event.preventDefault(); // Preventing default action on submit form

       chooseLocationPTag.style.display = 'none'
       chooseLocationPTag2.style.display = 'none'


 const erase = document.querySelectorAll(".card")
   if (erase.length > 0) {
    for (let i = 0; i < erase.length; i++) {
        erase[i].remove()
     }
   }

       const BASE_URL = `https://wttr.in/${userSearch.value}?format=j1`
       fetch(BASE_URL)
       .then((response) => response.json())
       .then ((result) => {
           console.log(result);
           const card = document.createElement("section")
           card.setAttribute("class", "card")



           if((result.current_condition[0].weatherDesc[0].value === "Sunny") || (Number(result.weather[0].hourly[0].chanceofsunshine) > 50)) {
            const iconSunny = document.createElement("img")
            iconSunny.setAttribute("src","./assets/icons8-summer.gif")
            iconSunny.setAttribute("alt","sun")
            card.append(iconSunny)
         }
          else if ((result.current_condition[0].weatherDesc[0].value === "Torrential-rain") || (Number(result.weather[0].hourly[0].chanceofrain) > 50)) {
            const iconTRain = document.createElement("img")
            iconTRain.setAttribute("src","./assets/icons8-torrential-rain.gif")
            iconTRain.setAttribute("alt","rain")
            card.append(iconTRain)
        }

        else {
          (result.current_condition[0].weatherDesc[0].value === "Light snow") || (Number(result.weather[0].hourly[0].chanceofsnow) > 50) 
            const iconLightSnow = document.createElement("img")
            iconLightSnow.setAttribute("src","./assets/icons8-light-snow.gif")
            iconLightSnow.setAttribute("alt","snow")
            card.append(iconLightSnow)
        }

        if((result.current_condition[0].weatherDesc[0].value === "Foggy") || (Number(result.weather[0].hourly[0].visibility) > 50)) {
          const iconFoggy = document.createElement("img")
          iconFoggy.setAttribute("src","./assets/icons8-fog.gif")
          iconFoggy.setAttribute("alt","fog")
          card.append(iconFoggy)
        }

        if((result.current_condition[0].weatherDesc[0].value === "Windy") || (Number(result.weather[0].hourly[0].WindGustKmph) < 50)) {
          const iconWindy = document.createElement("img")
          iconWindy.setAttribute("src","./assets/icons8-wind.gif")
          iconWindy.setAttribute("alt","wind")
          card.append(iconWindy)
        }

        if((result.current_condition[0].weatherDesc[0].value === "Drizzling") || (Number(result.weather[0].hourly[0].chanceofrain) <= 50 )) {
          const iconRainCloud = document.createElement("img")
          iconRainCloud.setAttribute("src","./assets/icons8-rain-cloud.gif")
          iconRainCloud.setAttribute("alt","light-rain")
          card.append(iconRainCloud)
        }


        // Below from lines 147-153, I was attempting to figure out how to get the 'night' icon added to my Weather App, but I failed-forward.
        //if(result.weather[0].hourly[0].time >= 600) {
        // const iconNightTime = document.createElement("img")
        // iconNightTime.setAttribute("src","./assets/icons8-night.gif")
        // iconNightTime.setAttribute("alt","night")
        // card.append(iconNightTime)
        //}




          const cityName = document.createElement('h2');
          cityName.textContent =  userSearch.value;
          card.append(cityName);
   
        // Create a paragraph element containing a strong element whose content is area && the content of the paragraph tag is nearest_area name
           const mainInfo = document.querySelector('.mainInfo');
           const nearestArea = document.createElement('p');
           nearestArea.textContent = `Nearest Area: ${result.nearest_area[0].areaName[0].value}`;
           card.append(nearestArea);
   
        // Create a paragraph element that contains a strong element whose content is the areas Region && the content of the paragraph is the Region name 
           const cityRegion = document.createElement('p');
           cityRegion.textContent = `Region: ${result.nearest_area[0].region[0].value}`;
           card.append(cityRegion);
   
        // Create a paragraph element containing a strong element whose content is the areas Country && the content of the paragraph is the Country name
           const cityCountry = document.createElement('p');
           cityCountry.textContent = `Country: ${result.nearest_area[0].country[0].value}`;
           card.append(cityCountry);

        // Create a paragraph element containing a strong element whose content is how the weather currently feels && the content of the paragraph is the Currently 
            const cityCurrentFeel = document.createElement('p');
            cityCurrentFeel.textContent = `Currently: Feels Like ${result.current_condition[0].FeelsLikeF}°F`
            card.append(cityCurrentFeel);
   
        // Create a paragraph element containing a strong element whose content shows the areas chance of sunshine && the content of the paragraph is the Chance of Sunshine
           const sunChance = document.createElement('p');
           sunChance.textContent = `Chance of Sunshine: ${result.weather[0].hourly[0].chanceofsunshine} %`
           card.append(sunChance);
   
   
        // Create a paragraph element containing a strong element whose content shows the areas chance of rain  && the content of the paragraph is the Chance of Rain
           const rainChance = document.createElement('p');
           rainChance.textContent = `Chance of Rain: ${result.weather[0].hourly[0].chanceofrain} %`
           card.append(rainChance);
   
   
        // Create a paragraph element containing a strong element whose content shows the areas chance of snow  && the content of the paragraph is the Chance of Snow
           const snowChance = document.createElement('p');
           snowChance.textContent = `Chance of Snow: ${result.weather[0].hourly[0].chanceofsnow} %`
           card.append(snowChance);
   
              
           mainInfo.append(card);
   
           // Creating variable to store value for today's average temp in F
           const todayAvgTempF = result.weather[0].avgtempF;
           // Creating variable to store value for today's max temp in F
           const todayMaxTempF = result.weather[0].maxtempF;
           // Creating variable to store value for today's min temp in F
           const todayMinTempF = result.weather[0].mintempF;
           // Creating variable to store value for tomorrow's average temp in F
           const tomorrowAvgTempF = result.weather[1].avgtempF;
           // Creating variable to store value for tomorrow's max temp in F
           const tomorrowMaxTempF = result.weather[1].maxtempF;
           // Creating variable to store value for tomorrow's min temp in F
           const tomorrowMinTempF = result.weather[1].mintempF;
           // Creating  variable to store value for day after tomorrow's average temp in F
           const dayAfterTomorrowAvgTempF = result.weather[2].avgtempF;
           // Creating variable to store value for day after tomorrow's max temp in F
           const dayAfterTomorrowMaxTempF = result.weather[2].maxtempF;
           // Creating variable to store value for day after tomorrow's min temp in F
           const dayAfterTomorrowMinTempF = result.weather[2].mintempF;


   
       
           // Calling Functions!
           getTodayTempF(todayAvgTempF, todayMaxTempF, todayMinTempF);
           getTomorrowTempF(tomorrowAvgTempF, tomorrowMaxTempF, tomorrowMinTempF);
           getDayAfterTomorrowTempF(dayAfterTomorrowAvgTempF, dayAfterTomorrowMaxTempF, dayAfterTomorrowMinTempF);
           celsiusToFahrenheit();
           fahrenheitToCelsius();

          //displayWeather(userSearch.value);
          //previousCities();
   

// Create a 'p' element whose content shows the previously searched cities
   const displayPreviousSearch = document.createElement('p');
   //displayPreviousSearch.textContent = `${userSearch.value} - ${result.current_condition[0].FeelsLikeF} °F` ;
          //console.log(displayPreviousSearch);

         
// Create a variable to grab the previously search cities and add them to the Previously Searched section
      const previousSearch = document.querySelector('.searchUl');
           previousSearch.append(displayPreviousSearch);

// Create a variable to store the value of the location that the user searches
      const storeValue = userSearch.value;


// Create an 'a' element for hyperlink that allows me to click on previously searched locations 
const list = document.createElement('li')
const aTag = document.createElement('a');
aTag.setAttribute("href", "#")
aTag.textContent = `${storeValue} - ${result.current_condition[0].FeelsLikeF} °F`;
previousSearch.append(list)
list.append(aTag);


const form = document.querySelector('#preferredCity');
form.value = "";


       })
       .catch((error) => {
           console.log(error);
       })
}); 



function createCurrentWeather(result, location) {
    console.log(result, location)
    appendSearchResult();

} // End of createCurrentWeather function!


function appendSearchResult() {
    const h1 = document.createElement('h1');
    h1.textContent = `${userSearch.value}`
    current.append('h1');

} // End of appendSearchResult function!
