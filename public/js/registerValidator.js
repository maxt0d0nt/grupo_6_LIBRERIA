// window.addEventListener("load", () => {
 
//     let title = document.querySelector("#name")
//     title.focus();
// })


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




        // LOGICA DE KOKUN 

        // window.addEventListener("load", function(){
        //     let formulario = document.querySelector("form .reservation");
        
        //      formulario.addEventListener("submit",function(evento){
        //          evento.preventDefault();
        
        //         let errores=[];

                
                // usuario
                // let campoUsuario = document.querySelector(".usuario");
                // let campoEmail = document.querySelector("input.email");
                // let campoApellido = document.querySelector("input.apellido");
                // let campoDescripcion = document.querySelector("input.apellido");
                // let campoNivel = document.querySelector("input.nivel");
                // let campoDomicilio = document.querySelector("input.domicilio");
                // let campoExperiencia = document.querySelector("input.experiencia");
        
                // if(campoUsuario.value == ""){
                //     errores.push("El campo Nombre tiene que estar completo")
                // } 
                // else if (campoUsuario.value.length < 3) {
                //     errores.push("El campo Nombre debe contener al menos 3 caracteres")
                // };
        
                //  a partir de aca se rompe algo
                // PORQ HAY Q SACARLE EL VALUE????
        
                //   if(campoApellido == ""){
                //       errores.push("El campo Apellido tiene que estar completo")
                //   } 
                //   else if (campoApellido < 3) {
                //       errores.push("El campo Apellido debe contener al menos 3 caracteres")
                //   };
        
                //  if(campoDescripcion == ""){
                //      errores.push("El campo usuario tiene que estar completo")
                //  } 
                //  else if (campoDescripcion.value.length < 3) {
                //      errores.push("El campo usuario debe contener al menos 3 caracteres")
                //  };
        
        
                //  if (campoEmail.value == ""){
                //     errores.push("El campo correo electronico tiene que estar completo")
                //  } else if (campoEmail.value.length < 3) {
                //      errores.push("El campo correo electronico debe contener al menos 5 caracteres")
                //  };
        
        
        
        
                //  if(campoNivel.value == ""){
                //      errores.push("El campo direccion tiene que estar completo")
                //  } 
                //  else if (campoNivel.value.length < 3) {
                //      errores.push("El campo direccion debe contener al menos 3 caracteres")
                //  };
        
                //  if(campoDomicilio.value == ""){
                //      errores.push("El campo contraseña tiene que estar completo")
                //  } 
                //  else if (campoDomicilio.value.length < 3) {
                //      errores.push("El campo contraseña debe contener al menos 3 caracteres")
                //  };
        
                //  if(campoExperiencia.value == ""){
                //      errores.push("El campo confirme su contraseña tiene que estar completo")
                //  } 
                //  else if (campoExperiencia.value.length < 3) {
                //      errores.push("El campo confirme su contraseña debe contener al menos 3 caracteres")
                //  };
        
                  
        
                //     if (errores.length > 0){
                //         e.preventDefault();
                        
                //         let ulErrores = document.querySelector("div.errores ul")
                //         for (let i = 0; i < errores.length; i++ ){
        
                //             ulErrores.innerHTML += "<li>"+ errores[i] + "</li>"
                            
                //         }
                //     };
                    
                // })})


                window.addEventListener('load',function(){
                    //Capturar el formulario 
                    let formulario = document.querySelector('.formulario');
                    //console.log(formulario.elements.email.value);
                    formulario.addEventListener('submit',function(evento){
                        if(!validaciones(evento)){
                            evento.preventDefault();
                        }else{
                            formulario.submit();
                        }    
                
                        function validaciones(evento){
                          //Destructuring  
                          let {first_name, last_name, email, password, confirm_password, provincia, avatar  } = formulario.elements;
                          let errores = [];
                          console.log(formulario.elements.confirm_password.value);
                          //Validar Nombre
                          if(first_name.value == ''){
                              errores.push('El campo nombre no puede estar vacio...');
                              first_name.classList.add('is-invalid');   
                              //errores['first_name'] = 'El campo nombre no puede estar vacio...';
                          }else{
                              first_name.classList.add('is-valid');
                              first_name.classList.remove('is-invalid');
                          }
                
                          //Validar Apellido
                          if(last_name.value == ''){
                            errores.push('El campo apellido no puede estar vacio...');
                            last_name.classList.add('is-invalid');   
                            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
                        }else{
                            last_name.classList.add('is-valid');
                            last_name.classList.remove('is-invalid');
                        }
                        //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
                        let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                   
                        if(!reEmail.test(email.value)){
                            errores.push('El email es inválido...');
                            email.classList.add('is-invalid');   
                            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
                        }else{
                            email.classList.add('is-valid');
                            email.classList.remove('is-invalid');
                        }
                        //Aquí valido el password haciendo uso de Expresiones Regulares
                        //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
                        let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                        if(!rePassword.test(password.value)){
                            errores.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número');
                            password.classList.add('is-invalid');   
                            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
                        }else{
                            password.classList.add('is-valid');
                            password.classList.remove('is-invalid');
                        }
                        //Aquí valido a que la confirmación del password no llegue vacia
                        if(confirm_password.value == ""){
                            errores.push('La confirmación de la contraseña no puede estar vacia');
                            confirm_password.classList.add('is-invalid');   
                
                        }else{
                            //Ahora valido si las dos contraseñas son iguales
                            if(password.value != confirm_password.value && confirm_password != ""){
                                errores.push('Las contraseñas deben ser iguales');
                                confirm_password.classList.add('is-invalid');   
                                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
                            }else{
                                confirm_password.classList.add('is-valid');
                                confirm_password.classList.remove('is-invalid');
                            }
                        }
                        //Aquí valido que el usuario coloque su avatar (Yo en mi caso lo considero como un dato obligatorio, ustedes si quieren lo validan como deseen)
                        if(avatar.value == ''){
                            errores.push('Debe seleccionar su avatar en formato JPG - PNG ó JPEG');
                            avatar.classList.add('is-invalid');   
                            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
                        }else{
                            avatar.classList.add('is-valid');
                            avatar.classList.remove('is-invalid');
                        }
                
                          //Aquí enviamos los errores al usuario
                          let ulErrores = document.getElementById('errores');
                          ulErrores.classList.add('alert-danger')
                          if(errores.length > 0){
                              evento.preventDefault();
                              ulErrores.innerHTML = "";
                              for (let i = 0 ; i < errores.length; i++){
                                ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                              }
                              errores = [];
                          }else{
                              return true;
                          } 
                        }
                        
                    })
                
                })