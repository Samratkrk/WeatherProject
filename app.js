const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "a1c39835bdc701e01d1c480539d14212";
  const unit = "imperial";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";

  https.get(url, function (resp) {
    resp.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h3>It is currently ${desc}</h3>`);
      res.write(`<h1>The temperature in ${query} is ${temp}F</h1>`);
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running in port 3000");
});
