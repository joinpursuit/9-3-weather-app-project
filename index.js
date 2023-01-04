let textfield = document.querySelector("#cityInput");
let currentOutput = document.querySelector("#current");
let todayOutput = document.querySelector("#today");
let tomorrowOutput = document.querySelector("#tomorrow");
let dayAfterOutput = document.querySelector("#afterThat")
document.addEventListener("submit",(e)=>{
    e.preventDefault();
    let requestString = "https://wttr.in/" + textfield.value + "?format=j1";
    fetch(requestString).then((response) => response.json()).then((data) => {
        console.log(data)
        currentOutput.innerHTML = 
        `
        <h2>${data.nearest_area[0].areaName[0].value}</h2>
        <p><strong>Area: </strong>${data.nearest_area[0].areaName[0].value}<p>
        <p><strong>Region: </strong>${data.nearest_area[0].region[0].value}<p>
        <p><strong>Country: </strong>${data.nearest_area[0].country[0].value}<p>
        <p><strong>Currently: </strong> Feels Like ${data.current_condition[0].FeelsLikeF}°<p>
        `

        todayOutput.innerHTML = 
        `
        <h3>Today</h3>
        <p><strong>Average Temperature: </strong>${data.weather[0].avgtempF}</p>
        <p><strong>Max Temperature: </strong>${data.weather[0].maxtempF}</p>
        <p><strong>Min Temperature: </strong>${data.weather[0].mintempF}</p>
        `
        
        tomorrowOutput.innerHTML = 
        `
        <h3>Tomorrow</h3>
        <p><strong>Average Temperature: </strong>${data.weather[1].avgtempF}</p>
        <p><strong>Max Temperature: </strong>${data.weather[1].maxtempF}</p>
        <p><strong>Min Temperature: </strong>${data.weather[1].mintempF}</p>
        `

        dayAfterOutput.innerHTML = 
        `
        <h3>Day After Tomorrow</h3>
        <p><strong>Average Temperature: </strong>${data.weather[2].avgtempF}</p>
        <p><strong>Max Temperature: </strong>${data.weather[2].maxtempF}</p>
        <p><strong>Min Temperature: </strong>${data.weather[2].mintempF}</p>
        `
    })
});