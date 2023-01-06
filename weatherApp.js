//const previousCities = [];


//const nameOfCity = document.querySelector("#nameOfCity");

// Create a variable for the BASE_URL
//const BASE_URL = `https://wttr.in/${userSearch.value}?format=j1`

// Create a variable for users chosen location
const chooseLocationPTag = document.querySelector(".chooseLocation");

// Create a variable for the user Search
const userSearch = document.querySelector("#preferredCity");

// Create a variable for the 'main' element.
const main = document.querySelector("main");


// Create an event listener for the submit button within the form
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();


displayWeather(userSearch.value);
    chooseLocationPTag.style.display = 'none'



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
        const card = document.createElement("section")
        card.setAttribute("class", "card")

        // Create a paragraph element containing a strong element whose content is area && the content of the paragraph tag is nearest_area name
        const mainInfo = document.querySelector('.mainInfo');
        const cityName = document.createElement('p');
        cityName.textContent = `City: ${result.nearest_area[0].areaName[0].value}`;
        card.append(cityName);

        // Create a paragraph element that contains a strong element whose content is the areas Region && the content of the paragraph is the Region name 
        const cityRegion = document.createElement('p');
        cityRegion.textContent = `Region: ${result.nearest_area[0].region[0].value}`;
        card.append(cityRegion);

        // Create a paragraph element containing a strong element whose content is the areas Country && the content of the paragraph is the Country name
        const cityCountry = document.createElement('p');
        cityCountry.textContent = `Country: ${result.nearest_area[0].country[0].value}`;
        card.append(cityCountry);

        // Create a paragraph element containing a strong element whose content is how the weather currently feels && the content of the paragraph is the Currently 
        const cityCurrentTemp = document.createElement('p');
        cityCurrentTemp.textContent = `Currently: Feels Like ${result.current_condition[0].FeelsLikeF} F`
        card.append(cityCurrentTemp);
        

        // Create a paragraph element containing a strong element whose content shows the areas chance of sunshine && the content of the paragraph is the Chance of Sunshine
        const chanceOfSun = document.createElement('p');
        chanceOfSun.textContent = `Chance of Sunshine: ${result.weather[0].hourly[0].chanceofsunshine} %`
        card.append(chanceOfSun);
        

        // Create a paragraph element containing a strong element whose content shows the areas chance of rain  && the content of the paragraph is the Chance of Rain
        const rainChance = document.createElement('p');
        rainChance.textContent = `Chance of Rain: ${result.weather[0].hourly[0].chanceofrain} %`
        card.append(rainChance);


        // Create a paragraph element containing a strong element whose content shows the areas chance of snow  && the content of the paragraph is the Chance of Snow
        const snowChance = document.createElement('p');
        snowChance.textContent = `Chance of Snow: ${result.weather[0].hourly[0].chanceofsnow} %`
        card.append(snowChance);
        mainInfo.append(card);



    })
    .catch((error) => {
        console.log(error);
    })
    

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


function previousCities() {

}  // End of previousCities function!



  