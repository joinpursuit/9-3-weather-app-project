
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
        })
        // Creating a function to retrieve the input text from the location form 
        function getDetailsFromTextInput() {
            // Creating variable to represent h2 tag in html with #displayLocation ID
            const displayLocation = document.querySelector("#displayLocation");
            // Creating a variable to represent p tags in html with .pRemove class
            const pChangeClass = document.querySelectorAll(".pRemove");
            // Initializing value of displayLocation's text content to value of pickedLocation
            displayLocation.textContent = pickedLocation;
            // using .forEach method to set value of each p tag with .pRemove class to an empty string
            pChangeClass.forEach((p) => {
                p.textContent = "";
            })
            // Creating variable to create li element for html
            const searchHistoryUlLi = document.createElement("li");
            // Creating variable to represent ul element with #searchHistoryUl ID
            const searchHistoryUl = document.querySelector("#searchHistoryUl");
            // Using .textContent method to assign text with value of pickedLocation variable
            searchHistoryUlLi.textContent = pickedLocation;
            // Using .append method to append searchHistoryUli to searchHistoryUl
            searchHistoryUl.append(searchHistoryUlLi);
        }

        getDetailsFromTextInput()

        .catch((error) => {
            console.log(error);
        });
})

