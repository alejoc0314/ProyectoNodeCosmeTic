const validateForm = () => {
    const validatecategoriaResult = validatecategoria();
    
    console.log("validate categoria ", validatecategoriaResult);
  
    if (validatecategoriaResult) {
      window.location.href = "/categorias";
    }
  };
  
  const validatecategoria = () => {
    let categoria = document.getElementById('nombrecat').value;
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (categoria === null || categoria === '' || categoria.length === 0) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la categoría</span>';
      document.getElementById('texton').innerHTML = texto;
      return false;
    } else if (categoria.length < 3) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Tiene que ser mayor o igual a 3 caracteres</span>';
      document.getElementById('texton').innerHTML = texto;
      return false;
    } else if (!expresion.test(categoria)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (letras)</span>';
      document.getElementById('texton').innerHTML = texto;
      return false;
    } else {
      document.getElementById('texton').innerHTML = '';
      return true;
    }
  };
  
  
  
  function showRegistrar() {
    Swal.fire({
      title: 'La categoría se ha registrado con éxito',
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
  
  
  
    function showConfirmationDialog() {
      Swal.fire({
        title: '¿Estás seguro de cambiar el estado?',
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
    
  
  
    function showActualizar() {
      Swal.fire({
        title: 'La categoría se ha registrado con éxito',
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
    
  
  