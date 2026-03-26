const locationInput = document.getElementById("location-input");
const customDropdown = document.getElementById("custom-dropdown");

locationInput.addEventListener("input", () => {
    const filter = locationInput.value.toLowerCase();
    const options = customDropdown.getElementsByTagName("li");

    let hasVisibleOptions = false;
    for (let option of options) {
        if (option.textContent.toLowerCase().includes(filter)) {
            option.style.display = "block";
            hasVisibleOptions = true;
        } else {
            option.style.display = "none";
        }
    }

    customDropdown.classList.toggle("hidden", !hasVisibleOptions);
});

customDropdown.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        locationInput.value = event.target.textContent;
        customDropdown.classList.add("hidden");
    }
});

document.addEventListener("click", (event) => {
    if (!customDropdown.contains(event.target) && event.target !== locationInput) {
        customDropdown.classList.add("hidden");
    }
});

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
    
const weatherCodeMap = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",

  45: "Fog",

  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Heavy drizzle",

  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",

  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",

  80: "Light rain showers",
  81: "Moderate rain showers",
  82: "Heavy rain showers",

  95: "Thunderstorm",
  96: "Thunderstorm with light hail",
  99: "Thunderstorm with heavy hail"
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
        const description = weatherCodeMap[code] ?? "Unknown weather";
        weatherIcon.style.display = "block";
        weatherIcon.src = `https://open-meteo.com/images/weather-icons/${code}.png`;
        weatherDesc.textContent = `Weather: ${description}`;
        temperature.textContent = `Temperature: ${weather.current.temperature_2m}°C`;
        apparentTemperature.textContent = `Feels Like: ${weather.current.apparent_temperature}°C`;
        meanTemperature.textContent = `Mean Temperature: ${weather.daily.temperature_2m_mean[0]}°C`;
        // ...
    })
    .catch(err => console.error(err));
});
};

getWeatherBtn.onclick = getWeather;