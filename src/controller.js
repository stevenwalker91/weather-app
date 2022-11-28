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
  const coords = weather
    .getCoordinates(cityInput.value)
    .then((data) => {
      const currentWeather = weather.getCurrentWeather(data.lat, data.lon);
      return { currentWeather, data };
    })
    .then((fulfilled) => {
      console.log(fulfilled.currentWeather);
      display.updateBackground(fulfilled.weather[0].main);
      display.addWeatherToUI(fulfilled);
    })
    .catch((err) => {
      console.log(err);
    });
  // clear out the input field
  cityInput.value = "";
};

export { orchestrateCityInput };
