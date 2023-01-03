const BASE_URL = 'http://wttr.in/';
const form = document.querySelector('form');
const searchField = document.querySelector('.searchField');
const main = document.querySelector('main');
const convertAside = document.querySelector('.convert');
const currentWeatherArticle = document.querySelector('.currentWeather');
const previousSearches = document.querySelector('.previousSearches');
const noPreviousSearches = document.querySelector('.noPreviousSearches');
const searchUlElement = document.querySelector('.searchUl');
const searchArray = [];
let tempAside = document.querySelector('.tempAside');
let chanceOfSunshine;
let chanceOfRain;
let chanceOfSnow;
let currentApi;

form.addEventListener('submit', generateUrl);

function generateUrl(event) {
    event.preventDefault();
    const location = capitalizeFirstLetter(`${searchField.value}`);
    currentApi = `${BASE_URL}${location}?format=j1`;
    getWeatherInfo(currentApi, location);
}

function getWeatherInfo(url, location) {

    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            generateWeatherResults(result, location);
        })
        .catch((error) => {
            createErrorMessage(error);
        });
}

function generateWeatherResults(result, location) {
    currentWeatherArticle.textContent = '';
    appendUserInputToMainArticle(location);
    getAreaInfo(result.nearest_area[0], location);
    getRegionInfo(result.nearest_area[0]);
    getCountryInfo(result.nearest_area[0]);
    form.reset();
}

function getAreaInfo(result, location) {
    const areaElement = document.createElement('p');
    const strong = document.createElement('strong');
    const areaName = result.areaName[0].value;

    if (location === areaName) {
        strong.innerHTML = "Area:  ";
    } else {
        strong.innerHTML = "Nearest Area: ";
    }

    areaElement.append(strong, areaName);
    currentWeatherArticle.append(areaElement);
}

function getRegionInfo(result) {
    const region = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = "Region:  ";
    region.append(strong, result.region[0].value);
    currentWeatherArticle.append(region);
}

function getCountryInfo(result) {
    const country = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = "Country:  ";
    country.append(strong, result.country[0].value);
    currentWeatherArticle.append(country);
}

function appendUserInputToMainArticle(userInput) {
    const searchInput = document.createElement('h2');
    currentWeatherArticle.append(searchInput);
    searchInput.textContent = userInput;
}

function capitalizeFirstLetter(string) {
    return string.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ');
}

function createErrorMessage(error) {

}
