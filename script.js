const API_KEY = "8e68f00037a84293b2b45453251208"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(`${lat},${lon}`);
        });
    }
});


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});
async function fetchWeather(query) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("City not found!");
            return;
        }

        document.getElementById("tempC").innerHTML = `${data.current.temp_c}°C`;
        document.getElementById("tempF").innerHTML = `${data.current.temp_f}°F`;
        document.getElementById("weatherDesc").innerHTML = data.current.condition.text;
        document.getElementById("locationName").innerHTML = `${data.location.name}, ${data.location.country}`;
        document.getElementById("feelsLike").innerHTML = data.current.feelslike_c;
        document.getElementById("visibility").innerHTML = data.current.vis_km;
        document.getElementById("windSpeed").innerHTML = data.current.wind_kph;
        document.getElementById("windDir").innerHTML = data.current.wind_dir;
        document.getElementById("humidity").innerHTML = data.current.humidity;
        document.getElementById("uvIndex").innerHTML = data.current.uv;
        document.getElementById("pressure").innerHTML = data.current.pressure_in;
        document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Something went wrong. Please try again.");
    }
}

