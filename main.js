const textInput = document.querySelector("#submit")

textInput.addEventListener("click", handleSubmitinForm)

function handleSubmitinForm(){
    handleClick.preventDefault()
    const userSearch = document.querySelector("#search").value
    const BASE_URL = `https://wttr.in/${userSearch}?format=j1`
    fetch(BASE_URL)
        .then((response) => response.json())
        .then((results) => { 
            console.log(results)
        })
        .catch((error) => {
            console.log(error)
        })
}