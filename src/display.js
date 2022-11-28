import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import drizzle from "./assets/drizzle.jpg";
import rain from "./assets/rain.jpg";
import atmosphere from "./assets/atmosphere.jpg";
import snow from "./assets/snow.jpg";

const updateBackground = (condition) => {
  const app = document.getElementById("app");
  let url = condition.toLowerCase();
  const atmpospheric = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
  ];

  if (atmpospheric.indexOf(condition) !== -1) {
    url = "atmosphere";
  }
  app.style.backgroundImage = `linear-gradient(to right, rgb(255 255 255 / 0%), rgb(0 0 0 / 45%)),url(\"assets/${url}.jpg\")`;
};

const addWeatherToUI = (weatherPayload, locationData) => {
  const app = document.getElementById("current-weather");
  const location = document.getElementById("location");
  const weatherDescription = document.getElementById("weather-description");

  location.innerText = `${locationData.name}, ${locationData.state}`;
  weatherDescription = weatherPayload.weather[0].description;
  console.log(weatherPayload);
};

export { updateBackground, addWeatherToUI };
