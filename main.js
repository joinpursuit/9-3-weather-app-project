const form = document.querySelector('form')
const main = document.querySelector('main')
const mainArticle = document.querySelector('main article')
const aside = document.querySelector('.forecast')
const today = document.querySelector('.today')
const tomorrow = document.querySelector('.tomorrow')
const dayAfter = document.querySelector('.dayAfter')
const search = document.querySelector('.searches')
const preSearches = document.querySelector('.preSearches')

form.addEventListener('submit', (event) => {
    
    event.preventDefault()
    
    const city = event.target['city'].value
    console.log(city)
    
    form.reset()
    
    fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        
        if (response) {
            mainArticle.innerHTML = `<h2> ${city} <h2>`
        }
        
        const picture = document.querySelector('#chance')
        if (Number(response.weather[0].hourly[0].chanceofrain) > 50){
            picture.setAttribute("src", "./assets/icons8-torrential-rain.gif")
            picture.setAttribute("alt", "rain")
        } 
        if (Number(response.weather[0].hourly[0].chanceofsunshine) > 50){
            picture.setAttribute("src", "./assets/icons8-summer.gif")
            picture.setAttribute("alt", "sun")
        } else if (Number(response.weather[0].hourly[0].chanceofsnow) > 50){
            picture.setAttribute("src", "./assets/icons8-light-snow.gif")
            picture.setAttribute("alt", "snow")
        }

        const area = document.createElement('p')
        area.innerHTML =`Nearest Area: ${response.nearest_area[0].areaName[0].value}` 
        search.append(area)
        

        const region = document.createElement('p')
        region.innerHTML =`Region: ${response.nearest_area[0].region[0].value}` 
        search.append(region)
        
        const country = document.createElement('p')
        country.innerHTML =`Country: ${response.nearest_area[0].country[0].value}`
        search.append(country)
        
        let current = response.current_condition[0].FeelsLikeF

        const sunshine = document.createElement('p')
        sunshine.innerHTML =`Chance of Sunshine: ${response.weather[0].hourly[0].chanceofsunshine}%`
        search.append(sunshine)
        
        const rain = document.createElement('p')
        rain.innerHTML =`Chance of Rain: ${response.weather[0].hourly[0].chanceofrain}%`
        search.append(rain)
        
        const snow = document.createElement('p')
        snow.innerHTML =`Chance of Snow: ${response.weather[0].hourly[0].chanceofsnow}%`
        search.append(snow)

        const feelsLike = document.createElement('p')
        feelsLike.innerHTML =`<strong>currently:</strong> Feels Like ${current}°F` 
        
        search.append(feelsLike)
        
        
        
        const convert = document.querySelector("#conversion");
        convert.addEventListener('submit', convertTemp);
    
        function convertTemp(event) {
        event.preventDefault();
      
        const input = document.querySelector('#temp-to-convert');
        const inputVal = input.value;
      
        const celsius = document.querySelector('#to-c');
        const fahrenheit = document.querySelector('#to-f');

        const resultConvert = document.querySelector('#convertResult');

        let result;
        if (celsius.checked) {
          result = (inputVal - 32) * (5/9)
          resultConvert.textContent = `${inputVal}°F = ${result.toFixed(2)}°C`;
        } else if (fahrenheit.checked) {
          result = (inputVal * (9/5)) + 32
          resultConvert.textContent = `${inputVal}°C = ${result.toFixed(2)}°F`;
        }  
    }

        today.innerText = `Today
        Average Temperature: ${response.weather[0].avgtempF}
        Max Temperature: ${response.weather[0].maxtempF}
        Min Temperature: ${response.weather[0].mintempF}`
        aside.append(today)
        
        tomorrow.innerText = `Tomorrow
        Average Temperature: ${response.weather[1].avgtempF}
        Max Temperature: ${response.weather[1].maxtempF}
        Min Temperature: ${response.weather[1].mintempF}`
        aside.append(tomorrow)
        
        dayAfter.innerText = `Day After
        Average Temperature: ${response.weather[2].avgtempF}
        Max Temperature: ${response.weather[2].maxtempF}
        Min Temperature: ${response.weather[2].mintempF}`
        aside.append(dayAfter)
        
        console.log(feelsLike)
        
        const previousSearch = document.querySelector('previous_search')
            if (previousSearch){
                previousSearch.remove()
            }

        const li = document.createElement('li')
        const ul = document.querySelector('ul')
        ul.append(li)
        let inputA = document.createElement('a')
        
        inputA.innerHTML = `${city}`; 
        inputA.setAttribute('href', '#');
        li.textContent += `- ${current}°F`; 
        li.prepend(inputA); 
        
        
        inputA.addEventListener('click', () => {
            let location = document.createElement("h2"); 
        location.innerHTML = `<h2>${city}</h2>`;
        search.append(location) 
        })
    })    
    .catch ((err) => {
        console.log(err)
    })
})