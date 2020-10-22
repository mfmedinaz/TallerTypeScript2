import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';

let studentsTbody: HTMLElement = document.getElementById('students')!; 
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box2")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;




btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderStudentsInTable(dataStudents);
renderCoursesInTable(dataCourses);


totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentsInTable(students: Student[]): void {
  console.log('Desplegando estudiantes');
  students.forEach((student) => {
    let trElemento = document.createElement("tr");
    trElemento.innerHTML = `<td>${student.codigo}</td>
                           <td>${student.cedula}</td>
                           <td>${student.edad}</td>
                           <td>${student.direccion}</td>
                           <td>${student.telefono}</td>`;
    studentsTbody.appendChild(trElemento);
  });
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() {
  let text = inputSearchBox2.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  var valores: string[];
  valores = text.split(";", 2);
  let coursesFiltered: Course[] = searchCourseByCredits(Number(valores[0]),Number(valores[1]), dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}

function searchCourseByCredits(vi: number, vf: number, courses: Course[]) {
  return vf === 0 ? dataCourses : courses.filter(c =>
    c.credits >= vi && c.credits <= vf);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
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