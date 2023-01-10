//Creating Variables to Manipulate DOM
const form = document.querySelector("#mainSearch");
const format = "?format=j1";
const base_url = "https://wttr.in/";

const h2 = document.createElement("h2");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");



// Error Case Handling
form.addEventListener("submit", (event) => {

    event.preventDefault();


    const city = event.target.search.value; 
  
    fetch(base_url + city + format)
    
    .then((response) => response.json())
    
    // Now population main -> article with info
        .then((weatherInfo) => {
    
          const areaName = weatherInfo.nearest_area[0].areaName[0].value;
    
          const mainArticle = document.querySelector("#temp-summary");
    
          mainArticle.innerHTML = '';
    
        
          if (areaName === city) {
            p1.innerHTML = "<strong>Area: </strong>" + areaName;
            h2.innerText = areaName;
          } else {
            p1.innerHTML = "<strong>Nearest Area: </strong>" + areaName;
            h2.innerText = city;
          }
          const region = weatherInfo.nearest_area[0].region[0].value;
          p2.innerHTML = "<strong>Region: </strong>" + region;
          mainArticle.append(h2, p1, p2, p3, p4);
          const country = weatherInfo.nearest_area[0].country[0].value;
          p3.innerHTML = "<strong>Country: </strong>" + country;
          const feelsLikeF = weatherInfo.current_condition[0].FeelsLikeF;
          p4.innerHTML =
            "<strong>Currently:</strong> Feels Like " + feelsLikeF + "°F";
    
            const { chanceofrain, chanceofsunshine, chanceofsnow } =
            weatherInfo.weather[0].hourly[0];
    
          