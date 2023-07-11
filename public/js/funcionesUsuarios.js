
const validateForm = () => {
  const validateNombreResult = validateNombre();
  const validateCorreoResult = validateCorreo();


    console.log("validate nombre " , validateNombre);

    if (validateNombreResult &&  validateCorreoResult ) {
      window.location.href = "/usuarios";
    }
  }


const validateNombre = () => {
    let nombre = document.getElementById('nombre_Usuario').value;
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (nombre === null || nombre === '' || nombre.length === 0) {
     
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su nombre</span>';
      document.getElementById('texto').innerHTML = texto;
      return false;
    } else if (nombre.length < 3) {
      
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Tiene que ser mayor o igual a 3 caracteres</span>';
      document.getElementById('texto').innerHTML = texto;
      return false;
    } else if (!expresion.test(nombre)) {
      
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos(Letras)</span>';
      document.getElementById('texto').innerHTML = texto;
      return false;
    } else {
      
      document.getElementById('texto').innerHTML = '';
      return true;

    }
   
  };

  function showConfirmationDialog() {
    Swal.fire({
      title: '¿Estás seguro de cambiar el estado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      
  
      showLoaderOnConfirm: true,
     
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
  
    });
  }

  function showRegistrar() {
  
    Swal.fire({
      title: 'El usuario se ha registrado con éxito',
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
    
        window.location.href = '/usuarios';
      }
    });
  }

  const validateCorreo = () => {
    let correo = document.getElementById('correo').value.trim();
    let texto;
    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!correo) {
      
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese su dirección de correo electrónico.</span>';
        document.getElementById('texto3').innerHTML = texto;
        return false;
    } else if (!expresion.test(correo)) {
        texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico válida.</span>';
        document.getElementById('texto3').innerHTML = texto;
        return false;
    }else {
      document.getElementById('texto3').innerHTML = '';
      return true;

    }

  
};


const validateClave = () => {
  let nombre = document.getElementById('clave').value;
  let texto;
  let expresion = /[a-zA-Z-0-9]/;

  if (nombre === null || nombre === '' || nombre.length === 0) {
   
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su clave</span>';
    document.getElementById('textooo').innerHTML = texto;
    return false;
  } else if (nombre.length < 3) {
    
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Tiene que ser mayor o igual a 3 caracteres</span>';
    document.getElementById('textooo').innerHTML = texto;
    return false;
  } else {
    
    document.getElementById('textooo').innerHTML = '';
    return true;

  }
 
}; 
function showActualizar() {
  Swal.fire({
    title: 'El usuario se ha modificado con éxito',
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
      
      window.location.href = '/usuarios';
    }
  });
}



