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
    const location = searchField.value;
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

// Write a createVariablesFromResultObj() function that creates variables using deconstruction
// function createVariablesFromResultObj(resultObj){


//     generateWeatherResults();
// }

function generateWeatherResults(resultObj, location) {
    currentWeatherArticle.textContent = '';
    clearTempArticles();
    adjustContainerLayout();
    appendUserInputToMainArticle(location);
    getAreaInfo(resultObj.nearest_area[0].areaName[0].value, location);
    getRegionInfo(resultObj.nearest_area[0].region[0].value);
    getCountryInfo(resultObj.nearest_area[0].country[0].value);
    getCurrentlyFeelsLikeInfo(resultObj.current_condition[0].FeelsLikeF);
    getChanceOfSunshine(resultObj.weather[0].hourly);
    getChanceOfRain(resultObj.weather[0].hourly);
    getChanceOfSnow(resultObj.weather[0].hourly);
    appendPreviousSearch(resultObj, location);
    generateTodayCard(resultObj.weather[0]);
    generateTomorrowCard(resultObj.weather[1]);
    generateDayAfterTomorrowCard(resultObj.weather[2]);
    if (searchArray.length <= 1) {
        appendConversionForm();
    }
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

function getAreaInfo(areaName, location) {
    const areaElement = document.createElement('p');
    const strong = document.createElement('strong');
    const area = areaName;

    if (location === areaName) {
        strong.innerHTML = "Area:  ";
    } else {
        strong.innerHTML = "Nearest Area: ";
    }

    areaElement.append(strong, area);
    currentWeatherArticle.append(areaElement);
}

function getRegionInfo(region) {
    const regionPTag = document.createElement('p');
    regionPTag.innerHTML = `<strong>Region:</strong> ${region}`;
    currentWeatherArticle.append(regionPTag);
}

function getCountryInfo(country) {
    const countryPTag = document.createElement('p');
    countryPTag.innerHTML = `<strong>Country:</strong> ${country}`;
    currentWeatherArticle.append(countryPTag);
}

function getCurrentlyFeelsLikeInfo(feelsLikeF) {
    const currentlyFeelsLike = document.createElement('p');
    currentlyFeelsLike.innerHTML = `<strong>Currently:</strong> Feels Like ${feelsLikeF} °F`;
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

function generateTodayCard(weather) {
    todayArticle.classList.add('tempCard');
    const todayHeader = document.createElement('h3');
    const averageTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    todayHeader.textContent = 'Today';
    averageTemp.innerHTML = `<strong>Average Temperature:</strong> ${weather.avgtempF} °F`;
    maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${weather.maxtempF} °F`;
    minTemp.innerHTML = `<strong>Min Temperature:</strong> ${weather.mintempF} °F`;

    todayArticle.append(todayHeader, averageTemp, maxTemp, minTemp);
    tempAside.append(todayArticle);
}

function generateTomorrowCard(weather) {
    tomorrowArticle.classList.add('tempCard');
    const tomorrowHeader = document.createElement('h3');
    const averageTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    tomorrowHeader.textContent = 'Tomorrow';
    averageTemp.innerHTML = `<strong>Average Temperature:</strong> ${weather.avgtempF} °F`;
    maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${weather.maxtempF} °F`;
    minTemp.innerHTML = `<strong>Min Temperature:</strong> ${weather.mintempF} °F`;

    tomorrowArticle.append(tomorrowHeader, averageTemp, maxTemp, minTemp);
    tempAside.append(tomorrowArticle);
}

function generateDayAfterTomorrowCard(weather) {
    dayAfterTomorrowArticle.classList.add('tempCard');
    const dayAfterTomorrowHeader = document.createElement('h3');
    const averageTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    dayAfterTomorrowHeader.textContent = 'Day After Tomorrow';
    averageTemp.innerHTML = `<strong>Average Temperature:</strong> ${weather.avgtempF} °F`;
    maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${weather.maxtempF} °F`;
    minTemp.innerHTML = `<strong>Min Temperature:</strong> ${weather.mintempF} °F`;

    dayAfterTomorrowArticle.append(dayAfterTomorrowHeader, averageTemp, maxTemp, minTemp);
    tempAside.append(dayAfterTomorrowArticle);
}

function appendConversionForm() {
    const form = document.createElement('form');
    const convertTempLabel = document.createElement('label');
    const convertInput = document.createElement('input');
    const toCelsiusLabel = document.createElement('label');
    const celsiusRadioButton = document.createElement('input');
    const toFahrenheitLabel = document.createElement('label');
    const fahrenheitRadioButton = document.createElement('input');
    const submitButton = document.createElement('input');
    const convertedTemp = document.createElement('h4');

    form.classList.add('convertForm');
    convertTempLabel.setAttribute('for', 'temp-to-convert');
    convertTempLabel.textContent = 'Convert the temperature';
    convertInput.setAttribute('type', 'number');
    convertInput.setAttribute('id', 'temp-to-convert');
    toCelsiusLabel.textContent = 'To Celsius';
    toFahrenheitLabel.textContent = 'To Fahrenheit';
    celsiusRadioButton.setAttribute('type', 'radio');
    celsiusRadioButton.setAttribute('id', 'to-c');
    celsiusRadioButton.setAttribute('name', 'convert-temp');
    celsiusRadioButton.setAttribute('value', 'c');
    fahrenheitRadioButton.setAttribute('type', 'radio');
    fahrenheitRadioButton.setAttribute('id', 'to-f');
    fahrenheitRadioButton.setAttribute('name', 'convert-temp');
    fahrenheitRadioButton.setAttribute('value', 'f');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('convertSubmit');

    submitButton.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    form.append(convertTempLabel, convertInput, toCelsiusLabel, celsiusRadioButton, toFahrenheitLabel, fahrenheitRadioButton, submitButton, convertedTemp);
    convertAside.append(form);
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
    if (searchArray.length < 1) {
        main.style.cssText = 'grid-column: 1 / 3;';
    } 
}