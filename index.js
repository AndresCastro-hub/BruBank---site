// Simulador Interactivo de Prestamos

$(() => {
  
//Funcionamiento del MenuMobile

const hamburger = document.querySelector('.hamburger');

const mobileMenu = document.querySelector('.menu-layout');

hamburger.addEventListener('click', function(){
   
    hamburger.classList.toggle('hide');

    mobileMenu.classList.toggle('menu-mobile');
   
});

//Integracion de la API

 $("#prestamos").click(function(){
    $.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales", function(dolar){
      Swal.fire({
        icon: 'info',
        title: 'Nuestra cotizacion actual del dolar es:', 
        text: dolar[0].casa.compra+ "-" + dolar[0].casa.venta, 
        footer: 'Gracias por utiliza nuestros servicios, Brubank.'
      })
    });
    })    

//Incorporacion de JQuery
    
$(document).ready(function(){
    $("#botonForm").click(function(){

    const name = document.getElementById("nombreForm").value;

    const lastName = document.getElementById("apellidoForm").value;

    localStorage.setItem("Nombre",name);

    localStorage.setItem("Apellido",lastName);

    console.log(localStorage.getItem("Nombre"));

    console.log(localStorage.getItem("Apellido"));

    document.getElementById("nombreForm").value = "";

    document.getElementById("apellidoForm").value = "";

    });
});


$("#BotonDePrestamo").click(function(){

Swal.fire({
    title: 'Deseas finalizar la operacion' + " " + localStorage.getItem("Nombre") + " " + localStorage.getItem("Apellido") +'?',
    text: "Muchas Gracias por utilizar nuestros servicios",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Finalizar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Operacion Finalizada!',
        'La operacion ha sido realizada correctamente',
        'success'
      )
    }
  })
})


document.getElementById("calculadoraDePrestamo").addEventListener("submit",function(e){

document.getElementById("resultadoPrestamo").style.display = "none";

document.getElementById("cargandoPrestamo").style.display = "block";

setTimeout(calculadoraDePrestamos,1000);

e.preventDefault();

});    


function calculadoraDePrestamos(){

    const monto = document.getElementById("montoForm");

    const interes = document.getElementById("interesForm");

    const anios = document.getElementById("aniosForm");

    const pagoMensual = document.getElementById("pagoMesForm");

    const pagoTotal = document.getElementById("pagoAnualForm");

    const intereses = document.getElementById("interesDelPrestamo");

    const inicial = parseFloat(monto.value);

    const calcularIntereses = parseFloat(interes.value) / 100 / 12;

    const calcularPagos = parseFloat(anios.value) * 12;

    let x = Math.pow(1 + calcularIntereses,calcularPagos);

    let mensual = (inicial * x * calcularIntereses) / (x-1);

    if(mensual){
        pagoMensual.value = mensual.toFixed(2);

        pagoTotal.value = (mensual * calcularPagos).toFixed(2);

        intereses.value = (mensual * calcularPagos - inicial).toFixed(2);

    document.getElementById("resultadoPrestamo").style.display ="block"    

    document.getElementById("cargandoPrestamo").style.display = "none"

    }else{
        error("Fijate que todos los datos esten ingresados correctamente y volve a intentarlo")
    }
}


function error (error){

    document.getElementById("resultadoPrestamo").style.display = "none";

    document.getElementById("cargandoPrestamo").style.display = "none";

    const errorContainer = document.createElement("div");

    const carta = document.querySelector(".card");

    const heading = document.querySelector(".heading");

    errorContainer.className = "alert alert-danger";

    errorContainer.appendChild(document.createTextNode(error));

    carta.insertBefore(errorContainer,heading);

    setTimeout(limpiarError,2500);

    function limpiarError () {
        document.querySelector(".alert").remove();
    }
}


});