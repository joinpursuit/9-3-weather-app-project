// variable to hold api url
const BASE_URL = 'https://wttr.in/'
const form = document.querySelector("form")
const userSearch = document.querySelector(".userSearch")

const currentWeather = document.querySelector('#current-weather')
const todayWeather = document.querySelector('#today-weather')
const tomorrowWeather = document.querySelector('#tomorrow-weather')
const thirdDayWeather = document.querySelector('#third-day-weather')
const main = document.querySelector("main")
const ul = document.querySelector("#search-ul")
const p = document.querySelector(".chooseLocation")
let formattedUrl


form.addEventListener("submit", getApiData)
// when the user clicks submit - run getApi function

function getApiData(event){
event.preventDefault()
console.log(event.target.text.value)
const location = `${userSearch.value}`
const formattedUrl = `${BASE_URL} ${location}?format=j1`
getApiData(formattedUrl,location)
// go to api & grab info based on user search
}
function getWeather(Url, location){
    //promise
fetch(Url)
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
getPreviousSearches(result,location)
form.reset()
}
function appendCurrentWeather(result,location){
    // currentWeather.textContent = ""
const h1 = document.createElement('h1');
h1.textContent = location
const area = document.createElement("p");
area.innerHTML = `<strong>Area:</strong> ${result.nearest_area[0].areaName[0].value}` 
const region = document.createElement("p")
region.innerHTML = `<strong>Region:</strong> ${result.nearest_area[0].region[0].value}`
const country = document.createElement("p");
country.innerHTML = `<strong>Country:</strong> ${result.nearest_area[0].country[0].value}`
const current = document.createElement("p")
current.innerHTML = `<strong>Current:</strong> Feels like ${result.current_condition[0].FeelsLikeF} F°`
currentWeather.append(h1, area, region, country, current)
}

function getTodayWeather(result){
    const today = document.createElement('p');
    today.innerHTML = `<strong> Today</strong>
     <p> <strong> Average Temp : </strong> ${result.weather[0].avgtempF} F°</p>
     <p> <strong> Max Temp : </strong> ${result.weather[0].maxtempF} F°</p>
     <p> <strong> Min Temp : </strong>${result.weather[0].mintempF} F°</p>`
    todayWeather.append(today)
}
function getTomorrowWeather(result){
    const tomorrow = document.createElement("p")
    tomorrow.innerHTML = `<strong> Tomorrow </strong>
    <p> <strong> Average Temp : </strong> ${result.weather[1].avgtempF} F° </p>
    <p> <strong> Max Temp : </strong> ${result.weather[1].maxtempF} F° </p>
    <p> <strong> Min Temp : </strong> ${result.weather[1].mintempF} F° </p>`
    tomorrowWeather.append(tomorrow)
}
function getThirdDayWeather(result){
    const thirdDay = document.createElement("p")
    thirdDayWeather.innerHTML = `<strong> Day After Tomorrow </strong>
    <p> <strong> Average Temp :  </strong> ${result.weather[2].maxtempF} F° </p>
    <p> <strong> Max Temp : </strong> ${result.weather[2].maxtempF} F° </p>
    <p> <strong> Min Temp : </strong> ${result.weather[2].mintempF} F° </p>`
    thirdDayWeather.append(thirdDay)
}

// // store previous searches in aside
// function getPreviousSearches(result, location){
// const li = document.createElement("li")
// const a = document.createElement("a")
// a.setAttribute("href","#")
// a.setAttribute("name",formattedUrl)
// a.textContent = location
// const pElement = document.createElement ("p")
// pElement.textContent = `-${result.current_condition[0].FeelsLikeF}F°`
// ul.append(li)
// li.append(a)
// a.after(pElement)

// const search = document.querySelector("#search-error")
//     search.remove()
//     a.addEventListener("click", (event) => {
//         getWeather(`${event.target.name}`,location)
//     })
// }
















