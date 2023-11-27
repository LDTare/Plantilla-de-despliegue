import ClientesTable from "@/app/components/clientes_table";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadClientes() {
  return await prisma.tbl_clientes.findMany();
}

async function clientesDashPage() {
  const clientes = await loadClientes();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Clientes registrados</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/clientes/new" passHref>
            Agregar un nuevo cliente
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
                      DPI
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Apellido
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Correo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Telefono
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NIM
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NIT
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                {clientes.map((clientes) => (
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">
                        {Number(clientes.DPI)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {clientes.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {clientes.Apellido}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {clientes.Correo}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {clientes.Telefono}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {clientes.NIM}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {clientes.NIT}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-white ">
                        <ClientesTable
                          clientes={clientes}
                          key={clientes.id}
                        ></ClientesTable>
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
export default clientesDashPage;
