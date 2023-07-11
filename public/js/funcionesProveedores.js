
const url = "https://apibackproy.onrender.com/proveedores"

const listarDatos = async () => {
  let respuesta = ""
  let body = document.getElementById("contenido")

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data)
      let listaProveedores = data.proveedores
      return listaProveedores.map(function (proveedor) {
        // Verificar el estado del proveedor y mostrar el ícono correspondiente
        let iconoEstado = proveedor.estado_proveedor ? 'fa-toggle-on' : 'fa-toggle-off';
        respuesta += `<tr><td>${proveedor._id}</td>` +
          `<td>${proveedor.nit_cedula}</td>` +
          `<td>${proveedor.nombre_proveedor}</td>` +
          `<td>${proveedor.correo}</td>` +
          `<td>${proveedor.direccion}</td>` +
          `<td>${proveedor.telefono}</td>` +
          `<td>${proveedor.estado_proveedor}</td>` +
          `<td>${proveedor.observacion}</td>` +
          `<td>${proveedor.contactoProov}</td>` +
          `<td>
          <a class='btn btn-primary' onclick='editar(${JSON.stringify(proveedor)})'><i class="fa-solid fa-pen-to-square"></i></a>
          <a class='btn btn-warning' onclick='cambiarEstado("${proveedor._id}")'><i class="fa-solid ${iconoEstado}"></i></a>
          <a style="display: none;" class='btn btn-danger' onclick='eliminar("${proveedor._id}")'><i class="fa-solid fa-trash-can"></i></a></td></tr>`
        body.innerHTML = respuesta
      })

    })

}

const cambiarEstado = (id) => {
  Swal.fire({
    title: '¿Está seguro que desea cambiar el estado del proveedor?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url + '/cambiarEstado', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ id: id }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json())
        .then(function (data) {
          Swal.fire(
            data.msg,
            '',
            'success'
          ).then(() => {
            listarDatos();
          });
        });
    }
  })
}





const editar = (proveedor) => {
  var url = "/editarProveedores?proveedor=" + encodeURIComponent(proveedor._id);

  window.location.href = url;
};

const consultarProveedor = (proveedor) => {

  const url2 = url + '?_id=' + proveedor.toString();
  fetch(url2 + "", {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {

      let proveedor = data.proveedores;
      document.getElementById('id').value = proveedor._id;
      document.getElementById('cedula').value = proveedor.nit_cedula;
      document.getElementById('nombre').value = proveedor.nombre_proveedor;
      document.getElementById('correo').value = proveedor.correo;
      document.getElementById('direccion').value = proveedor.direccion;
      document.getElementById('telefono').value = proveedor.telefono;
      document.getElementById('estado').value = proveedor.estado_proveedor;
      document.getElementById('observacion').value = proveedor.observacion;
      document.getElementById('nombre_contacto').value = proveedor.contactoProov;

    });

}


const actualizar = async () => {
  //capturar valores    
  let _nombre = document.getElementById('nombre').value
  let _cedula = document.getElementById('cedula').value
  let _correo = document.getElementById('correo').value
  let _direccion = document.getElementById('direccion').value
  let _telefono = document.getElementById('telefono').value
  let _observacion = document.getElementById('observacion').value
  let _estado = document.getElementById('estado').value
  let _nombreContacto = document.getElementById('nombre_contacto').value

  const validateNombreResult = validateNombre();
  const validateCorreoResult = validateCorreo();
  const validateDireccionResult = validateDireccion();
  const validateTelefonoResult = validateTelefono();
  const validateEstadoResult = validateEstado();
  const validateContactoResult = validateContacto();



  if (validateContactoResult && validateNombreResult && validateCorreoResult && validateDireccionResult && validateTelefonoResult && validateEstadoResult) {
    let proveedor = {
      nit_cedula: _cedula,
      nombre_proveedor: _nombre,
      correo: _correo,
      direccion: _direccion,
      telefono: _telefono,
      observacion: _observacion,
      estado_proveedor: _estado,
      contactoProov:_nombreContacto
    };
    console.log(proveedor)
    fetch(url + `?id=${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(proveedor),
      headers: { "content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(JSON => {
        Swal.fire(
          JSON.msg,
          'Seras redireccionado a los proveedores en 5 segundos',
          'success'
        ).then(() => {
          setTimeout(() => {
            window.location.href = "/proveedores";
          }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
        });
      });
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
          window.location.href = "/proveedores";
        }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
      });


  }
}

document.addEventListener("DOMContentLoaded", function () {
  var url = window.location.href
  if (url.includes("/editarProveedores")) {
    var queryString = url.split('?')[1]
    var params = new URLSearchParams(queryString)
    var proveedor = params.get('proveedor')
    consultarProveedor(proveedor)
  }
})























const registrar = async () => {
  //capturar valores    
  let _cedula = document.getElementById('cedula').value
  let _nombre = document.getElementById('nombre').value
  let _correo = document.getElementById('correo').value
  let _direccion = document.getElementById('direccion').value
  let _telefono = document.getElementById('telefono').value
  let _observacion = document.getElementById('observacion').value
  let _nombreContacto = document.getElementById('nombre_contacto').value

  const validateCedulaResult = validateCedula();
  const validateNombreResult = validateNombre();
  const validateCorreoResult = validateCorreo();
  const validateDireccionResult = validateDireccion();
  const validateTelefonoResult = validateTelefono();
  const validateContactoResult = validateContacto();

  console.log(validateContactoResult)



  if (validateNombreResult && validateCedulaResult && validateCorreoResult && validateDireccionResult && validateTelefonoResult && validateContactoResult) {
    console.log(_nombreContacto)
    let objeto = {
      nit_cedula: _cedula,
      nombre_proveedor: _nombre,
      correo: _correo,
      direccion: _direccion,
      telefono: _telefono,
      observacion: _observacion,
      contactoProov: _nombreContacto
    };
    console.log(objeto)

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(objeto),
      headers: { "content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(JSON => {
        JSON.msg = "Proveedor creado con éxito";
        Swal.fire(
          JSON.msg,
          'Seras redireccionado a los proveedores en 5 segundos',
          'success'
        )
        .then(() => {
          setTimeout(() => {
            window.location.href = "/proveedores";
          }, 5000); // Redirige después de 5 segundos (5000 milisegundos)
        });
      });
  }
}

const validateContacto = () => {
  let nombre = document.getElementById('nombre_contacto').value;
  let texto;
  let expresion = /[a-zA-Z]/;

  if (nombre === null || nombre === '' || nombre.length === 0) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del contacto no puede estar vacio</span>';
    document.getElementById('texto8').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (nombre.length < 3) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe tener mas de dos caracteres</span>';
    document.getElementById('texto8').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (!expresion.test(nombre)) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre solo puede contener letras</span>';
    document.getElementById('texto8').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else {

    document.getElementById('texto8').innerHTML = '';
    return true;
  }

}

const validateNombre = () => {
  let nombre = document.getElementById('nombre').value;
  let texto;
  let expresion = /[a-zA-Z]/;

  if (nombre === null || nombre === '' || nombre.length === 0) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre no puede estar vacio</span>';
    document.getElementById('texto1').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (nombre.length < 3) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe tener mas de dos caracteres</span>';
    document.getElementById('texto1').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (!expresion.test(nombre)) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El nombre solo puede contener letras</span>';
    document.getElementById('texto1').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else {

    document.getElementById('texto1').innerHTML = '';
    return true;
  }
};

const validateCorreo = () => {
  let correo = document.getElementById('correo').value.trim();
  let texto;
  let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correo) {

    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El correo no puede estar vacio</span>';
    document.getElementById('texto3').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (!expresion.test(correo)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de correo debe ser válida</span>';
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

const validateDireccion = () => {
  let direccion = document.getElementById('direccion').value.trim();
  let texto;
  let expresion = /^[a-zA-Z0-9\s'#,-]*$/;

  if (!direccion) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La dirección no puede estar vacia</span>';
    document.getElementById('texto4').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (direccion.length < 5) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La dirección debe tener mas de 4 caracteres</span>';
    document.getElementById('texto4').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;


  } else if (!expresion.test(direccion)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección válida.</span>';
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

const validateTelefono = () => {
  let telefono = document.getElementById('telefono').value.trim();
  let texto;
  let expresion = /^[0-9()]+$/;

  if (!telefono) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El telefono no puede estar vacio</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;

  } else if (telefono.length < 6) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El numero debe tener mas de 5 digitos</span>';
    document.getElementById('texto5').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;

  } else if (!expresion.test(telefono)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten números</span>';
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

const validateEstado = () => {
  let estado = document.getElementById('estado').value;
  let texto

  if (estado === null || estado === '' || estado.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Seleccione un estado</span>';
    document.getElementById('texto6').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false
  } else {
    document.getElementById('texto6').innerHTML = '';
    return true;
  }


}


const validateCedula = () => {
  let cedula = document.getElementById('cedula').value;
  let texto;
  let expresion = /[0-9]/;

  if (cedula === null || cedula === '' || cedula.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cédula no puede estar vacia</span>';
    document.getElementById('texto2').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;

  } else if (!expresion.test(cedula)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto2').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;

  } else if (cedula.length < 3) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 3 caracteres</span>';
    document.getElementById('texto2').innerHTML = texto;
    Swal.fire(
      'Hay errores en algunos datos, reviselos nuevamente',
      '',
      'error'
    )
    return false;

  } else if (cedula.length > 10) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
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



