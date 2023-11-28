import Actividadtable from "@/app/components/Actividadtable";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadActividad() {
  return await prisma.tbl_actividad.findMany();
}

export const dynamic = 'force-dynamic'

async function ActividadDashPage() {
  const actividad = await loadActividad();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Actividades registradas</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/actividad/new" passHref>
            Agregar una nueva actividad
          </Link>
        </button>
      </div>
      <div className="flex flex-col">
        <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className=" overflow-hidden bg-slate-400">
              <table className="min-w-full text-left text-sm font-light">
                <thead>
                  <tr className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Descripcion
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                {actividad.map((actividad) => (
                    <tr key={actividad.id} className="border-b transition duration-300 ease-in-out hover:bg-slate-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className=" whitespace-nowrap px-6 py-4">
                        {actividad.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {actividad.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {actividad.Descripcion}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-white">
                        <Actividadtable
                          actividad={actividad}
                          key={actividad.id}
                        ></Actividadtable>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ActividadDashPage;
