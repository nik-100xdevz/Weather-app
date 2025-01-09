const apikey = "54fd22122cf9c137aa332bd4fabcf9c5";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update weather information
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + " km/h";

        // Update weather icon based on conditions
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "./asset/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "./asset/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "./asset/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "./asset/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "./asset/mist.png";
                break;
            default:
                weatherIcon.src = "./asset/clear.png"; // Default icon
                break;
        }

        // Show weather section
        weatherSection.style.display = "block";
    } catch (error) {
        console.error(error);
        alert("City not found. Please enter a valid city name.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
