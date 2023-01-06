// v--- All desired variables to access the following info:

const formHeader = document.querySelector("form") //accesses form section of header section in HTML
const mainP = document.querySelector(".weather_location") //accesses main p tag from main section of HTML
const pDelete = document.querySelector(".p-delete") // accesses p tag in aside section of HTML
const convertButton = document.querySelector(".convert_button") // accesses covert button for convert widget of HTML

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
        alert("Results convert to Celcius " + C(event.target.temp.value))
    }
    if (F === true) {
        alert("Results convert to Farenheit " + F(event.target.temp.value))
    }


})