"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TramiteForm() {
  const [tramite, setTramite] = useState({
    correlativo: "",
    fecha_inicio: "",
    fecha_fin:"",
    id_estado:"",
    tt_id:"",
    sol_id:"",
    cient_id:"",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
        fetch("/api/tramite/" + params.id)
        .then((res) => res.json())
        .then(data =>{
            setRol({
                correlativo: data.correlativo,
                fecha_inicio: data.fecha_inicio,
                fecha_fin: data.fecha_fin,
                id_estado: data.id_estado,
                tt_id: data.tt_id,
                sol_id: data.sol_id,
                client_id: data.client_id,
            });
        });
    }
  }, []);

  const HandleChange = (e) => {
    setTramite({
      ...tramite,
      [e.target.name]: e.target.value,
    });
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      const res = await fetch("/api/tramite", {
        method: "POST",
        body: JSON.stringify(tramite),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    }
    else{
        const res = await fetch("/api/tramite/" + params.id,{
            method: "PUT",
            body: JSON.stringify(tramite),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
    }
    router.refresh();
    router.push("/tramite/dashboard");
  };

  return (
    <form className="bg-slate-800 p-10 w-1/4" onSubmit={HandleOnSubmit}>
      <label className=" font-bold text-sm">
        Numero correlativo
      </label>
      <input
        type="text"
        id="correlativo"
        name="correlativo"
        className="border border-gray-400 p-2 mb-4 w-full text-black"
        placeholder="Numero de correlativo"
        onChange={HandleChange}
        value={tramite.correlativo}
        required
      />
      {/* Boton de creación de tramite */}
      <button className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
        {params.id ? "Actualizar tramite" : "Crear nuevo tramite"}
      </button>
    </form>
  );
}
export default TramiteForm;
