// Using Open Meteo API

// Weather codes translated
/* { 
  "0": "Clear sky",
  "1": "Mainly clear",
  "2": "Partly cloudy",
  "3": "Overcast",

  "45": "Fog",

  "51": "Drizzle",
  "61": "Rain",
  "71": "Snow",

  "80": "Rain showers",

  "95": "Thunderstorm"
} */

// APIs needed
// https://geocoding-api.open-meteo.com/v1/search?name={location}&count=1
// https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true

// Sample fetch API function
/* fetch(`https://geocoding-api.open-meteo.com/v1/search?name={userLocation}&count=1`)
  .then(res => res.json())
  .then(geo => {
    if (!geo.results) {
      console.log("City not found");
      return;
    }

    const { latitude, longitude } = geo.results[0];

    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
  })
  .then(res => res && res.json())
  .then(weather => {
    if (!weather) return;

    console.log(weather.current_weather);
  }); */