import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const solicitudes = await prisma.tbl_tramites.findMany()
    return NextResponse.json(solicitudes)
}

export async function POST(request){
    const data = await request.json()
    const fecha = new Date().toISOString();
    const nuevaSolicitud = await prisma.tbl_tramites.create({
        data:{
            correlativo: data.correlativo,
            fecha_inicio: fecha,
            id_estado: Number(data.id_estado),
            tt_id: Number(data.tt_id),
            sol_id: Number(data.sol_id),
            client_id: Number(data.client_id)
        },
    });
    return NextResponse.json({ message: 'Registro actualizado correctamente' })
}