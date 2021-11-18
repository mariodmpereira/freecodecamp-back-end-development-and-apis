// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const url = require("url");
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get("/api", (req, res) => {
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() })
});

app.get("/api/:date", (req, res) => {
    const paramsDate = req.params.date;
    const invalidDate = "Invalid Date";
    const date = parseInt(paramsDate) < 10000
        ? new Date(paramsDate)
        : new Date(parseInt(paramsDate))

    date.toString() === invalidDate
        ? res.json({ error: invalidDate })
        : res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});