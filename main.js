// v--- All desired variables to access the following info:

const formHeader = document.querySelector("form") //accesses form section of header section in HTML
const mainP = document.querySelector(".weather_location") //accesses main p tag from main section of HTML
const pDelete = document.querySelector(".p-delete") // accesses p tag in aside section of HTML
const convertButton = document.querySelector(".convert_button") // accesses covert button for convert widget of HTML
const h4Section = document.querySelector(".cal-temp")// accesses h4 aka result section for convert widget of HTML

// v-- eventlistener for the form section
formHeader.addEventListener("submit", (event) => {
    event.preventDefault();
    const foundCity = (event.target.location.value);
    fetchFoundCity(foundCity)
    formHeader.reset();
    mainP.style.display = "none"
    pDelete.style.display = "none"
})

// v--- eventlistener for the covert widget submit button
convertButton.addEventListener("submit", (event) => {
    event.preventDefault();
    const C = document.querySelector(".C").checked
    const F = document.querySelector(".F").checked
    if (C === true) {
        h4Section.textContent = parseFloat(farToCel(event.target.temp_conv.value)).toFixed(2) + " degrees"
    }
    if (F === true) {
        h4Section.textContent = parseFloat(celToFar(event.target.temp_conv.value)).toFixed(2) + " degrees"
    }


})