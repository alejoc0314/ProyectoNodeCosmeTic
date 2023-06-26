const descargarExcelComisiones = async () => {
    const url = "https://apibackproy.onrender.com/comisiones";
  
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  
      if (response.ok) {
        const data = await response.json();
        const comisiones = data.comisiones;
  

        const comisionesSinInformacion = comisiones.map(comison => {
          const { _id, __v, ...comisionesSinInformacion } = comison;
          return comisionesSinInformacion;
        });
  
       
        const workbook = XLSX.utils.book_new();
  
        const worksheet = XLSX.utils.json_to_sheet(comisionesSinInformacion);
  
        const encabezado = [["Comisiones"]];
        XLSX.utils.sheet_add_aoa(worksheet, encabezado, { origin: "A1" });
  
        XLSX.utils.book_append_sheet(workbook, worksheet, "Comisiones");
  
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "comisiones.xlsx";
        link.click();
        URL.revokeObjectURL(url);
  
        console.log('Archivo Excel de comisiones generado y descargado exitosamente');
      } else {
        console.error("Error al obtener la lista de comisiones:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  
  if (document.querySelector("#btnGenerarEXCEL")) {
    document.querySelector("#btnGenerarEXCEL").addEventListener("click", descargarExcelComisiones);
  }