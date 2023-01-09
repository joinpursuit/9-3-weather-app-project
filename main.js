// get details from text input
document.querySelector("form")


// search form for locations
// 1. queries the form
// 2. adds and event listener for the submit
// 3. prevents the page from reloading
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    // resets the page, deletes previous text
    const location = event.target.location.value
    // displays an error if location is not found
    if(!location){
        document.querySelector(".display").classList.add("error")
    }else{

        // find/save the text from the input box
        // make a network request to weather API
        // then put it into the DOM
        console.log(event.target.location.value)
    // fetch for location
    // .then wait for response
    fetch(`https://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((locationData) => {
        console.log(locationData)
        
        document.querySelector("#mainWeatherInfo").innerHTML =
        `<p>Area:${locationData.nearest_area[0].areaName[0].value}</p>
        <p>Region:${locationData.nearest_area[0].region[0].value}</p>
        <p>Country: ${locationData.nearest_area[0].country[0].value}</p>
        <p>Currently: Feels Like ${locationData.current_condition[0].FeelsLikeF}°F</p>`
        
        document.querySelector("#today").innerHTML = `Today
        <p>Average Temperature: ${locationData.weather[0].avgtempF}°F</p>
        <p>Max Temperature: ${locationData.weather[0].maxtempF}°F</p>
          <p>Min Temperature: ${locationData.weather[0].mintempF}°F</p>`;

        document.querySelector("#tomorrow").innerHTML = `Tomorrow
        <p>Average Temperature: ${locationData.weather[1].avgtempF}°F</p>
        <p>Max Temperature: ${locationData.weather[1].maxtempF}°F</p>
        <p>Min Temperature: ${locationData.weather[1].mintempF}°F</p>`;
        
        document.querySelector("#dayAfter").innerHTML = `Day After Tomorrow
        <p>Average Temperature: ${locationData.weather[2].avgtempF}°F</p>
        <p>Max Temperature: ${locationData.weather[2].maxtempF}°F</p>
        <p>Min Temperature: ${locationData.weather[2].mintempF}°F</p>`;
        
        // 4 articles for main section
        const main = document.createElement("article");
        main.id = "main"
        
        const today = document.createElement("article");
        today.id = "today";
        
        const tomorrow = document.createElement("article");
        tomorrow.id = "tomorrow";
        
        const dayAfterTomorrow = document.createElement("article");
        dayAfterTomorrow.id = "dayAfterTomorrow"
        // innerHTML string with ``, insert JS with ${}
        // next steps:
        // 1. get values you're looking for
        // 2. locationData.(name, area, region, country)
        // 3. create elements that will display on DOM
        
    })
    
    }
    event.target.reset();
})
