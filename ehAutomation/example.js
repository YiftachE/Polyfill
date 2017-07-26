var Q = require("q");
var easyConfig = require('easy-config');
var RoIEventHubs = require('./client.js');
var ActionEventHubs = require('./client.js');

// Full Event Hub publisher URI
var config;
var eventHubsUri;
var sasToken;

var config = easyConfig.loadConfig();

if (!config.EventHubsNamespace) {
    throw new Error("Config file not found, or you forgot to set the namespace in the config.");
}

var eventHubsNamespace = config.EventHubsNamespace,
    ActionEventHubsHubName = config.ActionEventHubsHubName,
    ActionEventHubsKeyName = config.ActionEventHubsKeyName,
    ActionEventHubsKey = config.ActionEventHubsKey,
    RoIEventHubsHubName = config.RoIEventHubsHubName,
    RoIEventHubsKeyName = config.RoIEventHubsKeyName,
    RoIEventHubsKey = config.RoIEventHubsKey,
    sasToken = config.SasToken,
    deviceId = config.DeviceName;

// testSendContinuous();
testSendPerformance();
//example1();
//exampleWithSasToken();

function rnd(a,b){
    return Math.round(Math.random() * (b - a)) + a;
}


function sendActionData(eh,silent) {
    var deferral = Q.defer();

    var payload = {
        USER_NAME: "name" + rnd(1,20),
        LAT: 12.12 + rnd(1,10),
        LON: 23.32 + rnd(1,10),
        APP_NAME: rnd(1,2) == 1 ? 'APP_A' : 'APP_B'
    }

    eh.sendMessage({
        message: payload,
        deviceId: deviceId,
    }).then(function () {
        if (!silent) console.log('Sent ' + JSON.stringify(payload));
        deferral.resolve();
    }).catch(function (error) {
        if (!silent) console.log('Error sending message: ' + error);
        deferral.reject(error);
    })
        .done();

    return deferral.promise;
}

var cells = ["31.814:34.638", "31.814:34.64", "31.814:34.642", "31.814:34.644"];

function sendRoIData(eh,silent) {
    var deferral = Q.defer();

    var payload = {
        USER_NAME: "name" + rnd(1,20),
        CELL_ID: cells[rnd(0,3)],
        APP_NAME: rnd(1,2) == 1 ? 'APP_A' : 'APP_B'
    }

    eh.sendMessage({
        message: payload,
        deviceId: deviceId,
    }).then(function () {
        if (!silent) console.log('Sent ' + JSON.stringify(payload));
        deferral.resolve();
    }).catch(function (error) {
        if (!silent) console.log('Error sending message: ' + error);
        deferral.reject(error);
    })
        .done();

    return deferral.promise;
}



function testSendPerformance() {
    var i,
        start = new Date(),
        end,
        promise1,
        promide2,
        promises = [],
        iterations = 100;


    RoIEventHubs.init({
        hubNamespace: eventHubsNamespace,
        hubName: RoIEventHubsHubName,
        keyName: RoIEventHubsKeyName,
        key: RoIEventHubsKey
    });

    var it = setInterval(function(){
        promise1 = sendRoIData(RoIEventHubs,false);
        promises.push(promise1);
    },3000)

    setTimeout(function(){
        clearInterval(it);
        Q.allSettled(promises).then(function () {
            ActionEventHubs.init({
                hubNamespace: eventHubsNamespace,
                hubName: ActionEventHubsHubName,
                keyName: ActionEventHubsKeyName,
                key: ActionEventHubsKey
            });

            promises = [];
            var it2 = setInterval(function(){
                promise2 = sendActionData(ActionEventHubs,false);
                promises.push(promise2);
            },3000)

            setTimeout(function(){
                clearInterval(it2);
                Q.allSettled(promises).then(function () {
                    end = new Date();
                    var elapsed = end.getTime() - start.getTime();
                    console.log('Test Complete. Took ' + elapsed + 'ms to send ' + iterations + 'messages');
                    console.log(elapsed / iterations + 'ms / message');
                    console.log(1000 / (elapsed / iterations) + ' messages / second');
                });
            },30000)

        });
    },30000)




}
