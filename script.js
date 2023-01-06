// // variable to hold api url
// const BASE_URL = 'https://wttr.in'
// const form = document.querySelector("form")
// const userSearch = document.querySelector(".userSearch")

// const currentWeather = document.querySelector('#current-weather')
// const todayWeather = document.querySelector('#today-weather')
// const tomorrowWeather = document.querySelector('#tomorrow-weather')
// const thirdDayWeather = document.querySelector('#third-day-weather')
// const main = document.querySelector("main")

// form.addEventListener("submit", getApiData)
// // when the user clicks submit - run getApi function

// function getApiData(event){
// event.preventDefault()
// const location = `${userSearch.value}`
// const urlFormat = `${BASE_URL} ${location}?format=j1`
// getWeather(urlFormat,location)
// // go to api & grab info based on user search
// }
// function getWeather(url, location){
//     //promise
// fetch(url)
//     .then((response) => response.json())
//     .then((result) => {
//         createCurrentWeather(result,location)
//     })
//     .catch((error) => {
//         function createErrorMessage(){}
//     })
// }
// // create current weather variable to hold the current weather in main 
// function createCurrentWeather(result,location){ 
// appendCurrentWeather(result, location)
// getTodayWeather(result, location)
// getTomorrowWeather(result, location)
// getThirdDayWeather(result, location)
// }
// function appendCurrentWeather(){
// const h1 = document.createElement('h1');
// h1.textContent = `${searchResult.value}`
// const area = document.createElement("p");
// area.innerHTML = `<strong>Area:</strong>`
// const region = document.createElement("p")
// region.innerHTML = `<strong>Region:</strong>`
// const country = document.createElement("p");
// country.innerHTML = `<strong>Country:</strong>`
// const current = document.createElement("p")
// current.innerHTML = `<strong>Curent:</strong>`
// currentWeather.append(h1, area, region, country, current)
// }

// function getTodayWeather(){
//     const today = document.createElement('p');
//     today.innerHTML = `<strong>Today</strong>`
//     todayWeather.append(today)
// }
// function getTomorrowWeather(){
//     const tomorrow = document.createElement("p")
//     tomorrow.innerHTML = `<strong> Tomorrow</strong>`
//     tomorrowWeather.append(tomorrow)
// }
// function getThirdDayWeather(){
//     const thirdDayWeather = document.createElement("p")
//     thirdDayWeather.innerHTML = `<strong>Day After Tomorrow</strong>`
//     thirdDayWeather.append(thirdDayWeather)
// }



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
form.addEventListener("submit", getCurrentApi)
function getCurrentApi(event) {
    event.preventDefault();
    const location = `${searchResult.value}`
    const formattedUrl = `${BASE_URL} ${location}?format=j1`
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
}
function appendCurrentWeatherResult(info) {
    const h1 = document.createElement('h1');
    h1.textContent = `${searchResult.value}`
    const area = document.createElement("p");
    area.innerHTML = `<strong>Area:</strong> ${info.nearest_area[0].areaName[0].value}`
    const region = document.createElement("p")
    region.innerHTML = `<strong>Region:</strong>`
    const country = document.createElement("p")
    country.innerHTML = `<strong>Country:</strong>`
    const current = document.createElement("p")
    current.innerHTML = `<strong>Current:</strong>`
    currentWeatherArticle.append(h1, area, region, country, current)
// call the function to get the numbers
}
function getTodayWeatherArticle() {
    const today = document.createElement('p');
    today.innerHTML = `<strong>Today</strong>`
    todayWeatherArticle.append(today)
}
function getTomorrowWeatherArticle() {
    const tomorrow = document.createElement("p")
    tomorrow.innerHTML = `<strong>Tomorrow</strong>`
    tomorrowWeatherArticle.append(tomorrow)
}
function getDayAfterWeatherArticle() {
    const dayAfter = document.createElement("p")
    dayAfter.innerHTML = `<strong>Day After Tomorrow</strong>`
    dayAfterWeatherArticle.append(dayAfter)
    
}




















