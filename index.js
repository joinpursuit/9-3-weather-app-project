const BASE_URL = "https://wttr.in"
const format = "?format=j1"

const h2 = document.createElement("h2");
const main = document.querySelector("main");
const article = document.querySelector("article");
const forecast = document.querySelectorAll(".days");
const ul = document.querySelector("ul");

const img = document.createElement("img");

const averageTemperture = [document.createElement("p"), document.createElement("p"), document.createElement("p")];
const maxTemperture = [document.createElement("p"), document.createElement("p"), document.createElement("p")];
const minTemperture = [document.createElement("p"), document.createElement("p"), document.createElement("p")];

const area = document.createElement("p");
const region = document.createElement("p");
const country = document.createElement("p");
const currently = document.createElement("p");

const chanceOfSun = document.createElement("p");
const chanceOfRain = document.createElement("p");
const chanceOfSnow = document.createElement("p");
const chanceOfFog = document.createElement("p");
const chanceOfWindy = document.createElement("p");
const chanceOfThunder = document.createElement("p")

const today = document.createElement("h3"); 
const tomorrow = document.createElement("h3");
const dayAfterTomorrow = document.createElement("h3");


const form = document.querySelector("form"); // creates form and event listener for the header  🔽
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = document.querySelector("input").value;
    GetWeatherReport(userInput);
    form.reset();
})

const tempConvertForm = document.createElement("form"); // create the form of the tempperature converture  🔽
tempConvertForm.setAttribute("class", "tempForm");
document.querySelector("aside").append(tempConvertForm);
const input = document.createElement("input");
input.setAttribute("type", "number");
input.setAttribute("min", "-200");
input.setAttribute("max", "200");
input.setAttribute("id", "temp-to-convert");
tempConvertForm.append(input);

const celsius = document.createElement("input"); // creates the celsius radio button 🔽
celsius.setAttribute("type", "radio"); 
celsius.setAttribute("id", "to-c");
celsius.setAttribute("name", "temp");
celsius.setAttribute("checked", "");
tempConvertForm.append(celsius);

const labelC = document.createElement("label"); // creates lable of the celsius radio button  🔽
labelC.setAttribute("for", "to-c");
labelC.innerHTML = "Celsius";
tempConvertForm.append(labelC);

const fahrenheit = document.createElement("input"); // create the fahrenheit radio button  🔽
fahrenheit.setAttribute("type", "radio");
fahrenheit.setAttribute("id", "to-f");
fahrenheit.setAttribute("name", "temp")
tempConvertForm.append(fahrenheit);

const labelF = document.createElement("label"); // creates lable of the fahrenheit radio button  🔽
labelF.setAttribute("for", "to-f");
labelF.innerHTML = "Fahrenheit";
tempConvertForm.append(labelF);

const button = document.createElement("input"); // creates submit button for the temperture converter  🔽
button.setAttribute("type", "submit");
button.setAttribute("class", "tempSubmit");
tempConvertForm.append(button);

const h4 = document.createElement("h4") // creates the value for the temperature converter  🔽
tempConvertForm.append(h4)
h4.innerHTML = "0.00"

tempConvertForm.addEventListener("submit", (event) => { // creates an interactive temperature converter
    event.preventDefault();
    const check = document.getElementsByName("temp");
    let numberInput = parseInt(document.getElementById("temp-to-convert").value);
    if(check[0].checked){ // checks which button is selected
        numberInput = (numberInput - 32) * (5/9);
        h4.innerHTML = numberInput.toFixed(2);
    } else {
        numberInput = (numberInput * 9/5) + 32;
        h4.innerHTML = numberInput.toFixed(2);
    }
})

function GetWeatherReport(userInput){ // fetches info from api
fetch(`${BASE_URL}/${userInput}${format}`)
.then((response) => response.json())
.then((result) => {
    createWeatherReport(result,userInput); 
    threeDayForecast(result);
    previousSearches(result, userInput);
})
.catch((error) => console.log(error));
}
 
function createWeatherReport(result, userInput){ // creates the main article
    const p = document.querySelector("p");
    p.remove();
    h2.innerHTML = userInput; 
    article.append(h2);

    
    area.innerHTML = "Nearest Area:";
    region.innerHTML = "Region:";
    country.innerHTML = "Country:";
    currently.innerHTML = "Currently:";

    area.innerHTML += " " + result.nearest_area[0].areaName[0].value;
    region.innerHTML += " " + result.nearest_area[0].region[0].value;
    country.innerHTML += " " + result.nearest_area[0].country[0].value;
    currently.innerHTML += " " +result.current_condition[0].FeelsLikeF + "°F";

    article.append(area);
    article.append(region);
    article.append(country);
    article.append(currently);

    article.append(chanceOfSun);
    article.append(chanceOfRain);
    article.append(chanceOfSnow);
    article.append(chanceOfFog);
    article.append(chanceOfThunder);
    article.append(chanceOfWindy);

    chanceOfSun.innerHTML = "Chance of Sunshine: " + result.weather[0].hourly[0].chanceofsunshine + "%";
    chanceOfRain.innerHTML = "Chance of Rain: " + result.weather[0].hourly[0].chanceofrain + "%";
    chanceOfSnow.innerHTML = "Chance of Snow: " + result.weather[0].hourly[0].chanceofsnow + "%";
    chanceOfFog.innerHTML = "Chance of Fog: " + result.weather[0].hourly[0].chanceoffog + "%";
    chanceOfWindy.innerHTML = "Chance of Windy: " + result.weather[0].hourly[0].chanceofwindy + "%";
    chanceOfThunder.innerHTML = "Chance of Thunder: " + result.weather[0].hourly[0].chanceofthunder + "%";

    if(parseInt(result.weather[0].hourly[0].chanceofsunshine) > 50){ // checks api data to see what img to create
        img.setAttribute("alt", "sun");
        img.setAttribute("src", "./assets/icons8-summer.gif");
    } else if (parseInt(result.weather[0].hourly[0].chanceofrain) > 50){
        img.setAttribute("alt", "rain");
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    } else if (parseInt(result.weather[0].hourly[0].chanceofsnow) > 50){
        img.setAttribute("alt", "snow");
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
    } else  if (parseInt(result.weather[0].hourly[0].chanceoffog) > 50){
        img.setAttribute("alt", "fog");
        img.setAttribute("src", "assets/icons8-fog.gif");
    } else  if (parseInt(result.weather[0].hourly[0].chanceofwindy) > 50){ 
        img.setAttribute("alt", "windy");
        img.setAttribute("src", "assets/icons8-wind.gif");
    } else  if (parseInt(result.weather[0].hourly[0].chanceofthunder) > 50){
        img.setAttribute("alt", "thunder");
        img.setAttribute("src", "assets/icons8-storm.gif");
    } 
    article.prepend(img);
}

function threeDayForecast(result){ // creates 3 sub articles
    today.innerHTML = "Today";
    tomorrow.innerHTML = "Tomorrow";
    dayAfterTomorrow.innerHTML = "Day After Tomorrow";

    forecast[0].append(today);
    forecast[1].append(tomorrow);
    forecast[2].append(dayAfterTomorrow);

    for(let i=0; i<forecast.length; i++){ //loops 3 times and creates the info for the 3 sub articles
        forecast[i].setAttribute("class", "updatedDays");

        averageTemperture[i].innerHTML = "Average Temperture:" + result.weather[i].avgtempF + "°F";
        maxTemperture[i].innerHTML = "Max Temperture:" + result.weather[i].maxtempF + "°F";
        minTemperture[i].innerHTML = "Min Temperture:" + result.weather[i].mintempF + "°F";

        forecast[i].append(averageTemperture[i]);
        forecast[i].append(maxTemperture[i]);
        forecast[i].append(minTemperture[i]);
    }
}


function previousSearches(result, userInput){ // creates previous searches and makes them a clickable link
    if (document.querySelector(".remove")){ //checks if p tag with "no previous searches" is stil there
        document.querySelector(".remove").remove(); // removes it if it is
    }
    const li = document.createElement("li");
    const p = document.createElement("p");
    ul.append(li);
    li.append(p);
    const a = document.createElement("a");
    const listA = document.querySelectorAll("li p a");
    a.setAttribute("href", "#");
    a.innerHTML = result.nearest_area[0].areaName[0].value;
    p.innerHTML = " - " + result.current_condition[0].FeelsLikeF + "°F";
    p.prepend(a);

    a.addEventListener("click", () => { //when the link is clicked
        GetWeatherReport(userInput); // Will load what was previously searched
    });

    for(let i=0; i<listA.length; i++){
        if(listA[i].innerHTML === result.nearest_area[0].areaName[0].value){ // Checks if any created a tag is repeated
            li.remove(); // removes one if they are repeated
        }
    }
}