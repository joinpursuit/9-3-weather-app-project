const BASE_URL = "https://wttr.in"

const form = document.querySelector("form")
const mainArticle = document.getElementById("current")
form.addEventListener("submit", event => {
    event.preventDefault()
    mainArticle.innerHTML = `<p>Please Wait...</p>`
    const userInput = document.getElementById("input")
    fetch (`${BASE_URL}/${userInput.value}?format=j1`) 
    .then ((response) => response.json())
.then ((data)=> {
    mainArticle.innerHTML=""

    const current = document.createElement("h3")
    const area = document.createElement("p")
    const region = document.createElement("p")
    const country = document.createElement("p")
    const currently = document.createElement("p")

    current.textContent = userInput.value
    area.textContent = `Area: ${data.nearest_area[0].areaName[0].value}`
    region.textContent = `Region: ${data.nearest_area[0].region[0].value}`
    country.textContent = `Country: ${data.nearest_area[0].country[0].value}`
    currently.textContent = `Feels Like ${data.current_condition[0].FeelsLikeF} F`

    mainArticle.append(current, area, region, country, currently)
    const today = document.getElementById("today")
    const tomorrow = document.getElementById("tomorrow")
    const afterTomorrow = document.getElementById("dayAfterTomorrow")

    const todayTitle = document.createElement("h2")
    const tomorrowTitle = document.createElement("h2")
    const afterTomorrowTitle = document.createElement("h2")
    todayTitle.textContent = "Today"
    tomorrowTitle.textContent = "Tomorrow"
    afterTomorrowTitle.textContent = "Day After Tomorrow"
    const avgToday = document.createElement("p");
    const avgTomorrow = document.createElement("p");
    const avgNextDay = document.createElement("p");
    avgToday.textContent = `Average: ${data.weather[0].avgtempF} F`;
    avgTomorrow.textContent = `Average: ${data.weather[1].avgtempF} F`;
    avgNextDay.textContent = `Average: ${data.weather[2].avgtempF} F`;
    const maxToday = document.createElement("p")
    const maxTomorrow = document.createElement("p")
    const maxNextDay = document.createElement("p")
    maxToday.textContent = `Max: ${data.weather[0].maxtempF} F`
    maxTomorrow.textContent = `Max: ${data.weather[1].maxtempF} F`
    maxNextDay.textContent = `Max: ${data.weather[2].maxtempF} F`
    const minToday = document.createElement("p")
    const minTomorrow = document.createElement("p")
    const minNextDay = document.createElement("p")
    minToday.textContent = `Min: ${data.weather[0].mintempF} F`
    minTomorrow.textContent = `Min: ${data.weather[1].mintempF} F`
    minNextDay.textContent = `Min: ${data.weather[2].mintempF} F`

    today.append(todayTitle,avgToday,maxToday,minToday);
    tomorrow.append(tomorrowTitle,avgTomorrow,maxTomorrow,minTomorrow);
    afterTomorrow.append(afterTomorrowTitle,avgNextDay,maxNextDay,minNextDay);

    userInput.value = "";
})
.catch((error) => {
    console.log(error)
})
})
    
    

    

   
const temperatureConversion = document.getElementById('temperatureConversion');
formConvert.addEventListener('submit', convertTemperature);

function convertTemperature(event) {
    event.preventDefault();

    const inputTempNum = document.getElementById('convertThisTemp');
    const inputValue = inputTempNum.value;

    const celsiusSelection = document.querySelector('#cel');
    const fahrenheitSelection = document.getElementById('fah');

    const tempResults = document.getElementById("#tempResults");
    const convertedTemp = document.querySelector('#convertedTemp');

    let result;
    if (celsiusSelection.checked) {
        result = (inputValue - 32) * (5/9);
        convertedTemp.textContent = `${inputValue}\°F is ${result.toFixed(2)}\°C`;
        tempResults.append(convertedTemp);
    } else if (fahrenheitSelection.checked) {
        result = (inputValue * (9/5)) + 32;
        convertedTemp.textContent = `${inputValue}\°C is ${result.toFixed(2)}\°F`;
        tempResults.append(convertedTemp);
    }  
}