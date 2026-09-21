const weatherForm = document.querySelector(".weatherForm")
const weatherInput = document.querySelector("#weatherInput")
const cardDisplay = document.querySelector(".card")

const apiKey = "7f05789e9a5d62d25c60f6529ecb614c"

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const city = weatherInput.value

    if(city) {
        try {
            const weatherData = await getWeatherData(city)
            showWeatherInfo(weatherData)

            errorDisplay.style.display = "none"
        } catch (error) {
            console.error(error)
            showError(error)
        }
    } else {
        showError("Please enter city name!")
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    const data = await fetch(apiUrl)

    if(!data.ok) {
        throw new Error("Shahar topilmadi!")
    }
    return data.json()
}

function showWeatherInfo(data) {
    cardDisplay.style.display = "flex"
    cityDisplay.textContent = data.name
    degDisplay.textContent = `${(data.main.temp - 273.15).toFixed(2)}°`
    cloudDisplay.textContent = data.weather[0].main
    console.log(data)
    infoDisplay.textContent = `Humidity: ${data.main.humidity}%`
}

function showError(msg) {
    cardDisplay.textContent = ""
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = msg
    cardDisplay.style.display = "flex"

    cardDisplay.append(errorDisplay)
}