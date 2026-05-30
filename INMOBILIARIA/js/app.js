// =======================================
// CONFIGURACIÓN
// =======================================

// REEMPLAZA ESTA URL POR LA DE TU APPS SCRIPT
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycby-XSzBHn8jYTe6yJ3-RF-eQd6cTgNlITykTLSmh12y56GSTg9RE9kHrGeF2ZdDGHg5DQ/exec";


// =======================================
// SELECCIONAR PROPIEDAD
// =======================================

function seleccionarPropiedad(nombrePropiedad){

    document.getElementById("propiedad").value = nombrePropiedad;

    document
    .getElementById("contacto")
    .scrollIntoView({
        behavior:"smooth"
    });

}


// =======================================
// MENSAJE BONITO
// =======================================

function mostrarMensaje(texto,tipo){

    const alerta = document.createElement("div");

    alerta.className =
    `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-4`;

    alerta.style.zIndex = "9999";

    alerta.style.minWidth = "350px";

    alerta.innerHTML = texto;

    document.body.appendChild(alerta);

    setTimeout(()=>{

        alerta.remove();

    },4000);

}


// =======================================
// VALIDACIONES
// =======================================

function validarFormulario(datos){

    if(datos.nombre.trim() === ""){
        mostrarMensaje(
            "Ingrese su nombre",
            "danger"
        );
        return false;
    }

    if(datos.telefono.trim() === ""){
        mostrarMensaje(
            "Ingrese su teléfono",
            "danger"
        );
        return false;
    }

    if(datos.correo.trim() === ""){
        mostrarMensaje(
            "Ingrese su correo",
            "danger"
        );
        return false;
    }

    if(datos.propiedad.trim() === ""){
        mostrarMensaje(
            "Seleccione una propiedad",
            "danger"
        );
        return false;
    }

    return true;
}


// =======================================
// ENVÍO FORMULARIO
// =======================================

document
.getElementById("formulario")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const datos = {

        nombre:
        document.getElementById("nombre").value,

        telefono:
        document.getElementById("telefono").value,

        correo:
        document.getElementById("correo").value,

        tipo:
        obtenerTipo(),

        propiedad:
        document.getElementById("propiedad").value,

        presupuesto:
        document.getElementById("presupuesto").value,

        mensaje:
        document.getElementById("mensaje").value

    };

    if(!validarFormulario(datos)){
        return;
    }

    try{

        mostrarMensaje(
            "Enviando solicitud...",
            "warning"
        );

        const respuesta = await fetch(
            URL_SCRIPT,
            {
                method:"POST",
                body:JSON.stringify(datos)
            }
        );

        const resultado =
        await respuesta.text();

        console.log(resultado);

        mostrarMensaje(
            "Solicitud enviada correctamente",
            "success"
        );

        document
        .getElementById("formulario")
        .reset();

    }

    catch(error){

        console.error(error);

        mostrarMensaje(
            "Error al enviar información",
            "danger"
        );

    }

});


// =======================================
// DETECTAR TIPO DE PROPIEDAD
// =======================================

function obtenerTipo(){

    const propiedad =
    document.getElementById("propiedad")
    .value
    .toLowerCase();

    if(propiedad.includes("casa")){
        return "Casa";
    }

    if(propiedad.includes("terreno")){
        return "Terreno";
    }

    if(propiedad.includes("departamento")){
        return "Departamento";
    }

    return "General";

}


// =======================================
// EFECTOS ADICIONALES
// =======================================

window.addEventListener("scroll",()=>{

    const navbar =
    document.querySelector(".navbar");

    if(window.scrollY > 100){

        navbar.classList.add("shadow");

    }else{

        navbar.classList.remove("shadow");

    }

});


// =======================================
// MENSAJE DE BIENVENIDA
// =======================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        mostrarMensaje(
            "Bienvenido a Inmobiliaria HUMEREZ",
            "primary"
        );

    },1000);

});

// ===================================
// FORMULARIO DE CITAS
// ===================================

document
.getElementById("formCita")
.addEventListener("submit", async function(e){

e.preventDefault();

const datos = {

accion:"cita",

nombre:
document.getElementById("citaNombre").value,

correo:
document.getElementById("citaCorreo").value,

telefono:
document.getElementById("citaTelefono").value,

propiedad:
document.getElementById("citaPropiedad").value,

fecha:
document.getElementById("fechaVisita").value,

hora:
document.getElementById("horaVisita").value

};

try{

const respuesta =
await fetch(URL_SCRIPT,{

method:"POST",

body:JSON.stringify(datos)

});

const resultado =
await respuesta.text();

console.log(resultado);

mostrarMensaje(
"Visita programada correctamente",
"success"
);

document
.getElementById("formCita")
.reset();

}
catch(error){

mostrarMensaje(
"Error al programar visita",
"danger"
);

}

});