(function (seedData) {

    seedData.initialNotes = [{
        name: "Device1",
        notes: [{
            type: "Temperature",
            value: 200
        }, {
            type: "Humidity",
            value: 87

        }]
    },{
        name: "Device2",
        notes: [{
            type: "Temperature",
            value: 100
        }, {
            type: "Humidity",
            value: 40

        }]

    }];
})(module.exports);