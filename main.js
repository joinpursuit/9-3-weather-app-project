const form = document.getElementById("weatherForm");
const todayArt = document.getElementById("today");
const tomorrowArt = document.getElementById("tomorrow");
const dayAfterTomArt =document.getElementById("after-tomorrow");
const convertForm = document.getElementById("converter");

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const userInput = event.target.location.value;
    return weatherSearch(userInput);

});

const weatherSearch = (location) => {
    if(!location){return};
    fetch("http://wttr.in/" + location + "?format=1j")
    .then((response)=> {
        return response.json();

    })
    .then((data) => {
        createMainArticle(data, location);
        fillMiniArticle(data.weather[0],todayArt, "Today");
        fillMiniArticle(data.weather[1], tomorrowArt, "Tomorrow");
        fillMiniArticle(data.weather[2], dayAfterTomArt, "Next Day");
        searchHistoryMaker(data, location);
        

       
       
        
            
    })
    .catch((error) => {
        console.log(error);
    }); 
};
// create a DOM img element with unique img file and description, and append it to the Dom 

const icon = (url, altString) => {
    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", altString);
    general.append(img);
};
 const createMainArticle = (data, location) => {
    const general = document.getElementById("general");
    general.innerHTML = "";

    const {FeesLikeF} = data.current-condition[0];

    const {areaName, country, region} = data.nearest-area[0];
    const {chanceOfRain, chanceOfSunshine, chanceOfSnow} = data.weather[0].hourly[0];
    if(chanceOfSunshine > 50){
        icon("./assets/icons8-summer.gif", "sun");

    } else if(chanceOfRain> 50){
        icon("./assets/icons8-torrential-rain.gif", "rain");

    }else if (chanceOfSnow>50){
        icon("./assets/icons8-light-snow.gif", "snow")
    }
    const searchedTown = document.createElement("h2");
    searchedTown.innerText = location;
    const searchedArea = document.createElement("p");
    areaName[0].value.toLowerCase() === location.toLowerCase()
    ? (searchedArea.innerText= "Area: " + areaName[0].value)
    : (searchedArea.innerText = "Nearest Area: " + areaName[0].value);

    const searchedRegion = document.createElement("p");
    searchedRegion.innerText = "Region: " + region[0].value;
    const searchedCountry = document.createElement("p");
    searchedCountry.innerText = "Country: " + country[0].value;
    const currentTemp = document.createElement("p");
    currentTemp.innerText = "Currently: Feels like" + feelsLikeF + "fahrenheit";
    const sunshine = document.createElement("p");
    sunshine.innerText = "Chance of sunshine: " + chanceOfSunshine;
    const rain = document.createElement("p");
    rain.innerText = "Chance of rain: " + chanceOfRain;
    const snow = document.createElement("p");
    snow.innerText = "Chance of snow: " + chanceOfSnow;

    general.append(
        searchedTown,
        searchedArea,
        searchedRegion,
        searchedCountry,
        currentTemp,
        sunshine,
        rain,
        snow,
    );
    

 };

 const fillMiniArticle = (data, article, header) => {
    ({ avgTemF, minTempF, maxTemF} = data);
    article.innerHTML = "";
    const heading = document.createElement("h3");
    heading.innerText = header;
    const averageP = document.createElement("p");
    averageP.innerHTML = `<strong>Avg Temp:</strong> ${avgTemF}fahrenheit`;
    const maxP = document.createElement("p");
    maxP.innerHTML = `<strong> Min Temp: </strong>${minTempF}fahrenheit`;
    const minP = Document.createElement("p");
    minP.innerHTML`<strong>Min Temp:</strong> ${minTempF}fahrenheit`;
    return article.append(heading, averageP, maxP, minP);


 };

 const searchHistory = (data, location) => {
    const history = document.getElementById("search-list");
    const noSearches = document.getElementById("no-searches");
    const{feelsLikeF} = data.current-condition[0];
    if(!history.innerText.includes(location)) {
        noSearches.innerText = "";
        const newLIne = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", "#");
        anchor.textContent = `${location} ${FeesLikeF}fahrenheit`;
        newLIne.append(anchor);
        history.append(newLIne);
        newLIne.addEventListener("click", (event) =>{
            event.preventDefault();
            weatherSearch(location);
        });
    }
 };

 const convertHelper = (num, type)=> {
    const conversionResult = document.getElementById("result");
    conversionResult.innerText = "";
    if(type === true) {
        const farToCel = `${(num-32)*(5/9).toFixed(2)}Celsius`;
        conversionResult.innerText = farToCel;

    }else if (type === false) {
        const celToFar = `${(num*1.8+32).toFixed(2)}Fahrenheit`;
        conversionResult.innerText = celToFar;
    }
 };

 convertForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target[0].value;
    const convertToCel = event.target[1].checked;
    convertToCel === true? convertHelper(input, true) : convertHelper(input, false);
    event.target.removeEventListener();

 })