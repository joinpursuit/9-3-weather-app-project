const celcius = "c";
const fahrenheit = "f";

const weatherF = document.querySelector("#weather_form");
weatherF.addEventListener("submit", handleWeatherFormSubmit);

const tempConvF = document.querySelector("#temp_form");
tempConvF.addEventListener("submit", handleTempFormSubmit);

function handleWeatherFormSubmit(event) {
  event.preventDefault();
  const user_input = weatherF.weather_submit;
  const BASE_URL = `https://wttr.in/${user_input.value}?format=j1`;

  fetchWeatherInformation(BASE_URL);
  event.target.weather_submit.value = "";
}

function handleTempFormSubmit(event) {
  event.preventDefault();
}

function fetchWeatherInformation(url) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => handleResponse(response, url))
    .catch((error) => displayError(error));
}

function handleResponse(response, url) {
  const weatherObj = createWeatherObjectFromResponse(response, url);
  const location = weatherObj.user_input;
  console.log(location);
  hideElements();
  showElements();
  rearrangeGridDisplay();

  const mainWeatherContainer = document.querySelector("#weather_current");
  const mainWeather = createMainArticle(weatherObj);
  mainWeatherContainer.append(mainWeather);

  const upcomingWeatherContainer = document.querySelector("#weather_upcoming");
  const weatherArticles = createThreeDayForecastArticles(weatherObj);
  upcomingWeatherContainer.append(...weatherArticles);

  // const unorderedSearches = document.querySelector("#search_section ul");
  // const searchListElement = createSearchLink(weatherObj);
  // unorderedSearches.append(searchListElement);
  console.log(weatherObj);
}

function createWeatherObjectFromResponse(response, url) {
  const { current_condition, nearest_area, weather } = response;
  const userLocation = extractUserLocation(url);
  const todaysChances = chancesOfForToday(weather[0].hourly);
  const imgInfo = weatherIMG(todaysChances);

  const weatherObj = {
    user_input: userLocation,
    nearest_area: nearest_area[0].areaName[0].value,
    region: nearest_area[0].region[0].value,
    country: nearest_area[0].country[0].value,
    feelLikeTempF: current_condition[0].FeelsLikeF,
    today: {
      name: "Today",
      avgTemp: weather[0].avgtempF,
      maxTemp: weather[0].maxtempF,
      minTemp: weather[0].mintempF,
      chanceOfSunshine: todaysChances[0],
      chanceOfRain: todaysChances[1],
      chanceOfSnow: todaysChances[2],
      img_path_name: imgInfo[0],
      img_alt: imgInfo[1],
    },
    tomorrow: {
      name: "Tomorrow",
      avgTemp: weather[1].avgtempF,
      maxTemp: weather[1].maxtempF,
      minTemp: weather[1].mintempF,
    },
    dayAfterTomorrow: {
      name: "Day After Tomorrow",
      avgTemp: weather[2].avgtempF,
      maxTemp: weather[2].maxtempF,
      minTemp: weather[2].mintempF,
    },
    search_url: url,
  };

  return weatherObj;
}

function extractUserLocation(url) {
  const inputLocation = url.split(/[/?]/)[3];
  return inputLocation;
}

function chancesOfForToday(hourlyChances) {
  const chanceOfSunshine = chanceOf("sunshine", hourlyChances);
  const chanceOfRain = chanceOf("rain", hourlyChances);
  const chanceOfSnow = chanceOf("snow", hourlyChances);

  return [chanceOfSunshine, chanceOfRain, chanceOfSnow];
}

function chanceOf(type, hourly) {
  let sumOfChances = 0;
  hourly.forEach((hour) => (sumOfChances += Number(hour[`chanceof${type}`])));
  let avgChance = sumOfChances / hourly.length;

  return Math.round(avgChance);
}

function weatherIMG(chancesForToday) {
  const highestChance = Math.max(...chancesForToday);

  if (highestChance === chancesForToday[0]) {
    return ["summer", "sun"];
  } else if (highestChance === chancesForToday[1]) {
    return ["torrential-rain", "rain"];
  } else {
    return ["light-snow", "snow"];
  }
}

function createIMG(pathText, altText) {
  const img = document.createElement("img");
  img.setAttribute("src", `./assets/icons8-${pathText}.gif`);
  img.setAttribute("alt", altText);
  return img;
}

function handleLocationAreaMismatch(weatherObj) {
  if (weatherObj.user_input !== weatherObj.nearest_area) {
    return "Nearest Area";
  }
  return "Area";
}

function createMainArticle(weather) {
  const areaType = handleLocationAreaMismatch(weather);

  const heading2 = document.createElement("h2");
  heading2.textContent = weather.user_input;

  const areaP = createParagraphByType(areaType, weather.nearest_area);

  const weatherIMG = createIMG(weather.today.img_path_name, weather.today.img_alt);

  const regionP = createParagraphByType("Region", weather.region);
  const countryP = createParagraphByType("Country", weather.country);
  const currentlyP = createParagraphByType("Currently", weather.feelLikeTempF);

  const chanceOfSunshine = weather.today.chanceOfSunshine;
  const sunshineP = createParagraphByType("Chance of Sunshine", chanceOfSunshine);

  const chanceOfRain = weather.today.chanceOfRain;
  const rainP = createParagraphByType("Chance of Rain", chanceOfRain);

  const chanceOfSnow = weather.today.chanceOfSnow;
  const snowP = createParagraphByType("Chance of Snow", chanceOfSnow);

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("remove", "weather_article");
  weatherContainer.append(heading2, areaP, weatherIMG, regionP, countryP, currentlyP, sunshineP, rainP, snowP);

  return weatherContainer;
}

function createParagraphByType(type, content) {
  const paragraph = document.createElement("p");
  const strong = document.createElement("strong");

  if (type === "Currently") {
    content = `Feels Like ${content}°F`;
  }

  strong.textContent = `${type}: `;
  paragraph.append(strong, content);

  return paragraph;
}

function createThreeDayForecastArticles(weather) {
  const today = createForecastArticleByDay(weather.today);
  const tomorrow = createForecastArticleByDay(weather.tomorrow);
  const dayAfterTomorrow = createForecastArticleByDay(weather.dayAfterTomorrow);

  return [today, tomorrow, dayAfterTomorrow];
}

function createForecastArticleByDay(day) {
  const h3 = document.createElement("h3");
  h3.textContent = day.name;

  const avgP = createParagraphByType("Average Temperature", `${day.avgTemp}°F`);
  const maxP = createParagraphByType("Max Temperature", `${day.maxTemp}°F`);
  const minP = createParagraphByType("Minimum Temperature", `${day.minTemp}°F`);

  const upComingWeatherArticle = document.createElement("article");
  upComingWeatherArticle.classList.add("remove", "weather_article", "upcoming_weather_article");
  upComingWeatherArticle.append(h3, avgP, maxP, minP);

  return upComingWeatherArticle;
}

function hideElements() {
  const elementsToRemove = document.querySelectorAll(".remove");

  if (elementsToRemove) {
    elementsToRemove.forEach((rmvEl) => rmvEl.remove());
  }
}

function showElements() {
  const elementsToShow = document.querySelectorAll(".hidden");

  if (elementsToShow) {
    elementsToShow.forEach((showEl) => showEl.classList.remove("hidden"));
  }
}

function rearrangeGridDisplay() {
  document.querySelector("#main_content_container").classList.remove("temp_widget_off");
  document.querySelector("#main_content_container").classList.add("temp_widget_on");
}

function displayError(error) {
  console.log(error);
}
