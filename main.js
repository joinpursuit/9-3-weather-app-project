

const form = document.querySelector("form");

const currentWeather = document.querySelector("#current-weather")

const today = document.querySelector(".today")

const tomorrow = document.querySelector(".tomorrow")

const dayAfter = document.querySelector(".day-after-tomorrow")

const weatherWidget = document.createElement("img")

const main = document.querySelector("main")

const choose =  document.querySelector("#choose")

const pSearch = document.querySelector("#pSearch")

const previousData = []

const ul = document.querySelector(".ulP")

const h4result = document.querySelector('.h4_result')

const convertForm = document.querySelector('.convertor-form')

// const strong = document.createElement("strong")
// const breakPoint = document.createElement("br")


form.addEventListener("submit",(event)=>{
  event.preventDefault();
let location = event.target.location.value
getWeatherApi(location)
choose.style.display = "none"
pSearch.style.display = "none"
});

convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // class CelsiustoFarenheit
const c = document.querySelector(".c").checked
const f = document.querySelector(".f").checked
if (c) {

   h4result.textContent =  parseFloat( farenheitToCelcius(event.target.temp.value)).toFixed(2) + "°C"
}
if (f){
  h4result.textContent = parseFloat(celciusToFarenheit(event.target.temp.value)).toFixed(2)+ " °F"
}
})

function celciusToFarenheit(degree) {
  return (degree * 9) / 5 + 32;
}
function farenheitToCelcius(degree) {
  return ((degree - 32) * 5) / 9;
}


function addToPrevious(cityName,temp) {
  const li = document.createElement("li")
  li.innerHTML = `<a href="javascript: getWeatherApi('`+cityName+`')">`+ cityName +'  '+temp+ `F</a>`
   if (!previousData.some(x => x === cityName))
    {
     ul.append(li)
    }
}

function getWeatherApi(location){
const deleteCity = document.querySelectorAll(".mainWeather")
//this will delete the previous search
if(deleteCity.length > 0){
  for(let i = 0; i < deleteCity.length; i++){
    deleteCity[i].remove()
  }
}

  const BASE_URL = `https://wttr.in/${location}?format=j1`
  fetch(BASE_URL)
  .then((response) => response.json())
  .then((result) => { 
   getWeather(result)

  })
  .catch((error) =>{
    createErrorMeassage(error)
  })
}


function getWeather(promise){
 //console.log(promise.current_condition)
const mainSection = document.createElement("section")
mainSection.setAttribute("class", "mainWeather")

const cityName = document.createElement("p")
cityName.textContent = `Nearest Area ${promise.nearest_area[0].areaName[0].value}`
mainSection.append(cityName)

const region = document.createElement("p")
region.textContent = `Region: ${promise.nearest_area[0].region[0].value}`
mainSection.append(region)


const country = document.createElement("p")
country.textContent = `Country:${promise.nearest_area[0].country[0].value}`
mainSection.append(country)

const currently = document.createElement("p")
currently.textContent = `Currently: feels like ${promise.current_condition[0].FeelsLikeF} F`
mainSection.append(currently)

const sunshine = document.createElement("p")
sunshine.textContent = `Chance of Sunshine ${promise.weather[0].hourly[0].chanceofsunshine}%`
mainSection.append(sunshine)

const rain = document.createElement("p")
rain.textContent = `Chance of Rain ${promise.weather[0].hourly[0].chanceofrain}%`
mainSection.append(rain)

const snow = document.createElement("p")
snow.textContent = `Chance of Snow ${promise.weather[0].hourly[0].chanceofsnow}%`
mainSection.append(snow)

const todayName = document.createElement("p")
todayName.setAttribute("class", "mainWeather")
todayName.textContent = "Today"
today.append(todayName);

const AverageTempToday = document.createElement("p");
AverageTempToday.setAttribute("class", "mainWeather")
AverageTempToday.textContent = `Average Temperature: ${promise.weather[0].avgtempF}°F`
today.append(AverageTempToday);

const maxTempToday = document.createElement("p");
maxTempToday.setAttribute("class", "mainWeather");
maxTempToday.textContent = `Max Temperature: ${promise.weather[0].maxtempF}°F`
today.append(maxTempToday)

const minTempToday = document.createElement("p");
minTempToday.setAttribute("class", "mainWeather");
minTempToday.textContent = `Min Temperature: ${promise.weather[0].mintempF}°F`
today.append(minTempToday)


const tomorrowName = document.createElement("p")
tomorrowName.setAttribute("class", "mainWeather")
tomorrowName.textContent = "Tomorrow"
tomorrow.append(tomorrowName);

const AverageTempTomorrow = document.createElement("p");
AverageTempTomorrow.setAttribute("class", "mainWeather")
AverageTempTomorrow.textContent = `Average Temperature: ${promise.weather[1].avgtempF}°F`
tomorrow.append(AverageTempTomorrow);

const maxTempTomorrow = document.createElement("p");
maxTempTomorrow.setAttribute("class", "mainWeather");
maxTempTomorrow.textContent = `Max Temperature: ${promise.weather[1].maxtempF}°F`
tomorrow.append(maxTempTomorrow)

const minTempTomorrow = document.createElement("p");
minTempTomorrow.setAttribute("class", "mainWeather");
minTempTomorrow.textContent = `Min Temperature: ${promise.weather[1].mintempF}°F`
tomorrow.append(minTempTomorrow)


const dayAfterName = document.createElement("p")
dayAfterName.setAttribute("class", "mainWeather")
dayAfterName.textContent = "Day After Tomorrow"
dayAfter.append(dayAfterName);

const AverageTempAfter = document.createElement("p");
AverageTempAfter.setAttribute("class", "mainWeather")
AverageTempAfter.textContent = `Average Temperature: ${promise.weather[2].avgtempF}°F`
dayAfter.append(AverageTempAfter);

const maxTempAfter = document.createElement("p");
maxTempAfter.setAttribute("class", "mainWeather");
maxTempAfter.textContent = `Max Temperature: ${promise.weather[2].maxtempF}°F`
dayAfter.append(maxTempAfter)

const minTempAfter = document.createElement("p");
minTempAfter.setAttribute("class", "mainWeather");
minTempAfter.textContent = `Min Temperature: ${promise.weather[2].mintempF}°F`
dayAfter.append(minTempAfter)




mainSection.append(today, tomorrow, dayAfter);
currentWeather.append(mainSection)

addToPrevious(promise.nearest_area[0].areaName[0].value, promise.current_condition[0].FeelsLikeF)
previousData.push(promise.nearest_area[0].areaName[0].value)



}
