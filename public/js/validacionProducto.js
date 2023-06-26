const validateForm = (isNew) => {
  const validateNombreResult = validateNombre();
  const validateStockMaximoResult = validateStockMaximo();
  const validateStockMinimoResult = validateStockMinimo();
  const validatePrecioCostoResult = validatePrecioCosto();
  const validatePrecioVentaResult = validatePrecioVenta();
  const validateCantidadResult = validateCantidad();
  const validateCategoriaResult = validateCategoria();
  const validateEstadoResult = validateEstado();



  if (
    validateNombreResult &&
    validateStockMaximoResult &&
    validateStockMinimoResult &&
    validatePrecioCostoResult &&
    validatePrecioVentaResult &&
    validateCantidadResult &&
    validateCategoriaResult &&
    validateEstadoResult
  ) {
    if (isNew) {
      registrarProducto();

    } else {
      actualizar();
    }
  }
}

const validateNombre = () => {
  let nombre = document.getElementById('nombre').value;
  let texto;
  let expresion = /^[a-zA-Z\s]+$/;

  if (nombre === null || nombre === '' || nombre.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su nombre</span>';
    document.getElementById('texto').innerHTML = texto;
    return false;
  } else if (nombre.length < 2) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Tiene que ser mayor o igual a 3 caracteres</span>';
    document.getElementById('texto').innerHTML = texto;
    return false;
  } else if (!expresion.test(nombre)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (Letras)</span>';
    document.getElementById('texto').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto').innerHTML = '';
    return true;
  }
};

const validatePrecioVenta = () => {
  let precioVenta = document.getElementById('precioVenta').value.trim();
  let texto;
  let expresion = /^\d*\.?\d+$/;

  if (precioVenta === null || precioVenta === '') {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px; border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto5').innerHTML = texto;
    return false;
  } else if (!expresion.test(precioVenta)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px; border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto5').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto5').innerHTML = '';
    return true;
  }
};

const validatePrecioCosto = () => {
  let precioCosto = document.getElementById('precioCosto').value.trim();
  let texto;
  let expresion = /^\d*\.?\d+$/;

  if (precioCosto === null || precioCosto === '') {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px; border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto4').innerHTML = texto;
    return false;
  } else if (!expresion.test(precioCosto)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px; border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto4').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto4').innerHTML = '';
    return true;
  }
};




const validateStockMinimo = () => {
  let stockMinimo = document.getElementById('stockMinimo').value;
  let texto;
  let expresion = /^[0-9]+(\.[0-9]1,2)?$/;

  if (stockMinimo === null || stockMinimo === '' || stockMinimo.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto3').innerHTML = texto;
    return false;
  } else if (!expresion.test(stockMinimo)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto3').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto3').innerHTML = '';
    return true;
  }
};

const validateStockMaximo = () => {
  let stockMaximo = document.getElementById('stockMaximo').value;
  let texto;
  let expresion = /^[0-9]+(\.[0-9]1,2)?$/;

  if (stockMaximo === null || stockMaximo === '' || stockMaximo.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto2').innerHTML = texto;
    return false;
  } else if (!expresion.test(stockMaximo)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto2').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto2').innerHTML = '';
    return true;
  }
};

const validateCantidad = () => {
  let cantidad = document.getElementById('cantidad').value;
  let texto;
  let expresion = /^[0-9]+(\.[0-9]1,2)?$/;

  if (cantidad === null || cantidad === '' || cantidad.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px; border-radius: 3px;">Ingrese un valor</span>';
    document.getElementById('texto6').innerHTML = texto;
    return false;
  } else if (!expresion.test(cantidad)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px; border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto6').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto6').innerHTML = '';
    return true;
  }
};



const validateCategoria = () => {
  let categoriaProductos = document.getElementById('categoriaProductos').value;
  let texto;

  if (categoriaProductos === null || categoriaProductos === '' || categoriaProductos.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Seleccione un valor</span>';
    document.getElementById('texto7').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto7').innerHTML = '';
    return true;
  }
};

const validateEstado = () => {
  let estado = document.getElementById('estado').value;
  let texto;

  if (estado === null || estado === '' || estado.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Seleccione un valor</span>';
    document.getElementById('texto8').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto8').innerHTML = '';
    return true;
  }
};

exports.validateForm = validateForm;



