/* 
function plusify (entry)
takes in a string and replaces all spaces with +s. if the string contains no spaces, it should go unaffected.
*/
function plusify(entry) {
    let plusified = entry;
   return plusified = entry.split(" ").join("+");
}

/* Current Forecast Selector - contains space for forecast */
const current = document.querySelector(".current"); 


const divForecast = document.querySelector("main div.fore");
// console.log(divForecast)


// Function that displays the template for our 3-day Forecast
// function unhideForecast(div) {
//     if(div.hasAttribute("hidden")){
//  div.removeAttribute("hidden");
// }
// }

const inputHeading = document.createElement("h2");
// current.prepend(inputHeading);
// inputHeading.innerHTML = "";
const currentSection = document.querySelector(".view-weather section");
// console.log(currentSection)
currentSection.append(inputHeading, areaP, regionP, countryP, currentlyFP);


// Selector for <aside> Previous Searches 
// const ul = document.querySelector("ul")
// console.log(list)



// function createLink(search) {
//     //Take the Value of City name, connected to a link containing the BASE_URL used in fetch.
//   const a = document.createElement("a");
//   const p = document.createElement("p");
  
//   const li = document.querySelector("li")
//   li.append(p);
  
  
// }



/* function unhideCurrentClass(pclass)
 - (pclass) {user input => json}
 removes the hidden attribute from article class "current" */
// function unhideCurrentClass(pclass) {
//     if (pclass.hasAttribute("hidden")) {  pclass.removeAttribute("hidden");
// }
// }

// Function that removes the "hidden" attribute from an element :)
function removeHidden(element) {
    if (element.hasAttribute("hidden")) {
        element.removeAttribute("hidden");
    }
}
//makes user input look pretty: "salt lake city" => Salt Lake City"
function editValue(uInput) {
    const inputArr = uInput.split(" ");
        return inputArr.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
}
// console.log(editValue("salt lake city"))

/* [ ] See the name of the city that was searched as well as the area, region, country, and currently "feels like" within const current
- the json file we got from the fetch
- WITHIN const current is where the city that was searched as well as the area, region, country, and currently "feels like" will be */







/* - The 3-day forecast should appear within its respective grid cell <article class="today/tomorrow/day-after-tm">


-
 */
// 3-Day Forecast Selectors and respective elements.
// ** TODAY **
const articleToday = document.querySelector("article.today");
// <p> for Average Temperature 
const todayAvgTemp = document.createElement("p");
// <p> for Max Temperature
const todayMaxTemp = document.createElement("p");
// <p> for Min Temperature
const todayMinTemp = document.createElement("p");

articleToday.append(todayAvgTemp, todayMaxTemp, todayMinTemp)

// ** TOMORROW **
const articleTomorrow = document.querySelector("article.tomorrow");
// <p> for Tomorrow's Average Temperature
const tmmAvgTemp = document.createElement("p");
// <p> for Tomorrow's Max Temperature
const tmmMaxTemp = document.createElement("p");
// <p> for Tomorrow's Min Temperature
const tmmMinTemp = document.createElement("p");

articleTomorrow.append(tmmAvgTemp,tmmMaxTemp, tmmMinTemp)

// ** DAY AFTER TOMORROW **
const articleDayAfter = document.querySelector("article.day-after-tm");
const dayAfterAvgTemp = document.createElement("p");
// <p> for Day After Tomorrow Average Temperature
const dayAfterMaxTemp = document.createElement("p");
// <p> for Day After Tomorrow Max Temperature
const dayAfterMinTemp = document.createElement("p");
// <p> for Day After Tomorrow Min Temperature


articleDayAfter.append(dayAfterAvgTemp, dayAfterMaxTemp, dayAfterMinTemp)


function removeP(empty){ 
    if (empty) {
        empty.remove();
    }
}


// function getWeather(res){
//     const input = document.querySelector('input').value
//     const prettyInput = `${editValue(input)}`
//     inputHeading.innerHTML = prettyInput; 

//     const nearestArea = res.nearest_area[0].areaName[0].value;
//     areaP.innerHTML = `<strong>Area: </strong>${nearestArea}`;

//     const region = res.nearest_area[0].region[0].value;
//     regionP.innerHTML = `<strong>Region: </strong>${region}`

//     const country = res.nearest_area[0].country[0].value;
//     // console.log(country + ": country");
//     countryP.innerHTML = `<strong>Country:</strong> ${country}`
    
//     const currentlyF = res.current_condition[0].FeelsLikeF;
//     // console.log(currentlyF + ": currentlyF")
//     currentlyFP.innerHTML = `<strong>Currently: </strong>${currentlyF}`


//         // Adding data to 3-Day Forecast Elements! 

//         // ** TODAY **

//         // Average
//         const todayAvgTempJson = json.weather[0].avgtempF;
//         todayAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${todayAvgTempJson}`;

//         // Max
//         const todayMaxTempJson = json.weather[0].maxtempF;
//         todayMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${todayMaxTempJson}`;

//         // Min 
//         const todayMinTempJson = json.weather[0].mintempF;
//         todayMinTemp.innerHTML = `<strong>Min Temperature: </strong> ${todayMinTempJson}`
    
//         // ** TOMORROW ** 

//         // Average
//         const tmmAvgTempJson = json.weather[1].mintempF;
//         tmmAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${tmmAvgTempJson}`
//         // Max 
//         const tmmMaxTempJson = json.weather[1].maxtempF;
//         tmmMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${tmmMaxTempJson}`

//         // Min
//         const tmmMinTempJson = json.weather[1].mintempF;
//         tmmMinTemp.innerHTML = `<strong>Min Temperature: </strong>${tmmMinTempJson}`

//         // ** DAY AFTER TOMORROW **

//         // Average
//         const dayAfterAvgTempJson = json.weather[2].avgtempF;
//         dayAfterAvgTemp.innerHTML = innerHTML = `<strong>Average Temperature: </strong>${dayAfterAvgTempJson}`

//         // Max 
//         const dayAfterMaxTempJson = json.weather[2].maxtempF;
//         dayAfterMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${dayAfterMaxTempJson}`

//         //Min

//         const dayAfterMinTempJson = json.weather[2].mintempF;
//         dayAfterMinTemp.innerHTML = `<strong>Min Temperature: </strong>${dayAfterMinTempJson}`
// }



// function updateForecast(data) {
    // let chars = ['A', 'B', 'A', 'C', 'B'];
    // let uniqueChars = [...new Set(chars)];
    
    // console.log(uniqueChars); 
       // }
 // updateForecast(json);


