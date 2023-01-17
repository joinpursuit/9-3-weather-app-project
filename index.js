const form = document.querySelector("form")
const mainArticle = document.getElementById("current")
const URL = "https://wttr.in"
form.addEventListener("submit", event => {
    event.preventDefault()
    mainArticle.innerHTML = `<p>Loading...</p>`
    const userInput = document.getElementById("input")
    fetch (`${URL}/${userInput.value}?format=j1`) 
 .then ((response) => response.json())
.then ((data)=> {
    mainArticle.innerHTML=""

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
    const today = document.getElementById("today")
    const tomorrow = document.getElementById("tomorrow")
    const afterTomorrow = document.getElementById("dayAfterTomorrow")

    const todayTitle = document.createElement("h2")
    const tomorrowTitle = document.createElement("h2")
    const afterTomorrowTitle = document.createElement("h3")

    const avg0 = document.createElement("p")
    const avg1 = document.createElement("p")
    const avg2 = document.createElement("p")

    const max0 = document.createElement("p")
    const max1 = document.createElement("p")
    const max2 = document.createElement("p")

    const min0 = document.createElement("p")
    const min1 = document.createElement("p")
    const min2 = document.createElement("p")
    
    todayTitle.textContent = "Today"
    tomorrowTitle.textContent = "Tomorrow"
    afterTomorrowTitle.textContent = "Day After Tomorrow"

    avg0.textContent = `Average: ${data.weather[0].avgtempF} F`
    avg1.textContent = `Average: ${data.weather[1].avgtempF} F`
    avg2.textContent = `Average: ${data.weather[2].avgtempF} F`

    max0.textContent = `Max: ${data.weather[0].maxtempF} F`
    max1.textContent = `Max: ${data.weather[1].maxtempF} F`
    max2.textContent = `Max: ${data.weather[2].maxtempF} F`

    min0.textContent = `Min: ${data.weather[0].mintempF} F`
    min1.textContent = `Min: ${data.weather[1].mintempF} F`
    min2.textContent = `Min: ${data.weather[2].mintempF} F`


    today.append(todayTitle,avg0,max0,min0)
    tomorrow.append(tomorrowTitle,avg1,max1,min1)
    afterTomorrow.append(afterTomorrowTitle,avg2,max2,min2)

    userInput.value = ""
console.log(data)
}
)
})
