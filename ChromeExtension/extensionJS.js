var side = `<div id= "inject" style="
    float: right;
    width: 12%;
    height: 100%;
    text-align: center;
    overflow: hidden;
">  
<ul id="inject-ui" class="collapsible" data-collapsible="expandable" style="margin: 4px"><li id="listOfPeople"></li><li id="listOfActions"></li></ul>
<div id="inject-spinner"></div>`

var spinner = `
    <div class="preloader-wrapper big active" style="margin-top: 6%">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;

function drawSpinner(elementId = "inject-spinner", toDraw = true) {
    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    if (toDraw) inject.insertAdjacentHTML('afterbegin', spinner)
}
function drawListOfPeople(people, elementId = "listOfPeople") {
    drawSpinner("inject-spinner", false);

    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    var peopleHtml = `<div class="collapsible-header active" style="direction: rtl;background: #3D9970;color: white"><i class="material-icons">filter_drama</i>&thinsp;${people.length} &thinsp;צופים עכשיו</div>
              <div class="collapsible-body" >
    <ul class="collection" style="padding-right: 0px;overflow-y: visible;height: 50%;color: #3D9970">`;

    people.forEach((e) => {
        peopleHtml += `
        <li class="collection-body" style="text-align:right;">
        <span class="title" style="font-size: larger;font-weight: bold;">${e}</span><hr></li>`
    });
    peopleHtml += `</ul></div>`;
    inject.insertAdjacentHTML('afterbegin', peopleHtml)
}
var markers = {};
function drawPlaceMark(index, x, y) {
    markers[index] = L.circle([x, y], {
        color: 'blue',
        fillColor: '#0054ff',
        fillOpacity: 0.4,
        radius: 15
    }).addTo(map);
}

function removeMark(index) {
    markers[index].remove();
    delete markers[index];
}

function drawListOfActions(actions, elementId = "listOfActions") {
    drawSpinner("inject-spinner", false);

    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";

    $(document).off('mouseenter', '.action-bulet', draw)
    $(document).off('mouseleave', '.action-bulet', remove)

    var actionHtml = `<div class="collapsible-header" style="direction: rtl;background: #3D9970;color: white;"><i class="material-icons">language</i>&thinsp;	${actions.length} ארועים חדשים&thinsp;</div>
              <div class="collapsible-body">
    <ul class="collection" style="padding-right: 0px;overflow-y: visible;height: 50%;color: #3D9970">`;

    actions.forEach((e, index) => {
        actionHtml += `
        <li class="collection-body action-bulet" style="text-align:right" index = ${index} 
        onmouseenter=drawPlaceMark.bind(this,${index},${e.Point.x},${e.Point.y}) onmouseleave=removeMark.bind(this,${index})
        >
        <span class="title" style="font-size: larger;font-weight: bold;">${e.UserName}</span>
        <span style="font-size: medium;font-weight: lighter;">${e.AppName}</span><hr>
        </li>`
    });
    actionHtml += `</ul></div>`;
    inject.insertAdjacentHTML('afterbegin', actionHtml)

    $(document).on('mouseenter', '.action-bulet', draw)
    $(document).on('mouseleave', '.action-bulet', remove)
}

function draw(e) {
    var index = e.currentTarget.getAttribute("index")
    drawPlaceMark(index,actions[index].Point.x,actions[index].Point.y)
}

function remove(e) {
    var index = e.currentTarget.getAttribute("index")
    removeMark(index)
}


    document.body.insertAdjacentHTML('afterbegin', side);
$(document).ready(function(){
    $('.collapsible').collapsible();
});
// drawListOfPeople([{
//         name: 'רונן אלפחורסי'
//     }, {
//         name: 'מירב טלולית אהרון'
//     }])
//
//     drawListOfActions([{
//         name: 'בני הכניס נקודה',
//         point: {x: 31.814198306580906, y: 34.641212224960334},
//         appName: "אינפינטי"
//     }, {
//         name: 'שרון עדכנה רשומה',
//         point: {x: 31.815198306580906, y: 34.642212224960334},
//         appName: "אינפינטי"
//     }, {
//         name: 'משה קנה פרה'
//         , point: {x: 35, y: 32},
//         appName: "מסע עולמי"
//         ,
//     }])

