"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TarasignacionesForm() {
  const [tarasignaciones, setTarasignaciones] = useState({
    Correlativo: "",
    Fecha: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/tarasignaciones/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setTarasignaciones({
            Correlativo: data.Correlativo,
            Fecha: data.Fecha,
          });
        });
    }
  }, []);

  const HandleChange = (e) => {
    setTarasignaciones({
      ...tarasignaciones,
      [e.target.name]: e.target.value,
    });
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (!params.id) {
      const res = await fetch("/api/tarasignaciones", {
        method: "POST",
        body: JSON.stringify(tarasignaciones),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    }
    else{
        const res = await fetch("/api/tarasignaciones/" + params.id, {
            method: "PUT",
            body: JSON.stringify(tarasignaciones),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log(data);
    }

    router.refresh();
    router.push("/tarasignaciones/dashboard");
  };

  return (
    <form className="bg-slate-800 p-10 w-1/4" onSubmit={HandleOnSubmit}>
      <label className=" font-bold text-sm">Correlativo</label>
      <input
        type="text"
        id="Correlativo"
        name="nombre"
        className=" border border-gray-400 p-2 mb-4 w-full text-black"
        placeholder="Correlativo"
        onChange={HandleChange}
        value={tarasignaciones.Correlativo}
        required
      />
      <label className=" font-bold text-sm">Fecha</label>
      <textarea
        name="Fecha"
        id="Fecha"
        rows="3"
        className=" border border-gray-400 p-2 mb-4 w-full text-black"
        onChange={HandleChange}
        value={tarasignaciones.Fecha}
      ></textarea>

      {/* Boton de creación de Area */}
      <button className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
        {params.id ? "Actualizar asignacion" : "Crear nueva asignacion"}
      </button>
    </form>
  );
}
export default TarasignacionesForm;
