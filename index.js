// create a variable to represent the URL
const BASE_URL = `https://wttr.in/`
// ${user_input.value}
const searchResult = document.querySelector(".searchResults")
const form = document.querySelector("form");
const currentWeatherArticle = document.querySelector("#current-weather")
const todayWeatherArticle = document.querySelector("#today")
const tomorrowWeatherArticle = document.querySelector("#tomorrow")
const dayAfterWeatherArticle = document.querySelector("#day-after")
const main = document.querySelector("main")
const ul = document.querySelector("#search-ul")
const p = document.querySelector(".chooseLocation")
let formattedUrl
form.addEventListener("submit", getCurrentApi)


function getCurrentApi(event) {
    event.preventDefault();
    const location = `${searchResult.value}`
     formattedUrl = `${BASE_URL} ${location}?format=j1`
    getWeatherAppData(formattedUrl, location)
}
// write a function that uses the result from the fetch to create weather app data

function getWeatherAppData(url, location) {
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            //call our  function with result
            createCurrentWeather(result, location);
        })
        .catch((error) => {
            // call createErrorMessage function with error
           createErrorMessage(error)
            //create a section element with the class of error
           function createErrorMessage(){}
        });
}
function createCurrentWeather(result, location) {
    console.log(result, location)
    appendCurrentWeatherResult(result, location)
    getTodayWeatherArticle(result, location)
    getTomorrowWeatherArticle(result, location)
    getDayAfterWeatherArticle(result, location)
    getPreviousSearches(result, location)
    form.reset()
   

}
function appendCurrentWeatherResult(result, location) {
    currentWeatherArticle.textContent = ""
    const h1 = document.createElement('h1');
    h1.textContent = location
    const area = document.createElement("p");
    area.innerHTML = `<strong>Area:</strong> ${result.nearest_area[0].areaName[0].value}`
    const region = document.createElement("p")
    region.innerHTML = `<strong>Region:</strong> ${result.nearest_area[0].region[0].value} `
    const country = document.createElement("p")
    country.innerHTML = `<strong>Country:</strong> ${result.nearest_area[0].country[0].value}`
    const current = document.createElement("p")
    current.innerHTML = `<strong>Current:</strong> Feels Like ${result.current_condition[0].FeelsLikeF}°F`
    currentWeatherArticle.append(h1, area, region, country, current)
    

    // call the function to get the numbers
}
function getTodayWeatherArticle(result) {
    todayWeatherArticle.textContent = ""
    const today = document.createElement('p');
    today.innerHTML = `<strong>Today</strong> 
    <p> <strong> Average Temperature: </strong> ${result.weather[0].avgtempF}°F</p> 
    <p> <strong> Max Temperature: </strong> ${result.weather[0].maxtempF}°F </p>
    <p> <strong> Min Temperature: </strong> ${result.weather[0].mintempF}°F </p>`
    todayWeatherArticle.append(today) 
}

function getTomorrowWeatherArticle(result) {
    tomorrowWeatherArticle.textContent = " "
    const tomorrow = document.createElement("p")
    tomorrow.innerHTML = `<strong>Tomorrow</strong> 
    <p> <strong> Average Temperature: </strong> ${result.weather[1].avgtempF}°F</p> 
    <p> <strong> Max Temperature: </strong> ${result.weather[1].maxtempF}°F </p>
    <p> <strong> Min Temperature: </strong> ${result.weather[1].mintempF}°F </p>`
    tomorrowWeatherArticle.append(tomorrow)
}

function getDayAfterWeatherArticle(result) {
    dayAfterWeatherArticle.textContent = " "
    const dayAfter = document.createElement("p")
    dayAfter.innerHTML = `<strong>Day After Tomorrow</strong>
    <p> <strong> Average Temperature: </strong> ${result.weather[2].avgtempF}°F</p> 
    <p> <strong> Max Temperature: </strong> ${result.weather[2].maxtempF}°F </p>
    <p> <strong> Min Temperature: </strong> ${result.weather[2].mintempF}°F </p>`
    dayAfterWeatherArticle.append(dayAfter)
   
}
// remove no previous searches, replace with user input and current temp, use template literal.
//create a li, a, element append li to a and a to li 

function getPreviousSearches(result, location) {
    console.log("test")
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("href", "#")
    a.setAttribute("name", formattedUrl)
    a.textContent = location 
    const pElement = document.createElement("p")
    pElement.textContent = `- ${result.current_condition[0].FeelsLikeF}°F`
     ul.append(li)
    li.append(a)
a.after(pElement)
const search = document.querySelector("#no-previous-search")
    search.remove()
    a.addEventListener("click", (event)=>{
        getWeatherAppData(`${event.target.name}`, location)
    })

    
};