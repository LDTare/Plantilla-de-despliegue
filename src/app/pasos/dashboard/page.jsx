import { prisma } from "@/libs/prisma";
import Link from "next/link";
import Paso_btnTable from "@/app/components/Pasos_btnTable";

async function loadPasos() {
  return await prisma.tbl_paso.findMany({
    include: {departamentos: true, actividades: true}
  });
}

export const dynamic = 'force-dynamic'

async function pasosDashPage() {
  const pasos = await loadPasos();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Pasos Registrados</h1>
          <Link className="rounded bg-green-500 px-4 py-2" href="/pasos/new" passHref>
            Agregar un nuevo paso
          </Link>
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
                    <th scope="col" className="px-10 py-4">
                      Departamento
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actividad
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                {pasos.map((paso) => (
                    <tr key={paso.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">{paso.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {paso.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-10 py-4">
                        {paso.Descripcion}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {paso.departamentos.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {paso.actividades.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-white">
                        <Paso_btnTable paso={paso} key={paso.id} />
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

export default pasosDashPage;
