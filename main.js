const main_temp = document.querySelector(".main_temp")

const compData = []




const ul = document.querySelector(".at_li")




function addToPrevious(cityName,temp) {
    const li = document.createElement("li")
    li.innerHTML = `<a href="javascript: fetchCity('`+cityName+`')">`+ cityName +'  '+temp+ `F</a>`
       
       if (compData.some(element => element === cityName)===false)
       {
        ul.append(li)
       }
  }


function fetchCity(city) {

    const borrar = document.querySelectorAll(".card")
    if (borrar.length > 0) {
      borrar[0].remove()
    }



  const base_url = `https://wttr.in/${city}?format=j1`
  fetch(base_url).then((response) => response.json()).then((theCity) =>{
    

    const card = document.createElement("section")
    card.setAttribute("class", "card")
    const cityName= document.createElement("p")
    cityName.innerHTML = `<b>${theCity.nearest_area[0].areaName[0].value.toUpperCase()}<b>`
    card.append(cityName)

    const cityArea= document.createElement("p")
    cityArea.textContent = `Area: ${theCity.nearest_area[0].areaName[0].value}`
    card.append(cityArea)
    const cityRegion= document.createElement("p")
    cityRegion.textContent = `Region: ${theCity.nearest_area[0].region[0].value}`
    card.append(cityRegion)

    const cityCountry= document.createElement("p")
    cityCountry.textContent = `Country: ${theCity.nearest_area[0].country[0].value}`
    card.append(cityCountry)
    const cityCurrently= document.createElement("p")
    cityCurrently.textContent = `Currently: Feels Like ${theCity.current_condition[0].FeelsLikeF} F`
    card.append(cityCurrently)

    const citySunshine= document.createElement("p")
    citySunshine.textContent = `Chance of Sunshine: ${theCity.weather[0].hourly[0].chanceofsunshine} %`
    card.append(citySunshine)
    const cityRain= document.createElement("p")
    cityRain.textContent = `Chance of rain: ${theCity.weather[0].hourly[0].chanceofrain} %`
    card.append(cityRain)

    const citySnow= document.createElement("p")
    citySnow.textContent = `Chance of snow: ${theCity.weather[0].hourly[0].chanceofsnow} %`
    card.append(citySnow)
   main_temp.append(card)

addToPrevious(theCity.nearest_area[0].areaName[0].value,theCity.current_condition[0].FeelsLikeF)


compData.push(theCity.nearest_area[0].areaName[0].value)
   
})
.catch()


}