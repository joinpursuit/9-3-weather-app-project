//Selectors
const inputField = document.querySelector(".js-searchbar");
const searchbtn = document.querySelector(".js-submit-button");
const mainArticle = document.querySelector(".js-article")

//EventListeners
searchbtn.addEventListener("click", test)

//functions

async function test(event){
    event.preventDefault()

    const info = await fetchWeatherInfo()
    updateMain(info)

}

function updateMain(info){
    mainArticle.innerHTML = ""

    const relevantInfo = {
        Area: info.nearest_area[0].areaName[0].value,
        Region: info.nearest_area[0].region[0].value,
        Country: info.nearest_area[0].country[0].value,
        Currently: info.current_condition[0].FeelsLikeF
    }

    const heading =  document.createElement("h3");
    heading.textContent = info.search;
    mainArticle.append(heading)

    Object.keys(relevantInfo).forEach((key) => {
        let line =  document.createElement("p");
        line.innerHTML = `<strong>${key}:</strong> ${key !== "Currently" ? relevantInfo[key] : `Feels like ${relevantInfo[key]}° F`}`

        mainArticle.append(line)
    })
}

async function fetchWeatherInfo(){
    const baseURL = "https:wttr.in/"
    const search = inputField.value;
    const endpoint= "?format=j1"

    const info = await fetch(baseURL+search+endpoint)

    const json = await info.json()

    inputField.value = ""

    return {search, ...json}
}