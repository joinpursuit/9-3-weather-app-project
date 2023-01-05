const BASE_URL = "https://wttr.in/";
const searchBar = document.querySelector(".search-bar")
const articleCurrentWeather = document.querySelector('#current-weather')
const articleTodaysWeather = document.querySelector('#today-weather')
const articleTomorrowWeather = document.querySelector("#tomorrow")
const articleDayAfterWeather = document.querySelector('#day-after')
const main = document.querySelector("main")

const form = document.querySelector("form");
form.addEventListener("submit", getFormattedUrl)

function getFormattedUrl(event) {
    event.preventDefault();
    const location = `${searchBar.value}`;
    const formattedURL = `${BASE_URL}${location}?format=j1`;
    getWeatherData(formattedURL)

}

function getWeatherData(url) {
        
    fetch(url) 
        .then((response) => response.json())
        
        .then((result) => {
            createTodaysWeather(result);
        })
        
        .catch((error) => {
            createErrorMessage(error)
        })
}

function createTodaysWeather(resultObj) {
    console.log(resultObj);
    appendSearchName();
    getAreaName();
    getRegionName();
    getCountryName();
    getCurrentlyWeather();
    getTodaysWeather();
    getTomorrowsWeather();
    getDayAfterWeather();
    
}

function appendSearchName() {
    const searchTitle = document.createElement("h3");
    searchTitle.textContent = `${searchBar.value}`;
    articleCurrentWeather.append(searchTitle);
}
function getAreaName() {
    const areaName = document.createElement('p');
    areaName.innerHTML = `<strong>Area: </strong> 
    
    `;
    // ${nearest_area[0].value}
    articleCurrentWeather.append(areaName);
}
function getRegionName() {
    const regionName = document.createElement('p');
    regionName.innerHTML = `<strong>Region: </strong> 
    
    `; 
    articleCurrentWeather.append(regionName);
}
function getCountryName() {
    const countryName = document.createElement('p');
    countryName.innerHTML = `<strong>Country: </strong> 
    
    `;
    articleCurrentWeather.append(countryName);
}
function getCurrentlyWeather() {
    const currentlyWeather = document.createElement('p');
    currentlyWeather.innerHTML = `<strong>Currently: </strong> 
   
    `;
    articleCurrentWeather.append(currentlyWeather);
}
function getTodaysWeather() {
    const todaysWeather = document.createElement('h4');
    todaysWeather.innerHTML = `<center>Today </center>
    `;
    const avgTemp = document.createElement("p");
    avgTemp.innerHTML = `<strong>Average Temperature: </strong>`;
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `<strong>Max Temperature: </strong>`;
    const minTemp = document.createElement('p');
    minTemp.innerHTML = `<strong>Min Temperature: </strong>`;
    articleTodaysWeather.append(todaysWeather, avgTemp, minTemp, maxTemp);
}
function getTomorrowsWeather() {
    const tommorowWeather = document.createElement('h4');
    tommorowWeather.innerHTML = `<center>Tommorow </center>
    `;
    const avgTemp = document.createElement("p");
    avgTemp.innerHTML = `<strong>Average Temperature: </strong>`;
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `<strong>Max Temperature: </strong>`;
    const minTemp = document.createElement('p');
    minTemp.innerHTML = `<strong>Min Temperature: </strong>`;
    articleTomorrowWeather.append(tommorowWeather, avgTemp, minTemp, maxTemp);
}
function getDayAfterWeather() {
    const dayAfterWeather = document.createElement('h4');
    dayAfterWeather.innerHTML = `<center>Day Ater Tommorow </center>
    `;
    const avgTemp = document.createElement("p");
    avgTemp.innerHTML = `<strong>Average Temperature: </strong>`;
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `<strong>Max Temperature: </strong>`;
    const minTemp = document.createElement('p');
    minTemp.innerHTML = `<strong>Min Temperature: </strong>`;
    articleDayAfterWeather.append(dayAfterWeather, avgTemp, minTemp, maxTemp);
}



// function createErrorMessage()

// function removeHidden(event) {
//     event.target.nextSibling.classList.remove('hidden');
// }

