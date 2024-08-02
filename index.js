const cityDisplay = document.querySelector(".city-display");
const tempDisplay = document.querySelector(".temp-display");
const humidityDisplay = document.querySelector(".humidity-display");
const descDisplay = document.querySelector(".description-display");

const weatherIcon = document.querySelector("#weatherIcon");

const clockContainer = document.querySelector("#clock-container");
const clock = document.querySelector("#clock");
let meridiemSpan = document.querySelector("#meridiem");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const date = document.querySelector(".date")

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

  changeIcon(id)
}

function changeIcon(id) {

  document.querySelector(".weather-icon").style.display = "flex";
  switch (true) {
    case (id >= 200 && id < 300):
      weatherIcon.src =
        "./images/thunderstorm_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
      break

    case (id >= 300 && id < 400):
      weatherIcon.src = "./images/10d@2x.png";
      break

    case (id > 500 && id < 600):
      weatherIcon.src = "./images/09d@2x.png";
      break

    case (id > 600 && id < 700):
      weatherIcon.src = "./images/13d@2x.png";
      break

    case (id > 700 && id < 800):
      weatherIcon.src = "./images/50d@2x.png";
      break

    case (id === 800):
      weatherIcon.src = "./images/sunny_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
      break

    case (id > 800):
      weatherIcon.src =
        "./images/partly_cloudy_day_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
        break

    default:
      document.querySelector(".weather-icon").style.display = "none";
      break;
  }
  
}

// clock program

function updateClock() {
  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
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

  const currentMonth = months[now.getMonth()]

  date.textContent = `${day} ${currentMonth} ${year} `
  
}

updateClock();
setInterval(updateClock, 1000);