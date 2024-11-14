document.addEventListener("DOMContentLoaded", () => {
    // Elements in the HTML to update with data
    const mainBox = document.querySelector(".main-box");
    const smallBoxes = document.querySelectorAll(".small-box");

    // Sample weather data for five cities to store in localStorage
    const citiesData = [
        { city: "Main City", highTemp: "75 °F", lowTemp: "65 °F", wind: "5 mph", humidity: "50%" },
        { city: "City 1", highTemp: "80 °F", lowTemp: "70 °F", wind: "6 mph", humidity: "55%" },
        { city: "City 2", highTemp: "78 °F", lowTemp: "68 °F", wind: "7 mph", humidity: "60%" },
        { city: "City 3", highTemp: "85 °F", lowTemp: "75 °F", wind: "8 mph", humidity: "65%" },
        { city: "City 4", highTemp: "77 °F", lowTemp: "67 °F", wind: "4 mph", humidity: "52%" }
    ];

    // Save cities data to localStorage
    function saveCitiesData(data) {
        localStorage.setItem("citiesData", JSON.stringify(data));
    }

    // Load cities data from localStorage
    function loadCitiesData() {
        const data = JSON.parse(localStorage.getItem("citiesData"));
        if (data && data.length === 5) {
            // Update main box with the first city's data
            updateBox(mainBox, data[0]);
            
            // Update each small box with data from the corresponding city
            smallBoxes.forEach((box, index) => {
                updateBox(box, data[index + 1]);
            });
        } else {
            mainBox.textContent = "Weather data not found";
        }
    }

    // Function to update a box with city data
    function updateBox(box, cityData) {
        box.innerHTML = `
            <strong>${cityData.city}</strong><br>
            High Temp: ${cityData.highTemp}<br>
            Low Temp: ${cityData.lowTemp}<br>
            Wind: ${cityData.wind}<br>
            Humidity: ${cityData.humidity}
        `;
    }

    // Initial data setup (only if localStorage is empty or data is missing)
    if (!localStorage.getItem("citiesData")) {
        saveCitiesData(citiesData);
    }

    // Load and display weather data
    loadCitiesData();
});
