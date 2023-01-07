const BASE_URL = "https://wttr.in"
const format = "?format=j1"

const h2 = document.createElement("h2")
const main = document.querySelector("main")
const article = document.querySelector("article")
const forecast = document.querySelectorAll(".days")
const ul = document.querySelector("ul")

const img = document.createElement("img");

const averageTemperture = [];
const p1 = document.createElement("P");
averageTemperture.push(p1);
const p2 = document.createElement("P");
averageTemperture.push(p2);
const p3 = document.createElement("P");
averageTemperture.push(p3);
console.log(averageTemperture)

const maxTemperture = [];
const p4 = document.createElement("P");
maxTemperture.push(p4);
const p5 = document.createElement("P");
maxTemperture.push(p5);
const p6 = document.createElement("P");
maxTemperture.push(p6);

const minTemperture = [];
const p7 = document.createElement("P");
minTemperture.push(p7);
const p8 = document.createElement("P");
minTemperture.push(p8);
const p9 = document.createElement("P");
minTemperture.push(p9);

const area = document.createElement("p");
const region = document.createElement("p");
const country = document.createElement("p");
const currently = document.createElement("p");

const chanceOfSun = document.createElement("p")
const chanceOfRain = document.createElement("p");
const chanceOfSnow = document.createElement("p")

const today = document.createElement("h3");
const tomorrow = document.createElement("h3");
const dayAfterTomorrow = document.createElement("h3");


const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = document.querySelector("input").value;
    GetWeatherReport(userInput);
    form.reset()
})

const tempConvertForm = document.createElement("form");
tempConvertForm.setAttribute("class", "tempForm")
document.querySelector("aside").append(tempConvertForm);
const input = document.createElement("input");
input.setAttribute("type", "number");
input.setAttribute("min", "-200");
input.setAttribute("max", "200");
input.setAttribute("id", "temp-to-convert");
tempConvertForm.append(input);

const celsius = document.createElement("input");
celsius.setAttribute("type", "radio");
celsius.setAttribute("id", "to-c");
celsius.setAttribute("name", "temp")
celsius.setAttribute("checked", "")
tempConvertForm.append(celsius);

const labelC = document.createElement("label");
labelC.setAttribute("for", "to-c");
labelC.innerHTML = "Celsius";
tempConvertForm.append(labelC);

const fahrenheit = document.createElement("input");
fahrenheit.setAttribute("type", "radio");
fahrenheit.setAttribute("id", "to-f");
fahrenheit.setAttribute("name", "temp")

tempConvertForm.append(fahrenheit);
const labelF = document.createElement("label");
labelF.setAttribute("for", "to-f");
labelF.innerHTML = "Fahrenheit";
tempConvertForm.append(labelF);

const button = document.createElement("input");
button.setAttribute("type", "submit");
button.setAttribute("class", "tempSubmit")
tempConvertForm.append(button);

const h4 = document.createElement("h4")
tempConvertForm.append(h4)
h4.innerHTML = "0.00"

tempConvertForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const check = document.getElementsByName("temp")
    let numberInput = parseInt(document.getElementById("temp-to-convert").value)
    if(check[0].checked){
        numberInput = (numberInput - 32) * (5/9)
        h4.innerHTML = numberInput.toFixed(2)
    } else {
        numberInput = (numberInput * 9/5) + 32
        h4.innerHTML = numberInput.toFixed(2)
    }
})



function GetWeatherReport(userInput){
fetch(`${BASE_URL}/${userInput}${format}`)
.then((response) => response.json())
.then((result) => {
    createWeatherReport(result,userInput); //changed
    threeDayForecast(result);
    previousSearches(result);
})
.catch((error) => console.log(error));
}
 
function createWeatherReport(result, userInput){
    const p = document.querySelector("p");
    p.remove();
    h2.innerHTML = userInput; //chaged
    article.append(h2);

    
// combine code below later make a p tag inside of a p tag to make bold letters
    area.innerHTML = "Nearest Area:" // changed
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
// img of weather if over 50%
    article.append(chanceOfSun)
    article.append(chanceOfRain)
    article.append(chanceOfSnow)

    chanceOfSun.innerHTML = "Chance of Sunshine: " + result.weather[0].hourly[0].chanceofsunshine + "%"
    chanceOfRain.innerHTML = "Chance of Rain: " + result.weather[0].hourly[0].chanceofrain + "%"
    chanceOfSnow.innerHTML = "Chance of Snow: " + result.weather[0].hourly[0].chanceofsnow + "%"

    if(parseInt(result.weather[0].hourly[0].chanceofsunshine) > 50){
        img.setAttribute("alt", "sun")
        img.setAttribute("src", "./assets/icons8-summer.gif")
    } else if (parseInt(result.weather[0].hourly[0].chanceofrain) > 50){
        img.setAttribute("alt", "rain")
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif")
    } else if (parseInt(result.weather[0].hourly[0].chanceofsnow) > 50){
        img.setAttribute("alt", "snow")
        img.setAttribute("src", "./assets/icons8-light-snow.gif")
    }
    article.prepend(img)
}

function threeDayForecast(result){
    today.innerHTML = "Today"
    tomorrow.innerHTML = "Tomorrow"
    dayAfterTomorrow.innerHTML = "Day After Tomorrow"

    forecast[0].append(today)
    forecast[1].append(tomorrow)
    forecast[2].append(dayAfterTomorrow)
    

    for(let i=0; i<forecast.length; i++){ // loop doesnt work with more then one submitt press

        // const averageTemperture = [document.createElement("P"),document.createElement("P"),document.createElement("P")];
        // const maxTemperture = [document.createElement("P"),document.createElement("P"),document.createElement("P")];
        // const minTemperture = [document.createElement("P"),document.createElement("P"),document.createElement("P")];

        // averageTemperture.setAttribute("id", "here")

        averageTemperture[i].innerHTML = "Average Temperture:" + result.weather[i].avgtempF + "°F"
        maxTemperture[i].innerHTML = "Max Temperture:" + result.weather[i].maxtempF + "°F"
        minTemperture[i].innerHTML = "Min Temperture:" + result.weather[i].mintempF + "°F"

        forecast[i].append(averageTemperture[i])
        forecast[i].append(maxTemperture[i])
        forecast[i].append(minTemperture[i])
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