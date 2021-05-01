// global variables
var apiKey = "e20afaf6f1e2b77793031712c6367a1c";
// var searchButton = $("#citySearch");
var searchLoc;
var firstPull;
// event handlers

// functions;
$("#searchBut").click(function (e) {
  e.preventDefault();
  searchLoc = $("#citySearch").val().trim();
  // var dest = searchLoc.replace(/ /g, "");
  // return searchLoc;
  console.log(searchLoc);
  // console.log(dest);
  // get initial weather info
  // communication
  fetch(callUrl1(searchLoc, apiKey))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      firstPull = data;
      var selLat = firstPull.coord.lat;
      var selLon = firstPull.coord.lon;
      console.log(selLat);
      console.log(selLon);
      fetch(callUrlEnd(selLat, selLon, apiKey))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          finalPull = data;
          console.log(data);
        });
    });
});

// display info
// new Date( (data.current.dt +data.timezone_offset) * 1000).toDateString()

var callUrl1 = function (loc, key) {
  let newUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    loc +
    "&appid=" +
    key;
  console.log(newUrl);
  return newUrl;
};
var callUrlEnd = function (lat, lon, key) {
  let finalCall =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&exclude=minutely,hourly" +
    "&appid=" +
    key;
  console.log(finalCall);
  return finalCall;
};
