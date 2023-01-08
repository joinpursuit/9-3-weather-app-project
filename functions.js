
const main_info = document.querySelector(".main-info")
const today = document.querySelector(".today")
const tomorrow = document.querySelector(".tomorrow")
const afterto = document.querySelector(".dayaftertom")


const previousData = []

const ul = document.querySelector('.previousUl')



function CelciustoFarenheit(degree) {
  return (degree * 9) / 5 + 32;
  
}
function FarenheitToCelcius(degree) {
  return ((degree - 32) * 5) / 9;
}


function addToPrevious(cityName,temp) {
  const li = document.createElement("li")
  li.innerHTML = `<a href="javascript: fetchCity('`+cityName+`')">`+ cityName +'  '+temp+ `F</a>`

   if (!previousData.some(x => x.city === cityName))
    {
     ul.append(li)
    }   
}




function fetchCity(city) {

  let previousDataCity = {
    city: String,
    current_condition: [],
    nearest_area: [],
    weather: [],
  }

      const borrar = document.querySelectorAll(".card")
      if (borrar.length > 0) {
        for (let i=0; i < borrar.length; i++) {

           borrar[i].remove()
        }
      }

     
   
    const base_url = `https://wttr.in/${city}?format=j1`
    fetch(base_url).then((response) => response.json()).then((theCity) =>{
        
     
        
        const card = document.createElement("section")
        card.setAttribute("class", "card")


        if((theCity.current_condition[0].weatherDesc[0].value === "Sunny") || (Number(theCity.weather[0].hourly[0].chanceofsunshine) > 50)) {
          const iconSunny = document.createElement("img")
          iconSunny.setAttribute("src","./assets/icons8-summer.gif")
          iconSunny.setAttribute("alt","sun")
          card.append(iconSunny)
        }
        if((theCity.current_condition[0].weatherDesc[0].value === "Torrential-rain") || (Number(theCity.weather[0].hourly[0].chanceofrain) > 50)) {
          const iconTRain = document.createElement("img")
          iconTRain.setAttribute("src","./assets/icons8-torrential-rain.gif")
          iconTRain.setAttribute("alt","rain")
          card.append(iconTRain)
        }
        if((theCity.current_condition[0].weatherDesc[0].value === "Light snow") || (Number(theCity.weather[0].hourly[0].chanceofsnow) > 50)) {
          const iconLightSnow = document.createElement("img")
          iconLightSnow.setAttribute("src","./assets/icons8-light-snow.gif")
          iconLightSnow.setAttribute("alt","snow")
          card.append(iconLightSnow)
        }


        const cityName= document.createElement("h2")
        cityName.textContent = `${theCity.nearest_area[0].areaName[0].value.toUpperCase()}`
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
        cityCurrently.textContent = `Currently: Feels Like ${theCity.current_condition[0].FeelsLikeF}° F`
        card.append(cityCurrently)

        const citySunshine= document.createElement("p")
        citySunshine.textContent = `Chance of Sunshine: ${theCity.weather[0].hourly[0].chanceofsunshine} %`
        card.append(citySunshine)

        const cityRain= document.createElement("p")
        cityRain.textContent = `Chance of Rain  ${theCity.weather[0].hourly[0].chanceofrain} %`
        card.append(cityRain)

        const citySnow= document.createElement("p")
        citySnow.textContent = `Chance of Snow ${theCity.weather[0].hourly[0].chanceofsnow} %`
        card.append(citySnow)


           // insert Today Forecast
             const labeltoday = document.createElement('p')
             labeltoday.setAttribute("class", "card")
             labeltoday.textContent = "TODAY"
             today.append(labeltoday)

             const labelaver = document.createElement('p')
             labelaver.setAttribute("class", "card")
             labelaver.textContent = "Average Temp " +  theCity.weather[0].avgtempF +"° F"
             today.append(labelaver)

             const labelmaxtoday = document.createElement('p')
             labelmaxtoday.setAttribute("class", "card")
             labelmaxtoday.textContent = "Max Temp " +  theCity.weather[0].maxtempF +"° F"
             today.append(labelmaxtoday)

             const labelmintoday = document.createElement('p')
             labelmintoday.setAttribute("class", "card")
             labelmintoday.textContent = "Min Temp " +  theCity.weather[0].mintempF+"° F"
             today.append(labelmintoday)
          
             
  
          
          
          //    // insert tomorrow forecast
             const labeltom = document.createElement('p')
             labeltom.setAttribute("class", "card")
             labeltom.textContent = "TOMORROW"
             tomorrow.append(labeltom)

             const labelavertom = document.createElement('p')
             labelavertom.setAttribute("class", "card")
             labelavertom.textContent = "Average Temp " +  theCity.weather[1].avgtempF +"° F"
             tomorrow.append(labelavertom)

             const labelmaxtom = document.createElement('p')
             labelmaxtom.setAttribute("class", "card")
             labelmaxtom.textContent = "Max Temp " +  theCity.weather[1].maxtempF +"° F"
             tomorrow.append(labelmaxtom)

             const labelmintom = document.createElement('p')
             labelmintom.setAttribute("class", "card")
             labelmintom.textContent = "Min Temp " +  theCity.weather[1].mintempF+"° F"
             tomorrow.append(labelmintom)




          //  // insert day after forecast 
             const labeldayaf = document.createElement('p')
             labeldayaf.setAttribute("class", "card")
             labeldayaf.textContent = "After Tomorrow"
             afterto.append(labeldayaf)

             const labelaverdaf = document.createElement('p')
             labelaverdaf.setAttribute("class", "card")
             labelaverdaf.textContent = "Average Temp " +  theCity.weather[2].avgtempF +"° F"
             afterto.append(labelaverdaf)

             const labelmaxdaf = document.createElement('p')
             labelmaxdaf.setAttribute("class", "card")
             labelmaxdaf.textContent = "Max Temp " +  theCity.weather[2].maxtempF +"°F"
             afterto.append(labelmaxdaf)

             const labelmindaf = document.createElement('p')
             labelmindaf.setAttribute("class", "card")
             labelmindaf.textContent = "Min Temp " +  theCity.weather[2].mintempF+"° F"
             afterto.append(labelmindaf)



      card.append(today, tomorrow, afterto)


       main_info.append(card)
       //console.log(main_info)

      // call 
       addToPrevious(theCity.nearest_area[0].areaName[0].value,theCity.current_condition[0].FeelsLikeF)

       // add to the data array
       previousDataCity.city = theCity.nearest_area[0].areaName[0].value;
       previousDataCity.current_condition = theCity.current_condition;
       previousDataCity.nearest_area = theCity.nearest_area;
       previousDataCity.weather = theCity.weather;
       
       previousData.push(previousDataCity)

       
    }).catch( )
   
  }


 