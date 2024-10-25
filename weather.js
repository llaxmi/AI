export async function getWeather(city) {
  const apiKey = process.env.WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  // Extract relevant information
  const temperature = data.main?.temp;
  const description = data.weather?.[0]?.description;

  if (temperature !== undefined && description) {
    return `It's currently ${description} with a temperature of ${temperature}°C in ${city}.`;
  } else {
    return `Weather information for ${city} is not available at the moment.`;
  }
}
