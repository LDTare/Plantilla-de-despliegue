"use client";

import { useRouter } from "next/navigation";

function Requisitossolicitudtable({requisitossolicitud}) {
  const router = useRouter();

  return (
    <div className="flex gap-x-2 justify-center mt-2">
      <button 
      className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
      onClick={() => {
       router.push('/requisitossolicitud/edit/' + requisitossolicitud.id)
      }}
      >
        Editar
        </button>
      <button 
      className=" rounded hover:bg-rose-700 bg-rose-500 py-1 px-2"
      onClick={
        async()=> {
            if(confirm('¿Desea eliminar este requisito de solicitud?')){
                const res = await fetch('/api/requisitosolicitud/' + requisitossolicitud.id,{
                    method:'DELETE',headers:{'Content-Type':'application/json'}
                });
                const data = await res.json();
                router.refresh();
                router.push('/requisitossolicitud/dashboard');
            }
        }
      }
      >
        Eliminar</button>
    </div>
  );
}
export default Requisitossolicitudtable;