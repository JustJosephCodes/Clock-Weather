const cityDisplay = document.querySelector(".city-display");
const tempDisplay = document.querySelector(".temp-display");
const humidityDisplay = document.querySelector(".humidity-display");
const descDisplay = document.querySelector(".description-display");

const clockContainer = document.querySelector("#clock-container");
const clock = document.querySelector("#clock");
let meridiemSpan = document.querySelector("#meridiem");



const weather = document.querySelector(".weather");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "8ad22d8da6b3f6f24a9a118322931874";


weather.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeather(city);
      displayWeather(weatherData);
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
  setTimeout(() => {
    card.removeChild(errorDisplay);
    cityInput.value = "";
  }, 5000);
}

function displayWeather(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  // id might be useful for future features

  card.textContent = "";
  card.style.display = "flex";

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity ${humidity}%`;
  descDisplay.textContent = description;

  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);

  cityInput.value = "";
}

// clock program

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, 0);
  const minutes = now.getMinutes().toString().padStart(2, 0);
  const seconds = now.getSeconds().toString().padStart(2, 0);
  const time = `${hours}:${minutes}:${seconds}  `;


  clock.textContent = time;
  clockContainer.appendChild(clock);

  clock.textContent = time;
  meridiemSpan.textContent = ` ${meridiem} `.toLocaleLowerCase();

  clockContainer.appendChild(meridiemSpan);


  
}

updateClock();
setInterval(updateClock, 1000);