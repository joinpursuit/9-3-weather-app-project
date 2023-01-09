const form = document.querySelector("#choose-a-location");

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    
    let userCity = event.target["search-bar"].value;
    weatherDisplay(userCity);
});
function addToPreviousSearch(userInput, currentTemp) {
    let ul = document.querySelector("ul");
}

function weatherDisplay(userInput) {
    
    fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((res) => res.json())
    .then((file) => {

        const currentWeather =document.querySelector("article.current-weather");
        let city = document.createElement("h2");
        city.textContent = userInput;
        city.textContent = userInput;
        currentWeather.append(city);

        let area = document.createElement("p");
        area.innerHTML = file.nearest_area[0].areaName[0].value.toLowerCase() === userInput.toLowerCase()
        ? `<strong>area:</strong>${file.nearest_area[0].areaName[0].value}`
        : `<strong>Nearest Area:</strong>${file.nearest_area[0].areaName[0].value}`;

        currentWeather.append(area);

        let region = document.createElement("p");
        region.innerHTML = `<strong>Region:</strong> ${file.nearest_area[0].region[0].value}`;
        currentWeather.append(region);

        let country = document.createElement("p");
        country.innerHTML = `<strong>Country</strong> ${file.nearest_area[0].country[0].value}`;
        currentWeather.append(country);

        let currently = document.createElement("p");
        currently.innerHTML = `<strong>Currently:</strong> Feels Like ${file.current_condition[0].FeelsLikeF}°F`;
        currentWeather.append(currently);

        let today = document.querySelector("article.today-weather");
        let todayText = document.createElement("h4");
        todayText.textContent = "Today";
        today.append(todayText);

        let avgToday = document.createElement("p");
        avgToday.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[0].avgtempF}°F`;
        today.append(avgToday);

        let maxToday = document.createElement("p");
        maxToday.innerHTML = `<strong> Max Temperature:</strong> ${file.weather[0].maxtempF}°F`;
        today.append(maxToday);

        let minToday = document.createElement("p");
        minToday.innerHTML = `<strong> Min Temperature:</strong> ${file.weather[0].mintempF}°F`;
        today.append(minToday);

        let tommorrow = document.querySelector(".tommorrow-weather");
        let tommorrowText = document.createElement("h4");
        tommorrowText.textContent = "Tommorrow";
        tommorrow.append(tommorrowText);

        let avgTommorrow = document.createElement("p");
        avgTommorrow.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[1].avgtempF}°F`;
        tommorrow.append(avgTommorrow);

        let maxTommorrow = document.createElement("p");
        maxTommorrow.innerHTML = `<strong> Max Temperature </strong> ${file.weather[1].maxtempF}°F`;
        tommorrow.append(maxTommorrow);

        let minTommorrow = document.createElement("p");
        minTommorrow.innerHTML = `<strong> Min Temperature: </strong> ${file.weather[1].mintempF}°F`;
        tommorrow.append(minTommorrow);
        
        let dayAfterTommorrow = document.querySelector(".day-after-tommorrow-weather");
        let dayAfterTommorrowText = document.createElement("h4");
        dayAfterTommorrowText.textContent="Day After Tommorrow";
        dayAfterTommorrow.append(dayAfterTommorrowText);

        let avgDayAfterTommorrow = document.createElement("p");
        avgDayAfterTommorrow.innerHTML = `<strong> Average Temperature: </strong> ${file.weather[2].avgtempF}°F`;
        dayAfterTommorrow.append(avgDayAfterTommorrow);

        let maxDayAfterTommorrow = document.createElement("p");
        maxDayAfterTommorrow.innerHTML = `<strong> Max Temperature: </strong> ${file.weather[2].maxtempF}°F`;
        dayAfterTommorrow.append(maxDayAfterTommorrow);

        let minDayAfterTommorrow = document.createElement("p");
        minDayAfterTommorrow.innerHTML = `<strong>Min Temperature: </strong> ${file.weather[2].mintempF}°F`;
        dayAfterTommorrow.append(minDayAfterTommorrow);


        let chanceOfSunshine = document.createElement("p");
        chanceOfSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
        currentWeather.append(chanceOfSunshine);

        let chanceOfRain = document.createElement("p");
        chanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${file.weather[0].hourly[0].chanceofrain}`;
        currentWeather.append(chanceOfRain);

        let chanceOfSnow = document.createElement("p");
        chanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
        currentWeather.append(chanceOfSnow);

        let img = document.createElement("img");
        if(file.weather[0].hourly[0].chanceofsunshine > 50) {
            img.setAttribute("alt", "sun");
            img.setAttribute("src", "./assets/icons8-summer.gif");
        }else if (file.weather[0].hourly[0].chanceofrain > 50) {
            img.setAttribute("alt", "rain");
            img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        }else if (file.weather[0].hourly[0].chanceofsnow > 50) {
            img.setAttribute("alt", "snow");
            img.setAttribute("src", "./assets/icons8-light-snow.gif");
        }
        currentWeather.prepend(img);
        // if(shouldIAdd){
        //             addToPrevious(userInput, file.current_condition[0].FeelsLikeF)
              
            
        
    
    // const add_prev_search = (file, location) => {
    //     let previousSearch = document.querySelector("aside.weather-history ul");
    //     let searchItems = document.querySelectorAll("ul li a");
        
    //     let listItem = document.createElement("li");
    //     listItem.innerHTML = `<a href="#">${location}</a> - ${file.current_condition[0].FeelsLikeF}°F`;
    //     previousSearch.append(listItem);

    //     listItem.addEventListener("click", (event) => {
    //         event.preventDefault();
    //         fetch(`https://wttr.in/${location}?format=j1`)
    //          .then((res) => res.json())
    //          .then((json) => {
    //             clear_defaults()
    //                 add_weather(json, location)
    //                 let location = document.querySelector("input.search-bar").value;
    //                 if(!location) {
    //                     window.reload();

                    // }
                

                   let result = querySelector("h4.converted-temp");
                    let convertC = document.getElementById("to-c");
                    let convertF = document.getElementById("to-f");
                    let originalNum = document.querySelector("#temp-to-covert");
          

                    if(convertC.checked) {
                        result.textContent = `${((originalNum.value - 32) / 1.8).toFixed(2)}`;
                    }else if (convertF.checked) {
                        result.textContent = `${((originalNum.value * 1.8 + 32).toFixed(2))}`
                    }
                })
        
            //  .catch((error) => console.log(error))
             

        // const tempConversion = document.querySelector("aside.temperature-conversion form");
        // tempConversion.addEventListener("submit", (event) => {
        //     event.preventDefault();
            
            }
           
    //     });

    //     if(shouldIAdd){
    //         addToPrevious(userInput, file.current_condition[0].FeelsLikeF)
    // }   
    
    // .catch((error) => console.log(error));
        