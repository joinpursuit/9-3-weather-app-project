const headingforform= document.querySelector("form")

const para = document.querySelector(".location")

const sear = document.querySelector(".searches")

headingforform.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = (event.target.location.value);
    fetchCity(city)
    headingforform.reset();
    
    para.style.display ="none"
    sear.style.display ="none"
})