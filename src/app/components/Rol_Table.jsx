"use client";

import { useRouter } from "next/navigation";

function RolTable({rol}) {
  const router = useRouter();

  return (
    <div className="flex gap-x-2 justify-center mt-2">
      <button 
      className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
      onClick={() => {
       router.push('/roles/edit/' + rol.id)
      }}
      >
        Editar
        </button>
      <button 
      className=" rounded hover:bg-rose-700 bg-rose-500 py-1 px-2"
      onClick={
        async()=> {
            if(confirm('¿Desea eliminar este rol?')){
                const res = await fetch('/api/rol/' + rol.id,{
                    method:'DELETE',headers:{'Content-Type':'application/json'}
                });
                const data = await res.json();
                router.refresh();
                router.push('/roles/dashboard');
            }
        }
      }
      >
        Eliminar</button>
    </div>
  );
}
export default RolTable;
