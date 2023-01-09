
// array to store previous searches
const previousSearches = [];

// function to get the weather for a given location
function getWeather(location) {
  // Make a request to the weather API using the city and my key
  fetch(`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={9.3weatherapp}`)
    .then(response => response.json())
    .then(data => {
      // Display the weather data on the page
      displayWeather(data);
    });
}

// function to display the weather data on the page
function displayWeather(data) {
  const weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = `
    
  `;
}

//  handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value;

  // Add the search to the previousSearches array
  previousSearches.push(location);
  // Clear the input field
  locationInput.value = '';

  // Get the weather for the location
  getWeather(location);
}

// display the previous searches
function displayPreviousSearches() {
  const previousSearchesContainer = document.getElementById('previous-searches-container');
  previousSearchesContainer.innerHTML = `
    <h4>Previous Searches</h4>
    
      ${previousSearches.map(search => `<li>${search}</li>`).join('')}
    
  `;
}

// event listener for the form submission
const form = document.getElementById('weather-form');
form.addEventListener('submit', handleFormSubmit);

// display the previous searches when the page loads
displayPreviousSearches();


