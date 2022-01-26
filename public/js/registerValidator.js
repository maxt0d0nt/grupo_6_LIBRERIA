window.addEventListener("load", () => {
    
    let title = document.querySelector("input #name")
    title.focus();

    let usuarioNombre = document.querySelector("input#name");
    let usuarioApellido = document.querySelector("input#lastName");
    let usuario = document.querySelector("input#username");
    let mail = document.querySelector("input#email");
    let fecha = document.querySelector("input#birth");
    let direccion = document.querySelector("input#address");
    let contraseña = document.querySelector("input#password");
    let contraseñaRepetir = document.querySelector("input#passwordRepeat");

    let form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let errors =[];

        if (usuarioNombre.value == ""){
            errors.push("el nombre es obligatorio")
            
        };

        if (usuarioNombre.value == ""){
            errors.push("el Apellido es obligatorio")
            
        };

        if (usuario.value == ""){
        errors.push("el nombre del usuario es obligatorio")
        };

        if (mail.value == ""){
            errors.push("el correo es obligatorio")
            
        };

        if (fecha.value == ""){
            errors.push("necesita ingresar una fecha de nacimiento")
            
        };

        if (direccion.value == ""){
            errors.push("esnecesaria una direccion")
            
        };

        if (contraseña.value == ""){
            errors.push("contraseña obligatoria")
        };

        if (contraseñaRepetir.value == ""){
            errors.push("contraseña obligatoria")
        };

            if (errors.length > 0){
                
                let ulErrors = document.querySelector(".error")
                for (let i=0; i < errors.length; i++){
                    ulErrors.innerHTML += "<li>"+ errors[i] + "</li>"
                }
            };
        })})