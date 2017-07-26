(function () {
    "use strict";
    const map = L.map('map').setView([31.0461, 34.8516], 9);
    const editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var MyCustomMarker = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(12, 12),
            iconSize: new L.Point(24, 24),
            iconUrl: 'node_modules/leaflet-draw/dist/images/marker-icon.png'
        }
    });


    var options = {
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false, 
            rectangle: false,
            marker: {
                icon: new MyCustomMarker()
            }
        },
        edit: {
            featureGroup: editableLayers, //REQUIRED!! 
            remove: false
        }
    };

    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        editableLayers.addLayer(layer);
    });
}())