'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require('express');
var WebSocket = require('ws');
var moment = require('moment');
var iotHubClient = require('./IoThub/iot-hub.js');
var app = express();

var controllers = require("./Controllers");

controllers.init(app);

app.set("view engine", "vash");

app.use(express.static(__dirname + "/public"));



var server = http.createServer(app);

var wss = new WebSocket.Server({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            try {
                console.log('sending data ' + data);
                client.send(data);
            } catch (e) {
                console.error(e);
            }
        }
    });
};

var iotHubReader = new iotHubClient(process.env['Azure.IoT.IoTHub.ConnectionString'], process.env['Azure.IoT.IoTHub.ConsumerGroup']);
iotHubReader.startReadMessage(function (obj, date) {
    try {
        console.log(date);
        date = date || Date.now()
        wss.broadcast(JSON.stringify(Object.assign(obj, { time: moment.utc(date).format('YYYY:MM:DD[T]hh:mm:ss') })));
    } catch (err) {
        console.log(obj);
        console.error(err);
    }
});
var port = normalizePort(process.env.PORT || '443');
server.listen(port, function listening() {
    console.log('Listening on %d', server.address().port);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
