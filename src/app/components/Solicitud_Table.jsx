"use client";

import { useRouter } from "next/navigation";

function Solicitud_btnTable({soli}) {
  const router = useRouter();

  return (
    <div className="flex gap-x-2 justify-between mt-2">
      <button 
      className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
      onClick={() => {
       router.push('/solicitudes/edit/' + soli.id)
      }}
      >
        Editar
        </button>
      <button 
      className=" rounded hover:bg-rose-700 bg-rose-500 py-1 px-2"
      onClick={
        async()=> {
            if(confirm('¿Desea eliminar esta solicitud?')){
                const res = await fetch('/api/solicitud/' + soli.id,{
                    method:'DELETE',headers:{'Content-Type':'application/json'}
                });
                const data = await res.json();
                router.refresh();
                router.push('/solicitud/dashboard');
            }
        }
      }
      >
        Eliminar</button>
    </div>
  );
}
export default Solicitud_btnTable;
