const student_code = getQueryParam(window.location.href, "code");
const details_container = document.getElementById("details-container");

const add_subject_template = document.getElementById("add_subject_template");
const add_tech_button = document.getElementById("add_tech_button");
add_tech_button.onclick = addSubject;
document.getElementById("add_first_tech_button").onclick = addSubject;
document.getElementById("back_button").onclick = () => {window.location.href = "listado.html";};

async function loadStudentInfo(){
    const student = await api.getStudentByCode(student_code);
    // console.log(student);

    details_container.querySelector('.student-photo').src = "https://w7.pngwing.com/pngs/335/197/png-transparent-computer-icons-google-account-user-email-miscellaneous-rim-area-thumbnail.png";
    details_container.querySelector('.student-phone').textContent = student.telefono;
    details_container.querySelector('.student-name').textContent = student.nombre;
    details_container.querySelector('.student-code').textContent = "Código: " + student_code;
    details_container.querySelector('.student-email').textContent = student.email;
    details_container.querySelector('.student-direction').textContent = student.direccion;
    details_container.querySelector('.student-birthdate').textContent = (student.fecha_nacimiento);
    details_container.querySelector('.edit-button').onclick = () => {
        window.location.href = "editaralumno.html?code=" + student_code;
    };
}

async function loadStudentSubjects(){
    const student_subjects = await api.getAsignaturasEstudiante(student_code);
    // console.log(student_technologies);

    if(student_subjects.length == 0) return;

    const subject_list = document.querySelector(".student-tech-list");
    subject_list.innerHTML = "";
    student_subjects.forEach(async (subject) => {
        // console.log(tech_item);
        subject_list.appendChild(await buildTechCard(subject.asignatura));
    });
}

const tech_template = document.getElementById("tech_item_template");

var total_creditos = 0;

async function buildTechCard(asignatura){
    console.log(asignatura);
    total_creditos += asignatura.creditos;
    const clone = tech_template.content.cloneNode(true);

    clone.querySelector('.tech-item-logo').src = "https://images.vexels.com/content/157346/preview/flat-open-book-icon-14619c.png";
    clone.querySelector('.tech-item-name').textContent = asignatura.nombre;
    clone.querySelector('.asignatura-codigo').textContent = asignatura.codigo;
    clone.querySelector('.tech-item-edit-button').textContent = ("Créditos: " + asignatura.creditos);
    clone.querySelector('.tech-item-delete-button').onclick = deleteSubject(asignatura);
    
    updateCredits();
    return clone;
}

function updateCredits(){
    document.getElementById("total-credits").textContent = ("Total créditos " + total_creditos);
    if(total_creditos >= 14){
        add_tech_button.classList.add("disabled");
        add_tech_button.disabled = true;
    }
}

async function deleteSubject(tech){

}

async function addSubject() {
    const remCreds = (14 - total_creditos);
    const clone = add_subject_template.content.cloneNode(true);
    const selectSubject = clone.querySelector('#add_subject_selection');

    const subjects = await api.getAsignaturas();
    let subjInfo = new Map();
    subjects.forEach(subject => {
        if(subject.creditos <= remCreds){
            const option = document.createElement('option');
            option.value = subject.codigo;
            option.textContent = subject.nombre;
            selectSubject.appendChild(option);
            const subjectInfo = {
                description: subject.descripcion,
                credits: subject.creditos
            };
            subjInfo.set(subject.codigo, subjectInfo);
        }
    });

    let container = clone.querySelector('.add-subject-info');
    //first time
    var selectedSubjectCode = selectSubject.selectedOptions[0].value;
    updateSubjectInfoAdd(subjInfo.get(selectedSubjectCode), container);
    //after each input selection
    selectSubject.addEventListener("input", () => {
        selectedSubjectCode = selectSubject.selectedOptions[0].value;
        updateSubjectInfoAdd(subjInfo.get(selectedSubjectCode), container);
    });

    clone.querySelector('.add-subject-cancel').onclick = () => {
        document.body.removeChild(document.querySelector('.add-subject-container'));
    };

    clone.querySelector('.add-subject-enroll').onclick = async () => {
        enrolSubject(selectedSubjectCode);
    };

    document.body.appendChild(clone);
}

function updateSubjectInfoAdd(subject, infoContainer){
    infoContainer.querySelector('.add-subject-credits').textContent = ("Créditos: " + subject.credits);
    infoContainer.querySelector('.add-subject-description').textContent = subject.description;
}

async function enrolSubject(subjectCode){
    const enrolment = {
        codigo_alumno: student_code,
        codigo_asignatura: subjectCode
    };

    try {
        let response = await api.addStudentSubject(enrolment);
        console.log(response);
        document.body.removeChild(document.querySelector('.add-subject-container'));
        await loadStudentSubjects();
    } catch (error) {
        console.log(error);
        alert("Ocurrió un error");
    }
}

loadStudentInfo();
loadStudentSubjects();

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}
