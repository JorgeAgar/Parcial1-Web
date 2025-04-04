const form = document.getElementById("student_form");

document.getElementById("back_button").onclick = goBack;
document.getElementById("cancel_button").onclick = goBack;

document.getElementById("save_button").onclick = async (e) => {
    if(!form.checkValidity()){
        return;
    }

    e.preventDefault();

    const student = {
        code: form.code.value,
        name: form.name.value,
        email: form.email.value,
        photo: form.photo.value,
        github_link: form.github.value,
        description: form.description.value
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