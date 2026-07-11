const axios = require("axios");

const getWeather = async (place) => {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(place)}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

    const { data } = await axios.get(url);

    return {
        place: data.name,
        temperature: data.main.temp,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
    };

};

module.exports = {
    getWeather,
};