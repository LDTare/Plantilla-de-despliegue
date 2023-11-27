import Requisitostable from "@/app/components/Requisitostable";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadRequisitos() {
  return await prisma.tbl_requisito.findMany();
}

async function RequisitosDashPage() {
  const requisitos = await loadRequisitos();
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Requisitos registrados</h1>
          <Link 
          className="rounded bg-green-500 px-4 py-2"
          href="/requisitos/new" passHref>
            Agregar un nuevo requisito
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
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Descripcion
                    </th>
                    <th scope="col" className="px-6 py-4 w-48">
                      Acciones
                    </th>
                  </tr>
                </thead>
                {requisitos.map((requisitos) => (
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-slate-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">
                        {requisitos.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {requisitos.Descripcion}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-white">
                        <Requisitostable
                          requisitos={requisitos}
                          key={requisitos.id}
                        ></Requisitostable>
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
export default RequisitosDashPage;
