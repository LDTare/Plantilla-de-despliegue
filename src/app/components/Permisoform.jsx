"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Permisoform() {
    const [permiso, setPermiso] = useState({
        Nombre: "",
        Descripcion: "",
    });
    
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            fetch("/api/permiso/" + params.id)
            .then((res) => res.json())
            .then(data =>{
                setPermiso({
                    Nombre: data.Nombre,
                    Descripcion: data.Descripcion,
                });
            });
        }
      }, []);
    

    const Handledchance = (e) => {
      setPermiso({
          ...permiso, [e.target.name]: e.target.value
      });
  }

    const Handledonsubmit = async (e) => {
        e.preventDefault();
        if(!params.id)
        {
          const res = await fetch("/api/permiso", {
            method: "POST",
            body: JSON.stringify(permiso, (key, value) => {
              return typeof value === "bigint" ? value.toString() : value;
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

        }else{
            const res = await fetch("/api/permiso/" + params.id,{
              method: "PUT",
              body: JSON.stringify(permiso),
              headers: {
                "Content-Type": "application/json",
              },
            });

        }
        router.refresh();
        router.push("/permiso/dashboard");
    };

    
    

    return( 
        <form
        className="p-10 w-1/4 bg-slate-800"
        onSubmit={Handledonsubmit}
      >
        <label htmlFor="">Nombre </label>
        <br></br>
        <input
          name="Nombre"
          type="text"
          value={permiso.Nombre}
          onChange={Handledchance}
          className="text-black"
          required
        />
        <br />
        <label htmlFor="">Descripcion </label>
        <br></br>
        <input
          name="Descripcion"
          type="text"
          value={permiso.Descripcion}
          onChange={Handledchance}
          className="text-black"
          required
        />
        <br />
        <button className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
          {params.id ? "Actualizar permiso" : "Crear un nuevo permiso"}
        </button>
      </form>
    );


} 
export default Permisoform;

