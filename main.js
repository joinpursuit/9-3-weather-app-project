// const textInput = document.querySelector("#submit")

// textInput.addEventListener("click", handleSubmitinForm)

// function handleSubmitinForm(){
//     handleClick.preventDefault()
//     const userSearch = document.querySelector("#search").value
//     const BASE_URL = `https://wttr.in/${userSearch}?format=j1`
//     fetch(BASE_URL)
//         .then((response) => response.json())
//         .then((results) => { 
//             console.log(results)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }

// Get the input element
const temperatureSlider = document.querySelector('#temperature-slider');

// Add an event listener for when the value of the slider changes

const temperatureDisplay = document.querySelector('#temperature-display');

temperatureSlider.addEventListener('input', handleSliderInput);

function handleSliderInput(event) {
  if (temperatureSlider.value === '0') {
    // Display temperature in Celsius
    temperatureDisplay.textContent = `${celsiusTemperature}°C`;
  } else {
    // Display temperature in Fahrenheit
    temperatureDisplay.textContent = `${fahrenheitTemperature}°F`;

  }
  const temperatureType = temperature === 'c' ? 'Celsius' : 'Fahrenheit';

  console.log(`Temperature is set to ${temperature} ${temperatureType}.`);
}