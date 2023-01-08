// variable to hold api url
const BASE_URL = 'https://wttr.in/'
const form = document.querySelector("form")
const userSearch = document.querySelector(".userSearch")

const currentWeather = document.querySelector('#current-weather')
const todayWeather = document.querySelector('#today-weather')
const tomorrowWeather = document.querySelector('#tomorrow-weather')
const thirdDayWeather = document.querySelector('#third-day-weather')
const main = document.querySelector("main")

form.addEventListener("submit", getApiData)
// when the user clicks submit - run getApi function

function getApiData(event){
event.preventDefault()
console.log(event.target.text.value)
const location = `${userSearch.value}`
const urlFormat = `${BASE_URL} ${location}?format=j1`
getWeather(urlFormat,location)
// go to api & grab info based on user search
}
function getWeather(url, location){
    //promise
fetch(url)
    .then((response) => response.json())
    .then((result) => {
        createCurrentWeather(result, location)
    })
    .catch((error) => {
        createErrorMessage(error)
        function createErrorMessage(){}
        
    })
}
// create current weather variable to hold the current weather in main 
function createCurrentWeather(result,location){ 
appendCurrentWeather(result, location)
getTodayWeather(result, location)
getTomorrowWeather(result, location)
getThirdDayWeather(result, location)
}
function appendCurrentWeather(result,location){
const h1 = document.createElement('h1');
h1.textContent = location
const area = document.createElement("p");
area.innerHTML = `<strong>Area:</strong> ${result.nearest_area[0].areaName[0].value}` 
const region = document.createElement("p")
region.innerHTML = `<strong>Region:</strong> ${result.nearest_area[0].region[0].value}`
const country = document.createElement("p");
country.innerHTML = `<strong>Country:</strong> ${result.nearest_area[0].country[0].value}`
const current = document.createElement("p")
current.innerHTML = `<strong>Current:</strong> Feels like ${result.current_condition[0].FeelsLikeF} F`
currentWeather.append(h1, area, region, country, current)
}

function getTodayWeather(result){
    const today = document.createElement('p');
    today.innerHTML = `<strong> Today</strong>
     <p> <strong> Average Temp : </strong> ${result.weather[0].avgtempF} F</p>
     <p> <strong> Max Temp : </strong> ${result.weather[0].maxtempF} F</p>
     <p> <strong> Min Temp : </strong>${result.weather[0].mintempF} F</p>`
    todayWeather.append(today)
}
function getTomorrowWeather(result){
    const tomorrow = document.createElement("p")
    tomorrow.innerHTML = `<strong> Tomorrow </strong>
    <p> <strong> Average Temp : </strong> ${result.weather[1].avgtempF} F </p>
    <p> <strong> Max Temp : </strong> ${result.weather[1].maxtempF} F </p>
    <p> <strong> Min Temp : </strong> ${result.weather[1].mintempF} F </p>`
    tomorrowWeather.append(tomorrow)
}
function getThirdDayWeather(result){
    const thirdDay = document.createElement("p")
    thirdDayWeather.innerHTML = `<strong> Day After Tomorrow </strong>
    <p> <strong> Average Temp :  </strong> ${result.weather[2].maxtempF} F </p>
    <p> <strong> Max Temp : </strong> ${result.weather[2].maxtempF} F </p>
    <p> <strong> Min Temp : </strong> ${result.weather[2].mintempF} F </p>`
    thirdDayWeather.append(thirdDay)
}





function getPreviousSearches(){
    
}
















