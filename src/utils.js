const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const returnDateFromUnix = (date) => {
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

const checkDayTime = (dateTime) => {
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

export { checkDayTime, getIcon, returnDateFromUnix, capitaliseFirstLetter };
