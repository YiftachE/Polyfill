var map = L.map('map').setView([-32, -32], 10);

for(var i = -30;i>-33;i-=0.2)
{
    for(var j = -30;j>-33;j-=0.2)
    {
        L.polygon([
            [i,j],
            [i-0.2, j],
            [i-0.2, j-0.2],
            [i, j -0.2]
        ]).bindTooltip(`${(i).toFixed(1)}:${(j).toFixed(1)}`).addTo(map)
    }
}

function getCellIdFromLatAndLng(lat, lng) {
    var absLat = Math.abs(lat);
    var absLng = Math.abs(lng);
    var flat = 0;
    var flng = 0;
    let MATH1 = Number(absLat.toString().substr(0,4)) ;
    MATH1 * 10 % 10 % 2 === 0 ? flat = MATH1  : flat = (MATH1 * 10 -1) /10;
    let MATH2 = Number(absLng.toString().substr(0,4)) ;
    MATH2 * 10 % 10 % 2 === 0 ? flng = MATH2 :flng =(MATH2 * 10 -1) /10;
    if (flat.toString().length == 2) flat = flat.toString() + ".0";
    if (flng.toString().length == 2) flng = flng.toString() + ".0";
    // return {absLat:flat,absLng:flng}
    if(lat < 0) flat = "-" + flat;
    if(lng < 0) flng = "-" + flng;
    return `${flat}:${flng}`
}

map.on('click', function(e) {
    var popLocation= e.latlng;
    console.log(popLocation)
    var cellId = getCellIdFromLatAndLng(popLocation.lat,popLocation.lng);
    var popup = L.popup()
        .setLatLng(popLocation)
        .setContent(`${popLocation.lat.toFixed(1)}:${popLocation.lng.toFixed(1)}<br/><br/><br/>${cellId}`)
        .openOn(map);
});