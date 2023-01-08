
const headerForm = document.querySelector(".headerform")
const choose = document.querySelector('.choose')
const prevSearchText = document.querySelector('.preSearch')
const convertForm = document.querySelector('.convertor-form')
const h4result = document.querySelector('.h4_result')


const main_info_del = document.querySelector(".main-info")

headerForm.addEventListener("submit", (event) => {
    event.preventDefault();
   
    fetchCity( event.target.location.value.replace(/ /g,'+'))
    headerForm.reset();
    choose.style.display = 'none'
    prevSearchText.style.display = 'none'
})


//add another evenListener this is for the widdget
convertForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // class CelsiustoFarenheit
  const c = document.querySelector(".c").checked
  const f = document.querySelector(".f").checked
  if (c) {
     h4result.textContent =  parseFloat( FarenheitToCelcius(event.target.temp.value)).toFixed(2) + "° Celsius"
  }
if (f){
    h4result.textContent = parseFloat(CelciustoFarenheit(event.target.temp.value)).toFixed(2)+ "° Fahrenheit"
}
})