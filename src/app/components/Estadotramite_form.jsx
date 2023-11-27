"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Estadotramiteform() {
  const [estadotramite, setEstadotramite] = useState({
    Nombre: "",
    Color: "",
    Descripcion: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/estadotramite/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setEstadotramite({
            Nombre: data.Nombre,
            Color: data.Nomenclatura,
            Descripcion: data.Descripcion,
          });
        });
    }
  }, []);

  const Handledchance = (e) => {
    setEstadotramite({
      ...estadotramite,
      [e.target.name]: e.target.value,
    });
  };

  const frmPrevent = (e) => {
    e.preventDefault();
  }
  const Handledonsubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/estadotramite", {
        method: "POST",
        body: JSON.stringify(estadotramite, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = await fetch("/api/estadotramite/" + params.id, {
        method: "PUT",
        body: JSON.stringify(estadotramite),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    router.refresh();
    router.push("/estadotramite/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          <label className="font-semibold text-sm pb-1 block" htmlFor="">
            Nombre{" "}
          </label>
          <input
            name="Nombre"
            type="text"
            value={estadotramite.Nombre}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <label className="font-semibold text-sm pb-1 block" htmlFor="">
            Color{" "}
          </label>
          <input
            name="Color"
            type="text"
            value={estadotramite.Color}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <label className="font-semibold text-sm pb-1 block" htmlFor="">
            Descripcion{" "}
          </label>
          <input
            name="Descripcion"
            type="text"
            value={estadotramite.Descripcion}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <button 
          onClick={Handledonsubmit}
          className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
            {params.id
              ? "Actualizar"
              : "Crear estado"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
            py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/estadotramite/dashboard");
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
export default Estadotramiteform;
