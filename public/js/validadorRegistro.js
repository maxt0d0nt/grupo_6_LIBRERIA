window.addEventListener("load", () => {
    
    let title = document.querySelector("#name")
    title.focus();

let form = document.getElementById("form");
let usuario = document.getElementById("username");
let contraseña = document.querySelector("#password");
let apellido = document.getElementById("lastname");
let nombre = document.getElementById("name");
let mail = document.getElementById("email");
let fecha = document.getElementById("birth");
let direccion = document.getElementById("address")
let error = document.getElementById("error");


    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let errors =[];

        if (usuario.value == ""){
            errors.push("- El nombre de usuario es obligatorio")
        } else if (usuario.value.length < 3) {
            errors.push("- Este campo debe contener al menos 3 caracteres")
        };

        if (contraseña.value == ""){
            errors.push("- La contraseña es obligatoria")
        } else if (contraseña.value.length < 3) {
            errors.push("-Este campo debe contener al menos 3 caracteres")
        };

        if (apellido.value == ""){
            errors.push("- Debe contener Apellido")
        } else if (apellido.value.length < 3) {
            errors.push("- Este campo debe contener al menos 3 caracteres")
        };

        if (nombre.value == ""){
            errors.push("- Debe contener Nombre")
        } else if (nombre.value.length < 3) {
            errors.push("- Este campo debe contener al menos 3 caracteres")
        };

        if (mail.value == ""){
            errors.push("- Debe colocar un correo electronico")
        } else if (mail.value.length < 3) {
            errors.push("- Este campo debe contener un correo valido")
        };

        if (fecha.value == ""){
            errors.push("- Debe colocar su fecha de nacimiento")
        } else if (fecha.value.length < 3) {
            errors.push("- Este campo debe contener una fecha valida")
        };

        if (mail.value == ""){
            errors.push("- Debe colocar un correo electronico")
        } else if (mail.value.length < 3) {
            errors.push("- Este campo debe contener un correo valido")
        };

        if (direccion.value == ""){
            errors.push("- Debe colocar una direccion")
        } else if (direccion.value.length < 3) {
            errors.push("- Este campo debe contener una direccion")
        };

            
        if (errors.length > 0){
                
            let ulErrors = document.querySelector("#error")  
                error.innerHTML = errors.join("</br>");
    } else {
        
        console.log(form.submit())

    };
        })
})