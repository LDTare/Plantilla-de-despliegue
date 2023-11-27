//"use client"; 
import Solicitud_Table from "@/app/components/Solicitud_Table";
import { prisma } from "@/libs/prisma";
import Link from "next/link";
//import { useState } from 'react';

async function loadSolicitudes() {
  return await prisma.tbl_solicitud.findMany({
    include:{estadosolicitud:true,tipotramite:true}
  });
}
async function solicitudDashPage() {
  const solicitudes = await loadSolicitudes();
  const estadosolicitudIds = solicitudes.map((soli) => soli.estadosolicitud_id);
  const estadosDeSolicitud = await prisma.tbl_estadosolicitud.findMany({
    where: {
      id: { in: estadosolicitudIds },
    },
    select: {
      id: true,
      nombre: true,
    },
  });
  const estadosDeSolicitudMap = {};
  estadosDeSolicitud.forEach((estado) => {
    estadosDeSolicitudMap[estado.id] = estado.nombre;
  });
  const estadoCount = {};
  solicitudes.forEach((soli) => {
    soli.estadosolicitud_id = estadosDeSolicitudMap[soli.estadosolicitud_id];
    if(estadoCount[soli.estadosolicitud_id]){
      estadoCount[soli.estadosolicitud_id]++;
    }else{
      estadoCount[soli.estadosolicitud_id]=1;
    }
  });
  return (
    <section className="container mx-auto py-5">
      <div className=" rounded p-5 bg-blue-950">
        <h1 className="text-center text-3xl font-bold">Solicitudes registradas</h1>
          <Link className="rounded bg-green-500 px-4 py-2" href="/solicitudes/new" passHref>
            Agregar un nueva solicitud
          </Link>

        <div className="mt-4 text-white">
        {Object.keys(estadoCount).map((estadoId) => (
          <p key={estadoId}>
            Estado {estadoId}: {estadoCount[estadoId]} solicitudes
          </p>
        ))}
      </div>
      </div>
      <div className="flex flex-col">
        <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="rounded overflow-hidden bg-slate-400">
              <table className=" min-w-full text-left text-sm font-light">
                <thead>
                  <tr className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Motivo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fecha solicitada
                    </th>
                    <th scope="col" className="px-10 py-4">
                      Tipo de trámite
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Cliente Solicitante
                    </th>
                    <th scope="col" className="px-10 py-4">
                      Estado de la Solicitud
                    </th>
                    <th scope="col" className="px-10 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                {solicitudes.map((soli) => (
                  <tbody>

                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-slate-500 dark:hover:bg-slate-300 text-black">
                      <td className="whitespace-nowrap px-6 py-4">{soli.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {soli.Motivo}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {soli.Fecha.toISOString()}
                      </td>
                      <td className="whitespace-nowrap px-10 py-4">
                        {soli.tipotramite.Nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {soli.cliente_dpi}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {soli.estadosolicitud.nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <Solicitud_Table soli={soli} key={soli.id} />
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
export default solicitudDashPage;