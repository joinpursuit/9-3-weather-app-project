const mainInfo = document.querySelector(".main_info")
const previousInfo = []
const newUL = document.querySelector(".new_li")


function addToPrevious(cityName, temp) {
    const addedLI = document.createElement("li")
    addedLI.innerHTML = `<a href="javascript: fetchFoundCity('` + cityName + `')">` + cityName + '  ' + temp + `F</a>`
    if (!previousInfo.some(ele => ele === cityName)) {
        newUL.append(addedLI)
    }
}



// v-- this pulls info from th API in relation to the header form search 
function fetchFoundCity(foundCity) {


    const del = document.querySelectorAll(".card")
    if (del.length > 0) {
        del[0].remove()
    }

    const baseURL = `https://wttr.in/${foundCity}?format=j1`
    fetch(`${baseURL}`)
        .then((response) => response.json())
        .then((responseJSON) => {

            const card = document.createElement("section")
            card.setAttribute("class", "card")

            const cityName = document.createElement("p")
            cityName.innerHTML = `<b>${responseJSON.nearest_area[0].areaName[0].value.toUpperCase()}<b>`
            card.append(cityName)

            const cityArea = document.createElement("p")
            cityArea.textContent = `Area: ${responseJSON.nearest_area[0].areaName[0].value}`
            card.append(cityArea)

            const cityRegion = document.createElement("p")
            cityRegion.textContent = `Region: ${responseJSON.nearest_area[0].region[0].value}`
            card.append(cityRegion)

            const cityCountry = document.createElement("p")
            cityCountry.textContent = `Country: ${responseJSON.nearest_area[0].country[0].value}`
            card.append(cityCountry)

            const cityCurrently = document.createElement("p")
            cityCurrently.textContent = `Currently: Feels Like ${responseJSON.current_condition[0].FeelsLikeF} F`
            card.append(cityCurrently)

            const citySunshine = document.createElement("p")
            citySunshine.textContent = `Chance of Sunshine: ${responseJSON.weather[0].hourly[0].chanceofsunshine} %`
            card.append(citySunshine)

            const cityRain = document.createElement("p")
            cityRain.textContent = `Chance of rain: ${responseJSON.weather[0].hourly[0].chanceofrain} %`
            card.append(cityRain)

            const citySnow = document.createElement("p")
            citySnow.textContent = `Chance of snow: ${responseJSON.weather[0].hourly[0].chanceofsnow} %`
            card.append(citySnow)
            mainInfo.append(card)

            // call city name & temperture
            addToPrevious(responseJSON.nearest_area[0].areaName[0].value, responseJSON.current_condition[0].FeelsLikeF)

            // add to the data array
            previousInfo.push(responseJSON.nearest_area[0].areaName[0].value)

        })
        .catch()

}