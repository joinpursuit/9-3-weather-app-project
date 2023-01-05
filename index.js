let textfield = document.querySelector("#cityInput");
let currentOutput = document.querySelector("#current");
let todayOutput = document.querySelector("#today");
let tomorrowOutput = document.querySelector("#tomorrow");
let dayAfterOutput = document.querySelector("#afterThat");
let lastSearches = [];
let lastSearchSection = document.querySelector("previousSearchesList")
document.addEventListener("submit",(e)=>{
    e.preventDefault();
    let requestString = "https://wttr.in/" + textfield.value + "?format=j1";
    fetch(requestString).then((response) => response.json()).then((data) => {
        currentOutput.innerHTML = 
        `
        <h2>${data.nearest_area[0].areaName[0].value}</h2>
        <p><strong>Area: </strong>${data.nearest_area[0].areaName[0].value}<p>
        <p><strong>Region: </strong>${data.nearest_area[0].region[0].value}<p>
        <p><strong>Country: </strong>${data.nearest_area[0].country[0].value}<p>
        <p><strong>Currently: </strong> Feels Like ${data.current_condition[0].FeelsLikeF}°F<p>
        `

        todayOutput.innerHTML = 
        `
        <h3>Today</h3>
        <p><strong>Average Temperature: </strong>${data.weather[0].avgtempF}°F</p>
        <p><strong>Max Temperature: </strong>${data.weather[0].maxtempF}°F</p>
        <p><strong>Min Temperature: </strong>${data.weather[0].mintempF}°F</p>
        `
        
        tomorrowOutput.innerHTML = 
        `
        <h3>Tomorrow</h3>
        <p><strong>Average Temperature: </strong>${data.weather[1].avgtempF}°F</p>
        <p><strong>Max Temperature: </strong>${data.weather[1].maxtempF}°F</p>
        <p><strong>Min Temperature: </strong>${data.weather[1].mintempF}°F</p>
        `

        dayAfterOutput.innerHTML = 
        `
        <h3>Day After Tomorrow</h3>
        <p><strong>Average Temperature: </strong>${data.weather[2].avgtempF}°F</p>
        <p><strong>Max Temperature: </strong>${data.weather[2].maxtempF}°F</p>
        <p><strong>Min Temperature: </strong>${data.weather[2].mintempF}°F</p>
        `
    })
});