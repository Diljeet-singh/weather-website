const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8982e22bb427a68140339ca15652e591&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.error) {
      callback("Unable to find the location");
    } else {
      callback(
        undefined,
        "It is " +
          body.current.weather_descriptions +
          " temperature : " +
          body.current.temperature
      );
    }
  });
};

module.exports = forecast;
