"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectDepartamento from "./Selectdepartamento";
import SelectActividad from "./SelectActividad";
import SelectTipoTra from "./SelectTipoTramite";

function PasosForm() {
  const router = useRouter();
  const params = useParams();

  const [pasos, setPasos] = useState({
    Nombre: "",
    Descripcion: "",
    actividad_id: "",
    departamento_id: "",
    tipotra_id: "",
    secuencia: "",
  });

  //Obtener datos de la backend
  useEffect(() => {
    if (params.id) {
      fetch("/api/pasos/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setPasos({
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            departamento_id: data.departamento_id,
            actividad_id: data.actividad_id,
            tipotra_id: data.tipotra_id,
            secuencia: data.secuencia,
          });
        });
    }
  }, []);

  const HandleChange = (e) => {
    setPasos({
      ...pasos,
      [e.target.name]: e.target.value,
    });
    console.log(pasos);
  };

  const frmPrevent = (e) => {
    e.preventDefault();
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/pasos", {
        method: "POST",
        body: JSON.stringify(pasos),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    }
    router.refresh();
    router.push("/pasos/dashboard");
  };
  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          {/* Campo para el nombre del paso */}
          <label className="font-semibold text-sm pb-1 block">Nombre del paso</label>
          <input
            type="text"
            name="Nombre"
            value={pasos.Nombre}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            placeholder="Nombre del paso"
            onChange={HandleChange}
            required
          />

          {/* Campo para la descripción del paso */}
          <label className="font-semibold text-sm pb-1 block">Descripción del paso</label>
          <textarea
            name="Descripcion"
            value={pasos.Descripcion}
            onChange={HandleChange}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            placeholder="Descripción del paso de trabajo"
          ></textarea>

          {/* Campo para el ingreso de la secuencia */}
          <label className="font-semibold text-sm pb-1 block" htmlFor="secuencia"> Secuencia</label>
          <input
            type="number"
            name="secuencia"
            value={pasos.secuencia}
            onChange={HandleChange}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            placeholder="0"
          />

          {/* Campo para la seleccion de la actividad del paso */}
          <label className="font-semibold text-sm pb-1 block">
            {" "}
            Seleccionar la actividad a asignar
          </label>
          <SelectActividad handleChange={HandleChange}></SelectActividad>

          {/* Campo para la selección de departamento */}
          <label className="font-semibold text-sm pb-1 block">
            {" "}
            Seleccionar el departamento a asignar
          </label>
          <SelectDepartamento handleChange={HandleChange}></SelectDepartamento>

          {/* Campo para la selección de tipo tramite */}
          <SelectTipoTra handleChange={HandleChange}></SelectTipoTra>
          <div className="flex space-x-2">
            {/* Boton de creacion de paso */}
            <button
            onClick={HandleOnSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold
              py-2 px-4 rounded focus:outline-none shadow-lg mt-6">
              {params.id ? "Actualizar" : "Crear nuevo paso"}
            </button>

            <button
              className="bg-rose-500 hover:bg-rose-700 text-white font-bold
              py-2 px-4 rounded focus:outline-none shadow-lg mt-6"
              onClick={() => {
                router.push("/pasos/dashboard");
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PasosForm;
