class ToDoClass {
    constructor() {

        this.tasks = JSON.parse(localStorage.getItem('itemTask')) || [];
        this.loadTasks();
        this.percentProgress();
        this.addEventListener();
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

    completeTodo(index) {
        //   alert(index);
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks()
    }



    addTask(task) {
        let newTask = {
            task: task,
            isComplete: false
        };
        let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '') {
            alert('Lỗi nhé !!!')
        } else {
            this.tasks.push(newTask);
            this.loadTasks()
        }
    }

    // deleteTodo(event, id) {
    //     event.preventDefault();
    //     this.tasks.splice(id, 1);
    //     this.loadTasks()
    // }

    deleteTodo(event, id) {
        event.preventDefault();
        this.perform = {
            task: this.tasks[id].task,
            isComplete: this.tasks[id].isComplete
        };
        this.tam = this.tasks.splice(id, 1);
        this.loadTasks();
        console.log(this.tam);

        var btn = document.createElement("button");
        btn.innerHTML = "undo";
        document.body.appendChild(btn);

        btn.setAttribute("onclick", "toDo.unDo()");
        btn.setAttribute("style", " margin-left: 50%");
        setTimeout(function() {
            btn.remove();
        }, 3000);
    }

    unDo() {
        this.tasks.push(this.perform);
        console.log(this.tasks);
        this.loadTasks();
    }
    updateToDo(event, index) {
        event.preventDefault();
        let displaybtn = document.getElementById(index);
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

    saveEdit(event, index) {
        event.preventDefault();
        let valueEdit = document.getElementById(index).value;
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
        document.getElementById("progress").style.width = percent + "%";
    }
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo(${index})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text  ${task.isComplete ? 'complete' : ''}">
                <input type="text" class="form-control" id="${index}"disabled style="border:none;" value="${task.task}">
                
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <div class="icon">
                <div class="row">
                <a class="icon" href=""  onClick="toDo.updateToDo(event, ${index})" ><i id="pen"class="fa fa-pencil" ></i></i></a>&nbsp&nbsp
                <a class="icon" href=""  onClick="toDo.deleteTodo(event, ${index})"><i class="fa fa-trash" style="color:red"></i></i></a>&nbsp&nbsp
                <a class="icon" href=""  onClick="toDo.saveEdit(event, ${index})"><i class="fa fa-check" style="color:green" ></i></i></a>
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