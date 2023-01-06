/* ------------------- Selectors --------------- */
const inputField = document.querySelector(".js-searchbar");
const searchBTN = document.querySelector(".js-submit-button");
const mainArticle = document.querySelector(".js-article");
const threeDay = document.querySelector(".js-three-day");
const previous = document.querySelector(".js-previous-search");
// --- Widget Selectors --- //
const widgetForm = document.querySelector(".js-convert-form");
const widgetNumber = document.getElementById("temp-to-convert");
const widgetC = document.getElementById("to-c");
const widgetF = document.getElementById("to-f");
const widgetSearchBTN = document.querySelector(".js-convert-submit");
const widgetResult = document.querySelector(".js-convert-result");

/* ---------------- Event Listeners ----------------------*/
searchBTN.addEventListener("click", showInfoOnPage);

widgetSearchBTN.addEventListener("click", convertTemp);
widgetForm.addEventListener("submit", convertTemp);

/* ------------------- Functions ----------------------*/
function convertTemp(event){
    event.preventDefault();
    if(!widgetNumber.value){
        return 
    }

    let converted;
    if(widgetC.checked){
        converted = (widgetNumber.value - 32) * (5/9);
    };
    if(widgetF.checked){
        converted = widgetNumber.value * (9/5) + 32;
    };

    widgetResult.textContent = `${Number.isInteger(converted) ? converted : converted.toFixed(2)}°`;
};

async function showInfoOnPage(event){
    event.preventDefault();

    const info = await fetchWeatherInfo(event);
    updateMain(info);
    updateThreeDay(info);

    if(event.target.matches(".js-submit-button")){
        updatePrevious(info)
    }
};

function updateMain(info){
    mainArticle.innerHTML = "";

    addChanceOfIcon(info);
    const heading =  document.createElement("h2");
    heading.textContent = info.search;
    mainArticle.append(heading);
    
    createMainCard(info);
};

function addChanceOfIcon(info){
    const hourly = info.weather[0].hourly[0];

    const data = {
        "Chance of Sunshine": hourly.chanceofsunshine,
        "Chance of Rain": hourly.chanceofrain,
        "Chance of Snow": hourly.chanceofsnow
    }

    const chanceObj = Object.keys(data).find((key) =>data[key] > 50);

    if(!chanceObj){
        return
    }

    const alt = chanceObj.includes("Rain") ? "rain" : chanceObj.includes("Sunshine") ? "sun" : "snow" ;
    const src = "./assets/icons8-".concat(alt == "rain" ? "torrential-rain.gif": alt == "sun" ? "summer.gif": "light-snow.gif");

    const img = document.createElement("img");
    img.setAttribute("alt", alt);
    img.setAttribute("src", src);

    mainArticle.append(img);
};

function createMainCard(info){
    const nearest = info.nearest_area[0];
    const hourly = info.weather[0].hourly[0];

    const relevantInfo = {
        "Area": info.nearest_area[0].areaName[0].value,
        "Region": nearest.region[0].value,
        "Country": nearest.country[0].value,
        "Currently": info.current_condition[0].FeelsLikeF,
        "Chance of Sunshine": hourly.chanceofsunshine,
        "Chance of Rain": hourly.chanceofrain,
        "Chance of Snow": hourly.chanceofsnow
    }

    Object.keys(relevantInfo).forEach((key) => {
        const createdLine =  document.createElement("p");
        const keyInfo = key == "Currently"
            ? `Feels like ${relevantInfo[key]}° F` 
            : key.includes("Chance of") 
                ? `${relevantInfo[key]}%`
                : relevantInfo[key];

        const keyWithErrorHandling = key !== "Area"
            ? key 
            : info.search == relevantInfo.Area 
                ? "Area" 
                : "Nearest Area";

        createdLine.innerHTML = `<strong>${keyWithErrorHandling}:</strong> ${keyInfo} `;

        mainArticle.append(createdLine);
    })
};

function updateThreeDay(info){
    (!!threeDay.textContent) ? threeDay.innerHTML = "" : threeDay.classList.remove("hidden");
    
    info.weather.forEach((day, i) => {
        const article = document.createElement("article");
        article.setAttribute("class", "three-day-item");
        
        const heading = document.createElement("h2");
        heading.textContent = i == 0 ? "Today" : i == 1 ? "Tomorrow" : "Day After Tomorrow";
        article.append(heading);
        
        createThreeDayCard(day, article);
        
        threeDay.append(article);
    })
};

function createThreeDayCard(day, appendTo){
    const threeDayInfo = {
        "Average Temperature": day.avgtempF,
        "Max Temperature":day.maxtempF,
        "Min Temperature": day.mintempF
    }
    
    Object.keys(threeDayInfo).forEach((key) => {
        const createdLine =  document.createElement("p");
        createdLine.innerHTML = `<strong>${key}:</strong> ${threeDayInfo[key]}°`;
        
        appendTo.append(createdLine);
    })
};

function updatePrevious(info){
    if(!!document.querySelector(".js-previous-p")){
        document.querySelector(".js-previous-p").remove();
    }

    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${info.search}</a> - ${info.current_condition[0].FeelsLikeF}°`;
    li.addEventListener("click", showInfoOnPage);
    previous.append(li);
};

async function fetchWeatherInfo(event){
    const baseURL = "https:wttr.in/";
    const search = event.target.matches(".js-submit-button") ? inputField.value : event.target.textContent;
    const endpoint= "?format=j1";
    
    const info = await fetch(baseURL+search+endpoint);

    const json = await info.json();

    inputField.value = "";

    return {search, ...json};
};