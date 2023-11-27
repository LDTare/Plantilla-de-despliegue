"use client";

import { useRouter } from "next/navigation"

function Buttons({solicitudID}) {
    const router = useRouter();
    
  return (
    <div className="flex gap-x-2 justify-between mt-2">
      <button 
      className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
      onClick={() => {
        router.push('/solicitudes/edit/' + solicitudID)
      }}
      >
        Editar solicitud
      </button>
      <button 
      className=" bg-rose-500 hover:bg-rose-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
      onClick={async()=> {
        if(confirm('¿Desea eliminar esta solicitud?')){
            const res = await fetch('/api/solicitud/' + solicitudID, {
                method: 'DELETE',
                headers:{
                    'Content-Type': "application/json",
                }
            });
            const data = await res.json();
            router.refresh();
            router.push('/solicitudes/dashboard')
        }
      }}
      >
        Eliminar solicitud
      </button>
    </div>
  );
}

export default Buttons;
