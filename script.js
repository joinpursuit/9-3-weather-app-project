//adding info for weather button

const headingforform= document.querySelector("form")
const para = document.querySelector(".location")
const sear = document.querySelector(".searches")
const convertTheForm = document.querySelector(".converter-form")
const h4_result = document.querySelector(".h4_result")
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
    const c = document.querySelector(".c").checked
  
  const f = document.querySelector(".f").checked
  if (c === true) {
   h4_result.textContent = parseFloat(FarenheitToCelcius(event.target.temp.value)).toFixed(2) + " degrees "
   
  }
if (f === true){
    h4_result.textContent = parseFloat(CelciustoFarenheit(event.target.temp.value)).toFixed(2) + " degrees "
}
    
    
   
})
