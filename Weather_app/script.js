async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");
  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");}
    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    const current = weatherData.current_weather;
    weatherInfo.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p class="temp">${current.temperature}°C</p>
      <p>💨 Wind: ${current.windspeed} km/h</p>
      <p>🧭 Wind Dir: ${current.winddirection}°</p>
      <p>⏰ Time: ${current.time}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
