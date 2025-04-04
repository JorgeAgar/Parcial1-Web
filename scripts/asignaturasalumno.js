const student_code = getQueryParam(window.location.href, "code");
const details_container = document.getElementById("details-container");

const add_tech_button = document.getElementById("add_tech_button");
add_tech_button.onclick = addTechnology();
document.getElementById("back_button").onclick = () => {window.location.href = "listado.html";};

async function loadStudentInfo(){
    const student = await api.getStudentByCode(student_code);
    console.log(student);

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

async function loadStudentTechnologies(){
    const student_technologies = await api.getStudentTechnologies(student_code);
    // console.log(student_technologies);

    if(student_technologies.length == 0) return;

    // if(student_technologies.length == 5){
    //     add_tech_button.classList.add("disabled");
    //     add_tech_button.disabled = true;
    // }

    const tech_list = document.querySelector(".student-tech-list");
    tech_list.innerHTML = "";
    student_technologies.forEach(tech_item => {
        console.log(tech_item);
        tech_list.appendChild(buildTechCard(tech_item));
    });
}

const tech_template = document.getElementById("tech_item_template");

function buildTechCard(tech_item){
    const clone = tech_template.content.cloneNode(true);
    clone.querySelector('.tech-item-logo').src = "https://images.vexels.com/content/157346/preview/flat-open-book-icon-14619c.png";
    clone.querySelector('.tech-item-name').textContent = tech_item.technology.name;
    for(let i = 0; i < tech_item.level; i++){
        clone.querySelector('.tech-item-rating').children[i].classList.add("ticked-star");
    }
    clone.querySelector('.tech-item-edit-button').onclick = editTechnology(tech_item);
    clone.querySelector('.tech-item-delete-button').onclick = deleteTechnology(tech_item);
    return clone;
}

async function editTechnology(tech){

}

async function deleteTechnology(tech){

}

async function addTechnology() {
    
}

loadStudentInfo();
loadStudentTechnologies();

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}