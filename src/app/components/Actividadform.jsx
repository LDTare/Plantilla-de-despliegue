"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectDepartamento from "./Selectdepartamento";

function Actividadform() {
  const [actividad, setActividad] = useState({
    Nombre: "",
    Descripcion: "",
    departamento_id: "",
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch("/api/actividad/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setActividad({
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            departamento_id: data.departamento_id,
          });
        });
    }
  }, []);

  const frmPrevent = (e) => {
    e.preventDefault();
  }

  const Handledchance = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };
  function handleUpload() {
    if (!file) {
      setMsg("imagen no seleccionada");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);

    setMsg("Subiendo");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: ProgressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Imagen cargada exitosamente");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("Error cargar imagen");
        console.error(err);
      });
  }

  const Handledonsubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch("/api/actividad", {
        method: "POST",
        body: JSON.stringify(actividad, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = await fetch("/api/actividad/" + params.id, {
        method: "PUT",
        body: JSON.stringify(actividad),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    router.refresh();
    router.push("/actividad/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form
          className="px-5 py-5"
          onSubmit={frmPrevent}
        >
          <label className="font-semibold text-sm pb-1 block" htmlFor="Nombre">
            Nombre
          </label>

          <input
            name="Nombre"
            type="text"
            value={actividad.Nombre}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />
          <label className="font-semibold text-sm pb-1 block" 
          htmlFor="Descripción">Descripción </label>

          <input
            name="Descripcion"
            type="text"
            value={actividad.Descripcion}
            onChange={Handledchance}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
            required
          />

          <label className="font-semibold text-sm pb-1 block" style={{ color: "white" }}>
            Departamento
          </label>
          <SelectDepartamento handleChange={Handledchance} />
          <div>
          </div>

          <button onClick={Handledonsubmit} className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
            {params.id
              ? "Actualizar la actividad"
              : "Crear una nueva actividad"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
        py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/actividad/dashboard");
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Actividadform;
