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

  // call function to get coords and when get the weather when promise resolved
  const coords = weather.getCoordinates(city);
  const weatherData = coords.then((data) => {
    const currentWeather = weather.getCurrentWeather(data.lat, data.lon);
    return currentWeather;
  });

  // clear out the input field so user can easily research
  display.clearCityInput();

  //by then using promise all, we can also get the initial coords data
  return Promise.all([coords, weatherData])
    .then(([coords, weatherData]) => {
      display.updateBackground(weatherData.weather[0].main);
      display.addWeatherToUI(weatherData, coords);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { orchestrateCityInput };
