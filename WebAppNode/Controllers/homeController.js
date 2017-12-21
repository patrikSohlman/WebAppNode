(function (homeController) {

    var data = require('../data');

    homeController.init = function (app) {
        app.get("/", function (req, res) {

            data.getDeviceReadings(function (err, results) {
                res.render("index", { devices: results });
            });
            
        });
    };

})(module.exports);