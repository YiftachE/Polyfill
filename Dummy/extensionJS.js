var side = `<div id= "inject" style="
    float: right;
    width: 12%;
    height: 100%;
    text-align: center;
    overflow: hidden;
">  
<ul class="collection" style="padding-right: 0px">
  </ul>`
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

function drawSpinner(elementId = "inject") {
    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    inject.insertAdjacentHTML('afterbegin',spinner)
}
function drawListOfPeople(people,elementId = "inject") {
    let inject = $(`#${elementId}`)[0];
    inject.innerHTML = "";
    var peopleHtml = `<ul class="collection" style="padding-right: 0px;overflow: scroll;height: 100%">`;
    people.forEach((e)=>{
        peopleHtml += `
        <li class="collection-item">
      <span class="title">${e.name}</span>
      <p>${e.title} </p>
    </li>`
    });
    peopleHtml += `</ul>`;
    inject.insertAdjacentHTML('afterbegin',peopleHtml)
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
