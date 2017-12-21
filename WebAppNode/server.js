'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require('express');
var app = express();

var controllers = require("./Controllers");

controllers.init(app);

app.set("view engine", "vash");

app.use(express.static(__dirname + "/public"));



var server = http.createServer(app);
server.listen(port);
