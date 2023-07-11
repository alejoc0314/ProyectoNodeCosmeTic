const descargarExcelPagos = async () => {
    const url = "https://apibackproy.onrender.com/pagos";
  
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  
      if (response.ok) {
        const data = await response.json();
        const pagos = data.pagos;
  
        // Eliminar los campos no necesarios
        const pagosSinInformacion = pagos.map(pago => {
          const { _id, __v, ...pagosSinInformacion } = pago;
          return pagosSinInformacion;
        });
  
        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();
  
        // Crear una nueva hoja de Excel
        const worksheet = XLSX.utils.json_to_sheet(pagosSinInformacion);
  
        // Agregar el encabezado "Clientes"
        const encabezado = [["Pagos"]];
        XLSX.utils.sheet_add_aoa(worksheet, encabezado, { origin: "A1" });
  
        // Agregar la hoja al libro de Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pagos");
  
        // Generar el archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
        // Descargar el archivo Excel
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "pagos.xlsx";
        link.click();
        URL.revokeObjectURL(url);
  
        console.log('Archivo Excel de Pagos generado y descargado exitosamente');
      } else {
        console.error("Error al obtener la lista de Pagos:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  
  // Agregar el evento de clic al botón de generación de Excel de clientes
  if (document.querySelector("#btnGenerarEXCEL")) {
    document.querySelector("#btnGenerarEXCEL").addEventListener("click", descargarExcelPagos);
  }