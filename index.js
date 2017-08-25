"use strict";
const fs = require('fs');
const express = require('express');
const Mustache = require('./Mustache')

let app = express();

// register the template engine
let m = new Mustache("template", true)
app.engine('html', m.engine());
app.set('views', './template');
app.set('view engine', 'html')

app.get('/', function(req, res) {
    res.render('index', { name: 'World' })
});

app.use("/dist", express.static("dist"));

const port = 3000;
app.listen(port, function(err) {
    if (err) {
        console.error("fail to start server:" + err);
    }
    console.log("listening on port " + port)
});