var Q = require("q");
var gaussian = require('gaussian')
var https = require('https');

function rnd(a, b) {
    return Math.round(Math.random() * (b - a)) + a;
}
var specialCells=[{lon:34.772,lat:32.012},{lon:34.776,lat:32.012}]
var cells = [{
    lon: 34.753532409668,
    lat: 32.0441687907779
}, {
    lon: 34.7782516479492,
    lat: 32.0133161235938
}, {
    lon: 34.7785949707031,
    lat: 32.0610460389255
}, {
    lon: 34.789924621582,
    lat: 32.1003172308259
}, {
    lon: 34.8122406005859,
    lat: 31.9970124064237
}, {
    lon: 34.8125839233399,
    lat: 32.0447508166687
}, {
    lon: 34.8451995849609,
    lat: 32.0735564719067
}, {
    lon: 34.8839950561524,
    lat: 31.9926448470134
}, {
    lon: 34.892578125,
    lat: 32.1328849660839
}, {
    lon: 34.9148941040039,
    lat: 32.0636646432517
}];

function getCloseCoordinates(coordinates) {
    return {
        lon: (coordinates.lon - gaussian(10, 10).ppf(Math.random()) / 10000).toFixed(3),
        lat: (coordinates.lat - gaussian(10, 10).ppf(Math.random()) / 10000).toFixed(3),
    }
}
function getCloseCoordinatesPoint(coordinates) {
    return {
        lon: (coordinates.lon - gaussian(10, 10).ppf(Math.random()) / 10000),
        lat: (coordinates.lat - gaussian(10, 10).ppf(Math.random()) / 10000),
    }
}
function sendUserData() {
    
    var coords = getCloseCoordinates(cells[rnd(0, 9)])
    var payload = {
        USER_NAME: "bot" + rnd(1, 4999),
        lat: coords.lat,
        lon: coords.lon,
        APP_NAME: "App" + rnd(1, 4999)
    }
    var options = {
        host: 'polyfill.azurewebsites.net',
        port: 443,
        path: '/api/QueueTriggerJS1?code=6X7lJKDutncfo0NK0PADjaU4D1t8HjhnVsNoJ4cJkTmeF9uaWlHhDA==&user=' + payload.USER_NAME + "&cell=" + payload.lat + ":" + payload.lon + "&app=" + payload.APP_NAME
    }
    https.get(options, function (resp) {
        resp.on('data', function (chunk) {
            //do something with chunk
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });
}

function sendActionData() {
    var coords1 = specialCells[0]
    var payload = {
        USER_NAME: "bot" + rnd(1, 4999),
        lat: coords1.lon,
        lon: coords1.lat,
        APP_NAME: "App" + rnd(1, 3)
    }

    var options = {
        host: 'polyfill.azurewebsites.net',
        port: 443,
        path: '/api/HttpTriggerJS1?code=fiGOcOYBQwwq1hNrxRit/rMQQ4h88msT5qHv2Bn8DVrii/PtemyK3w==&user=' + payload.USER_NAME + "&lon=" + payload.lat + "&lat=" + payload.lon + "&app=" + payload.APP_NAME
    };
    console.log(payload)
    https.get(options, function (resp) {
        resp.on('data', function (chunk) {
            //do something with chunk
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });
    var coords2 = specialCells[1]
    var payload = {
        USER_NAME: "bot" + rnd(1, 4999),
        lat: coords2.lon,
        lon: coords2.lat,
        APP_NAME: "App" + rnd(1, 3)
    }

    var options = {
        host: 'polyfill.azurewebsites.net',
        port: 443,
        path: '/api/HttpTriggerJS1?code=fiGOcOYBQwwq1hNrxRit/rMQQ4h88msT5qHv2Bn8DVrii/PtemyK3w==&user=' + payload.USER_NAME + "&lon=" + payload.lat + "&lat=" + payload.lon + "&app=" + payload.APP_NAME
    };
    console.log(payload)
    https.get(options, function (resp) {
        resp.on('data', function (chunk) {
            //do something with chunk
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });
    // });
    // var coords = getCloseCoordinatesPoint(cells[rnd(0, 9)])
    // var payload = {
    //     USER_NAME: "bot" + rnd(1, 4999),
    //     lat: coords.lon,
    //     lon: coords.lat,
    //     APP_NAME: "App" + rnd(1, 3)
    // }

    // var options = {
    //     host: 'polyfill.azurewebsites.net',
    //     port: 443,
    //     path: '/api/HttpTriggerJS1?code=fiGOcOYBQwwq1hNrxRit/rMQQ4h88msT5qHv2Bn8DVrii/PtemyK3w==&user=' + payload.USER_NAME + "&lon=" + payload.lat + "&lat=" + payload.lon + "&app=" + payload.APP_NAME
    // };
    // console.log(payload)
    // https.get(options, function (resp) {
    //     resp.on('data', function (chunk) {
    //         //do something with chunk
    //     });
    // }).on("error", function (e) {
    //     console.log("Got error: " + e.message);
    // });

}
(function myLoop(i) {
    setTimeout(function () {
        console.log(i);
        sendActionData();
        if (--i) myLoop(i);
    }, 300)
}(100000));
(function myLoop2(j) {
    setTimeout(function () {
        console.log(j);
        sendUserData();
        if (--j) myLoop2(j);
    }, 500)
}(100000));
// for (var i = 0; i < 10000; i++) {
    // console.log(i)
    

// }