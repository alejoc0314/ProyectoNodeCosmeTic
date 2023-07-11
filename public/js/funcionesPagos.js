const url = "https://apibackproy.onrender.com/pagos";
let datos = []; // Declarar la variable datos aquí

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
      console.log(data.pagos); // Imprimir el valor de data.pagos en la consola
      let listaPagos = data.pagos;
      datos = listaPagos.map(function (pago) {
        respuesta += `<tr><td>${pago._id}</td>` +
          `<td>${pago.nombre_cliente}</td>` +
          `<td>${pago.fecha_pago}</td>` +
          `<td>${pago.factura}</td>` +
          `<td>${pago.total_pago}</td>` +
          `<td>${pago.total_restante}</td>` +
          `<td>${pago.total_venta}</td>` +
          `<td>
            <a class='btn btn-primary' onclick='modalVerPagos("${pago.nombre_cliente}", ${pago.factura})'><i class="fa-solid fa-eye"></i></a>
            <a class='btn btn-danger' style="display:none;" onclick='eliminar("${pago._id}")'><i class="fa-solid fa-trash-can"></i></a>
          </td></tr>`;
        body.innerHTML = respuesta;
      });
    });
};

const modalVerPagos = async (nombreCliente) => {
  const modalContenido = document.getElementById('modalContenido');
  modalContenido.innerHTML = ''; // Limpiar el contenido anterior del modal

  // Hacer una nueva solicitud al servidor para obtener los pagos del cliente
  const response = await fetch(`${url}?nombre_cliente=${nombreCliente}`, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });
  const data = await response.json();
  const listaPagosCliente = data.pagos;

  // Crear un conjunto (Set) para almacenar los números de factura únicos
  const numerosFactura = new Set();

  // Filtrar los pagos por número de factura y agregar los números únicos al conjunto
  listaPagosCliente.forEach((pago) => {
    if (!numerosFactura.has(pago.factura)) {
      numerosFactura.add(pago.factura); // Agregar el número de factura al conjunto

      // Construir una fila de la tabla dentro del modal para el pago correspondiente
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>${pago._id}</td>` +
        `<td>${pago.fecha_pago}</td>` +
        `<td>${pago.factura}</td>` +
        `<td>${pago.total_pago}</td>` +
        `<td>${pago.total_restante}</td>` +
        `<td>${pago.total_venta}</td>` +
        `<td>
          <a class='btn btn-primary' onclick='modalVerPagosPorFactura("${pago.nombre_cliente}", ${pago.factura})'><i class="fa-solid fa-eye"></i></a>
        </td>`;

      modalContenido.appendChild(fila);
    }
  });

  // Abrir el modal
  document.getElementById('nombreCliente').innerText = nombreCliente;
  $('#modalPagos').modal('show');
};

const modalVerPagosPorFactura = async (nombreCliente, numeroFactura) => {
  const modalContenido = document.getElementById('modalContenidoFactura');
  modalContenido.innerHTML = ''; // Limpiar el contenido anterior del modal

  // Hacer una nueva solicitud al servidor para obtener los pagos del cliente
  const response = await fetch(`${url}?nombre_cliente=${nombreCliente}`, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });
  const data = await response.json();
  const listaPagosCliente = data.pagos;

  // Filtrar los pagos por número de factura
  const pagosPorFactura = listaPagosCliente.filter((pago) => pago.factura === numeroFactura);

  // Construir las filas de la tabla dentro del modal
  pagosPorFactura.forEach((pago) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${pago._id}</td>` +
      `<td>${pago.fecha_pago}</td>` +
      `<td>${pago.factura}</td>` +
      `<td>${pago.total_pago}</td>` +
      `<td>${pago.total_restante}</td>` +
      `<td>${pago.total_venta}</td>`;

    modalContenido.appendChild(fila);
  });

  // Abrir el modal
  $('#modalPagosFactura').modal('show');
};











const obtenerClientes = async () => {
  try {
    const response = await fetch("https://apibackproy.onrender.com/clientes", {
      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      const data = await response.json();
      const clientes = data.clientes;
      generarOpcionesClientes(clientes); // Generar opciones del campo de selección
      return clientes;
    } else {
      console.error("Error al obtener la lista de clientes:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
};


const generarOpcionesClientes = (clientes) => {
  const selectCliente = document.getElementById("clientes");

  if (selectCliente) {
    // Limpiar las opciones existentes en el select
    selectCliente.innerHTML = "";

    // Agregar la opción "Elija una categoría" como la primera opción
    const opcionPredeterminada = document.createElement("option");
    opcionPredeterminada.value = "";
    opcionPredeterminada.disabled = true;
    opcionPredeterminada.selected = true;
    opcionPredeterminada.textContent = "Elija un cliente";
    selectCliente.appendChild(opcionPredeterminada);

    // Crear las opciones en el select con las categorías únicas
    clientes.forEach((cliente) => {
      const option = document.createElement("option");
      option.value = cliente._id;
      option.textContent = cliente.nombre;
      selectCliente.appendChild(option);
    });
  }
};



document.addEventListener("DOMContentLoaded", obtenerClientes);

let ventas = [];

const obtenerFactura = async () => {
  try {
    const response = await fetch("https://apibackproy.onrender.com/ventas", {
      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      const data = await response.json();
      ventas = data.ventas;
      generarOpcionesVentas(ventas); // Generar opciones del campo de selección
      return ventas;
    } else {
      console.error("Error al obtener la lista de ventas:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
};

const generarOpcionesVentas = (ventas) => {
  const selectVenta = document.getElementById("factura");

  if (selectVenta) {
    // Limpiar las opciones existentes en el select
    selectVenta.innerHTML = "";

    // Agregar la opción "Elija una categoría" como la primera opción
    const opcionPredeterminada = document.createElement("option");
    opcionPredeterminada.value = "";
    opcionPredeterminada.disabled = true;
    opcionPredeterminada.selected = true;
    opcionPredeterminada.textContent = "Elija una factura";
    selectVenta.appendChild(opcionPredeterminada);

    // Crear las opciones en el select con las categorías únicas
    ventas.forEach((venta) => {
      const option = document.createElement("option");
      option.value = venta._id;
      option.textContent = venta.nom_factura;
      selectVenta.appendChild(option);
    });

    // Agregar el evento change al select
    selectVenta.addEventListener('change', (event) => {
      // Obtener el valor seleccionado
      const selectedValue = event.target.value;

      // Buscar el objeto de venta que corresponde al valor seleccionado
      const selectedVenta = ventas.find(venta => venta._id === selectedValue);

      // Asignar el valor de total_venta al input correspondiente
      document.getElementById('total_venta').value = selectedVenta.total_venta;
    });
  }
};

document.addEventListener("DOMContentLoaded", obtenerFactura);


const inputTotalPago = document.getElementById('cantidad_pago');
const inputTotalRestante = document.getElementById('cantidad_restante');
const inputTotalVenta = document.getElementById('total_venta');


if (inputTotalPago && inputTotalRestante && inputTotalVenta) {
  // Agregar el evento input al input de total_pago
  inputTotalPago.addEventListener('input', (event) => {
    // Obtener el valor ingresado en total_pago
    const totalPago = parseFloat(event.target.value);

    // Obtener el valor de total_venta
    const totalVenta = parseFloat(inputTotalVenta.value);

    // Calcular el total restante
    const totalRestante = totalVenta - totalPago;

    // Asignar el valor de total_restante al input correspondiente
    inputTotalRestante.value = totalRestante;
  });
}






const fechaActual = async () => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
  const dia = fechaActual.getDate();
  const fechaNueva = `${año}-${mes < 10 ? '0' + mes : mes}-${dia}`;

  // Asignar la fecha actual al campo de fecha
  document.getElementById('fecha').value = fechaNueva;
}


const registrar = async () => {
  // Obtener la fecha actual
  

  let clienteSelect = document.getElementById('clientes');
  let clienteNombre = clienteSelect.options[clienteSelect.selectedIndex].text;
  let facturaSelect = document.getElementById('factura');
  let facturaNumero = facturaSelect.options[facturaSelect.selectedIndex].text;
  let fecha = document.getElementById('fecha').value;
  let cantidad_pago = document.getElementById('cantidad_pago').value;
  let cantidad_restante = document.getElementById('cantidad_restante').value;
  let total_venta = document.getElementById('total_venta').value;


  const validateNombreResult = validateNombre();
  const validateFacturaResult = validateFactura();
  const validateFechaResult = validateFecha();
  const validateCantidadPagoResult = validateCantidadPago();
  const validateCantidadRestanteResult = validateCantidadRestante();
  const validateTotalVentaResult = validateTotalVenta();


  if (validateNombreResult && validateTotalVentaResult && validateFechaResult && validateFacturaResult && validateCantidadPagoResult && validateCantidadRestanteResult) {
    let pago = {
      nombre_cliente: clienteNombre,
      factura: facturaNumero,
      total_venta: total_venta,
      fecha_pago: fecha,
      total_pago: cantidad_pago,
      total_restante: cantidad_restante
    };
    console.log(pago)
    // Realizar la solicitud de registro
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(pago),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(JSON => {
        Swal.fire(
          JSON.msg,
          'Seras redireccionado a los pagos en 5 segundos',
          'success'
        )
          .then(() => {
            setTimeout(() => {
              window.location.href = "/pagos";
            }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
          });

      });
  }
}

const editar = (pago) => {
  var url = "/editarPagos?pago=" + encodeURIComponent(pago._id);

  window.location.href = url;



};

const consultarPago = (pago) => {

  const url2 = url + '?_id=' + pago.toString();
  fetch(url2 + "", {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {

      let pago = data.pagos;
      document.getElementById('_id').value = pago._id;
      document.getElementById('cliente').value = pago.nombre_cliente + ' || CLIENTE ACTUAL'
      document.getElementById('factura').value = pago.factura;
      document.getElementById('total_venta').value = pago.total_venta;
      document.getElementById('cantidad_restante').value = pago.total_restante
      document.getElementById('cantidad_pago').value = pago.total_pago;
    });

}


document.addEventListener("DOMContentLoaded", function () {
  var url = window.location.href
  if (url.includes("/editarPagos")) {
    var queryString = url.split('?')[1]
    var params = new URLSearchParams(queryString)
    var pago = params.get('pago')
    consultarPago(pago)
    console.log("Consultado")
  }
})

const actualizar = async () => {
  // Obtener los valores de los campos
  let clienteSelect = document.getElementById('clientes');
  let clienteNombre = clienteSelect.options[clienteSelect.selectedIndex].text;
  let facturaNumero = document.getElementById('factura').value;
  let cantidad_pago = document.getElementById('cantidad_pago').value;
  let cantidad_restante = document.getElementById('cantidad_restante').value;
  let total_venta = document.getElementById('total_venta').value;
  let id = document.getElementById('_id').value;



  const validateNombreResult = validateNombre();
  const validateCantidadPagoResult = validateCantidadPago();
  const validateCantidadRestanteResult = validateCantidadRestante();
  const validateTotalVentaResult = validateTotalVenta();


  if (validateNombreResult && validateTotalVentaResult && validateCantidadPagoResult && validateCantidadRestanteResult) {
    let pago = {
      _id: id,
      nombre_cliente: clienteNombre,
      factura: facturaNumero,
      total_venta: total_venta,
      total_pago: cantidad_pago,
      total_restante: cantidad_restante
    };
    console.log(pago)
    // Realizar la solicitud de registro
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(pago),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(JSON => {
        Swal.fire(
          'Pago modificado con exito',
          'Seras redireccionado a los pagos en 5 segundos',
          'success'
        ).then(() => {
          setTimeout(() => {
            window.location.href = "/pagos";
          }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
        });

      });
  } else {
    alert(error)
  }
}
if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}



const eliminar = (id) => {
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
          window.location.href = "/pagos";
        }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
      });


  }
}




















const validateNombre = () => {
  let nombre = document.getElementById('clientes').value;
  let texto;
  let expresion = /[a-zA-Z]/;

  if (nombre === null || nombre === '' || nombre.length === 0) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre no puede estar vacio</span>';
    document.getElementById('texto2').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (nombre.length < 3) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe tener mas de dos caracteres</span>';
    document.getElementById('texto2').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (!expresion.test(nombre)) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre solo puede contener letras</span>';
    document.getElementById('texto2').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else {

    document.getElementById('texto2').innerHTML = '';
    return true;

  }

};

const validateFactura = () => {
  let factura = document.getElementById('factura').value.trim();
  let texto;
  let expresion = /^\d+$/;

  if (factura === null || factura === '' || factura.lengt === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El número de factura no puede estar vacío</span>';
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

const validateFecha = () => {
  let fecha = document.getElementById('fecha').value;
  let texto;
  let expresion = /^\d{4}-\d{2}-\d{2}$/;

  if (fecha === null || fecha === '' || fecha.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede estar vacía</span>';
    document.getElementById('texto').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (!expresion.test(fecha)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El formato de fecha debe ser año-mes-día</span>';
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

const validateCantidadPago = () => {
  let pago = document.getElementById('cantidad_pago').value;
  let texto;
  let expresion = /[0-9]/;


  if (pago === 0 || pago === '' || pago === null) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto4').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (pago < 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten numeros positivos</span>';
    document.getElementById('texto4').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (!expresion.test(pago)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto4').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (pago.length > 50) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 50 caracteres</span>';
    document.getElementById('texto4').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  }
  else if (parseInt(pago) > parseInt(document.getElementById('total_venta').value)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cantidad a pagar debe ser menor al total de la venta</span>';
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

const validateCantidadRestante = () => {
  let resto = document.getElementById('cantidad_restante').value;
  let texto;
  let expresion = /[0-9]/;


  if (resto === 0 || resto === '' || resto === null) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (resto < 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten numeros positivos</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (!expresion.test(resto)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (resto.length > 50) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (parseInt(resto) >   parseInt(document.getElementById('total_venta').value)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cantidad restante debe ser menor al total de la venta</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else {
    document.getElementById('texto5').innerHTML = '';
    return true;
  }
};

const validateTotalVenta = () => {
  let venta = document.getElementById('total_venta').value;
  let texto;
  let expresion = /[0-9]/;


  if (venta === 0 || venta === '' || venta === null) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto6').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (venta < 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten numeros positivos</span>';
    document.getElementById('texto6').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (!expresion.test(venta)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto6').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (venta.length > 50) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 50 caracteres</span>';
    document.getElementById('texto6').innerHTML = texto
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  } else if (parseInt(venta) < parseInt(document.getElementById('cantidad_pago').value) || parseInt(venta) < parseInt(document.getElementById('cantidad_restante').value)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El total de la venta debe ser mayor al pago y al restante</span>';
    document.getElementById('texto6').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;
  }
  else {
    document.getElementById('texto6').innerHTML = '';
    return true;
  }
};







