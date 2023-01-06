
const formHeader = document.querySelector("form")
formHeader.addEventListener("submit", (event) => {
    event.preventDefault();
    const foundCity = (event.target.location.value);
    fetchFoundCity(foundCity)
    formHeader.reset();
})