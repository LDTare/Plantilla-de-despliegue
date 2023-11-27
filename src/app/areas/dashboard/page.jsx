import AreaCard from "@/app/components/Area_Card";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadAreas() {
  //Obteniendo todas las areas registradas
  return await prisma.tbl_area.findMany();
}

async function areaDashPage() {
  const areas = await loadAreas();
  return (
    <section className="container mx-auto py-5">
      <div className="rounded p-5 bg-blue-950">
        <h1 className='text-center text-3xl font-bold'>Puestos registrados</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/areas/new" passHref>Agregar un nuevo puesto</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-10">
        {areas.map((area) => (
            <AreaCard area={area} key={area.id}>
            </AreaCard>
        ))}
      </div>
    </section>
  );
}
export default areaDashPage;
