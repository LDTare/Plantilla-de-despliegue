"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Departamentoform() {
  const [departamento, setDepartamento] = useState({
    Nombre: "",
    Descripcion: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/departamento/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setDepartamento({
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
          });
        });
    }
  }, []);

  const Handledchance = (e) => {
    setDepartamento({
      ...departamento,
      [e.target.name]: e.target.value,
    });
  };

  const Handledonsubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/departamento", {
        method: "POST",
        body: JSON.stringify(departamento, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = await fetch("/api/departamento/" + params.id, {
        method: "PUT",
        body: JSON.stringify(departamento),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    router.refresh();
    router.push("/departamento/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={Handledonsubmit}>
          <label className="font-semibold text-sm pb-1 block" htmlFor="">
            Nombre{" "}
          </label>
          <input
            name="Nombre"
            type="text"
            value={departamento.Nombre}
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
            value={departamento.Descripcion}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <button className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
            {params.id
              ? "Actualizar el departamento"
              : "Crear departamento"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
            py-2 px-4 mx-2 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/departamento/dashboard");
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
export default Departamentoform;
