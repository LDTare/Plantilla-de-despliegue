"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Tipotramiteform() {
  const [tipotramite, setTipotramite] = useState({
    Nombre: "",
    Nomenclatura: "",
    tiempo_promedio: "",
    Descripcion: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/tipotramite/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setTipotramite({
            Nombre: data.Nombre,
            Nomenclatura: Number(data.Nomenclatura),
            tiempo_promedio: Number(data.tiempo_promedio),
            Descripcion: data.Descripcion,
          });
        });
    }
  }, []);

  const Handledchance = (e) => {
    setTipotramite({
      ...tipotramite,
      [e.target.name]: e.target.value,
    });
  };

  const frmPrevent = (e) =>{
    e.preventDefault();
  }

  const Handledonsubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/tipotramite", {
        method: "POST",
        body: JSON.stringify(tipotramite, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = await fetch("/api/tipotramite/" + params.id, {
        method: "PUT",
        body: JSON.stringify(tipotramite),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    router.refresh();
    router.push("/tipotramite/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-lg ">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          <label className="font-semibold text-sm pb-1 block"
          htmlFor="">Nombre </label>

          <input
            name="Nombre"
            type="text"
            value={tipotramite.Nombre}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <label className="font-semibold text-sm pb-1 block"
          htmlFor="">Nomenclatura </label>

          <input
            name="Nomenclatura"
            type="text"
            value={tipotramite.Nomenclatura}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <label className="font-semibold text-sm pb-1 block"
          htmlFor="">Tiempo promedio </label>

          <input
            name="tiempo_promedio"
            type="text"
            value={tipotramite.tiempo_promedio}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <label className="font-semibold text-sm pb-1 block"
          htmlFor="">Descripcion </label>

          <textarea
            name="Descripcion"
            type="text"
            value={tipotramite.Descripcion}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <button 
          onClick={Handledonsubmit}
          className="rounded bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
            {params.id
              ? "Actualizar tipo tramite"
              : "Crear un nuevo tipo de tramite"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
            py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/tipotramite/dashboard");
            }}
          >
            Cancelar
      </button>
        </form>
      </div>
    </div>
  );
}
export default Tipotramiteform;
