// To get started with project only. Once project is up and running, explore using GitHub secrets as an alternative going forward
const key = "1b98fd1c628af9f19174dd392caa9780";

const getCoordinates = async (location = "dundee") => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`
    );
    const coords = await response.json();
    const lat = coords[0].lat;
    const lon = coords[0].lon;
    // TODO: some logic so if the coords response is blank, prompt the user
    return { lat, lon };
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

export { getCoordinates, getCurrentWeather };
