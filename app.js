API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1";

async function fetchWeatherData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeatherData(data) {
  const current = data.current;
  const currentUnits = data.current_units;

  const time = new Date(current.time).toLocaleString();

  let weatherIcon = "☀️";
  if (current.rain > 0 || current.showers > 0) {
    weatherIcon = "🌧️";
  } else if (!current.is_day) {
    weatherIcon = "🌙";
  }

  const html = `
               <div class="weather-header">
                   <div class="weather-icon">${weatherIcon}</div>
                   <h1>Current Weather</h1>
                   <div class="timezone">${data.timezone}</div>
               </div>

               <div class="temperature-display">
                   <div class="temperature">
                       ${current.temperature_2m}${currentUnits.temperature_2m}
                   </div>
               </div>

               <div class="weather-details">
                   <div class="detail-card">
                       <div class="detail-label">Wind Speed</div>
                       <div class="detail-value">
                           ${current.wind_speed_10m}
                       </div>
                       <div class="detail-label">${currentUnits.wind_speed_10m}</div>
                   </div>

                   <div class="detail-card">
                       <div class="detail-label">Conditions</div>
                       <div class="detail-value">
                           ${current.is_day ? "☀️ Day" : "🌙 Night"}
                       </div>
                   </div>
               </div>

               <div class="time-display">
                   <div class="time-label">Last Updated</div>
                   <div class="time-value">${time}</div>
               </div>
           `;

  document.getElementById("content").innerHTML = html;
}

function displayError(message) {
  document.getElementById("content").innerHTML = `
               <div class="error">
                   <h2>Error Loading Weather Data</h2>
                   <p>${message}</p>
               </div>
           `;
}

fetchWeatherData();
