//const previousCities = [];
//const currentTemp = current_condition



const nameOfCity = document.querySelector("#nameOfCity");

// Create a variable for users chosen location
const chooseLocationPTag = document.querySelector(".chooseLocation");

// Create a variable for the user Search
const userSearch =  document.querySelector("#preferredCity");

// Create a variable for the 'main' element.
const main = document.querySelector("main");

// Create an event listener for the submit button within the form
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

// Create a variable for the BASE_URL
    const BASE_URL = `https://wttr.in/${userSearch.value}?format=j1`

    fetch(BASE_URL)
    .then((response) => response.json())
    .then (({current_condition, request, nearest_area, weather}) => {
        console.log({current_condition}); // console log the result(s)
        console.log({request}); 
        console.log({nearest_area}); 
        console.log({weather});     
    })
    .catch((error) => {
        console.log(error);
    })
    displayWeather();
}); 

// Create a function to display the Weather Location
function displayWeather(name) {
   nameOfCity.textContent = userSearch.value
   console.log(name);
   if (nameOfCity) {
  const locationReplacement = document.querySelector(".replaceWithWeather");
  locationReplacement.textContent = userSearch.value;
   chooseLocationPTag.remove();
   }
    
} // End of displayWeather function!

function previousCities() {

}  // End of previousCities function!



  