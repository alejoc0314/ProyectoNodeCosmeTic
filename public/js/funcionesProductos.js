// const url = 'http://localhost:8082/api/producto';

const url = 'https://api-cosmetic.onrender.com/api/producto';

let nombreCategoriaSeleccionada = "";

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
      let listaProductos = data.productos;
      datos = listaProductos.map(function (producto) {
        const row = document.createElement('tr');
        const estadoCell = document.createElement('td');
        const accionesCell = document.createElement('td');
        const accionesDiv = document.createElement('div');
        const editarIcon = document.createElement('a');
        const eliminarIcon = document.createElement('a');
        const switchLabel = document.createElement('label');
        const switchInput = document.createElement('input');
        const switchSpan = document.createElement('span');

        estadoCell.textContent = producto.estado === 'true' ? 'activo' : 'inactivo';
        switchInput.type = 'checkbox';
        switchInput.checked = producto.estado === 'true'; // Establecer el estado del checkbox en función del valor actual
        switchInput.style.display = 'none';


        switchInput.addEventListener('change', function () {
          Swal.fire({
            title: '¿Estás seguro de cambiar el estado?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              const productId = row.getAttribute('data-id');
              const newEstado = this.checked ? 'true' : 'false';

              fetch(url + '?id=' + productId, {
                method: 'PUT',
                mode: 'cors',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                  estado: newEstado
                })
              })
                .then((resp) => resp.json())
                .then(function (data) {
                  Swal.fire({
                    title: data.msg,
                    icon: 'success',
                  });
                  estadoCell.textContent = newEstado === 'true' ? 'activo' : 'inactivo';
                  producto.estado = newEstado;
                })
                .catch(function (error) {
                  Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al cambiar el estado del producto.',
                    icon: 'error',
                  });
                  console.error('Error en la solicitud:', error);
                });
            } else {
              this.checked = !this.checked;
            }
          });
        });

        editarIcon.classList.add('fa-solid', 'fa-pen-to-square'); 
        editarIcon.classList.add('btn', 'btn-primary');

        editarIcon.addEventListener('click', function () {
          editar(producto);
        });


        
        switchSpan.classList.add('fa-solid', 'fa-toggle-on');
        switchSpan.classList.add('btn', 'btn-warning');

        accionesDiv.appendChild(editarIcon);
        accionesDiv.appendChild(eliminarIcon);
        accionesDiv.appendChild(switchLabel);
        switchLabel.appendChild(switchInput);
        switchLabel.appendChild(switchSpan);
        accionesCell.appendChild(accionesDiv);

        row.setAttribute('data-id', producto._id);

        const ganancia = parseFloat(producto.precioVenta) - parseFloat(producto.precioCosto);

        row.innerHTML = `<td>${producto.categoria}</td>` +
          `<td>${producto.nombre}</td>` +
          `<td>${producto.cantidad}</td>` +
          `<td>${producto.stockMaximo}</td>` +
          `<td>${producto.stockMinimo}</td>` +
          `<td>${producto.precioCosto}</td>` +
          `<td>${producto.precioVenta}</td>` +
          `<td>${ganancia.toFixed(2)}</td>` + // Mostrar la ganancia con 2 decimales
          `<td>${producto.observacion}</td>`;

        row.appendChild(estadoCell);
        row.appendChild(accionesCell);
        body.appendChild(row);
      });
    });
};



function registrarProducto() {
 
  let categoriaSelect = document.getElementById('categoriaProductos');
  let categoriaNombre = categoriaSelect.options[categoriaSelect.selectedIndex].text;
  let nombre = document.getElementById('nombre').value;
  let cantidad = document.getElementById('cantidad').value;
  let stockMaximo = document.getElementById('stockMaximo').value;
  let stockMinimo = document.getElementById('stockMinimo').value;
  let precioCosto = document.getElementById('precioCosto').value;
  let precioVenta = document.getElementById('precioVenta').value;
  let observacion = document.getElementById('observacion').value;
  let estado = document.getElementById('estado').value;

 
  let producto = {
    categoria: categoriaNombre, 
    nombre: nombre,
    cantidad: cantidad,
    stockMaximo: stockMaximo,
    stockMinimo: stockMinimo,
    precioCosto: precioCosto,
    precioVenta: precioVenta,
    observacion: observacion,
    estado: estado
  };

  Swal.fire({
    title: '¿Estás seguro de registrar el producto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(producto),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json())
        .then(json => {
          if (json.msg) {
            Swal.fire(
              json.msg,
              '',
              'success'
            ).then(() => {
              
              window.location.href = "/productos";
            });
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al registrar el producto.',
            icon: 'error',
          });
          console.error('Error en la solicitud:', error);
        });
    }
  });
}



const editar = (producto) => {
  var url = "/editarProductos?producto=" + encodeURIComponent(producto._id);
  window.location.href = url;
};

const consultarProducto = (producto) => {
  const url2 = url + '?id=' + producto.toString();
  fetch(url2 + "", {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let producto = data.productos;
      document.getElementById('id').value = producto._id;

      let categoriaProductos = producto.categoria;
      
      
      let selectCategoria = document.getElementById('categoriaProductos');

    
      let opcionCategoria = [...selectCategoria.options].find(option => option.value === categoriaProductos);

      
      if (opcionCategoria) {
        opcionCategoria.selected = true;
      }

      console.log("producto",producto)
      document.getElementById('nombre').value = producto.nombre;
      document.getElementById('stockMaximo').value = producto.stockMaximo;
      document.getElementById('stockMinimo').value = producto.stockMinimo;
      document.getElementById('precioCosto').value = producto.precioCosto;
      document.getElementById('precioVenta').value = producto.precioVenta;
      document.getElementById('observacion').value = producto.observacion;
   
      nombreCategoriaSeleccionada = producto.categoria;
    });
};

const actualizar = async () => {
  let id = document.getElementById('id').value;
  let categoria = document.getElementById('categoriaProductos').value;
  let nombre = document.getElementById('nombre').value;
  let stockMaximo = document.getElementById('stockMaximo').value;
  let stockMinimo = document.getElementById('stockMinimo').value;
  let precioCosto = document.getElementById('precioCosto').value;
  let precioVenta = document.getElementById('precioVenta').value;
  let observacion = document.getElementById('observacion').value;

  let producto = {
    categoria: categoria,
    nombre: nombre,
    stockMaximo: stockMaximo,
    stockMinimo: stockMinimo,
    precioCosto: precioCosto,
    precioVenta: precioVenta,
    observacion: observacion
  };

  Swal.fire({
    title: '¿Estás seguro de actualizar el producto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url + `?id=${id}`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(producto),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json())
        .then(json => {
          if (json.msg) {
            Swal.fire({
              title: json.msg,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              window.location.href = "/productos";
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al actualizar el producto.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            });
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el producto.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
          console.error('Error en la solicitud:', error);
   
        });
    }
  });
};

const eliminar = (id) => {
  Swal.fire({
    title: '¿Está seguro de realizar la eliminación?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url + `?id=${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then((resp) => resp.json())
      .then(json => {
        Swal.fire(
          json.msg,
          '',
          'success'
        ).then(() => {
          location.reload();
        });
      });
    }
  });
};


const obtenerCategoriaProductos = async () => {
  try {
    // const response = await fetch("http://localhost:8082/api/categoriaProducto", {
    const response = await fetch("https://apiparamodulos.onrender.com/api/categoria", {

      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      const data = await response.json();
      const categoriaProductos = data.categoriaProductos;
      generarOpcionesCategoriaProductos(categoriaProductos); 
      return categoriaProductos;
    } else {
      console.error("Error al obtener la lista de categorías:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
};


const generarOpcionesCategoriaProductos = (categoriaProductos , producto) => {
  const selectCategoriaProducto = document.getElementById("categoriaProductos");

  if (selectCategoriaProducto) {
   
   selectCategoriaProducto.innerHTML = "";
  
   const opcionPredeterminada = document.createElement("option");
    opcionPredeterminada.value = "";
   opcionPredeterminada.disabled = true;
   opcionPredeterminada.selected = true;
    opcionPredeterminada.textContent = "Elija una categoría";


    selectCategoriaProducto.appendChild(opcionPredeterminada);


  
    categoriaProductos.forEach((categoriaProductos) => {
       const option = document.createElement("option");
      option.value = categoriaProductos.nombre;
      option.textContent = categoriaProductos.nombre;
      if (nombreCategoriaSeleccionada != null) {
        if (categoriaProductos.nombre === nombreCategoriaSeleccionada) {
          option.selected = true;
        }
      }
      selectCategoriaProducto.appendChild(option);
    });

  
  }


   };

   const buscarProducto = async () => {
    
    const buscarProducto = document.getElementById("buscarProducto").value;
  
    try {
      
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  
      if (response.ok) {
        const data = await response.json();
        const productos = data.productos;
  
        
        const categorias = await obtenerCategoriaProductos();
  
        let respuesta = "";
        const body = document.getElementById("contenido");
  
        productos.forEach((producto) => {
          let estadoProducto;
          if (producto.estado === true || producto.estado === "true") {
            estadoProducto = "activo";
          } else {
            estadoProducto = "inactivo";
          }
        
          const cantidad = parseInt(producto.cantidad); 
          const observacion = producto.observacion.toString(); 
        
          const precioCosto = parseInt(producto.precioCosto); 
     
        
        
          if (
            producto.nombre.toLowerCase().includes(buscarProducto.toLowerCase()) ||
            estadoProducto.toLowerCase() === buscarProducto.toLowerCase() ||
            producto.categoria.toLowerCase().includes(buscarProducto.toLowerCase()) ||
            cantidad.toString().toLowerCase().includes(buscarProducto.toLowerCase()) ||
            precioCosto.toString().toLowerCase().includes(buscarProducto.toLowerCase()) ||
            observacion.toLowerCase().includes(buscarProducto.toLowerCase()) ||
            producto.stockMaximo.toString().toLowerCase().includes(buscarProducto.toLowerCase()) ||
            producto.stockMinimo.toString().toLowerCase().includes(buscarProducto.toLowerCase()) ||
            producto.ganancia.toString().toLowerCase().includes(buscarProducto.toLowerCase()) ||
            producto.precioVenta.toString().toLowerCase().includes(buscarProducto.toLowerCase())
          ) {
           
          
            respuesta += `<tr> 
            <td>${producto.categoria}</td> 
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.stockMaximo}</td>
            <td>${producto.stockMinimo}</td>
            <td>${producto.precioCosto}</td>
            <td>${producto.precioVenta}</td>
            <td>${producto.ganancia}</td>            
            <td>${producto.observacion}</td>
            <td>${estadoProducto}</td>
            <td>
                <a class="fa-solid fa-pen-to-square" onclick='editar(${JSON.stringify(producto)})'></a> 
                
                <label class="switch">
                  <input type="checkbox" id="toggleSwitch">
                  <span class="slider round"></span>
                </label>
              </td>
            </tr>`;
          }
        });
        
  
        body.innerHTML = respuesta;
      } else {
        console.error("Error al obtener la lista de productos:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  

if (document.querySelector("#btnBuscarProducto")) {
  document.querySelector("#btnBuscarProducto").addEventListener("click", buscarProducto);
}


if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener('click', registrar);
}



document.addEventListener("DOMContentLoaded", function () {
  obtenerCategoriaProductos();
 
  var url = window.location.href;

  if (url.includes("/editarProductos")) {
   
    var queryString = url.split('?')[1];
    var params = new URLSearchParams(queryString);
    
    var producto = params.get('producto');
    consultarProducto(producto);
  }
});


