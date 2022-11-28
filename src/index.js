import * as weather from "./weather";
import "./style.css";

const coords = weather
  .getCoordinates("carnoustie")
  .then((data) => {
    const currentWeather = weather.getCurrentWeather(data.lat, data.lon);
    return currentWeather;
  })
  .then((fulfilled) => {
    //console.log(fulfilled);
  })
  .catch((err) => {
    console.log(err);
  });
