const BASE_URL = "https://wttr.in/";
const searchBar = document.querySelector(".search-bar");
const articleCurrentWeather = document.querySelector('#current-weather');
const articleTodaysWeather = document.querySelector('#today-weather');
const articleTomorrowWeather = document.querySelector("#tomorrow");
const articleDayAfterWeather = document.querySelector('#day-after');
const main = document.querySelector("main");
const prevSearch = document.querySelector("ul");
const prevSearchArray = [];
const searchUl = document.querySelector(".search");
let formattedURL;


const form = document.querySelector("form");
form.addEventListener("submit", getFormattedUrl) 


function getFormattedUrl(event) {
    event.preventDefault();
    const location = `${searchBar.value}`;
    formattedURL = `${BASE_URL}${location}?format=j1`;
    getWeatherData(formattedURL)
    
    

}

function getWeatherData(url) {
        
    fetch(url) 
        .then((response) => response.json())
        
        .then((result) => {
            createTheWeather(result,url);
            
            
        })
        
        // .catch((error) => {
        //     createErrorMessage(error)
        // })

    
}

function createTheWeather(resultObj, url) {
    //console.log(resultObj);
   
    appendSearchName();
    getCurrentWeatherDetails(resultObj);
    getTodaysWeather(resultObj);
    getTomorrowsWeather(resultObj);
    getDayAfterWeather(resultObj);
    appendPreviousSearches(resultObj, url);
    
    form.reset();
    
}


function appendSearchName() {
    // const note = document.querySelector(".note");
    // note.remove();
    const searchTitle = document.createElement("h3");
    searchTitle.textContent = searchBar.value;;
    articleCurrentWeather.append(searchTitle);
        

}
function getCurrentWeatherDetails(details) {
    const allDetails = document.createElement('p');
    allDetails.innerHTML = `
    <strong>Area: </strong> ${details.nearest_area[0].areaName[0].value} 
    <p><strong>Region: </strong> ${details.nearest_area[0].region[0].value}</p>
    <p><strong>Country: </strong> ${details.nearest_area[0].country[0].value}</p>   
    <p><strong>Currently: </strong> Feels like ${details.current_condition[0].FeelsLikeF}°F</p>
    `;
    
    articleCurrentWeather.append(allDetails);
    
}
function getTodaysWeather(today) {
    const todaysWeather = document.createElement('h3');
    todaysWeather.innerHTML = `<center>Today </center>`;
    const temp = document.createElement("p");
    temp.innerHTML = `
    <p><strong>Average Temperature: </strong> ${today.weather[0].avgtempF}°F</p>
    <p><strong>Max Temperature: </strong> ${today.weather[0].maxtempF}°F</p>
    <p><strong>Min Temperature: </strong> ${today.weather[0].mintempF}°F</p>
    `;
    articleTodaysWeather.append(todaysWeather, temp);
}
function getTomorrowsWeather(tomorrow) {
    const tommorowWeather = document.createElement('h3');
    tommorowWeather.innerHTML = `<center>Tommorow </center>
    `;
    const temp = document.createElement("p");
    temp.innerHTML = `
    <p><strong>Average Temperature: </strong> ${tomorrow.weather[1].avgtempF}°F</p>
    <p><strong>Max Temperature: </strong> ${tomorrow.weather[1].maxtempF}°F</p>
    <p><strong>Min Temperature: </strong> ${tomorrow.weather[1].mintempF}°F</p>
    `;
    articleTomorrowWeather.append(tommorowWeather, temp);
}
function getDayAfterWeather(dayAfter) {
    const dayAfterWeather = document.createElement('h3');
    dayAfterWeather.innerHTML = `<center>Day Ater Tommorow </center>
    `;
    const temp = document.createElement("p");
    temp.innerHTML = `
    <p><strong>Average Temperature: </strong> ${dayAfter.weather[2].avgtempF}°F</p>
    <p><strong>Max Temperature: </strong> ${dayAfter.weather[2].maxtempF}°F</p>
    <p><strong>Min Temperature: </strong> ${dayAfter.weather[2].mintempF}°F</p>
    `;
    articleDayAfterWeather.append(dayAfterWeather, temp);
}

function appendPreviousSearches(previous, url) {
    const location = searchBar.value;
    prevSearchArray.push(location);
    console.log(prevSearchArray)
    
    // const note = document.querySelector(".note");
    // note.remove();
   

        const searchLi = document.createElement("li");
        searchLi.innerHTML = `
        <a href=${url}>${location}</a> 
        - ${previous.current_condition[0].FeelsLikeF}°F`
        ;
    
        searchLi.addEventListener("click", (event) => {
            event.preventDefault(); //stops page from reloading) 
        

        })

        searchUl.append(searchLi);

    }
  
     
    
    
    if (prevSearchArray.length > 3) {
        prevSearchArray.pop();
    

    
}

// function createErrorMessage()

// function removeHidden(event) {
//     event.target.nextSibling.classList.remove('hidden');
// }

