const formHeader = document.querySelector("form")
const mainP = document.querySelector(".weather_location")
const pDelete = document.querySelector(".p-delete")
formHeader.addEventListener("submit", (event) => {
    event.preventDefault();
    const foundCity = (event.target.location.value);
    fetchFoundCity(foundCity)
    formHeader.reset();
  mainP.style.display = "none"
  pDelete.style.display = "none"
})