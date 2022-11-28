import * as weather from "./weather";
import "./style.css";

(async () => {
  console.log(await weather.getCoordinates("cardiff"));
})();

const coords = weather
  .getCoordinates("cardiff")
  .then((data) => {
    const currentWeather = weather.getCurrentWeather(data.lat, data.lon);
    return currentWeather;
  })
  .then((fulfilled) => {
    console.log(fulfilled);
  })
  .catch((err) => {
    console.log(err);
  });
