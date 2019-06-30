class schoolClass {

    constructor() {
        this.Student = JSON.parse(localStorage.getItem('hocsinh')) || [];
        this.Teacher = JSON.parse(localStorage.getItem('giaovien')) || [];
        this.Score = JSON.parse(localStorage.getItem('diem')) || [];
        this.Subject = JSON.parse(localStorage.getItem('monhoc')) || [];
        this.Class = JSON.parse(localStorage.getItem('lophoc')) || [];
        this.loadStudent();
        // this.loadTeacher();
        // this.loadClass();
    }

    addStudent() {
        event.preventDefault();
        var txtID = document.getElementById("txtMasv").value;
        var txtTen = document.getElementById("txtTensv").value;
        var txtLop = document.getElementById("class").value;
        var message = document.getElementById("error");
        let newStudent = {
            id: txtID,
            name: txtTen,
            class: txtLop
        };
        const check = this.Student.some(currStudent => currStudent.id === txtID);
        if (txtID === "") {
            message.style.color = "red";
            message.innerHTML = "Vui lòng nhập ID";
        } else if (check) {
            console.log(check);
            message.style.color = "red"
            message.innerHTML = "ID này đã tồn tại. Vui lòng nhập ID khác";
        } else if (txtTen === "") {
            //  console.log(check);
            document.getElementById("error").innerHTML = "Vui lòng nhập tên sinh viên";
        } else {
            this.Student.push(newStudent);
            message.innerHTML = "Thêm sinh viên thành công";
            message.style.color = "green"
            this.loadStudent()


        }
        console.log(newStudent)
    }

    updateStudent(event, id) {
        event.preventDefault();
        let index = this.Student.findIndex(t => t.id == id)
        var check = document.getElementById("save-" + id);
        var pen = document.getElementById("update-" + id);
        pen.setAttribute("hidden", false);
        check.removeAttribute("hidden");
        let btn_id = document.getElementById(id + "-id");
        let btn_name = document.getElementById(id + "-name");
        let btn_class = document.getElementById(id + "-class");
        //console.log(btn_id);
        btn_id.removeAttribute("readonly")
        btn_name.removeAttribute("readonly")
        btn_class.removeAttribute("readonly")
        btn_id.focus();
    }

    saveEditStudent(event, id) {
        let index = this.Student.findIndex(t => t.id == id)
        event.preventDefault();
        let value_id = document.getElementById(id + '-id').value;
        let value_name = document.getElementById(id + "-name").value;
        let value_class = document.getElementById(id + "-class").value;
        const check = this.Student.some(currStudent => currStudent.id === value_id);
        var error = document.getElementById("checkSave");

        if (value_id === "") {
            error.style.color = "red"
            error.innerHTML = "Vui lòng nhập ID";
        } else if (value_id === this.Student[index].id) {
            this.loadStudent();
        } else if (check) {
            error.style.color = "red"
            error.innerHTML = "ID này đã tồn tại. Vui lòng thay đổi ID khác";
        } else {
            this.Student[index].id = value_id;
            this.Student[index].name = value_name;
            this.Student[index].class = value_class;
            error.innerHTML = "";
            this.loadStudent();
        }
    }

    deleteStudent = (event, id) => {
        event.preventDefault();
        let index = this.Student.findIndex(t => t.id == id)
        this.tam = this.Student.splice(index, 1);
        // var btn = document.getElementById("btnUndo");
        // btn.setAttribute("hidden", false);
        // btn.style.visibility = "visible";
        this.loadStudent();
        // setTimeout(function() {
        //     document.getElementById("btnUndo").style.visibility = "hidden";
        // }, 5000);


    }
    displayStudentTable() {

        var tbl_Teacher = document.getElementById("teacher-table");
        var tbl_Student = document.getElementById("student-table");
        var tbl_Class = document.getElementById("class-table");
        var tbl_Score = document.getElementById("score-table");

        var btnAddSV = document.getElementById("btnAddSV");
        var btnAddGV = document.getElementById("btnAddGV");
        var btnAddLH = document.getElementById("btnAddLH");

        tbl_Student.setAttribute("hidden", true);
        tbl_Class.setAttribute("hidden", false);
        tbl_Score.setAttribute("hidden", false);

        btnAddSV.setAttribute("hidden", false)
        btnAddGV.setAttribute("hidden", false)
        btnAddLH.setAttribute("hidden", false)

        tbl_Teacher.removeAttribute("hidden");
        btnAddSV.removeAttribute("hidden")
        this.loadStudent();
        // let studentHtml = this.Student.reduce((html, hs, index) => html += this.showStudent(hs, index), '');
        // document.getElementById('student-body').innerHTML = studentHtml;
        // localStorage.setItem('hocsinh', JSON.stringify(this.Student));

    }

    showStudent(hs) {
        return `
        <tr>
        <td> <input type="text" class="form-control" id="${hs.id}-id" readonly style="border:none;background-color:#fff" value="${hs.id}"></td>
        <td> <input type="text" class="form-control" id="${hs.id}-name" readonly style="border:none;background-color:#fff" value="${hs.name}"> </td>
        <td> <input type="text" class="form-control" id="${hs.id}-class" readonly style="border:none;background-color:#fff" value="${hs.class}"></td>
        <td><a href="#"><i class="fa fa-pencil" id="update-${hs.id}" onclick="school.updateStudent(event,'${hs.id}')"style="color:#634416"></i></a>&nbsp&nbsp
        <a href="#"><i class="fa fa-trash" onclick="school.deleteStudent(event,'${hs.id}')" style="color:red"></i></a>&nbsp&nbsp
        <i class="fa fa-check" onclick="school.saveEditStudent(event,'${hs.id}')" style="color:green" hidden id="save-${hs.id}" ></i></a></td>
    </tr>
        `;
    }

    loadStudent() {
        let studentHtml = this.Student.reduce((html, hs, index) => html += this.showStudent(hs, index), '');
        document.getElementById('student-body').innerHTML = studentHtml;
        localStorage.setItem('hocsinh', JSON.stringify(this.Student));
    }
    displayTeacherTable() {
        var tbl_Teacher = document.getElementById("teacher-table");
        var tbl_Student = document.getElementById("student-table");
        var tbl_Class = document.getElementById("class-table");
        var tbl_Score = document.getElementById("score-table");

        var btnAddSV = document.getElementById("btnAddSV");
        var btnAddGV = document.getElementById("btnAddGV");
        var btnAddLH = document.getElementById("btnAddLH");

        tbl_Student.setAttribute("hidden", false);
        tbl_Class.setAttribute("hidden", false);
        tbl_Score.setAttribute("hidden", false);

        btnAddSV.setAttribute("hidden", false)
        btnAddLH.setAttribute("hidden", false)

        tbl_Teacher.removeAttribute("hidden");
        btnAddGV.removeAttribute("hidden")
        this.loadTeacher();
    }
    showTeacher(gv) {
        return `
        <tr>
        <td> <input type="text" class="form-control" id="${gv.id}-id" readonly style="border:none;background-color:#fff" value="${gv.id}"></td>
        <td> <input type="text" class="form-control" id="${gv.id}-name" readonly style="border:none;background-color:#fff" value="${gv.name}"> </td>
        <td> <input type="text" class="form-control" id="${gv.id}-class" readonly style="border:none;background-color:#fff" value="${gv.class}"></td>
        <td><a href="#"><i class="fa fa-pencil" id="update-${gv.id}" onclick="school.updateStudent(event,'${gv.id}')"style="color:#634416"></i></a>&nbsp&nbsp
        <a href="#"><i class="fa fa-trash" onclick="school.deleteStudent(event,'${gv.id}')" style="color:red"></i></a>&nbsp&nbsp
        <i class="fa fa-check" onclick="school.saveEditStudent(event,'${gv.id}')" style="color:green" hidden id="save-${gv.id}" ></i></a></td>
    </tr>
        `;
    }

    loadTeacher() {
        let TeachertHtml = this.Teacher.reduce((html, gv, index) => html += this.showTeacher(gv, index), '');
        document.getElementById('teacher-body').innerHTML = TeachertHtml;
        localStorage.setItem('giaovien', JSON.stringify(this.Teacher));
    }

    displayClassTable() {
        var tbl_Teacher = document.getElementById("teacher-table");
        var tbl_Student = document.getElementById("student-table");
        var tbl_Class = document.getElementById("class-table");
        var tbl_Score = document.getElementById("score-table");

        var btnAddSV = document.getElementById("btnAddSV");
        var btnAddGV = document.getElementById("btnAddGV");
        var btnAddLH = document.getElementById("btnAddLH");

        tbl_Student.setAttribute("hidden", false);
        tbl_Teacher.setAttribute("hidden", false);
        tbl_Score.setAttribute("hidden", false);

        btnAddSV.setAttribute("hidden", false)
        btnAddGV.setAttribute("hidden", false)

        tbl_Class.removeAttribute("hidden");
        btnAddLH.removeAttribute("hidden")
        this.loadClass();
    }
    showClass(lh) {
        return `
        <tr>
        <td> <input type="text" class="form-control" id="${lh.id}-id" readonly style="border:none;background-color:#fff" value="${lh.id}"></td>
        <td> <input type="text" class="form-control" id="${lh.id}-name" readonly style="border:none;background-color:#fff" value="${lh.class_name}"> </td>
        <td><a href="#"><i class="fa fa-pencil" id="update-${lh.id}" onclick="school.updateStudent(event,'${lh.id}')"style="color:#634416"></i></a>&nbsp&nbsp
        <a href="#"><i class="fa fa-trash" onclick="school.deleteStudent(event,'${lh.id}')" style="color:red"></i></a>&nbsp&nbsp
        <i class="fa fa-check" onclick="school.saveEditStudent(event,'${lh.id}')" style="color:green" hidden id="save-${lh.id}" ></i></a></td>
    </tr>
        `;
    }

    loadClass() {
        let ClasstHtml = this.Class.reduce((html, lh, index) => html += this.showClass(lh, index), '');
        document.getElementById('class-body').innerHTML = ClasstHtml;
        localStorage.setItem('lophoc', JSON.stringify(this.Class));
    }
}
let school = new schoolClass();