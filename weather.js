const BASE_URL = "https://wttr.in"
const form = document.querySelector("form");
const sidebar = document.querySelector(".side-bar")
const userInput = document.querySelector("input")
const main = document.querySelector("main");
const todayArticle = document.querySelector("#one");
const tomorrowArticle = document.querySelector("#two");
const dayAfterArticle = document.querySelector("#three")
const current = document.querySelector("#current #location-info")
const heading = document.createElement("h2");
current.innerHTML = "Choose a location to view the weather."
const previousSearches = document.querySelector(".previous-searches")
const ul = document.querySelector(".previous-searches")
const getToday = document.querySelector("#today");
const getTomorrow = document.querySelector("#tomorrow");
const getDayAfter = document.querySelector("#day-after-tomorrow")

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const location = userInput.value
    
   
    // heading.textContent = label
    
    getWeatherByLocation(location);
    
    
    
    
    form.reset();
})



function getWeatherByLocation(location) {
    
    fetch(`${BASE_URL}/${location}?format=j1`)
    .then((response) => 
    
    response.json()
    
    )
    .then((location) => {
        // const heading = document.querySelector(h2);
        const p = document.createElement("p");
        p.setAttribute("class", "heading")
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");
        
        const areaName = location.nearest_area[0].areaName;
        const region = location.nearest_area[0].region;
        const country = location.nearest_area[0].country[0].value;
        const feelsLike = location.current_condition[0].FeelsLikeF;
        
        const today = location.weather[0];
        const todayAverageTemp = today.avgtempF
        const todayMaxTemp = today.maxtempF
        const todayMinTemp = today.mintempF
        const tomorrow = location.weather[1];
        const tomorrowAverageTemp = tomorrow.avgtempF;
        const tomorrowMaxTemp = tomorrow.maxtempF;
        const tomorrowMinTemp = tomorrow.mintempF;
        const dayAfter = location.weather[2];
        const dayAfterAverageTemp = dayAfter.avgtempF;
        const dayAfterMaxTemp = dayAfter.maxtempF;
        const dayAfterMinTemp = dayAfter.mintempF;
        todayArticle.append(`Average Temperature: ${todayAverageTemp}\u2109`);
        todayArticle.append(`Max Temperature: ${todayMaxTemp}\u2109`);
        todayArticle.append(`Min Temperature: ${todayMinTemp}\u2109`);
        tomorrowArticle.append(`Average Temperature: ${tomorrowAverageTemp}\u2109`);
        tomorrowArticle.append(`Max Temperature: ${tomorrowMaxTemp}\u2109`);
        tomorrowArticle.append(`Min Temperature: ${tomorrowMinTemp}\u2109`);
        dayAfterArticle.append(`Average Temperature: ${dayAfterAverageTemp}\u2109`);
        dayAfterArticle.append(`Max Temperature: ${dayAfterMaxTemp}\u2109`);
        dayAfterArticle.append(`Min Temperature: ${dayAfterMinTemp}\u2109`);
        getToday.innerText = "Today";
        getTomorrow.innerText = "Tomorrow"
        getDayAfter.innerText = "Day After Tomorrow"
        


        
      
        
        main.append(p);
        p.append(`${areaName[0].value}`)
        main.append(p1);
        main.append(p2);
        main.append(p3);
        main.append(p4);
        p1.append(`Area: ${areaName[0].value}`);
        p2.append(`Region: ${region[0].value}`);
        p3.append(`Country: ${country}`);
        p4.append(`Currently: Feels Like ${feelsLike}\u2109`)/n;
        const li = document.createElement('li')
        ul.append(li)
        const link = document.createElement("a");
        link.setAttribute("href", `${BASE_URL}/${areaName[0].value}.htm`);
        link.innerText = `${areaName[0].value} `;
        
        li.innerText = feelsLike + "\u2109";
        
        li.prepend(link);
        
        
        console.log(location.current_condition[0].FeelsLikeF)
       
        })


    .catch((error) => 
    console.log(error))
} 




