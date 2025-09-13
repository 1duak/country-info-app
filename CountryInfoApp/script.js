fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,languages,currencies,latlng')
    .then(response => response.json()) // returns JSON promise
    .then(json => buildPage(json)) // process the JSON data
    .catch(error => console.log(error)); // handle errors

const buildPage = function (data) {
    console.log(data);

    // DOM Elements
    const search = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const countryName = document.querySelector(".country");
    const capitalName = document.querySelector(".capitalName");
    const languages = document.querySelector(".languages");
    const currency = document.querySelector(".nameAndSymbol");
    const flag = document.querySelector(".flag");
    const weatherIcon = document.querySelector(".weather-icon");
    const minTemp = document.querySelector(".MinTemp p");
    const maxTemp = document.querySelector(".MaxTemp p");

    const updateCountryInfo = async (country) => {
        if (country) {
            // Update country information
            countryName.innerHTML = `<h1>${country.name.common}</h1>`;
            capitalName.innerHTML = `<p>${country.capital}</p>`;
            languages.innerHTML = `<p>${Object.values(country.languages).join(", ")}</p>`;
            currency.innerHTML = `<p>${Object.values(country.currencies)
                .map(currency => `${currency.name} (${currency.symbol || ""})`)
                .join(", ")}</p>`;
            flag.innerHTML = `<img src="${country.flags.png}" class="flag-img">`;

            // Get latitude and longitude
            const [latitude, longitude] = country.latlng || [];

            if (latitude && longitude) {
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

                // Fetch and update weather
                const weatherResponse = await fetch(weatherUrl);
                if (weatherResponse.ok) {
                    const weatherData = await weatherResponse.json();
                    const maxTempValue = weatherData.daily.temperature_2m_max[0];
                    const minTempValue = weatherData.daily.temperature_2m_min[0];
                    const weatherCode = weatherData.daily.weathercode[0];  // Get the weather code for the condition
                    // Extract the temperature values (min and max) for each day from the response
                    const xValues = weatherData.daily.time; // Assuming time is in the daily object (i.e., dates or hours)
                    const yMaxValues = weatherData.daily.temperature_2m_max; // Maximum temperatures
                    const yMinValues = weatherData.daily.temperature_2m_min; // Minimum temperatures

                    // Plotting the data using Chart.js
                    new Chart("myChart", {
                        type: "line",
                        data: {
                            labels: xValues, // Set the x-axis as the dates or time values from the weather data
                            datasets: [
                                {
                                    label: "Max Temperature",
                                    fill: false,
                                    lineTension: 0,
                                    backgroundColor: "rgba(255,0,0,1.0)", // Red color for max temperature
                                    borderColor: "rgba(255,0,0,0.1)",
                                    data: yMaxValues, // Data for the max temperature values
                                    borderWidth: 2
                                },
                                {
                                    label: "Min Temperature",
                                    fill: false,
                                    lineTension: 0,
                                    backgroundColor: "rgba(0,0,255,1.0)", // Blue color for min temperature
                                    borderColor: "rgba(0,0,255,0.1)",
                                    data: yMinValues, // Data for the min temperature values
                                    borderWidth: 2
                                }
                            ]
                        },
                        options: {
                            legend: {
                                display: true
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        min: Math.min(...yMinValues) - 5, // Set dynamic min value for y-axis
                                        max: Math.max(...yMaxValues) + 5, // Set dynamic max value for y-axis
                                    }
                                }
                            }
                        }
                    });
                    // Update temperature elements
                    minTemp.innerHTML = `${minTempValue}°C`;
                    maxTemp.innerHTML = `${maxTempValue}°C`;

                    // Update the weather icon based on the weather code
                    switch (weatherCode) {
                        case 0:
                            weatherIcon.src = "images/clear.png"; // Clear sky
                            break;
                        case 1:
                        case 2:
                            weatherIcon.src = "images/cloudy.png"; // Partly cloudy
                            break;
                        case 3:
                        case 4:
                            weatherIcon.src = "images/cloudy.png"; // Mostly cloudy
                            break;
                        case 5:
                        case 6:
                            weatherIcon.src = "images/rain.png"; // Light rain
                            break;
                        case 7:
                            weatherIcon.src = "images/rain.png"; // Heavy rain
                            break;
                        case 8:
                            weatherIcon.src = "images/snow.png"; // Snow
                            break;
                        case 9:
                            weatherIcon.src = "images/drizzle.png"; // Drizzle
                            break;
                        default:
                            weatherIcon.src = "images/clear.png"; // Default if no match
                            break;
                    }

                } else {
                    console.error(`Weather data fetch failed: ${weatherResponse.statusText}`);
                }
            } else {
                console.error("Latitude and Longitude not available for this country.");
            }
        } else {
            // Reset fields if no country matches
            countryName.innerHTML = "-";
            capitalName.innerHTML = "-";
            languages.innerHTML = "-";
            currency.innerHTML = "-";
            flag.innerHTML = "";
            minTemp.innerHTML = "-";
            maxTemp.innerHTML = "-";
        }
        console.log(data);
    };

    // Event listener for search button
    searchButton.addEventListener("click", () => {
        const searched = search.value.trim().toLowerCase(); // trim and lowercase input
        const country = data.find(country => country.name.common.toLowerCase() === searched); // find matching country
        updateCountryInfo(country); // update country info
    });
};
