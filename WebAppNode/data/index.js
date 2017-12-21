(function (data) {
    var seedData = require("./seedData");

    data.getDeviceReadings = function (next) {
        next(null, seedData.initialNotes);
    };
})(module.exports);