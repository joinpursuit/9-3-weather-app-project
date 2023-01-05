
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
            console.log(current_condition[0].temp_F)
            console.log(weather);
            console.log(request);
            // Creating variable to store value of current temperature for pickedLocation
            const currentTempF = current_condition[0].temp_F;
            // Creating variable to store value of nearest_area[0].region[0].value
            const regionValue = nearest_area[0].region[0].value;
            // Creating variable to store value of nearest_area[0].country[0].value
            const country = nearest_area[0].country[0].value;
            // 
            const currentlyFeelsF = current_condition[0].FeelsLikeF;

            getThreeForecastDays(currentTempF);
            getDetailsFromTextInput();
            displayRegion(regionValue);
            displayCountry(country);
            displayCurrentlyFeelsF(currentlyFeelsF);
            displayPreviousSearchLocation(pickedLocation, currentlyFeelsF);


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
        // 
        function displayRegion(location) {
            main_p_region.textContent = `Region: ${location}`;
        }
        // 
        function displayCountry(country) {
            main_p_country.textContent = `Country: ${country}`;
        }
        // 
        function displayCurrentlyFeelsF(feelsLike) {
            main_p_currently_feels.textContent = `Feels like: ${feelsLike}`;
        }
        // 
        function displayPreviousSearchLocation(userLocation, temp) {
             // Creating variable to create li element for HTML
            const searchHistoryUlLi = document.createElement("li");
            // 
            const searchHistoryLiA = document.createElement("a");
            // 
            searchHistoryLiA.setAttribute("href", "#");
            // Creating variable to represent ul element with #searchHistoryUl ID
            const searchHistoryUl = document.querySelector("#search_history_ul");
            // Using .textContent method to assign text with value of pickedLocation variable
            searchHistoryLiA.textContent = `${userLocation} - ${temp}`;
            // 
            searchHistoryUlLi.append(searchHistoryLiA);
            // Using .append method to append searchHistoryUli to searchHistoryUl
            searchHistoryUl.append(searchHistoryUlLi);
        }


        // Calling getDetailsFromTextInput function
        
        
        

        function getThreeForecastDays(temp) {
            // Creating variable to represent article element in HTML
            const mainArticle = document.querySelector("#main_article");
            // Creating variable to create p element for HTML
            const mainArticleP = document.createElement("p");
            // Using .append method to append mainArticleP to mainArticle
            mainArticle.append(mainArticleP);


        }

        getThreeForecastDays()

       
})

function handleError(error) {
    console.log(error);
}
