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

function showMessage() {
  alert("La categoría se ha actualizado con éxito");
 
}
function showConfirmationDialog() {
  const observacion = prompt("¿Está seguro que desea cambiar el estado de esta categoría?\nIngrese una observación:");

  if (observacion !== null) {
      // Actualizar el campo de observación con el valor ingresado
      document.getElementById('observacion').value = observacion;

      // Aquí puedes agregar el código para realizar la acción de cambiar el estado de la categoría
  }
}
function showMessageRegis() {
  alert("La categoría se ha registrado con éxito");
 
}

