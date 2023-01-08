const BASE_URL = "https://wttr.in";

const form = document.querySelector("form");
const section = document.querySelector("section")
const textInput = document.querySelector("input")
const main = document.querySelector("main")
const article = document.querySelectorAll("article")
const articleOneH2 = document.createElement("h2")
articleOneH2.setAttribute("class", "today")
articleOneH2.innerText = "Today"
const articleTwoH2 = document.createElement("h2")
articleTwoH2.setAttribute("class", "tomorrow")
articleTwoH2.innerText = "Tomorrow"
const articleThreeH2 = document.createElement("h2")
articleThreeH2.setAttribute("class", "dayAfterTomorrow")
articleThreeH2.innerText = "Day After Tomorrow"
const mainArticles = document.querySelectorAll("article")
mainArticles[1].prepend(articleOneH2)
mainArticles[2].prepend(articleTwoH2)
mainArticles[3].append(articleThreeH2)

const event = form.addEventListener("submit", (event) => {
    event.preventDefault()
    const city = textInput.value;
    const h2 =document.createElement("h2")
    const area = city.areaName
        h2.append(area)
    // const region = city.region
    // const country  = city.country
          // const feelsLikeC = city.current_condition.FeelsLikeC
    // const country = city.nearest_area
    // main.append(city)
    main.append(`Area: ${city}`)
    // main.append(`Region ${region}`)
    // main.append(`Country ${country}`)
    // main.append(FeelsLikeF) 
    // main.append(FeelsLikeC)
   
    
    
    getWeatherByCity(city)
   

    form.reset();
  
})

function getWeatherByCity(city) {
    
    fetch(`${BASE_URL}/${city}?format=j1`).then((response)=> 
        response.json())
    
   
 
     .then((city) => {
        // const area = city.areaName
        const h2 =document.createElement("h2")
        h2.innerText = `${city.areaName}`
        // const area = city.areaName
        // h2.append(area)
        // const area = city.areaName
 
        const feelsLike = city.current_condition[0].FeelsLikeF;
        const span = document.createElement("span");
        span.innerText = ` Currently: Feels Like ${feelsLike}F`
       


        // main.append(`Area: ${city}`)
        main.append(span)
   
        
        // h2.append(` Currently: ${feelsLike}F`)
       
        // main.append(` Currently: ${feelsLike}F`)
        // console.log(city.current_condition[0].FeelsLikeF)
    })//the result
    .catch((error) => {
        console.log(error)
    // })// the error
    
    })
}
//    getWeatherByCity()