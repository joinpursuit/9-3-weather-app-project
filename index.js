let textfield = document.querySelector("#cityInput");
let currentOutput = document.querySelector("#current");
let todayOutput = document.querySelector("#today");
let tomorrowOutput = document.querySelector("#tomorrow");
let dayAfterOutput = document.querySelector("#afterThat");
let lastSearches = [];
let lastSearchList = document.querySelector("ul.previousList");
let lastSearchSection = document.querySelector("#previousSearchesList");
let prevMessage = document.querySelector(".prevMessage");
let submitButton = document.querySelector("#locationSubmission");
document.addEventListener("submit",(e)=>{
    e.preventDefault();

    prevMessage.remove();

    const queryString = textfield.value;
    textfield.value = ""
    
    let requestString = "https://wttr.in/" + queryString + "?format=j1";
    fetch(requestString).then((response) => response.json()).then((data) => {
        if (!lastSearchList.innerHTML.includes(data.nearest_area[0].areaName[0].value) ){
            lastSearchList.innerHTML += 
            `
            <li><a value ="${queryString}">${data.nearest_area[0].areaName[0].value}</a><p> ${data.current_condition[0].FeelsLikeF}°F</p></li>
            `
        }

        currentOutput.innerHTML = 
        `
        <h2>${queryString}</h2>

        <p><strong>${queryString ==  data.nearest_area[0].areaName[0].value? "": 'Nearest'} Area: </strong>${data.nearest_area[0].areaName[0].value}<p>
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

lastSearchList.addEventListener("click",(e) => {
    if (e.target.tagName == "A"){
        textfield.value = e.target.getAttribute("value");
        submitButton.click();
    }
})