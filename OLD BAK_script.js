var divCounter = 0;
var selectedID = 0;
var show = document.getElementById("showNew");
var selectedColumn = document.getElementsByTagName("option")[0].getAttribute("value");
const backlogGrid  = document.getElementsByClassName("backlog_grid")[0]
const toDoGrid = document.getElementsByClassName("toDo_grid")[0]
const inProgressGrid = document.getElementsByClassName("inProgress_grid")[0]
const doneGrid = document.getElementsByClassName("done_grid")[0]
const closeShow = document.getElementById("closeButton")

closeShow.addEventListener("click",close)
backlogGrid.addEventListener("click", getId)
doneGrid.addEventListener("click", getId)
inProgressGrid.addEventListener("click", getId)
toDoGrid.addEventListener("click", getId)


function makeDiv () {
    if (show.classList.contains("display")){
        showNew();
    var div = document.createElement("div");
    var p = document.createElement("p");
    var t = document.createTextNode("")
    div.classList.add("postIt");
    p.appendChild(t); 
    div.appendChild(p);
    backlogGrid.appendChild(div);
    div.id = divCounter;
    selectedID = divCounter
    divCounter = divCounter+1;
    }
}

function showNew () {
        show.classList.toggle("display")
}


function save () {
    var selectedDiv = document.getElementById(selectedID);
    var selectedP = selectedDiv.firstChild
    var editedText = document.getElementById("textInput").value
    
    if (!editedText.length) {
        alert("Your Task is empty")
        
    } else {


    selectedP.innerHTML = editedText;
    document.getElementById("textInput").value = "";
    show.classList.toggle("display");

    }
}


function moveTo() {
    var selectedDiv = document.getElementById(selectedID)
    var moveToColumn = document.getElementById("moveTo").selectedIndex;

    switch (moveToColumn) {
        case 0: backlogGrid.appendChild(selectedDiv);
        break;
        case 1: toDoGrid.appendChild(selectedDiv);
        break;
        case 2: inProgressGrid.appendChild(selectedDiv);
        break;
        case 3: doneGrid.appendChild(selectedDiv);
        break;
    }

}



function getId(i) {
    if (show.classList.contains("display")){

        selectedID = i.target.id; 
 
        switch (true) {
        case i.target.parentElement.classList.contains("backlog_grid"): selectedColumn = 0;
        break;

        case i.target.parentElement.classList.contains("toDo_grid"): selectedColumn = 1;
        break;

        case i.target.parentElement.classList.contains("inProgress_grid"): selectedColumn = 2;
        break;
        
        case i.target.parentElement.classList.contains("done_grid"): selectedColumn = 3;
        break;
        }
        edit();
    }
}



function edit() {
        showNew ()
        document.getElementsByClassName("content")[1].value = document.getElementById(selectedID).firstChild.innerHTML;
        document.getElementById("moveTo").selectedIndex = selectedColumn
}


function close() {
    if (document.getElementById("textInput").value == ""){
        deleteTodo()
    } else {
    show.classList.toggle("display");
    }
}


function deleteTodo(){

    let todo = document.getElementById(selectedID);
    todo.remove();
    document.getElementById("textInput").value = "";
    show.classList.toggle("display");
    
}