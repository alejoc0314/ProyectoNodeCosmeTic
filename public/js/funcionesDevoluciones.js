const validateForm = () => {
  let fecha = document.getElementById('fecha').value;
  let detalleventa = document.getElementById('detalleventa').value;
  let cdproducto = document.getElementById('cdproducto').value;
  let candevuelta = document.getElementById('candevuelta').value;
  let mvdevolucion = document.getElementById('mvdevolucion').value;
  let devinve = document.getElementById('devinve').value;
  let texto2, texto, texto3, texto4, texto5;

  // Validar Fecha devolucion
  if (fecha === null || fecha === '' || fecha.length === 0) {
    texto2 = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La fecha de devolución no puede estar vacía</span>';
    document.getElementById('texto2').innerHTML = texto2;
    return false;
  } else {
    document.getElementById('texto2').innerHTML = '';
  }

  // Validar Detalle de venta
  if (detalleventa === null || detalleventa === '' || detalleventa.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El detalle de venta no puede estar vacío</span>';
    document.getElementById('texto').innerHTML = texto;
    return false;
  } else {
    document.getElementById('texto').innerHTML = '';
  }

  // Validar Codigo producto
  if (cdproducto === null || cdproducto === '' || cdproducto.length === 0) {
    texto3 = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El código de producto no puede estar vacío</span>';
    document.getElementById('texto3').innerHTML = texto3;
    return false;
  } else {
    document.getElementById('texto3').innerHTML = '';
  }

  // Validar Cantidad devuelta
  if (candevuelta === null || candevuelta === '' || candevuelta.length === 0) {
    texto4 = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cantidad devuelta no puede estar vacía</span>';
    document.getElementById('texto4').innerHTML = texto4;
    return false;
  } else {
    document.getElementById('texto4').innerHTML = '';
  }

  // Validar Motivo devolucion
  if (mvdevolucion === null || mvdevolucion === '' || mvdevolucion.length === 0) {
    texto5 = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El motivo de devolución no puede estar vacío</span>';
    document.getElementById('texto5').innerHTML = texto5;
    return false;
  } else {
    document.getElementById('texto5').innerHTML = '';
  }

  // Validar Devolver al inventario
  if (devinve === null || devinve === '' || devinve.length === 0) {
    texto6 = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe indicar si se debe devolver al inventario</span>';
    document.getElementById('texto6').innerHTML = texto6;
    return false;
 
  }
}

exports.validateForm = validateForm;