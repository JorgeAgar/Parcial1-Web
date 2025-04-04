const studentsContainer = document.getElementById("students_container");
const template = document.getElementById("student_card_template");

async function renderStudents(){
    const students = await api.getStudents();
    studentsContainer.innerHTML = "";
    students.forEach(student => {
        console.log(student);
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.student-name').textContent = student.nombre;
        clone.querySelector('.student-code').innerHTML = student.codigo;
        clone.querySelector('.student-image').src = "https://w7.pngwing.com/pngs/335/197/png-transparent-computer-icons-google-account-user-email-miscellaneous-rim-area-thumbnail.png";
        clone.querySelector('.student-phone').textContent = student.telefono;
        if(student.email.trim().length != 0){
            clone.querySelector('.student-email').textContent = student.email;
        }

        clone.querySelector('.edit').onclick = () => {
            window.location.href = "editaralumno.html?code=" + student.codigo;
        };

        clone.querySelector('.details').onclick = () => {
            window.location.href = "html/details.html?code=" + student.codigo;
        };

        studentsContainer.appendChild(clone);
        
    });
}

//initial render
renderStudents()