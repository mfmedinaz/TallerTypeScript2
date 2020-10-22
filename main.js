import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var studentsTbody = document.getElementById('students');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox2 = document.getElementById("search-box2");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderStudentsInTable(dataStudents);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (student) {
        var trElemento = document.createElement("tr");
        trElemento.innerHTML = "<td>" + student.codigo + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.edad + "</td>\n                           <td>" + student.direccion + "</td>\n                           <td>" + student.telefono + "</td>";
        studentsTbody.appendChild(trElemento);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var text = inputSearchBox2.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var valores;
    valores = text.split(";", 2);
    var coursesFiltered = searchCourseByCredits(Number(valores[0]), Number(valores[1]), dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(vi, vf, courses) {
    return vf === 0 ? dataCourses : courses.filter(function (c) {
        return c.credits >= vi && c.credits <= vf;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
    function clearStudentsInTable() {
        while (studentsTbody.hasChildNodes()) {
            if (studentsTbody.firstChild != null) {
                studentsTbody.removeChild(studentsTbody.firstChild);
            }
        }
    }
}
