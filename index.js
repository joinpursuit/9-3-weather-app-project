const form = document.querySelector("form")
const URL = "https://wttr.in"
form.addEventListener("submit", event => {
    event.preventDefault()
    const userInput = document.getElementById("input")
    fetch (`${URL}/${userInput.value}?format=j1`) 
 .then ((response) => response.json())
.then ((data)=> {
    const mainArticle = document.getElementById("current")

    const current = document.createElement("h3")
    const area = document.createElement("p")
    const region = document.createElement("p")
    const country = document.createElement("p")
    const currently = document.createElement("p")
    
    current.textContent = userInput.value
    area.textContent = `Area: ${data.nearest_area[0].areaName[0].value}`
    region.textContent = `Region: ${data.nearest_area[0].region[0].value}`
    country.textContent = `Country: ${data.nearest_area[0].country[0].value}`
    currently.textContent = `Feels Like ${data.current_condition[0].FeelsLikeF} F`

    mainArticle.append(current, area, region, country, currently)
console.log(data)
}
)
})
