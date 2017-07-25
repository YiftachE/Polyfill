var map = L.map('map').setView([+31.814, +34.644], 15);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//31.8147358, 34.6448723
//31.8147632, 34.6475974
for (var i = 31.814; i <31.816 ; i += 0.002) {
    for (var j = +34.644 ; j < 34.648; j += 0.002) {
        L.polygon([
            [i, j],
            [i + 0.002, j],
            [i + 0.002, j + 0.002],
            [i, j + 0.002]
        ]).bindTooltip(`${(i).toFixed(3)}:${(j).toFixed(3)}`).addTo(map)
    }
}

function getCellIdFromLatAndLng(lat, lng) {
    var absLat = Math.abs(lat);
    var absLng = Math.abs(lng);
    var flat = 0;
    var flng = 0;
    let MATH1 = (Number(absLat) * 100).toString().substr(0,6);
    MATH1 * 10 % 10 % 2 === 0 ? flat = MATH1/ 100 : flat = (MATH1 * 10 - 1) / 1000;
    let MATH2 = (Number(absLng) * 100).toString().substr(0,6);
    MATH2 * 10 % 10 % 2 === 0 ? flng = MATH2/ 100 : flng = (MATH2 * 10 - 1) / 1000;
    // return {absLat:flat,absLng:flng}
    if (lat < 0) flat = "-" + flat;
    if (lng < 0) flng = "-" + flng;
    return `${flat}:${flng}`
}

map.on('click', function (e) {
    var popLocation = e.latlng;
    console.log(popLocation)
    var cellId = getCellIdFromLatAndLng(popLocation.lat, popLocation.lng);
    var popup = L.popup()
        .setLatLng(popLocation)
        .setContent(`${popLocation.lat.toFixed(3)}:${popLocation.lng.toFixed(3)}<br/><br/><br/>${cellId}`)
        .openOn(map);
});