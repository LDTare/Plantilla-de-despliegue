"use client";

import { useRouter } from "next/navigation"

function Buttons({areaID}) {
    const router = useRouter();
    
  return (
    <div className="flex gap-x-2 justify-between mt-2">
      <button 
      className=" bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
      onClick={() => {
        router.push('/areas/edit/' + areaID)
      }}
      >
        Editar area
      </button>
      <button 
      className=" bg-rose-500 hover:bg-rose-700 font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
      onClick={async()=> {
        if(confirm('¿Desea eliminar esta area?')){
            const res = await fetch('/api/area/' + areaID, {
                method: 'DELETE',
                headers:{
                    'Content-Type': "application/json",
                }
            });
            const data = await res.json();
            router.refresh();
            router.push('/areas/dashboard');
        }
      }}
      >
        Eliminar area
      </button>
    </div>
  );
}

export default Buttons;
