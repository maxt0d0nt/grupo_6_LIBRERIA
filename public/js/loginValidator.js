window.addEventListener("load", () => {
    
    let title = document.querySelector("#username")
    title.focus();
})

/*let usuario = document.querySelector("#username");
let contraseña = document.querySelector("#password");

   let form = document.querySelector(".form-in");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let errors =[];

        if (usuario.value == ""){
            errors.push("el nombre es obligatorio")
        } else if (usuario.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };

        if (contraseña.value == ""){
            errors.push("contraseña obligatoria")
        } else if (contraseña.value.length < 3) {
            errors.push("este campo debe contener al menos 3 caracteres")
        };
        console.log(errors)
        
        if (errors.length > 0){
            console.log("vamos")
                let ulErrors = document.querySelector(".errors")
                console.log(ulErrors)
                    for (let i=0; i <= errors.length; i++){
                    ulErrors.innerHTML += "<li>"+ errors[i] + "</li>"
                }
            } else {
                form.submit()
            };
            
        })*/