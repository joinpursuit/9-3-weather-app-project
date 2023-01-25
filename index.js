const form = document.querySelector("form")
const mainArticle = document.getElementById("current")
const URL = "https://wttr.in"
form.addEventListener("submit", event => {
    event.preventDefault()
    mainArticle.innerHTML = `<p>Loading...</p>`
    const userInput = document.getElementById("input")
    fetch (`${URL}/${userInput.value}?format=j1`) 
    .then ((response) => response.json())
    .then ((data)=> {
        console.log(data)
        mainArticle.innerHTML=""
        const current = document.createElement("h2")
        const area = document.createElement("p")
        const region = document.createElement("p")
        const country = document.createElement("p")
        const currently = document.createElement("p")
        const sunshine = document.createElement("p")
        const rain = document.createElement("p")
        const snow = document.createElement("p")
        const image = document.createElement("img")
        
        current.textContent = userInput.value
        const find__area = data.nearest_area[0].areaName[0]
        if (userInput.value.toLowerCase() == find__area.value.toLowerCase()){
            area.innerHTML = `<strong>Area:</strong> ${find__area.value}`
        } else{ 
            area.innerHTML = `<strong>Nearest Area:</strong> ${find__area.value}`
        }
        region.innerHTML = `<strong> Region:</strong> ${data.nearest_area[0].region[0].value}`
        country.innerHTML = `<strong> Country: </strong>${data.nearest_area[0].country[0].value}`
        currently.innerHTML = `<strong> Feels Like:</strong> ${data.current_condition[0].FeelsLikeF}°F`

        if (Number(data.weather[0].hourly[0].chanceofsunshine) >= 50){
            image.setAttribute('src', './assets/icons8-summer.gif');
            image.setAttribute('alt', 'sun');
        } else if (Number(data.weather[0].hourly[0].chanceofrain) >= 50) {
            image.setAttribute('src', './assets/icons8-torrential-rain.gif');
            image.setAttribute('alt', 'rain');
        } else if (Number(data.weather[0].hourly[0].chanceofsnow) >= 50) {
            image.setAttribute('src', './assets/icons8-light-snow.gif');
            image.setAttribute('alt', 'snow');
        }

        sunshine.innerHTML = `<strong>Chance of Sunshine: </strong>${data.weather[0].hourly[0].chanceofsunshine} %`
        rain.innerHTML = `<strong>Chance of Rain: </strong>${data.weather[0].hourly[0].chanceofrain} %`
        snow.innerHTML = `<strong>Chance of Snow: </strong>${data.weather[0].hourly[0].chanceofsnow} %`
        mainArticle.append(current, image, area, region, country, currently, sunshine, rain, snow)

        const today = document.getElementById("today")
        today.innerHTML = ""
        const tomorrow = document.getElementById("tomorrow")
        tomorrow.innerHTML = ""
        const afterTomorrow = document.getElementById("dayAfterTomorrow")
        afterTomorrow.innerHTML= ""

        const todayTitle = document.createElement("h2")
        const tomorrowTitle = document.createElement("h2")
        const afterTomorrowTitle = document.createElement("h3")

        const avg0 = document.createElement("p")
        const avg1 = document.createElement("p")
        const avg2 = document.createElement("p")

        const max0 = document.createElement("p")
        const max1 = document.createElement("p")
        const max2 = document.createElement("p")

        const min0 = document.createElement("p")
        const min1 = document.createElement("p")
        const min2 = document.createElement("p")
        
        todayTitle.textContent = "Today"
        tomorrowTitle.textContent = "Tomorrow"
        afterTomorrowTitle.textContent = "Day After Tomorrow"

        avg0.textContent = `Average: ${data.weather[0].avgtempF}°F`
        avg1.textContent = `Average: ${data.weather[1].avgtempF}°F`
        avg2.textContent = `Average: ${data.weather[2].avgtempF}°F`

        max0.textContent = `Max: ${data.weather[0].maxtempF}°F`
        max1.textContent = `Max: ${data.weather[1].maxtempF}°F`
        max2.textContent = `Max: ${data.weather[2].maxtempF}°F`

        min0.textContent = `Min: ${data.weather[0].mintempF}°F`
        min1.textContent = `Min: ${data.weather[1].mintempF}°F`
        min2.textContent = `Min: ${data.weather[2].mintempF}°F`


        today.append(todayTitle,avg0,max0,min0)
        tomorrow.append(tomorrowTitle,avg1,max1,min1)
        afterTomorrow.append(afterTomorrowTitle,avg2,max2,min2)

        const historyList = document.getElementById("historyList")
        const search = document.createElement("li")
        const search_link = document.createElement("a")
        search_link.textContent = `${userInput.value}   -   ${data.current_condition[0].FeelsLikeF}°F`
        search.append(search_link)
        historyList.append(search)
        const firstSearch = document.getElementById("noSearch")
        firstSearch.innerHTML = ""

        userInput.value = ""
    })
    .catch((error) => {
        console.log(error)
    })
})

const formConvert = document.getElementById('tempConvert');
formConvert.addEventListener('submit', convertTemperature);
    
function convertTemperature(event) {
    event.preventDefault();
    
    const inputField = document.getElementById('temp-to-convert');
    const inputValue = inputField.value;
    
    const celsiusRadio = document.querySelector('#to-c');
    const fahrenheitRadio = document.getElementById('to-f');

    const resultElement = document.querySelector('#displayTempinCorF');

    let result;
    if (celsiusRadio.checked) {
        result = (inputValue - 32) * (5/9); // convert to celsius
        resultElement.textContent = `${inputValue}\°F is ${result.toFixed(2)}\°C`;
    } else if (fahrenheitRadio.checked) {
        result = (inputValue * (9/5)) + 32; // convert to fahrenheit
        resultElement.textContent = `${inputValue}\°C is ${result.toFixed(2)}\°F`;
    }  
}
