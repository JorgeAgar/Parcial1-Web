const form = document.getElementById("student_form");

document.getElementById("back_button").onclick = goBack;
document.getElementById("cancel_button").onclick = goBack;

document.getElementById("save_button").onclick = async (e) => {
    if(!form.checkValidity()){
        return;
    }

    e.preventDefault();

    const student = {
        codigo: form.code.value,
        nombre: form.name.value,
        email: form.email.value,
        telefono: form.phone.value,
        direccion: form.direction.value,
        fecha_nacimiento: form.birthdate.value
    };

    try {
        // console.log(student);
        let response = await api.createStudent(student);
        // console.log(response);
        goBack();
    } catch (error) {
        console.log(error);
        alert("Hubo un error");
    }
};

function goBack(){
    window.location.href = "../index.html";
}