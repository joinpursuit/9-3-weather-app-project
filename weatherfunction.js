// v-- All variables need to pull the desired information
const mainInfo = document.querySelector(".main_info") //pulls from main in HTML
const previousInfo = [] //array to place previous search in
const newUL = document.querySelector(".new_li") //pulls the ul in HTML
const todayW = document.querySelector(".Today")
const tomorrowW = document.querySelector(".Tomorrow")
const followingDayW = document.querySelector(".FollowingDay")

// v-- covert widget function
function celToFar(degree) {
    const F = (degree * 9) / 5 + 32
    return F
}
function farToCel(degree) {
    const C = ((degree - 32) * 5) / 9
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

    // v-- deletes previous info  as you search new locations aka bascially a refresh 
    const deleteInfo = document.querySelectorAll(".card")
    if (deleteInfo.length > 0) {
        for(let i = 0; i < deleteInfo.length; i++)
        deleteInfo[i].remove()
       

    }

    // v-- pulls info from th API in relation to the header form search 
    const baseURL = `https://wttr.in/${foundCity}?format=j1`
    fetch(`${baseURL}`) //grabs the API info
        .then((response) => response.json()) // <--v--promise expecting from the API
        .then((responseJSON) => {

            // v--- creates element to for previous search & sets card to desired info
            const card = document.createElement("section")
            card.setAttribute("class", "card")

            // v-- Diff Icons for Chance %
            if((responseJSON.current_condition[0].weatherDesc[0].value === "Sunny") || (Number(responseJSON.weather[0].hourly[0].chanceofsunshine) > 50)) {
                const iconSunny = document.createElement("img")
                iconSunny.setAttribute("src","./assets/icons8-summer.gif")
                iconSunny.setAttribute("alt","sun")
                card.append(iconSunny)
               
             }
            if((responseJSON.current_condition[0].weatherDesc[0].value === "Torrential-rain") || (Number(responseJSON.weather[0].hourly[0].chanceofrain) > 50)) {
                const iconTRain = document.createElement("img")
                iconTRain.setAttribute("src","./assets/icons8-torrential-rain.gif")
                iconTRain.setAttribute("alt","rain")
                card.append(iconTRain)
            }
            if((responseJSON.current_condition[0].weatherDesc[0].value === "Light snow") || (Number(responseJSON.weather[0].hourly[0].chanceofsnow) > 50)) {
                const iconLightSnow = document.createElement("img")
                iconLightSnow.setAttribute("src","./assets/icons8-light-snow.gif")
                iconLightSnow.setAttribute("alt","snow")
                card.append(iconLightSnow)
            }




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
            // only one to pass on cypress
            const citySunshine = document.createElement("p")
            citySunshine.textContent = `Chance of Sunshine: ${responseJSON.weather[0].hourly[0].chanceofsunshine} %`
            card.append(citySunshine)

            // v-- creates elements to display chance of rain
            const cityRain = document.createElement("p")
            cityRain.textContent = `Chance of Rain: ${responseJSON.weather[0].hourly[0].chanceofrain} %`
            card.append(cityRain)

            // v-- creates elements to display chance of snow info
            const citySnow = document.createElement("p")
            citySnow.textContent = `Chance of Snow: ${responseJSON.weather[0].hourly[0].chanceofsnow} %`
            card.append(citySnow)
            mainInfo.append(card)

            // Forecast Input Info --v

            // v--Inserting Today Forecast info in
            const todayLabel = document.createElement('p')
            todayLabel.setAttribute("class", "card")
            todayLabel.textContent = "Today"
            todayW.append(todayLabel)

            // v---Insert Average Temp info for Today Forecast
            const avgLabel = document.createElement('p')
            avgLabel.setAttribute("class", "card")
            avgLabel.textContent = "Avg. Temp " + responseJSON.weather[0].avgtempF + " F"
            todayW.append(avgLabel)
            // Max Today--v
            const avgMaxLabel = document.createElement('p')
            avgMaxLabel.setAttribute("class", "card")
            avgMaxLabel.textContent = "Avg. Max Temp " + responseJSON.weather[0].maxtempF + " F"
            todayW.append(avgMaxLabel)
            // Min Today--v
            const avgMinLabel = document.createElement('p')
            avgMinLabel.setAttribute("class", "card")
            avgMinLabel.textContent = "Avg. Min Temp " + responseJSON.weather[0].mintempF + " F"
            todayW.append(avgMinLabel)

            // v-- Inserting Tomorrow Forcast info in
            const tomorrowLabel = document.createElement('p')
            tomorrowLabel.setAttribute("class", "card")
            tomorrowLabel.textContent = "Tomorrow"
            tomorrowW.append(tomorrowLabel)

            // v---Insert Average Temp info for Tomorrow Forecast
            const avgLabel2 = document.createElement('p')
            avgLabel2.setAttribute("class", "card")
            avgLabel2.textContent = "Avg. Temp " + responseJSON.weather[1].avgtempF + " F"
            tomorrowW.append(avgLabel2)
            // Max Tomorrow--v
            const avgMaxLabel2 = document.createElement('p')
            avgMaxLabel2.setAttribute("class", "card")
            avgMaxLabel2.textContent = "Avg. Max Temp " + responseJSON.weather[1].maxtempF + " F"
            tomorrowW.append(avgMaxLabel2)
            // Min Tomorrow--v
            const avgMinLabel2 = document.createElement('p')
            avgMinLabel2.setAttribute("class", "card")
            avgMinLabel2.textContent = "Avg. Min Temp " + responseJSON.weather[1].mintempF + " F"
            tomorrowW.append(avgMinLabel2)


            // v-- Inserting Following Forecast info in
            const followingDayLabel = document.createElement('p')
            followingDayLabel.setAttribute("class", "card")
            followingDayLabel.textContent = "Following Day"
            followingDayW.append(followingDayLabel)

            // v---Insert Average Temp info for Following Day Forecast
            const avgLabel3 = document.createElement('p')
            avgLabel3.setAttribute("class", "card")
            avgLabel3.textContent = "Avg. Temp " + responseJSON.weather[2].avgtempF + " F"
            followingDayW.append(avgLabel3)
            // Max Folowing Day--v
            const avgMaxLabel3 = document.createElement('p')
            avgMaxLabel3.setAttribute("class", "card")
            avgMaxLabel3.textContent = "Avg. Max Temp " + responseJSON.weather[2].maxtempF + " F"
            followingDayW.append(avgMaxLabel3)
            // Min Following Day--v
            const avgMinLabel3 = document.createElement('p')
            avgMinLabel3.setAttribute("class", "card")
            avgMinLabel3.textContent = "Avg. Min Temp " + responseJSON.weather[2].mintempF + " F"
            followingDayW.append(avgMinLabel3)

            card.append(todayW, tomorrowW, followingDayW)
            mainInfo.append(card)

            // v-- calls city name & temperture
            addToPrevious(responseJSON.nearest_area[0].areaName[0].value, responseJSON.current_condition[0].FeelsLikeF)

            // v-- add to the previous desired data to array
            previousInfo.push(responseJSON.nearest_area[0].areaName[0].value)

        })
        .catch()

}