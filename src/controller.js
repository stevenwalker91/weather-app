import * as weather from "./weather";
import * as display from "./display";

// when the city is updated, function is called to co-ordinate all the functions to be executed as a result
const orchestrateCityInput = async (defaultCity, cityInput) => {
  // first check if default city is true which allows a default to be called on page load
  let city;
  if (defaultCity === true) {
    city = "dundee";
  } else {
    city = cityInput.value;
  }

  // call function to get coords
  const coords = weather.getCoordinates(city);
  // when the promise is resolved, use promise all to get the current and future forecast
  const weatherData = coords.then((coords) => {
    const currentWeatherAPI = weather.getCurrentWeather(coords.lat, coords.lon);
    const futureForecastAPI = weather.getWeatherForecast(
      coords.lat,
      coords.lon
    );
    Promise.all([currentWeatherAPI, futureForecastAPI]).then(
      ([current, future]) => {
        display.updateBackground(current.weather[0].main);
        display.addWeatherToUI(current, coords, future);
      }
    );
  });

  // clear out the input field so user can easily research
  display.clearCityInput();
};

export { orchestrateCityInput };
