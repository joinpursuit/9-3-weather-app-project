const BASE_URL = "https://wttr.in"
const format = "?format=j1"

const h3 = document.createElement("h3")
const main = document.querySelector("main")

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = document.querySelector("input").value;
    GetWeatherReport(userInput)
    form.reset()
})


function GetWeatherReport(userInput){
fetch(`${BASE_URL}/${userInput}${format}`)
.then((response) => response.json())
.then((result) => {
    const weatherReport = createWeatherReport(result)
    
})
.catch((error) => console.log(error))
}
 
function createWeatherReport(result){
    h3.innerHTML = result.nearest_area[0].areaName[0].value
    main.append(h3)
}