const url = "https://apifinal-5pf3.onrender.com/api/pedido";

const validateForm = () => {

  const validateCliente = () => {
    let cliente = document.getElementById('cliente').value;
    let texto;

    if (cliente === '') {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, seleccione el cliente</span><br><br>';
      document.getElementById('texto1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('texto1').innerHTML = '';
      return true;
    }
  };

  const validateVendedor = () => {
    let empleado = document.getElementById('empleado').value;
    let texto;

    if (empleado === '') {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, seleccione el vendedor</span><br><br>';
      document.getElementById('texto2').innerHTML = texto;
      return false;
    } else {
      document.getElementById('texto2').innerHTML = '';
      return true;
    }
  };

  const validateTipoPago = () => {
    let tipo_pago = document.getElementById('tipo_pago').value;
    let texto;

    if (tipo_pago === '') {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, seleccione el tipo de pago</span><br><br>';
      document.getElementById('texto4').innerHTML = texto;
      return false;
    } else {
      document.getElementById('texto4').innerHTML = '';
      return true;
    }
  };

  const validateClient = validateCliente();
  const validateSeller = validateVendedor();
  const validatePay = validateTipoPago();

  if (validateClient && validateSeller && validatePay) {
    return true;
  }
}

const calcularTotalPedido = (listaDetalleTotal) => {
  let totalPedido = 0;
  listaDetalleTotal.forEach(producto => {
    totalPedido += producto.precioTotal;
  });
  console.log(totalPedido);
  return totalPedido;
};

let listaDetalleTotal = [];

const btnAggProd = document.getElementById('aggProd');

if (btnAggProd) {
  btnAggProd.addEventListener('click', function () {
    const listaDetalleString = btnAggProd.getAttribute('data-lista-detalle');
    listaDetalleTotal = JSON.parse(listaDetalleString);
    total = calcularTotalPedido(listaDetalleTotal);
    document.getElementById('totalPedido').innerHTML = total;
  });
}



const agregarProducto = async () => {

  const validateNum = () => {
    let cantidad = document.getElementById('cantidad').value.trim();
    let texto;
    if (!cantidad) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese la cantidad de productos.</span>';
      document.getElementById('texto5').innerHTML = texto;
      return false;
    } else if (cantidad === '') {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese la cantidad de productos.</span>';
      document.getElementById('texto5').innerHTML = texto;
      return false;
    } else {
      document.getElementById('texto5').innerHTML = '';
      return true;
    }
  }

  const validTrue = validateNum();

  if (validTrue) {
    const _id = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    console.log('Producto:', _id);
    console.log('Cantidad:', cantidad);
    const data = {
      _id: _id,
      cantidad: cantidad
    };
    console.log(data);
    try {
      const response = await fetch("/registroPedidos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      window.location.reload();
      console.log('Datos enviados al servidor exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
    }
  }
}

const eliminarProducto = async (productoId) => {
  data = {
    productoId: productoId,
  }
  try {
    const response = await fetch("/eliminarProducto", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log('Producto eliminado exitosamente');
    window.location.reload();
    document.getElementById('totalPedido').innerText = calcularTotalPedido(listaDetalleTotal);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

const btnCrearPedido = document.getElementById('btnCrearPedido');

if (btnCrearPedido) {
  btnCrearPedido.addEventListener('click', function () {
    const listaDetalleString = btnCrearPedido.getAttribute('data-lista-detalle');
    const listaDetalle = JSON.parse(listaDetalleString);
    console.log(listaDetalle);
    registrarPedido(listaDetalle);
  });
}

let numeroPedido = 0;

const registrarPedido = async (listaDetalle) => {

  const validateProduct = () => {
    console.log(listaDetalle);
    if (listaDetalle.length === 0) {
      const texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">No se han agregado productos al detalle.</span><br><br>';
      document.getElementById('texto5').innerHTML = texto;
      return false;
    }

    document.getElementById('texto5').innerHTML = '';
    return true;
  };

  const validateProd = validateProduct();
  const validate = validateForm();

  if (validateProd && validate) {
    const cliente = document.getElementById('cliente').value;
    const empleado = document.getElementById('empleado').value;
    const fecha = Date.now();
    const tipo_pago = document.getElementById('tipo_pago').value;
    const totalPedido = listaDetalle.reduce((total, producto) => total + producto.precioTotal, 0);
    numeroPedido++;
    let pedido = {
      numeroPedido: numeroPedido,
      cliente: cliente,
      empleado: empleado,
      fechaPedido: fecha,
      tipoPago: tipo_pago,
      productos: listaDetalle,
      totalPedido: totalPedido,
      estadoPedido: "Por entregar",
    };
    console.log(pedido);
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(pedido),
      })

      if (response.ok) {
        Swal.fire({
          title: 'Pedido agregado exitosamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            listaDetalle = []
            window.location.href = '/pedidos';
          }
        });
      } else {
        console.error('Error al crear Pedido', response.status);
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el Pedido',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al realizar la solicitud',
        icon: 'error',
      });
    };
  };
};

const cambiarEstadoPedido = async (pedidoId) => {
  Swal.fire({
    title: 'Entregar pedido.',
    text: 'Esto enviará el pedido a la sección de Ventas. ¿Está seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      data = {
        pedidoId: pedidoId,
      };
      fetch("/cambiarEstadoPedido", {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then(json => {
          Swal.fire({
            title: 'Cambio de estado realizado con éxito',
            text: json.msg,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            };
          });
        })
        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: 'Error al cambiar estado',
            icon: 'error'
          });
          console.error('Error al cambiar estado', error);
        });
    };
  });
};

const eliminarPedido = async (_id) => {
  Swal.fire({
    title: 'Anular pedido.',
    text: '¿Está seguro de que desea anular el Pedido?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      let pedido = {
        _id: _id
      };
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(pedido),
      })
        .then((resp) => resp.json())
        .then(json => {
          Swal.fire({
            title: 'Eliminado',
            text: json.msg,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            };
          });
        })
        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: 'Error al anular Pedido',
            icon: 'error'
          });
          console.error('Error al anular Pedido', error);
        });
    };
  });
};

module.exports = {
  cambiarEstadoPedido,
  agregarProducto,
  eliminarProducto,
  registrarPedido,
  eliminarPedido
}

