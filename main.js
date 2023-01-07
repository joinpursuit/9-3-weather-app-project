const main_temp = document.querySelector(".main_temp")
const TodayTemp = document.querySelector(".Today")
const TomorrowTemp = document.querySelector(".Tomorrow")
const DayAfter = document.querySelector(".DayAfter")



const compData = []




const ul = document.querySelector(".at_li")


function CelciustoFarenheit(degree) {
    let f = (degree * 9) / 5 + 32;
   // fahrenheit.value = parseFloat(f.toFixed(2));
    return f
}

function FarenheitToCelcius(degree) {
    let c = ((degree - 32) * 5) / 9;
   // celsius.value = parseFloat(c.toFixed(2));
return c 
   // const Celcius = document.getElementById('Celcius');
  //  const fahrenheit = document.getElementById('fahrenheit');

    }

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

//The Forecasts starting with Today

    const TodayFor = document.createElement("p")
    TodayFor.setAttribute("class", "card")
    TodayFor.textContent = "TODAY"
    TodayTemp.append(TodayFor)


    const AvgFor = document.createElement("p")
    AvgFor.setAttribute("class", "card")
    AvgFor.textContent = "Average Temp " + theCity.weather[0].avgtempF +" F"
    TodayTemp.append(AvgFor)

    const MaxTe = document.createElement("p")
    MaxTe.setAttribute("class", "card")
    MaxTe.textContent = "Max Temp " + theCity.weather[0].maxtempF +" F"
    TodayTemp.append(MaxTe)

    const MinTe = document.createElement("p")
    MinTe.setAttribute("class", "card")
    MinTe.textContent = "Min Temp " + theCity.weather[0].mintempF +" F"
    TodayTemp.append(MinTe)
//Tomorrow Temp
    const TomorrowFor = document.createElement("p")
    TomorrowFor.setAttribute("class","card")
    TomorrowFor.textContent = "TOMORROW"
    TomorrowTemp.append(TomorrowFor)

    const AvegForTo = document.createElement("p")
    AvegForTo.setAttribute("class", "card")
    AvegForTo.textContent = "Average Temp " + theCity.weather[1].avgtempF +" F"
    TomorrowTemp.append(AvegForTo)

    const MaxTemTo = document.createElement("p")
    MaxTemTo.setAttribute("class", "card")
    MaxTemTo.textContent = "Max Temp " + theCity.weather[1].maxtempF +" F"
    TomorrowTemp.append(MaxTemTo)

    const MinTeTo = document.createElement("p")
    MinTeTo.setAttribute("class", "card")
    MinTeTo.textContent = "Min Temp " + theCity.weather[1].mintempF +" F"
    TomorrowTemp.append(MinTeTo)
//dayafter
    const DayAftFor = document.createElement("p")
    DayAftFor.setAttribute("class", "card")
    DayAftFor.textContent = "DAY AFTER"
    DayAfter.append(DayAftFor)

    const AvegForDayaf = document.createElement("p")
    AvegForDayaf.setAttribute("class", "card")
    AvegForDayaf.textContent = "Average Temp " + theCity.weather[2].avgtempF +" F"
    DayAfter.append(AvegForDayaf)

    const MaxTemAf = document.createElement("p")
    MaxTemAf.setAttribute("class", "card")
    MaxTemAf.textContent = "Max Temp " + theCity.weather[2].maxtempF +" F"
    DayAfter.append(MaxTemAf)

    const MinTeAf = document.createElement("p")
    MinTeAf.setAttribute("class", "card")
    MinTeAf.textContent = "Min Temp " + theCity.weather[2].mintempF +" F"
    DayAfter.append(MinTeAf)

card.append(TodayTemp, TomorrowTemp, DayAfter)

   main_temp.append(card)

addToPrevious(theCity.nearest_area[0].areaName[0].value,theCity.current_condition[0].FeelsLikeF)


compData.push(theCity.nearest_area[0].areaName[0].value)
   
})
.catch()


}