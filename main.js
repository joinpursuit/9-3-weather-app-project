 // Creating variable to represent form for location input
 const locationForm = document.querySelector("#location_form");

locationForm.addEventListener("submit", submitLocation => {
    // Preventing default action on submit form 
    submitLocation.preventDefault();
    // Creating variable to store value of location input text
    const pickedLocation = document.querySelector("#picked_location_text").value;
    // Creating variable to store value of url link for fetch
    const BASE_URL = `https://wttr.in/${pickedLocation}?format=j1`
    // Fetching BASE_URL
    fetch(BASE_URL)
        .then((response) => response.json())
        // Using destructuring to unpack values from fetch response
        .then(({nearest_area, current_condition, weather}) => {
            console.log(nearest_area);
            console.log(current_condition);
            console.log(weather);
            // console.log(request);
            // Creating variable to store value of current temperature 
            const currentTempF = current_condition[0].temp_F;
            // Creating variable to store value of nearest_area[0].region[0].value
            const regionValue = nearest_area[0].region[0].value;
            // Creating variable to store value of nearest_area[0].country[0].value
            const country = nearest_area[0].country[0].value;
            // Creating variable to store value for currently feels like temp in F 
            const currentlyFeelsF = current_condition[0].FeelsLikeF;
            // Creating variable to store value for today's average temp in F
            const todayAvgTempF = weather[0].avgtempF;
            // Creating variable to store value for today's max temp in F
            const todayMaxTempF = weather[0].maxtempF;
            // Creating variable to store value for today's min temp in F
            const todayMinTempF = weather[0].mintempF;
            // Creating variable to store value for tomorrow's average temp in F
            const tomorrowAvgTempF = weather[1].avgtempF;
            // Creating variable to store value for tomorrow's max temp in F
            const tomorrowMaxTempF = weather[1].maxtempF;
            // Creating variable to store value for tomorrow's min temp in F
            const tomorrowMinTempF = weather[1].mintempF;
            // Creating  variable to store value for day after tomorrow's average temp in F
            const dayAfterTomorrowAvgTempF = weather[2].avgtempF;
            // Creating variable to store value for day after tomorrow's max temp in F
            const dayAfterTomorrowMaxTempF = weather[2].maxtempF;
            // Creating variable to store value for day after tomorrow's min temp in F
            const dayAfterTomorrowMinTempF = weather[2].mintempF;
            // Creating variable to store value for nearest area
            const nearestArea = nearest_area[0].areaName[0].value;
            // Creating variable to store value for today's chance of sunshine
            const chanceOfSunshine = weather[0].hourly[0].chanceofsunshine;
            // Creating variable to store value for today's chance of rain
            const chanceOfRain = weather[0].hourly[0].chanceofrain;
            // Creating variable to store value for today's chance of snow
            const chanceOfSnow = weather[0].hourly[0].chanceofsnow;


            // Calling functions to pass cypress tests
            getDetailsFromTextInput();
            displayRegion(regionValue);
            displayCountry(country);
            displayCurrentlyFeelsF(currentlyFeelsF);
            displayPreviousSearchLocationAndTemp(pickedLocation, currentlyFeelsF);
            getTodayTempF(todayAvgTempF, todayMaxTempF, todayMinTempF);
            getTomorrowTempF(tomorrowAvgTempF, tomorrowMaxTempF, tomorrowMinTempF);
            getDayAfterTomorrowTempF(dayAfterTomorrowAvgTempF, dayAfterTomorrowMaxTempF, dayAfterTomorrowMinTempF);
            displayArea(nearestArea, pickedLocation);
            displayChanceOfSunshine(chanceOfSunshine);
            displayChanceOfRain(chanceOfRain);
            displayChanceOfSnow(chanceOfSnow);
            displaySunnyIcon(chanceOfSunshine);
            displayRainyIcon(chanceOfRain);
            displaySnowyIcon(chanceOfSnow);
            

            // Calling function to reset input text element
            resetInputLocationText();

        })
        .catch((error) => {
            handleError(error);
        });

        // Creating a function to retrieve the input text from the location form 
        function getDetailsFromTextInput() {
            // Creating variable to represent h2 tag in HTML with #displayLocation ID
            const displayLocation = document.querySelector("#main_h2_location");
            // Creating a variable to represent p tags in HTML with .pRemove class
            const pChangeClass = document.querySelectorAll(".p_placeholder");
            // Initializing value of displayLocation's text content to value of pickedLocation
            displayLocation.textContent = pickedLocation;
            // using .forEach method to set value of each p tag with .pRemove class to an empty string
            pChangeClass.forEach((p) => {
                p.textContent = "";
            })
           
        }
        // Creating a function to display region from pickedLocation 
        function displayRegion(location) {
            main_p_region.textContent = `Region: ${location}`;
        }
        // Creating a function to display country from pickedLocation
        function displayCountry(country) {
            main_p_country.textContent = `Country: ${country}`;
        }
        // Creating a function to display currently feels like temp in F  in pickedLocation
        function displayCurrentlyFeelsF(feelsLike) {
            main_p_currently_feels.textContent = `Feels like: ${feelsLike}°F`;
        }
        // Creating a function to display previous search location and temp
        function displayPreviousSearchLocationAndTemp(userLocation, temp) {
             // Creating variable to create li element for HTML
            const searchHistoryUlLi = document.createElement("li");
            // Creating variable to create "a" HTML element 
            const searchHistoryLiA = document.createElement("a");
            // Using .setAttribute method to create href attribute for searchHistoryliA variable
            searchHistoryLiA.setAttribute("href", "#");
            // Creating variable to represent ul element with #searchHistoryUl ID
            const searchHistoryUl = document.querySelector("#search_history_ul");
            // Using .textContent method to assign text with value of pickedLocation variable
            searchHistoryLiA.textContent = `${userLocation} - ${temp}`;
            // Using .append to append searchHistoryLiA variable to searchHistoryUli variable
            searchHistoryUlLi.append(searchHistoryLiA);
            // Using .append method to append searchHistoryUli to searchHistoryUl
            searchHistoryUl.append(searchHistoryUlLi);
        }
        // Creating a function to display today's average, max, and minimum temperatures
        function getTodayTempF(avgTempF, maxTempF, minTempF) {
            // Using .textContent method to set text content of today_h3 ID to "Today"
            today_h3.textContent = "Today";
            // Using .textContent method to set text content of element with today_avg_temp_F ID to a template literal that displays today's average temp
            today_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
            // Using .textContent method to set text content of element with  today_max_temp_f ID to a template literal that displays today's max temp
            today_max_temp_f.textContent = `Max. Temperature: ${maxTempF}°F;`;
            // Using .textContent method to set text content of element with today_min_temp_f ID to a template literal that displays today's min temp
            today_min_temp_f.textContent = `Min. Temperature: ${minTempF}°F`;
        }
        // Creating a function to display tomorrow's average, max, and minimum temperatures
        function getTomorrowTempF(avgTempF, maxTempF, minTempF) {
            // Using .textContent method to set text content of element with tomorrow_h3 ID to "Tomorrow"
            tomorrow_h3.textContent = "Tomorrow";
            // Using .textContent method to set text content of element with tomorrow_avg_temp_f ID to a template literal that displays tomorrow's average temp            
            tomorrow_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
            // Using .textContent method to set text content of element with tomorrow_max_temp_f ID to a template literal that displays tomorrow's max temp
            tomorrow_max_temp_f.textContent = `Max. Temperature: ${maxTempF}°F`;
            // Using .textContent method to set text content of element with tomorrow_min_temp_f ID to a template literal that displays tomorrow's min temp
            tomorrow_min_temp_f.textContent = `Min. Temperature: ${minTempF}°F`;
        }
        // Creating a function to display day after tomorrow's average, max, and minimum temperatures
        function getDayAfterTomorrowTempF(avgTempF, maxTempF, minTempF) {
            // Using .textContent method to set text content of element with day_after_tomorrow_h3 ID to "Day After Tomorrow"
            day_after_tomorrow_h3.textContent = "Day After Tomorrow";
            // Using .textContent method to set text content of element with day_after_tomorrow_avg_temp_f ID to a template literal that displays day after tomorrow's average temp
            day_after_tomorrow_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
            // Using .textContent method to set text content of element with day_after_tomorrow_max_temp_f ID to a template literal that displays day after tomorrow's max temp
            day_after_tomorrow_max_temp_f.textContent = `Max. Temperature: ${maxTempF}°F;`;
            // Using .textContent method to set text content of element with day_after_tomorrow_min_temp_f ID to a template literal that displays day after tomorrow's min temp
            day_after_tomorrow_min_temp_f.textContent = `Min. Temperature: ${minTempF}°F`;
        }
        // Creating a function to reset input element in #locationForm
        function resetInputLocationText() {
            // Using .value method to set value attribute of element with picked_location_text ID to an empty string
            picked_location_text.value = "";
        }
        // Creating a function to determine if nearest area is equal to user's picked input location
        function displayArea(area, userLocation) {
            // Using if statement to determine if  lowercased area parameter is equal to lowercased location parameter
            if (area.toLowerCase() == userLocation.toLowerCase()) {
                // Using .textContent method to set text content of element with main_p_area element to a template literal that displays area
                main_p_area.textContent = `Area: ${area};`
            } else {
                // Using .textContent method to set text content of element with main_p_area element to a template literal that displays nearest area
                main_p_area.textContent = `Nearest Area: ${area};`
            }
            
        }
        // Creating function to display chance of sunshine for today
        function displayChanceOfSunshine(chance) {
            chance_of_sunshine.textContent = `Chance of Sunshine: ${chance}%`
        }
        // Creating function to display chance of rain for today
        function displayChanceOfRain(chance) {
            chance_of_rain.textContent = `Chance of Rain: ${chance}%`
        }
        // Creating function to display chance of snow for today
        function displayChanceOfSnow(chance) {
            chance_of_snow.textContent = `Chance of Snow: ${chance}%`
        }
        // Creating function to display sunny icon 
        function displaySunnyIcon(chance) {
            if (Number(chance) > 50) {
                const weatherIcon = document.querySelector("#weather_icon_img")
                weatherIcon.setAttribute("src", "./assets/icons8-summer.gif");
                weatherIcon.setAttribute("alt", "sun");
            }
        }
        // Creating function to display rain icon 
        function displayRainyIcon(chance) {
            if (Number(chance) > 50) {
                const weatherIcon = document.querySelector("#weather_icon_img")
                weatherIcon.setAttribute("src", "./assets/icons8-torrential-rain.gif");
                weatherIcon.setAttribute("alt", "rain");
            }
        }
        // Creating function to display snow icon 
        function displaySnowyIcon(chance) {
            if (Number(chance) > 50) {
                const weatherIcon = document.querySelector("#weather_icon_img")
                weatherIcon.setAttribute("src", "./assets/icons8-light-snow.gif");
                weatherIcon.setAttribute("alt", "snow");
            }
        }

})

// 
const temperatureForm = document.querySelector("#convert_temp_form");

// 
temperatureForm.addEventListener("submit", temperatureConverter);
    // 
    function temperatureConverter(event) {
        // 
        event.preventDefault();
        // 
        const tempToConvert = document.querySelector("#temp-to-convert").value;
        // 
        const celsiusRadio = document.querySelector("#to-c");
        // 
        const fahrenheitRadio = document.querySelector("#to-f");
        // 
        let convertAnswer;        
        const convertAnswerArea = document.querySelector("#convert_temp_answer");
        // 
        if (celsiusRadio.checked) {
            convertAnswer = (tempToConvert - 32) * (5/9);
            convertAnswer = convertAnswer.toFixed(2);
            convertAnswerArea.textContent = `${convertAnswer}°C`;
        }
        // 
        if (fahrenheitRadio.checked) {
            convertAnswer = (tempToConvert * (9/5)) + 32;
            convertAnswer = convertAnswer.toFixed(2);
            convertAnswerArea.textContent = `${convertAnswer}°C`;
        }
    }



function handleError(error) {
    console.log(error);
}
