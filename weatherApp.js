const BASE_URL = 'http://wttr.in/';
const form = document.querySelector('form');
const searchField = document.querySelector('.searchField');
const main = document.querySelector('main');
const convertAside = document.querySelector('.convert');
const currentWeatherArticle = document.querySelector('.currentWeather');
const previousSearches = document.querySelector('.previousSearches');
const noPreviousSearches = document.querySelector('.noPreviousSearches');
const searchUlElement = document.querySelector('.searchUl');
let tempAside = document.querySelector('.tempAside');
let todayArticle = document.querySelector('.today');
let tomorrowArticle = document.querySelector('.tomorrow');
let dayAfterTomorrowArticle = document.querySelector('.dayAfterTomorrow');
const searchArray = [];
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

function getWeatherInfo(api, location) {

    fetch(api)
        .then((response) => {
            if (response.ok){
                return response.json();
            }
            createErrorMessage();
        })
        
        .then((result) => {
            generateWeatherResults(result, location);
        })
        .catch((error) => {
            createErrorMessage(error);
        });
}

function generateWeatherResults(result, location) {
    currentWeatherArticle.textContent = '';
    clearTempArticles();
    adjustContainerLayout();
    appendUserInputToMainArticle(location);
    getAreaInfo(result.nearest_area[0], location);
    getRegionInfo(result.nearest_area[0]);
    getCountryInfo(result.nearest_area[0]);
    getCurrentlyFeelsLikeInfo(result.current_condition[0]);
    getChanceOfSunshine(result.weather[0].hourly);
    getChanceOfRain(result.weather[0].hourly);
    getChanceOfSnow(result.weather[0].hourly);
    appendPreviousSearch(result, location);
    generateTodayCard(result.weather[0]);
    generateTomorrowCard(result.weather[1]);
    generateDayAfterTomorrowCard(result.weather[2]);
    appendConversionForm();
    form.reset();
}

function clearTempArticles() {
    [todayArticle, tomorrowArticle, dayAfterTomorrowArticle].forEach(article => article.remove());
    todayArticle = document.createElement('article');
    tomorrowArticle = document.createElement('article');
    dayAfterTomorrowArticle = document.createElement('article');
    todayArticle.classList.add('today');
    tomorrowArticle.classList.add('tomorrow');
    dayAfterTomorrowArticle.classList.add('dayAfterTomorrow');
    tempAside.append(todayArticle, tomorrowArticle, dayAfterTomorrowArticle);
} 

function adjustContainerLayout() {
    main.style.cssText = 'grid-column: 2 / 3; padding: 0px;';
    convertAside.style.cssText = 'grid-column: 1 / 2; grid-row: 2;';
}

function appendUserInputToMainArticle(userInput) {
    const searchInput = document.createElement('h2');
    currentWeatherArticle.append(searchInput);
    searchInput.textContent = userInput;
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

function getCurrentlyFeelsLikeInfo(result) {
    const currentlyFeelsLike = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = "Currently:  ";
    currentlyFeelsLike.append(strong, 'Feels Like ', result.FeelsLikeF, '°F');
    currentWeatherArticle.append(currentlyFeelsLike);
}

function getChanceOfSunshine(chanceArray) {
    const avgChanceOfSun = chanceArray.reduce((totalChance, chanceObj) => {
        return totalChance + Number(chanceObj.chanceofsunshine);
    }, 0) / chanceArray.length;

    if (avgChanceOfSun > 50) {
        const sunnyIcon = document.createElement('img');
        sunnyIcon.setAttribute('src', './assets/icons8-summer.gif');
        sunnyIcon.setAttribute('alt', 'sun');
        currentWeatherArticle.prepend(sunnyIcon);
    }

    chanceOfSunshine = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = 'Chance of Sunshine: ';
    chanceOfSunshine.append(strong, avgChanceOfSun.toFixed(), '%');
    currentWeatherArticle.append(chanceOfSunshine);
}

function getChanceOfRain(chanceArray) {
    const avgChanceOfRain = chanceArray.reduce((totalChance, chanceObj) => {
        return totalChance + Number(chanceObj.chanceofrain);
    }, 0) / chanceArray.length;

    if (avgChanceOfRain > 50) {
        const rainIcon = document.createElement('img');
        rainIcon.setAttribute('src', './assets/icons8-rain-cloud.gif');
        rainIcon.setAttribute('alt', 'rain');
        currentWeatherArticle.prepend(rainIcon);
    }

    chanceOfRain = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = 'Chance of Rain: ';
    chanceOfRain.append(strong, avgChanceOfRain.toFixed(), '%');
    currentWeatherArticle.append(chanceOfRain);
}

function getChanceOfSnow(chanceArray) {
    const avgChanceOfSnow = chanceArray.reduce((totalChance, chanceObj) => {
        return totalChance + Number(chanceObj.chanceofsnow);
    }, 0) / chanceArray.length;

    if (avgChanceOfSnow > 50) {
        const snowIcon = document.createElement('img');
        snowIcon.setAttribute('src', './assets/icons8-light-snow.gif');
        snowIcon.setAttribute('alt', 'snow');
        currentWeatherArticle.prepend(snowIcon);
    }

    chanceOfSnow = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = 'Chance of Snow: ';
    chanceOfSnow.append(strong, avgChanceOfSnow.toFixed(), '%');
    currentWeatherArticle.append(chanceOfSnow);
}

function appendPreviousSearch(result, location) {
    const searchLiElement = document.createElement('li');

    if (!searchArray.includes(location)) {
        const anchorTagForSearchLink = document.createElement('a');
        anchorTagForSearchLink.setAttribute('href', '#');
        anchorTagForSearchLink.setAttribute('name', currentApi);
        anchorTagForSearchLink.classList.add('previousSearchLink');
        searchLiElement.append(anchorTagForSearchLink);
        anchorTagForSearchLink.textContent = location;
        anchorTagForSearchLink.after(` - ${result.current_condition[0].FeelsLikeF}°F`);
        noPreviousSearches.textContent = '';
        searchUlElement.append(searchLiElement);
        searchArray.push(location);
        anchorTagForSearchLink.addEventListener('click', (event) => {
            event.preventDefault();
            const locationH2Element = document.querySelector('h2');
            if (locationH2Element.textContent !== location) {
                getWeatherInfo(`${event.target.name}`, location);
            }
            searchUlElement.append(searchLiElement);
        });
    }

    if (searchArray.length > 10) {
        removePreviousSearch();
    }
}

function generateTodayCard(result) {
    // const todayDivElement = document.createElement('div');
    todayArticle.classList.add('tempCard');
    const todayHeader = document.createElement('h3');
    const averageTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    // const strongElement = document.createElement('strong');
    // todayDivElement.classList.add('tempDivs');
    todayHeader.textContent = 'Today';
    averageTemp.innerHTML = `<strong>Average Temperature:</strong>`;
    maxTemp.innerHTML = `<strong>Max Temperature:</strong>`;
    minTemp.innerHTML = `<strong>Min Temperature:</strong>`;
    averageTemp.append(`${result.avgtempF} °F`);
    maxTemp.append(`${result.maxtempF} °F`);
    minTemp.append(`${result.mintempF} °F`);

    todayArticle.append(todayHeader, averageTemp, maxTemp, minTemp);
    tempAside.append(todayArticle);
}

function generateTomorrowCard(result) {
    // const tomorrowDivElement = document.createElement('div');
    tomorrowArticle.classList.add('tempCard');
    const tomorrowHeader = document.createElement('h3');
    const averageTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    // const strongElement = document.createElement('strong');
    // tomorrowDivElement.classList.add('tempDivs');
    tomorrowHeader.textContent = 'Tomorrow';
    averageTemp.innerHTML = `<strong>Average Temperature:</strong>`;
    maxTemp.innerHTML = `<strong>Max Temperature:</strong>`;
    minTemp.innerHTML = `<strong>Min Temperature:</strong>`;
    averageTemp.append(`${result.avgtempF} °F`);
    maxTemp.append(`${result.maxtempF} °F`);
    minTemp.append(`${result.mintempF} °F`);

    tomorrowArticle.append(tomorrowHeader, averageTemp, maxTemp, minTemp);
    tempAside.append(tomorrowArticle);
}

function generateDayAfterTomorrowCard(result) {
    // const dayAfterTomorrowDivEle = document.createElement('div');
    dayAfterTomorrowArticle.classList.add('tempCard');
    const dayAfterTomorrowHeader = document.createElement('h3');
    const averageTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    // const strongElement = document.createElement('strong');
    // dayAfterTomorrowDivEle.classList.add('tempDivs');
    dayAfterTomorrowHeader.textContent = 'Day After Tomorrow';
    averageTemp.innerHTML = `<strong>Average Temperature:</strong>`;
    maxTemp.innerHTML = `<strong>Max Temperature:</strong>`;
    minTemp.innerHTML = `<strong>Min Temperature:</strong>`;
    averageTemp.append(`${result.avgtempF} °F`);
    maxTemp.append(`${result.maxtempF} °F`);
    minTemp.append(`${result.mintempF} °F`);

    dayAfterTomorrowArticle.append(dayAfterTomorrowHeader, averageTemp, maxTemp, minTemp);
    tempAside.append(dayAfterTomorrowArticle);
}

function appendConversionForm() {
    
}

function removePreviousSearch() {
    searchUlElement.firstChild.remove();
    searchArray.shift();
}

function capitalizeFirstLetter(string) {
    return string.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ');
}

function createErrorMessage(error) {
    currentWeatherArticle.innerHTML = '<strong style="font-size: 20px;">You have entered an invalid entry. Please try again.</strong>';
    main.style.cssText = 'grid-column: 1 / 3;';

}