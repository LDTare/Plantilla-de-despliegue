"use client";

import { useRouter } from "next/navigation";

function Paso_btnTable({ paso }) {
  const router = useRouter();
  return (
    <div className="flex gap-x-2 justify-between mt-2">
      <button
        className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
        onClick={() => {
          router.push("/pasos/edit/" + paso.id);
        }}
      >
        Ver detalles
      </button>
      <button
        className=" rounded hover:bg-rose-700 bg-rose-500 py-1 px-2"
        onClick={async () => {
          if (confirm("¿Desea eliminar este rol?")) {
            const res = await fetch("/api/pasos/" + paso.id, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            router.refresh();
            router.push("/pasos/dashboard");
          }
        }}
      >
        Eliminar
      </button>
    </div>
  );
}
export default Paso_btnTable;
