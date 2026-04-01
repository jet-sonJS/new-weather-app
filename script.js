const locationInput = document.getElementById("location-input");

const getWeatherBtn = document.getElementById("get-weather-btn");

const resultsContainer = document.getElementById("results");

const weatherIcon = document.getElementById("weather-icon");
const weatherDesc = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const apparentTemperature = document.getElementById("apparent-temperature");
const meanTemperature = document.getElementById("mean-temperature");
// ...

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content loaded successfully.");
    locationInput.value = "";
});

function getWeather() {
    
const weatherInfo = {
  0:  { desc: "Clear sky", img: "clear.gif" },
  1:  { desc: "Mostly clear", img: "partly_cloudy.gif" },
  2:  { desc: "Partly cloudy", img: "partly_cloudy.gif" },
  3:  { desc: "Overcast", img: "cloudy.gif" },

  45: { desc: "Fog", img: "fog.gif" },

  51: { desc: "Light drizzle", img: "drizzle.gif" },
  53: { desc: "Moderate drizzle", img: "drizzle.gif" },
  55: { desc: "Heavy drizzle", img: "drizzle.gif" },

  61: { desc: "Light rain", img: "rain.gif" },
  63: { desc: "Moderate rain", img: "rain.gif" },
  65: { desc: "Heavy rain", img: "rain.gif" },

  71: { desc: "Light snow", img: "snow.gif" },
  73: { desc: "Moderate snow", img: "snow.gif" },
  75: { desc: "Heavy snow", img: "snow.gif" },

  80: { desc: "Light rain showers", img: "showers.gif" },
  81: { desc: "Moderate rain showers", img: "showers.gif" },
  82: { desc: "Heavy rain showers", img: "showers.gif" },

  95: { desc: "Thunderstorm", img: "thunder.gif" },
  96: { desc: "Thunderstorm with light hail", img: "thunder_hail.gif" },
  99: { desc: "Thunderstorm with heavy hail", img: "thunder_hail.gif" }
};

fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationInput.value}&count=1`)
  .then(res => res.json())
  .then(geo => {
    if (!geo.results) {
      console.log("City not found");
      return;
    }

    const { latitude, longitude } = geo.results[0];

        const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,weather_code,sunset,temperature_2m_mean&hourly=is_day&current=temperature_2m,is_day,apparent_temperature,weather_code`;

    fetch(api)
    .then(res => res.json())
    .then(weather => {
        console.log(weather);
        const code = weather.current.weather_code;
        const info = weatherInfo[code] ?? { desc: "Unknown weather", img: "unknown.gif" };
        weatherDesc.textContent = `Weather: ${info.desc}`;
        resultsContainer.style.display = "block";
        weatherIcon.style.display = "block";
        weatherIcon.src = `images/${info.img}`;
        weatherDesc.textContent = `Weather: ${info.desc}`;
        temperature.textContent = `Temperature: ${weather.current.temperature_2m}°C`;
        apparentTemperature.textContent = `Feels Like: ${weather.current.apparent_temperature}°C`;
        meanTemperature.textContent = `Mean Temperature: ${weather.daily.temperature_2m_mean[0]}°C`;
        // ...
    })
    .catch(err => console.error(err));
});
};

getWeatherBtn.onclick = getWeather;

// Autocomplete not working, will implement it later
// Need to fetch city names and filter them based on user input, then display suggestions in a dropdown.
// Need to find a way to style datalist tags, because for some reason they are "impossible" to style, but I will find a workaround for that.