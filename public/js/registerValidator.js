window.addEventListener("load", () => {
 
    let title = document.querySelector("#name")
    title.focus();
})
   /* let usuarioNombre = document.querySelector("#name");
    let usuarioApellido = document.querySelector("#lastName");
    let usuario = document.querySelector("#username");
    let mail = document.querySelector("#email");
    let fecha = document.querySelector("#birth");
    let direccion = document.querySelector("#address");
    let contraseña = document.querySelector("#password");
    let contraseñaRepetir = document.querySelector("#passwordRepeat");
console.log(usuarioNombre)
    let form = document.querySelector(".form-register");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let errors =[];

        if (usuarioNombre.value == ""){
            errors.push("el nombre es obligatorio")
            
        } else if (usuarioNombre.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        /*if (usuarioApellido.value == ""){
            errors.push("el Apellido es obligatorio")
            
        } else if (usuarioApellido.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        if (usuario.value == ""){
        errors.push("el nombre del usuario es obligatorio")
        } else if (usuario.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        if (mail.value == ""){
            errors.push("el correo es obligatorio")
            
        }else if (mail.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        if (fecha.value == ""){
            errors.push("necesita ingresar una fecha de nacimiento")
            
        };

        if (direccion.value == ""){
            errors.push("esnecesaria una direccion")
            
        };

        if (contraseña.value == ""){
            errors.push("contraseña obligatoria")
        }else if (contraseña.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        if (contraseñaRepetir.value == ""){
            errors.push("contraseña obligatoria")
        }else if (contraseñaRepetir.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

            if (errors.length > 0){
                
                let ulErrors = document.querySelector(".errors")
                console.log(ulErrors);
                for (let i=0; i < errors.length; i++){
                    ulErrors.innerHTML += "<li>"+ errors[i] + "</li>"
                }
              } else {
                form.submit()
            };
        })
        })*/
