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

  console.log(weatherObj);
}

function createWeatherObjectFromResponse(response, url) {
  const { current_condition, nearest_area, weather } = response;
  const userLocation = extractUserLocation(url);
  const todaysChances = chancesOfForToday(weather[0].hourly);
  // const imgInfo = weatherIMG(todaysChances);

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
      // chanceOfSunshine: todaysChances[0],
      // chanceOfRain: todaysChances[1],
      // chanceOfSnow: todaysChances[2],
      // img_path_name: imgInfo[0],
      // img_alt: imgInfo[1],
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

function displayError(error) {
  console.log(error);
}
