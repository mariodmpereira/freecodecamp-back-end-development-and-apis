require('dotenv').config()
var express = require('express');
var app = express();

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
    const json = { message: "Hello json" };
    json.message = process.env.MESSAGE_STYLE === "uppercase" ? json.message.toUpperCase() : json.message;
    res.json(json);
});

app.get("/now", (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => res.json({ time: req.time })
);

app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word}));

app.route("/name")
    .get((req, res) => {
        let json = { name: `${req.query.first} ${req.query.last}`};
        console.log(json)
        res.json(json);
    })

module.exports = app;