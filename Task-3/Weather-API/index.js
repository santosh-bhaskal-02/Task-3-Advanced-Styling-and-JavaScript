const form = document.getElementById("weather-form");
const weatherDisplay = document.getElementById("weather-display");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&country=IN`;
    const geoResponse = await fetch(geocodingUrl);

    if (!geoResponse.ok) {
      throw new Error("Failed to fetch location data");
    }

    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found in India");
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    displayWeather(weatherData.current_weather, name);
    updateBackground(weatherData.current_weather.weathercode);
  } catch (error) {
    weatherDisplay.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});

function displayWeather(weather, cityName) {
  const condition =
    weather.weathercode === 0 ? "Clear" : weather.weathercode < 3 ? "Cloudy" : "Rainy";

  const icon = condition === "Clear" ? "☀️" : condition === "Cloudy" ? "☁️" : "🌧️";
  weatherDisplay.innerHTML = `
    <div class="weather-card">
      <h2>${cityName}, India</h2>
        <p class="weather-icon">${icon}</p>
      <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
     <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
    </div>
  `;
}
function updateBackground(weatherCode) {
  document.body.className = "";
  if (weatherCode === 0) {
    document.body.classList.add("sunny");
  } else if (weatherCode < 3) {
    document.body.classList.add("cloudy");
  } else if (weatherCode < 8) {
    document.body.classList.add("rainy");
  } else {
    document.body.classList.add("snowy");
  }
}
