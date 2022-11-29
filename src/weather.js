// To get started with project only. Once project is up and running, explore using GitHub secrets as an alternative going forward
const key = "1b98fd1c628af9f19174dd392caa9780";

const getCoordinates = async (location = "dundee") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`
    );
    const coords = await response.json();
    // TODO: some logic so if the coords response is blank, prompt the user
    return coords[0];
  } catch (err) {
    console.log(err);
  }
};

const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=metric&appid=${key}`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    console.log(err);
  }
};

const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    );
    const forecastData = await response.json();
    return forecastData;
  } catch (err) {
    console.log(err);
  }
};

export { getCoordinates, getCurrentWeather, getWeatherForecast };
