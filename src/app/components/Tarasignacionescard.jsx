"use client"
import { useRouter } from "next/navigation";

function TarasignacionesCard({tarasignaciones }) {

    const router = useRouter();

  return (
    <div 
    className=" bg-indigo-700 p-3 hover:bg-indigo-600 hover:cursor-pointer"
    onClick={()=> {
        router.push('/tarasignaciones/' + tarasignaciones.id)
    }}
    >
      <h3 className="font-bold text-2xl mb-2">{tarasignaciones.Colerrativo}</h3>
      <p>{tarasignaciones.Fecha}</p>
      
    </div>
  );
}
export default TarasignacionesCard; 