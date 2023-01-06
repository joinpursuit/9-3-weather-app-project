// v-- All variables need to pull the desired information
const mainInfo = document.querySelector(".main_info") //pulls from main in HTML
const previousInfo = [] //array to place previous search in
const newUL = document.querySelector(".new_li") //pulls the ul in HTML

function celToFar(degree) {
    let F = (degree * 9) / 5 + 32
return F
}
function farToCel(degree) {
    let C = ((degree - 32) * 5) / 9
   return C
}


// v--- function to iterate through and return desired previous search information
function addToPrevious(cityName, temp) {
    const addedLI = document.createElement("li")
    addedLI.innerHTML = `<a href="javascript: fetchFoundCity('` + cityName + `')">` + cityName + '  ' + temp + `F</a>`
    if (!previousInfo.some(ele => ele === cityName)) {
        newUL.append(addedLI)
    }
}

// v--function to find desired location searched
function fetchFoundCity(foundCity) {

    // v-- deletes previous card  as you search new locations
    const del = document.querySelectorAll(".card")
    if (del.length > 0) {
        del[0].remove()
    }
    // v-- pulls info from th API in relation to the header form search 
    const baseURL = `https://wttr.in/${foundCity}?format=j1`
    fetch(`${baseURL}`) //grabs the API info
        .then((response) => response.json()) // <--v--promise expecting from the API
        .then((responseJSON) => {

            // v--- creates element to for previous search & sets card to desired info
            const card = document.createElement("section")
            card.setAttribute("class", "card")

            // v--- creates element to display current city name with city when searched
            const cityName = document.createElement("p")
            cityName.innerHTML = `<b>${responseJSON.nearest_area[0].areaName[0].value.toUpperCase()}<b>`
            card.append(cityName)

            // v-- creates element to display current city area with city when searched
            const cityArea = document.createElement("p")
            cityArea.textContent = `Area: ${responseJSON.nearest_area[0].areaName[0].value}`
            card.append(cityArea)

            // v--- creates element to display current region with city when searched
            const cityRegion = document.createElement("p")
            cityRegion.textContent = `Region: ${responseJSON.nearest_area[0].region[0].value}`
            card.append(cityRegion)

            // v-- creates element to display current country with city when searched
            const cityCountry = document.createElement("p")
            cityCountry.textContent = `Country: ${responseJSON.nearest_area[0].country[0].value}`
            card.append(cityCountry)

            // v-- creates element to display current city when searched
            const cityCurrently = document.createElement("p")
            cityCurrently.textContent = `Currently: Feels Like ${responseJSON.current_condition[0].FeelsLikeF} F`
            card.append(cityCurrently)

            // v-- creates elements to display chance of sunshine
            const citySunshine = document.createElement("p")
            citySunshine.textContent = `Chance of Sunshine: ${responseJSON.weather[0].hourly[0].chanceofsunshine} %`
            card.append(citySunshine)

            // v-- creates elements to display chance of rain
            const cityRain = document.createElement("p")
            cityRain.textContent = `Chance of rain: ${responseJSON.weather[0].hourly[0].chanceofrain} %`
            card.append(cityRain)

            // v-- creates elements to display chance of snow info
            const citySnow = document.createElement("p")
            citySnow.textContent = `Chance of snow: ${responseJSON.weather[0].hourly[0].chanceofsnow} %`
            card.append(citySnow)
            mainInfo.append(card)

            // v-- calls city name & temperture
            addToPrevious(responseJSON.nearest_area[0].areaName[0].value, responseJSON.current_condition[0].FeelsLikeF)

            // v-- add to the previous desired data to array
            previousInfo.push(responseJSON.nearest_area[0].areaName[0].value)

        })
        .catch()

}