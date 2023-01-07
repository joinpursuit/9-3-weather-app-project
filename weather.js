const BASE_URL = "https://wttr.in/"
const form = document.querySelector("form");
const sidebar = document.querySelector(".side-bar")
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const p = document.createElement("p");
    const {location} = event.target
    sidebar.append("p")

})
function getWeatherByLocation()