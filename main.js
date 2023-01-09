const textInput = document.querySelector("#submit")
const userSearch = document.querySelector("#search")
const ulPreviousSearch = document.querySelector("#ulPreviousSearch")
let mani_sha = ""
textInput.addEventListener("click", handleClick => {
    handleClick.preventDefault()  
    const BASE_URL = `https://wttr.in/${userSearch.value}?format=j1`
    fetch(BASE_URL)
        .then((response) => response.json())
        .then((results) => { 
            mani_sha = results;
            console.log(results)
            pInitial.textContent = ""
            const date = new Date(results.current_condition[0].localObsDateTime);
            const formattedDate = date.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            function formatDate(date) {
                return date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                });
              }
            
            previous_Search()
            
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayAfterTomorrow = new Date();
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

            const formattedToday = formatDate(today);
            const formattedTomorrow = formatDate(tomorrow);
            const formattedDayAfterTomorrow = formatDate(dayAfterTomorrow);
            h2inputText.textContent = `${userSearch.value}, ${results.nearest_area[0].region[0].value}` //${abbreviate(results.nearest_area[0].country[0].value)}`
            h1inputText.textContent = `As of ${formattedDate}, Temperature is ${results.current_condition[0].temp_F}\°F and ${capitalize(results.current_condition[0].weatherDesc[0].value)}`
            
            const weatherImage = document.querySelector('#weatherIcon');
            const weatherDescriptions = results.weather[0].hourly.map(hour => hour.weatherDesc[0].value.toLowerCase());
            
            const mainElement = document.querySelector('.main');
            const articleElement = document.querySelector('.top-section')

            if (Number(results.weather[0].hourly[0].chanceofsunshine) >= 50){
                weatherImage.setAttribute('src', './assets/icons8-summer.gif');
                weatherImage.setAttribute('alt', 'sun');
                playSummerSound()
            } else if (Number(results.weather[0].hourly[0].chanceofrain) >= 50) {
                weatherImage.setAttribute('src', './assets/icons8-torrential-rain.gif');
                weatherImage.setAttribute('alt', 'rain');
                articleElement.classList.add('rain');
                playRainSound();
            } else if (Number(results.weather[0].hourly[0].chanceofsnow) >= 50) {
                weatherImage.setAttribute('src', './assets/icons8-light-snow.gif');
                articleElement.classList.add('snow');
                weatherImage.setAttribute('alt', 'snow');
                playSnowBlizzardSound()
            } else if (weatherDescriptions.some(description => description.includes('fog'))) {
                weatherImage.setAttribute('src', './assets/icons8-fog.gif');
                weatherImage.setAttribute('alt', 'Fog icon');
                playWindSound()
            } else if (weatherDescriptions.some(description => description.includes('ice'))) {
                weatherImage.setAttribute('src', './assets/icons8-icy-50.png');
                weatherImage.setAttribute('alt', 'Icy icon');
                playSnowBlizzardSound()
            } else if (weatherDescriptions.some(description => description.includes('snow'))) {
                weatherImage.setAttribute('src', './assets/icons8-light-snow.gif');
                weatherImage.setAttribute('alt', 'snow icon');
                playSnowBlizzardSound()
            } else if (weatherDescriptions.some(description => description.includes('night'))) {
                weatherImage.setAttribute('src', './assets/icons8-night.gif');
                weatherImage.setAttribute('alt', 'night icon');
            } else if (weatherDescriptions.some(description => description.includes('rain'))) {
                weatherImage.setAttribute('src', './assets/icons8-rain-cloud.gif');
                weatherImage.setAttribute('alt', 'rain-cloud-icon');
                playRainSound();
            } else if (weatherDescriptions.some(description => description.includes('storm'))) {
                weatherImage.setAttribute('src', './assets/icons8-storm.gif');
                weatherImage.setAttribute('alt', 'storm icon');
                playThunderSound();
            } else if (weatherDescriptions.some(description => description.includes('summer'))) {
                weatherImage.setAttribute('src', './assets/icons8-summer.gif');
                weatherImage.setAttribute('alt', 'summer icon');
                playSummerSound()
            } else if (weatherDescriptions.some(description => description.includes('torrential-rain'))) {
                weatherImage.setAttribute('src', './assets/icons8-torrential-rain.gif');
                weatherImage.setAttribute('alt', 'torrential rain icon');
                playThunderSound()
            } else if (weatherDescriptions.some(description => description.includes('wind'))) {
                weatherImage.setAttribute('src', './assets/icons8-wind.gif');
                weatherImage.setAttribute('alt', 'wind icon');
                playWindSound();
            } else if (weatherDescriptions.some(description => description.includes('windsock'))) {
                weatherImage.setAttribute('src', './assets/icons8-windsock-50.png');
                weatherImage.setAttribute('alt', 'wind sock icon');
                playWindSound()
            } 
            
            area = results.nearest_area[0].areaName[0].value
            const temp = document.querySelector("#Area")
            if (userSearch.value.toLowerCase() == area.toLowerCase()) {
                temp.innerHTML = `<strong>Area: </strong> <em>${area}</em>`
            } else {
                temp.innerHTML = `<strong>Nearest Area: </strong> <em>${area}</em>`
            }
            
            Region.innerHTML = `<strong>Region:</strong> <em>${results.nearest_area[0].region[0].value}</em>`;
            Country.innerHTML = `<strong>Country: </strong> <em>${results.nearest_area[0].country[0].value}</em>`
            CurrentTemp.innerHTML = `<strong>Currently: </strong> <em>Feels Like ${results.current_condition[0].FeelsLikeF}°F</em>`
            Sunshine.innerHTML = `<strong>Chance of Sunshine: </strong> <em>${results.weather[0].hourly[0].chanceofsunshine} %</em>`
            Rain.innerHTML = `<strong>Chance of Rain: </strong> <em>${results.weather[0].hourly[0].chanceofrain} %</em>`
            Snow.innerHTML = `<strong>Chance of Snow: </strong> <em>${results.weather[0].hourly[0].chanceofsnow} %</em>`

            three_day_forecast.textContent = "3 - Day Forecast"

            const styleLowerSection = document.querySelector('.styleBottom')
            styleLowerSection.style.border = '2px solid white';
            styleLowerSection.style.background = 'linear-gradient(45deg, #ab95b8, transparent)';
            styleLowerSection.style.borderBottom = '0px solid white';
        
            h2Today.textContent =  `${formattedToday}`
            h2Tomorrow.textContent= `${formattedTomorrow}`
            h2DayAfterTomorrow.textContent = `${formattedDayAfterTomorrow}`

            TodayAvg.textContent = `Average Temperature: ${results.weather[0].avgtempF}°F`
            TomorrowAvg.textContent = `Average Temperature: ${results.weather[1].avgtempF}°F`
            DayAfterTomorrowAvg.textContent = `Average Temperature: ${results.weather[2].avgtempF}°F`

            TodayMax.textContent = `Max Temperature: ${results.weather[0].maxtempF}°F`
            TomorrowMax.textContent = `Max Temperature: ${results.weather[1].maxtempF}°F`
            DayAfterTomorrowMax.textContent = `Max Temperature: ${results.weather[2].maxtempF}°F`

            TodayMin.textContent = `Min Temperature: ${results.weather[0].mintempF}°F`
            TomorrowMin.textContent = `Min Temperature: ${results.weather[1].mintempF}°F`
            DayAfterTomorrowMin.textContent = `Min Temperature: ${results.weather[2].mintempF}°F`

            document.getElementById('search').value = '';
        })
        .catch((error) => {
            console.log(error)
        })
    })
    
    const formConvert = document.getElementById('tempConvert');
    formConvert.addEventListener('submit', convertTemperature);
    
    function convertTemperature(event) {
        event.preventDefault();
      
        const inputField = document.getElementById('temp-to-convert');
        const inputValue = inputField.value;
      
        const celsiusRadio = document.querySelector('#to-c');
        const fahrenheitRadio = document.getElementById('to-f');

        const resultElement = document.querySelector('#displayTempinCorF');

        let result;
        if (celsiusRadio.checked) {
          result = (inputValue - 32) * (5/9); // convert to celsius
          resultElement.textContent = `${inputValue}\°F is ${result.toFixed(2)}\°C`;
        } else if (fahrenheitRadio.checked) {
          result = (inputValue * (9/5)) + 32; // convert to fahrenheit
          resultElement.textContent = `${inputValue}\°C is ${result.toFixed(2)}\°F`;
        }  
    }

    function capitalize(string) {
        return string.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`).join(' ');
    }
    
    const countryAbbreviations = {
        "United States of America": "USA",
        "United Kingdom": "UK",
    };
      
    function abbreviate(string) {
        return countryAbbreviations[string] || string;
    }

    function playRainSound() {
        const audio_file = document.querySelector("#sound")
        audio_file.setAttribute("src","./audio/rain.mp3")   
        audio_file.duration = 3; // Set the audio file's duration to 5 seconds
        audio_file.play(); // Play the audio file

        setTimeout(function() { // Pause the audio file after 5 seconds
            audio_file.pause();
        }, 5000);
    }

    function playWindSound() {
        const audio_file = document.querySelector("#sound")
        audio_file.setAttribute("src","./audio/Wind_2.wav")
    }

    function playThunderSound() {
        const audio_file = document.querySelector("#sound")
        audio_file.setAttribute("src","./audio/Thunderstorm_1.mp3")
    }

    function playSummerSound() {
        const audio_file = document.querySelector("#sound")
        audio_file.setAttribute("src","./audio/summer.wav")
    }

    function playSnowBlizzardSound() {
        const audio_file = document.querySelector("#sound")
        audio_file.setAttribute("src","./audio/Blizzard_snow.wav")
    }

    function addDeleteButton(aElement) {
        aElement.addEventListener("click", event => {
          if (event.target.textContent === "Delete") {
            // If the delete button was clicked, remove the a element
            const li = aElement.parentNode;
            ulPreviousSearch.removeChild(li);
          } else {
            // Otherwise, show the three dots
            event.target.textContent = "Delete";
          }
        });
      
        aElement.addEventListener("mouseover", event => {
          if (event.target.textContent !== "Delete") {
            // If the mouse is over the three dots and the delete button is not shown, show the delete button
            event.target.textContent = "Delete";
          }
        });
      
        aElement.addEventListener("mouseout", event => {
          if (event.target.textContent === "Delete") {
            // If the mouse is not over the delete button, reset the text to the original text
            event.target.textContent = aElement.getAttribute("data-original-text");
          }
        });
      }
    
    function myFunction() {
        document.querySelector('html').classList.toggle('dark-mode');
     }

     function previous_Search(){
        const Previous_Search = document.querySelector("#previousSearch")
        Previous_Search.textContent = ""
        
        const liPreviousSearch = document.createElement("li")
        const aPreviousSearch = document.createElement("a")

        aPreviousSearch.setAttribute("href","#")
        aPreviousSearch.setAttribute("class","styleAtag")
        
        aPreviousSearch.textContent = `${capitalize(userSearch.value)} - ${mani_sha.current_condition[0].FeelsLikeF}°F`
        liPreviousSearch.style.padding = '10px';


        liPreviousSearch.append(aPreviousSearch);
        ulPreviousSearch.append(liPreviousSearch)
     }