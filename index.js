//Selectors
const inputField = document.querySelector(".js-searchbar");
const searchbtn = document.querySelector(".js-submit-button");
const mainArticle = document.querySelector(".js-article");
const threeDay = document.querySelector(".js-three-day");
const previous = document.querySelector(".js-previous-search");
const noPreviousSearches = document.querySelector(".js-previous-p");

//Event Listeners
searchbtn.addEventListener("click", showInfo)

//Functions
async function showInfo(event){
    event.preventDefault()

    const info = await fetchWeatherInfo(event)
    updateMain(info);
    updateThreeDay(info);

    if(event.target.matches(".js-submit-button")){
        updatePrevious(info)
    }
}

function updatePrevious(info){
    noPreviousSearches.remove();

    let li = document.createElement("li");
    li.innerHTML = `<a href="#">${info.search}</a> - ${info.current_condition[0].FeelsLikeF}°`;
    li.addEventListener("click", showInfo);
    previous.append(li);
}

function updateMain(info){
    mainArticle.innerHTML = "";

    const heading =  document.createElement("h3");
    heading.textContent = info.search;
    mainArticle.append(heading)

    const relevantInfo = {
        "Area": info.nearest_area[0].areaName[0].value,
        "Region": info.nearest_area[0].region[0].value,
        "Country": info.nearest_area[0].country[0].value,
        "Currently": info.current_condition[0].FeelsLikeF
    }
    
    createCard(relevantInfo, mainArticle)
}

function updateThreeDay(info){
    if(!!threeDay.textContent){
        threeDay.innerHTML = ""
    }

    threeDay.classList.remove("hidden");

    info.weather.forEach((day, i) => {
        const div = document.createElement("div")
        div.setAttribute("class", "three-day-item")

        const heading = document.createElement("h3");
        heading.textContent = i == 0 ? "Today" : i == 1 ? "Tomorrow" : "Day After Tomorrow";
        div.append(heading)

        const threeDayInfo = {
            "Average Temperature": day.avgtempF,
            "Max Temperature":day.maxtempF,
            "Min Temperature": day.mintempF
        }

        createCard(threeDayInfo, div)

        threeDay.append(div)

    })
}

function createCard(relevantInfo, appenTo){
    Object.keys(relevantInfo).forEach((key) => {
        const createdLine =  document.createElement("p");
        const keyInfo = key !== "Currently" ? relevantInfo[key] : `Feels like ${relevantInfo[key]}° F`;
        const unboldedInfo = relevantInfo.hasOwnProperty("Average Temperature") ? `${relevantInfo[key]}°` : keyInfo

        createdLine.innerHTML = `<strong>${key}:</strong> ${unboldedInfo}`

        appenTo.append(createdLine)
    })
}

async function fetchWeatherInfo(event){
    const baseURL = "https:wttr.in/"
    const search = event.target.matches(".js-submit-button") ? inputField.value: event.target.textContent;
    const endpoint= "?format=j1"

    const info = await fetch(baseURL+search+endpoint)

    const json = await info.json()

    inputField.value = ""

    return {search, ...json}
}