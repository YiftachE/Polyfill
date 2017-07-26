if(L !== undefined) {


    function getCellsIdsOfCurrentBoundingBox() {
        if (tmp_map.getZoom() <= 17) {
            console.log(`does not support zoom smaller then 18, FUCK YOU`);
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
        ehActionClient;

    initEHs();

    //get the L.Map instance
    for (var key in window) {
        var value = window[key];
        if (value instanceof L.Map)
            tmp_map = value;
    }



    setInterval(function () {
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

    }, 1000);

}
