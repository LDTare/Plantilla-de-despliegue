"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SelectEstadoSolicitud from "./SelectEstadoSolicitud";

function ProductForm() {
  const [solicitud, setSolicitud] = useState({
    Motivo: "",
    Fecha: "",
    tipotra_id: "",
    cliente_dpi: "",
    estadosolicitud_id: "",
    comentario: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      //llamar a la API para cargar la solicitud
      fetch("/api/solicitud/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setSolicitud({
            Motivo: data.Motivo,
            Fecha: data.Fecha,
            tipotra_id: data.tipotra_id,
            cliente_dpi: data.cliente_dpi,
            estadosolicitud_id: data.estadosolicitud_id,
            comentario: data.comentario,
          });
        });
    }
  }, []);

  const HandleChange = (e) => {
    setSolicitud({
      ...solicitud,
      estadosolicitud_id: e.target.value,
    });
  };

  const frmPrevent = (e) => {
    e.preventDefault();
  }

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(params);
    console.log(solicitud);
    if (params.id) {
        const res = await fetch("/api/solicitud/" + params.id, {
            method: "PUT",
            body: JSON.stringify(solicitud),
            headers: {
                "Content-Type": "application/json",
            },
        });

      const solicitudData = await res.json();
        if (solicitudData) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
        
            const solicitudId = solicitudData.id;
            const numeroTramite = solicitudId;
        
            const correlativo = `${numeroTramite}-${currentYear}`;
            const tramite = {
              correlativo: correlativo.toString(),
              id_estado: 1,
              sol_id: solicitudData.id,
              tt_id: solicitud.tipotra_id, 
              client_id: solicitudData.cliente_dpi,
            };

            const tramiteResponse = await fetch("/api/tramite", {
              method: "POST",
              body: JSON.stringify(tramite),
              headers: {
                "Content-Type": "application/json",
              }
            });
        
            if (tramiteResponse.status === 200) {
              const tramiteData = await tramiteResponse.json();
              const tramiteID = tramiteData.id;
        
              console.log("Tramite creado: ", tramiteData);
            } else {
              console.log('Error al crear el trámite');
            }
          }
    }

    router.refresh();
    router.push("/solicitudes/dashboard");
  };

  return (
    <form className="bg-indigo-700 p-10 w-1/4" onSubmit={frmPrevent}>
      {/* Campo para información  */}
      <div className="bg-blue-500 text-white rounded-lg p-2 mt-4">
        <p className="font-bold text-sm">Estado Actual de la solicitud: </p>
        <p className="font-bold text-sm">{solicitud.estadosolicitud_id}</p>
        <p className="font-bold text-sm">{solicitud.comentario}</p>
      </div>
      <br></br>
      {/* Seleccion de rol */}
      <label className="font-bold text-sm">Seleccion de Estado</label>
      <SelectEstadoSolicitud handleChange={HandleChange} />



      {/* Boton de creación de Usuario */}
      <button
      onClick={HandleOnSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold
        py-2 px-4 rounded focus:outline-none shadow-lg mt-6"
      >
        {params.id ? "Actualizar" : "Crear"}
      </button>
      <button
        className="bg-rose-500 hover:bg-rose-700 text-white font-bold
        py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
        onClick={() => {
          router.push("/solicitudes/dashboard");
        }}
      >
        Cancelar
      </button>
    </form>
  );
}
export default ProductForm;
