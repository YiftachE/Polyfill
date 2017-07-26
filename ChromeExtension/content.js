if(L !== undefined) {



    function getCellIdFromLatAndLng(lat, lng){
        var absLat = Math.abs(lat);
        var absLng = Math.abs(lng);
        var flat = 0;
        var flng = 0;
        let MATH1 = (Number(absLat) * 100).toString().substr(0, 6);
        MATH1 * 10 % 10 % 2 === 0 ? flat = MATH1 / 100 : flat = (MATH1 * 10 - 1) / 1000;
        let MATH2 = (Number(absLng) * 100).toString().substr(0, 6);
        MATH2 * 10 % 10 % 2 === 0 ? flng = MATH2 / 100 : flng = (MATH2 * 10 - 1) / 1000;
        // return {absLat:flat,absLng:flng}
        if (lat < 0) flat = "-" + flat;
        if (lng < 0) flng = "-" + flng;
        return `${Number(flat.toString().substr(0, 6)).toFixed(3)}:${Number(flng.toString().substr(0, 6)).toFixed(3)}`
    }

    function getCellsIdsOfCurrentBoundingBox() {
        if (tmp_map.getZoom() <= 17) {
            // console.log(`does not support zoom smaller then 18`);
            return;
        }
        let cells = [];
        let {_northEast, _southWest} = tmp_map.getBounds();
        let hips = ((_southWest.lat - _northEast.lat) / 0.002) * ((_southWest.lng - _northEast.lng) / 0.002);
        for (var i = _southWest.lat; i < _northEast.lat; i += 0.002) {
            for (var j = _southWest.lng; j < _northEast.lng; j += 0.002) {
                cells.push(getCellIdFromLatAndLng(i, j));
            }
        }
        return cells;
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function initEHs() {
        ehROIClient = new EventHubClient(
            {
                'name': "polyfill-eh",
                'devicename': devicename, // This is by specification partition key.
                'namespace': "polyfill-ns",
                'sasKey': "VRs2IY41BP9Yr8vtxjFk8NI4x4wU1PVr6zoGUXZ7T74=",
                'sasKeyName': "send",
                'timeOut': 60,
            });

        ehActionClient = new EventHubClient(
            {
                'name': "polyfill-eh2",
                'devicename': devicename, // This is by specification partition key.
                'namespace': "polyfill-ns",
                'sasKey': "VthfO6lrbC3LOGQxxSFm4RnaBYIQLiFqyVLFVmEIjV4=",
                'sasKeyName': "polyfill-policy2",
                'timeOut': 60,
            });

    }

    var devicename = guid(),
        ehROIClient,
        ehActionClient,
        ROIInterval,
        getStatusInterval,
        apiUrl = "https://polyfill.azurewebsites.net/api/GetCells?code=JDvdaEoLYZHQNoJBVHj9dmtJdqsgP49QaohUIBak1qaGYUqVJG5/CA==",
        ROI_TIME = 1000,
        GET_STATUS_TIME = 5000;

    initEHs();

    //get the L.Map instance
    for (var key in window) {
        var value = window[key];
        if (value instanceof L.Map)
            tmp_map = value;
    }


    //send RoI data
    ROIInterval = setInterval(function () {
        let cells = getCellsIdsOfCurrentBoundingBox();
        for(i in cells){
            let cell = cells[i];

            var ROIeventBody = {
                "USER_NAME" : devicename,
                "CELL_ID" : cell,
                "APP_NAME" : "APP_A"
            };
            var msg = new EventData(ROIeventBody);

            ehROIClient.sendMessage(msg);
        }

    }, ROI_TIME);

    //send Action data
    tmp_map.on(L.Draw.Event.CREATED, function (e) {
        if(e.layerType == "marker") {
            var layer = e.layer;
            var lat = layer.getLatLng().lat;
            var lng = layer.getLatLng().lng;

            var ActionEventBody = {
                "USER_NAME": devicename,
                "LAT": lat,
                "LON": lng,
                "APP_NAME": "NEW_APP"
            };
            var msg = new EventData(ActionEventBody);

            ehActionClient.sendMessage(msg,function(res){
                console.log(res);
            });
        }
    });



    getStatusInterval = setInterval(function(){
        var cells = getCellsIdsOfCurrentBoundingBox();

        $.post(apiUrl, JSON.stringify(cells)).done(function(res){
            console.log(res);
        });
    },GET_STATUS_TIME)

}
