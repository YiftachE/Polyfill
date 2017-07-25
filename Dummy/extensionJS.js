var side = `<div id= "inject" style="
    float: right;
    width: 12%;
    height: 100%;
    text-align: center;
    overflow: hidden;
">  
<ul id="inject-ui" class="collapsible" data-collapsible="expandable" ><li id="listOfPeople"></li><li id="listOfActions"></li></ul>
<div id="inject-spinner"></div>`

var spinner =`
    <div class="preloader-wrapper big active" style="margin-top: 6%">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;

function drawSpinner(elementId = "inject-spinner",toDraw = true) {
    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    if(toDraw) inject.insertAdjacentHTML('afterbegin',spinner)
}
function drawListOfPeople(people,elementId = "listOfPeople") {
    drawSpinner("inject-spinner",false);

    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    var peopleHtml = `<div class="collapsible-header active" style="direction: rtl"><i class="material-icons">filter_drama</i>${people.length} צופים</div>
              <div class="collapsible-body">
    <ul class="collection" style="padding-right: 0px;overflow-y: visible;height: 50%">`;

    people.forEach((e)=>{
        peopleHtml += `
        <li class="collection-body" style="text-align:right">
        <span class="title">${e.name}</span></li>`
    });
    peopleHtml += `</ul></div>`;
    inject.insertAdjacentHTML('afterbegin',peopleHtml)
}

function drawListOfActions(actions,elementId = "listOfActions") {
    drawSpinner("inject-spinner",false);

    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    var actionHtml = `<div class="collapsible-header" style="direction: rtl"><i class="material-icons">language</i>&thinsp;	${actions.length} ארועים חדשים&thinsp;</div>
              <div class="collapsible-body">
    <ul class="collection" style="padding-right: 0px;overflow-y: visible;height: 50%">`;

    actions.forEach((e)=>{
        actionHtml += `
        <li class="collection-body" style="text-align:right">
        <span class="title">${e.name}</span></li>`
    });
    actionHtml += `</ul></div>`;
    inject.insertAdjacentHTML('afterbegin',actionHtml)
}

document.addEventListener("DOMContentLoaded",()=>{
    document.body.insertAdjacentHTML( 'afterbegin', side );
    drawListOfPeople([{
        name:'רונן',
        title:'שומרוני'
    },{
        name:'מירב',
        title:'כנענית'
    },{
        name:'רונן',
        title:'שומרוני'
    },{
        name:'מירב',
        title:'כנענית'
    },{
        name:'רונן',
        title:'שומרוני'
    },{
        name:'מירב',
        title:'כנענית'
    },{
        name:'רונן',
        title:'שומרוני'
    },{
        name:'מירב',
        title:'כנענית'
    },{
        name:'מירב',
        title:'כנענית'
    },{
        name:'מירב',
        title:'כנענית'
    }])

    drawListOfActions([{
        name:'בני הכניס נקודה',
    },{
        name:'שרון עדכנה רשומה',
    },{
        name:'משה קנה פרה',
    }])

    setTimeout(()=>{
        map.on("movestart",(e)=>{
            drawSpinner()
        })
        map.on("moveend",(e)=>{
            drawListOfPeople([{
                name:'דוד',
                title:'מפתח בכיר'
            },{
                name:'יפתח',
                title:'רבט פזמ'
            }])
        })
    },1000)
});
