// const BASE_URL = `https://wttr.in/${plusify(input)}`

// https://github.com/chubin/wttr.in

// const tempConversionClass = document.querySelector("form.temperature-conversion");
// Selector for Form with temperature-conversion class

// Header For Weather App 

/* Contains a Search Form which requires user input of a valid city.

Things to consider:
- Cannot be empty (throw an error)
- If the input is more than one word, the request URL must have the spaces replaced with "+"s. example: https//wttr.in/Salt+Lake+City
-If there are two cities with the same name, the user should add the state that the city is in to refine search results.
*/





// Event listener for submit button. Takes text input.
// Form with search class
const search = document.querySelector("form.search");

//creates a heading with the place searched by the user, formatted. Adds to .current class
// const inputHeading = document.createElement("h2");
// current.prepend(inputHeading);


// Current Forecast Selectors
// creates <p> for nearest Area value
 const areaP = document.createElement("p");
 // <p> for region value
 const regionP = document.createElement("p"); 
 // <p> for country value
 const countryP = document.createElement("p");
 // <p> for Feels Like value
 const currentlyFP = document.createElement("p");


search.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // const input = document.querySelector("input[type='text']");
    const input = document.querySelector('input').value
    // user input
    // console.log(input)
    
    const BASE_URL = `https://wttr.in/${plusify(input)}?format=j1`
    // console.log(plusify(input))
    
    //  See the text disappear from the search bar.
    // if (inputHeading.innerHTML) {
        // inputHeading.innerHTML = "";
        // }
        const prettyInput = `${editValue(input)}`
        // API Fetch
   
    // const BASE_URL = `https://wttr.in/${plusify(input)}`
    // Write a function that converts the user input into a string where each space is replaced with a "+". plusify();

    fetch(BASE_URL)
    .then((response) => response.json())
    .then((json) => {
        
        // If p.empty is visible, remove element
        const empty = document.querySelector('p.empty');
        if (empty) {
            empty.remove();
            unhideCurrentClass(current);
            // if (divForecast.hasAttribute("hidden"))
                unhideForecast(divForecast);
            
            console.log(prettyInput + ": prettyInput")
            //makes user input look pretty: "salt lake city" => Salt Lake City"
            inputHeading.innerHTML = prettyInput;
            
            
            // console.log(json.nearest_area[0].areaName[0].value)
            
            
            
            const nearestArea = json.nearest_area[0].areaName[0].value;
            areaP.innerHTML = `<strong>Area: </strong>${nearestArea}`;

            // console.log(nearestArea + ": nearestArea")
            
            

            const region = json.nearest_area[0].region[0].value;
            regionP.innerHTML = `<strong>Region: </strong>${region}`
            // console.log(region + ": region");

            
        
            const country = json.nearest_area[0].country[0].value;
            // console.log(country + ": country");
            countryP.innerHTML = `<strong>Country:</strong> ${country}`
            
            const currentlyF = json.current_condition[0].FeelsLikeF;
            // console.log(currentlyF + ": currentlyF")
            currentlyFP.innerHTML = `<strong>Currently: </strong>${currentlyF}`
            
            
            console.log(areaP);
            
            
            
            
            currentSection.append(inputHeading, areaP, regionP, countryP, currentlyFP);
            
            // updateForecast(json);
            
            
            
            
        }
        //edit this later
        console.log(json, "console log json");
    })
    .catch((error) => {
        console.log(error, "error here!")
    });
    
    /*
    
    - The 3-day forecast should appear within its respective grid cell <article class="today/tomorrow/day-after-tm">
    - should also store searches with the name and current 'feels like' temperature in the sidebar
    - If the sidebar link is clicked, the main section should be replaced with that weather information. (The link can be connected to a function that performs the fetch.) "aside section a"
    - !* after clicking the sidebar link, another entry for the same location should not be made. If a link in the sidebar is clicked, don't add a new ul li element.
    */
   search.reset();
})