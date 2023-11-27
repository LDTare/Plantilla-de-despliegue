"use client";

import { useRouter } from "next/navigation";

function Estadotramitetable({estadotramite}) {
  const router = useRouter();

  return (
    <div className="flex gap-x-2 justify-between mt-2">
      <button 
      className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
      onClick={() => {
       router.push('/estadotramite/edit/' + estadotramite.id)
      }}
      >
        Editar
        </button>
      <button 
      className=" rounded hover:bg-rose-700 bg-rose-500 py-1 px-2"
      onClick={
        async()=> {
            if(confirm('¿Desea eliminar este estado de trámite?')){
                const res = await fetch('/api/estadotramite/' + estadotramite.id,{
                    method:'DELETE',headers:{'Content-Type':'application/json'}
                });
                const data = await res.json();
                router.refresh();
                router.push('/estadotramite/dashboard');
            }
        }
      }
      >
        Eliminar</button>
    </div>
  );
}
export default Estadotramitetable;