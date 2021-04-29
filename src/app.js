function displayTemperature(response) {
   console.log(response.data)

    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round (response.data.main.temp)

    let cityElement = document.querySelector("#city-input")
    cityElement.innerHTML = response.data.name

    let weatherDescription = document.querySelector("#weather-description")
    weatherDescription.innerHTML = response.data.weather[0].description

    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = response.data.main.humidity

    let windSpeed = document.querySelector("#wind-speed")
    windSpeed.innerHTML = response.data.wind.speed
}

let apiKey = "adc68ed824eaa0c6b8e179f70c0efacc"
let city = "amsterdam"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
console.log(apiUrl)

axios.get(apiUrl).then(displayTemperature);


