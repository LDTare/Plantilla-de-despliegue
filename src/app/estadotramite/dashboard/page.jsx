import Estadotramitetable from "@/app/components/Estadotramite_table";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadEstadotrmite() {
  return await prisma.tbl_estadotramite.findMany();
}

async function EstadotramiteDashPage() {
  const estadotramite = await loadEstadotrmite();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Estados de trámite registrados</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/estadotramite/new" passHref>
            Agregar un nuevo estado
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
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Descripcion
                    </th>
                    <th scope="col" className="px-6 py- w-44">
                      Acciones
                    </th>
                  </tr>
                </thead>
                {estadotramite.map((estadotramite) => (
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">
                        {estadotramite.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {estadotramite.Color}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {estadotramite.Descripcion}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-white">
                        <Estadotramitetable
                          estadotramite={estadotramite}
                          key={estadotramite.id}
                        ></Estadotramitetable>
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
export default EstadotramiteDashPage;
