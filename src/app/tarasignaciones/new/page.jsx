import TarasignacionesForm from "@/app/components/Tarasignacionesform";
import Link from "next/link";

function newTarasignacionesPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button className=" rounded bg-indigo-500 hover:bg-indigo-700 px-5 py-2 w-1/4 my-5">
        <Link href="/tarasignaciones/dashboard"> Regresar</Link>
      </button>

      <TarasignacionesForm />
    </div>
  );
}
export default newTarasignacionesPage;