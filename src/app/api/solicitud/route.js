import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const solicitudes = await prisma.tbl_solicitud.findMany()
    return NextResponse.json(solicitudes)
}

export async function POST(request){
    const data = await request.json()
    const clienteDPI = Number(data.cliente_dpi);
    const fecha = new Date().toISOString();
    const nuevaSolicitud = await prisma.tbl_solicitud.create({
        data:{
            Motivo: data.Motivo,
            Fecha: fecha,
            tipotra_id: Number(data.tipotra_id),
            cliente_dpi: Number(clienteDPI),
            estadosolicitud_id: Number(data.estadosolicitud_id),
            comentario: data.comentario,
        },
    });
    return NextResponse.json(nuevaSolicitud)
}