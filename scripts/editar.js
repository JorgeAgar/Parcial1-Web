const form = document.getElementById("student_form");
const student_code = getQueryParam(window.location.href, "code");

document.getElementById("back_button").onclick = goBack;
document.getElementById("cancel_button").onclick = goBack;

document.getElementById("save_button").onclick = async (e) => {
    if(!form.checkValidity()){
        return;
    }
    e.preventDefault();

    const student = {
        // codigo: form.code.value,
        nombre: form.name.value,
        email: form.email.value,
        telefono: form.phone.value,
        direccion: form.direction.value,
        fecha_nacimiento: form.birthdate.value
    };

    try {
        // console.log(student);
        let response = await api.updateStudent(student_code, student);
        // console.log(response);
        goBack();
    } catch (error) {
        console.log(error);
        alert("Hubo un error");
    }
};

async function updateFormData(){
    const student = await api.getStudentByCode(student_code);
    form.code.placeholder = student_code;
    form.name.value = student.nombre;
    form.email.value = student.email;
    form.phone.value = student.telefono;
    form.direction.value = student.direccion;
    form.birthdate.value = student.fecha_nacimiento;
}

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}

function goBack(){
    window.location.href = "listado.html";
}

updateFormData();