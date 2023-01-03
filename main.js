const celcius = "c";
const fahrenheit = "f";

const weatherF = document.querySelector("#weather_form");
weatherF.addEventListener("submit", handleWeatherSubmit);

const tempConvF = document.querySelector("#temp_form");
tempConvF.addEventListener("submit", handleTempSubmit);
