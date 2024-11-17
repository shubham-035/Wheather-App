let wheatherImageEl = document.getElementById("wheatherImage");
let temperatureEl = document.getElementById("temperature");
let humidityEl = document.getElementById("Humidity");
let windEl = document.getElementById("wind");
let searchButtonEl = document.getElementById("searchButton");
let imgDescriptionEl = document.getElementById("imgDescription");

searchButtonEl.addEventListener("click", () => {
    const city = document.getElementById("inputUser").value.trim();
    const APIkey = "9765589b7a131a373dfd8610facdd6a4";
    city.value="";
    if (city === "") {
        alert("Please enter a valid city name");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            switch (data.weather[0].main) {
                case "Clear":
                    wheatherImageEl.src = "clear.png";
                    break;
                case "Rain":
                    wheatherImageEl.src = "rain.png";
                    break;
                case "Mist":
                case "Haze":
                    wheatherImageEl.src = "mist.png";
                    break;
                case "Clouds":
                    wheatherImageEl.src = "cloud.png";
                    break;
                case "Snow":
                    wheatherImageEl.src = "snow.png";
                    break;
                default:
                    wheatherImageEl.src = "cloud.png";
                    break;
            }

            temperatureEl.textContent = `${parseInt(data.main.temp)}`;
            humidityEl.textContent = `${data.main.humidity}%`;
            imgDescriptionEl.textContent = data.weather[0].description;
            windEl.textContent = `${data.wind.speed} km/h`;

            document.getElementById("inputUser").value = "";
        })
        .catch((error) => {
            alert(error.message);
        });
});
