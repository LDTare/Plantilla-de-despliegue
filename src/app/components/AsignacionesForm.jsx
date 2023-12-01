"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SelectPaso from "./SelectPasos";
import SelectUsuario from "./SelectUsuario";
import SelectTramite from "./SelectTramite";

function AsignacionForm() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();

  const [error, setError] = useState(null);
  const [remitente, SetRemitente] = useState({
    Usuario_id: "",
  });

  useEffect(() => {
    SetRemitente({
      ...remitente,
      Usuario_id: session?.user?.id,
    });
  }, []);

  const [asignacion, setAsignacion] = useState({
    Estado: 1,
    paso_id: "",
    Correlativo: "",
    Destinatarios: "",
    Remitente_id: "",
    Estado: true,
  });

  const HandleChange = (e) => {
    setAsignacion({
      ...asignacion,
      [e.target.name]: e.target.value,
    });
  };

  const frmPrevent = (e) => {
    e.preventDefault();
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    SetRemitente({
      ...remitente,
      Usuario_id: session?.user?.id,
    });

    if (!params.id) {
      console.log(remitente);
      const resRemitente = await fetch("/api/remitentes", {
        method: "POST",
        body: JSON.stringify(remitente),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resRemitente.ok) {
        setAsignacion({
          ...asignacion,
          Remitente_id: remitente,
        });
        const resAsignacion = await fetch("/api/asignaciones", {
          method: "POST",
          body: JSON.stringify(asignacion),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (resAsignacion.ok) {
          router.refresh();
          router.push("/asignaciones/dashboard");
        } else {
          const serverResponse = await resAsignacion.json();
          setError(serverResponse);
        }
      } else {
        const serverResponse = await resRemitente.json();
        setError(serverResponse);
      }
    }
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error?.message}
          </p>
        )}
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          {/* Campo para  Mostrar el usuario que registra*/}
          <div className="rounded bg-gray-500 px-5 py-2 my-5">
            <label
              htmlFor="Correlativo"
              className="block text-sm font-medium text-white"
            >
              Usuario a realizar asignación
            </label>
            <label
              name="Remitente_id"
              className="invisible"
              value={session?.user?.id}
              readOnly
            />
            <label htmlFor="Nombre">
              {session?.user?.nombre + " " + session?.user?.apellido}
            </label>
          </div>

          {/* Campo para la selección de usuario a asignar */}
          <label className="font-semibold text-sm pb-1 block" htmlFor="Usuario">
            Seleccione el usuario a asignarle un tramite
          </label>
          <SelectUsuario handleChange={HandleChange}></SelectUsuario>

          {/* Campo para  la seleccion del paso a asignar*/}
          <label className="font-semibold text-sm pb-1 block" htmlFor="tramite">
            {" "}
            Seleccione el paso a asignar
          </label>
          <SelectPaso handleChange={HandleChange}></SelectPaso>

          {/* Campo para la selección del tramite a asignar*/}
          <label className="font-semibold text-sm pb-1 block" htmlFor="Tipo_ID">
            Seleccione el trámite para asignar
          </label>
          <SelectTramite handleChange={HandleChange}></SelectTramite>

          {/* Botones de actividades del formualrio */}
          <div className="flex space-x-2">
            {/* Boton de creacion de paso */}
            <button
              onClick={HandleOnSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold
        py-2 px-4 rounded focus:outline-none shadow-lg mt-6"
            >
              {params.id ? "Actualizar" : "Realizar nueva asignación"}
            </button>

            <button
              className="bg-rose-500 hover:bg-rose-700 text-white font-bold
        py-2 px-4 rounded focus:outline-none shadow-lg mt-6"
              onClick={() => {
                router.push("/asignaciones/dashboard");
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
export default AsignacionForm;
