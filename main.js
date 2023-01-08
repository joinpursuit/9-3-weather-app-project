const form = document.querySelector("#choose-a-location");

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    
    let userCity = event.target["search-bar"].value;
    weatherDisplay(userCity);
});
function addToPrevious(userInput, currentTemp) {
    let ul =document.querySelector("ul");
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
        currently.innerHTML = `<strong>Currently</strong> Feels Like ${file.current_condition[0].FeelsLikeF}F`;
        currentWeather.append(currently);

        let today = document.querySelector("article.today-weather");
        let todayText = document.createElement("h4");
        todayText.textContent = "Today";
        today.append(todayText);

        let avgToday = document.createElement("p");
        avgToday.innerHTML = ` <strong>Average Temperature:</strong> ${file.weather[0].avgtempF}F`;
        today.append(avgToday);

        let maxToday = document.createElement("p");
        maxToday.innerHTML = `<strong> Max Temperature:</strong> ${file.weather[0].maxtempF}F`;
        today.append(maxToday);

        let minToday = document.createElement("p");
        minToday.innerHTML = `<strong> Min Temperature:</strong> ${file.weather[0].mintempF}F`;
        today.append(minToday);

        let tommorrow = document.querySelector(".tommorrow-weather");
        let tommorrowText = document.createElement("h4");
        tommorrowText.textContent = "Tommorrow";
        tommorrow.append(tommorrowText);

        let avgTommorrow = document.createElement("p");
        avgTommorrow.innerHTML = ` <strong>Average Temperature</strong> ${file.weather[1].avgtempF}F`;
        tommorrow.append(avgTommorrow);

        let maxTommorrow = document.createElement("p");
        maxTommorrow.innerHTML = ` <strong> Max Temperature </strong> ${file.weather[1].maxtempF}F`;
        tommorrow.append(maxTommorrow);

        let minTommorrow = document.createElement("p");
        minTommorrow.innerHTML = ` <strong> Min Temperature </strong> ${file.weather[1].mintempF}F`;
        tommorrow.append(minTommorrow);
        
        let dayAfterTommorrow = document.querySelector(".day-after-tommorrow-weather");
        let dayAfterTommorrowText = document.createElement("h4");
        dayAfterTommorrowText.textContent="Day After Tommorrow";
        dayAfterTommorrow.append(dayAfterTommorrowText);

        let avgDayAfterTommorrow = document.createElement("p");
        avgDayAfterTommorrow.innerHTML = ` <strong> Average Temperature: </strong> ${file.weather[2].avgtempF}F`;
        dayAfterTommorrow.append(avgDayAfterTommorrow);

        let maxDayAfterTommorrow = document.createElement("p");
        maxDayAfterTommorrow.innerHTML = ` <strong> Max Temperature: </strong> ${file.weather[2].maxtempF}F`;
        dayAfterTommorrow.append(maxDayAfterTommorrow);

        let minDayAfterTommorrow = document.createElement("p");
        minDayAfterTommorrow.innerHTML = ` <strong>Min Temperature: </strong> ${file.weather[2].mintempF}F`;
        dayAfterTommorrow.append(minDayAfterTommorrow);


        let chanceofsunshine = document.createElement("p");
        chanceofsunshine.innerHTML = ` <strong>Chance of Sunshine</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
        currentWeather.append(chanceofsunshine);

        let chanceofrain = document.createElement("p");
        chanceofrain.innerHTML = ` <strong>Chance of Rain</strong> ${file.weather[0].hourly[0].chanceofrain}`;
        currentWeather.append(chanceofrain);

        let chanceofsnow = document.createElement("p");
        chanceofsnow.innerHTML = ` <strong>Chance of Snow</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
        currentWeather.append(chanceofsnow);
    

    })
}