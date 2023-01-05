const BASE_URL = "https://wttr.in"
const format = "?format=j1"

const h2 = document.createElement("h2")
const main = document.querySelector("main")
const article = document.querySelector("article")
const forecast = document.querySelectorAll(".days")
const ul = document.querySelector("ul")

const area = document.createElement("p");
const region = document.createElement("p");
const country = document.createElement("p");
const currently = document.createElement("p");

const today = document.createElement("h3")
const tomorrow = document.createElement("h3")
const dayAfterTomorrow = document.createElement("h3")


const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = document.querySelector("input").value;
    GetWeatherReport(userInput);
    form.reset()
})


function GetWeatherReport(userInput){
fetch(`${BASE_URL}/${userInput}${format}`)
.then((response) => response.json())
.then((result) => {
    createWeatherReport(result);
    threeDayForecast(result);
    previousSearches(result);
})
.catch((error) => console.log(error));
}
 
function createWeatherReport(result){
    const p = document.querySelector("p");
    p.remove();
    h2.innerHTML = result.nearest_area[0].areaName[0].value;
    article.append(h2);

    
// combine code below later
    area.innerHTML = "Area:" 
    region.innerHTML = "Region:"
    country.innerHTML = "Country:"
    currently.innerHTML = "Currently:"

    area.innerHTML += " " + result.nearest_area[0].areaName[0].value;
    region.innerHTML += " " + result.nearest_area[0].region[0].value;
    country.innerHTML += " " + result.nearest_area[0].country[0].value;
    currently.innerHTML += " " +result.current_condition[0].FeelsLikeF + "°F";

    article.append(area)
    article.append(region)
    article.append(country)
    article.append(currently)

}

function threeDayForecast(result){
    today.innerHTML = "Today"
    tomorrow.innerHTML = "Tomorrow"
    dayAfterTomorrow.innerHTML = "Day After Tomorrow"

    forecast[0].append(today)
    forecast[1].append(tomorrow)
    forecast[2].append(dayAfterTomorrow)
    

    for(let i=0; i<forecast.length; i++){ // loop doesnt work with more then one submitt press

        const averageTemperture = document.createElement("P");
        const maxTemperture = document.createElement("P");
        const minTemperture = document.createElement("P");

        averageTemperture.setAttribute("id", "here")

        averageTemperture.innerHTML = "Average Temperture:" + result.weather[i].avgtempF + "°F"
        maxTemperture.innerHTML = "Max Temperture:" + result.weather[i].maxtempF + "°F"
        minTemperture.innerHTML = "Min Temperture:" + result.weather[i].mintempF + "°F"

        forecast[i].append(averageTemperture)
        forecast[i].append(maxTemperture)
        forecast[i].append(minTemperture)
    }
}


function previousSearches(result){
    if (document.querySelector(".remove")){
        document.querySelector(".remove").remove();
    }
    const li = document.createElement("li");
    const p = document.createElement("p")
    ul.append(li)
    li.append(p)
    const a = document.createElement("a")
    const listA = document.querySelectorAll("li p a")
    a.setAttribute("href", "#")
    a.innerHTML = result.nearest_area[0].areaName[0].value;
    p.innerHTML = " - " + result.current_condition[0].FeelsLikeF + "°F"
    p.prepend(a)
    for(let i=0; i<listA.length; i++){
        if(listA[i].innerHTML === result.nearest_area[0].areaName[0].value){
            li.remove()
}
}
}