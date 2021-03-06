class PostIt {
    constructor(editedText) {
        this.editedText = document.getElementById("textInput").value
    }

    makeDiv() {
        if (show.classList.contains("display")) {
            this.showNew();
            var div = document.createElement("div");
            var p = document.createElement("p");
            var t = document.createTextNode("")
            div.classList.add("postIt");
            div.addEventListener("click",this.getId)
            p.appendChild(t);
            div.appendChild(p);
            backlogGrid.appendChild(div);
            div.id = divCounter;
            selectedID = divCounter
            divCounter = divCounter + 1;
        }
    }

    showNew() {
        show.classList.toggle("display")
    }

    getId(i) {
        if (this.children.length > 0) {

            if (show.classList.contains("display")) {

                selectedID = i.target.id;

                switch (true) {
                    case i.target.parentElement.classList.contains("backlog_grid"):
                        selectedColumn = 0;
                        break;

                    case i.target.parentElement.classList.contains("toDo_grid"):
                        selectedColumn = 1;
                        break;

                    case i.target.parentElement.classList.contains("inProgress_grid"):
                        selectedColumn = 2;
                        break;

                    case i.target.parentElement.classList.contains("done_grid"):
                        selectedColumn = 3;
                        break;
                }
                newPostIt.edit();
            }
        }
    }

    save() {
        var selectedDiv = document.getElementById(selectedID);
        var selectedP = selectedDiv.firstChild
        var editedText = document.getElementById("textInput").value

        if (!editedText.length) {
            alert("Your Task is empty")

        } else {


            selectedP.innerHTML = editedText;
            localStorage.setItem(selectedID,editedText+"+!+?"+document.getElementById('moveTo').selectedIndex);
            document.getElementById("textInput").value = "";
            show.classList.toggle("display");
        }
    }

    edit() {
        newPostIt.showNew()
        document.getElementsByClassName("content")[1].value = document.getElementById(selectedID).firstChild.innerHTML;
        document.getElementById("moveTo").selectedIndex = selectedColumn
    }



    close() {
        if (document.getElementById("textInput").value == "") {
            newPostIt.deleteTodo()
        } else {
            show.classList.toggle("display");
        }
    }


    deleteTodo() {

        let todo = document.getElementById(selectedID);
        localStorage.removeItem(selectedID);
        todo.remove();
        document.getElementById("textInput").value = "";
        show.classList.toggle("display");
    }

    moveTo() {
        var selectedDiv = document.getElementById(selectedID)
        var moveToColumn = document.getElementById("moveTo").selectedIndex;

        switch (moveToColumn) {
            case 0:
                backlogGrid.appendChild(selectedDiv);
                break;
            case 1:
                toDoGrid.appendChild(selectedDiv);
                break;
            case 2:
                inProgressGrid.appendChild(selectedDiv);
                break;
            case 3:
                doneGrid.appendChild(selectedDiv);
                break;
        }
    }

    onLoad() {
        if (loadToggle == false) {
            loadToggle ^=true;
        for (var e = 0; e < 50; e++) {
            if (localStorage.getItem(e) === null){continue;}
                var savedId = localStorage.getItem(e).split("+!+?");
                //makeDiv process//
                var div = document.createElement("div");
                var p = document.createElement("p");
                var t = document.createTextNode(savedId[0])
                div.classList.add("postIt");
                div.addEventListener("click",newPostIt.getId)
                p.appendChild(t);
                div.appendChild(p);
                backlogGrid.appendChild(div);
                div.id = divCounter;
                selectedID = divCounter
                divCounter = divCounter + 1;
    
                //moveTo process//
                var selectedDiv = document.getElementById(selectedID)
                var moveToColumn = parseInt(savedId[1],10);
             
                switch (moveToColumn) {
                    case 0:
                        backlogGrid.appendChild(selectedDiv);
                        break;
                    case 1:
                        toDoGrid.appendChild(selectedDiv);
                        break;
                    case 2:
                        inProgressGrid.appendChild(selectedDiv);
                        break;
                    case 3:
                        doneGrid.appendChild(selectedDiv);
                        break;
                }
            }
        }
        else{}
    }

    clear() {
        localStorage.clear();
    }


}



var divCounter = 0;
var selectedID = 0;
var show = document.getElementById("showNew");
var selectedColumn = document.getElementsByTagName("option")[0].getAttribute("value");
const backlogGrid = document.getElementsByClassName("backlog_grid")[0]
const toDoGrid = document.getElementsByClassName("toDo_grid")[0]
const inProgressGrid = document.getElementsByClassName("inProgress_grid")[0]
const doneGrid = document.getElementsByClassName("done_grid")[0]
const closeShow = document.getElementById("closeButton")
const load = document.getElementById("load")
const clear = document.getElementById("clear")
let loadToggle = false
const newPostIt = new PostIt();

closeShow.addEventListener("click", newPostIt.close)
load.addEventListener('click',newPostIt.onLoad)
clear.addEventListener('click',newPostIt.clear)

