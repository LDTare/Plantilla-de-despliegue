import Permisotable from "@/app/components/Permisotable";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadPermiso() {
  return await prisma.tbl_permiso.findMany();
}

async function PermisoDashPage() {
  const permiso = await loadPermiso();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Permisos registrados</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/permiso/new" passHref>
            Agregar un nuevo permiso
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
                      Descripcion
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                {permiso.map((permiso) => (
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap px-6 py-4">
                        {permiso.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {permiso.Descripcion}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Permisotable
                          permiso={permiso}
                          key={permiso.id}
                        ></Permisotable>
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
export default PermisoDashPage;
