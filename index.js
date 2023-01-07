const base_URL = 'https://wttr.in';

const main = document.querySelector("main");
const form = document.querySelector("form");
const h2 = document.createElement("h2");
const article = document.querySelector("article");

const area = document.createElement("p");
const region = document.createElement("p");
const country = document.createElement("p");
const currently = document.createElement("p");

const chanceOfSun = document.createElement("p");
const chanceOfRain = document.createElement("p");
const chanceOfSnow = document.createElement("p");

const today = document.createElement("h3")
const tomorrow = document.createElement("h3")
const afterTomorrow = document.createElement("h3")



form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const location = document.querySelector('input').value;
  getWeather(location);    
  form.reset();

})

// converter
const asideForm = document.createElement("form");
document.querySelector("aside").append(asideForm);
asideForm.setAttribute("id", "converter-form")
const input = document.createElement("input");
input.setAttribute("type", "number");
input.setAttribute("min", "-200");
input.setAttribute("max", "200");
input.setAttribute("id", "temp-to-convert")
asideForm.append(input);

const celsius = document.createElement("input")
celsius.setAttribute("type", "radio")
celsius.setAttribute("id", "to-c")
celsius.setAttribute("checked", "")
asideForm.append(celsius)
celsius.setAttribute("name", "temp")

const celsiusLabel = document.createElement("label")
celsiusLabel.setAttribute("for", "celsius")
celsiusLabel.innerHTML="To Celsius";
asideForm.append(celsiusLabel)

const fahrenheit = document.createElement("input")
fahrenheit.setAttribute("type", "radio")
fahrenheit.setAttribute("id", "to-f")
asideForm.append(fahrenheit)
fahrenheit.setAttribute("name", "temp")


const fahrenheitLabel = document.createElement("label")
fahrenheitLabel.setAttribute("for", "to-f")
fahrenheitLabel.innerHTML="To Fahrenheit";
asideForm.append(fahrenheitLabel)

const button = document.createElement("input");
button.setAttribute("type", "submit")
asideForm.append(button);

const result = document.createElement("h4");
result.innerHTML = "0.00";
asideForm.append(result);

asideForm.addEventListener("submit", (event) =>{
    event.preventDefault();

const checked = document.getElementsByName("temp")

 if (checked[0].checked){
   let numberInput = document.getElementById("temp-to-convert").value;
   console.log(numberInput)
   numberInput = (numberInput - 32) * (5/9);
   result.innerHTML = numberInput.toFixed(2);
 }

 if (checked[1].checked){
    let numberInput = document.getElementById("temp-to-convert").value;
    console.log(numberInput)
    numberInput = (numberInput * 9/5) + 32;
    result.innerHTML = numberInput.toFixed(2);
 }
})


function getWeather(location){
    fetch(`${base_URL}/${location}?format=j1`)
    .then((response) => response.json())
    .then((result) => {
        
        weatherCard(result, location);
        threeDaysForecast(result);
        previousSearches(result, location);

    })
      .catch((error) => console.log(error));
}




function weatherCard(result, location){
    h2.innerHTML = location;
    article.append(h2);

    const p = document.querySelector("p")
    p.remove();

    article.append(area);
    article.append(region);
    article.append(country);
    article.append(currently);

    article.append(chanceOfSun);
    article.append(chanceOfRain);
    article.append(chanceOfSnow);


    area.innerHTML = "Nearest Area: ";
    region.innerHTML = "Region: ";
    country.innerHTML = "Country: ";
    currently.innerHTML = "Currently: ";

    chanceOfSun.innerHTML = "Chance of Sunshine: "
    chanceOfRain.innerHTML = "Chance of Rain: "
    chanceOfSnow.innerHTML = "Chance of Snow: "

    area.innerHTML += result.nearest_area[0].areaName[0].value;
    region.innerHTML += result.nearest_area[0].region[0].value;
    country.innerHTML += result.nearest_area[0].country[0].value;
    currently.innerHTML += "Feels Like " + result.current_condition[0].FeelsLikeF + "°F";

    chanceOfSun.innerHTML += result.weather[0].hourly[0].chanceofsunshine + "%";
    chanceOfRain.innerHTML += result.weather[0].hourly[0].chanceofrain + "%";
    chanceOfSnow.innerHTML += result.weather[0].hourly[0].chanceofsnow + "%";

    if (parseInt(result.weather[0].hourly[0].chanceofsunshine)>50){
     const img = document.createElement("img")
     img.setAttribute("src", "./assets/icons8-summer.gif");
     img.setAttribute("alt", "sun")
     article.prepend(img)
    }

    if (parseInt(result.weather[0].hourly[0].chanceofrain)>50){
        const img = document.createElement("img")
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain")
        article.prepend(img)
       }
    
       if (parseInt(result.weather[0].hourly[0].chanceofsnow)>50){
        const img = document.createElement("img")
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow")
        article.prepend(img)
       }
}


function threeDaysForecast(result) {

    const forecast = document.querySelectorAll("aside article");
    
    today.innerHTML = "Today";
    forecast[0].append(today)


    tomorrow.innerHTML = "Tomorrow";
    forecast[1].append(tomorrow)


    afterTomorrow.innerHTML = "Day After Tomorrow";
    forecast[2].append(afterTomorrow);



    for (let i = 0; i < forecast.length; i++) {
        const averageTemp = document.createElement("p");
        const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");


        averageTemp.innerHTML = "Average Temperature: " + result.weather[i].avgtempF + "°F";
        maxTemp.innerHTML = "Max Temperature: " + result.weather[i].maxtempF + "°F";
        minTemp.innerHTML = "Min Temperature: " + result.weather[i].mintempF + "°F";

        forecast[i].append(averageTemp)
        forecast[i].append(maxTemp)
        forecast[i].append(minTemp)
    }
    
    document.getElementById("one").style.border = "3px solid white";
    document.getElementById("two").style.border = "3px solid white";
    document.getElementById("three").style.border = "3px solid white";
}


function previousSearches(result, location) {

    if (document.querySelector(".remove")) {
        document.querySelector(".remove").remove();
    }

    const a = document.createElement("a");
    const p = document.createElement("p");

    const li = document.createElement("li");
    document.querySelector("ul").append(li);

    li.append(p);

    const listOfAs = document.querySelectorAll("li p a")
    console.log(listOfAs)

    a.setAttribute("href", "#");
    a.innerHTML = result.nearest_area[0].areaName[0].value;
    p.innerHTML = " - " + result.current_condition[0].FeelsLikeF + "°F";

    p.prepend(a);

    for (let i = 0; i < listOfAs.length; i++) {

        if (listOfAs[i].innerHTML === result.nearest_area[0].areaName[0].value) {
            li.remove()
        }
    }

}







