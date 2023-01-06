const mainInfo = document.querySelector(".main_info")

// v-- this pulls info from th API in relation to the header form search 
function fetchFoundCity(foundCity) {
    const baseURL = `https://wttr.in/${foundCity}?format=j1`
    fetch(`${baseURL}`)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            const results = responseJSON.results
            results.forEach((result) => {
                console.log(result)

                const addCity = document.createElement(".main_article")
                addCity.className = ""

            })
        })
        .catch((error) => console.log(error))

}