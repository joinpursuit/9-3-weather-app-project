const form = document.querySelector('form');
const article = document.querySelector('article');
const articles = document.querySelectorAll('aside article');
let current = document.querySelector('.currentData');


let list = document.querySelector('ul');
let input = document.querySelector('submit');
let search = document.querySelector('#searchbar');
const BASE_URL = 'http://wttr.in/';
const id_URL = '?format=j1';
let weatherIcon = document.createElement('img')



form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('main p').hidden = true;
    weatherIcon.style.opacity = "0.5"
    let searchLocation = `${BASE_URL}${search.value}${id_URL}`;
    let city = search.value;
    fetch(searchLocation)
        .then((response) => {
            return response.json();
        })
        .then((weatherData) => {
            currentWeather(weatherData, city);
        })
        .catch((error) => {
            console.log(error);
        })
    form.reset();
});;
//
//

function currentWeather(weatherData, city) {
    let area = weatherData.nearest_area[0].areaName[0].value;
    let h2Area = document.createElement('h2');
    h2Area.textContent = area;
    current.append(h2Area);

    nearestArea = weatherData.nearest_area[0].areaName[0].value;
    let areaP = document.createElement('p');

    if (nearestArea.toLowerCase() === city.toLowerCase()) {
        areaP.textContent = `Area: ${area}`;
        h2Area.textContent = city;
    } else {
        areaP.textContent = `Nearest Area: ${area}`;
        h2Area.textContent = city;
    }
    current.append(areaP);

    let region = weatherData.nearest_area[0].region[0].value;
    let regionP = document.createElement('p');
    regionP.textContent = `Region: ${region}`;
    current.append(regionP);

    let country = weatherData.nearest_area[0].country[0].value;
    let countryP = document.createElement('p');
    countryP.textContent = `Country: ${country}`;
    current.append(countryP);

    let currently = weatherData.current_condition[0].FeelsLikeF;
    let currentlyP = document.createElement('p');
    currentlyP.textContent = `Feels like it's ${currently}°F.`;
    current.append(currentlyP);

    const chanceOfSunshine = weatherData.weather[0].hourly[0].chanceofsunshine;
    const sunny = document.createElement('p')
    sunny.textContent = `Chance of Sunshine: ${chanceOfSunshine} %`
    current.append(sunny);

    const chanceOfRain = weatherData.weather[0].hourly[0].chanceofrain;
    const rainy = document.createElement('p')
    rainy.textContent = `Chance of Rain: ${chanceOfRain} %`
    current.append(rainy);

    const chanceOfSnow = weatherData.weather[0].hourly[0].chanceofsnow;
    const snow = document.createElement('p')
    snow.textContent = `Chance of Snow: ${chanceOfSnow} %`
    current.append(snow);

    for (let i = 0; i < weatherData.weather[0].hourly.length; i++) {
        if (Number(weatherData.weather[0].hourly[i].chanceofsunshine) > 50) {
            weatherIcon.src = "./assets/icons8-summer.gif";
            weatherIcon.alt = "sun"
        }
        if (Number(weatherData.weather[0].hourly[i].chanceofrain) > 50) {
            weatherIcon.src = "./assets/icons8-torrential-rain.gif"
            weatherIcon.alt = "rain"
        }
        if (Number(weatherData.weather[0].hourly[i].chanceofsnow) > 50) {
            weatherIcon.src = "./assets/icons8-light-snow.gif"
            weatherIcon.alt = "snow"
        }
    }
    current.prepend(weatherIcon);
}

//
//
//
let widget = document.querySelector('#widget');

widget.addEventListener('submit', (event) => {
    event.preventDefault();
    let temp = Number(document.querySelector('#temp-to-convert').value);
    let finalResult = document.querySelector('#result');
    const celsius = document.querySelector('#to-c');
    const fahrenheit = document.querySelector('#to-f')
    //https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value

    let result;
    if (celsius.checked) {
      result = (temp - 32) * (5/9)
      finalResult.textContent = `${temp}°F = ${result.toFixed(2)}°C`;
    } else if (fahrenheit.checked) {
      result = (temp * (9/5)) + 32
      finalResult.textContent = `${temp}°C = ${result.toFixed(2)}°F`;
    }  
}
);

//
//
// 

