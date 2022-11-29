import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import drizzle from "./assets/drizzle.jpg";
import rain from "./assets/rain.jpg";
import atmosphere from "./assets/atmosphere.jpg";
import snow from "./assets/snow.jpg";

// TODO: consider moving this out to a util file
const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const returnDateFromUnix = (date) => {
  const unixDate = new Date(date * 1000);
  const formattedDate = unixDate.toLocaleString();
  console.log(formattedDate);
  return formattedDate;
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
  const app = document.getElementById("current-weather");
  const location = document.getElementById("location");
  const weatherDescription = document.getElementById("weather-description");
  const temp = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const dateChecked = document.getElementById("date-checked");
  const icon = document.getElementById("icon");

  location.innerText = `${locationData.name}, ${locationData.state}, ${locationData.country}`;
  weatherDescription.innerText = capitaliseFirstLetter(
    weatherPayload.weather[0].description
  );
  icon.src = `http://openweathermap.org/img/wn/${weatherPayload.weather[0].icon}.png`;
  temp.innerHTML = `${Math.round(
    weatherPayload.main.temp
  )}<span>&#176;</span>c`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    weatherPayload.main.feels_like
  )}<span>&#176;</span>c`;
  dateChecked.innerText = returnDateFromUnix(weatherPayload.dt);

  console.log(weatherPayload);
};

export { updateBackground, addWeatherToUI };
