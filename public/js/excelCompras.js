// Función para descargar el archivo Excel



function showExcel() {
    Swal.fire({
      title: 'EL archivo excel se ha generado correctamente con éxito',
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





const descargarExcel = async () => {
    const url = 'http://localhost:8085/api/compra';
  
    
  
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  
      if (response.ok) {
        const data = await response.json();
        const compras = data.compras;
  
        // Eliminar los campos no necesarios
        const comprasSinInformacion = compras.map(compra => {
          const { _id, __v, ...comprasSinInformacion } = compra;
          return comprasSinInformacion;
        });
  
        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();
  
        // Crear una nueva hoja de Excel
        const worksheet = XLSX.utils.json_to_sheet(comprasSinInformacion);
  
        // Agregar el encabezado "Categorías"
       
  
        // Agregar la hoja al libro de Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, "compras");
  
        // Generar el archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
        // Descargar el archivo Excel
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "compras.xlsx";
        link.click();
        URL.revokeObjectURL(url);
  
        console.log('Archivo Excel generado y descargado exitosamente');
        showExcel()
      } else {
        console.error("Error al obtener la lista de compras:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  
  // Agregar el evento de clic al botón de generación de Excel
  if (document.querySelector("#btnGenerarExcel")) {
    document.querySelector("#btnGenerarExcel").addEventListener("click", descargarExcel);
  }
  
  