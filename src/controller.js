import * as weather from "./weather";
import * as display from "./display";

const cityInput = document.getElementById("city-search");

// when the city us updated, function is called to co-ordinate all the functions to be executed as a result
const orchestrateCityInput = async (defaultCity) => {
  // first check if default city is true which allows a default to be called on page load
  let city;
  if (defaultCity === true) {
    city = "dundee";
  } else {
    city = cityInput.value;
  }
  const coords = weather.getCoordinates(city);
  const weatherData = coords.then((data) => {
    console.log(data);
    const currentWeather = weather.getCurrentWeather(data.lat, data.lon);
    return currentWeather;
  });

  return Promise.all([coords, weatherData])
    .then(([coords, weatherData]) => {
      display.updateBackground(weatherData.weather[0].main);
      display.addWeatherToUI(weatherData, coords);
    })
    .catch((err) => {
      console.log(err);
    });
  // clear out the input field
  cityInput.value = "";
};

export { orchestrateCityInput };
