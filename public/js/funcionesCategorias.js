const url = 'https://apiparamodulos.onrender.com/api/categoria';



const listarDatos = async () => {
  console.log('Estoy en el listar');
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" ,
     }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listacategorias = data.categorias;
      console.log(listacategorias);
      if (listacategorias && Array.isArray(listacategorias)) {
        respuesta = listacategorias.map(function (categoria, index) {
          return `<tr>
                    <td>${index + 1}</td>
                    <td>${categoria.nombre}</td>
                    <td id="estado${categoria._id}">${categoria.estado}</td>
                    <td id="observacion${categoria._id}">${categoria.observaciones}</td>
                    <td>
                      <a class='btn btn-primary' onclick='editar(${JSON.stringify(categoria)})'><i class="bi bi-pencil-square"></i></a>
                      <a id="switchBtn_${categoria._id}" class="btn btn-warning" onclick='cambiarEstado("${categoria._id}")'><i class="bi bi-toggle-on"></i></a>
                    </td>
                  </tr>`;
        }).join('');
      } else {
        respuesta = 'No se encontraron categorías';
      }

      body.innerHTML = respuesta;
    });
};


function showEstadoConfir() {
  Swal.fire({
    title: 'El estado se ha cambiado con éxito',
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
      window.location.href = '/categorias';
    }
  });
}

function cambiarEstado(categoriaId) {
  Swal.fire({
    title: '¿Estás seguro de cambiar el estado?',
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
    preConfirm: (observacion) => {
      if (observacion) {
        // Obtener el estado actual de la categoría
        const estadoActual = document.getElementById(`estado${categoriaId}`).innerText;
        // Cambiar el estado opuesto
        const nuevoEstado = estadoActual === 'true' ? 'false' : 'true';

        return fetch(`https://apiparamodulos.onrender.com/api/categoria/${categoriaId}/cambiar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json' ,
            
          },
          body: JSON.stringify({ estado: nuevoEstado, observaciones: observacion })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Ocurrió un error al cambiar el estado de la categoría.');
            }
          })
          .then(() => {
            showEstadoConfir()
            // Cambio de estado exitoso, actualizar el estado y la observación en la tabla
            document.getElementById(`estado${categoriaId}`).innerText = nuevoEstado;
            document.getElementById(`observacion${categoriaId}`).innerText = observacion;
          })
          .catch(error => {
            console.error(error);
            Swal.showValidationMessage(`Error: ${error.message}`);
          });
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById('observacion').focus();
    }
  });
}





document.addEventListener("DOMContentLoaded", function () {
var url = window.location.href

if (url.includes("/editarCategoria")) {
  var queryString = url.split('?')[1]
  var params = new URLSearchParams(queryString)
  var categoria = params.get('categoria')
  consultarCategoria(categoria)
}
});







function registrar() {
    // Obtener los valores de los campos
    let _nombrecat = document.getElementById('nombrecat').value;
    let _estado = document.getElementById('estado').value;
    let _observacion = document.getElementById('observacion').value;
  
    // Crear el objeto categoria
    let categoria = {
      nombre: _nombrecat,
      estado: _estado,
      observaciones: _observacion
    };
  

      // Realizar la solicitud de registro
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(categoria),
        headers: { "Content-type": "application/json; charset=UTF-8" ,
         }
      })
        .then((resp) => resp.json())
        .then(json => {
          if (json.msg) {
    
            showRegistrar();
          }
        })
        .catch(error => {
          console.error('Error en la solicitud de registro:', error);
        });
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
        window.location.href = '/categorias';
      }
    });
  }
  

// Resto del código...

const editar = (categoria) => {
  var editUrl = "/editarCategoria?categoria=" + encodeURIComponent(categoria._id)
  window.location.href = editUrl;
}

// Resto del código...

const consultarCategoria = (categoria) => {
  console.log('Estoy en el consultar')
  const url2 = url + '?id=' + categoria.toString()
  fetch(url2 + "", {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8"  ,
     }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let categoria = data.categorias
      document.getElementById('id').value = categoria._id
      document.getElementById('nombrecat').value = categoria.nombre
      document.getElementById('estado').value = categoria.estado
      document.getElementById('observacion').value = categoria.observaciones
    })
}

const actualizar = () => {
  console.log('Estoy en el actualizar')
  let id = document.getElementById('id').value
  let _nombre = document.getElementById('nombrecat').value
  let _estado = document.getElementById('estado').value
  let _observacion = document.getElementById('observacion').value

  let categoria = {
    nombre: _nombre,
    estado: _estado,
    observaciones: _observacion
  }
console.log('estoy antes del fetch')

  fetch(url + `?id=${id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(categoria),
    headers: { "Content-type": "application/json; charset=UTF-8" ,
    }
  })
    .then((resp) => resp.json())
    .then(json => {
      if (json.msg) {
       showActualizar()
        console.log('estoy estoy adentro del then')
      }
    })
}

function showActualizar() {
    Swal.fire({
      title: 'La categoría se ha actualizado  con éxito',
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
        window.location.href = '/categorias';
      }
    });
  }
  

