import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function lodadAsignaciones() {
  return await prisma.tbl_asignaciones.findMany({
    include: {
      tbl_paso: true,
      usuarios: true,
      remitentes: true,
      tbl_tramite: true,
    },
  });
}

async function asignacionesDashpage() {
  const asignaciones = await lodadAsignaciones();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Asignaciones Registradas</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/asignaciones/new" passHref>
            Registrar una nueva asigación
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
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Tramite
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Estado
                    </th>
                    <th scope="col" className="px-10 py-4">
                      Paso 
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Correlativo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actividades
                    </th>
                  </tr>
                </thead>
                {asignaciones.map((asignacion) => (
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">{asignacion.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {asignacion.Fecha.toDateString()}
                      </td>
                      <td className="whitespace-nowrap px-10 py-4">
                        {asignacion.Correlativo}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        { asignacion.Estado = false? "Completado": "En proceso"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        { asignacion.tbl_paso.Nombre}
                      </td>
                      <td className=" whitespace-nowrap px-6 py-4">
                        { asignacion.tbl_tramite.correlativo}
                      </td>
                      <td className=" whitespace-nowrap px-6 py-4">
                        Ver actividad
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default asignacionesDashpage;
