const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const utilsPath = path.join(__dirname, "/utils");
hbs.registerPartials(partialsPath);

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Diljeet Singh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Diljeet Singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helptext: "This is a help page",
    name: "Diljeet Singh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastdata,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search item",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    errorMessage: "Page not found",
    name: "Diljeet Singh",
  });
});
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Diljeet Singh",
//     age: 19,
//   });
// });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
