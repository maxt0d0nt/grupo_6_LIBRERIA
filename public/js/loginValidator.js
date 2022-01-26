window.addEventListener("load", () => {

    let title = document.querySelector("input #username")
    title.focus();

    let usuario = document.querySelector("input#username");
    let contraseña = document.querySelector("input#password");

    let form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let errors =[];

        if (usuario.value == ""){
            errors.push("el nombre es obligatorio")
        } else if (usuario.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        if (password.value == ""){
            errors.push("contraseña obligatoria")
        } else if (password.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

            if (errors.length > 0){
                
                let ulErrors = document.querySelector(".error")
                for (let i=0; i < errors.length; i++){
                    ulErrors.innerHTML += "<li>"+ errors[i] + "</li>"
                }
            };
        })})