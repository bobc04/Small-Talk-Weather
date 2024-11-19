/** @format */

document.addEventListener("DOMContentLoaded", () => {
    // Elements in the HTML to update with data
    const mainBox = document.querySelector(".main-box");
    const smallBoxes = document.querySelectorAll(".small-box");
    const citySelector = document.getElementById("citySelector");

    // Sample weather data for five cities to store in localStorage
    const citiesData = [
        {
            city: "Toronto",
            state: "Ontario",
            currentTemp: "55 °F",
            highTemp: "60 °F",
            lowTemp: "50 °F",
            wind: "10 mph",
            humidity: "65%",
            icon: "cloudy.png",
        },
        {
            city: "Atlanta",
            state: "Georgia",
            currentTemp: "70 °F",
            highTemp: "75 °F",
            lowTemp: "65 °F",
            wind: "5 mph",
            humidity: "50%",
            icon: "clear.png",
        },
        {
            city: "Orlando",
            state: "Florida",
            currentTemp: "80 °F",
            highTemp: "85 °F",
            lowTemp: "70 °F",
            wind: "8 mph",
            humidity: "60%",
            icon: "light-rain.png",
        },
        {
            city: "New York",
            state: "New York",
            currentTemp: "65 °F",
            highTemp: "68 °F",
            lowTemp: "58 °F",
            wind: "12 mph",
            humidity: "55%",
            icon: "light-rain.png",
        },
        {
            city: "Chicago",
            state: "Illinois",
            currentTemp: "60 °F",
            highTemp: "62 °F",
            lowTemp: "52 °F",
            wind: "15 mph",
            humidity: "70%",
            icon: "very-cloudy.png",
        },
    ];

    // Convert Fahrenheit to Celsius
    function fahrenheitToCelsius(tempF) {
        return ((tempF - 32) * 5) / 9;
    }

    // Format temperature in Fahrenheit and Celsius
    function formatTemperature(tempF) {
        const tempC = fahrenheitToCelsius(tempF).toFixed(1);
        return `${tempF}°F (${tempC}°C)`;
    }

    // Save cities data to localStorage
    function saveCitiesData(data) {
        localStorage.setItem("citiesData", JSON.stringify(data));
    }

    // Load cities data from localStorage
    function loadCitiesData() {
        let data = JSON.parse(localStorage.getItem("citiesData"));
        // Reinitialize if localStorage data is missing or corrupted
        if (!data || !Array.isArray(data) || data.length === 0) {
            saveCitiesData(citiesData);
            data = citiesData;
        }
        if (data && data.length === 5) {
            // Set default view with the first city's data
            updateMainBox(data[0]);
            updateSmallBoxes(data[0]);
        } else {
            mainBox.textContent = "Weather data not found";
        }
    }


    // Function to update the main box with city data
    function updateMainBox(cityData) {
        mainBox.innerHTML = `
            <img src="./assets/images/icon/${cityData.icon}" alt="Weather Icon" style="width: 80px; height: 80px; margin-bottom: 24px;"><br>
              <strong>${cityData.city}, ${cityData.state}</strong><br>
              Current Temp: ${cityData.currentTemp}°F / ${fahrenheitToCelsius(cityData.currentTemp).toFixed(1)}°C
          `;
    }

    // Function to update the small boxes with specific weather attributes
    function updateSmallBoxes(cityData) {
        const attributes = [
            { label: "High", value: cityData.highTemp },
            { label: "Low ", value: cityData.lowTemp },
            { label: "Wind", value: cityData.wind },
            { label: "Humidity", value: cityData.humidity },
        ];

        smallBoxes.forEach((box, index) => {
            const attribute = attributes[index];
            box.innerHTML = `
                  ${attribute.label}<br>
                  <strong>${attribute.value}</strong>
              `;
        });
    }

    // Event listener for dropdown menu
    citySelector.addEventListener("change", (event) => {
        const cityIndex = parseInt(event.target.value, 10);
        const data = JSON.parse(localStorage.getItem("citiesData"));
        if (data && cityIndex >= 0 && cityIndex < data.length) {
            const selectedCity = data[cityIndex];
            updateMainBox(selectedCity);
            updateSmallBoxes(selectedCity);
        }
        cityDropdown.style.display = "none"; // Hide the dropdown after selection
    });

    // Initial data setup (only if localStorage is empty or data is missing)
    if (!localStorage.getItem("citiesData")) {
        saveCitiesData(citiesData);
    }

    // Load and display weather data
    loadCitiesData();

    // Box containing temperature in F/C for Morning, Afternoon, and Evening
    let forecastEl = document.querySelector("#forecast");
    const morningEl = document.querySelector("#morning-weather");
    const afternoonEl = document.querySelector("#afternoon-weather");
    const eveningEl = document.querySelector("#evening-weather");
    const forecastData = {
        morning: { tempC: 20, condition: "Sunny" },
        afternoon: { tempC: 25, condition: "Partly Cloudy" },
        evening: { tempC: 18, condition: "Cloudy" },
    };
    function celsiusToFahrenheit(celsius) {
        return (celsius * 9) / 5 + 32;
    }
    function formatTemperature(tempC) {
        const tempF = celsiusToFahrenheit(tempC);
        return `${tempC}°C / ${tempF.toFixed(1)}°F`;
    }
    function updateWeather() {
        morningEl.textContent = `${formatTemperature(
            forecastData.morning.tempC
        )} - ${forecastData.morning.condition}`;
        afternoonEl.textContent = `${formatTemperature(
            forecastData.afternoon.tempC
        )} - ${forecastData.afternoon.condition}`;
        eveningEl.textContent = `${formatTemperature(
            forecastData.evening.tempC
        )} - ${forecastData.evening.condition}`;
    }
    updateWeather();
});
