let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");
let cors = require("cors");
let logger = require("morgan");

module.exports = function(app){
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cors());
}