/* 
function plusify (entry)
takes in a string and replaces all spaces with +s. if the string contains no spaces, it should go unaffected.
*/
function plusify(entry) {
    let plusified = entry;
    if (plusified.includes(" ")) {
    plusified = entry.split(" ").join("+");
}
return plusified;
}

/* Current Forecast Selector - contains space for forecast */
const current = document.querySelector(".current"); 


const divForecast = document.querySelector("main div.fore");
console.log(divForecast)


// Function that displays the template for our 3-day Forecast
function unhideForecast(div) {
    if(div.hasAttribute("hidden")){
 div.removeAttribute("hidden");
}
}

const inputHeading = document.createElement("h2");
// current.prepend(inputHeading);
// inputHeading.innerHTML = "";
const currentSection = document.querySelector(".view-weather section");
console.log(currentSection)
currentSection.append(inputHeading, areaP, regionP, countryP, currentlyFP);

/* function unhideCurrentClass(pclass)
 - (pclass) {user input => json}
 removes the hidden attribute from article class "current" */
function unhideCurrentClass(pclass) {
    if (pclass.hasAttribute("hidden")) {  pclass.removeAttribute("hidden");
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

what elements must we use in this function?:
- the json file we got from the fetch
- article.today√, article.tomorrow√, article.day-after-tm√
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

// console.log(articleToday, articleTomorrow, articleDayAfter)



// function updateForecast(data) {
    //  console.log(response.nearest_area[0].areaName[0].value);
    // }