class ToDoClass {
    constructor() {

        this.tasks = JSON.parse(localStorage.getItem('itemTask')) || [];
        this.loadTasks();
        this.percentProgress();
        this.addEventListener();
        // this.updateEventListener();
        this.perform;
        this.tam;
    }

    addEventListener() {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    // updateEventListener() {
    //     document.getElementById(index).updateEventListener('keypress', event => {
    //         if (event.keyCode === 13) {
    //             this.addTask(event.target.value);
    //             event.target.value = "";
    //         }
    //     });
    // }

    completeTodo(id) {
        let index = this.tasks.findIndex(t => t.id == id)
        console.log(index)
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks()
    }



    addTask(task) {
        let newTask = {
            id: toDo.randomId(10),
            task: task,
            isComplete: false
        };

        // let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '') {
            alert('Lỗi nhé !!!')
        } else {
            this.tasks.push(newTask);
            this.loadTasks()
            console.log(newTask)
        }
    }

    // deleteTodo(event, id) {
    //     event.preventDefault();
    //     this.tasks.splice(id, 1);
    //     this.loadTasks()
    // }

    deleteTodo = (event, id) => {
        var btn = document.createElement("button");
        event.preventDefault();
        let index = this.tasks.findIndex(t => t.id == id)
        this.tam = this.tasks.splice(index, 1);
        this.loadTasks();
        var btn = document.createElement("button");
        btn.innerHTML = "undo";
        document.body.appendChild(btn);
        btn.setAttribute("onclick", "toDo.unDo()");
        btn.setAttribute("style", " margin-left: 50%");
        btn.className = "btn btn-danger"
        btn.setAttribute("id", "btnUndo")
        setTimeout(function() {
            btn.remove();
        }, 3000);


    }

    unDo = () => {
        this.tasks.push(this.tam[0]);
        var btn = document.getElementById("btnUndo");
        btn.remove();
        this.loadTasks();
    }
    updateToDo(event, id) {
        event.preventDefault();
        let index = this.tasks.findIndex(t => t.id == id)
        console.log(index)
        var check = document.getElementById('save-' + id);
        var pen = document.getElementById('update-' + id);
        pen.setAttribute("hidden", false);
        check.removeAttribute("hidden");
        let displaybtn = document.getElementById(id);
        this.tasks[index].isComplete = false;
        displaybtn.disabled = false;
        displaybtn.focus();



    }

    selectActive() {
        let filter = this.tasks.filter(item => item.isComplete === false)
        if (filter.length > 0) {
            let taskHtml = filter.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        } else {
            alert("Empty")
        }
    }

    selectAll() {

        if (this.tasks.length > 0) {
            let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        } else {
            alert("Empty")
        }
    }

    selectComplete() {
        let filter = this.tasks.filter(item => item.isComplete === true)
        if (filter.length > 0) {
            let taskHtml = filter.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        } else {
            alert("Empty")
        }
    }

    saveEdit(event, id) {
        let index = this.tasks.findIndex(t => t.id == id)
        event.preventDefault();
        let valueEdit = document.getElementById(id).value;
        this.tasks[index].task = valueEdit;
        this.tasks[index].isComplete = false;
        this.loadTasks();
    }
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }
    percentProgress() {
        let length = this.tasks.length;
        let filter = this.tasks.filter(item => item.isComplete === true)
        let lengthActive = filter.length;
        let percent = (lengthActive / length) * 100;
        console.log(percent)
        let style = document.getElementById("progress");

        if (percent < 30) {
            style.className = "progress-bar bg-danger"
            document.getElementById("progress").style.width = percent + "%";
        } else if (percent > 30 && percent < 70) {
            style.className = "progress-bar bg-warning"
            document.getElementById("progress").style.width = percent + "%";
        } else {
            style.className = "progress-bar bg-success"
            document.getElementById("progress").style.width = percent + "%";
        }
    }

    randomId(length) {
        var result = '';
        var characters = 'cscbscjscsnpowrucnxpioewursmndzsckjsqrewrsjfdabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo('${task.id}')" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text  ${task.isComplete ? 'complete' : ''}">
                <input type="text" class="form-control" id=${task.id} disabled style="border:none;" value="${task.task}">
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <div class="icon">
                <div class="row">
                <a class="icon" href=""  onClick="toDo.updateToDo(event, '${task.id}')" ><i class="fa fa-pencil" id='update-${task.id}'></i></a>&nbsp&nbsp
                <a class="icon" href=""  onClick="toDo.saveEdit(event, '${task.id}')"><i class="fa fa-check" style="color:green" id='save-${task.id}' hidden></i></i></a>&nbsp&nbsp
                <a class="icon" href=""  onClick="toDo.deleteTodo(event, '${task.id}')"><i class="fa fa-trash" style="color:red"></i></i></a>
               
                </div>
                </div>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
        localStorage.setItem('itemTask', JSON.stringify(this.tasks));
        this.percentProgress();
    }
}

let toDo;
window.addEventListener("load", () => {
    toDo = new ToDoClass();
});