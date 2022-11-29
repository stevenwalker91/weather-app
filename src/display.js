import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import drizzle from "./assets/drizzle.jpg";
import rain from "./assets/rain.jpg";
import atmosphere from "./assets/atmosphere.jpg";
import snow from "./assets/snow.jpg";
import * as utils from "./utils";

const clearCityInput = () => {
  const city = document.getElementById("city-search");
  city.value = "";
};

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
  // list out all the elements to update
  const location = document.getElementById("location");
  const weatherDescription = document.getElementById("weather-description");
  const temp = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const dateChecked = document.getElementById("date-checked");
  const icon = document.getElementById("icon");
  const windSpeed = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");

  // LOCATION
  location.innerText = `${locationData.name}, ${locationData.state}`;

  // DESCRIPTION
  weatherDescription.innerText = utils.capitaliseFirstLetter(
    weatherPayload.weather[0].description
  );

  // ICON
  icon.innerText = utils.getIcon(
    weatherPayload.weather[0].id,
    utils.checkDayTime(utils.returnDateFromUnix(weatherPayload.dt))
  );

  // TEMPERATURE
  temp.innerHTML = `${Math.round(
    weatherPayload.main.temp
  )}<span>&#176;</span>c`;

  // FEELS LIKE TEMPERATURE
  feelsLike.innerHTML = `${Math.round(
    weatherPayload.main.feels_like
  )}<span>&#176;</span>c`;

  // DATE AND TIME
  dateChecked.innerText = utils
    .returnDateFromUnix(weatherPayload.dt)
    .toLocaleString();

  // WIND
  windSpeed.innerText = `${Math.round(weatherPayload.wind.speed)}`;
  // rotate the wind icon to show the appropriate direction (minus from 360 to reverse it)
  windDirection.style.transform = `rotate(${360 - weatherPayload.wind.deg}deg)`;
  utils.checkDayTime(utils.returnDateFromUnix(weatherPayload.dt));
};

export { updateBackground, addWeatherToUI, clearCityInput };
