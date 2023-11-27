import User_btnTable from "@/app/components/User_btnTable";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadUsers() {
  return await prisma.tbl_usuarios.findMany();
}

async function usersDashPage() {
  const usuarios = await loadUsers();

  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Usuarios registrados</h1>
          <Link className="rounded bg-green-500 px-4 py-2" href="/usuarios/new" passHref>
            Agregar un nuevo usuario
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
                      Apellido
                    </th>
                    <th scope="col" className="px-10 py-4">
                      Direccion
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Telefono
                    </th>
                    <th scope="col" className="px-10 py-4">
                      Correo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                {usuarios.map((user) => (
                    <tr
                    id={user.id} key={user.id}
                     className="border-b transition duration-300 ease-in-out hover:bg-slate-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">{user.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.apellido}
                      </td>
                      <td className="whitespace-nowrap px-10 py-4">
                        {user.direccion}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.Telefono}
                      </td>
                      <td className="whitespace-nowrap px-10 py-4">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-white">
                        <User_btnTable user={user} key={user.id} />
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
export default usersDashPage;
