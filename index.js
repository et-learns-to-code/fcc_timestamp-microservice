// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// timestamp function starts here
app.get("/api/:date?", function (req, res) {
  let date_string = req.params.date;

  // converts req.params.date (a string by default) to a number if the parameter is a number
  if (!isNaN(date_string)) {
    date_string = parseInt(date_string);
  }

  let unixTime;
  let utcTime;

  if (!date_string) {
    unixTime = new Date().getTime();
    utcTime = new Date().toUTCString();
  } else if (isNaN(new Date(date_string))) {
    res.json({ error: "Invalid Date" });
  } else {
    unixTime = new Date(date_string).getTime();
    utcTime = new Date(date_string).toUTCString();
  }

  res.json({ unix: unixTime, utc: utcTime });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
