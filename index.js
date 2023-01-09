let textfield = document.querySelector("#cityInput");
let tempfield = document.querySelector("#temp-to-convert");
let currentOutput = document.querySelector("#current");
let todayOutput = document.querySelector("#today");
let tomorrowOutput = document.querySelector("#tomorrow");
let dayAfterOutput = document.querySelector("#afterThat");
let lastSearchList = document.querySelector("ul.previousList");
let lastSearchSection = document.querySelector("#previousSearchesList");
let prevMessage = document.querySelector(".prevMessage");
let submitButton = document.querySelector("#locationSubmission");
let icon = document.querySelector("#icon");
let conversionType = document.querySelector("#to-f");
let conversionResult = document.querySelector("#temp");
document.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.getAttribute("id") == "weatherForm") {
        prevMessage.remove();

        const queryString = textfield.value;
        textfield.value = ""

        let requestString = "https://wttr.in/" + queryString + "?format=j1";
        fetch(requestString).then((response) => response.json()).then((data) => {
            if (!lastSearchList.innerHTML.includes(data.nearest_area[0].areaName[0].value)) {
                lastSearchList.innerHTML +=
                    `
            <li><a value ="${queryString}">${data.nearest_area[0].areaName[0].value}</a><p> ${data.current_condition[0].FeelsLikeF}°F</p></li>
            `
            }
            if (data.weather[0].hourly[0].chanceofsunshine > 50) {
                icon.style.display = "grid";
                icon.setAttribute("src", "./assets/icons8-summer.gif");
                icon.setAttribute("alt", "sun");
            }
            else if (data.weather[0].hourly[0].chanceofrain > 50) {
                icon.style.display = "grid";
                icon.setAttribute("src", "./assets/icons8-torrential-rain.gif");
                icon.setAttribute("alt", "rain");
            }
            else if (data.weather[0].hourly[0].chanceofsnow > 50) {
                icon.style.display = "grid";
                icon.setAttribute("src", "./assets/icons8-light-snow.gif");
                icon.setAttribute("alt", "snow");
            }
            else {
                icon.style.display = "none";
            }
            currentOutput.innerHTML =

                `
        <h2>${queryString}</h2>

        <p><strong>${queryString == data.nearest_area[0].areaName[0].value ? "" : 'Nearest'} Area: </strong>${data.nearest_area[0].areaName[0].value}<p>
        <p><strong>Region: </strong>${data.nearest_area[0].region[0].value}<p>
        <p><strong>Country: </strong>${data.nearest_area[0].country[0].value}<p>
        <p><strong>Currently: </strong> Feels Like ${data.current_condition[0].FeelsLikeF}°F<p>
        <p><strong>Chance of Sunshine:</strong> ${data.weather[0].hourly[0].chanceofsunshine}</p>
        <p><strong>Chance of Rain:</strong> ${data.weather[0].hourly[0].chanceofrain}</p>
        <p><strong>Chance of Snow:</strong> ${data.weather[0].hourly[0].chanceofsnow}</p>
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
    }
    else{
        const convertValue = tempfield.value;
        tempfield.value = ""
        if (conversionType.checked){
            conversionResult.innerHTML = `${(convertValue * 9/5 + 32).toFixed(2)}`
        }
        else{
            conversionResult.innerHTML = `${((convertValue - 32)*5/9).toFixed(2)}`
        }
    }
});

lastSearchList.addEventListener("click", (e) => {
    if (e.target.tagName == "A") {
        textfield.value = e.target.getAttribute("value");
        submitButton.click();
    }
})