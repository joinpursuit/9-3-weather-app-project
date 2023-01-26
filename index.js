const BASE_URL = "https://wttr.in/";
const searchBar = document.querySelector(".search-bar");
const articleCurrentWeather = document.querySelector('.current-weather');
let asideUpcoming = document.querySelector('.aside-upcoming')
let articleTodaysWeather = document.querySelector('.today-weather');
let articleTomorrowWeather = document.querySelector(".tomorrow");
let articleDayAfterWeather = document.querySelector('.day-after');
const main = document.querySelector("main");
const prevSearch = document.querySelector("ul");
const note = document.querySelector(".note")
const prevSearchArray = [];
const searchUl = document.querySelector(".search");
let formattedURL;


const form = document.querySelector("form");
form.addEventListener("submit", getFormattedUrl) 


function getFormattedUrl(event) {
    event.preventDefault();
    const location = `${searchBar.value}`;
    const formattedLocation = location[0].toUpperCase() + location.slice(1).toLowerCase();
    formattedURL = `${BASE_URL}${location}?format=j1`;
    getWeatherData(formattedURL, formattedLocation)
    
    

}

function getWeatherData(url, formattedLocation) {
        
    fetch(url) 
        .then((response) => response.json())
        
        .then((result) => {
            createTheWeather(result, url, formattedLocation);
            
            
        })
        
        // .catch((error) => {
        //     createErrorMessage(error)
        // })

    
}

function createTheWeather(resultObj, url, formattedLocation) {
    //console.log(resultObj);
    articleCurrentWeather.textContent = '';
    resetArticles();
    appendSearchName(formattedLocation);
    getCurrentWeatherDetails(resultObj, formattedLocation);
    getTodaysWeather(resultObj);
    getTomorrowsWeather(resultObj);
    getDayAfterWeather(resultObj);
    appendPreviousSearches(resultObj, url, formattedLocation);
    getChanceOfSunshine(resultObj);
    getChanceOfRain(resultObj);
    getChanceOfSnow(resultObj)
    form.reset();
    
}

function resetArticles() {
    [articleTodaysWeather, articleTomorrowWeather, articleDayAfterWeather].forEach(article => article.remove());

    articleTodaysWeather = document.createElement('article');
    articleTomorrowWeather = document.createElement('article');
    articleDayAfterWeather = document.createElement('article');
    articleTodaysWeather.classList.add('today-weather');
    articleTomorrowWeather.classList.add('tomorrow');
    articleDayAfterWeather.classList.add('day-after');
    asideUpcoming.append(articleTodaysWeather, articleTomorrowWeather, articleDayAfterWeather);
} 


function appendSearchName(formattedLocation) {
  
    const searchTitle = document.createElement("h2");
    searchTitle.textContent = formattedLocation;
    articleCurrentWeather.append(searchTitle);
        

}
function getCurrentWeatherDetails(details, formattedLocation) {
    const areaDetails = details.nearest_area[0].areaName[0].value;
    const areaTitle = document.createElement('p')
    const area = formattedLocation;
    if (areaDetails === area) {
        areaTitle.innerHTML = "<strong>Area:</strong> ";
    } else {
        areaTitle.innerHTML = "<strong>Nearest Area:</strong> ";
    }
    const otherDetails = document.createElement('p');
    otherDetails.innerHTML = `
    <p><strong>Region: </strong> ${details.nearest_area[0].region[0].value}</p>
    <p><strong>Country: </strong> ${details.nearest_area[0].country[0].value}</p>   
    <p><strong>Currently: </strong> Feels like ${details.current_condition[0].FeelsLikeF}°F</p>
    `;
    areaTitle.append(areaDetails);
    articleCurrentWeather.append(areaTitle, otherDetails);
    main.prepend(articleCurrentWeather)
   
    
}
function getTodaysWeather(today) {
    articleTodaysWeather.classList.add('tempCard')
    const todaysTitle = document.createElement('h3');
    todaysTitle.innerHTML = `<center>Today </center>`;
    const temp = document.createElement("p");
    temp.innerHTML = `
    <p><strong>Average Temperature: </strong> ${today.weather[0].avgtempF}°F</p>
    <p><strong>Max Temperature: </strong> ${today.weather[0].maxtempF}°F</p>
    <p><strong>Min Temperature: </strong> ${today.weather[0].mintempF}°F</p>
    `;
    articleTodaysWeather.append(todaysTitle, temp);
    asideUpcoming.append(articleTodaysWeather);
    
    
}
function getTomorrowsWeather(tomorrow) {
    articleTomorrowWeather.classList.add('tempCard')
    const tommorowTitle = document.createElement('h3');
    tommorowTitle.innerHTML = `<center>Tommorow </center>
    `;
    const temp = document.createElement("p");
    temp.innerHTML = `
    <p><strong>Average Temperature: </strong> ${tomorrow.weather[1].avgtempF}°F</p>
    <p><strong>Max Temperature: </strong> ${tomorrow.weather[1].maxtempF}°F</p>
    <p><strong>Min Temperature: </strong> ${tomorrow.weather[1].mintempF}°F</p>
    `;
    articleTomorrowWeather.append(tommorowTitle, temp);
    asideUpcoming.append(articleTomorrowWeather)
    
}
function getDayAfterWeather(dayAfter) {
    articleDayAfterWeather.classList.add('tempCard')
    const dayAfterTitle = document.createElement('h3');
    dayAfterTitle.innerHTML = `<center>Day Ater Tommorow </center>
    `;
    const temp = document.createElement("p");
    temp.innerHTML = `
    <p><strong>Average Temperature: </strong> ${dayAfter.weather[2].avgtempF}°F</p>
    <p><strong>Max Temperature: </strong> ${dayAfter.weather[2].maxtempF}°F</p>
    <p><strong>Min Temperature: </strong> ${dayAfter.weather[2].mintempF}°F</p>
    `;
    articleDayAfterWeather.append(dayAfterTitle, temp);
    asideUpcoming.append(articleDayAfterWeather)
    
}

function appendPreviousSearches(previous, url, formattedLocation) {
    const searchLi = document.createElement("li");
    

    if (!prevSearchArray.includes(formattedLocation)) {
        prevSearchArray.push(formattedLocation);
        note.remove();
        searchLi.innerHTML = `
        <a href=${url} name="currentLink">${formattedLocation}</a> 
            - ${previous.current_condition[0].FeelsLikeF}°F`
            ;
        searchUl.append(searchLi);
        searchLi.addEventListener("click", (event) => {
                event.preventDefault();
                const h3 = document.querySelector("h3"); 
                if (h3.textContent !== formattedLocation) {
                    getWeatherData(url, formattedLocation);
                    searchUl.append(searchLi);
                }
            });  

    }

    if (prevSearchArray.length > 10) {
        searchUlElement.firstChild.remove();
        prevSearchArray.shift();
    }

    
}

// function createErrorMessage()

// function removeHidden(event) {
//     event.target.nextSibling.classList.remove('hidden');
// }



function getChanceOfSunshine(details) {
   const avgChanceOfSun = details.weather[0].hourly[0].chanceofsunshine;

    if (avgChanceOfSun > 50) {
        const sunnyImg = document.createElement('img');
        sunnyImg.setAttribute('src', './assets/icons8-summer.gif');
        sunnyImg.setAttribute('alt', 'sun');
        articleCurrentWeather.prepend(sunnyImg);
    }

    const chanceOfSunshine = document.createElement('p');
    
    chanceOfSunshine.innerHTML = '<strong>Chance of Sunshine:</strong> ';
    chanceOfSunshine.append(avgChanceOfSun, '%');
    articleCurrentWeather.append(chanceOfSunshine);
}

function getChanceOfRain(details) {
    const avgChanceOfRain = details.weather[0].hourly[0].chanceofrain;

     if (avgChanceOfRain > 50) {
         const rainImg = document.createElement('img');
         rainImg.setAttribute('src', './assets/icons8-rain-cloud.gif');
         rainImg.setAttribute('alt', 'rain');
         articleCurrentWeather.prepend(rainImg);
     }
 
     const chanceOfRain = document.createElement('p');
     
     chanceOfRain.innerHTML = '<strong>Chance of Rain:</strong> ';
     chanceOfRain.append(avgChanceOfRain, '%');
     articleCurrentWeather.append(chanceOfRain);
 }

 function getChanceOfSnow(details) {
    const avgChanceOfSnow = details.weather[0].hourly[0].chanceofsnow;
 
     if (avgChanceOfSnow > 50) {
         const snowImg = document.createElement('img');
         snowImg.setAttribute('src', './assets/icons8-storm.gif');
         snowImg.setAttribute('alt', 'snow');
         articleCurrentWeather.prepend(snowImg);
     }
 
     const chanceOfSnow = document.createElement('p');
     
     chanceOfSnow.innerHTML = '<strong>Chance of Snow:</strong> ';
     chanceOfSnow.append(avgChanceOfSnow, '%');
     articleCurrentWeather.append(chanceOfSnow);
 }