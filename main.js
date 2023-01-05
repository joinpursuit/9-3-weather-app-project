
locationForm.addEventListener("submit", submitLocation => {
    // Preventing default action on submit form 
    submitLocation.preventDefault();
    // Creating variable to store value of location input text
    const pickedLocation = document.querySelector("#pickedLocationText").value;
    // Creating variable to represent form for location input
    const locationForm = document.querySelector("#locationForm");
    // Creating variable to store value of url link for fetch
    const BASE_URL = `https://wttr.in/${pickedLocation}?format=j1`
    // Fetching BASE_URL
    fetch(BASE_URL)
        .then((response) => response.json())
        // Using destructuring to unpack values from fetch response
        .then(({nearest_area, current_condition, weather, request}) => {
            console.log(nearest_area);
            console.log(current_condition);
            console.log(weather);
            console.log(request);
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
            // 
            const todayMaxTempF = weather[0].maxtempF;
            // 
            const todayMinTempF = weather[0].mintempF;
            // 
            const tomorrowAvgTempF = weather[1].avgtempF;
            // 
            const tomorrowMaxTempF = weather[1].maxtempF;
            // 
            const tomorrowMinTempF = weather[1].mintempF;
            // 
            const dayAfterTomorrowAvgTempF = weather[2].avgtempF;
            // 
            const dayAfterTomorrowMaxTempF = weather[2].maxtempF;
            // 
            const dayAfterTomorrowMinTempF = weather[2].mintempF;
            // Calling functions
            getDetailsFromTextInput();
            displayRegion(regionValue);
            displayCountry(country);
            displayCurrentlyFeelsF(currentlyFeelsF);
            displayPreviousSearchLocationAndTemp(pickedLocation, currentlyFeelsF);
            getTodayTempF(todayAvgTempF, todayMaxTempF, todayMinTempF);
            getTomorrowTempF(tomorrowAvgTempF, tomorrowMaxTempF, tomorrowMinTempF);
            getDayAfterTomorrowTempF(dayAfterTomorrowAvgTempF, dayAfterTomorrowMaxTempF, dayAfterTomorrowMinTempF);
            // 
            resetInputLocationForm();

        })
        .catch((error) => {
            handleError(error);
        });

        // Creating a function to retrieve the input text from the location form 
        function getDetailsFromTextInput() {
            // Creating variable to represent h2 tag in HTML with #displayLocation ID
            const displayLocation = document.querySelector("#main_h2_location");
            // Creating a variable to represent p tags in HTML with .pRemove class
            const pChangeClass = document.querySelectorAll(".pRemove");
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
            main_p_currently_feels.textContent = `Feels like: ${feelsLike}`;
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
            today_h3.textContent = "Today";
            today_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
            today_max_temp_f.textContent = `Max. Temperature: ${maxTempF}°F;`;
            today_min_temp_f.textContent = `Min. Temperature: ${minTempF}°F`;
        }
        // Creating a function to display tomorrow's average, max, and minimum temperatures
        function getTomorrowTempF(avgTempF, maxTempF, minTempF) {
            tomorrow_h3.textContent = "Tomorrow";
            tomorrow_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
            tomorrow_max_temp_f.textContent = `Max. Temperature: ${maxTempF}°F`;
            tomorrow_min_temp_f.textContent = `Min. Temperature: ${minTempF}°F`;
        }
        // Creating a function to display day after tomorrow's average, max, and minimum temperatures
        function getDayAfterTomorrowTempF(avgTempF, maxTempF, minTempF) {
            day_after_tomorrow_h3.textContent = "Day After Tomorrow";
            day_after_tomorrow_avg_temp_f.textContent = `Average Temperature: ${avgTempF}°F`;
            day_after_tomorrow_max_temp_f.textContent = `Max. Temperature: ${maxTempF}°F;`;
            day_after_tomorrow_min_temp_f.textContent = `Min. Temperature: ${minTempF}°F`;
        }
        // 
        function resetInputLocationForm() {
            pickedLocationText.value = "";
        }

     
})

function handleError(error) {
    console.log(error);
}
