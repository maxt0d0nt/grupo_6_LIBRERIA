             window.addEventListener("load", function(){
                    let formulario = document.querySelector("form.reservation");
                
                    formulario.addEventListener("submit",function(e){
                        e.preventDefault();
                
                        let errores=[];
                
                        let campoUsuario = document.querySelector("input.usuario");
                        let campoEmail = document.querySelector("input.email");
                        let campoApellido = document.querySelector("input.apellido");
                        let campoDescripcion = document.querySelector("input.apellido");
                        let campoNivel = document.querySelector("input.nivel");
                        let campoDomicilio = document.querySelector("input.domicilio");
                        let campoExperiencia = document.querySelector("input.experiencia");
                
                        if(campoUsuario.value == ""){
                            errores.push("El campo Nombre tiene que estar completo")
                        } 
                        else if (campoUsuario.value.length < 3) {
                            errores.push("El campo Nombre debe contener al menos 3 caracteres")
                        };
                
                        //  a partir de aca se rompe algo
                        // PORQ HAY Q SACARLE EL VALUE????
                
                          if(campoApellido == ""){
                              errores.push("El campo Apellido tiene que estar completo")
                          } 
                          else if (campoApellido < 3) {
                              errores.push("El campo Apellido debe contener al menos 3 caracteres")
                          };
                
                         if(campoDescripcion == ""){
                             errores.push("El campo usuario tiene que estar completo")
                         } 
                         else if (campoDescripcion < 3) {
                             errores.push("El campo usuario debe contener al menos 3 caracteres")
                         };
                
                
                         if (campoEmail.value == ""){
                            errores.push("El campo correo electronico tiene que estar completo")
                         } else if (campoEmail.value.length < 3) {
                             errores.push("El campo correo electronico debe contener al menos 5 caracteres")
                         };
                
                
                
                
                         if(campoNivel.value == ""){
                             errores.push("El campo direccion tiene que estar completo")
                         } 
                         else if (campoNivel.value.length < 3) {
                             errores.push("El campo direccion debe contener al menos 3 caracteres")
                         };
                
                         if(campoDomicilio.value == ""){
                             errores.push("El campo contraseña tiene que estar completo")
                         } 
                         else if (campoDomicilio.value.length < 3) {
                             errores.push("El campo contraseña debe contener al menos 3 caracteres")
                         };
                
                         if(campoExperiencia.value == ""){
                             errores.push("El campo confirme su contraseña tiene que estar completo")
                         } 
                         else if (campoExperiencia.value.length < 3) {
                             errores.push("El campo confirme su contraseña debe contener al menos 3 caracteres")
                         };
                
                          
                
                            if (errores.length > 0){
                                e.preventDefault();
                                
                                let ulErrores = document.querySelector("div.errores ul")
                                for (let i = 0; i < errores.length; i++ ){
                
                                    ulErrores.innerHTML += "<li>"+ errores[i] + "</li>"
                                    
                                }
                            };
                            
                        })})