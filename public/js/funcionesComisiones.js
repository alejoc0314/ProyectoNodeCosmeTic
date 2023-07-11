const url = "https://apibackproy.onrender.com/comisiones"


const listarDatos = async () => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaComisiones = data.comisiones;
      datos = listaComisiones.map(function (comision) {
        respuesta += `<tr><td>${comision._id}</td>` +
          `<td>${comision.nombre_empleado}</td>` +
          `<td>${comision.total_ventas}</td>` +
          `<td>${comision.fecha}</td>` +
          `<td>${comision.porcentaje}%</td>` +
          `<td>${comision.total_comision}</td>` +
          `<td>${comision.observacion}</td>` +
          `<td>
          <a class='btn btn-primary' onclick='editar(${JSON.stringify(comision)})'><i class="fa-solid fa-pen-to-square"></i></a>
          <a class='btn btn-danger' style="display: none;" onclick='eliminar("${comision._id}")'><i class="fa-solid fa-trash-can"></i></a></td></tr>`
        body.innerHTML = respuesta;
      });

    });
};

const editar = (comision) => {
  var url = "/editarComisiones?comision=" + encodeURIComponent(comision._id);

  window.location.href = url;

};




const consultarComision = (comision) => {
  const url2 = url + '?_id=' + comision.toString();
  fetch(url2 + "", {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let comision = data.comisiones;
      document.getElementById('_id').value = comision._id;
      document.getElementById('empleado').value = comision.nombre_empleado;
      document.getElementById('total_ventas').value = comision.total_ventas;
      document.getElementById('porcentaje').value = comision.porcentaje;
      document.getElementById('observacion').value = comision.observacion;
      document.getElementById('total_comision').value = comision.total_comision;
      document.getElementById('fecha_comi').value = comision.fecha + ' || ÚLTIMA FECHA';

      // Obtener la fecha actual
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      const mes = fechaActual.getMonth() + 1; // Los meses se indexan desde 0, se suma 1 para obtener el mes actual
      const dia = 29; // Día fijo como 29

      // Formatear la fecha en el formato deseado
      const fechaNueva = `${año}-${mes < 10 ? '0' + mes : mes}-${dia}`;
      document.getElementById('fecha_nueva').value = fechaNueva;
    });
}



document.addEventListener("DOMContentLoaded", function () {
  var url = window.location.href
  if (url.includes("/editarComisiones")) {
    var queryString = url.split('?')[1]
    var params = new URLSearchParams(queryString)
    var comision = params.get('comision')
    consultarComision(comision)
    console.log("Consultado")
  }
})

const actualizar = async () => {
  // Obtener los valores de los campos

  let fecha = document.getElementById('fecha_nueva').value;


  let porcentaje = document.getElementById('porcentaje').value;
  let observacion = document.getElementById('observacion').value;
  let total_venta = document.getElementById('total_ventas').value;
  let total_comision = parseFloat(document.getElementById('total_comision').value)
let empleadoNombre = document.getElementById('empleado').value;

  const validateTotalVentaResult = validateTotalVenta();
  const validateFechaeditarResult = validateFechaEdit();
  const validatePorcentajeResult = validatePorcentaje();
  const validateComisionResult = validateComision();



  if ( validateTotalVentaResult && validateFechaeditarResult && validatePorcentajeResult && validateComisionResult) {
    
    // Realizar la solicitud de registro

    Swal.fire({
      title: '¿Está seguro que desea editar la comisión?',
      text: 'Recuerde que solo podrá editarla nuevamente el día 29 del mes actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en el botón "Registrar"
        let comision = {
          nombre_empleado: empleadoNombre,
          total_ventas: total_venta,
          fecha: fecha,
          porcentaje: porcentaje,
          total_comision: total_comision,
          observacion: observacion
        };
        console.log(comision)
        fetch(url, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(comision),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
          .then((resp) => resp.json())
          .then(JSON => {
            Swal.fire(
              JSON.msg,
              'Seras redireccionado a las comisiones en 5 segundos',
              'success'
            )
              .then(() => {
                setTimeout(() => {
                  window.location.href = "/comisiones";
                }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
              });
    
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // El usuario hizo clic en el botón "Cancelar"
        Swal.fire(
          'Registro cancelado',
          '',
          'error'
        )
      }
    });
  }
}

if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}








const eliminar = (id) => {
  console.log(id)
  if (confirm('¿Desea realizar la eliminación?') == true) {

    let objeto = {
      _id: id,
    }
    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(objeto),//Convertir el objeto a un json
      headers: { "content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(JSON => {
        Swal.fire(
          JSON.msg,
          'La página se refrescará en 5 segundos',
          'success'
        )
      }).then(() => {
        setTimeout(() => {
          window.location.href = "/comisiones";
        }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
      });


  }
}


const obtenerEmpleados= async () => {
  try {
    const response = await fetch("https://apibackproy.onrender.com/empleados", {
      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      const data = await response.json();
      const empleados = data.empleados;
      generarOpcionesEmpleados(empleados); // Generar opciones del campo de selección
      return empleados;
    } else {
      console.error("Error al obtener la lista de empleados:", response.status);
      return [];  
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
};

const generarOpcionesEmpleados = (empleados) => {
  const selectEmpleado = document.getElementById("empleados");

  if (selectEmpleado) {
    // Limpiar las opciones existentes en el select
    selectEmpleado.innerHTML = "";

    // Agregar la opción "Elija una categoría" como la primera opción
    const opcionPredeterminada = document.createElement("option");
    opcionPredeterminada.value = "";
    opcionPredeterminada.disabled = true;
    opcionPredeterminada.selected = true;
    opcionPredeterminada.textContent = "Elija un empleado";
    selectEmpleado.appendChild(opcionPredeterminada);

    // Crear las opciones en el select con las categorías únicas
    empleados.forEach((empleado) => {
      const option = document.createElement("option");
      option.value = empleado._id;
      option.textContent = empleado .nombre;
      selectEmpleado.appendChild(option);
    });
  }
};


document.addEventListener("DOMContentLoaded", obtenerEmpleados);




const inputFecha = document.getElementById('fecha_comi');
const fechaActual = new Date();
const fechaFormateada = fechaActual.toISOString().slice(0, 10);
inputFecha.value = fechaFormateada;


const inputPorcentajeComision = document.getElementById('porcentaje');
const inputTotalComision = document.getElementById('total_comision');
const inputTotalVenta = document.getElementById('total_ventas');



if (inputPorcentajeComision && inputTotalComision && inputTotalVenta) {
  inputPorcentajeComision.addEventListener('input', (event) => {
    const totalComision = parseFloat(event.target.value);
    const totalVenta = parseFloat(inputTotalVenta.value);
    const comisionTotal =  totalVenta * (totalComision/100);
    inputTotalComision.value = comisionTotal;
  });
}


const registrar = async () => {
  // Obtener los valores de los campos
  let empleadoSelect = document.getElementById('empleados');
  let empleadoNombre = empleadoSelect.options[empleadoSelect.selectedIndex].text;

  let fecha = document.getElementById('fecha_comi').value;


  let porcentaje = document.getElementById('porcentaje').value;
  let observacion = document.getElementById('observacion').value;
  let total_venta = document.getElementById('total_ventas').value;
  let total_comision = document.getElementById('total_comision').value;

  const validateNombreResult = validateNombre();
  const validateTotalVentaResult = validateTotalVenta();
  const validateFechaResult = validateFecha();
  const validatePorcentajeResult = validatePorcentaje();


  if (validateNombreResult && validateTotalVentaResult && validateFechaResult && validatePorcentajeResult) {
    
    // Realizar la solicitud de registro

    Swal.fire({
      title: '¿Está seguro que desea registrar la comisión?',
      text: 'Recuerde que solo podrá editarla el día 29 del mes actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en el botón "Registrar"
        let comision = {
          nombre_empleado: empleadoNombre,
          total_ventas: total_venta,
          fecha: fecha,
          porcentaje: porcentaje,
          total_comision: total_comision,
          observacion: observacion
        };
        console.log(comision)
        fetch(url, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(comision),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
          .then((resp) => resp.json())
          .then(JSON => {
            Swal.fire(
              JSON.msg,
              'Seras redireccionado a las comisiones en 5 segundos',
              'success'
            )
              .then(() => {
                setTimeout(() => {
                  window.location.href = "/comisiones";
                }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
              });
    
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // El usuario hizo clic en el botón "Cancelar"
        Swal.fire(
          'Registro cancelado',
          '',
          'error'
        )
      }
    });
    


    
  }
}




























  const validateComision = () => {
    let comision = parseFloat(document.getElementById('total_comision').value);
    let texto
    let expresion = /[0-9]/;

    if (comision === null || comision === '' || comision.length === 0) {
       
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El total de la comisión no puede estar vacia</span>';
      document.getElementById('texto5').innerHTML = texto;
      Swal.fire(
        'Hay errores en algunos datos, reviselos nuevamente',
        '',
        'error'
      )
      return false;
    }else if (!expresion.test(comision)) {
        
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El total solo puede contener numeros</span>';
      document.getElementById('texto5').innerHTML = texto;
      Swal.fire(
        'Hay errores en algunos datos, reviselos nuevamente',
        '',
        'error'
      )
      return false;
    }else {
        
      document.getElementById('texto5').innerHTML = '';
      return true;

    }
  }; 
  






    

   
    

  const validateNombre = () => {
      let nombre = document.getElementById('empleados').value;
      let texto;
      let expresion = /[a-zA-Z]/;
    
      if (nombre === null || nombre === '' || nombre.length === 0) {
       
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre no puede estar vacio</span>';
        document.getElementById('texto').innerHTML = texto;
        Swal.fire(
          'Hay errores en algunos datos, reviselos nuevamente',
          '',
          'error'
        )
        return false;
      } else if (nombre.length < 3) {
        
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe tener mas de dos caracteres</span>';
        document.getElementById('texto').innerHTML = texto;
        Swal.fire(
          'Hay errores en algunos datos, reviselos nuevamente',
          '',
          'error'
        )
        return false;
      } else if (!expresion.test(nombre)) {
        
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre solo puede contener letras</span>';
        document.getElementById('texto').innerHTML = texto;
        Swal.fire(
          'Hay errores en algunos datos, reviselos nuevamente',
          '',
          'error'
        )
        return false;
      } else {
        
        document.getElementById('texto').innerHTML = '';
        return true;
  
      }
    }; 

    const validateTotalVenta = () => {
        let venta = document.getElementById('total_ventas').value;
        let texto;
        let expresion = /[0-9]/;
      
        
        if (venta === 0 || venta === '' || venta === null) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un valor</span>';
          document.getElementById('texto2').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        }else if (venta < 0) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten numeros positivos</span>';
          document.getElementById('texto2').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else if (!expresion.test(venta)) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
          document.getElementById('texto2').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else if (venta.length > 50) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 50 caracteres</span>';
          document.getElementById('texto2').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;    
        }else{
          document.getElementById('texto2').innerHTML = '';
          return true;
        }  
      }; 

      const validateFechaEdit = () => {
        let fecha = document.getElementById('fecha_nueva').value;
        let texto;
        let expresion = /^\d{4}-\d{2}-\d{2}$/;
      
        // Obtener la fecha actual
        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1 ; // Los meses van de 0 a 11, por lo que se suma 1
        let currentDay = today.getDate();
      console.log(currentMonth, currentDay, currentYear)
        if (fecha === null || fecha === '' || fecha.length === 0) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede estar vacía</span>';
          document.getElementById('texto7').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else if (!expresion.test(fecha)) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El formato de fecha debe ser año-mes-día</span>';
          document.getElementById('texto7').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else if (currentDay !== 29 || currentMonth !== parseInt(fecha.split('-')[1]) || currentYear !== parseInt(fecha.split('-')[0])) {
          // Validar que la fecha ingresada sea el día 29 del mes y año actual
          console.log(parseInt(fecha.split('-')[1]), parseInt(fecha.split('-')[0]))
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La fecha solo se puede editar  el día 29 del mes y año actual</span>';
          document.getElementById('texto7').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;

        } else {
          document.getElementById('texto7').innerHTML = '';
          return true;
        }
      };
      


      const validateFecha = () => {
        let fecha = document.getElementById('fecha_comi').value;
        let texto;
        let expresion = /^\d{4}-\d{2}-\d{2}$/;
      
        if (fecha === null || fecha === '' || fecha.length === 0) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede estar vacía</span>';
          document.getElementById('texto4').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else if (!expresion.test(fecha)) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El formato de fecha debe ser año-mes-día</span>';
          document.getElementById('texto4').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else {
          document.getElementById('texto4').innerHTML = '';
          return true;
        }
      };

      const validatePorcentaje = () => {
        let porcentaje = document.getElementById('porcentaje').value;
        let texto;
        let expresion = /^[1-5](\.[0-9]+)?$/;
      
        if (porcentaje === null || porcentaje === '') {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe agregar un porcentaje</span>';
          document.getElementById('texto3').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else if (!expresion.test(porcentaje)) {
          texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El porcentaje debe ser un valor numérico entre 1 y 5</span>';
          document.getElementById('texto3').innerHTML = texto;
          Swal.fire(
            'Hay errores en algunos datos, reviselos nuevamente',
            '',
            'error'
          )
          return false;
        } else {
          document.getElementById('texto3').innerHTML = '';
          return true;
        }
      };
  