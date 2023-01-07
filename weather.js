const BASE_URL = "https://wttr.in"
const form = document.querySelector("form");
const sidebar = document.querySelector(".side-bar")
const userInput = document.querySelector("input")
form.addEventListener("submit", (event)=> {
    event.preventDefault();
   
    const {location} = userInput.value
    
    getWeatherByLocation(location);
    form.reset();
})

function getWeatherByLocation(location) {
    fetch(`${BASE_URL}/${location}?format=j1`)
    .then((response) =>
       response.json())
    .then((resultInJS) => {
        console.log(resultInJS)
    })
    .catch((error) => 
        console.log(error))
}   