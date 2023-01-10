const form = document.querySelector("#mainSearch");
const format = "?format=j1";
const base_url = "https://wttr.in/";

const h2 = document.createElement("h2");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");

const previousSearchList = document.querySelector(".previous-searches");
previousSearchList.addEventListener("click", function(e){
  const target = e.target.closest("a");

  if(target){
    e.preventDefault();
    fetch(target.href)
      .then((response) => response.json())
      .then((weatherInfo) => {
        createWeatherForecast(weatherInfo, target.getAttribute("city"));
      })
      .catch(console.log);
  }
});

form.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const city = event.target.search.value;
  var api = base_url + city + format
  getWeatherInfo(api);
}

function getWeatherInfo(api) {
  const city = extractUserLocation(api)
  console.log(api)
  console.log(city)
  fetch(api)
    .then((response) => response.json())
    // Now population main -> article with info
    .then((weatherInfo) => {
      createWeatherForecast(weatherInfo, city);
    })
    .catch(console.log);

}


function createWeatherForecast(weatherInfo, city) {

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

  const pRain = document.createElement("p");
  const pSunshine = document.createElement("p");
  const pSnow = document.createElement("p");

  pSunshine.innerHTML = "<strong>Chance of Sunshine: </strong>" + chanceofsunshine + "%";
  pRain.innerHTML = "<strong>Chance of Rain: </strong>" + chanceofrain + "%";
  pSnow.innerHTML = "<strong>Chance of Snow: </strong>" + chanceofsnow + "%";
  mainArticle.append(pSunshine, pRain, pSnow);

  // Prepend an icon based on weather logic
  const img = document.createElement("img");
  if (chanceofsunshine > 50) {
    // display summer icon
    // img = '<img src="./assets/icons8-summer.gif" alt="sun" />';
    img.setAttribute("src", "./assets/icons8-summer.gif");
    img.setAttribute("alt", "sun");
  } else if (chanceofrain > 50) {
    // img = '<img src="./assets/icons8-torrential-rain.gif" alt="rain" />';
    img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    img.setAttribute("alt", "rain");
  } else if (chanceofsnow > 50) {
    // img = '<img src="./assets/icons8-light-snow.gif" alt="snow" />';
    img.setAttribute("src", "./assets/icons8-light-snow.gif");
    img.setAttribute("alt", "snow");
  }
  mainArticle.append(img);

  const mainAside = document.querySelector("#main-aside")

  // This will empty the existing element contents so that we can recreate them.
  // This is an alternative to using replaceWith(). Not sure if I like it...
  mainAside.innerHTML = '';

  // Add 3 article elements under main aside to get today, tomorrow, etc data
  const article1 = document.createElement("article");
  const article2 = document.createElement("article");
  const article3 = document.createElement("article");
  function addDaysInfo(parent, article, dayName, dayNum) {
    const h3 = document.createElement("h3");
    h3.innerText = dayName;
    const p5 = document.createElement("p");
    const p6 = document.createElement("p");
    const p7 = document.createElement("p");

    const avgTemp = weatherInfo.weather[dayNum].avgtempF;
    p5.innerHTML =
      "<strong>Average Temperature: </strong>" + avgTemp + " °F";
    const maxTemp = weatherInfo.weather[dayNum].maxtempF;
    p6.innerHTML =
      "<strong>Maximum Temperature: </strong>" + maxTemp + " °F";
    const minTemp = weatherInfo.weather[dayNum].mintempF;
    p7.innerHTML =
      "<strong>Minimum Temperature: </strong>" + minTemp + " °F";

    article.append(h3, p5, p6, p7);
    // append article to main aside

    parent.append(article);
  }

  addDaysInfo(mainAside, article1, "Today", 0);
  addDaysInfo(mainAside, article2, "Tomorrow", 1);
  addDaysInfo(mainAside, article3, "Day After Tomorrow", 2);

  addPreviousSearch(city, feelsLikeF);
}

function addPreviousSearch(city, feelsLikeF) {
  // Here we are using a class. Before we were using the attribute id.
  // Which is the better way to do things? perhaps a question for your instructor.
  const previousSearchList = document.querySelector(".previous-searches");

  // Check for pre-existing searches with the same city name
  // If found, return early
  for (var i = 0; i < previousSearchList.children.length; i++) {
    if (city == previousSearchList.children[i].getAttribute("city")) {
      return;
    }
  }

  const newLi = document.createElement("li");
  previousSearchList.append(newLi);
  // Creating the text for previous searches "X degrees fahrenheit"
  const a = document.createElement("a");
  a.setAttribute("href", base_url + city + format);
  a.setAttribute("city", city);
  newLi.setAttribute("city", city);
  a.innerText = city;
  newLi.append(a);
  newLi.innerHTML += ` - ${feelsLikeF} °F`;
  previousSearchList.append(newLi);

  //This removes the "no previous searches" text after you input a location
  document.querySelector(".hide").setAttribute("style", "display: none");

  form.reset();
}


function extractUserLocation(url) {
  const inputLocation = url.split(/[/?]/)[3].replace("%20", " ");
  return inputLocation;
}