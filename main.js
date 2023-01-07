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

        

    })
}