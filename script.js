const locationInput = document.getElementById("location-input");
const getWeatherBtn = document.getElementById("get-weather-btn");

const resultsContainer = document.getElementById("results");

const weatherDesc = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const apparentTemperature = document.getElementById("apparent-temperature");
// ...

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content loaded successfully.");
    locationInput.value = "";
});

const apiKey = "4d8fb5b93d4af21d66a2948710284366";
function getWeather() {
    // const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(locationInput.value);
        console.log(data.main);
        // const temp = data.main.temp;
        // const feels_like = data.main.feels_like;
        // const desc = data[0].description;
        // // ...

        // weatherDesc.innerHTML = desc;
        // temperature.innerHTML = temp;
        // apparentTemperature.innerHTML = feels_like;
    })
    .catch(err => console.error(err));
};

getWeatherBtn.onclick = getWeather();