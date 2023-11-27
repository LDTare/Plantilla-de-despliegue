"use client"
import { useRouter } from "next/navigation";

function AreaCard({ area }) {

    const router = useRouter();

  return (
    <div className="md:max-w-sm bg-white rounded-lg border p-2 hover:cursor-pointer hover:bg-slate-200 shadow-lg " 
    onClick={() => router.push("/areas/edit/" + area.id)}>
      <div className="px-1 py-4">
        <div className="font-bold text-xl mb-2 text-black">{area.nombre}</div>
        <p className="text-gray-700 text-base">
          {area.descripcion}
        </p>
      </div>
    </div>
  );
}
export default AreaCard; 