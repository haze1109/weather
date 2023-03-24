const form = document.querySelector('form');
const locationInput = document.getElementById('location');
const weatherCard = document.querySelector('.card');
const resultSection = document.querySelector('.result');
const cityElement = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-info .icon');
const tempElement = document.querySelector('.weather-info .temp');
const descElement = document.querySelector('.weather-info .desc');
const errorElement = document.querySelector('.error');

const API_KEY = '06eb370c-c9da-11ed-92e6-0242ac130002-06eb3798-c9da-11ed-92e6-0242ac130002';
const API_URL = 'https://api.stormglass.io/v2/weather/point';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = locationInput.value;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const lat = data.coord.lat;
    const lng = data.coord.lon;
    const params = 'airTemperature,waterTemperature';

    const stormGlassResponse = await fetch(`${API_URL}?lat=${lat}&lng=${lng}&params=${params}`, {
      headers: {
        'Authorization': API_KEY
      }
    });
    const stormGlassData = await stormGlassResponse.json();

    // Update UI with data from Storm Glass API
    const airTemperature = stormGlassData.hours[0].airTemperature.noaa;
    const waterTemperature = stormGlassData.hours[0].waterTemperature.noaa;

    cityElement.textContent = city;
    tempElement.textContent = `${airTemperature}°C / ${waterTemperature}°C`;
    descElement.textContent = `Air Temperature / Water Temperature`;
    weatherIcon.src = 'storm-glass-icon.png';
    errorElement.textContent = '';
    weatherCard.classList.remove('hidden');
    resultSection.classList.remove('hidden');
  } catch (error) {
    console.log(error);
    errorElement.textContent = `Weather information not found for ${city}`;
    weatherCard.classList.add('hidden');
    resultSection.classList.add('hidden');
  }
});
