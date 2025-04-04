const studentsContainer = document.getElementById("students_container");
const template = document.getElementById("student_card_template");

async function renderStudents(){
    const students = await api.getStudents();
    studentsContainer.innerHTML = "";
    students.forEach(student => {
        console.log(student);
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.student-name').textContent = student.name;
        clone.querySelector('.student-code').innerHTML = student.code;
        clone.querySelector('.student-image').src = student.photo;
        clone.querySelector('.student-phone').textContent = student.description;
        if(student.email.trim().length != 0){
            clone.querySelector('.student-email').textContent = student.email;
        }

        clone.querySelector('.edit').onclick = () => {
            window.location.href = "html/editstudent.html?code=" + student.code;
        };

        clone.querySelector('.details').onclick = () => {
            window.location.href = "html/details.html?code=" + student.code;
        };

        studentsContainer.appendChild(clone);
        
    });
}

//initial render
renderStudents()