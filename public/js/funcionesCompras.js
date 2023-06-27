
const validatefechaCompra = () => {
    let fechaCompra = document.getElementById('fechaCompra').value;
    let texto;
    let expresion = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
    if (fechaCompra === null || fechaCompra === '' || fechaCompra.length === 0) {
     
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su fechaCompra</span>';
      document.getElementById('textoc').innerHTML = texto;
      return false;
    } else if (fechaCompra.length < 3) {
      
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Tiene que ser mayor o igual a 3 caracteres</span>';
      document.getElementById('textoc').innerHTML = texto;
      return false;
    } else if (!expresion.test(fechaCompra)) {
      
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos(DD/MES/AÑO)</span>';
      document.getElementById('textoc').innerHTML = texto;
      return false;
    } else {
      
      document.getElementById('texto').innerHTML = '';
      return true;

    }
   
  }; 

  const validateproveedor = () => {
    let proveedor = document.getElementById('proveedor').value.trim();
    let texto;
    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!proveedor) {
      
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el proveedor.</span>';
        document.getElementById('texto2').innerHTML = texto;
        return false;
    } else if (!expresion.test(proveedor)) {
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Este campo solo recibe letras.</span>';
        document.getElementById('texto2').innerHTML = texto;
        return false;
    }else {
      document.getElementById('texto2').innerHTML = '';
      return true;

    }

  
};

const validateproducto = () => {
    let producto = document.getElementById('producto').value.trim();
    let texto;
    let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
  
    if (!producto) {
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, el nombre del producto</span>';
        document.getElementById('texto3').innerHTML = texto;
        return false;
    } else if (producto.length < 5) {
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">el producto debe tener al menos 5 caracteres.</span>';
        document.getElementById('texto3').innerHTML = texto;
        return false;
    } else if (!expresion.test(producto)) {
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Este campo solo recibe letras o numeros</span>';
        document.getElementById('texto3').innerHTML = texto;
        return false;
    }else{
      document.getElementById('texto3').innerHTML = '';
      return true;

    }
    
    
};


const validateprecioCompra = () => {
  let precioCompra = document.getElementById('precioCompra').value.trim();
  let texto;
  let expresion = /[0-9]/;

if (precioCompra === null || precioCompra === '' || precioCompra.length === 0) {
  texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el precio de compra</span>';
  document.getElementById('texto5').innerHTML = texto;
  return false;
} else if (!expresion.test(precioCompra)) {
  texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
  document.getElementById('texto5').innerHTML = texto;
  return false;   
}else{
  document.getElementById('texto5').innerHTML = '';
  return true;
}
 
 
};


const validateiva = () => {
  let iva = document.getElementById('iva').value.trim();
  let texto;
  let expresion = /[0-9]/;

if (iva === null || iva === '' || iva.length === 0) {
  texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el iva de producto</span>';
  document.getElementById('textoI').innerHTML = texto;
  return false;
} else if (!expresion.test(precioCompra)) {
  texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
  document.getElementById('textoI').innerHTML = texto;
  return false;   
}else{
  document.getElementById('textoI').innerHTML = '';
  return true;
}
 
 
};




  const validatefechaRegistro = () => {
    let fechaRegistro = document.getElementById('fechaRegistro').value;
    let texto;
    let expresion = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
    if (fechaRegistro === null || fechaRegistro === '' || fechaRegistro.length === 0) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La fecha de registro</span>';
      document.getElementById('texto').innerHTML = texto;
      return false;
    } else if (!expresion.test(fechaRegistro)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos(DD/MES/AÑO)</span>';
      document.getElementById('texto').innerHTML = texto;
      return false;
    } else if (fechaRegistro.length < 3) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos(DD/MES/AÑO)</span>';
      document.getElementById('texto').innerHTML = texto;
      return false;
    }else{
      document.getElementById('texto').innerHTML = '';
      return true;
    }
    
   
    
  };

  const validateprecioVenta = () => {
    let precioVenta = document.getElementById('precioVenta').value.trim();
    let texto;
    let expresion = /[0-9]/;
  
  if (precioVenta === null || precioVenta === '' || precioVenta.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el precio de venta</span>'+'<br>';
    document.getElementById('texto7').innerHTML = texto;
    return false;
  } else if (!expresion.test(precioVenta)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>'+'<br>';
    document.getElementById('texto7').innerHTML = texto;
    return false;   
  }else{
    document.getElementById('texto7').innerHTML = '';
    return true;
  }
   
   
  };

  const validatetotalCompra = () => {
    let totalCompra = document.getElementById('totalCompra').value.trim();
    let texto;
    let expresion = /[0-9]/;
  
  if (totalCompra === null || totalCompra === '' || totalCompra.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor de la compra</span>';
    document.getElementById('texto6').innerHTML = texto;
    return false;
  } else if (!expresion.test(totalCompra)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('texto6').innerHTML = texto;
    return false;   
  }else{
    document.getElementById('texto6').innerHTML = '';
    return true;
  }
   
   
  };
  const validatenumFactura = () => {
    let totalCompra = document.getElementById('numFactura').value.trim();
    let texto;
    let expresion = /[0-9]/;
  
  if (totalCompra === null || totalCompra === '' || totalCompra.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor de la compra</span>';
    document.getElementById('textoF').innerHTML = texto;
    return false;
  } else if (!expresion.test(totalCompra)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('textoF').innerHTML = texto;
    return false;   
  }else{
    document.getElementById('textoF').innerHTML = '';
    return true;
  }
   
   
  };


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
  
  
  
    function showAnular() {
      Swal.fire({
        title: '¿Estás seguro que desea anular esta compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        input: 'text',  // Agrega esta línea para mostrar el cuadro de texto
        inputPlaceholder: 'Ingrese una observación',  // Agrega esta línea para establecer un texto de marcador de posición para el cuadro de texto
        inputAttributes: {
          autocapitalize: 'off'  // Agrega esta línea para desactivar la autocapitalización en el cuadro de texto
        },
        showLoaderOnConfirm: true,
        preConfirm: (observacion) => {
          if (observacion) {
            // Actualizar el campo de observación con el valor ingresado
            document.getElementById('observacion').value = observacion;
            // Aquí puedes agregar el código para realizar la acción de cambiar el estado de la categoría
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          // Enfocar automáticamente el campo de observación después de confirmar
          document.getElementById('observacion').focus();
        }
      });
    }
    
