"use client";

import { useRouter } from "next/navigation";

function Actividadtable({actividad}) {
  const router = useRouter();

  return (
    <div className="flex gap-x-2 justify-between mt-2">
      <button 
      className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
      onClick={() => {
       router.push('/actividad/edit/' + actividad.id)
      }}
      >
        Editar
        </button>
      <button 
      className=" rounded hover:bg-rose-700 bg-rose-500 py-1 px-2"
      onClick={
        async()=> {
            if(confirm('¿Desea eliminar esta actividad?')){
                const res = await fetch('/api/actividad/' + actividad.id,{
                    method:'DELETE',headers:{'Content-Type':'application/json'}
                });
                const data = await res.json();
                router.refresh();
                router.push('/actividad/dashboard');
            }
        }
      }
      >
        Eliminar</button>
    </div>
  );
}
export default Actividadtable;