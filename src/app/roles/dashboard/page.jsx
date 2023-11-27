import RolTable from "@/app/components/Rol_Table";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadRoles() {
  //Obteniendo todos los roles registrados
  return await prisma.tbl_rol.findMany();
}

async function rolesDashPage() {
  const roles = await loadRoles();

  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Roles registrados</h1>
          <Link className="rounded bg-green-500 px-4 py-2" href="/roles/new" passHref>
            Agregar un nuevo rol
          </Link>
      </div>
      <div className="flex flex-col">
        <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className=" overflow-hidden bg-slate-400">
              <table className="min-w-full text-left text-sm font-light">
                <thead>
                  <tr className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Nombre</th>
                    <th scope="col" className="px-6 py-4">Descripcion</th>
                    <th scope="col" className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                {roles.map((rol) => (
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                        <td className="whitespace-nowrap px-6 py-4">{rol.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{rol.nombre}</td>
                      <td className="whitespace-nowrap px-6 py-4">{rol.descripcion}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white">
                        <RolTable rol={rol} key={rol.id}>
                        </RolTable>
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
export default rolesDashPage;
