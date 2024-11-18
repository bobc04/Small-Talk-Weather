document.addEventListener("DOMContentLoaded", () => {
    // Elements in the HTML to update with data
    const mainBox = document.querySelector(".main-box");
    const smallBoxes = document.querySelectorAll(".small-box");
    const citySelector = document.getElementById("citySelector");
    const cityDropdown = document.getElementById("cityDropdown");
    const navButton = document.getElementById("navButton");

    // Sample weather data for five cities, including state, weather details, and icon
    const citiesData = [
        { city: "Toronto", state: "Ontario", currentTempF: 55, highTempF: 60, lowTempF: 50, wind: "10 mph", humidity: "65%", icon: "cloudy.png" },
        { city: "Atlanta", state: "Georgia", currentTempF: 70, highTempF: 75, lowTempF: 65, wind: "5 mph", humidity: "50%", icon: "clear.png" },
        { city: "Orlando", state: "Florida", currentTempF: 80, highTempF: 85, lowTempF: 70, wind: "8 mph", humidity: "60%", icon: "partly-cloudy.png" },
        { city: "New York", state: "New York", currentTempF: 65, highTempF: 68, lowTempF: 58, wind: "12 mph", humidity: "55%", icon: "light-rain.png" },
        { city: "Chicago", state: "Illinois", currentTempF: 60, highTempF: 62, lowTempF: 52, wind: "15 mph", humidity: "70%", icon: "very-cloudy.png" },
    ];

    // Helper function to convert Fahrenheit to Celsius
    function fahrenheitToCelsius(tempF) {
        return ((tempF - 32) * 5) / 9;
    }

    // Save cities data to localStorage
    function saveCitiesData(data) {
        localStorage.setItem("citiesData", JSON.stringify(data));
    }

    // Load cities data from localStorage
    function loadCitiesData() {
        const data = JSON.parse(localStorage.getItem("citiesData"));
        if (data && data.length === 5) {
            // Set default view with the first city's data
            updateMainBox(data[0]);
            updateSmallBoxes(data[0]);
        } else {
            mainBox.textContent = "Weather data not found";
        }
    }

    // Function to update the main box with city, state, current temperature, and weather icon
    function updateMainBox(cityData) {
        const currentTempC = fahrenheitToCelsius(cityData.currentTempF).toFixed(1);

        mainBox.innerHTML = `
            <img src="./assets/images/icon/${cityData.icon}" alt="Weather Icon" style="width: 50px; height: 50px; margin-bottom: 10px;">
            <strong>${cityData.city}, ${cityData.state}</strong><br>
            Current Temp: ${cityData.currentTempF} °F (${currentTempC} °C)
        `;
    }

    // Function to update the small boxes with specific weather attributes
    function updateSmallBoxes(cityData) {
        const highTempC = fahrenheitToCelsius(cityData.highTempF).toFixed(1);
        const lowTempC = fahrenheitToCelsius(cityData.lowTempF).toFixed(1);

        const attributes = [
            { label: "High Temp", value: `${cityData.highTempF} °F (${highTempC} °C)` },
            { label: "Low Temp", value: `${cityData.lowTempF} °F (${lowTempC} °C)` },
            { label: "Wind", value: cityData.wind },
            { label: "Humidity", value: cityData.humidity },
        ];

        smallBoxes.forEach((box, index) => {
            const attribute = attributes[index];
            box.innerHTML = `
                <strong>${attribute.label}</strong><br>
                ${attribute.value}
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
        cityDropdown.style.display = "none";  // Hide the dropdown after selection
    });

    // Event listener for toggle visibility
    navButton.addEventListener("click", () => {
        cityDropdown.style.display = cityDropdown.style.display === "none" ? "block" : "none";
    });


    // Initial data setup (only if localStorage is empty or data is missing)
    if (!localStorage.getItem("citiesData")) {
        saveCitiesData(citiesData);
    }

    // Load and display weather data
    loadCitiesData();
});

// Box containing temperature in F/C for Morning, Afternoon, and Evening
let forecastEl = document.querySelector("#forecast");
const morningEl = document.querySelector("#morning-weather");
const afternoonEl = document.querySelector("#afternoon-weather");
const eveningEl = document.querySelector("#evening-weather");


const forecastData = {
    morning: { tempC: 20, condition: "Sunny" },
    afternoon: { tempC: 25, condition: "Partly Cloudy" },
    evening: { tempC: 18, condition: "Cloudy" }
};

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function formatTemperature(tempC) {
    const tempF = celsiusToFahrenheit(tempC);
    return `${tempC}°C / ${tempF.toFixed(1)}°F`;
}

function updateWeather() {
    morningEl.textContent = `${formatTemperature(forecastData.morning.tempC)} - ${forecastData.morning.condition}`;
    afternoonEl.textContent = `${formatTemperature(forecastData.afternoon.tempC)} - ${forecastData.afternoon.condition}`;
    eveningEl.textContent = `${formatTemperature(forecastData.evening.tempC)} - ${forecastData.evening.condition}`;
}

updateWeather();