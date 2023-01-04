// Create an event listener for the submit button within the form
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
// Create a variable for the user Search
const userSearch =  document.querySelector("#preferredCity");
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

// Create a function to display the Weather Location
function displayWeather() {
// Create a variable for the 'main' element.
const main = document.querySelector("main");
   NameOfCity.textContent = userSearch.value
   if (NameOfCity) {
  const replaceIt = document.querySelectorAll(".replaceWithWeather");
  replaceIt.forEach(replace => {
    replace.remove();
  })
   }
    
} 
displayWeather()



.catch((error) => {
    console.log(error);
})




});   