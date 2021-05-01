// global variables
var apiKey = "e20afaf6f1e2b77793031712c6367a1c";
// var searchButton = $("#citySearch");
var searchLoc;
// event handlers

$("#searchBut").submit(function () {
  searchLoc = $("#citySearch").val();
});
console.log(searchLoc);
// functions;

// loc and key are parameters
function callUrl(loc, key) {
  return (
    "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=" + key
  );
}

// loc and key are arguments
console.log(callUrl(searchLoc, apiKey));

// communication
// fetch(callUrl(searchLoc, apiKey))
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// display info
