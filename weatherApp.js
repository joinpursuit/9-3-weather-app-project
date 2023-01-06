//const previousCities = [];

// Create a variable for the BASE_URL
//const BASE_URL = `https://wttr.in/${userSearch.value}?format=j1`


// Create a variable for the user Search
const userSearch = document.querySelector("#preferredCity");

// Create a variable for users chosen location
const chooseLocationPTag = document.querySelectorAll(".chooseLocation");




// Create a 'p' element whose content shows the previously searched cities
const displayPreviousSearch = document.createElement('p');
displayPreviousSearch.textContent = userSearch.value;
 console.log(displayPreviousSearch);
// Create a variable to grab the previously search cities and add them to the Previously Searched section
const previousSearch = document.querySelector('.searchUl');
previousSearch.append(displayPreviousSearch);

// Create a variable for the 'main' element.
const main = document.querySelector("main");

// Create an event listener for the submit button within the form
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Preventing default action on submit form


// Create a variable to store the value of the location that the user searches
const storeValue = userSearch.value;

    if (storeValue) {
        chooseLocationPTag.forEach(erasePrevious => {
        erasePrevious.remove();
      }) 
     };


   displayWeather(userSearch.value);
       //chooseLocationPTag.style.display = 'none'


//displayArea(area, userSearch.value);


}); 

// Create a function to display the Weather Location
function displayWeather(cityInfo) {

    const erase = document.querySelectorAll(".card")
    if (erase.length > 0) {
      erase[0].remove()
    }

    


    const BASE_URL = `https://wttr.in/${cityInfo}?format=j1`
    fetch(BASE_URL)
    .then((response) => response.json())
    .then ((result) => {
        console.log(result);
        const card = document.createElement("section")
        card.setAttribute("class", "card")

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
        //previousCities();



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


    })
    .catch((error) => {
        console.log(error);
    })



 //Create a function to determine if the nearest area is equal to user's searched input location
//function displayArea(area, userLocation) {
 //   Using if statement to determine if  lowercased area parameter is equal to lowercased location parameter
 //   if (area.toLowerCase() == userLocation.toLowerCase()) {
 //        Using .textContent method to set text content of element with nearestArea element to a template literal that displays the area
 //       nearestArea.textContent = `Area: ${area};`
 //   } else {
 //       Using .textContent method to set text content of element with nearestArea element to a template literal that displays the nearest area
 //       nearestArea.textContent = `Nearest Area: ${area};`
 //   }
 //   
// } End of nearestArea function!
    

    //const h2 = document.createElement('h2');
    //h2.textContent = userSearch.value
    //const currentWeatherInfo = document.querySelector('.currentWeatherArticle');
    //currentWeatherInfo.append(h2);
   //nameOfCity.textContent = userSearch.value
   //console.log(name);





} // End of displayWeather function!

// Display region to the main section
/*function displayRegion() {
    displayRegion.textContent = weatherData.region;
}
displayRegion();

// Display country to the main section
function displayCountry() {
    country.textContent = weatherData.country;
}
displayCountry()
*/

function createCurrentWeather(result, location) {
    console.log(result, location)
    appendSearchResult();

} // End of createCurrentWeather function!


function appendSearchResult() {
    const h1 = document.createElement('h1');
    h1.textContent = `${userSearch.value}`
    current.append('h1');

} // End of appendSearchResult function!
