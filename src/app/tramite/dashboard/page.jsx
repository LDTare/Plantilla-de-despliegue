import TramiteTable from "@/app/components/Tramite_Table";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function loadTramites() {

  return await prisma.tbl_tramites.findMany({
    include: {tipotramite: true,cliente:true}

  });
}

export const dynamic = 'force-dynamic'

async function tramitesDashPage() {
  const tramites = await loadTramites();

  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Tramites registrados</h1>
          <Link className="rounded bg-green-500 px-4 py-2" href="/tramite/new" passHref>
            Agregar un nuevo tramite
          </Link>
      </div>
      <div className="flex flex-col">
        <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className=" overflow-hidden bg-slate-400">
              <table className="min-w-full text-left text-sm font-light">
                <thead>
                  <tr className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <th scope="col" className="px-6 py-4">Correlativo</th>
                    <th scope="col" className="px-6 py-4">Fecha de inicio</th>
                    <th scope="col" className="px-6 py-4">Fecha de finalizacion</th>
                    <th scope="col" className="px-6 py-4">Tipo de trámite</th>
                    <th scope="col" className="px-6 py-4">Numero de solicitud</th>
                    <th scope="col" className="px-6 py-4">Cliente solicitante</th>
                    <th scope="col" className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody >
                {tramites.map((tramite) => (
                    <tr key={tramite.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">{tramite.correlativo}</td>
                      <td className="whitespace-nowrap px-6 py-4">{tramite.fecha_inicio.toISOString()}</td>
                      <td className="whitespace-nowrap px-6 py-4">{tramite.fecha_fin ? tramite.fecha_fin.toISOString() : ""}</td>
                      <td className="whitespace-nowrap px-6 py-4">{tramite.id_estado}</td>
                      <td className="whitespace-nowrap px-6 py-4">{tramite.tipotramite.Nombre}</td>
                      <td className="whitespace-nowrap px-6 py-4">{tramite.cliente.Nombre+" "+tramite.cliente.Apellido}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white">
                        <TramiteTable tramite={tramite} key={tramite.id}>
                        </TramiteTable>
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
export default tramitesDashPage;
