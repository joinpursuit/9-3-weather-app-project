import symbolic_consts from "./symbC.js";
const { ZERO, CELCIUS, ...sc } = symbolic_consts;

const weatherF = document.querySelector(sc.WEATHER_FORM_ID);
weatherF.addEventListener(sc.SUBMIT, handleWeatherFormSubmit);

const tempConvF = document.querySelector(sc.TEMP_CONVERT_FORM_ID);
tempConvF.addEventListener(sc.SUBMIT, handleTempFormSubmit);

function handleWeatherFormSubmit(event) {
  event.preventDefault();
  try {
    const user_input = weatherF.weather_submit;
    checkForValidInput(user_input.value);
    const BASE_URL = `https://wttr.in/${user_input.value}?format=j1`;

    fetchWeatherInformation(BASE_URL);

    event.target.weather_submit.value = sc.CLEAR;
  } catch (error) {
    document.querySelector("main p").textContent = error.message;
  }
}

function handleTempFormSubmit(event) {
  event.preventDefault();

  const tempType = event.target.convert_temperature.value;
  const tempToConvert = document.querySelector(`${sc.TEMP_TO_CONVERT_ID}`).value;

  handleTemperatureConvertionResponse(tempType, tempToConvert);
}

function fetchWeatherInformation(url) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => handleResponse(response, url))
    .catch((error) => displayError(error));
}

function handleResponse(response, url) {
  const weatherObj = createWeatherObjectFromResponse(response, url);

  hideElements();
  showElements();
  rearrangeGridDisplay();

  const mainWeatherContainer = document.querySelector(`${sc.WEATHER_CURRENT_ID}`);
  const mainWeather = createMainArticle(weatherObj);
  mainWeatherContainer.append(mainWeather);

  const upcomingWeatherContainer = document.querySelector(`${sc.WEATHER_UPCOMING_ID}`);
  const weatherArticles = createThreeDayForecastArticles(weatherObj);
  upcomingWeatherContainer.append(...weatherArticles);

  const unorderedSearches = document.querySelector("#search_section ul");
  const searchListElement = createSearchLinkElement(weatherObj);
  unorderedSearches.append(searchListElement);
}

function createWeatherObjectFromResponse(response, url) {
  const { current_condition, nearest_area, weather } = response;
  const userLocation = extractUserLocation(url);
  const todaysChances = chancesOfForToday(weather[0].hourly);
  const imgInfo = weatherIMG(todaysChances);

  // destructurefrom arrays
  const weatherObj = {
    user_input: userLocation,
    nearest_area: nearest_area[0].areaName[0].value,
    region: nearest_area[0].region[0].value,
    country: nearest_area[0].country[0].value,
    feelLikeTempF: current_condition[0].FeelsLikeF,
    today: {
      name: sc.TODAY,
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
      name: sc.TOMORROW,
      avgTemp: weather[1].avgtempF,
      maxTemp: weather[1].maxtempF,
      minTemp: weather[1].mintempF,
    },
    dayAfterTomorrow: {
      name: sc.DAY_AFTER_TOMORROW,
      avgTemp: weather[2].avgtempF,
      maxTemp: weather[2].maxtempF,
      minTemp: weather[2].mintempF,
    },
    search_url: url,
  };

  return weatherObj;
}

function extractUserLocation(url) {
  const inputLocation = url.split(/[/?]/)[sc.USER_INPUT_INDEX_INSIDE_URL].replace(sc._ENDCODED_SPACE_, sc._SPACE_);
  return inputLocation;
}

function chancesOfForToday(hourlyChances) {
  const chanceOfSunshine = chanceOf(sc.CHANCE_OF_SUNSHINE, hourlyChances);
  const chanceOfRain = chanceOf(sc.CHANCE_OF_RAIN, hourlyChances);
  const chanceOfSnow = chanceOf(sc.CHANCE_OF_SNOW, hourlyChances);

  return [chanceOfSunshine, chanceOfRain, chanceOfSnow];
}

function chanceOf(type, hourly) {
  let sumOfChances = ZERO;
  hourly.forEach((hour) => (sumOfChances += Number(hour[`${type}`])));
  let avgChance = sumOfChances / hourly.length;

  return Math.round(avgChance);
}

function weatherIMG(chancesForToday) {
  const highestChance = Math.max(...chancesForToday);

  if (highestChance === chancesForToday[sc.CHANCE_OF_SUNSHINE_INDEX]) {
    return [sc.SUN_IMG_PATH, sc.SUN_IMG_ALT_TEXT];
  } else if (highestChance === chancesForToday[sc.CHANCE_OF_RAIN_INDEX]) {
    return [sc.RAIN_IMG_PATH, sc.RAIN_IMG_ALT_TEXT];
  } else if (highestChance === chancesForToday[sc.CHANCE_OF_SNOW_INDEX]) {
    return [sc.SNOW_IMG_PATH, sc.SNOW_IMG_ALT_TEXT];
  }
}

function createIMG(pathText, altText) {
  const img = document.createElement("img");
  img.setAttribute(sc.SRC_ATTRIBUTE, `./assets/icons8-${pathText}.gif`);
  img.setAttribute(sc.ALT_ATTRIBUTE, altText);
  return img;
}

function handleLocationAreaMismatch(weatherObj) {
  if (weatherObj.user_input !== weatherObj.nearest_area) {
    return sc.NEAREST_AREA_STRONG;
  }
  return sc.AREA_STRONG;
}

function createMainArticle(weather) {
  const areaType = handleLocationAreaMismatch(weather);

  const heading2 = document.createElement("h2");
  heading2.textContent = weather.user_input;

  const areaP = createParagraphByType(areaType, weather.nearest_area);

  const weatherIMG = createIMG(weather.today.img_path_name, weather.today.img_alt);

  const regionP = createParagraphByType(sc.REGION_STRONG, weather.region);
  const countryP = createParagraphByType(sc.COUNTRY_STRONG, weather.country);
  const currentlyP = createParagraphByType(sc.CURRENTLY_STRONG, weather.feelLikeTempF);

  const chanceOfSunshine = weather.today.chanceOfSunshine;
  const sunshineP = createParagraphByType(sc.SUNSHINE_STRONG, `${chanceOfSunshine}%`);

  const chanceOfRain = weather.today.chanceOfRain;
  const rainP = createParagraphByType(sc.RAIN_STRONG, `${chanceOfRain}%`);

  const chanceOfSnow = weather.today.chanceOfSnow;
  const snowP = createParagraphByType(sc.SNOW_STRONG, `${chanceOfSnow}%`);

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add(sc.REMOVE_CLASS_NAME, sc.WEATHER_ARTICLE_CLASS_NAME);
  weatherContainer.append(weatherIMG, heading2, areaP, regionP, countryP, currentlyP, sunshineP, rainP, snowP);

  return weatherContainer;
}

function createParagraphByType(type, content) {
  const paragraph = document.createElement("p");
  const strong = document.createElement("strong");

  if (type === sc.CURRENTLY_STRONG) {
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
  const articleName = convertToClassName(day.name);
  const h3 = document.createElement("h3");
  h3.textContent = day.name;

  const avgP = createParagraphByType(sc.AVG_STRONG, `${day.avgTemp}°F`);
  const maxP = createParagraphByType(sc.MAX_STRONG, `${day.maxTemp}°F`);
  const minP = createParagraphByType(sc.MIN_STRONG, `${day.minTemp}°F`);

  const upComingWeatherArticle = document.createElement("article");
  upComingWeatherArticle.classList.add(`${sc.REMOVE_CLASS_NAME}`, sc.WEATHER_ARTICLE_CLASS_NAME, sc.UPCOMING_WEATHER_ARTICLE_CLASS_NAME, articleName);
  upComingWeatherArticle.append(h3, avgP, maxP, minP);

  return upComingWeatherArticle;
}
function convertToClassName(dayName) {
  if (dayName.includes(`${sc._SPACE_}`)) {
    return dayName.replaceAll(`${sc._SPACE_}`, `${sc._DASH_}`).toLowerCase();
  } else {
    return dayName.toLowerCase();
  }
}

function hideElements() {
  const elementsToRemove = document.querySelectorAll(`.${sc.REMOVE_CLASS_NAME}`);

  if (elementsToRemove) {
    elementsToRemove.forEach((rmvEl) => rmvEl.remove());
  }
}

function showElements() {
  const elementsToShow = document.querySelectorAll(sc.HIDDEN_CLASS);

  if (elementsToShow) {
    elementsToShow.forEach((showEl) => showEl.classList.remove(sc.HIDDEN_CLASS_NAME));
  }
}

function rearrangeGridDisplay() {
  document.querySelector(sc.MAIN_CONTENT_CONTAINER_ID).classList.remove(sc.TEMP_WIDGET_OFF_CLASS_NAME);
  document.querySelector(sc.MAIN_CONTENT_CONTAINER_ID).classList.add(sc.TEMP_WIDGET_ON_CLASS_NAME);
  document.querySelector(sc.WEATHER_APP_CONTAINER_CLASS).classList.add(sc.WEATHER_APP_CONTAINER_ON_SUBMIT_CLASS_NAME);
}

function createSearchLinkElement(weather) {
  const searchLink = document.createElement("a");
  searchLink.href = weather.search_url;
  searchLink.textContent = weather.user_input;

  searchLink.addEventListener("click", searchLinkClickEvent);

  const feelsLikeTemp = `${weather.feelLikeTempF}°F`;

  const searchListElement = document.createElement("li");
  searchListElement.style.listStyle = sc.NONE;
  searchListElement.append(searchLink, sc._DASH_SPACE_, feelsLikeTemp);

  return searchListElement;
}

function searchLinkClickEvent(event) {
  event.preventDefault();
  event.target.parentNode.remove();
  fetchWeatherInformation(event.target.href);
}

function handleTemperatureConvertionResponse(type, temp) {
  document.querySelector("aside h4").textContent = sc.CLEAR;
  const temp2Num = Number(temp);
  const tempConverted = tempConvertion(type, temp2Num);
  const tempConvertedContainer = document.querySelector("aside h4");
  tempConvertedContainer.append(tempConverted);
}

function tempConvertion(type, temp) {
  if (type === CELCIUS) {
    return ((temp - sc.DEGREE_DIFFERENCE) * sc.FAHRENHEIT_TO_CELCIUS_RATIO).toFixed(2);
  } else if (type === sc.FAHRENHEIT) {
    return temp * sc.CELCIUS_TO_FAHRENHEIT_RATIO + sc.DEGREE_DIFFERENCE;
  }
}

function checkForValidInput(input) {
  if (input === sc.CLEAR || input === null || input.match(/[0-9]/g)) {
    throw new Error(sc.ERROR_MSG_USER_INPUT_EMPTY);
  }
}

function displayError(error) {
  console.log(error);
}
