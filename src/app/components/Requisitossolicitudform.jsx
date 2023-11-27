"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectTipoTra from "./SelectTipoTramite";

function Requisitossolicitudform() {
  const [requisitossolicitud, setRequisitossolicitud] = useState({
    tipotra_id: "",
    requisito_id: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/requisitosolicitud/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setRequisitossolicitud({
            tipotra_id: data.tipotra_id,
            requisito_id: data.requisito_id,
          });
        });
    }
  }, []);

  const Handledchance = (e) => {
    setRequisitossolicitud({
      ...requisitossolicitud,
      [e.target.name]: e.target.value,
    });
  };

  const frmPrevent = (e) => {
    e.preventDefault();
  };

  const Handledonsubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/requisitosolicitud", {
        method: "POST",
        body: JSON.stringify(requisitossolicitud, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = await fetch("/api/requisitosolicitud/" + params.id, {
        method: "PUT",
        body: JSON.stringify(requisitossolicitud),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    router.refresh();
    router.push("/requisitossolicitud/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          <label htmlFor="">Tipo de trámite </label>
          <SelectTipoTra handleChange={Handledchance} />

          <label className="font-semibold text-sm pb-1 block" htmlFor="">
            Requisito{" "}
          </label>
          <input
            name="requisito_id"
            type="text"
            value={requisitossolicitud.requisito_id}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />
          <button
            onClick={Handledonsubmit}
            className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
          >
            {params.id ? "Actualizar requisitos" : "Registrar requisitos"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
            py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/requisitossolicitud/dashboard");
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
export default Requisitossolicitudform;
