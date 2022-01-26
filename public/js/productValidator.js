window.addEventListener("load", () => {
    
    let title = document.querySelector("input #name")
    title.focus();

    let productoNombre = document.querySelector("input#name");
    let autor = document.querySelector("input#author");
    let descripcion = document.querySelector("input#description");
    
    let form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let errors =[];

        if (productoNombre.value == ""){
            errors.push("el nombre es obligatorio")
            
        };

        if (author.value == ""){
            errors.push("el autor es obligatorio")
            
        };

        if (descripcion.value == ""){
        errors.push("Por favor coloque la descripcion del producto")
        };

      
            if (errors.length > 0){
                
                let ulErrors = document.querySelector(".error")
                for (let i=0; i < errors.length; i++){
                    ulErrors.innerHTML += "<li>"+ errors[i] + "</li>"
                }
            };
        })})