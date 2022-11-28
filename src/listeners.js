import * as controller from "./controller";

const cityForm = document.getElementById("city-form");
cityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controller.orchestrateCityInput(false, event.target[0]);
});

window.addEventListener("load", (event) => {
  controller.orchestrateCityInput(true);
});
