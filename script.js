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

// currentSection.append(inputHeading, areaP, regionP, countryP, currentlyFP);



// const listArr = [];
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
        console.log(BASE_URL)
        // Removes "Choose a location..." <p> that appears on landing page.
        const emptyC = document.querySelector('.current p.empty');
       
        const emptyUl = document.querySelector("ul p.empty");
        removeP(emptyC);
        removeP(emptyUl);


        removeHidden(current);
        removeHidden(divForecast);
        
            // if (divForecast.hasAttribute("hidden"))
                // unhideForecast(divForecast);


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
            currentlyFP.innerHTML = `<strong>Currently: </strong>Feels like ${currentlyF}°F`
            
            
            // console.log(areaP);
            
        // Adding data to 3-Day Forecast Elements! 

        // ** TODAY **

        // Average
        const todayAvgTempJson = json.weather[0].avgtempF;
        todayAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${todayAvgTempJson}°F`;

        // Max
        const todayMaxTempJson = json.weather[0].maxtempF;
        todayMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${todayMaxTempJson}°F`;

        // Min 
        const todayMinTempJson = json.weather[0].mintempF;
        todayMinTemp.innerHTML = `<strong>Min Temperature: </strong> ${todayMinTempJson}°F`
    
        // ** TOMORROW ** 

        // Average
        const tmmAvgTempJson = json.weather[1].mintempF;
        tmmAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${tmmAvgTempJson}°F`
        // Max 
        const tmmMaxTempJson = json.weather[1].maxtempF;
        tmmMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${tmmMaxTempJson}°F`

        // Min
        const tmmMinTempJson = json.weather[1].mintempF;
        tmmMinTemp.innerHTML = `<strong>Min Temperature: </strong>${tmmMinTempJson}°F`

        // ** DAY AFTER TOMORROW **

        // Average
        const dayAfterAvgTempJson = json.weather[2].avgtempF;
        dayAfterAvgTemp.innerHTML = innerHTML = `<strong>Average Temperature: </strong>${dayAfterAvgTempJson}°F`

        // Max 
        const dayAfterMaxTempJson = json.weather[2].maxtempF;
        dayAfterMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${dayAfterMaxTempJson}°F`

        //Min

        const dayAfterMinTempJson = json.weather[2].mintempF;
        dayAfterMinTemp.innerHTML = `<strong>Min Temperature: </strong>${dayAfterMinTempJson}°F`
        
            
            
        // add previously searched data to list
        // function createLink(search) {
            //Take the Value of City name, connected to a link containing the BASE_URL used in fetch.

          
           
           

            const ul = document.querySelector("ul")
            const li = document.createElement("li")
            // const li = document.createElement("li")
            const a = document.createElement("a");
            function addToList(url, area, current) {
                li;
                a;
                a.setAttribute("href", `${url}`);
                a.innerHTML = url;
                a.innerText = `${area} - ${current}°F`
                // listArr.push(a.innerText);
                li.appendChild(a);
                ul.append(li);
                
            }
            addToList(BASE_URL, nearestArea, currentlyF);
    // console.log(listArr)
    
            // const a = document.createElement("a");
            // a.setAttribute("href", `${BASE_URL}`);
            // a.innerHTML = BASE_URL;
            // a.innerText = `${nearestArea} - ${currentlyF}`
            // const ulLi = document.querySelectorAll("li")
//  const listArr = [...new Set(ul)]
//  console.log(listArr)

            // li.appendChild(a);
            // ul.append(li);
           
            console.log(li)
        
            // const unordered = "<li>" + 
            // ulLi.forEach((listItem)=> {
                
                
            //     console.log(li.innerHTML)
            //         console.log(listItem.innerHTML)
                
            // })

            // const ulLiArr = [...new Set(ulLi)]
           //[bronx, big city, melbourne]
  
        //   console.log(ulLiArr)
          
            


            // for (let index = 0; index < ulLi.length; index++) {
    
            //     console.log(ulLi[index])
                
            // }
        
        //   a.document.write(nearestArea.link(BASE_URL));
        // a.href = `${BASE_URL}`;
        // a.innerText = nearestArea;
        // li.appendChild(a)
        // a.append(li)
       

        // }
        //  const p = document.createElement("p");

        //   console.log(ul)
        //   console.log(a)
        //   console.log(li)
        //   console.log(ul)

          
        //   li.append(p);
          



          a.addEventListener("click", (event) => {
            event.preventDefault();
            const allLi = document.querySelectorAll("li");
            const newA = document.createElement("a");
        newA.setAttribute("href", `${BASE_URL}`);
        newA.innerHTML = BASE_URL;
        // console.log(a)
        fetch(a)
        .then((response) => response.json())
        .then((json) => {
        
        inputHeading.innerHTML = prettyInput;
        areaP.innerHTML = `<strong>Area: </strong>${nearestArea}`;
        regionP.innerHTML = `<strong>Region: </strong>${region}`;
        countryP.innerHTML = `<strong>Country:</strong> ${country}`;
        currentlyFP.innerHTML = `<strong>Currently: </strong>${currentlyF}`;
        todayAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${todayAvgTempJson}°F`;
        todayMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${todayMaxTempJson}°F`;
    todayMinTemp.innerHTML = `<strong>Min Temperature: </strong> ${todayMinTempJson}°F`;
   tmmAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${tmmAvgTempJson}°F`;
    tmmMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${tmmMaxTempJson}°F`;
  tmmMinTemp.innerHTML = `<strong>Min Temperature: </strong>${tmmMinTempJson}°F`;
  dayAfterAvgTemp.innerHTML = innerHTML = `<strong>Average Temperature: </strong>${dayAfterAvgTempJson}°F`;
   dayAfterMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${dayAfterMaxTempJson}°F`;
   dayAfterMinTemp.innerHTML = `<strong>Min Temperature: </strong>${dayAfterMinTempJson}°F`;


        
      


            // console.log(clickJson)
        
        })

        // for (let li of allLi) {

        //     if (li.innerHTML === newA.innerHTML) {
        //         event.target.parentNode.remove();
        // }
        // }

        
    })
    
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