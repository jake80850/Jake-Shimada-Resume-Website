async function loadWeather() {
  const apiKey = "270feddf0343084cbe5c92639593973f";
  const city = "San Jose";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=imperial`;

  const target = document.getElementById("weather-display");

  if (!target) {
    console.error("No element with id 'weather-display' found in the HTML.");
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const msg = data?.message || "Unknown error from OpenWeather";
      console.error("OpenWeather error:", response.status, msg);

      target.innerHTML = `Weather error: ${response.status} – ${msg}`;
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;

    // ⭐ ADD THIS — update HERO temperature
    const heroTemp = document.getElementById("hero-temp");
    if (heroTemp) heroTemp.textContent = `${Math.round(temp)}°F`;

    // Existing weather card output
    target.innerHTML = `
      <strong>${data.name}</strong><br>
      ${Math.round(temp)}°F · ${desc}<br>
      Humidity: ${humidity}%
    `;
  } catch (err) {
    console.error("Fetch failed:", err);
    target.innerHTML = "Unable to load weather data. Please try again later.";
  }
}

document.addEventListener("DOMContentLoaded", loadWeather);
