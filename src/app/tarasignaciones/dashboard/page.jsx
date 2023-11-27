import TarasignacionesCard from "@/app/components/Tarasignacionescard";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadTarasignaciones() {
  //Obteniendo todas las areas registradas
  return await prisma.tbl_tarasignaciones.findMany();
}

async function tarasignacionesDashPage() {
  const tarasignaciones = await loadTarasignaciones();
  return (
    <section className="container mx-auto py-5">
      <div className="rounded p-5 bg-indigo-700">
        <h1 className='text-center text-3xl font-bold'>Tarjetas de Asignaciones</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/tarasignaciones/new" passHref>Agregar un nueva asignacion</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-10">
        {tarasignaciones.map((tarasignaciones) => (
            <TarasignacionesCard tarasignaciones={tarasignaciones} key={tarasignaciones.id}>
            </TarasignacionesCard>
        ))}
      </div>
    </section>
  );
}
export default tarasignacionesDashPage;