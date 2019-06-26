class schoolClass {

    constructor() {
        this.Student = JSON.parse(localStorage.getItem('hocsinh')) || [];
        this.Teacher = JSON.parse(localStorage.getItem('giaovien')) || [];
        this.Score = JSON.parse(localStorage.getItem('diem')) || [];
        this.Subject = JSON.parse(localStorage.getItem('monhoc')) || [];
        this.Class = JSON.parse(localStorage.getItem('lophoc')) || [];
        this.loadStudent();
    }

    // test() {
    //     var a = document.getElementById("demo").innerHTML = Student[0].name;
    //     console.log(Student[0].name);
    // }
    showStudent(hs) {
        return `
        <tr>
        <td>${hs.id}</td>
        <td>${hs.name}</td>
        <td>${hs.dob}</td>
        <td>${hs.phone_number}</td>
        <td>${hs.class}</td>
        <td><a href="#"><i class="fa fa-pencil"></i></a>&nbsp&nbsp<a href="#"><i class="fa fa-trash" ></i></a></td>
    </tr>
        `;
    }

    loadStudent() {
        let studentHtml = this.Student.reduce((html, hs, index) => html += this.showStudent(hs, index), '');
        document.getElementById('student-body').innerHTML = studentHtml;
        localStorage.setItem('hocsinh', JSON.stringify(this.Student));
    }
}
let school = new schoolClass();
// school.test();