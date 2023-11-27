"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AreaForm() {
  const [area, setArea] = useState({
    nombre: "",
    descripcion: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/area/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setArea({
            nombre: data.nombre,
            descripcion: data.descripcion,
          });
        });
    }
  }, []);

  const HandleChange = (e) => {
    setArea({
      ...area,
      [e.target.name]: e.target.value,
    });
  };

  const frmPrevent = async (e) => {
    e.preventDefault();
  };
  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/area", {
        method: "POST",
        body: JSON.stringify(area),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch("/api/area/" + params.id, {
        method: "PUT",
        body: JSON.stringify(area),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    }

    router.refresh();
    router.push("/areas/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          <label className="font-semibold text-sm pb-1 block">
            Nombre del puesto
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            placeholder="Nombre del puesto"
            onChange={HandleChange}
            value={area.nombre}
            required
          />
          <label className="font-semibold text-sm pb-1 block">
            Descripción
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            rows="3"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            onChange={HandleChange}
            value={area.descripcion}
          ></textarea>

          {/* Boton de creación de Area */}
          <button
            onClick={HandleOnSubmit}
            className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
          >
            {params.id ? "Actualizar puesto" : "Crear nuevo puesto"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
            py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/areas/dashboard");
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
export default AreaForm;
