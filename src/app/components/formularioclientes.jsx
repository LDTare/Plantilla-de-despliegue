"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Clientform() {
    const [cliente, setCliente] = useState({
        DPI: "",  
        Nombre: "",
        Apellido: "",
        Telefono: "",
        NIM: "",
        Correo: "",
        NIT: "",
    });
    
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
      if (params.id) {
          fetch("/api/clientes/" + params.id)
          .then((res) => res.json())
          .then(data =>{
              setCliente({
                  DPI: Number(data.DPI),
                  Nombre: data.Nombre,
                  Apellido: data.Apellido,
                  Telefono: Number(data.Telefono),
                  NIM: Number(data.NIM),
                  Correo: data.Correo,
                  NIT: Number(data.NIT),
              });
          });
      }
    }, []);
    

    const Handledchance = (e) => {
      setCliente({
          ...cliente, [e.target.name]: e.target.value
      });
  }

  const frmPrevent = (e) => {
    e.preventDefault();
  }

    const Handledonsubmit = async (e) => {
        e.preventDefault();
        if(!params.id)
        {
          const res = await fetch("/api/clientes", {
            method: "POST",
            body: JSON.stringify(cliente, (key, value) => {
              return typeof value === "bigint" ? value.toString() : value;
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

        }else{
            const res = await fetch("/api/clientes/" + params.id,{
              method: "PUT",
              body: JSON.stringify(cliente),
              headers: {
                "Content-Type": "application/json",
              },
            });

        }
        router.refresh();
        router.push("/clientes/dashboard");
    };

    
    

    return( 
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form
        className="px-5 py-5 space-y-1"
        onSubmit={frmPrevent}
      >
        <label htmlFor="DPI"
        className="font-semibold text-sm pb-1 block">DPI </label>
        <input
          name="DPI"
          type="text"
          value={cliente.DPI}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />

        <label 
        className="font-semibold text-sm pb-1 block"
        htmlFor="">Nombre </label>
        <input
          name="Nombre"
          type="text"
          value={cliente.Nombre}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />
        <label 
        className="font-semibold text-sm pb-1 block"
        htmlFor="">Apellido </label>
        <input
          name="Apellido"
          type="text"
          value={cliente.Apellido}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />

        <label 
        className="font-semibold text-sm pb-1 block"
        htmlFor="">Telefono </label>
        <input
          name="Telefono"
          type="text"
          value={cliente.Telefono}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />

        <label 
        className="font-semibold text-sm pb-1 block"
        htmlFor="">NIM </label>
        <input
          name="NIM"
          type="text"
          value={cliente.NIM}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />

        <label 
        className="font-semibold text-sm pb-1 block"
        htmlFor="">Correo </label>

        <input
          name="Correo"
          type="text"
          value={cliente.Correo}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />

        <label 
        className="font-semibold text-sm pb-1 block"
        htmlFor="">NIT </label>

        <input
          name="NIT"
          type="text"
          value={cliente.NIT}
          onChange={Handledchance}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
          required
        />

        <div className="py-2">
        <button onClick={Handledonsubmit} className=" rounded bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6">
          {params.id ? "Actualizar cliente" : "Crear nuevo cliente"}
        </button>
        <button
        className="bg-rose-500 hover:bg-rose-700 text-white font-bold
        py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
        onClick={() => {
          router.push("/clientes/dashboard");
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
export default Clientform;

