/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orchestrateCityInput": () => (/* binding */ orchestrateCityInput)
/* harmony export */ });
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/weather.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.js");



// when the city is updated, function is called to co-ordinate all the functions to be executed as a result
const orchestrateCityInput = async (defaultCity, cityInput) => {
  // update UI to inicate loading
  _display__WEBPACK_IMPORTED_MODULE_1__.manageLoading();

  // check if default city is true which allows a default to be called on page load
  let city;
  if (defaultCity === true) {
    city = "dundee";
  } else {
    city = cityInput.value;
  }

  // call function to get coords
  const coords = _weather__WEBPACK_IMPORTED_MODULE_0__.getCoordinates(city);
  // when the promise is resolved, use promise all to get the current and future forecast
  const weatherData = coords.then(coords => {
    const currentWeatherAPI = _weather__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeather(coords.lat, coords.lon);
    const futureForecastAPI = _weather__WEBPACK_IMPORTED_MODULE_0__.getWeatherForecast(coords.lat, coords.lon);
    Promise.all([currentWeatherAPI, futureForecastAPI]).then(_ref => {
      let [current, future] = _ref;
      _display__WEBPACK_IMPORTED_MODULE_1__.updateBackground(current.weather[0].main);
      _display__WEBPACK_IMPORTED_MODULE_1__.addWeatherToUI(current, coords, future);
      // now remove the loading view that promise is resolved
      _display__WEBPACK_IMPORTED_MODULE_1__.manageLoading();
    });
  });

  // clear out the input field so user can easily research
  _display__WEBPACK_IMPORTED_MODULE_1__.clearCityInput();
};


/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addWeatherToUI": () => (/* binding */ addWeatherToUI),
/* harmony export */   "clearCityInput": () => (/* binding */ clearCityInput),
/* harmony export */   "manageLoading": () => (/* binding */ manageLoading),
/* harmony export */   "updateBackground": () => (/* binding */ updateBackground)
/* harmony export */ });
/* harmony import */ var _assets_clear_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/clear.jpg */ "./src/assets/clear.jpg");
/* harmony import */ var _assets_clouds_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/clouds.jpg */ "./src/assets/clouds.jpg");
/* harmony import */ var _assets_drizzle_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/drizzle.jpg */ "./src/assets/drizzle.jpg");
/* harmony import */ var _assets_rain_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/rain.jpg */ "./src/assets/rain.jpg");
/* harmony import */ var _assets_atmosphere_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/atmosphere.jpg */ "./src/assets/atmosphere.jpg");
/* harmony import */ var _assets_snow_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/snow.jpg */ "./src/assets/snow.jpg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/utils.js");







const clearCityInput = () => {
  const city = document.getElementById("city-search");
  city.value = "";
};
const updateBackground = condition => {
  const app = document.getElementById("app");
  let url = condition.toLowerCase();
  const atmpospheric = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado"];
  if (atmpospheric.indexOf(condition) !== -1) {
    url = "atmosphere";
  }
  app.style.backgroundImage = `linear-gradient(to right, rgb(255 255 255 / 0%), rgb(0 0 0 / 45%)),url(\"assets/${url}.jpg\")`;
};
const addWeatherToUI = (weatherPayload, locationData, futureWeather) => {
  // list out all the elements to update
  const location = document.getElementById("location");
  const weatherDescription = document.getElementById("weather-description");
  const temp = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const dateChecked = document.getElementById("date-checked");
  const icon = document.getElementById("icon");
  const windSpeed = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");
  const rainChance = document.getElementById("rain-chance");

  // LOCATION
  location.innerText = `${locationData.name}, ${locationData.state}`;

  // DESCRIPTION
  weatherDescription.innerText = _utils__WEBPACK_IMPORTED_MODULE_6__.capitaliseFirstLetter(weatherPayload.weather[0].description);

  // ICON
  icon.innerText = _utils__WEBPACK_IMPORTED_MODULE_6__.getIcon(weatherPayload.weather[0].id, _utils__WEBPACK_IMPORTED_MODULE_6__.checkDayTime(_utils__WEBPACK_IMPORTED_MODULE_6__.returnDateFromUnix(weatherPayload.dt)));

  // TEMPERATURE
  temp.innerHTML = `${Math.round(weatherPayload.main.temp)}<span>&#176;</span>c`;

  // FEELS LIKE TEMPERATURE
  feelsLike.innerHTML = `${Math.round(weatherPayload.main.feels_like)}<span>&#176;</span>c`;

  // DATE AND TIME
  dateChecked.innerText = _utils__WEBPACK_IMPORTED_MODULE_6__.returnDateFromUnix(weatherPayload.dt).toLocaleString();

  // WIND
  windSpeed.innerText = `${Math.round(weatherPayload.wind.speed)}`;
  // rotate the wind icon to show the appropriate direction (minus from 360 to reverse it)
  windDirection.style.transform = `rotate(${360 - weatherPayload.wind.deg}deg)`;
  _utils__WEBPACK_IMPORTED_MODULE_6__.checkDayTime(_utils__WEBPACK_IMPORTED_MODULE_6__.returnDateFromUnix(weatherPayload.dt));

  // CHANCE OF RAIN
  rainChance.innerText = `${futureWeather.list[0].pop * 100}%`;
};
const manageLoading = () => {
  const currentWeatherDialog = document.getElementById("current-weather");
  const spinner = document.getElementById("spinner");
  spinner.classList.toggle("show");
  currentWeatherDialog.classList.toggle("hide");
};


/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");

const cityForm = document.getElementById("city-form");
cityForm.addEventListener("submit", event => {
  event.preventDefault();
  _controller__WEBPACK_IMPORTED_MODULE_0__.orchestrateCityInput(false, event.target[0]);
});
window.addEventListener("load", event => {
  _controller__WEBPACK_IMPORTED_MODULE_0__.orchestrateCityInput(true);
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitaliseFirstLetter": () => (/* binding */ capitaliseFirstLetter),
/* harmony export */   "checkDayTime": () => (/* binding */ checkDayTime),
/* harmony export */   "getIcon": () => (/* binding */ getIcon),
/* harmony export */   "returnDateFromUnix": () => (/* binding */ returnDateFromUnix)
/* harmony export */ });
const capitaliseFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const returnDateFromUnix = date => {
  const unixDate = new Date(date * 1000);
  return unixDate;
};
const getIcon = (weatherID, dayTime) => {
  let icon;
  if (weatherID >= 200 && weatherID < 300) {
    icon = "thunderstorm";
  }
  if (weatherID >= 300 && weatherID < 600) {
    icon = "rainy";
  }
  if (weatherID >= 600 && weatherID < 700) {
    icon = "ac_unit";
  }
  if (weatherID === 800) {
    icon = "clear_";
  }
  if (weatherID === 801 || weatherID === 802) {
    icon = "partly_cloudy_";
  }
  if (weatherID === 803 || weatherID === 804) {
    icon = "cloudy";
  }
  if (weatherID >= 700 && weatherID < 800) {
    icon = "foggy";
  }
  if (weatherID >= 800 && weatherID <= 802) {
    icon += dayTime;
  }

  //error handler for if no icon is available
  if (icon === undefined) {
    icon = "disabled_by_default";
  }

  // TODO add icon for 700 range

  return icon;
};
const checkDayTime = dateTime => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  let daytime;
  if (hours >= 6 && hours <= 20) {
    daytime = "day";
  } else {
    daytime = "night";
  }
  return daytime;
};


/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoordinates": () => (/* binding */ getCoordinates),
/* harmony export */   "getCurrentWeather": () => (/* binding */ getCurrentWeather),
/* harmony export */   "getWeatherForecast": () => (/* binding */ getWeatherForecast)
/* harmony export */ });
// To get started with project only. Once project is up and running, explore using GitHub secrets as an alternative going forward
const key = "1b98fd1c628af9f19174dd392caa9780";
const getCoordinates = async function () {
  let location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "dundee";
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`);
    const coords = await response.json();
    // TODO: some logic so if the coords response is blank, prompt the user
    return coords[0];
  } catch (err) {
    console.log(err);
  }
};
const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=metric&appid=${key}`);
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    console.log(err);
  }
};
const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    const forecastData = await response.json();
    return forecastData;
  } catch (err) {
    console.log(err);
  }
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0px;\n    color: white;\n    font-family: 'Roboto', sans-serif;\n}\n\n#app {\n    min-height: 100vh;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n#current-weather>.inner-container {\n    background-color: rgba(1, 1, 1, 0.6);\n    padding: 30px;\n    border-radius: 10px;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    row-gap: 20px;\n    align-items: center;\n}\n\n#details-container {\n    grid-column: 1/3;\n    gap: 10px;\n}\n\n.detail-container {\n    padding: 10px;\n    flex-direction: column;\n    gap: 0.5em;\n    justify-content: space-between;\n    align-items: center;\n    border: 1px solid black;\n    border-radius: 5px;\n    background-color: rgb(0 0 0 / 34%);\n}\n\n.detail-title {\n    text-transform: uppercase;\n    font-size: 0.7em;\n    align-self: flex-end;\n\n}\n\n#current-weather {\n    justify-content: center;\n}\n\n#forecast-weather {\n    background-color: rgba(1, 1, 1, 0.6);\n\n}\n\n#temperature {\n    font-size: 7em;\n}\n\n#icon {\n    font-size: 8em;\n}\n\nlabel {\n    display: none;\n}\n\nform {\n    margin: 10px;\n}\n\n.flex {\n    display: flex;\n}\n\n.grid {\n    display: grid;\n}\n\nheader {\n    justify-content: flex-end;\n}\n\ninput {\n    box-shadow: none;\n    padding: 8px;\n}\n\n@media (max-width: 630px) {\n    #details-container {\n        flex-direction: column;\n        width: 100%;\n    }\n    .inner-container {\n        display: flex;\n        flex-direction: column;\n        min-width: 75%;\n\n    }\n\n    #temperature {\n        font-size: 4em;\n    }\n    \n    #icon {\n        font-size: 6em;\n    }\n}\n\n\n\n@media (max-height: 750px) and (max-width: 4630px) {\n    .detail-container {\n        flex-direction: row;\n\n    }\n\n}\n\n.loader {\n    width: 48px;\n    height: 48px;\n    border: 5px solid rgb(0, 0, 0);\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    display: none;\n    box-sizing: border-box;\n    animation: rotation 1s linear infinite;\n    align-self: center;\n    }\n\n    @keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n    } \n\n\n    #current-weather.hide {\n        display: none;\n    }\n\n    #spinner.show {\n        display: inline-block;\n    }", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,iBAAiB;IACjB,4BAA4B;IAC5B,sBAAsB;IACtB,2BAA2B;IAC3B,sBAAsB;IACtB,8BAA8B;AAClC;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,qBAAqB;IACrB,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,UAAU;IACV,8BAA8B;IAC9B,mBAAmB;IACnB,uBAAuB;IACvB,kBAAkB;IAClB,kCAAkC;AACtC;;AAEA;IACI,yBAAyB;IACzB,gBAAgB;IAChB,oBAAoB;;AAExB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,oCAAoC;;AAExC;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,gBAAgB;IAChB,YAAY;AAChB;;AAEA;IACI;QACI,sBAAsB;QACtB,WAAW;IACf;IACA;QACI,aAAa;QACb,sBAAsB;QACtB,cAAc;;IAElB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;AACJ;;;;AAIA;IACI;QACI,mBAAmB;;IAEvB;;AAEJ;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,8BAA8B;IAC9B,gCAAgC;IAChC,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,sCAAsC;IACtC,kBAAkB;IAClB;;IAEA;IACA;QACI,uBAAuB;IAC3B;IACA;QACI,yBAAyB;IAC7B;IACA;;;IAGA;QACI,aAAa;IACjB;;IAEA;QACI,qBAAqB;IACzB","sourcesContent":["body {\n    margin: 0px;\n    color: white;\n    font-family: 'Roboto', sans-serif;\n}\n\n#app {\n    min-height: 100vh;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n#current-weather>.inner-container {\n    background-color: rgba(1, 1, 1, 0.6);\n    padding: 30px;\n    border-radius: 10px;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    row-gap: 20px;\n    align-items: center;\n}\n\n#details-container {\n    grid-column: 1/3;\n    gap: 10px;\n}\n\n.detail-container {\n    padding: 10px;\n    flex-direction: column;\n    gap: 0.5em;\n    justify-content: space-between;\n    align-items: center;\n    border: 1px solid black;\n    border-radius: 5px;\n    background-color: rgb(0 0 0 / 34%);\n}\n\n.detail-title {\n    text-transform: uppercase;\n    font-size: 0.7em;\n    align-self: flex-end;\n\n}\n\n#current-weather {\n    justify-content: center;\n}\n\n#forecast-weather {\n    background-color: rgba(1, 1, 1, 0.6);\n\n}\n\n#temperature {\n    font-size: 7em;\n}\n\n#icon {\n    font-size: 8em;\n}\n\nlabel {\n    display: none;\n}\n\nform {\n    margin: 10px;\n}\n\n.flex {\n    display: flex;\n}\n\n.grid {\n    display: grid;\n}\n\nheader {\n    justify-content: flex-end;\n}\n\ninput {\n    box-shadow: none;\n    padding: 8px;\n}\n\n@media (max-width: 630px) {\n    #details-container {\n        flex-direction: column;\n        width: 100%;\n    }\n    .inner-container {\n        display: flex;\n        flex-direction: column;\n        min-width: 75%;\n\n    }\n\n    #temperature {\n        font-size: 4em;\n    }\n    \n    #icon {\n        font-size: 6em;\n    }\n}\n\n\n\n@media (max-height: 750px) and (max-width: 4630px) {\n    .detail-container {\n        flex-direction: row;\n\n    }\n\n}\n\n.loader {\n    width: 48px;\n    height: 48px;\n    border: 5px solid rgb(0, 0, 0);\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    display: none;\n    box-sizing: border-box;\n    animation: rotation 1s linear infinite;\n    align-self: center;\n    }\n\n    @keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n    } \n\n\n    #current-weather.hide {\n        display: none;\n    }\n\n    #spinner.show {\n        display: inline-block;\n    }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/atmosphere.jpg":
/*!***********************************!*\
  !*** ./src/assets/atmosphere.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/atmosphere.jpg";

/***/ }),

/***/ "./src/assets/clear.jpg":
/*!******************************!*\
  !*** ./src/assets/clear.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/clear.jpg";

/***/ }),

/***/ "./src/assets/clouds.jpg":
/*!*******************************!*\
  !*** ./src/assets/clouds.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/clouds.jpg";

/***/ }),

/***/ "./src/assets/drizzle.jpg":
/*!********************************!*\
  !*** ./src/assets/drizzle.jpg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/drizzle.jpg";

/***/ }),

/***/ "./src/assets/rain.jpg":
/*!*****************************!*\
  !*** ./src/assets/rain.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/rain.jpg";

/***/ }),

/***/ "./src/assets/snow.jpg":
/*!*****************************!*\
  !*** ./src/assets/snow.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/snow.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/weather.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOzs7Ozs7Ozs7Ozs7OztBQ0FxQztBQUNoQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdlYXRoZXIgZnJvbSBcIi4vd2VhdGhlclwiO1xuaW1wb3J0ICogYXMgZGlzcGxheSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5cbi8vIHdoZW4gdGhlIGNpdHkgaXMgdXBkYXRlZCwgZnVuY3Rpb24gaXMgY2FsbGVkIHRvIGNvLW9yZGluYXRlIGFsbCB0aGUgZnVuY3Rpb25zIHRvIGJlIGV4ZWN1dGVkIGFzIGEgcmVzdWx0XG5jb25zdCBvcmNoZXN0cmF0ZUNpdHlJbnB1dCA9IGFzeW5jIChkZWZhdWx0Q2l0eSwgY2l0eUlucHV0KSA9PiB7XG4gIC8vIHVwZGF0ZSBVSSB0byBpbmljYXRlIGxvYWRpbmdcbiAgZGlzcGxheS5tYW5hZ2VMb2FkaW5nKCk7XG5cbiAgLy8gY2hlY2sgaWYgZGVmYXVsdCBjaXR5IGlzIHRydWUgd2hpY2ggYWxsb3dzIGEgZGVmYXVsdCB0byBiZSBjYWxsZWQgb24gcGFnZSBsb2FkXG4gIGxldCBjaXR5O1xuICBpZiAoZGVmYXVsdENpdHkgPT09IHRydWUpIHtcbiAgICBjaXR5ID0gXCJkdW5kZWVcIjtcbiAgfSBlbHNlIHtcbiAgICBjaXR5ID0gY2l0eUlucHV0LnZhbHVlO1xuICB9XG5cbiAgLy8gY2FsbCBmdW5jdGlvbiB0byBnZXQgY29vcmRzXG4gIGNvbnN0IGNvb3JkcyA9IHdlYXRoZXIuZ2V0Q29vcmRpbmF0ZXMoY2l0eSk7XG4gIC8vIHdoZW4gdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQsIHVzZSBwcm9taXNlIGFsbCB0byBnZXQgdGhlIGN1cnJlbnQgYW5kIGZ1dHVyZSBmb3JlY2FzdFxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGNvb3Jkcy50aGVuKChjb29yZHMpID0+IHtcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckFQSSA9IHdlYXRoZXIuZ2V0Q3VycmVudFdlYXRoZXIoY29vcmRzLmxhdCwgY29vcmRzLmxvbik7XG4gICAgY29uc3QgZnV0dXJlRm9yZWNhc3RBUEkgPSB3ZWF0aGVyLmdldFdlYXRoZXJGb3JlY2FzdChcbiAgICAgIGNvb3Jkcy5sYXQsXG4gICAgICBjb29yZHMubG9uXG4gICAgKTtcbiAgICBQcm9taXNlLmFsbChbY3VycmVudFdlYXRoZXJBUEksIGZ1dHVyZUZvcmVjYXN0QVBJXSkudGhlbihcbiAgICAgIChbY3VycmVudCwgZnV0dXJlXSkgPT4ge1xuICAgICAgICBkaXNwbGF5LnVwZGF0ZUJhY2tncm91bmQoY3VycmVudC53ZWF0aGVyWzBdLm1haW4pO1xuICAgICAgICBkaXNwbGF5LmFkZFdlYXRoZXJUb1VJKGN1cnJlbnQsIGNvb3JkcywgZnV0dXJlKTtcbiAgICAgICAgLy8gbm93IHJlbW92ZSB0aGUgbG9hZGluZyB2aWV3IHRoYXQgcHJvbWlzZSBpcyByZXNvbHZlZFxuICAgICAgICBkaXNwbGF5Lm1hbmFnZUxvYWRpbmcoKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcblxuICAvLyBjbGVhciBvdXQgdGhlIGlucHV0IGZpZWxkIHNvIHVzZXIgY2FuIGVhc2lseSByZXNlYXJjaFxuICBkaXNwbGF5LmNsZWFyQ2l0eUlucHV0KCk7XG59O1xuXG5leHBvcnQgeyBvcmNoZXN0cmF0ZUNpdHlJbnB1dCB9O1xuIiwiaW1wb3J0IGNsZWFyIGZyb20gXCIuL2Fzc2V0cy9jbGVhci5qcGdcIjtcbmltcG9ydCBjbG91ZHMgZnJvbSBcIi4vYXNzZXRzL2Nsb3Vkcy5qcGdcIjtcbmltcG9ydCBkcml6emxlIGZyb20gXCIuL2Fzc2V0cy9kcml6emxlLmpwZ1wiO1xuaW1wb3J0IHJhaW4gZnJvbSBcIi4vYXNzZXRzL3JhaW4uanBnXCI7XG5pbXBvcnQgYXRtb3NwaGVyZSBmcm9tIFwiLi9hc3NldHMvYXRtb3NwaGVyZS5qcGdcIjtcbmltcG9ydCBzbm93IGZyb20gXCIuL2Fzc2V0cy9zbm93LmpwZ1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgY2xlYXJDaXR5SW5wdXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktc2VhcmNoXCIpO1xuICBjaXR5LnZhbHVlID0gXCJcIjtcbn07XG5cbmNvbnN0IHVwZGF0ZUJhY2tncm91bmQgPSAoY29uZGl0aW9uKSA9PiB7XG4gIGNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuICBsZXQgdXJsID0gY29uZGl0aW9uLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGF0bXBvc3BoZXJpYyA9IFtcbiAgICBcIk1pc3RcIixcbiAgICBcIlNtb2tlXCIsXG4gICAgXCJIYXplXCIsXG4gICAgXCJEdXN0XCIsXG4gICAgXCJGb2dcIixcbiAgICBcIlNhbmRcIixcbiAgICBcIkR1c3RcIixcbiAgICBcIkFzaFwiLFxuICAgIFwiU3F1YWxsXCIsXG4gICAgXCJUb3JuYWRvXCIsXG4gIF07XG5cbiAgaWYgKGF0bXBvc3BoZXJpYy5pbmRleE9mKGNvbmRpdGlvbikgIT09IC0xKSB7XG4gICAgdXJsID0gXCJhdG1vc3BoZXJlXCI7XG4gIH1cbiAgYXBwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYigyNTUgMjU1IDI1NSAvIDAlKSwgcmdiKDAgMCAwIC8gNDUlKSksdXJsKFxcXCJhc3NldHMvJHt1cmx9LmpwZ1xcXCIpYDtcbn07XG5cbmNvbnN0IGFkZFdlYXRoZXJUb1VJID0gKHdlYXRoZXJQYXlsb2FkLCBsb2NhdGlvbkRhdGEsIGZ1dHVyZVdlYXRoZXIpID0+IHtcbiAgLy8gbGlzdCBvdXQgYWxsIHRoZSBlbGVtZW50cyB0byB1cGRhdGVcbiAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpO1xuICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBlcmF0dXJlXCIpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzLWxpa2VcIik7XG4gIGNvbnN0IGRhdGVDaGVja2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLWNoZWNrZWRcIik7XG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb25cIik7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1zcGVlZFwiKTtcbiAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kaXJlY3Rpb25cIik7XG4gIGNvbnN0IHJhaW5DaGFuY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhaW4tY2hhbmNlXCIpO1xuXG4gIC8vIExPQ0FUSU9OXG4gIGxvY2F0aW9uLmlubmVyVGV4dCA9IGAke2xvY2F0aW9uRGF0YS5uYW1lfSwgJHtsb2NhdGlvbkRhdGEuc3RhdGV9YDtcblxuICAvLyBERVNDUklQVElPTlxuICB3ZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdXRpbHMuY2FwaXRhbGlzZUZpcnN0TGV0dGVyKFxuICAgIHdlYXRoZXJQYXlsb2FkLndlYXRoZXJbMF0uZGVzY3JpcHRpb25cbiAgKTtcblxuICAvLyBJQ09OXG4gIGljb24uaW5uZXJUZXh0ID0gdXRpbHMuZ2V0SWNvbihcbiAgICB3ZWF0aGVyUGF5bG9hZC53ZWF0aGVyWzBdLmlkLFxuICAgIHV0aWxzLmNoZWNrRGF5VGltZSh1dGlscy5yZXR1cm5EYXRlRnJvbVVuaXgod2VhdGhlclBheWxvYWQuZHQpKVxuICApO1xuXG4gIC8vIFRFTVBFUkFUVVJFXG4gIHRlbXAuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcbiAgICB3ZWF0aGVyUGF5bG9hZC5tYWluLnRlbXBcbiAgKX08c3Bhbj4mIzE3Njs8L3NwYW4+Y2A7XG5cbiAgLy8gRkVFTFMgTElLRSBURU1QRVJBVFVSRVxuICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcbiAgICB3ZWF0aGVyUGF5bG9hZC5tYWluLmZlZWxzX2xpa2VcbiAgKX08c3Bhbj4mIzE3Njs8L3NwYW4+Y2A7XG5cbiAgLy8gREFURSBBTkQgVElNRVxuICBkYXRlQ2hlY2tlZC5pbm5lclRleHQgPSB1dGlsc1xuICAgIC5yZXR1cm5EYXRlRnJvbVVuaXgod2VhdGhlclBheWxvYWQuZHQpXG4gICAgLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgLy8gV0lORFxuICB3aW5kU3BlZWQuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyUGF5bG9hZC53aW5kLnNwZWVkKX1gO1xuICAvLyByb3RhdGUgdGhlIHdpbmQgaWNvbiB0byBzaG93IHRoZSBhcHByb3ByaWF0ZSBkaXJlY3Rpb24gKG1pbnVzIGZyb20gMzYwIHRvIHJldmVyc2UgaXQpXG4gIHdpbmREaXJlY3Rpb24uc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgkezM2MCAtIHdlYXRoZXJQYXlsb2FkLndpbmQuZGVnfWRlZylgO1xuICB1dGlscy5jaGVja0RheVRpbWUodXRpbHMucmV0dXJuRGF0ZUZyb21Vbml4KHdlYXRoZXJQYXlsb2FkLmR0KSk7XG5cbiAgLy8gQ0hBTkNFIE9GIFJBSU5cbiAgcmFpbkNoYW5jZS5pbm5lclRleHQgPSBgJHtmdXR1cmVXZWF0aGVyLmxpc3RbMF0ucG9wICogMTAwfSVgO1xufTtcblxuY29uc3QgbWFuYWdlTG9hZGluZyA9ICgpID0+IHtcbiAgY29uc3QgY3VycmVudFdlYXRoZXJEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnQtd2VhdGhlclwiKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Bpbm5lclwiKTtcblxuICBzcGlubmVyLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xuICBjdXJyZW50V2VhdGhlckRpYWxvZy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbn07XG5cbmV4cG9ydCB7IHVwZGF0ZUJhY2tncm91bmQsIGFkZFdlYXRoZXJUb1VJLCBjbGVhckNpdHlJbnB1dCwgbWFuYWdlTG9hZGluZyB9O1xuIiwiaW1wb3J0ICogYXMgY29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmNvbnN0IGNpdHlGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LWZvcm1cIik7XG5jaXR5Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb250cm9sbGVyLm9yY2hlc3RyYXRlQ2l0eUlucHV0KGZhbHNlLCBldmVudC50YXJnZXRbMF0pO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZXZlbnQpID0+IHtcbiAgY29udHJvbGxlci5vcmNoZXN0cmF0ZUNpdHlJbnB1dCh0cnVlKTtcbn0pO1xuIiwiY29uc3QgY2FwaXRhbGlzZUZpcnN0TGV0dGVyID0gKHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufTtcblxuY29uc3QgcmV0dXJuRGF0ZUZyb21Vbml4ID0gKGRhdGUpID0+IHtcbiAgY29uc3QgdW5peERhdGUgPSBuZXcgRGF0ZShkYXRlICogMTAwMCk7XG4gIHJldHVybiB1bml4RGF0ZTtcbn07XG5cbmNvbnN0IGdldEljb24gPSAod2VhdGhlcklELCBkYXlUaW1lKSA9PiB7XG4gIGxldCBpY29uO1xuXG4gIGlmICh3ZWF0aGVySUQgPj0gMjAwICYmIHdlYXRoZXJJRCA8IDMwMCkge1xuICAgIGljb24gPSBcInRodW5kZXJzdG9ybVwiO1xuICB9XG4gIGlmICh3ZWF0aGVySUQgPj0gMzAwICYmIHdlYXRoZXJJRCA8IDYwMCkge1xuICAgIGljb24gPSBcInJhaW55XCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA+PSA2MDAgJiYgd2VhdGhlcklEIDwgNzAwKSB7XG4gICAgaWNvbiA9IFwiYWNfdW5pdFwiO1xuICB9XG4gIGlmICh3ZWF0aGVySUQgPT09IDgwMCkge1xuICAgIGljb24gPSBcImNsZWFyX1wiO1xuICB9XG4gIGlmICh3ZWF0aGVySUQgPT09IDgwMSB8fCB3ZWF0aGVySUQgPT09IDgwMikge1xuICAgIGljb24gPSBcInBhcnRseV9jbG91ZHlfXCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA9PT0gODAzIHx8IHdlYXRoZXJJRCA9PT0gODA0KSB7XG4gICAgaWNvbiA9IFwiY2xvdWR5XCI7XG4gIH1cblxuICBpZiAod2VhdGhlcklEID49IDcwMCAmJiB3ZWF0aGVySUQgPCA4MDApIHtcbiAgICBpY29uID0gXCJmb2dneVwiO1xuICB9XG5cbiAgaWYgKHdlYXRoZXJJRCA+PSA4MDAgJiYgd2VhdGhlcklEIDw9IDgwMikge1xuICAgIGljb24gKz0gZGF5VGltZTtcbiAgfVxuXG4gIC8vZXJyb3IgaGFuZGxlciBmb3IgaWYgbm8gaWNvbiBpcyBhdmFpbGFibGVcbiAgaWYgKGljb24gPT09IHVuZGVmaW5lZCkge1xuICAgIGljb24gPSBcImRpc2FibGVkX2J5X2RlZmF1bHRcIjtcbiAgfVxuXG4gIC8vIFRPRE8gYWRkIGljb24gZm9yIDcwMCByYW5nZVxuXG4gIHJldHVybiBpY29uO1xufTtcblxuY29uc3QgY2hlY2tEYXlUaW1lID0gKGRhdGVUaW1lKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVGltZSk7XG4gIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuXG4gIGxldCBkYXl0aW1lO1xuXG4gIGlmIChob3VycyA+PSA2ICYmIGhvdXJzIDw9IDIwKSB7XG4gICAgZGF5dGltZSA9IFwiZGF5XCI7XG4gIH0gZWxzZSB7XG4gICAgZGF5dGltZSA9IFwibmlnaHRcIjtcbiAgfVxuXG4gIHJldHVybiBkYXl0aW1lO1xufTtcblxuZXhwb3J0IHsgY2hlY2tEYXlUaW1lLCBnZXRJY29uLCByZXR1cm5EYXRlRnJvbVVuaXgsIGNhcGl0YWxpc2VGaXJzdExldHRlciB9O1xuIiwiLy8gVG8gZ2V0IHN0YXJ0ZWQgd2l0aCBwcm9qZWN0IG9ubHkuIE9uY2UgcHJvamVjdCBpcyB1cCBhbmQgcnVubmluZywgZXhwbG9yZSB1c2luZyBHaXRIdWIgc2VjcmV0cyBhcyBhbiBhbHRlcm5hdGl2ZSBnb2luZyBmb3J3YXJkXG5jb25zdCBrZXkgPSBcIjFiOThmZDFjNjI4YWY5ZjE5MTc0ZGQzOTJjYWE5NzgwXCI7XG5cbmNvbnN0IGdldENvb3JkaW5hdGVzID0gYXN5bmMgKGxvY2F0aW9uID0gXCJkdW5kZWVcIikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtsb2NhdGlvbn0mYXBwaWQ9JHtrZXl9YFxuICAgICk7XG4gICAgY29uc3QgY29vcmRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIC8vIFRPRE86IHNvbWUgbG9naWMgc28gaWYgdGhlIGNvb3JkcyByZXNwb25zZSBpcyBibGFuaywgcHJvbXB0IHRoZSB1c2VyXG4gICAgcmV0dXJuIGNvb3Jkc1swXTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0Q3VycmVudFdlYXRoZXIgPSBhc3luYyAobGF0LCBsb24pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSYmdW5pdHM9bWV0cmljJmFwcGlkPSR7a2V5fWBcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyRm9yZWNhc3QgPSBhc3luYyAobGF0LCBsb24pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHtrZXl9YFxuICAgICk7XG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBmb3JlY2FzdERhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdldENvb3JkaW5hdGVzLCBnZXRDdXJyZW50V2VhdGhlciwgZ2V0V2VhdGhlckZvcmVjYXN0IH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxufVxcblxcbiNhcHAge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbiNjdXJyZW50LXdlYXRoZXI+LmlubmVyLWNvbnRhaW5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMSwgMSwgMSwgMC42KTtcXG4gICAgcGFkZGluZzogMzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAgIHJvdy1nYXA6IDIwcHg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNkZXRhaWxzLWNvbnRhaW5lciB7XFxuICAgIGdyaWQtY29sdW1uOiAxLzM7XFxuICAgIGdhcDogMTBweDtcXG59XFxuXFxuLmRldGFpbC1jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDAuNWVtO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigwIDAgMCAvIDM0JSk7XFxufVxcblxcbi5kZXRhaWwtdGl0bGUge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IDAuN2VtO1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG5cXG59XFxuXFxuI2N1cnJlbnQtd2VhdGhlciB7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jZm9yZWNhc3Qtd2VhdGhlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMSwgMSwgMSwgMC42KTtcXG5cXG59XFxuXFxuI3RlbXBlcmF0dXJlIHtcXG4gICAgZm9udC1zaXplOiA3ZW07XFxufVxcblxcbiNpY29uIHtcXG4gICAgZm9udC1zaXplOiA4ZW07XFxufVxcblxcbmxhYmVsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuZm9ybSB7XFxuICAgIG1hcmdpbjogMTBweDtcXG59XFxuXFxuLmZsZXgge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxufVxcblxcbmlucHV0IHtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjMwcHgpIHtcXG4gICAgI2RldGFpbHMtY29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAuaW5uZXItY29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgbWluLXdpZHRoOiA3NSU7XFxuXFxuICAgIH1cXG5cXG4gICAgI3RlbXBlcmF0dXJlIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNGVtO1xcbiAgICB9XFxuICAgIFxcbiAgICAjaWNvbiB7XFxuICAgICAgICBmb250LXNpemU6IDZlbTtcXG4gICAgfVxcbn1cXG5cXG5cXG5cXG5AbWVkaWEgKG1heC1oZWlnaHQ6IDc1MHB4KSBhbmQgKG1heC13aWR0aDogNDYzMHB4KSB7XFxuICAgIC5kZXRhaWwtY29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuXFxuICAgIH1cXG5cXG59XFxuXFxuLmxvYWRlciB7XFxuICAgIHdpZHRoOiA0OHB4O1xcbiAgICBoZWlnaHQ6IDQ4cHg7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgYW5pbWF0aW9uOiByb3RhdGlvbiAxcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICBAa2V5ZnJhbWVzIHJvdGF0aW9uIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICB9XFxuICAgIH0gXFxuXFxuXFxuICAgICNjdXJyZW50LXdlYXRoZXIuaGlkZSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuXFxuICAgICNzcGlubmVyLnNob3cge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB9XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDRCQUE0QjtJQUM1QixzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLHNCQUFzQjtJQUN0Qiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIscUJBQXFCO0lBQ3JCLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsU0FBUztBQUNiOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixVQUFVO0lBQ1YsOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsb0JBQW9COztBQUV4Qjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLG9DQUFvQzs7QUFFeEM7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJO1FBQ0ksc0JBQXNCO1FBQ3RCLFdBQVc7SUFDZjtJQUNBO1FBQ0ksYUFBYTtRQUNiLHNCQUFzQjtRQUN0QixjQUFjOztJQUVsQjs7SUFFQTtRQUNJLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxjQUFjO0lBQ2xCO0FBQ0o7Ozs7QUFJQTtJQUNJO1FBQ0ksbUJBQW1COztJQUV2Qjs7QUFFSjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osOEJBQThCO0lBQzlCLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixzQ0FBc0M7SUFDdEMsa0JBQWtCO0lBQ2xCOztJQUVBO0lBQ0E7UUFDSSx1QkFBdUI7SUFDM0I7SUFDQTtRQUNJLHlCQUF5QjtJQUM3QjtJQUNBOzs7SUFHQTtRQUNJLGFBQWE7SUFDakI7O0lBRUE7UUFDSSxxQkFBcUI7SUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2FwcCB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuI2N1cnJlbnQtd2VhdGhlcj4uaW5uZXItY29udGFpbmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjYpO1xcbiAgICBwYWRkaW5nOiAzMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gICAgcm93LWdhcDogMjBweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2RldGFpbHMtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG4gICAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uZGV0YWlsLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMC41ZW07XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMCAwIC8gMzQlKTtcXG59XFxuXFxuLmRldGFpbC10aXRsZSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogMC43ZW07XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcblxcbn1cXG5cXG4jY3VycmVudC13ZWF0aGVyIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiNmb3JlY2FzdC13ZWF0aGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjYpO1xcblxcbn1cXG5cXG4jdGVtcGVyYXR1cmUge1xcbiAgICBmb250LXNpemU6IDdlbTtcXG59XFxuXFxuI2ljb24ge1xcbiAgICBmb250LXNpemU6IDhlbTtcXG59XFxuXFxubGFiZWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5mb3JtIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uZmxleCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5ncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuaW5wdXQge1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MzBweCkge1xcbiAgICAjZGV0YWlscy1jb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxuICAgIC5pbm5lci1jb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICBtaW4td2lkdGg6IDc1JTtcXG5cXG4gICAgfVxcblxcbiAgICAjdGVtcGVyYXR1cmUge1xcbiAgICAgICAgZm9udC1zaXplOiA0ZW07XFxuICAgIH1cXG4gICAgXFxuICAgICNpY29uIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNmVtO1xcbiAgICB9XFxufVxcblxcblxcblxcbkBtZWRpYSAobWF4LWhlaWdodDogNzUwcHgpIGFuZCAobWF4LXdpZHRoOiA0NjMwcHgpIHtcXG4gICAgLmRldGFpbC1jb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG5cXG4gICAgfVxcblxcbn1cXG5cXG4ubG9hZGVyIHtcXG4gICAgd2lkdGg6IDQ4cHg7XFxuICAgIGhlaWdodDogNDhweDtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBhbmltYXRpb246IHJvdGF0aW9uIDFzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIEBrZXlmcmFtZXMgcm90YXRpb24ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG4gICAgfSBcXG5cXG5cXG4gICAgI2N1cnJlbnQtd2VhdGhlci5oaWRlIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgI3NwaW5uZXIuc2hvdyB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIH1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICogYXMgd2VhdGhlciBmcm9tIFwiLi93ZWF0aGVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0ICogYXMgbGlzZXRlbmVycyBmcm9tIFwiLi9saXN0ZW5lcnNcIjtcbiJdLCJuYW1lcyI6WyJ3ZWF0aGVyIiwiZGlzcGxheSIsIm9yY2hlc3RyYXRlQ2l0eUlucHV0IiwiZGVmYXVsdENpdHkiLCJjaXR5SW5wdXQiLCJtYW5hZ2VMb2FkaW5nIiwiY2l0eSIsInZhbHVlIiwiY29vcmRzIiwiZ2V0Q29vcmRpbmF0ZXMiLCJ3ZWF0aGVyRGF0YSIsInRoZW4iLCJjdXJyZW50V2VhdGhlckFQSSIsImdldEN1cnJlbnRXZWF0aGVyIiwibGF0IiwibG9uIiwiZnV0dXJlRm9yZWNhc3RBUEkiLCJnZXRXZWF0aGVyRm9yZWNhc3QiLCJQcm9taXNlIiwiYWxsIiwiY3VycmVudCIsImZ1dHVyZSIsInVwZGF0ZUJhY2tncm91bmQiLCJtYWluIiwiYWRkV2VhdGhlclRvVUkiLCJjbGVhckNpdHlJbnB1dCIsImNsZWFyIiwiY2xvdWRzIiwiZHJpenpsZSIsInJhaW4iLCJhdG1vc3BoZXJlIiwic25vdyIsInV0aWxzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvbmRpdGlvbiIsImFwcCIsInVybCIsInRvTG93ZXJDYXNlIiwiYXRtcG9zcGhlcmljIiwiaW5kZXhPZiIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwid2VhdGhlclBheWxvYWQiLCJsb2NhdGlvbkRhdGEiLCJmdXR1cmVXZWF0aGVyIiwibG9jYXRpb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJ0ZW1wIiwiZmVlbHNMaWtlIiwiZGF0ZUNoZWNrZWQiLCJpY29uIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsInJhaW5DaGFuY2UiLCJpbm5lclRleHQiLCJuYW1lIiwic3RhdGUiLCJjYXBpdGFsaXNlRmlyc3RMZXR0ZXIiLCJkZXNjcmlwdGlvbiIsImdldEljb24iLCJpZCIsImNoZWNrRGF5VGltZSIsInJldHVybkRhdGVGcm9tVW5peCIsImR0IiwiaW5uZXJIVE1MIiwiTWF0aCIsInJvdW5kIiwiZmVlbHNfbGlrZSIsInRvTG9jYWxlU3RyaW5nIiwid2luZCIsInNwZWVkIiwidHJhbnNmb3JtIiwiZGVnIiwibGlzdCIsInBvcCIsImN1cnJlbnRXZWF0aGVyRGlhbG9nIiwic3Bpbm5lciIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImNvbnRyb2xsZXIiLCJjaXR5Rm9ybSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0Iiwid2luZG93Iiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRhdGUiLCJ1bml4RGF0ZSIsIkRhdGUiLCJ3ZWF0aGVySUQiLCJkYXlUaW1lIiwidW5kZWZpbmVkIiwiZGF0ZVRpbWUiLCJob3VycyIsImdldEhvdXJzIiwiZGF5dGltZSIsImtleSIsInJlc3BvbnNlIiwiZmV0Y2giLCJqc29uIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImZvcmVjYXN0RGF0YSIsImxpc2V0ZW5lcnMiXSwic291cmNlUm9vdCI6IiJ9