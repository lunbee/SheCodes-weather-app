function formatDate(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
    if (hours < 10){
        hours = `0${hours}`
    }

    let minutes = date.getMinutes()
    if (minutes < 10){
       minutes = `0${minutes}`
    }


    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
        ]
        
    let day = days[date.getDay()]
    
    return `${days[day]} ${hours}:${minutes}`
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast")

    let forecastHTML = `<div class="row">`
    let days = ["Thu", "Fri", "Sat", "Sun"]
    days.forEach(function(day) {

    forecastHTML = 
        forecastHTML + 

           `
            <div class="col-2">
                <div class="weather-forecast-date">
                ${day}
                </div>
                <img 
                src="http://openweathermap.org/img/wn/02d@2x.png" 
                alt="" 
                width="35"/>
                <div class="min-max-temperature"> <span class="max-temperature">
                18° </span><span class="min-temperature">12°</span> 
            </div>
        </div>`

    })


    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML

}


function displayTemperature(response) {


    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round (response.data.main.temp)

    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name

    let weatherDescription = document.querySelector("#weather-description")
    weatherDescription.innerHTML = response.data.weather[0].description

    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = response.data.main.humidity

    let windSpeed = document.querySelector("#wind-speed")
    windSpeed.innerHTML = Math.round (response.data.wind.speed)

     let dateElement = document.querySelector("#date")
    dateElement.innerHTML = formatDate(response.data.dt * 1000)

    let iconElement = document.querySelector("#icon")
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` ) 

    iconElement.setAttribute("alt", response.data.weather[0].description )

    celciusTemperature = response.data.main.temp


}

search("New York")
displayForecast()


function search(city){

    let apiKey = "adc68ed824eaa0c6b8e179f70c0efacc"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);
}



function handleSubmit(event) {
    event.preventDefault()
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value)
    
}

function displayFahrenheit (event){
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
 
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32
    temperatureElement.innerHTML = Math.round (fahrenheitTemperature)

}

function displayCelcius (event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celciusTemperature)
}

let celciusTemperature = null



let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

let fahrenheit = document.querySelector("#fahrenheit")
fahrenheit.addEventListener("click", displayFahrenheit)

let celcius = document.querySelector("#celcius")
celcius.addEventListener("click", displayCelcius)




