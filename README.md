# Country Info App

A simple web app that lets you search for a country and see details like:

- Capital city  
- Languages  
- Currency  
- Current day's average minimum & maximum temperature  
- A graph of the temperature forecast for the week  
- Flag image of the country

---

## Features

- Search for any country  
- Displays relevant country details  
- Shows weather data (today & forecast for the week)  
- Graphs of weekly temperatures for easier visualization  
- Flag of the country appears once searched

---

## Installation & Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/1duak/Country-Info-App.git

2. Open the project folder in Visual Studio Code (or your code editor of choice).

3. If you don’t already have Live Server extension in VS Code, install it.

4. Open index.html in VS Code.

5. Right-click → Open with Live Server.

6. The app will open in your browser. You can search for a country and see its info, graph, and flag.

# Usage

Type the name of a country in the search input.

Click the magnifying glass to enter.

The app will fetch country data, weather data, etc., then display:

Capital, languages, currency

Images and flag

Temperatures (min/max)

A weekly forecast graph

## Tech / Tools Used

- HTML / CSS / JavaScript  
- [REST Countries API](https://restcountries.com/) — for country data (name, capital, languages, currencies, flags, coordinates)  
- [Open-Meteo API](https://open-meteo.com/) — for weather forecasts (min/max temps, weekly forecast, weather codes)  
- [Chart.js](https://www.chartjs.org/) — for plotting weekly temperature data on a graph  
- Live Server (VS Code extension) — to run locally in the browser  
