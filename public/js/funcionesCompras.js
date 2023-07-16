const url = 'https://apiparamodulos.onrender.com/api/compra';
const urlProductos = 'https://api-cosmetic.onrender.com/api/producto';



const listarDatos = async () => {
  console.log('Estoy en el listar compra');
  let respuesta = '';
  let body = document.getElementById('contenido');

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos de las compras');
    }

    const data = await response.json();
    let listacompras = data.compras;
    console.log(listacompras);

    if (listacompras && Array.isArray(listacompras)) {
      respuesta = listacompras.map(function (compra, index) {
        const fechaCompra = new Date(compra.fechaCompra).toLocaleDateString();
        const fechaRegistro = new Date(compra.fechaRegistro).toLocaleDateString();

        return `<tr>
                  <td>${index + 1}</td>
                  <td>${compra.proveedor}</td>
                  <td>${compra.numFactura}</td>
                  <td>${fechaCompra}</td>
                  <td>${fechaRegistro}</td>
                  <td>${compra.totalCompra}</td>
                  <td>
                    <button class='btn btn-primary btn-detalles' data-toggle="modal" data-target="#detalleCompraModal" data-id="${compra._id}">
                      <i class="bi bi-eye-fill"></i>
                    </button>
                    <button class='btn btn-danger' onclick="showAnular(event)" data-id="${compra._id}">
                      <i class="bi bi-x-lg"></i>
                    </button>

            
                    <button class='btn btn-secondary' data-toggle="modal" data-target="#fotoModal"><i class="bi bi-image"></i></button>

                  </td>
                </tr>`;
      }).join('');
    } else {
      respuesta = 'No se encontraron compras';
    }

    body.innerHTML = respuesta;

    // Obtener todos los botones de "Detalle"
    const botonesDetalle = document.querySelectorAll('.btn-detalles');

    // Agregar evento click a cada botón de "Detalle"
    botonesDetalle.forEach((boton) => {
      boton.addEventListener('click', function() {
        const compraId = this.dataset.id;
        consultarCompra(compraId);
      });
    });

// Dentro de la función listarDatos

      // Obtener todos los botones de "Foto"
      const botonesFoto = document.querySelectorAll('.btn-foto');

      // Agregar evento click a cada botón de "Foto"
      botonesFoto.forEach((boton) => {
        boton.addEventListener('click', function(event) {
          event.stopPropagation(); // Evita que el evento se propague a los botones padre (Detalle y Anulación)
          const compraId = this.dataset.id;
          mostrarFoto(compraId);
        });
      });



  } catch (error) {
    console.log(error);
    respuesta = 'Error al obtener los datos de las compras';
    body.innerHTML = respuesta;
  }
};

function mostrarFoto(compraId) {
  const modalBody = document.querySelector('#fotoModal .modal-body');
  modalBody.innerHTML = ''; // Limpiar el contenido anterior del modal

  // Obtener la foto de la compra utilizando el ID y mostrarla en el modal
  const urlFotoCompra = `https://apiparamodulos.onrender.com/api/compra/${compraId}/foto`;
  fetch(urlFotoCompra)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener la foto de la compra');
      }
      return response.blob();
    })
    .then((blob) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      img.classList.add('img-fluid');
      modalBody.appendChild(img);
    })
    .catch((error) => {
      console.error('Error al obtener la foto de la compra:', error);
    });
}










const consultarCompra = (compraId) => {
  console.log('Estoy en el consultar');
  if (!compraId) {
    console.log('No se ha proporcionado el ID de la compra');
    return;
  }

  const url2 = url + '?id=' + compraId.toString();
  fetch(url2, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
  .then((resp) => resp.json())
  .then(function(data) {
    console.log('Respuesta JSON:', data);

    let compras = data.compras;
    if (!compras || !compras.detalleCompra) {
      console.log('La respuesta JSON no contiene los datos de compra esperados');
      return;
    }

    let detalleCompra = compras.detalleCompra;
    console.log('Compra:', detalleCompra);

    const fechaCompra = new Date(compras.fechaCompra).toLocaleDateString();
    const fechaRegistro = new Date(compras.fechaRegistro).toLocaleDateString();
    // Actualizar los campos del modal con los detalles de la compra
    document.getElementById('numFactura').value = compras.numFactura;
    document.getElementById('proveedor').value = compras.proveedor;
    document.getElementById('fechaRegistro').value = fechaRegistro;
    document.getElementById('fechaCompra').value = fechaCompra;
    document.getElementById('observaciones').value = compras.observacion;
    document.getElementById('totalCompra').value = compras.totalCompra;
    document.getElementById('estado').value = compras.estado;

    const detalleBody = document.getElementById('tbody');
    detalleBody.innerHTML = ''; // Limpiar la tabla de detalles

    detalleCompra.forEach((producto) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${producto.producto}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precioCompra}</td>
        <td>${producto.iva}</td>
        <td>${producto.precioVenta}</td>
        <td>${producto.categoria}</td>
      `;

      detalleBody.appendChild(fila);
    });

    // Mostrar el modal de detalle de compra
    $('#detalleCompraModal').modal('show');
  })
  .catch(function(error) {
    console.error('Error al obtener los detalles de la compra:', error);
  });
};




// Función para agregar un producto a la tabla de detalle
function agregarProducto() {
  console.log('Estoy en el agregarProducto')
  var producto = document.getElementById('producto').value;
  var cantidad = document.getElementById('cantidad').value;
  var precioCompra = document.getElementById('precioCompra').value;
  var iva = document.getElementById('iva').value;
  var precioVenta = document.getElementById('precioVenta').value;
  var categoriaId = document.getElementById('categoria').value; // Obtener el ID de la categoría

  // Buscar el nombre de la categoría correspondiente al ID
  var categoria = obtenerNombreCategoria(categoriaId);

  var fila =
    `<tr>
      <td>${producto}</td>
      <td>${cantidad}</td>
      <td>${precioCompra}</td>
      <td>${iva}</td>
      <td>${precioVenta}</td>
      <td>${categoria}</td>
      <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(this)">Eliminar</button></td>
    </tr>`;

  document.getElementById('detalleProductos').insertAdjacentHTML('beforeend', fila);

  // Limpiar los campos del formulario
  document.getElementById('producto').value = '';
  document.getElementById('precioCompra').value = '';
  document.getElementById('precioVenta').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('cantidad').value = '';
  document.getElementById('iva').value = '';
}

// Función para eliminar un producto de la tabla de detalle
function eliminarProducto(btn) {
  var fila = btn.parentNode.parentNode;
  fila.parentNode.removeChild(fila);
}

// Función para obtener el nombre de la categoría a partir del ID
function obtenerNombreCategoria(categoriaId) {
  var selectCategoria = document.getElementById('categoria');
  var categorias = selectCategoria.options;
  for (var i = 0; i < categorias.length; i++) {
    if (categorias[i].value === categoriaId) {
      return categorias[i].textContent;
    }
  }
  return '';
}

// ...

// Función para eliminar un producto de la tabla de detalle
function eliminarProducto(btn) {
  var fila = btn.parentNode.parentNode;
  fila.parentNode.removeChild(fila);
}

function showRegistrar() {
  Swal.fire({
    title: 'La compra se ha registrado con éxito',
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirigir a la vista de categorías
      window.location.href = '/compras';
    }
  });
}





const registrar = () => {
  console.log('Estoy en registrar Compra');
  const proveedorId = document.getElementById('proveedor').value
  const numFactura = document.getElementById('numFactura').value;
  const fechaCompra = document.getElementById('fechaCompra').value;
  const fechaRegistro = document.getElementById('fechaRegistro').value;
  const observacion = document.getElementById('observaciones').value;

  var proveedor = obtenerNombreProveedor(proveedorId);
console.log(proveedorId)
  const detalleCompra = [];
  const tablaDetalle = document.getElementById('detalleTabla');
  const filas = tablaDetalle.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const celdas = filas[i].getElementsByTagName('td');
    const producto = celdas[0].innerHTML;
    const cantidad = parseInt(celdas[1].innerHTML);
    const precioCompra = parseFloat(celdas[2].innerHTML);
    const iva = parseFloat(celdas[3].innerHTML);
    const precioVenta = parseFloat(celdas[4].innerHTML);
    const categoria = celdas[5].innerHTML;

    detalleCompra.push({
      producto: producto,
      cantidad: cantidad,
      precioCompra: precioCompra,
      iva: iva,
      precioVenta: precioVenta,
      categoria: categoria,
    });
  }

  let totalCompra = 0;
  for (let j = 0; j < detalleCompra.length; j++) {
    totalCompra += detalleCompra[j].precioCompra;
  }

  const compra = {
    proveedor: proveedor,
    numFactura: numFactura,
    fechaCompra: fechaCompra,
    fechaRegistro: fechaRegistro,
    observacion: observacion,
    detalleCompra: detalleCompra,
    totalCompra: totalCompra,
  };

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(compra),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      if (json.msg) {
        showRegistrar();
      }
    })
    .catch(error => {
      console.error("Error en la solicitud de registro:", error);
    });
};


// Función para obtener el nombre de la categoría a partir del ID
function obtenerNombreProveedor(proveedorId) {
  var selectProveedor = document.getElementById('proveedor');
  var proveedores = selectProveedor.options;
  for (var i = 0; i < proveedores.length; i++) {
    if (proveedores[i].value === proveedorId) {
      return proveedores[i].textContent;
    }
  }
  return '';
}

  function showAnularExito() {
    Swal.fire({
      title: 'La compra se ha Anulado con éxito',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      focusConfirm: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la vista de categorías
        window.location.href = '/compras';
      }
    });
  }







  function showAnular(event) {
    const compraId = event.target.getAttribute('data-id');
    
    if (!compraId) {
      console.error('El ID de compra es nulo');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro que deseas anular esta compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      input: 'text',
      inputPlaceholder: 'Ingrese una observación',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showLoaderOnConfirm: true,
      backdrop: true,
      preConfirm: (observacion) => {
        if (observacion) {
          const urlAnularCompra = `https://apiparamodulos.onrender.com/api/compra/${compraId}/anular`;
          fetch(urlAnularCompra, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({ estado: 'Anulada', observacion: observacion }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          })
          .then((resp) => resp.json())
          .then((data) => {
            // Actualizar el estado y la observación en la interfaz de usuario
            const estadoElement = document.getElementById('estado');
            const observacionElement = document.getElementById('observaciones');
  
            estadoElement.value = data.estado;
            observacionElement.value = observacion;
  
            console.log('Compra anulada:', data);
            console.log(compraId);
            showAnularExito()
          })
          .catch((error) => {
            console.error('Error al anular la compra:', error);
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById('observaciones').focus();
      }
    });
  }
  