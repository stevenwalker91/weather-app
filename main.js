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
  // first check if default city is true which allows a default to be called on page load
  let city;
  if (defaultCity === true) {
    city = "dundee";
  } else {
    city = cityInput.value;
  }

  // call function to get coords and when get the weather when promise resolved
  const coords = _weather__WEBPACK_IMPORTED_MODULE_0__.getCoordinates(city);
  const weatherData = coords.then(data => {
    const currentWeather = _weather__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeather(data.lat, data.lon);
    return currentWeather;
  });

  // clear out the input field so user can easily research
  _display__WEBPACK_IMPORTED_MODULE_1__.clearCityInput();

  //by then using promise all, we can also get the initial coords data
  return Promise.all([coords, weatherData]).then(_ref => {
    let [coords, weatherData] = _ref;
    _display__WEBPACK_IMPORTED_MODULE_1__.updateBackground(weatherData.weather[0].main);
    _display__WEBPACK_IMPORTED_MODULE_1__.addWeatherToUI(weatherData, coords);
  }).catch(err => {
    console.log(err);
  });
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
const addWeatherToUI = (weatherPayload, locationData) => {
  // list out all the elements to update
  const location = document.getElementById("location");
  const weatherDescription = document.getElementById("weather-description");
  const temp = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const dateChecked = document.getElementById("date-checked");
  const icon = document.getElementById("icon");
  const windSpeed = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");

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
  if (weatherID >= 800 && weatherID <= 802) {
    icon += dayTime;
  }
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
    const lat = coords[0].lat;
    const lon = coords[0].lon;
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
    const response = await fetch(`url......`);
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0px;\n    color: white;\n    font-family: 'Roboto', sans-serif;\n}\n\n#app {\n    min-height: 100vh;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n#current-weather>.inner-container {\n    background-color: rgba(1, 1, 1, 0.6);\n    padding: 30px;\n    border-radius: 10px;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    row-gap: 10px;\n    align-items: center;\n}\n\n#details-container {\n    grid-column: 1/3;\n    gap: 10px;\n}\n\n.detail-container {\n    padding: 10px;\n    flex-direction: column;\n    gap: 0.5em;\n    justify-content: space-between;\n    align-items: center;\n    border: 1px solid black;\n    border-radius: 5px;\n    background-color: rgb(0 0 0 / 34%);\n}\n\n.detail-title {\n    text-transform: uppercase;\n    font-size: 0.7em;\n    align-self: flex-end;\n\n}\n\n#current-weather {\n    justify-content: center;\n}\n\n#forecast-weather {\n    background-color: rgba(1, 1, 1, 0.6);\n\n}\n\n#temperature {\n    font-size: 7em;\n}\n\n#icon {\n    font-size: 10em;\n}\n\nlabel {\n    display: none;\n}\n\nform {\n    margin: 10px;\n}\n\n.flex {\n    display: flex;\n}\n\n.grid {\n    display: grid;\n}\n\nheader {\n    justify-content: flex-end;\n}\n\ninput {\n    box-shadow: none;\n    padding: 8px;\n}\n\n@media (max-width: 630px) {\n    #details-container {\n        flex-direction: column;\n        width: 100%;\n    }\n    .inner-container {\n        display: flex;\n        flex-direction: column;\n        min-width: 75%;\n    }\n}\n\n@media (max-width: 420px) {\n    \n    #temperature {\n        font-size: 4em;\n    }\n    #icon {\n        font-size: 6em;\n    }\n\n}\n\n@media (max-height: 750px) {\n    .detail-container {\n        flex-direction: row;\n\n    }\n\n\n\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,iBAAiB;IACjB,4BAA4B;IAC5B,sBAAsB;IACtB,2BAA2B;IAC3B,sBAAsB;IACtB,8BAA8B;AAClC;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,qBAAqB;IACrB,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,UAAU;IACV,8BAA8B;IAC9B,mBAAmB;IACnB,uBAAuB;IACvB,kBAAkB;IAClB,kCAAkC;AACtC;;AAEA;IACI,yBAAyB;IACzB,gBAAgB;IAChB,oBAAoB;;AAExB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,oCAAoC;;AAExC;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,gBAAgB;IAChB,YAAY;AAChB;;AAEA;IACI;QACI,sBAAsB;QACtB,WAAW;IACf;IACA;QACI,aAAa;QACb,sBAAsB;QACtB,cAAc;IAClB;AACJ;;AAEA;;IAEI;QACI,cAAc;IAClB;IACA;QACI,cAAc;IAClB;;AAEJ;;AAEA;IACI;QACI,mBAAmB;;IAEvB;;;;AAIJ","sourcesContent":["body {\n    margin: 0px;\n    color: white;\n    font-family: 'Roboto', sans-serif;\n}\n\n#app {\n    min-height: 100vh;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n#current-weather>.inner-container {\n    background-color: rgba(1, 1, 1, 0.6);\n    padding: 30px;\n    border-radius: 10px;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    row-gap: 10px;\n    align-items: center;\n}\n\n#details-container {\n    grid-column: 1/3;\n    gap: 10px;\n}\n\n.detail-container {\n    padding: 10px;\n    flex-direction: column;\n    gap: 0.5em;\n    justify-content: space-between;\n    align-items: center;\n    border: 1px solid black;\n    border-radius: 5px;\n    background-color: rgb(0 0 0 / 34%);\n}\n\n.detail-title {\n    text-transform: uppercase;\n    font-size: 0.7em;\n    align-self: flex-end;\n\n}\n\n#current-weather {\n    justify-content: center;\n}\n\n#forecast-weather {\n    background-color: rgba(1, 1, 1, 0.6);\n\n}\n\n#temperature {\n    font-size: 7em;\n}\n\n#icon {\n    font-size: 10em;\n}\n\nlabel {\n    display: none;\n}\n\nform {\n    margin: 10px;\n}\n\n.flex {\n    display: flex;\n}\n\n.grid {\n    display: grid;\n}\n\nheader {\n    justify-content: flex-end;\n}\n\ninput {\n    box-shadow: none;\n    padding: 8px;\n}\n\n@media (max-width: 630px) {\n    #details-container {\n        flex-direction: column;\n        width: 100%;\n    }\n    .inner-container {\n        display: flex;\n        flex-direction: column;\n        min-width: 75%;\n    }\n}\n\n@media (max-width: 420px) {\n    \n    #temperature {\n        font-size: 4em;\n    }\n    #icon {\n        font-size: 6em;\n    }\n\n}\n\n@media (max-height: 750px) {\n    .detail-container {\n        flex-direction: row;\n\n    }\n\n\n\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDO0FBQ0E7O0FBRXJDO0FBQ0EsTUFBTUUsb0JBQW9CLEdBQUcsT0FBT0MsV0FBVyxFQUFFQyxTQUFTLEtBQUs7RUFDN0Q7RUFDQSxJQUFJQyxJQUFJO0VBQ1IsSUFBSUYsV0FBVyxLQUFLLElBQUksRUFBRTtJQUN4QkUsSUFBSSxHQUFHLFFBQVE7RUFDakIsQ0FBQyxNQUFNO0lBQ0xBLElBQUksR0FBR0QsU0FBUyxDQUFDRSxLQUFLO0VBQ3hCOztFQUVBO0VBQ0EsTUFBTUMsTUFBTSxHQUFHUCxvREFBc0IsQ0FBQ0ssSUFBSSxDQUFDO0VBQzNDLE1BQU1JLFdBQVcsR0FBR0YsTUFBTSxDQUFDRyxJQUFJLENBQUVDLElBQUksSUFBSztJQUN4QyxNQUFNQyxjQUFjLEdBQUdaLHVEQUF5QixDQUFDVyxJQUFJLENBQUNHLEdBQUcsRUFBRUgsSUFBSSxDQUFDSSxHQUFHLENBQUM7SUFDcEUsT0FBT0gsY0FBYztFQUN2QixDQUFDLENBQUM7O0VBRUY7RUFDQVgsb0RBQXNCLEVBQUU7O0VBRXhCO0VBQ0EsT0FBT2dCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQUNYLE1BQU0sRUFBRUUsV0FBVyxDQUFDLENBQUMsQ0FDdENDLElBQUksQ0FBQyxRQUEyQjtJQUFBLElBQTFCLENBQUNILE1BQU0sRUFBRUUsV0FBVyxDQUFDO0lBQzFCUixzREFBd0IsQ0FBQ1EsV0FBVyxDQUFDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNvQixJQUFJLENBQUM7SUFDckRuQixvREFBc0IsQ0FBQ1EsV0FBVyxFQUFFRixNQUFNLENBQUM7RUFDN0MsQ0FBQyxDQUFDLENBQ0RlLEtBQUssQ0FBRUMsR0FBRyxJQUFLO0lBQ2RDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7RUFDbEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENzQztBQUNFO0FBQ0U7QUFDTjtBQUNZO0FBQ1o7QUFDSjtBQUVqQyxNQUFNUCxjQUFjLEdBQUcsTUFBTTtFQUMzQixNQUFNWCxJQUFJLEdBQUc0QixRQUFRLENBQUNDLGNBQWMsQ0FBQyxhQUFhLENBQUM7RUFDbkQ3QixJQUFJLENBQUNDLEtBQUssR0FBRyxFQUFFO0FBQ2pCLENBQUM7QUFFRCxNQUFNYSxnQkFBZ0IsR0FBSWdCLFNBQVMsSUFBSztFQUN0QyxNQUFNQyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLEtBQUssQ0FBQztFQUMxQyxJQUFJRyxHQUFHLEdBQUdGLFNBQVMsQ0FBQ0csV0FBVyxFQUFFO0VBQ2pDLE1BQU1DLFlBQVksR0FBRyxDQUNuQixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLENBQ1Y7RUFFRCxJQUFJQSxZQUFZLENBQUNDLE9BQU8sQ0FBQ0wsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDMUNFLEdBQUcsR0FBRyxZQUFZO0VBQ3BCO0VBQ0FELEdBQUcsQ0FBQ0ssS0FBSyxDQUFDQyxlQUFlLEdBQUksbUZBQWtGTCxHQUFJLFNBQVE7QUFDN0gsQ0FBQztBQUVELE1BQU1oQixjQUFjLEdBQUcsQ0FBQ3NCLGNBQWMsRUFBRUMsWUFBWSxLQUFLO0VBQ3ZEO0VBQ0EsTUFBTUMsUUFBUSxHQUFHWixRQUFRLENBQUNDLGNBQWMsQ0FBQyxVQUFVLENBQUM7RUFDcEQsTUFBTVksa0JBQWtCLEdBQUdiLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLHFCQUFxQixDQUFDO0VBQ3pFLE1BQU1hLElBQUksR0FBR2QsUUFBUSxDQUFDQyxjQUFjLENBQUMsYUFBYSxDQUFDO0VBQ25ELE1BQU1jLFNBQVMsR0FBR2YsUUFBUSxDQUFDQyxjQUFjLENBQUMsWUFBWSxDQUFDO0VBQ3ZELE1BQU1lLFdBQVcsR0FBR2hCLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGNBQWMsQ0FBQztFQUMzRCxNQUFNZ0IsSUFBSSxHQUFHakIsUUFBUSxDQUFDQyxjQUFjLENBQUMsTUFBTSxDQUFDO0VBQzVDLE1BQU1pQixTQUFTLEdBQUdsQixRQUFRLENBQUNDLGNBQWMsQ0FBQyxZQUFZLENBQUM7RUFDdkQsTUFBTWtCLGFBQWEsR0FBR25CLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGdCQUFnQixDQUFDOztFQUUvRDtFQUNBVyxRQUFRLENBQUNRLFNBQVMsR0FBSSxHQUFFVCxZQUFZLENBQUNVLElBQUssS0FBSVYsWUFBWSxDQUFDVyxLQUFNLEVBQUM7O0VBRWxFO0VBQ0FULGtCQUFrQixDQUFDTyxTQUFTLEdBQUdyQix5REFBMkIsQ0FDeERXLGNBQWMsQ0FBQzNDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3lELFdBQVcsQ0FDdEM7O0VBRUQ7RUFDQVAsSUFBSSxDQUFDRyxTQUFTLEdBQUdyQiwyQ0FBYSxDQUM1QlcsY0FBYyxDQUFDM0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDMkQsRUFBRSxFQUM1QjNCLGdEQUFrQixDQUFDQSxzREFBd0IsQ0FBQ1csY0FBYyxDQUFDbUIsRUFBRSxDQUFDLENBQUMsQ0FDaEU7O0VBRUQ7RUFDQWYsSUFBSSxDQUFDZ0IsU0FBUyxHQUFJLEdBQUVDLElBQUksQ0FBQ0MsS0FBSyxDQUM1QnRCLGNBQWMsQ0FBQ3ZCLElBQUksQ0FBQzJCLElBQUksQ0FDeEIsc0JBQXFCOztFQUV2QjtFQUNBQyxTQUFTLENBQUNlLFNBQVMsR0FBSSxHQUFFQyxJQUFJLENBQUNDLEtBQUssQ0FDakN0QixjQUFjLENBQUN2QixJQUFJLENBQUM4QyxVQUFVLENBQzlCLHNCQUFxQjs7RUFFdkI7RUFDQWpCLFdBQVcsQ0FBQ0ksU0FBUyxHQUFHckIsc0RBQ0gsQ0FBQ1csY0FBYyxDQUFDbUIsRUFBRSxDQUFDLENBQ3JDSyxjQUFjLEVBQUU7O0VBRW5CO0VBQ0FoQixTQUFTLENBQUNFLFNBQVMsR0FBSSxHQUFFVyxJQUFJLENBQUNDLEtBQUssQ0FBQ3RCLGNBQWMsQ0FBQ3lCLElBQUksQ0FBQ0MsS0FBSyxDQUFFLEVBQUM7RUFDaEU7RUFDQWpCLGFBQWEsQ0FBQ1gsS0FBSyxDQUFDNkIsU0FBUyxHQUFJLFVBQVMsR0FBRyxHQUFHM0IsY0FBYyxDQUFDeUIsSUFBSSxDQUFDRyxHQUFJLE1BQUs7RUFDN0V2QyxnREFBa0IsQ0FBQ0Esc0RBQXdCLENBQUNXLGNBQWMsQ0FBQ21CLEVBQUUsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNoRjBDO0FBRTNDLE1BQU1XLFFBQVEsR0FBR3hDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFdBQVcsQ0FBQztBQUNyRHVDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsUUFBUSxFQUFHQyxLQUFLLElBQUs7RUFDN0NBLEtBQUssQ0FBQ0MsY0FBYyxFQUFFO0VBQ3RCSiw2REFBK0IsQ0FBQyxLQUFLLEVBQUVHLEtBQUssQ0FBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUVGQyxNQUFNLENBQUNKLGdCQUFnQixDQUFDLE1BQU0sRUFBR0MsS0FBSyxJQUFLO0VBQ3pDSCw2REFBK0IsQ0FBQyxJQUFJLENBQUM7QUFDdkMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZGLE1BQU1oQixxQkFBcUIsR0FBSXVCLE1BQU0sSUFBSztFQUN4QyxPQUFPQSxNQUFNLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxFQUFFLEdBQUdGLE1BQU0sQ0FBQ0csS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQsTUFBTXJCLGtCQUFrQixHQUFJc0IsSUFBSSxJQUFLO0VBQ25DLE1BQU1DLFFBQVEsR0FBRyxJQUFJQyxJQUFJLENBQUNGLElBQUksR0FBRyxJQUFJLENBQUM7RUFDdEMsT0FBT0MsUUFBUTtBQUNqQixDQUFDO0FBRUQsTUFBTTFCLE9BQU8sR0FBRyxDQUFDNEIsU0FBUyxFQUFFQyxPQUFPLEtBQUs7RUFDdEMsSUFBSXJDLElBQUk7RUFFUixJQUFJb0MsU0FBUyxJQUFJLEdBQUcsSUFBSUEsU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUN2Q3BDLElBQUksR0FBRyxjQUFjO0VBQ3ZCO0VBQ0EsSUFBSW9DLFNBQVMsSUFBSSxHQUFHLElBQUlBLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFDdkNwQyxJQUFJLEdBQUcsT0FBTztFQUNoQjtFQUNBLElBQUlvQyxTQUFTLElBQUksR0FBRyxJQUFJQSxTQUFTLEdBQUcsR0FBRyxFQUFFO0lBQ3ZDcEMsSUFBSSxHQUFHLFNBQVM7RUFDbEI7RUFDQSxJQUFJb0MsU0FBUyxLQUFLLEdBQUcsRUFBRTtJQUNyQnBDLElBQUksR0FBRyxRQUFRO0VBQ2pCO0VBQ0EsSUFBSW9DLFNBQVMsS0FBSyxHQUFHLElBQUlBLFNBQVMsS0FBSyxHQUFHLEVBQUU7SUFDMUNwQyxJQUFJLEdBQUcsZ0JBQWdCO0VBQ3pCO0VBQ0EsSUFBSW9DLFNBQVMsS0FBSyxHQUFHLElBQUlBLFNBQVMsS0FBSyxHQUFHLEVBQUU7SUFDMUNwQyxJQUFJLEdBQUcsUUFBUTtFQUNqQjtFQUVBLElBQUlvQyxTQUFTLElBQUksR0FBRyxJQUFJQSxTQUFTLElBQUksR0FBRyxFQUFFO0lBQ3hDcEMsSUFBSSxJQUFJcUMsT0FBTztFQUNqQjtFQUVBLE9BQU9yQyxJQUFJO0FBQ2IsQ0FBQztBQUVELE1BQU1VLFlBQVksR0FBSTRCLFFBQVEsSUFBSztFQUNqQyxNQUFNTCxJQUFJLEdBQUcsSUFBSUUsSUFBSSxDQUFDRyxRQUFRLENBQUM7RUFDL0IsTUFBTUMsS0FBSyxHQUFHTixJQUFJLENBQUNPLFFBQVEsRUFBRTtFQUU3QixJQUFJQyxPQUFPO0VBRVgsSUFBSUYsS0FBSyxJQUFJLENBQUMsSUFBSUEsS0FBSyxJQUFJLEVBQUUsRUFBRTtJQUM3QkUsT0FBTyxHQUFHLEtBQUs7RUFDakIsQ0FBQyxNQUFNO0lBQ0xBLE9BQU8sR0FBRyxPQUFPO0VBQ25CO0VBRUEsT0FBT0EsT0FBTztBQUNoQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25ERDtBQUNBLE1BQU1DLEdBQUcsR0FBRyxrQ0FBa0M7QUFFOUMsTUFBTXBGLGNBQWMsR0FBRyxrQkFBK0I7RUFBQSxJQUF4QnFDLFFBQVEsdUVBQUcsUUFBUTtFQUMvQyxJQUFJO0lBQ0YsTUFBTWdELFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQ3pCLG1EQUFrRGpELFFBQVMsVUFBUytDLEdBQUksRUFBQyxDQUMzRTtJQUNELE1BQU1yRixNQUFNLEdBQUcsTUFBTXNGLFFBQVEsQ0FBQ0UsSUFBSSxFQUFFO0lBQ3BDLE1BQU1qRixHQUFHLEdBQUdQLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ08sR0FBRztJQUN6QixNQUFNQyxHQUFHLEdBQUdSLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ1EsR0FBRztJQUN6QjtJQUNBLE9BQU9SLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDbEIsQ0FBQyxDQUFDLE9BQU9nQixHQUFHLEVBQUU7SUFDWkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEdBQUcsQ0FBQztFQUNsQjtBQUNGLENBQUM7QUFFRCxNQUFNVixpQkFBaUIsR0FBRyxPQUFPQyxHQUFHLEVBQUVDLEdBQUcsS0FBSztFQUM1QyxJQUFJO0lBQ0YsTUFBTThFLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQ3pCLHVEQUFzRGhGLEdBQUksUUFBT0MsR0FBSSx3QkFBdUI2RSxHQUFJLEVBQUMsQ0FDbkc7SUFDRCxNQUFNbkYsV0FBVyxHQUFHLE1BQU1vRixRQUFRLENBQUNFLElBQUksRUFBRTtJQUN6QyxPQUFPdEYsV0FBVztFQUNwQixDQUFDLENBQUMsT0FBT2MsR0FBRyxFQUFFO0lBQ1pDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7RUFDbEI7QUFDRixDQUFDO0FBRUQsTUFBTXlFLGtCQUFrQixHQUFHLE9BQU9sRixHQUFHLEVBQUVDLEdBQUcsS0FBSztFQUM3QyxJQUFJO0lBQ0YsTUFBTThFLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUUsV0FBVSxDQUFDO0VBQzNDLENBQUMsQ0FBQyxPQUFPdkUsR0FBRyxFQUFFO0lBQ1pDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7RUFDbEI7QUFDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENEO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxnREFBZ0Qsa0JBQWtCLG1CQUFtQix3Q0FBd0MsR0FBRyxVQUFVLHdCQUF3QixtQ0FBbUMsNkJBQTZCLGtDQUFrQyw2QkFBNkIscUNBQXFDLEdBQUcsdUNBQXVDLDJDQUEyQyxvQkFBb0IsMEJBQTBCLHFDQUFxQyw0QkFBNEIsb0JBQW9CLDBCQUEwQixHQUFHLHdCQUF3Qix1QkFBdUIsZ0JBQWdCLEdBQUcsdUJBQXVCLG9CQUFvQiw2QkFBNkIsaUJBQWlCLHFDQUFxQywwQkFBMEIsOEJBQThCLHlCQUF5Qix5Q0FBeUMsR0FBRyxtQkFBbUIsZ0NBQWdDLHVCQUF1QiwyQkFBMkIsS0FBSyxzQkFBc0IsOEJBQThCLEdBQUcsdUJBQXVCLDJDQUEyQyxLQUFLLGtCQUFrQixxQkFBcUIsR0FBRyxXQUFXLHNCQUFzQixHQUFHLFdBQVcsb0JBQW9CLEdBQUcsVUFBVSxtQkFBbUIsR0FBRyxXQUFXLG9CQUFvQixHQUFHLFdBQVcsb0JBQW9CLEdBQUcsWUFBWSxnQ0FBZ0MsR0FBRyxXQUFXLHVCQUF1QixtQkFBbUIsR0FBRywrQkFBK0IsMEJBQTBCLGlDQUFpQyxzQkFBc0IsT0FBTyx3QkFBd0Isd0JBQXdCLGlDQUFpQyx5QkFBeUIsT0FBTyxHQUFHLCtCQUErQiwwQkFBMEIseUJBQXlCLE9BQU8sYUFBYSx5QkFBeUIsT0FBTyxLQUFLLGdDQUFnQyx5QkFBeUIsOEJBQThCLFNBQVMsU0FBUyxPQUFPLGdGQUFnRixVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsY0FBYyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sTUFBTSxLQUFLLEtBQUssYUFBYSxTQUFTLCtCQUErQixrQkFBa0IsbUJBQW1CLHdDQUF3QyxHQUFHLFVBQVUsd0JBQXdCLG1DQUFtQyw2QkFBNkIsa0NBQWtDLDZCQUE2QixxQ0FBcUMsR0FBRyx1Q0FBdUMsMkNBQTJDLG9CQUFvQiwwQkFBMEIscUNBQXFDLDRCQUE0QixvQkFBb0IsMEJBQTBCLEdBQUcsd0JBQXdCLHVCQUF1QixnQkFBZ0IsR0FBRyx1QkFBdUIsb0JBQW9CLDZCQUE2QixpQkFBaUIscUNBQXFDLDBCQUEwQiw4QkFBOEIseUJBQXlCLHlDQUF5QyxHQUFHLG1CQUFtQixnQ0FBZ0MsdUJBQXVCLDJCQUEyQixLQUFLLHNCQUFzQiw4QkFBOEIsR0FBRyx1QkFBdUIsMkNBQTJDLEtBQUssa0JBQWtCLHFCQUFxQixHQUFHLFdBQVcsc0JBQXNCLEdBQUcsV0FBVyxvQkFBb0IsR0FBRyxVQUFVLG1CQUFtQixHQUFHLFdBQVcsb0JBQW9CLEdBQUcsV0FBVyxvQkFBb0IsR0FBRyxZQUFZLGdDQUFnQyxHQUFHLFdBQVcsdUJBQXVCLG1CQUFtQixHQUFHLCtCQUErQiwwQkFBMEIsaUNBQWlDLHNCQUFzQixPQUFPLHdCQUF3Qix3QkFBd0IsaUNBQWlDLHlCQUF5QixPQUFPLEdBQUcsK0JBQStCLDBCQUEwQix5QkFBeUIsT0FBTyxhQUFhLHlCQUF5QixPQUFPLEtBQUssZ0NBQWdDLHlCQUF5Qiw4QkFBOEIsU0FBUyxTQUFTLG1CQUFtQjtBQUM5b0o7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLDZGQUFjLEdBQUcsNkZBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZHYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7Ozs7QUNBcUM7QUFDaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB3ZWF0aGVyIGZyb20gXCIuL3dlYXRoZXJcIjtcbmltcG9ydCAqIGFzIGRpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuXG4vLyB3aGVuIHRoZSBjaXR5IGlzIHVwZGF0ZWQsIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBjby1vcmRpbmF0ZSBhbGwgdGhlIGZ1bmN0aW9ucyB0byBiZSBleGVjdXRlZCBhcyBhIHJlc3VsdFxuY29uc3Qgb3JjaGVzdHJhdGVDaXR5SW5wdXQgPSBhc3luYyAoZGVmYXVsdENpdHksIGNpdHlJbnB1dCkgPT4ge1xuICAvLyBmaXJzdCBjaGVjayBpZiBkZWZhdWx0IGNpdHkgaXMgdHJ1ZSB3aGljaCBhbGxvd3MgYSBkZWZhdWx0IHRvIGJlIGNhbGxlZCBvbiBwYWdlIGxvYWRcbiAgbGV0IGNpdHk7XG4gIGlmIChkZWZhdWx0Q2l0eSA9PT0gdHJ1ZSkge1xuICAgIGNpdHkgPSBcImR1bmRlZVwiO1xuICB9IGVsc2Uge1xuICAgIGNpdHkgPSBjaXR5SW5wdXQudmFsdWU7XG4gIH1cblxuICAvLyBjYWxsIGZ1bmN0aW9uIHRvIGdldCBjb29yZHMgYW5kIHdoZW4gZ2V0IHRoZSB3ZWF0aGVyIHdoZW4gcHJvbWlzZSByZXNvbHZlZFxuICBjb25zdCBjb29yZHMgPSB3ZWF0aGVyLmdldENvb3JkaW5hdGVzKGNpdHkpO1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGNvb3Jkcy50aGVuKChkYXRhKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFdlYXRoZXIgPSB3ZWF0aGVyLmdldEN1cnJlbnRXZWF0aGVyKGRhdGEubGF0LCBkYXRhLmxvbik7XG4gICAgcmV0dXJuIGN1cnJlbnRXZWF0aGVyO1xuICB9KTtcblxuICAvLyBjbGVhciBvdXQgdGhlIGlucHV0IGZpZWxkIHNvIHVzZXIgY2FuIGVhc2lseSByZXNlYXJjaFxuICBkaXNwbGF5LmNsZWFyQ2l0eUlucHV0KCk7XG5cbiAgLy9ieSB0aGVuIHVzaW5nIHByb21pc2UgYWxsLCB3ZSBjYW4gYWxzbyBnZXQgdGhlIGluaXRpYWwgY29vcmRzIGRhdGFcbiAgcmV0dXJuIFByb21pc2UuYWxsKFtjb29yZHMsIHdlYXRoZXJEYXRhXSlcbiAgICAudGhlbigoW2Nvb3Jkcywgd2VhdGhlckRhdGFdKSA9PiB7XG4gICAgICBkaXNwbGF5LnVwZGF0ZUJhY2tncm91bmQod2VhdGhlckRhdGEud2VhdGhlclswXS5tYWluKTtcbiAgICAgIGRpc3BsYXkuYWRkV2VhdGhlclRvVUkod2VhdGhlckRhdGEsIGNvb3Jkcyk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCB7IG9yY2hlc3RyYXRlQ2l0eUlucHV0IH07XG4iLCJpbXBvcnQgY2xlYXIgZnJvbSBcIi4vYXNzZXRzL2NsZWFyLmpwZ1wiO1xuaW1wb3J0IGNsb3VkcyBmcm9tIFwiLi9hc3NldHMvY2xvdWRzLmpwZ1wiO1xuaW1wb3J0IGRyaXp6bGUgZnJvbSBcIi4vYXNzZXRzL2RyaXp6bGUuanBnXCI7XG5pbXBvcnQgcmFpbiBmcm9tIFwiLi9hc3NldHMvcmFpbi5qcGdcIjtcbmltcG9ydCBhdG1vc3BoZXJlIGZyb20gXCIuL2Fzc2V0cy9hdG1vc3BoZXJlLmpwZ1wiO1xuaW1wb3J0IHNub3cgZnJvbSBcIi4vYXNzZXRzL3Nub3cuanBnXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBjbGVhckNpdHlJbnB1dCA9ICgpID0+IHtcbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1zZWFyY2hcIik7XG4gIGNpdHkudmFsdWUgPSBcIlwiO1xufTtcblxuY29uc3QgdXBkYXRlQmFja2dyb3VuZCA9IChjb25kaXRpb24pID0+IHtcbiAgY29uc3QgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG4gIGxldCB1cmwgPSBjb25kaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgYXRtcG9zcGhlcmljID0gW1xuICAgIFwiTWlzdFwiLFxuICAgIFwiU21va2VcIixcbiAgICBcIkhhemVcIixcbiAgICBcIkR1c3RcIixcbiAgICBcIkZvZ1wiLFxuICAgIFwiU2FuZFwiLFxuICAgIFwiRHVzdFwiLFxuICAgIFwiQXNoXCIsXG4gICAgXCJTcXVhbGxcIixcbiAgICBcIlRvcm5hZG9cIixcbiAgXTtcblxuICBpZiAoYXRtcG9zcGhlcmljLmluZGV4T2YoY29uZGl0aW9uKSAhPT0gLTEpIHtcbiAgICB1cmwgPSBcImF0bW9zcGhlcmVcIjtcbiAgfVxuICBhcHAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiKDI1NSAyNTUgMjU1IC8gMCUpLCByZ2IoMCAwIDAgLyA0NSUpKSx1cmwoXFxcImFzc2V0cy8ke3VybH0uanBnXFxcIilgO1xufTtcblxuY29uc3QgYWRkV2VhdGhlclRvVUkgPSAod2VhdGhlclBheWxvYWQsIGxvY2F0aW9uRGF0YSkgPT4ge1xuICAvLyBsaXN0IG91dCBhbGwgdGhlIGVsZW1lbnRzIHRvIHVwZGF0ZVxuICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIik7XG4gIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1kZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGVyYXR1cmVcIik7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHMtbGlrZVwiKTtcbiAgY29uc3QgZGF0ZUNoZWNrZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGUtY2hlY2tlZFwiKTtcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWNvblwiKTtcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kLXNwZWVkXCIpO1xuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kLWRpcmVjdGlvblwiKTtcblxuICAvLyBMT0NBVElPTlxuICBsb2NhdGlvbi5pbm5lclRleHQgPSBgJHtsb2NhdGlvbkRhdGEubmFtZX0sICR7bG9jYXRpb25EYXRhLnN0YXRlfWA7XG5cbiAgLy8gREVTQ1JJUFRJT05cbiAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHV0aWxzLmNhcGl0YWxpc2VGaXJzdExldHRlcihcbiAgICB3ZWF0aGVyUGF5bG9hZC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uXG4gICk7XG5cbiAgLy8gSUNPTlxuICBpY29uLmlubmVyVGV4dCA9IHV0aWxzLmdldEljb24oXG4gICAgd2VhdGhlclBheWxvYWQud2VhdGhlclswXS5pZCxcbiAgICB1dGlscy5jaGVja0RheVRpbWUodXRpbHMucmV0dXJuRGF0ZUZyb21Vbml4KHdlYXRoZXJQYXlsb2FkLmR0KSlcbiAgKTtcblxuICAvLyBURU1QRVJBVFVSRVxuICB0ZW1wLmlubmVySFRNTCA9IGAke01hdGgucm91bmQoXG4gICAgd2VhdGhlclBheWxvYWQubWFpbi50ZW1wXG4gICl9PHNwYW4+JiMxNzY7PC9zcGFuPmNgO1xuXG4gIC8vIEZFRUxTIExJS0UgVEVNUEVSQVRVUkVcbiAgZmVlbHNMaWtlLmlubmVySFRNTCA9IGAke01hdGgucm91bmQoXG4gICAgd2VhdGhlclBheWxvYWQubWFpbi5mZWVsc19saWtlXG4gICl9PHNwYW4+JiMxNzY7PC9zcGFuPmNgO1xuXG4gIC8vIERBVEUgQU5EIFRJTUVcbiAgZGF0ZUNoZWNrZWQuaW5uZXJUZXh0ID0gdXRpbHNcbiAgICAucmV0dXJuRGF0ZUZyb21Vbml4KHdlYXRoZXJQYXlsb2FkLmR0KVxuICAgIC50b0xvY2FsZVN0cmluZygpO1xuXG4gIC8vIFdJTkRcbiAgd2luZFNwZWVkLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQod2VhdGhlclBheWxvYWQud2luZC5zcGVlZCl9YDtcbiAgLy8gcm90YXRlIHRoZSB3aW5kIGljb24gdG8gc2hvdyB0aGUgYXBwcm9wcmlhdGUgZGlyZWN0aW9uIChtaW51cyBmcm9tIDM2MCB0byByZXZlcnNlIGl0KVxuICB3aW5kRGlyZWN0aW9uLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHszNjAgLSB3ZWF0aGVyUGF5bG9hZC53aW5kLmRlZ31kZWcpYDtcbiAgdXRpbHMuY2hlY2tEYXlUaW1lKHV0aWxzLnJldHVybkRhdGVGcm9tVW5peCh3ZWF0aGVyUGF5bG9hZC5kdCkpO1xufTtcblxuZXhwb3J0IHsgdXBkYXRlQmFja2dyb3VuZCwgYWRkV2VhdGhlclRvVUksIGNsZWFyQ2l0eUlucHV0IH07XG4iLCJpbXBvcnQgKiBhcyBjb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuY29uc3QgY2l0eUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktZm9ybVwiKTtcbmNpdHlGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnRyb2xsZXIub3JjaGVzdHJhdGVDaXR5SW5wdXQoZmFsc2UsIGV2ZW50LnRhcmdldFswXSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChldmVudCkgPT4ge1xuICBjb250cm9sbGVyLm9yY2hlc3RyYXRlQ2l0eUlucHV0KHRydWUpO1xufSk7XG4iLCJjb25zdCBjYXBpdGFsaXNlRmlyc3RMZXR0ZXIgPSAoc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59O1xuXG5jb25zdCByZXR1cm5EYXRlRnJvbVVuaXggPSAoZGF0ZSkgPT4ge1xuICBjb25zdCB1bml4RGF0ZSA9IG5ldyBEYXRlKGRhdGUgKiAxMDAwKTtcbiAgcmV0dXJuIHVuaXhEYXRlO1xufTtcblxuY29uc3QgZ2V0SWNvbiA9ICh3ZWF0aGVySUQsIGRheVRpbWUpID0+IHtcbiAgbGV0IGljb247XG5cbiAgaWYgKHdlYXRoZXJJRCA+PSAyMDAgJiYgd2VhdGhlcklEIDwgMzAwKSB7XG4gICAgaWNvbiA9IFwidGh1bmRlcnN0b3JtXCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA+PSAzMDAgJiYgd2VhdGhlcklEIDwgNjAwKSB7XG4gICAgaWNvbiA9IFwicmFpbnlcIjtcbiAgfVxuICBpZiAod2VhdGhlcklEID49IDYwMCAmJiB3ZWF0aGVySUQgPCA3MDApIHtcbiAgICBpY29uID0gXCJhY191bml0XCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA9PT0gODAwKSB7XG4gICAgaWNvbiA9IFwiY2xlYXJfXCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA9PT0gODAxIHx8IHdlYXRoZXJJRCA9PT0gODAyKSB7XG4gICAgaWNvbiA9IFwicGFydGx5X2Nsb3VkeV9cIjtcbiAgfVxuICBpZiAod2VhdGhlcklEID09PSA4MDMgfHwgd2VhdGhlcklEID09PSA4MDQpIHtcbiAgICBpY29uID0gXCJjbG91ZHlcIjtcbiAgfVxuXG4gIGlmICh3ZWF0aGVySUQgPj0gODAwICYmIHdlYXRoZXJJRCA8PSA4MDIpIHtcbiAgICBpY29uICs9IGRheVRpbWU7XG4gIH1cblxuICByZXR1cm4gaWNvbjtcbn07XG5cbmNvbnN0IGNoZWNrRGF5VGltZSA9IChkYXRlVGltZSkgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcblxuICBsZXQgZGF5dGltZTtcblxuICBpZiAoaG91cnMgPj0gNiAmJiBob3VycyA8PSAyMCkge1xuICAgIGRheXRpbWUgPSBcImRheVwiO1xuICB9IGVsc2Uge1xuICAgIGRheXRpbWUgPSBcIm5pZ2h0XCI7XG4gIH1cblxuICByZXR1cm4gZGF5dGltZTtcbn07XG5cbmV4cG9ydCB7IGNoZWNrRGF5VGltZSwgZ2V0SWNvbiwgcmV0dXJuRGF0ZUZyb21Vbml4LCBjYXBpdGFsaXNlRmlyc3RMZXR0ZXIgfTtcbiIsIi8vIFRvIGdldCBzdGFydGVkIHdpdGggcHJvamVjdCBvbmx5LiBPbmNlIHByb2plY3QgaXMgdXAgYW5kIHJ1bm5pbmcsIGV4cGxvcmUgdXNpbmcgR2l0SHViIHNlY3JldHMgYXMgYW4gYWx0ZXJuYXRpdmUgZ29pbmcgZm9yd2FyZFxuY29uc3Qga2V5ID0gXCIxYjk4ZmQxYzYyOGFmOWYxOTE3NGRkMzkyY2FhOTc4MFwiO1xuXG5jb25zdCBnZXRDb29yZGluYXRlcyA9IGFzeW5jIChsb2NhdGlvbiA9IFwiZHVuZGVlXCIpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7bG9jYXRpb259JmFwcGlkPSR7a2V5fWBcbiAgICApO1xuICAgIGNvbnN0IGNvb3JkcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBsYXQgPSBjb29yZHNbMF0ubGF0O1xuICAgIGNvbnN0IGxvbiA9IGNvb3Jkc1swXS5sb247XG4gICAgLy8gVE9ETzogc29tZSBsb2dpYyBzbyBpZiB0aGUgY29vcmRzIHJlc3BvbnNlIGlzIGJsYW5rLCBwcm9tcHQgdGhlIHVzZXJcbiAgICByZXR1cm4gY29vcmRzWzBdO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59O1xuXG5jb25zdCBnZXRDdXJyZW50V2VhdGhlciA9IGFzeW5jIChsYXQsIGxvbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0fSZsb249JHtsb259JiZ1bml0cz1tZXRyaWMmYXBwaWQ9JHtrZXl9YFxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyRm9yZWNhc3QgPSBhc3luYyAobGF0LCBsb24pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGB1cmwuLi4uLi5gKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ2V0Q29vcmRpbmF0ZXMsIGdldEN1cnJlbnRXZWF0aGVyLCBnZXRXZWF0aGVyRm9yZWNhc3QgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2FwcCB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuI2N1cnJlbnQtd2VhdGhlcj4uaW5uZXItY29udGFpbmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjYpO1xcbiAgICBwYWRkaW5nOiAzMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gICAgcm93LWdhcDogMTBweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2RldGFpbHMtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG4gICAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uZGV0YWlsLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMC41ZW07XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMCAwIC8gMzQlKTtcXG59XFxuXFxuLmRldGFpbC10aXRsZSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogMC43ZW07XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcblxcbn1cXG5cXG4jY3VycmVudC13ZWF0aGVyIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiNmb3JlY2FzdC13ZWF0aGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjYpO1xcblxcbn1cXG5cXG4jdGVtcGVyYXR1cmUge1xcbiAgICBmb250LXNpemU6IDdlbTtcXG59XFxuXFxuI2ljb24ge1xcbiAgICBmb250LXNpemU6IDEwZW07XFxufVxcblxcbmxhYmVsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuZm9ybSB7XFxuICAgIG1hcmdpbjogMTBweDtcXG59XFxuXFxuLmZsZXgge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxufVxcblxcbmlucHV0IHtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjMwcHgpIHtcXG4gICAgI2RldGFpbHMtY29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAuaW5uZXItY29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgbWluLXdpZHRoOiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQyMHB4KSB7XFxuICAgIFxcbiAgICAjdGVtcGVyYXR1cmUge1xcbiAgICAgICAgZm9udC1zaXplOiA0ZW07XFxuICAgIH1cXG4gICAgI2ljb24ge1xcbiAgICAgICAgZm9udC1zaXplOiA2ZW07XFxuICAgIH1cXG5cXG59XFxuXFxuQG1lZGlhIChtYXgtaGVpZ2h0OiA3NTBweCkge1xcbiAgICAuZGV0YWlsLWNvbnRhaW5lciB7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcblxcbiAgICB9XFxuXFxuXFxuXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQiw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLDJCQUEyQjtJQUMzQixzQkFBc0I7SUFDdEIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsVUFBVTtJQUNWLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLG9CQUFvQjs7QUFFeEI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxvQ0FBb0M7O0FBRXhDOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSTtRQUNJLHNCQUFzQjtRQUN0QixXQUFXO0lBQ2Y7SUFDQTtRQUNJLGFBQWE7UUFDYixzQkFBc0I7UUFDdEIsY0FBYztJQUNsQjtBQUNKOztBQUVBOztJQUVJO1FBQ0ksY0FBYztJQUNsQjtJQUNBO1FBQ0ksY0FBYztJQUNsQjs7QUFFSjs7QUFFQTtJQUNJO1FBQ0ksbUJBQW1COztJQUV2Qjs7OztBQUlKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxufVxcblxcbiNhcHAge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbiNjdXJyZW50LXdlYXRoZXI+LmlubmVyLWNvbnRhaW5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMSwgMSwgMSwgMC42KTtcXG4gICAgcGFkZGluZzogMzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAgIHJvdy1nYXA6IDEwcHg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNkZXRhaWxzLWNvbnRhaW5lciB7XFxuICAgIGdyaWQtY29sdW1uOiAxLzM7XFxuICAgIGdhcDogMTBweDtcXG59XFxuXFxuLmRldGFpbC1jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDAuNWVtO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigwIDAgMCAvIDM0JSk7XFxufVxcblxcbi5kZXRhaWwtdGl0bGUge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IDAuN2VtO1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG5cXG59XFxuXFxuI2N1cnJlbnQtd2VhdGhlciB7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jZm9yZWNhc3Qtd2VhdGhlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMSwgMSwgMSwgMC42KTtcXG5cXG59XFxuXFxuI3RlbXBlcmF0dXJlIHtcXG4gICAgZm9udC1zaXplOiA3ZW07XFxufVxcblxcbiNpY29uIHtcXG4gICAgZm9udC1zaXplOiAxMGVtO1xcbn1cXG5cXG5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbmZvcm0ge1xcbiAgICBtYXJnaW46IDEwcHg7XFxufVxcblxcbi5mbGV4IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmdyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbn1cXG5cXG5pbnB1dCB7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDhweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYzMHB4KSB7XFxuICAgICNkZXRhaWxzLWNvbnRhaW5lciB7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG4gICAgLmlubmVyLWNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIG1pbi13aWR0aDogNzUlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA0MjBweCkge1xcbiAgICBcXG4gICAgI3RlbXBlcmF0dXJlIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNGVtO1xcbiAgICB9XFxuICAgICNpY29uIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNmVtO1xcbiAgICB9XFxuXFxufVxcblxcbkBtZWRpYSAobWF4LWhlaWdodDogNzUwcHgpIHtcXG4gICAgLmRldGFpbC1jb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG5cXG4gICAgfVxcblxcblxcblxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICogYXMgd2VhdGhlciBmcm9tIFwiLi93ZWF0aGVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0ICogYXMgbGlzZXRlbmVycyBmcm9tIFwiLi9saXN0ZW5lcnNcIjtcbiJdLCJuYW1lcyI6WyJ3ZWF0aGVyIiwiZGlzcGxheSIsIm9yY2hlc3RyYXRlQ2l0eUlucHV0IiwiZGVmYXVsdENpdHkiLCJjaXR5SW5wdXQiLCJjaXR5IiwidmFsdWUiLCJjb29yZHMiLCJnZXRDb29yZGluYXRlcyIsIndlYXRoZXJEYXRhIiwidGhlbiIsImRhdGEiLCJjdXJyZW50V2VhdGhlciIsImdldEN1cnJlbnRXZWF0aGVyIiwibGF0IiwibG9uIiwiY2xlYXJDaXR5SW5wdXQiLCJQcm9taXNlIiwiYWxsIiwidXBkYXRlQmFja2dyb3VuZCIsIm1haW4iLCJhZGRXZWF0aGVyVG9VSSIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImNsZWFyIiwiY2xvdWRzIiwiZHJpenpsZSIsInJhaW4iLCJhdG1vc3BoZXJlIiwic25vdyIsInV0aWxzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvbmRpdGlvbiIsImFwcCIsInVybCIsInRvTG93ZXJDYXNlIiwiYXRtcG9zcGhlcmljIiwiaW5kZXhPZiIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwid2VhdGhlclBheWxvYWQiLCJsb2NhdGlvbkRhdGEiLCJsb2NhdGlvbiIsIndlYXRoZXJEZXNjcmlwdGlvbiIsInRlbXAiLCJmZWVsc0xpa2UiLCJkYXRlQ2hlY2tlZCIsImljb24iLCJ3aW5kU3BlZWQiLCJ3aW5kRGlyZWN0aW9uIiwiaW5uZXJUZXh0IiwibmFtZSIsInN0YXRlIiwiY2FwaXRhbGlzZUZpcnN0TGV0dGVyIiwiZGVzY3JpcHRpb24iLCJnZXRJY29uIiwiaWQiLCJjaGVja0RheVRpbWUiLCJyZXR1cm5EYXRlRnJvbVVuaXgiLCJkdCIsImlubmVySFRNTCIsIk1hdGgiLCJyb3VuZCIsImZlZWxzX2xpa2UiLCJ0b0xvY2FsZVN0cmluZyIsIndpbmQiLCJzcGVlZCIsInRyYW5zZm9ybSIsImRlZyIsImNvbnRyb2xsZXIiLCJjaXR5Rm9ybSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0Iiwid2luZG93Iiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRhdGUiLCJ1bml4RGF0ZSIsIkRhdGUiLCJ3ZWF0aGVySUQiLCJkYXlUaW1lIiwiZGF0ZVRpbWUiLCJob3VycyIsImdldEhvdXJzIiwiZGF5dGltZSIsImtleSIsInJlc3BvbnNlIiwiZmV0Y2giLCJqc29uIiwiZ2V0V2VhdGhlckZvcmVjYXN0IiwibGlzZXRlbmVycyJdLCJzb3VyY2VSb290IjoiIn0=