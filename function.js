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
// 3-Day Forecast Selectors
const articleToday = document.querySelector("article.today");
// detailed info for current day
const articleTomorrow = document.querySelector("article.tomorrow");
// detailed info for tomorrow's weather

const articleDayAfter = document.querySelector("article.day-after-tm");
//detailed info for day after tomorrow's weather

// console.log(articleToday, articleTomorrow, articleDayAfter)



// function updateForecast(data) {
    //  console.log(response.nearest_area[0].areaName[0].value);
    // }