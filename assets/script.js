// global variables
var apiKey = "e20afaf6f1e2b77793031712c6367a1c";
var searchLoc;
var firstPull;
var searchArr = [];
var curDate = moment();
// event handler
$(".list-group-item-action").click(function (e) {
  e.preventDefault();
  searchLoc = $(this).val();
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
      $(".display-4").text(firstPull.name);
      // console.log(searchArr, "internal");
      searchHist(searchArr, firstPull.name);
      $("#Date").text(curDate.format("MMM Do, YYYY"));
      fetch(callUrlEnd(selLat, selLon, apiKey))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          finalPull = data;
          console.log(data);
          displayHist();
          uvChange(finalPull.current.uvi);
          $("#weatherIcon").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              firstPull.weather[0].icon +
              ".png"
          );
          $("#date").text(curDate);
          $("#weathDesc").text(finalPull.current.weather[0].description);
          $("#temp").text("Temp" + finalPull.current.temp + " F ");
          $("#humid").text("Humidity " + finalPull.current.humidity + "%");
          $("#wind").text(
            "Wind Speed " + finalPull.current.wind_speed + " MPH"
          );
          // can I use this for cardinal directions (https://gist.github.com/felipeskroski/8aec22f01dabdbf8fb6b)?
          $("#uvIndex").text("UV Index " + finalPull.current.uvi);
          disCard(finalPull);
        });
    });
});

$("#searchBut").click(function (e) {
  e.preventDefault();
  searchLoc = $("#citySearch").val().trim();

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
      $(".display-4").text(firstPull.name);
      // console.log(searchArr, "internal");
      searchHist(searchArr, firstPull.name);
      $("#Date").text(curDate.format("MMM Do, YYYY"));
      fetch(callUrlEnd(selLat, selLon, apiKey))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          finalPull = data;
          console.log(data);
          displayHist();
          uvChange(finalPull.current.uvi);
          $("#weatherIcon").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              firstPull.weather[0].icon +
              ".png"
          );
          $("#date").text(curDate);
          $("#weathDesc").text(finalPull.current.weather[0].description);
          $("#temp").text("Temp" + finalPull.current.temp + " F ");
          $("#humid").text("Humidity " + finalPull.current.humidity + "%");
          $("#wind").text(
            "Wind Speed " + finalPull.current.wind_speed + " MPH"
          );
          // can I use this for cardinal directions (https://gist.github.com/felipeskroski/8aec22f01dabdbf8fb6b)?
          $("#uvIndex").text("UV Index " + finalPull.current.uvi);
          disCard(finalPull);
        });
    });
});

// new Date( (data.current.dt +data.timezone_offset) * 1000).toDateString()

// functions;
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

// display info

var disCard = function (arr) {
  $(".fiveday").each(function (i) {
    var temp = arr.daily[i].temp.day;
    var imgLink =
      "https://openweathermap.org/img/w/" +
      arr.daily[i].weather[0].icon +
      ".png";
    var wind = arr.daily[i].wind_speed;
    var humid = arr.daily[i].humidity;
    this.querySelector(".day-icon").setAttribute("src", imgLink);
    this.querySelector(".temp").textContent = "Temp:" + temp + "F";
    this.querySelector(".wind").textContent = "Wind" + wind + "MPH";
    this.querySelector(".humid").textContent = "Humidity:" + humid + "%";
  });
};

var uvChange = function (uvi) {
  if (uvi < 3.0) {
    $(".jumbotron").css("background-color", "green");
  } else if (uvi >= 3.0 && uvi <= 5.0) {
    $(".jumbotron").css("background-color", "yellow");
  } else if (uvi > 5.0 && uvi <= 7.0) {
    $(".jumbotron").css("background-color", "orange");
  } else if (uvi > 7.0 && uvi <= 10.0) {
    $(".jumbotron").css("background-color", "red");
  } else {
    $(".jumbotron").css("background-color", "violet");
  }
};

var searchHist = function (disArr, locsave) {
  // console.log(locsave, "parameter");
  var disArr = JSON.parse(localStorage.getItem("citySave")) || [];
  disArr.unshift(locsave);
  if (disArr.length > 5) {
    disArr.pop();
  }
  // console.log(locArr, "storage");
  localStorage.setItem("citySave", JSON.stringify(disArr));
};

var displayHist = function () {
  var disArr = JSON.parse(localStorage.getItem("citySave")) || [];

  $(".list-group-item").each(function (i) {
    $(this).text(disArr[i]);
    $(this).val(disArr[i]);
  });
};
// searchHist(searchArr, "Tucson");
displayHist();
console.log(displayHist);
