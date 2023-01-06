//adding info for weather button

const headingforform= document.querySelector("form")
const para = document.querySelector(".location")
const sear = document.querySelector(".searches")
const convertTheForm = document.querySelector(".converter-form")
//

headingforform.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = (event.target.location.value);
    fetchCity(city)
    headingforform.reset();

    para.style.display ="none"
    sear.style.display ="none"

 
})
   //adding another eventlistener this for the degrees widget
   convertTheForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // class CelsiustoFarenheit
    
  
    
})