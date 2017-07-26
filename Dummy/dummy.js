var map = L.map('map').setView([31.814, 34.644], 19);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//31.8147358, 34.6448723
//31.8147632, 34.6475974
// for (var i = 31.814; i < 31.816; i += 0.002) {
//     for (var j = +34.644; j < 34.648; j += 0.002) {
//         L.polygon([
//             [i, j],
//             [i + 0.002, j],
//             [i + 0.002, j + 0.002],
//             [i, j + 0.002]
//         ]).bindTooltip(`${(i).toFixed(3)}:${(j).toFixed(3)}`).addTo(map)
//     }
// }

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

//leaflet.draw options
var options = {
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circle: false, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
                clickable: false
            }
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


// map.on('click', function (e) {
//     var popLocation = e.latlng;
//     console.log(popLocation)
//     var cellId = getCellIdFromLatAndLng(popLocation.lat, popLocation.lng);
//     L.popup()
//         .setLatLng(popLocation)
//         .setContent(`${popLocation.lat.toFixed(3)}:${popLocation.lng.toFixed(3)}<br/><br/><br/>${cellId}`)
//         .openOn(map);
// });