var divCounter = 0;
var selectedID = 0;
var show = document.getElementById("showNew")

function makeDiv () {
    const backlogGrid  = document.getElementsByClassName("backlog_grid")[0]
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