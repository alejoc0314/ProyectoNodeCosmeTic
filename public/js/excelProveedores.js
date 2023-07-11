const descargarExcelProveedores = async () => {
    const url = "https://apibackproy.onrender.com/proveedores";
  
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  
      if (response.ok) {
        const data = await response.json();
        const proveedores = data.proveedores;
  
        // Eliminar los campos no necesarios
        const proveedoresSinInformacion = proveedores.map(proveedor => {
          const { _id, __v, ...proveedoresSinInformacion } = proveedor;
          return proveedoresSinInformacion;
        });
  
        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();
  
        // Crear una nueva hoja de Excel
        const worksheet = XLSX.utils.json_to_sheet(proveedoresSinInformacion);
  
        // Agregar el encabezado "Clientes"
        const encabezado = [["Proveedores"]];
        XLSX.utils.sheet_add_aoa(worksheet, encabezado, { origin: "A1" });
  
        // Agregar la hoja al libro de Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, "Proveedores");
  
        // Generar el archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
        // Descargar el archivo Excel
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "proveedores.xlsx";
        link.click();
        URL.revokeObjectURL(url);
  
        console.log('Archivo Excel de Proveedores generado y descargado exitosamente');
      } else {
        console.error("Error al obtener la lista de Proveedores:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  
  // Agregar el evento de clic al botón de generación de Excel de clientes
  if (document.querySelector("#btnGenerarEXCEL")) {
    document.querySelector("#btnGenerarEXCEL").addEventListener("click", descargarExcelProveedores);
  }