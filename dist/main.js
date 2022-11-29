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
/* harmony export */   "getCurrentWeather": () => (/* binding */ getCurrentWeather)
/* harmony export */ });
// To get started with project only. Once project is up and running, explore using GitHub secrets as an alternative going forward
const key = "1b98fd1c628af9f19174dd392caa9780";
const getCoordinates = async function () {
  let location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "dundee";
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`);
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0px;\n    color: white;\n    font-family: 'Roboto', sans-serif;\n}\n\n#app {\n    min-height: 100vh;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n#current-weather>.inner-container {\n    background-color: rgba(1, 1, 1, 0.6);\n    padding: 30px;\n    border-radius: 10px;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    row-gap: 10px;\n    align-items: center;\n}\n\n#details-container {\n    grid-column: 1/3;\n    gap: 10px;\n}\n\n.detail-container {\n    padding: 10px;\n    flex-direction: column;\n    gap: 0.5em;\n    justify-content: space-between;\n    align-items: center;\n    border: 1px solid black;\n    border-radius: 5px;\n    background-color: rgb(0 0 0 / 34%);\n}\n\n.detail-container:hover {\n    font-weight: bold;\n\n}\n\n.detail-title {\n    text-transform: uppercase;\n    font-size: 0.7em;\n    align-self: flex-end;\n\n}\n\n#current-weather {\n    justify-content: center;\n}\n\n#forecast-weather {\n    background-color: rgba(1, 1, 1, 0.6);\n\n}\n\n#temperature {\n    font-size: 7em;\n}\n\n#icon {\n    font-size: 10em;\n}\n\nlabel {\n    display: none;\n}\n\nform {\n    margin: 10px;\n}\n\n.flex {\n    display: flex;\n}\n\n.grid {\n    display: grid;\n}\n\nheader {\n    justify-content: flex-end;\n}\n\ninput {\n    box-shadow: none;\n    padding: 8px;\n}\n\n@media (max-width: 630px) {\n    #details-container {\n        flex-direction: column;\n        width: 100%;\n    }\n    .inner-container {\n        display: flex;\n        flex-direction: column;\n        min-width: 75%;\n    }\n}\n\n@media (max-width: 420px) {\n    \n    #temperature {\n        font-size: 4em;\n    }\n    #icon {\n        font-size: 6em;\n    }\n\n}\n\n@media (max-height: 750px) {\n    .detail-container {\n        flex-direction: row;\n\n    }\n\n\n\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,iBAAiB;IACjB,4BAA4B;IAC5B,sBAAsB;IACtB,2BAA2B;IAC3B,sBAAsB;IACtB,8BAA8B;AAClC;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,qBAAqB;IACrB,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,UAAU;IACV,8BAA8B;IAC9B,mBAAmB;IACnB,uBAAuB;IACvB,kBAAkB;IAClB,kCAAkC;AACtC;;AAEA;IACI,iBAAiB;;AAErB;;AAEA;IACI,yBAAyB;IACzB,gBAAgB;IAChB,oBAAoB;;AAExB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,oCAAoC;;AAExC;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,gBAAgB;IAChB,YAAY;AAChB;;AAEA;IACI;QACI,sBAAsB;QACtB,WAAW;IACf;IACA;QACI,aAAa;QACb,sBAAsB;QACtB,cAAc;IAClB;AACJ;;AAEA;;IAEI;QACI,cAAc;IAClB;IACA;QACI,cAAc;IAClB;;AAEJ;;AAEA;IACI;QACI,mBAAmB;;IAEvB;;;;AAIJ","sourcesContent":["body {\n    margin: 0px;\n    color: white;\n    font-family: 'Roboto', sans-serif;\n}\n\n#app {\n    min-height: 100vh;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n#current-weather>.inner-container {\n    background-color: rgba(1, 1, 1, 0.6);\n    padding: 30px;\n    border-radius: 10px;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    row-gap: 10px;\n    align-items: center;\n}\n\n#details-container {\n    grid-column: 1/3;\n    gap: 10px;\n}\n\n.detail-container {\n    padding: 10px;\n    flex-direction: column;\n    gap: 0.5em;\n    justify-content: space-between;\n    align-items: center;\n    border: 1px solid black;\n    border-radius: 5px;\n    background-color: rgb(0 0 0 / 34%);\n}\n\n.detail-container:hover {\n    font-weight: bold;\n\n}\n\n.detail-title {\n    text-transform: uppercase;\n    font-size: 0.7em;\n    align-self: flex-end;\n\n}\n\n#current-weather {\n    justify-content: center;\n}\n\n#forecast-weather {\n    background-color: rgba(1, 1, 1, 0.6);\n\n}\n\n#temperature {\n    font-size: 7em;\n}\n\n#icon {\n    font-size: 10em;\n}\n\nlabel {\n    display: none;\n}\n\nform {\n    margin: 10px;\n}\n\n.flex {\n    display: flex;\n}\n\n.grid {\n    display: grid;\n}\n\nheader {\n    justify-content: flex-end;\n}\n\ninput {\n    box-shadow: none;\n    padding: 8px;\n}\n\n@media (max-width: 630px) {\n    #details-container {\n        flex-direction: column;\n        width: 100%;\n    }\n    .inner-container {\n        display: flex;\n        flex-direction: column;\n        min-width: 75%;\n    }\n}\n\n@media (max-width: 420px) {\n    \n    #temperature {\n        font-size: 4em;\n    }\n    #icon {\n        font-size: 6em;\n    }\n\n}\n\n@media (max-height: 750px) {\n    .detail-container {\n        flex-direction: row;\n\n    }\n\n\n\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgd2VhdGhlciBmcm9tIFwiLi93ZWF0aGVyXCI7XG5pbXBvcnQgKiBhcyBkaXNwbGF5IGZyb20gXCIuL2Rpc3BsYXlcIjtcblxuLy8gd2hlbiB0aGUgY2l0eSBpcyB1cGRhdGVkLCBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gY28tb3JkaW5hdGUgYWxsIHRoZSBmdW5jdGlvbnMgdG8gYmUgZXhlY3V0ZWQgYXMgYSByZXN1bHRcbmNvbnN0IG9yY2hlc3RyYXRlQ2l0eUlucHV0ID0gYXN5bmMgKGRlZmF1bHRDaXR5LCBjaXR5SW5wdXQpID0+IHtcbiAgLy8gZmlyc3QgY2hlY2sgaWYgZGVmYXVsdCBjaXR5IGlzIHRydWUgd2hpY2ggYWxsb3dzIGEgZGVmYXVsdCB0byBiZSBjYWxsZWQgb24gcGFnZSBsb2FkXG4gIGxldCBjaXR5O1xuICBpZiAoZGVmYXVsdENpdHkgPT09IHRydWUpIHtcbiAgICBjaXR5ID0gXCJkdW5kZWVcIjtcbiAgfSBlbHNlIHtcbiAgICBjaXR5ID0gY2l0eUlucHV0LnZhbHVlO1xuICB9XG5cbiAgLy8gY2FsbCBmdW5jdGlvbiB0byBnZXQgY29vcmRzIGFuZCB3aGVuIGdldCB0aGUgd2VhdGhlciB3aGVuIHByb21pc2UgcmVzb2x2ZWRcbiAgY29uc3QgY29vcmRzID0gd2VhdGhlci5nZXRDb29yZGluYXRlcyhjaXR5KTtcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBjb29yZHMudGhlbigoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyID0gd2VhdGhlci5nZXRDdXJyZW50V2VhdGhlcihkYXRhLmxhdCwgZGF0YS5sb24pO1xuICAgIHJldHVybiBjdXJyZW50V2VhdGhlcjtcbiAgfSk7XG5cbiAgLy8gY2xlYXIgb3V0IHRoZSBpbnB1dCBmaWVsZCBzbyB1c2VyIGNhbiBlYXNpbHkgcmVzZWFyY2hcbiAgZGlzcGxheS5jbGVhckNpdHlJbnB1dCgpO1xuXG4gIC8vYnkgdGhlbiB1c2luZyBwcm9taXNlIGFsbCwgd2UgY2FuIGFsc28gZ2V0IHRoZSBpbml0aWFsIGNvb3JkcyBkYXRhXG4gIHJldHVybiBQcm9taXNlLmFsbChbY29vcmRzLCB3ZWF0aGVyRGF0YV0pXG4gICAgLnRoZW4oKFtjb29yZHMsIHdlYXRoZXJEYXRhXSkgPT4ge1xuICAgICAgZGlzcGxheS51cGRhdGVCYWNrZ3JvdW5kKHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbik7XG4gICAgICBkaXNwbGF5LmFkZFdlYXRoZXJUb1VJKHdlYXRoZXJEYXRhLCBjb29yZHMpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgeyBvcmNoZXN0cmF0ZUNpdHlJbnB1dCB9O1xuIiwiaW1wb3J0IGNsZWFyIGZyb20gXCIuL2Fzc2V0cy9jbGVhci5qcGdcIjtcbmltcG9ydCBjbG91ZHMgZnJvbSBcIi4vYXNzZXRzL2Nsb3Vkcy5qcGdcIjtcbmltcG9ydCBkcml6emxlIGZyb20gXCIuL2Fzc2V0cy9kcml6emxlLmpwZ1wiO1xuaW1wb3J0IHJhaW4gZnJvbSBcIi4vYXNzZXRzL3JhaW4uanBnXCI7XG5pbXBvcnQgYXRtb3NwaGVyZSBmcm9tIFwiLi9hc3NldHMvYXRtb3NwaGVyZS5qcGdcIjtcbmltcG9ydCBzbm93IGZyb20gXCIuL2Fzc2V0cy9zbm93LmpwZ1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgY2xlYXJDaXR5SW5wdXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktc2VhcmNoXCIpO1xuICBjaXR5LnZhbHVlID0gXCJcIjtcbn07XG5cbmNvbnN0IHVwZGF0ZUJhY2tncm91bmQgPSAoY29uZGl0aW9uKSA9PiB7XG4gIGNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuICBsZXQgdXJsID0gY29uZGl0aW9uLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGF0bXBvc3BoZXJpYyA9IFtcbiAgICBcIk1pc3RcIixcbiAgICBcIlNtb2tlXCIsXG4gICAgXCJIYXplXCIsXG4gICAgXCJEdXN0XCIsXG4gICAgXCJGb2dcIixcbiAgICBcIlNhbmRcIixcbiAgICBcIkR1c3RcIixcbiAgICBcIkFzaFwiLFxuICAgIFwiU3F1YWxsXCIsXG4gICAgXCJUb3JuYWRvXCIsXG4gIF07XG5cbiAgaWYgKGF0bXBvc3BoZXJpYy5pbmRleE9mKGNvbmRpdGlvbikgIT09IC0xKSB7XG4gICAgdXJsID0gXCJhdG1vc3BoZXJlXCI7XG4gIH1cbiAgYXBwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYigyNTUgMjU1IDI1NSAvIDAlKSwgcmdiKDAgMCAwIC8gNDUlKSksdXJsKFxcXCJhc3NldHMvJHt1cmx9LmpwZ1xcXCIpYDtcbn07XG5cbmNvbnN0IGFkZFdlYXRoZXJUb1VJID0gKHdlYXRoZXJQYXlsb2FkLCBsb2NhdGlvbkRhdGEpID0+IHtcbiAgLy8gbGlzdCBvdXQgYWxsIHRoZSBlbGVtZW50cyB0byB1cGRhdGVcbiAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpO1xuICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBlcmF0dXJlXCIpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzLWxpa2VcIik7XG4gIGNvbnN0IGRhdGVDaGVja2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLWNoZWNrZWRcIik7XG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb25cIik7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1zcGVlZFwiKTtcbiAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kaXJlY3Rpb25cIik7XG5cbiAgLy8gTE9DQVRJT05cbiAgbG9jYXRpb24uaW5uZXJUZXh0ID0gYCR7bG9jYXRpb25EYXRhLm5hbWV9LCAke2xvY2F0aW9uRGF0YS5zdGF0ZX1gO1xuXG4gIC8vIERFU0NSSVBUSU9OXG4gIHdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lclRleHQgPSB1dGlscy5jYXBpdGFsaXNlRmlyc3RMZXR0ZXIoXG4gICAgd2VhdGhlclBheWxvYWQud2VhdGhlclswXS5kZXNjcmlwdGlvblxuICApO1xuXG4gIC8vIElDT05cbiAgaWNvbi5pbm5lclRleHQgPSB1dGlscy5nZXRJY29uKFxuICAgIHdlYXRoZXJQYXlsb2FkLndlYXRoZXJbMF0uaWQsXG4gICAgdXRpbHMuY2hlY2tEYXlUaW1lKHV0aWxzLnJldHVybkRhdGVGcm9tVW5peCh3ZWF0aGVyUGF5bG9hZC5kdCkpXG4gICk7XG5cbiAgLy8gVEVNUEVSQVRVUkVcbiAgdGVtcC5pbm5lckhUTUwgPSBgJHtNYXRoLnJvdW5kKFxuICAgIHdlYXRoZXJQYXlsb2FkLm1haW4udGVtcFxuICApfTxzcGFuPiYjMTc2Ozwvc3Bhbj5jYDtcblxuICAvLyBGRUVMUyBMSUtFIFRFTVBFUkFUVVJFXG4gIGZlZWxzTGlrZS5pbm5lckhUTUwgPSBgJHtNYXRoLnJvdW5kKFxuICAgIHdlYXRoZXJQYXlsb2FkLm1haW4uZmVlbHNfbGlrZVxuICApfTxzcGFuPiYjMTc2Ozwvc3Bhbj5jYDtcblxuICAvLyBEQVRFIEFORCBUSU1FXG4gIGRhdGVDaGVja2VkLmlubmVyVGV4dCA9IHV0aWxzXG4gICAgLnJldHVybkRhdGVGcm9tVW5peCh3ZWF0aGVyUGF5bG9hZC5kdClcbiAgICAudG9Mb2NhbGVTdHJpbmcoKTtcblxuICAvLyBXSU5EXG4gIHdpbmRTcGVlZC5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKHdlYXRoZXJQYXlsb2FkLndpbmQuc3BlZWQpfWA7XG4gIC8vIHJvdGF0ZSB0aGUgd2luZCBpY29uIHRvIHNob3cgdGhlIGFwcHJvcHJpYXRlIGRpcmVjdGlvbiAobWludXMgZnJvbSAzNjAgdG8gcmV2ZXJzZSBpdClcbiAgd2luZERpcmVjdGlvbi5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7MzYwIC0gd2VhdGhlclBheWxvYWQud2luZC5kZWd9ZGVnKWA7XG4gIHV0aWxzLmNoZWNrRGF5VGltZSh1dGlscy5yZXR1cm5EYXRlRnJvbVVuaXgod2VhdGhlclBheWxvYWQuZHQpKTtcbn07XG5cbmV4cG9ydCB7IHVwZGF0ZUJhY2tncm91bmQsIGFkZFdlYXRoZXJUb1VJLCBjbGVhckNpdHlJbnB1dCB9O1xuIiwiaW1wb3J0ICogYXMgY29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmNvbnN0IGNpdHlGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LWZvcm1cIik7XG5jaXR5Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb250cm9sbGVyLm9yY2hlc3RyYXRlQ2l0eUlucHV0KGZhbHNlLCBldmVudC50YXJnZXRbMF0pO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZXZlbnQpID0+IHtcbiAgY29udHJvbGxlci5vcmNoZXN0cmF0ZUNpdHlJbnB1dCh0cnVlKTtcbn0pO1xuIiwiY29uc3QgY2FwaXRhbGlzZUZpcnN0TGV0dGVyID0gKHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufTtcblxuY29uc3QgcmV0dXJuRGF0ZUZyb21Vbml4ID0gKGRhdGUpID0+IHtcbiAgY29uc3QgdW5peERhdGUgPSBuZXcgRGF0ZShkYXRlICogMTAwMCk7XG4gIHJldHVybiB1bml4RGF0ZTtcbn07XG5cbmNvbnN0IGdldEljb24gPSAod2VhdGhlcklELCBkYXlUaW1lKSA9PiB7XG4gIGxldCBpY29uO1xuXG4gIGlmICh3ZWF0aGVySUQgPj0gMjAwICYmIHdlYXRoZXJJRCA8IDMwMCkge1xuICAgIGljb24gPSBcInRodW5kZXJzdG9ybVwiO1xuICB9XG4gIGlmICh3ZWF0aGVySUQgPj0gMzAwICYmIHdlYXRoZXJJRCA8IDYwMCkge1xuICAgIGljb24gPSBcInJhaW55XCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA+PSA2MDAgJiYgd2VhdGhlcklEIDwgNzAwKSB7XG4gICAgaWNvbiA9IFwiYWNfdW5pdFwiO1xuICB9XG4gIGlmICh3ZWF0aGVySUQgPT09IDgwMCkge1xuICAgIGljb24gPSBcImNsZWFyX1wiO1xuICB9XG4gIGlmICh3ZWF0aGVySUQgPT09IDgwMSB8fCB3ZWF0aGVySUQgPT09IDgwMikge1xuICAgIGljb24gPSBcInBhcnRseV9jbG91ZHlfXCI7XG4gIH1cbiAgaWYgKHdlYXRoZXJJRCA9PT0gODAzIHx8IHdlYXRoZXJJRCA9PT0gODA0KSB7XG4gICAgaWNvbiA9IFwiY2xvdWR5XCI7XG4gIH1cblxuICBpZiAod2VhdGhlcklEID49IDgwMCAmJiB3ZWF0aGVySUQgPD0gODAyKSB7XG4gICAgaWNvbiArPSBkYXlUaW1lO1xuICB9XG5cbiAgcmV0dXJuIGljb247XG59O1xuXG5jb25zdCBjaGVja0RheVRpbWUgPSAoZGF0ZVRpbWUpID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVUaW1lKTtcbiAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG5cbiAgbGV0IGRheXRpbWU7XG5cbiAgaWYgKGhvdXJzID49IDYgJiYgaG91cnMgPD0gMjApIHtcbiAgICBkYXl0aW1lID0gXCJkYXlcIjtcbiAgfSBlbHNlIHtcbiAgICBkYXl0aW1lID0gXCJuaWdodFwiO1xuICB9XG5cbiAgcmV0dXJuIGRheXRpbWU7XG59O1xuXG5leHBvcnQgeyBjaGVja0RheVRpbWUsIGdldEljb24sIHJldHVybkRhdGVGcm9tVW5peCwgY2FwaXRhbGlzZUZpcnN0TGV0dGVyIH07XG4iLCIvLyBUbyBnZXQgc3RhcnRlZCB3aXRoIHByb2plY3Qgb25seS4gT25jZSBwcm9qZWN0IGlzIHVwIGFuZCBydW5uaW5nLCBleHBsb3JlIHVzaW5nIEdpdEh1YiBzZWNyZXRzIGFzIGFuIGFsdGVybmF0aXZlIGdvaW5nIGZvcndhcmRcbmNvbnN0IGtleSA9IFwiMWI5OGZkMWM2MjhhZjlmMTkxNzRkZDM5MmNhYTk3ODBcIjtcblxuY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSBhc3luYyAobG9jYXRpb24gPSBcImR1bmRlZVwiKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7bG9jYXRpb259JmFwcGlkPSR7a2V5fWBcbiAgICApO1xuICAgIGNvbnN0IGNvb3JkcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBsYXQgPSBjb29yZHNbMF0ubGF0O1xuICAgIGNvbnN0IGxvbiA9IGNvb3Jkc1swXS5sb247XG4gICAgLy8gVE9ETzogc29tZSBsb2dpYyBzbyBpZiB0aGUgY29vcmRzIHJlc3BvbnNlIGlzIGJsYW5rLCBwcm9tcHQgdGhlIHVzZXJcbiAgICByZXR1cm4gY29vcmRzWzBdO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59O1xuXG5jb25zdCBnZXRDdXJyZW50V2VhdGhlciA9IGFzeW5jIChsYXQsIGxvbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0fSZsb249JHtsb259JiZ1bml0cz1tZXRyaWMmYXBwaWQ9JHtrZXl9YFxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59O1xuXG5leHBvcnQgeyBnZXRDb29yZGluYXRlcywgZ2V0Q3VycmVudFdlYXRoZXIgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2FwcCB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuI2N1cnJlbnQtd2VhdGhlcj4uaW5uZXItY29udGFpbmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjYpO1xcbiAgICBwYWRkaW5nOiAzMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gICAgcm93LWdhcDogMTBweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2RldGFpbHMtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG4gICAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uZGV0YWlsLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMC41ZW07XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMCAwIC8gMzQlKTtcXG59XFxuXFxuLmRldGFpbC1jb250YWluZXI6aG92ZXIge1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG5cXG59XFxuXFxuLmRldGFpbC10aXRsZSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogMC43ZW07XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcblxcbn1cXG5cXG4jY3VycmVudC13ZWF0aGVyIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiNmb3JlY2FzdC13ZWF0aGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjYpO1xcblxcbn1cXG5cXG4jdGVtcGVyYXR1cmUge1xcbiAgICBmb250LXNpemU6IDdlbTtcXG59XFxuXFxuI2ljb24ge1xcbiAgICBmb250LXNpemU6IDEwZW07XFxufVxcblxcbmxhYmVsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuZm9ybSB7XFxuICAgIG1hcmdpbjogMTBweDtcXG59XFxuXFxuLmZsZXgge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxufVxcblxcbmlucHV0IHtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjMwcHgpIHtcXG4gICAgI2RldGFpbHMtY29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAuaW5uZXItY29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgbWluLXdpZHRoOiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQyMHB4KSB7XFxuICAgIFxcbiAgICAjdGVtcGVyYXR1cmUge1xcbiAgICAgICAgZm9udC1zaXplOiA0ZW07XFxuICAgIH1cXG4gICAgI2ljb24ge1xcbiAgICAgICAgZm9udC1zaXplOiA2ZW07XFxuICAgIH1cXG5cXG59XFxuXFxuQG1lZGlhIChtYXgtaGVpZ2h0OiA3NTBweCkge1xcbiAgICAuZGV0YWlsLWNvbnRhaW5lciB7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcblxcbiAgICB9XFxuXFxuXFxuXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQiw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLDJCQUEyQjtJQUMzQixzQkFBc0I7SUFDdEIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsVUFBVTtJQUNWLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxpQkFBaUI7O0FBRXJCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGdCQUFnQjtJQUNoQixvQkFBb0I7O0FBRXhCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksb0NBQW9DOztBQUV4Qzs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0k7UUFDSSxzQkFBc0I7UUFDdEIsV0FBVztJQUNmO0lBQ0E7UUFDSSxhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLGNBQWM7SUFDbEI7QUFDSjs7QUFFQTs7SUFFSTtRQUNJLGNBQWM7SUFDbEI7SUFDQTtRQUNJLGNBQWM7SUFDbEI7O0FBRUo7O0FBRUE7SUFDSTtRQUNJLG1CQUFtQjs7SUFFdkI7Ozs7QUFJSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4jYXBwIHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4jY3VycmVudC13ZWF0aGVyPi5pbm5lci1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEsIDEsIDEsIDAuNik7XFxuICAgIHBhZGRpbmc6IDMwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgICByb3ctZ2FwOiAxMHB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jZGV0YWlscy1jb250YWluZXIge1xcbiAgICBncmlkLWNvbHVtbjogMS8zO1xcbiAgICBnYXA6IDEwcHg7XFxufVxcblxcbi5kZXRhaWwtY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAwLjVlbTtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCAwIDAgLyAzNCUpO1xcbn1cXG5cXG4uZGV0YWlsLWNvbnRhaW5lcjpob3ZlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcblxcbn1cXG5cXG4uZGV0YWlsLXRpdGxlIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgZm9udC1zaXplOiAwLjdlbTtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuXFxufVxcblxcbiNjdXJyZW50LXdlYXRoZXIge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuI2ZvcmVjYXN0LXdlYXRoZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEsIDEsIDEsIDAuNik7XFxuXFxufVxcblxcbiN0ZW1wZXJhdHVyZSB7XFxuICAgIGZvbnQtc2l6ZTogN2VtO1xcbn1cXG5cXG4jaWNvbiB7XFxuICAgIGZvbnQtc2l6ZTogMTBlbTtcXG59XFxuXFxubGFiZWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5mb3JtIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uZmxleCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5ncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuaW5wdXQge1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MzBweCkge1xcbiAgICAjZGV0YWlscy1jb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxuICAgIC5pbm5lci1jb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICBtaW4td2lkdGg6IDc1JTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNDIwcHgpIHtcXG4gICAgXFxuICAgICN0ZW1wZXJhdHVyZSB7XFxuICAgICAgICBmb250LXNpemU6IDRlbTtcXG4gICAgfVxcbiAgICAjaWNvbiB7XFxuICAgICAgICBmb250LXNpemU6IDZlbTtcXG4gICAgfVxcblxcbn1cXG5cXG5AbWVkaWEgKG1heC1oZWlnaHQ6IDc1MHB4KSB7XFxuICAgIC5kZXRhaWwtY29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuXFxuICAgIH1cXG5cXG5cXG5cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAqIGFzIHdlYXRoZXIgZnJvbSBcIi4vd2VhdGhlclwiO1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCAqIGFzIGxpc2V0ZW5lcnMgZnJvbSBcIi4vbGlzdGVuZXJzXCI7XG4iXSwibmFtZXMiOlsid2VhdGhlciIsImRpc3BsYXkiLCJvcmNoZXN0cmF0ZUNpdHlJbnB1dCIsImRlZmF1bHRDaXR5IiwiY2l0eUlucHV0IiwiY2l0eSIsInZhbHVlIiwiY29vcmRzIiwiZ2V0Q29vcmRpbmF0ZXMiLCJ3ZWF0aGVyRGF0YSIsInRoZW4iLCJkYXRhIiwiY3VycmVudFdlYXRoZXIiLCJnZXRDdXJyZW50V2VhdGhlciIsImxhdCIsImxvbiIsImNsZWFyQ2l0eUlucHV0IiwiUHJvbWlzZSIsImFsbCIsInVwZGF0ZUJhY2tncm91bmQiLCJtYWluIiwiYWRkV2VhdGhlclRvVUkiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJjbGVhciIsImNsb3VkcyIsImRyaXp6bGUiLCJyYWluIiwiYXRtb3NwaGVyZSIsInNub3ciLCJ1dGlscyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25kaXRpb24iLCJhcHAiLCJ1cmwiLCJ0b0xvd2VyQ2FzZSIsImF0bXBvc3BoZXJpYyIsImluZGV4T2YiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsIndlYXRoZXJQYXlsb2FkIiwibG9jYXRpb25EYXRhIiwibG9jYXRpb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJ0ZW1wIiwiZmVlbHNMaWtlIiwiZGF0ZUNoZWNrZWQiLCJpY29uIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsImlubmVyVGV4dCIsIm5hbWUiLCJzdGF0ZSIsImNhcGl0YWxpc2VGaXJzdExldHRlciIsImRlc2NyaXB0aW9uIiwiZ2V0SWNvbiIsImlkIiwiY2hlY2tEYXlUaW1lIiwicmV0dXJuRGF0ZUZyb21Vbml4IiwiZHQiLCJpbm5lckhUTUwiLCJNYXRoIiwicm91bmQiLCJmZWVsc19saWtlIiwidG9Mb2NhbGVTdHJpbmciLCJ3aW5kIiwic3BlZWQiLCJ0cmFuc2Zvcm0iLCJkZWciLCJjb250cm9sbGVyIiwiY2l0eUZvcm0iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsIndpbmRvdyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJkYXRlIiwidW5peERhdGUiLCJEYXRlIiwid2VhdGhlcklEIiwiZGF5VGltZSIsImRhdGVUaW1lIiwiaG91cnMiLCJnZXRIb3VycyIsImRheXRpbWUiLCJrZXkiLCJyZXNwb25zZSIsImZldGNoIiwianNvbiIsImxpc2V0ZW5lcnMiXSwic291cmNlUm9vdCI6IiJ9